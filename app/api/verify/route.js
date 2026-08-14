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
export const runtime = "nodejs";
import crypto from "crypto";
import connectDB from "../../../config/db";
import nodemailer from "nodemailer";
import Order from "../../../models/Order";
import User from "../../../models/User";
import Address from "../../../models/Address";
import Product from "../../../models/Products";

import { generateInvoice } from "../../../lib/generateInvoice";
import { sendInvoiceEmail } from "../../../lib/sendInvoiceEmail";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// working in local not in live
export async function POST(req) {

  console.log("verify start")
  try {
    await connectDB();

    console.log("DB CONNECTED");

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await req.json();

console.log("BODY RECEIVED");

console.log("PAYMENT IDS RECEIVED");

    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

console.log("CREATING SIGNATURE");

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

console.log("SIGNATURE CREATED");
console.log("CHECKING SIGNATURE");
    if (expectedSignature !== razorpay_signature) {
      return Response.json({ success: false }, { status: 400 });
    }
console.log("SIGNATURE VERIFIED");

console.log("BEFORE ORDER QUERY");

    const order = await Order.findOneAndUpdate(
  { razorpayOrderId: razorpay_order_id },
  {
    paymentStatus: "PAID",
    razorpayPaymentId: razorpay_payment_id,
    razorpaySignature: razorpay_signature,
  },
  { new: true }
  
);
console.log("ORDER UPDATED");
try {
  await order.populate("items.product");
  console.log("POPULATE COMPLETE");
} catch (err) {
  console.error("POPULATE ERROR");
  console.error(err);
  console.error(err.stack);
  throw err;
}

console.log("ORDER QUERY COMPLETE");

   if (!order) {
  throw new Error("Order not found");
}
console.log("ORDER FOUND", order._id);

const user = await User.findById(order.userId);
console.log("USER FOUND");
const address = await Address.findById(order.address);
console.log("ADDRESS FOUND");

// const invoiceNumber = "INV-" + Date.now();
const lastOrder = await Order.findOne({
  invoiceNumber: /^JI\d+$/
}).sort({ invoiceNumber: -1 });

let invoiceNumber = "JI001";

if (lastOrder?.invoiceNumber) {
  const lastNumber = parseInt(
    lastOrder.invoiceNumber.replace("JI", ""),
    10
  );

  invoiceNumber =
    "JI" +
    String(lastNumber + 1).padStart(3, "0");
}

console.log("BEFORE PDF");

order.invoiceNumber = invoiceNumber;
await order.save();
let invoiceBuffer = null;

try {
  console.log("CALLING PDF GENERATOR");

  invoiceBuffer =
    await generateInvoice(
      order,
      user,
      address
    );

  console.log(
    "PDF GENERATED",
    invoiceBuffer.length
  );
} catch (err) {
  console.error(
    "PDF GENERATION FAILED"
  );
  console.error(err);
  console.error(err.stack);
}


console.log("PDF GENERATED");


try {
 await sendInvoiceEmail(
  user.email,
  invoiceBuffer,
  invoiceNumber
);
  console.log("EMAIL SENT");
  
} catch (err) {
  console.error("Email Error:", err);
}

// email to client 
try {

  await transporter.sendMail({

    from: process.env.EMAIL_USER,

    to: "products@juvenisinnovations.in",

    subject: `🎉 New Order Received - Order #${order._id}`,

    html: `
      <div style="
        max-width:700px;
        margin:auto;
        font-family:Arial,sans-serif;
        background:#ffffff;
        border:1px solid #e5e5e5;
        border-radius:10px;
        overflow:hidden;
      ">

        <div style="
          background:#166534;
          padding:20px;
          text-align:center;
        ">

          <img
            src="https://res.cloudinary.com/dufk70tw7/image/upload/v1786600848/juvenis-logo_vm0ltl.png"
            alt="Juvenis Innovations"
            width="220"
            style="
              max-width:220px;
              height:auto;
              display:block;
              margin:0 auto;
            "
          />

        </div>

        <div style="padding:30px;">

          <h2 style="color:#166534;">
            🎉 New Order Received
          </h2>

          <p>
            A new order has been successfully placed
            and payment has been received.
          </p>

          <hr>

          <h3>Order Details</h3>

          <p>
            <b>Order ID:</b> ${order._id}<br>

            <b>Customer:</b> ${user?.name || "-"}<br>

            <b>Email:</b> ${user?.email || "-"}<br>

            <b>Payment Status:</b>
            ${order.paymentStatus}<br>

            <b>Order Status:</b>
            ${order.status}
          </p>

          <hr>

          <h3>Products Ordered</h3>

          <table
            width="100%"
            border="1"
            cellpadding="10"
            cellspacing="0"
            style="border-collapse:collapse;"
          >

            <thead style="background:#f3f4f6;">

              <tr>
                <th align="left">Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>

            </thead>

            <tbody>

              ${order.items.map((item) => {

                const price =
                  item.product?.offerPrice || 0;

                const quantity =
                  item.quantity || 0;

                const total =
                  price * quantity;

                return `
                  <tr>

                    <td>
                      ${item.product?.name || "-"}
                    </td>

                    <td align="center">
                      ${quantity}
                    </td>

                    <td align="center">
                      ₹${price}
                    </td>

                    <td align="center">
                      ₹${total}
                    </td>

                  </tr>
                `;

              }).join("")}

            </tbody>

          </table>

          <div style="
            margin-top:25px;
            text-align:right;
            font-size:18px;
            font-weight:bold;
          ">

            Grand Total:
            ₹${order.amount}

          </div>

          <hr>

          <h3>Shipping Address</h3>

          <p style="line-height:1.8;">

  <b>${address?.fullName || "Customer"}</b><br>

  ${address?.phoneNumber || ""}<br>

  ${address?.area || ""}<br>
  
  ${address?.landmark || ""}<br>
  
  ${address?.city || ""}, ${address?.state || ""}<br>

  ${address?.pincode || ""}<br>

  Email: ${user?.email || ""}

</p>

          <hr>

          <p>
            Please log in to the seller dashboard
            to process this order.
          </p>

          <p>
            <b>Juvenis Innovations</b>
          </p>

        </div>

      </div>
    `,
  });

  console.log(
    "NEW ORDER EMAIL SENT TO SELLER"
  );

} catch (err) {

  console.error(
    "Seller Order Email Error:",
    err
  );

}

return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}




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

