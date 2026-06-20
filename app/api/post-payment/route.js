import { User } from "lucide-react";
import connectDB from "../../../config/db";
import Order from "../../../models/Order";
import Address from "../../../models/Address";

export async function POST(req) {
  try {
    await connectDB();

    const { orderId } = await req.json();

    const order = await Order.findById(orderId)
      .populate("items.product");

    if (!order) {
      return Response.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    const user = await User.findById(order.userId);
    const address = await Address.findById(order.address);

    const invoiceNumber = "INV-" + Date.now();

    order.invoiceNumber = invoiceNumber;
    await order.save();

    const invoicePath = await generateInvoice(
      order,
      user,
      address,
      invoiceNumber
    );

    order.invoiceUrl = `/invoices/${invoiceNumber}.pdf`;
    await order.save();

    await sendInvoiceEmail(user.email, invoicePath, invoiceNumber);

    return Response.json({ success: true });

  } catch (error) {
    console.log("POST PAYMENT ERROR:", error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}