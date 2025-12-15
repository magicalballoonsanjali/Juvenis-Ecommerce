import { NextResponse } from "next/server";
import connectDB from "../../../../config/db";
import Product from "../../../../models/Products";

export async function PATCH(req) {
  try {
    await connectDB();

    const { productId, updates, userId } = await req.json(); // get sellerId from client

    if (!productId || !updates || !userId) {
      return NextResponse.json(
        { success: false, message: "Product ID, updates, and seller ID are required" },
        { status: 400 }
      );
    }

    // Find the product belonging to this seller and update
    const product = await Product.findOneAndUpdate(
      { _id: productId, userId },
      { $set: updates },
      { new: true }
    );

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found or not authorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Edit product error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
