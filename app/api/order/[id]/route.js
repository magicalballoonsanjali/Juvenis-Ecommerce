
import connectDB from "../../../../config/db";
import Order from "../../../../models/Order";
import Address from "../../../../models/Address";
import User from "../../../../models/User";
import Product from "../../../../models/Products";

export async function GET(req, { params }) {
  try {
    console.log("ROUTE HIT");

    const { id } = await params;

    console.log("ID RECEIVED:", id);

    await connectDB();

    const order = await Order.findById(id)
  .populate("address")
  .populate("items.product")
  .populate("userId");

  const user = await User.findById(order.userId).select(
  "name email"
);


    console.log("ORDER:", order);
    if (!order) {
      return Response.json({
        success: false,
        message: "Order not found",
      });
    }

    console.log("FULL ORDER:", JSON.stringify(order, null, 2));
    

    return Response.json({
      success: true,
      order,
      user,
    });
  } catch (error) {
     console.error("ORDER DETAILS ERROR:", error);

    return Response.json({
      success: false,
      message: error.message,
    });
  }
}