export const runtime = "nodejs";

import connectDB from "../../../../config/db";

import Order from "../../../../models/Order";
import User from "../../../../models/User";
import Address from "../../../../models/Address";


import { generateInvoice } from "../../../../lib/generateInvoice";

export async function GET(
  req,
  { params }
) {
  try {
    await connectDB();
    const { orderId } = await params;
  console.log("ORDER ID:", orderId);

    const order =
      await Order.findById(
        orderId
      );

console.log(
    "ORDER RESULT:",
    order
  );
    if (!order) {
      return Response.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 }
      );
    }

    await order.populate(
      "items.product"
    );

    const user =
      await User.findById(
        order.userId
      );

    const address =
      await Address.findById(
        order.address
      );

    const pdfBuffer =
      await generateInvoice(
        order,
        user,
        address
      );

    return new Response(
      pdfBuffer,
      {
        headers: {
          "Content-Type":
            "application/pdf",

          "Content-Disposition":
            `attachment; filename="${order.invoiceNumber}.pdf"`,
        },
      }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}