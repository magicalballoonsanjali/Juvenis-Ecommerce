import { NextResponse } from "next/server";
import connectDB from "../../../../config/db";
import Product from "../../../../models/Products";

// export async function PATCH(req) {
//   try {
//     await connectDB();

//     const { productId, updates, userId } = await req.json(); // get sellerId from client

//     if (!productId || !updates || !userId) {
//       return NextResponse.json(
//         { success: false, message: "Product ID, updates, and seller ID are required" },
//         { status: 400 }
//       );
//     }

//     // Find the product belonging to this seller and update
//     const product = await Product.findOneAndUpdate(
//       { _id: productId, userId },
//       { $set: updates },
//       { new: true }
//     );

//     if (!product) {
//       return NextResponse.json(
//         { success: false, message: "Product not found or not authorized" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true, product });
//   } catch (error) {
//     console.error("Edit product error:", error);
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }


// new one 


// import { NextResponse } from "next/server";
// import connectDB from "../../../../config/db";
// import Product from "../../../../models/Products";
// import Notify from "../../../../models/Notify";
// import { sendEmail } from "../../../../lib/sendEmail";

// export async function PATCH(req) {
//   try {
//     await connectDB();

//     const { productId, updates, userId } = await req.json();

//     if (!productId || !updates || !userId) {
//       return NextResponse.json({
//         success: false,
//         message: "Missing fields",
//       });
//     }

//     // 🧠 Get OLD product
//     const oldProduct = await Product.findById(productId);

//     if (!oldProduct) {
//       return NextResponse.json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     // ✏️ Update product
//     const product = await Product.findOneAndUpdate(
//       { _id: productId, userId },
//       { $set: updates },
//       { new: true }
//     );

//     if (!product) {
//       return NextResponse.json({
//         success: false,
//         message: "Not authorized",
//       });
//     }

//     // 🚀 EMAIL LOGIC
//     if (oldProduct.stock === 0 && product.stock > 0) {

//       const users = await Notify.find({
//         productId: product._id,
//         notified: false,
//       });

//       console.log("Users to notify:", users.length);

//       for (let user of users) {
//         await sendEmail(
//           user.email,
//           "Product Back in Stock!",
//           `${product.name} is now available. Buy now!`
//         );

//         user.notified = true;
//         await user.save();
//       }
//     }

//     return NextResponse.json({ success: true, product });

//   } catch (err) {
//     console.log("❌ Error:", err);
//     return NextResponse.json({ success: false, message: err.message });
//   }
// }


// test mailing 
import nodemailer from "nodemailer";

export async function PATCH() {
  try {
    console.log("🔥 API HIT");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: "magicalballoons.anjali@gmail.com",
      subject: "TEST EMAIL",
      text: "This is a test email",
    });

    console.log("✅ EMAIL SENT");

    return Response.json({ success: true });

  } catch (err) {
    console.log("❌ ERROR:", err);
    return Response.json({ success: false });
  }
}