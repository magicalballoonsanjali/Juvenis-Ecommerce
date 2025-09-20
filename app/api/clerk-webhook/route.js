import { Webhook } from "svix";
import { headers } from "next/headers";
import connectDB from "@/lib/connectDB";
import User from "@/models/User";

export async function POST(req) {
  const payload = await req.text();

  // Extract Svix headers
  const headerList = headers();
  const svixHeaders = {
    "svix-id": headerList.get("svix-id"),
    "svix-timestamp": headerList.get("svix-timestamp"),
    "svix-signature": headerList.get("svix-signature"),
  };

  // Verify
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  const wh = new Webhook(webhookSecret);

  let evt;
  try {
    evt = wh.verify(payload, svixHeaders);
  } catch (err) {
    console.error("❌ Webhook verification failed:", err.message);
    return new Response("Invalid signature", { status: 400 });
  }

  const { type: eventType, data } = evt;

  await connectDB();

  try {
    if (eventType === "user.created") {
      await User.create({
        _id: data.id,
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        email: data.email_addresses[0]?.email_address,
        imageURL: data.image_url,
        cartItems: "",
      });
    }

    if (eventType === "user.updated") {
      await User.findByIdAndUpdate(
        data.id,
        {
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
          email: data.email_addresses[0]?.email_address,
          imageURL: data.image_url,
        },
        { new: true }
      );
    }

    if (eventType === "user.deleted") {
      await User.findByIdAndDelete(data.id);
    }
  } catch (err) {
    console.error("❌ DB error:", err);
    return new Response("DB error", { status: 500 });
  }

  return new Response("ok", { status: 200 });
}
