import Stripe from "stripe";
import Order from "@/models/Order";
import connectDB from "@/config/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await connectDB();

  const sig = req.headers.get("stripe-signature");
  const payload = await req.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook Error:", err.message);
    return new Response("Webhook Error", { status: 400 });
  }

  // Handle checkout session completion
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const updatedOrder = await Order.findOneAndUpdate(
      { stripeSessionId: session.id },
      { paymentStatus: "PAID", status: "Processing" },
      { new: true }
    );

    console.log("Order updated via webhook:", updatedOrder);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
