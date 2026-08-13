import { NextResponse } from "next/server";
import Seller from "../../../../models/Seller";
import connectDB from "../../../../config/db";
export async function POST(request) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 }
      );
    }

    const seller = await Seller.findOne({
      email: email.toLowerCase(),
    });

    if (!seller) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    if (seller.password !== password) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Login successful",

      seller: {
        _id: seller._id.toString(),
        name: seller.name,
        email: seller.email,
        role: seller.role,
      },
    });

  } catch (error) {
    console.error("Seller Login Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}