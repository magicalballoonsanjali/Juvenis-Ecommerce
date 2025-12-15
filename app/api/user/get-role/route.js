import connectDB from "../../../../config/db";
import User from "../../../../models/User";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ success: false, message: "Missing userId" });
    }

    // Since your _id is a string (like a Clerk user ID), use findOne instead of findById
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    return NextResponse.json({
      success: true,
      isSeller: user.isSeller || false,
    });
  } catch (error) {
    console.error("Error fetching role:", error);
    return NextResponse.json({ success: false, message: error.message });
  }
}