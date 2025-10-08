import Stripe from "stripe";
import Order from "@/models/Order";
import Product from "@/models/Product"; // ✅ import Product
import connectDB from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  await connectDB();
  const { userId } = getAuth(req);
  const { items, address } = await req.json();

  // ✅ Fetch products from DB using product IDs
  const productIds = items.map((item) => item.product);
  const products = await Product.find({ _id: { $in: productIds } });

  const line_items = items.map((item) => {
    const product = products.find((p) => p._id.toString() === item.product);
    if (!product) throw new Error(`Product not found: ${item.product}`);

    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: product.name,
          images: product.image ? [product.image[0]] : [],
        },
        unit_amount: Math.round(product.offerPrice * 100), // ✅ Use offerPrice
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_URL}/order-placed`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
  });

  await Order.create({
    userId,
    items,
    amount: line_items.reduce(
      (sum, i) => sum + i.price_data.unit_amount * i.quantity,
      0
    ),
    address,
    paymentStatus: "PENDING",
    stripeSessionId: session.id,
    date: Date.now(),
    status: "Order Placed",
  });

  return new Response(JSON.stringify({ url: session.url }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
