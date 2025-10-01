// app/api/user/wishlist/route.js
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";


export async function GET(req) {
  await connectDB();
  const { userId } = getAuth(req);
  if (!userId) return NextResponse.json({ success: false, message: "Not logged in" }, { status: 401 });

  const user = await User.findById(userId);
  return NextResponse.json({ success: true, wishlist: user?.wishlist || [] });
}


export async function POST(req) {
  await connectDB();
  const { userId } = getAuth(req);
  if (!userId) return NextResponse.json({ success: false, message: "Not logged in" }, { status: 401 });

  const { productId } = await req.json();
  const user = await User.findById(userId);
  if (!user) return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });

  const idx = user.wishlist.findIndex(id => id === productId);
  if (idx > -1) user.wishlist.splice(idx, 1);
  else user.wishlist.push(productId);
  await user.save();

  return NextResponse.json({ success: true, wishlist: user.wishlist });
}
