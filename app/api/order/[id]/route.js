
import connectDB from "../../../../config/db";
import Order from "../../../../models/Order";

export async function GET(req, { params }) {
  try {
    console.log("ROUTE HIT");

    const { id } = await params;

    console.log("ID RECEIVED:", id);

    await connectDB();

    const order = await Order.findById(id)
      .populate("address")
      .populate("items.product");

    console.log("ORDER:", order);

    if (!order) {
      return Response.json({
        success: false,
        message: "Order not found",
      });
    }

    return Response.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      success: false,
      message: error.message,
    });
  }
}