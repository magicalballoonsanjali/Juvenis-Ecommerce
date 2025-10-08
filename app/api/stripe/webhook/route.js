import Stripe from "stripe";
import Order from "@/models/Order";
import connectDB from "@/config/db";

export const config = {
  api: {
    bodyParser: false, // ⚠️ important for Stripe
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await connectDB();

  const sig = req.headers.get("stripe-signature");
  const payload = await req.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook Error:", err.message);
    return new Response("Webhook Error", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Stripe session ID from webhook:", session.id);

    const updatedOrder = await Order.findOneAndUpdate(
      { stripeSessionId: session.id },
      { paymentStatus: "PAID", status: "Processing" },
      { new: true }
    );

    if (!updatedOrder) {
      console.error("Order not found for session ID:", session.id);
    } else {
      console.log("Order updated via webhook:", updatedOrder);
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
