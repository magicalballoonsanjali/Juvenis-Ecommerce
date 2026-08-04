import Razorpay from "razorpay";
import connectDB from "../../../../config/db";
import Order from "../../../../models/Order";

export async function POST(req) {
  try {
    await connectDB();

    const { orderId } = await req.json();

    if (!orderId) {
      throw new Error("Order ID is required");
    }

    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.paymentStatus === "PAID") {
      throw new Error("Order is already paid");
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(order.amount * 100),
      currency: "INR",
      receipt: order._id.toString(),
    });

    // Save new Razorpay Order ID
    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    return Response.json({
      success: true,
      razorpayOrder,
      key: process.env.RAZORPAY_KEY_ID,
      orderId: order._id,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}