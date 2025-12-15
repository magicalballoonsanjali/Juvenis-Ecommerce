"use client";
import { useState } from "react";

export default function CheckoutButton({ amount }) {
  const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = resolve;
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    await loadRazorpay();

    // 1️⃣ create order from backend
    const res = await fetch("/api/payment", {
      method: "POST",
      body: JSON.stringify({ amount }),
    });
    const { order } = await res.json();

    // 2️⃣ open Razorpay checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      name: "Juvenis",
      description: "Order Payment",
      order_id: order.id,
      handler: function (response) {
        alert("Payment Successful!");
        console.log(response);
      },
      theme: {
        color: "#e39992",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="px-6 py-3 bg-black text-white rounded-lg"
    >
      Pay ₹{amount}
    </button>
  );
}
