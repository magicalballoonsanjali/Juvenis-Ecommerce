import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Address from "@/models/Address";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";
import nodemailer from "nodemailer";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    const isSeller = await authSeller(userId);

    if (!isSeller) {
      return NextResponse.json({ success: false, message: "not authorized" });
    }

    await connectDB();

    // Address.length;

    const orders = await Order.find({})
    .populate("items.product")
    .populate("address")

    return NextResponse.json({ success: true, orders });
  }
  catch (error) {
    console.error("GET /api/order/seller/orders error:", error);
    return NextResponse.json({ success: false, message: error.message });
  }
}


export async function PATCH(req) {
  try {
    await connectDB();

    const { userId } = getAuth(req);
    const isSeller = await authSeller(userId);
    if (!isSeller) return NextResponse.json({ success: false, message: "Not authorized" });

    const { orderId, status } = await req.json();

    const order = await Order.findById(orderId);
    if (!order) return NextResponse.json({ success: false, message: "Order not found" });

    order.status = status;
    await order.save();

    // Send email to user
    const user = await User.findById(order.userId);
    if (user) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
      });

     transporter.sendMail({ 
  from: process.env.GMAIL_USER,
  to: user.email,
  subject: "Order status updated",
  text: `Hello ${user.name}, your order status is now: ${status}`,
}).catch(err => console.error("Email error:", err));

    }

    return NextResponse.json({ success: true, message: "Order status updated" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: err.message });
  }
}