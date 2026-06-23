"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Footer2 from "../../../components/Footer2";

export default function OrderDetails() {
  const params = useParams();
  const [order, setOrder] = useState(null);

useEffect(() => {
  if (!params?.id) return;

  console.log("Fetching order:", params.id);

  const fetchOrder = async () => {
    const { data } = await axios.get(
      `/api/order/${params.id}`
    );

    console.log(data);

    if (data.success) {
      setOrder(data.order);
    }
  };

  fetchOrder();
}, [params?.id]);

  if (!order) {
    return <p>Loading...</p>;
  }
const orderSteps = {
  Pending: 0,
  Dispatched: 1,
  Delivered: 2,
};

const currentStep =
  orderSteps[order.status] ?? -1;       
  return (
  <>
<Navbar/>
  <div className="min-h-screen bg-gray-50 py-10 px-4">
    <div className="max-w-5xl mx-auto">
<div className="bg-white rounded-2xl shadow-sm p-6 mb-6 flex justify-between ">

      {/* Header */}
      <div className="">
        <h1 className="text-3xl font-bold text-green-700">
          Order Details
        </h1>

        <p className="text-gray-500 mt-2">
          Invoice No: {order.invoiceNumber}
        </p>

        <p className="text-gray-500 break-all">
          Order ID: {order._id}
        </p>
      </div>
      {/* Invoice Button */}
      <div className="text-center">
        <a
          href={`/api/invoice/${order._id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex
            items-center
            gap-2
            bg-green-600
            hover:bg-green-700
            text-white
            px-6
            py-3
            rounded-xl
            font-medium
            transition
          "
        >
          Download Invoice
        </a>
      </div>
</div>
      {/* Status Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 flex flex-col md:flex-row gap-6 justify-between">

        {/* Order Tracking */}

<div className="bg-white rounded-2xl shadow-sm p-6 ">
  <h2 className="text-xl font-semibold mb-6">
    Order Tracking
  </h2>

  {order.status === "Cancelled" ? (
    <div className="flex items-center gap-4">
      <div
        className="
          w-10 h-10
          rounded-full
          bg-red-100
          text-red-600
          flex items-center justify-center
          font-bold 
        "
      >
        ✕
      </div>

      <div>
        <h3 className="font-semibold text-red-600">
          Order Cancelled
        </h3>

        <p className="text-gray-500 text-sm">
          This order was cancelled.
        </p>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-between gap-15">
  {["Pending", "Dispatched", "Delivered"].map(
    (step, index) => (
      <div
        key={step}
        className="flex-1 flex items-center"
      >
        <div className="flex flex-col items-center w-full">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
              index <= currentStep
                ? "bg-green-600"
                : "bg-gray-300"
            }`}
          >
            {index < currentStep
              ? "✓"
              : index + 1}
          </div>

          <span
            className={`mt-2 text-sm ${
              index <= currentStep
                ? "text-green-600"
                : "text-gray-400"
            }`}
          >
            {step}
          </span>
        </div>

        {index < 2 && (
          <div
            className={`h-1 flex-1 mb-7 ${
              index < currentStep
                ? "bg-green-600"
                : "bg-gray-300"
            }`}
          />
        )}
      </div>
    )
  )}
</div>
  )}
</div>

      <div className="flex flex-col md:flex-row gap-4 mt-4">

  {/* Payment Status */}
  <div className="bg-white rounded-2xl shadow-sm p-6 ">
    <h3 className="text-md font-medium text-gray-500 mb-3">
      Payment Status
    </h3>

    <span
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
      ${
        order.paymentStatus === "PAID"
          ? "bg-green-100 text-green-700 border border-green-200"
          : "bg-red-100 text-red-600 border border-red-200"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${
          order.paymentStatus === "PAID"
            ? "bg-green-500"
            : "bg-red-500"
        }`}
      />
      {order.paymentStatus}
    </span>
  </div>

  {/* Order Date */}
  <div className="bg-white rounded-2xl shadow-sm p-6 flex-1">
    <h3 className="text-md font-medium text-gray-500 mb-3">
      Order Date
    </h3>

    <p className="text-lg font-semibold text-gray-800">
      {new Date(order.date).toLocaleDateString()}
    </p>
  </div>

</div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Delivery Address
        </h2>

        <p className="font-medium">
          {order.address?.fullName}
        </p>

        <p>{order.address?.phoneNumber}</p>

        <p>
          {order.address?.area}
        </p>

        <p>
          {order.address?.city},{" "}
          {order.address?.state}
        </p>
      </div>

      {/* Products */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-5">
          Ordered Products
        </h2>

        <div className="space-y-5">
          {order.items.map((item) => (
            <div
              key={item._id}
              className="flex gap-4 border-b pb-4"
            >
              <img
                src={item.product?.image?.[0]}
                alt={item.product?.name}
                className="w-24 h-24 rounded-xl object-cover border"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                  {item.product?.name}
                </h3>

                <p className="text-gray-500">
                  Quantity: {item.quantity}
                </p>

                <p className="text-green-700 font-semibold mt-1">
                  ₹{item.product?.offerPrice}
                </p>
              </div>

              <div className="font-semibold">
                ₹
                {item.quantity *
                  item.product?.offerPrice}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Payment Summary
        </h2>

        <div className="flex justify-between mb-3">
          <span>Subtotal</span>
          <span>₹{order.amount}</span>
        </div>

        <div className="flex justify-between mb-3">
          <span>Shipping</span>
          <span>Free</span>
        </div>

        <hr />

        <div className="flex justify-between mt-4 text-xl font-bold text-green-700">
          <span>Total</span>
          <span>₹{order.amount}</span>
        </div>
      </div>

    

    </div>
  </div>
  <Footer2/>
  </>
  );
}