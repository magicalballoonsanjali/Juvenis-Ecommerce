import { NextResponse } from "next/server";
import connectDB from "../../../config/db";
import Notify from "../../../models/Notify";

export async function POST(req) {
  try {
    await connectDB();

    const { email, productId } = await req.json();

    if (!email || !productId) {
      return NextResponse.json({
        success: false,
        message: "Email and productId required",
      });
    }

    const existing = await Notify.findOne({ email, productId });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "Already subscribed",
      });
    }

    await Notify.create({ email, productId });

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully!",
    });

  } catch (err) {
    return NextResponse.json({ success: false, message: err.message });
  }
}