import { NextResponse } from "next/server";
import connectDB from "../../../../config/db";
import User from "../../../../models/User";

export async function POST(req) {
  console.log(req.method)
  if (req.method !== "POST") {
    return NextResponse.json({ success: false, message: "Method not allowed" });
  }

  try {
    await connectDB();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, message: "Email not found" });
    }

    // Check if user is a seller
    if (!user.isSeller) {
      return NextResponse.json({ success: false, message: "User is not a seller" });
    }

    // Login successful
    return NextResponse.json({
      success: true,
      message: "Login successful",
      seller: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Seller login error:", error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
