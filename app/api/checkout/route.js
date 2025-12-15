import Stripe from "stripe";
import Order from "../../../models/Order";
import Product from "../../../models/Products";
import connectDB from "../../../config/db";
import Address from "../../../models/Address";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    await connectDB();

     const { items, addressId, userId } = await req.json();

  if (!addressId) throw new Error("Address is required");

  const addressData = await Address.findById(addressId);
  if (!addressData) throw new Error("Invalid address");


    if (!userId) {
      return new Response(JSON.stringify({ success: false, message: "userId is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }




    // Fetch products from DB
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
          unit_amount: Math.round(product.offerPrice * 100),
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
      amount: line_items.reduce((sum, i) => sum + i.price_data.unit_amount * i.quantity, 0),
      address:addressData,
      paymentStatus: "PENDING",
      stripeSessionId: session.id,
      date: Date.now(),
      status: "Order Placed",
    });

    return new Response(JSON.stringify({ success: true, url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
