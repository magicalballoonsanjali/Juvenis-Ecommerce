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

    const {
      orderId,
      status,
    } = await req.json();

    console.log("PATCH REQUEST");
    console.log("Order ID:", orderId);
    console.log("Status:", status);

    if (!orderId || !status) {
      return NextResponse.json(
        {
          success: false,
          message: "Order ID and status are required",
        },
        { status: 400 }
      );
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 }
      );
    }

    // Update status
    order.status = status;

    await order.save();

    console.log("ORDER UPDATED:", order.status);

    // ==============================
    // SEND EMAIL TO CUSTOMER
    // ==============================

    const user = await User.findById(order.userId);

    if (user?.email) {

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      try {

        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: user.email,

          subject: `Order Status Updated - ${order._id}`,

          html: `
            <div style="
              font-family:Arial,sans-serif;
              max-width:600px;
              margin:auto;
              padding:30px;
              border:1px solid #eee;
              border-radius:12px;
            ">

              <h2 style="color:#1893bf;">
                Hello ${user.name || "Customer"},
              </h2>

              <p>
                Your order status has been updated.
              </p>

              <p>
                <strong>Order ID:</strong>
                ${order._id}
              </p>

              <p>
                <strong>New Status:</strong>
                <span style="
                  font-weight:bold;
                  color:#1893bf;
                ">
                  ${status}
                </span>
              </p>

              <p>
                Thank you for shopping with Juvenis Innovations.
              </p>

            </div>
          `,
        });

        console.log("CUSTOMER EMAIL SENT");

      } catch (emailError) {

        console.error(
          "EMAIL ERROR:",
          emailError
        );

        // Don't fail order update because email failed
      }
    }

    return NextResponse.json({
      success: true,
      message: "Order status updated successfully",
      order,
    });

  } catch (error) {

    console.error(
      "PATCH /api/order/seller/orders ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
