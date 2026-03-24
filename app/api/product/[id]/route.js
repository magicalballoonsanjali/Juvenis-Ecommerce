// import { NextResponse } from "next/server";
// import connectDB from "../../../../config/db";
// import Product from "../../../../models/Products";

// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // GET product by ID
// export async function GET(req, { params }) {
//  // params is a Promise now, so do:
//   const resolvedParams = await params;
//   const { id } = resolvedParams;

//   try {
//     await connectDB();

//     const product = await Product.findById(id);
//     if (!product) return NextResponse.json({ success: false, message: "Product not found" });

//     return NextResponse.json({ success: true, product });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ success: false, message: err.message });
//   }
// }

// // PATCH / update product by ID

// export async function PATCH(req, { params }) {
//   try {
    
//     await connectDB();
//     const { id } = await params; // product id from URL
//         console.log("PATCH ID:", id); // debug
//     const formData = await req.formData();

//     const userId = formData.get("userId"); // get sellerId from client
//     if (!userId)
//       return NextResponse.json({ success: false, message: "Seller ID missing" });

//     const product = await Product.findById(id);
//     if (!product)
//       return NextResponse.json({ success: false, message: "Product not found" });

//     // Check if the product belongs to the seller
//     // if (product.userId.toString() !== userId)
//     //   return NextResponse.json({ success: false, message: "Not authorized" });

//     // Update fields only if provided
//     const name = formData.get("name");
//     const description = formData.get("description");
//     const category = formData.get("category");
//     const price = formData.get("price");
//     const offerPrice = formData.get("offerprice");
//     const quantity = formData.get("quantity");

//     if (name) product.name = name;
//     if (description) product.description = description;
//     if (category) product.category = category;
//     if (price !== null && price !== "") product.price = Number(price);
//     if (offerPrice !== null && offerPrice !== "")
//       product.offerPrice = Number(offerPrice);
//     if (quantity !== null && quantity !== "") product.stock = Number(quantity);

//     // Handle new images if uploaded
//     const files = formData.getAll("images");
//     if (files.length > 0) {
//       const result = await Promise.all(
//         files.map(async (file) => {
//           const arrayBuffer = await file.arrayBuffer();
//           const buffer = Buffer.from(arrayBuffer);
//           return new Promise((resolve, reject) => {
//             const stream = cloudinary.uploader.upload_stream(
//               { resource_type: "auto" },
//               (error, result) => {
//                 if (error) reject(error);
//                 else resolve(result);
//               }
//             );
//             stream.end(buffer);
//           });
//         })
//       );
//       // Append new images to existing ones
//       product.image = [...product.image, ...result.map((r) => r.secure_url)];
//     }

//     await product.save();

//     return NextResponse.json({
//       success: true,
//       message: "Product updated successfully",
//       product,
//     });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ success: false, message: err.message });
//   }
// }




// new testing
import { NextResponse } from "next/server";
import connectDB from "../../../../config/db";
import Product from "../../../../models/Products";
import Notify from "../../../../models/Notify";
import nodemailer from "nodemailer";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET product by ID
export async function GET(req, { params }) {
 // params is a Promise now, so do:
  const resolvedParams = await params;
  const { id } = resolvedParams;

  try {
    await connectDB();

    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ success: false, message: "Product not found" });

    return NextResponse.json({ success: true, product });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: err.message });
  }
}

const sendMail = async (to, productName, productId) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Product Back in Stock!",
      html: `<h2>${productName} is back</h2>`,
    });

    console.log("✅ EMAIL RESPONSE:", info);
  } catch (err) {
    console.error("❌ EMAIL ERROR:", err);
  }
};
// PATCH / update product by ID
export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const formData = await req.formData();

    const userId = formData.get("userId");
    if (!userId)
      return NextResponse.json({ success: false, message: "Seller ID missing" });

    const product = await Product.findById(id);
    if (!product)
      return NextResponse.json({ success: false, message: "Product not found" });

    // ✅ STEP 1: STORE OLD STOCK
    const oldStock = product.stock;

    // ✅ STEP 2: UPDATE DATA
    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const price = formData.get("price");
    const offerPrice = formData.get("offerprice");
    const quantity = formData.get("quantity");

    if (name) product.name = name;
    if (description) product.description = description;
    if (category) product.category = category;
    if (price !== null && price !== "") product.price = Number(price);
    if (offerPrice !== null && offerPrice !== "")
      product.offerPrice = Number(offerPrice);

    if (quantity !== null && quantity !== "") {
      product.stock = Number(quantity);
    }

    // ✅ STEP 3: IMAGE UPLOAD (your existing logic)
    const files = formData.getAll("images");
    if (files.length > 0 && files[0].size > 0) {
      const result = await Promise.all(
        files.map(async (file) => {
          const buffer = Buffer.from(await file.arrayBuffer());
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

      product.image = [...product.image, ...result.map((r) => r.secure_url)];
    }

    // ✅ STEP 4: SAVE PRODUCT
    await product.save();

    // ✅ STEP 5: CHECK STOCK CHANGE (MAIN LOGIC)
    if (oldStock === 0 && product.stock > 0) {
      console.log("🔥 Stock is back, sending emails...");

      const usersToNotify = await Notify.find({
        productId: id,
        notified: false,
      });

      for (let user of usersToNotify) {
        await sendMail(user.email, product.name, product._id);

        // mark as notified
        user.notified = true;
        await user.save();
      }

      console.log(`✅ ${usersToNotify.length} users notified`);
    }

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: err.message });
  }
}