import User from "../models/User";
import connectDB from "../config/db";

export default async function authSeller(userId) {
  await connectDB();
  const user = await User.findById(userId);
  if (!user) return false;
  return user.isSeller === true;
}
