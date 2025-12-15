import connectDB from "../../../../config/db";
import Address from "../../../../models/Address";
import User from "../../../../models/User";
import { NextResponse } from "next/server";

// API route to fetch addresses
export async function GET(request) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    if (!userId) {
      return NextResponse.json({ success: false, message: "userId is required" });
    }

    await connectDB();

    const addresses = await Address.find({ userId });

    return NextResponse.json({ success: true, addresses });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}

// Helper function to get a user by ID
export async function getUser(userId) {
  try {
    await connectDB();
    const user = await User.findById(userId);
    return user; 
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
