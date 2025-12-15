import connectDB from "../../../../../config/db";
import authSeller from "../../../../../lib/authSeller"; // You can keep or replace this
import Order from "../../../../../models/Order";
import Product from "../../../../../models/Products";
import User from "../../../../../models/User";
import Address from "../../../../../models/Address";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import mongoose from "mongoose";

// ✅ GET all orders for a seller
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const sellerId = searchParams.get("sellerId");

    if (!sellerId) {
      return NextResponse.json({ success: false, message: "seller Id is required" });
    }

    // ✅ Find all products by this seller
    const sellerProducts = await Product.find().select("_id");
    const productIds = sellerProducts.map(p => p._id);

    // ✅ Find all orders that contain these products
    const orders = await Order.find({ "items.product": { $in: productIds }})
    .sort({date:-1})
      .populate("items.product")
      .populate("address")
      .populate("userId");

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("GET /api/order/seller/orders error:", error);
    return NextResponse.json({ success: false, message: error.message });
  }
}

// ✅ PATCH — Update order status
export async function PATCH(req) {
  try {
    await connectDB();

    const { orderId, status, sellerId } = await req.json();
    if (!orderId || !sellerId) {
      return NextResponse.json({ success: false, message: "orderId and sellerId are required" });
    }

    const order = await Order.findById(orderId).populate("userId");
    if (!order) return NextResponse.json({ success: false, message: "Order not found" });

    
    order.status = status;
    await order.save();

    // ✅ Send email to the user
    const user = order.userId;
    if (user && user.email) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: user.email,
        subject: "Order Status Updated",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #009bf1;">Hello ${user.name || "Customer"},</h2>
            <p>Your order with ID <strong>${orderId}</strong> has been updated.</p>
            <p><strong>Status:</strong> 
              <span style="color:${status === "Cancelled" ? "red" : status === "Dispatch" ? "orange" : "green"};">
                ${status}
              </span>
            </p>
            <p>Thank you for shopping with us!</p>
            <p style="color: #888;">- The Juvenis Team</p>
          </div>
        `,
      }).catch(err => console.error("Email error:", err));
    }

    return NextResponse.json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    console.error("PATCH /api/order/seller/orders error:", error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
