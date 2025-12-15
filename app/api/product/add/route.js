import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import connectDB from "../../../../config/db";
import Product from "../../../../models/Products";
import User from "../../../../models/User";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    await connectDB();

    const formData = await request.formData();

   const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const price = formData.get("price");
    const offerPrice = formData.get("offerprice");
    const stock = formData.get("quantity");
    const sellerId = formData.get("userId"); // from frontend localStorage
    const files = formData.getAll("images");

    if (!sellerId) {
      return NextResponse.json({
        success: false,
        message: "Seller ID missing.",
      });
    }

   // ✅ Find seller in DB
    const seller = await User.findById(sellerId);

    if (!seller) {
      return NextResponse.json({
        success: false,
        message: "Seller not found.",
      });
    }

    if (!seller.isSeller) {
      return NextResponse.json({
        success: false,
        message: "You are not authorized as a seller.",
      });
    }

    if (!files || files.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No files uploaded.",
      });
    }

    // ✅ Upload images to Cloudinary
    const uploadResults = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(buffer);
        });
      })
    );

    const imageUrls = uploadResults.map((res) => res.secure_url);

    // ✅ Save Product
    const newProduct = await Product.create({
      userId: seller._id,
      name,
      description,
      category,
      price: Number(price),
      offerPrice: Number(offerPrice),
      image: imageUrls,
      date: Date.now(),
      stock: Number(stock),
    });

    return NextResponse.json({
      success: true,
      message: "Product added successfully",
      newProduct,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}