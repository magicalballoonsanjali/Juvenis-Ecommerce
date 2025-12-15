import connectDB from "../../../../config/db";
import Order from "../../../../models/Order";
import { NextResponse } from "next/server";
import Address from "../../../../models/Address";

export async function GET(request) {
  try {
    // Get userId from query params
    const userId = request.nextUrl.searchParams.get("userId"); // make sure frontend uses 'userId'
    if (!userId) {
      return NextResponse.json({ success: false, message: "userId is required" });
    }

    await connectDB();

    const orders = await Order.find({ userId })
      .populate("address")
      .populate("items.product")
      .sort({ date: -1 }); // latest first

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
