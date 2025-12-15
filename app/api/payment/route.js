// import Razorpay from "razorpay";
// import Order from "../../../models/Order";
// import Product from "../../../models/Products";
// import connectDB from "../../../config/db";
// import Address from "../../../models/Address";

// export async function POST(req) {
//   try {
//     await connectDB();

//     const { items, addressId, userId } = await req.json();

//     if (!addressId) throw new Error("Address is required");

//     const addressData = await Address.findById(addressId);
//     if (!addressData) throw new Error("Invalid address");

//     if (!userId) {
//       return new Response(JSON.stringify({ success: false, message: "userId is required" }), {
//         status: 400,
//       });
//     }

//     // Fetch products from DB
//     const productIds = items.map((item) => item.product);
//     const products = await Product.find({ _id: { $in: productIds } });

//     let totalAmount = 0;

//     items.forEach((item) => {
//       const product = products.find((p) => p._id.toString() === item.product);
//       if (!product) throw new Error(`Product not found: ${item.product}`);

//       totalAmount += product.offerPrice * item.quantity;
//     });

//     // convert to paisa (required by Razorpay)
//     const finalAmount = Math.round(totalAmount * 100);

//     // ------------------------
//     // 1️⃣ Create Razorpay Order
//     // ------------------------
//     const razorpay = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET,
//     });

//     const razorpayOrder = await razorpay.orders.create({
//       amount: finalAmount,
//       currency: "INR",
//       receipt: "receipt_order_" + Date.now(),
//     });




//     // ------------------------
//     // 2️⃣ Save Order in DB as PENDING
//     // ------------------------
//     await Order.create({
//       userId,
//       items,
//       amount: finalAmount,
//       address: addressData,
//       paymentStatus: "PENDING",
//       razorpayOrderId: razorpayOrder.id,
//       date: Date.now(),
//       status: "Order Placed",
//     });

//     return new Response(
//       JSON.stringify({
//         success: true,
//         razorpayOrder,
//         key: process.env.RAZORPAY_KEY_ID, // ⭐ VERY IMPORTANt
//       }),
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



// new
import Razorpay from "razorpay";
import Order from "../../../models/Order";
import Product from "../../../models/Products";
import connectDB from "../../../config/db";
import Address from "../../../models/Address";

export async function POST(req) {
  try {
    await connectDB();

    const { items, addressId, userId } = await req.json();

    if (!userId) throw new Error("userId is required");
    if (!addressId) throw new Error("Address is required");

    const addressData = await Address.findById(addressId);
    if (!addressData) throw new Error("Invalid address");

    // ------------------------
    // Fetch products
    // ------------------------
    const productIds = items.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    let totalAmount = 0;

    items.forEach((item) => {
      const product = products.find(
        (p) => p._id.toString() === item.product
      );
      if (!product) throw new Error("Product not found");

      totalAmount += product.offerPrice * item.quantity;
    });

    const finalAmount = Math.round(totalAmount * 100); // paisa

    // ------------------------
    // 1️⃣ CREATE ORDER IN DB
    // ------------------------
    const order = await Order.create({
      userId,
      items,
      amount: finalAmount,
      address: addressData,
      paymentMethod: "RAZORPAY",
      paymentStatus: "PENDING",
      status: "Order Placed",
      date: Date.now(),
    });

    // ------------------------
    // 2️⃣ CREATE RAZORPAY ORDER
    // ------------------------
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: finalAmount,
      currency: "INR",
      receipt: order._id.toString(), // 🔥 LINK DB ORDER
    });

    // ------------------------
    // 3️⃣ UPDATE DB ORDER
    // ------------------------
    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    // ------------------------
    // 4️⃣ RETURN RESPONSE
    // ------------------------
    return new Response(
      JSON.stringify({
        success: true,
        razorpayOrder,
        key: process.env.RAZORPAY_KEY_ID,
        orderId: order._id, // ✅ NOW WORKS
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
}
