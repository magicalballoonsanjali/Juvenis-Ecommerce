import connectDB from "../../../../config/db";
import Product from "../../../../models/Products";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    // Fetch all products, no seller check
    const products = await Product.find({});

    return NextResponse.json({ success: true, products });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
