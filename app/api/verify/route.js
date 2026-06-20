// import crypto from "crypto";
// import connectDB from "../../../config/db";
// import Order from "../../../models/Order";

// export async function POST(req) {
//   try {
//     await connectDB();

//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     } = await req.json();

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return new Response(
//         JSON.stringify({ success: false, message: "Invalid signature" }),
//         { status: 400 }
//       );
//     }

//     await Order.findOneAndUpdate(
//       { razorpayOrderId: razorpay_order_id },
//       {
//         paymentStatus: "PAID",
//         paymentId: razorpay_payment_id,
//       }
//     );

//     return new Response(
//       JSON.stringify({ success: true }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error(error);
//     return new Response(
//       JSON.stringify({ success: false, message: error.message }),
//       { status: 500 }
//     );
//   }
// }


// new for invoices 19 06 26
export const runtime =
  "nodejs";
import crypto from "crypto";
import connectDB from "../../../config/db";

import Order from "../../../models/Order";
import User from "../../../models/User";
import Address from "../../../models/Address";

import { generateInvoice } from "../../../lib/generateInvoice";
import { sendInvoiceEmail } from "../../../lib/sendInvoiceEmail";

// working
// export async function POST(req) {
//   try {
//     await connectDB();

//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     } = await req.json();

//     const body =
//       razorpay_order_id +
//       "|" +
//       razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac(
//         "sha256",
//         process.env.RAZORPAY_KEY_SECRET
//       )
//       .update(body)
//       .digest("hex");

//     if (
//       expectedSignature !==
//       razorpay_signature
//     ) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           message: "Invalid signature",
//         }),
//         { status: 400 }
//       );
//     }

//     const order =
//       await Order.findOneAndUpdate(
//         {
//           razorpayOrderId:
//             razorpay_order_id,
//         },
//         {
//           paymentStatus: "PAID",
//           razorpayPaymentId:
//             razorpay_payment_id,
//           razorpaySignature:
//             razorpay_signature,
//         },
//         {
//           new: true,
//         }
//       ).populate("items.product");

//     if (!order) {
//       throw new Error(
//         "Order not found"
//       );
//     }

//     const user =
//       await User.findById(
//         order.userId
//       );

//     const address =
//       await Address.findById(
//         order.address
//       );

//     const invoiceNumber =
//       "INV-" + Date.now();

      
//       order.invoiceNumber =
//       invoiceNumber;
      
//       await order.save();
      
      
      
//       const invoicePath =
//       await generateInvoice(
//         order,
//         user,
//         address,
//         invoiceNumber
//       );

//       order.invoiceUrl =
//       `/invoices/${invoiceNumber}.pdf`;

//         await order.save();

// try {
//   await sendInvoiceEmail(
//     user.email,
//     invoicePath,
//     invoiceNumber
//   );
// } catch (err) {
//   console.error("Email Error:", err);
// }

//     return new Response(
//       JSON.stringify({
//         success: true,
//       }),
//       {
//         status: 200,
//       }
//     );
//   } catch (error) {
//     console.log(error);

//     return new Response(
//       JSON.stringify({
//         success: false,
//         message: error.message,
//       }),
//       {
//         status: 500,
//       }
//     );
//   }
// }

// not working in live 
// export async function POST(req) {
//   try {
//     await connectDB();

//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     } = await req.json();

//     const body =
//       razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return Response.json({ success: false }, { status: 400 });
//     }

//     const order = await Order.findOneAndUpdate(
//   { razorpayOrderId: razorpay_order_id },
//   {
//     paymentStatus: "PAID",
//     razorpayPaymentId: razorpay_payment_id,
//     razorpaySignature: razorpay_signature,
//   },
//   { new: true }
// ).populate("items.product"); // 🔥 FIX
// console.log("ORDER:", razorpay_order_id);
// console.log("PAYMENT:", razorpay_payment_id);
// console.log("SIGNATURE:", razorpay_signature);
// console.log("EXPECTED:", expectedSignature);
//    if (!order) {
//   throw new Error("Order not found");
// }

// const user = await User.findById(order.userId);
// const address = await Address.findById(order.address);

// const invoiceNumber = "INV-" + Date.now();

// order.invoiceNumber = invoiceNumber;
// await order.save();

// const invoicePath = await generateInvoice(
//   order,
//   user,
//   address,
//   invoiceNumber
// );

// order.invoiceUrl = `/invoices/${invoiceNumber}.pdf`;
// await order.save();

// try {
//   await sendInvoiceEmail(
//     user.email,
//     invoicePath,
//     invoiceNumber
//   );
// } catch (err) {
//   console.error("Email Error:", err);
// }

// return Response.json({ success: true });
//   } catch (error) {
//     return Response.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }


export async function POST(req) {
  try {
    await connectDB();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return Response.json({ success: false }, { status: 400 });
    }

    const order = await Order.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (!order) {
      return Response.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    order.paymentStatus = "PAID";
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;

    await order.save();

    return Response.json({ success: true });

  } catch (error) {
    console.log("VERIFY ERROR:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}