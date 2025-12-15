// /app/api/user/get-user/route.js
import { NextResponse } from "next/server";
import connectDB from "../../../../config/db";
import User from "../../../../models/User";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    let user;

    if (body.userId) {
      // fetch user by ID
      user = await User.findById(body.userId);
      if (!user)
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    } else if (body.name && body.email) {
      // create or fetch user by email
      user = await User.findOne({ email: body.email });
      if (!user) {
        user = await User.create({
          name: body.name,
          email: body.email,
        });
        console.log("🆕 New user created:", user.email);
      }
    } else {
      return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
    }

    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error("Error in /api/user/get-user:", err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
