import connectDB from "../../../../config/db";
import User from "../../../../models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email } = await req.json();

    if (!email || !name)
      return NextResponse.json({ success: false, message: "Name and email are required" });

    // check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // create new user if not exist
      user = await User.create({
        name,
        email,
        cartItems: {},
        wishlist: [],
        isSeller: false,
      });
    }

    return NextResponse.json({
      success: true,
      message: user ? "Login successful" : "Account created",
      user,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: err.message });
  }
}
