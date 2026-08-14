"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { FileText } from "lucide-react";

const OrderDetails = () => {
  const params = useParams();
  const router = useRouter();

  const orderId = params.id;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [refundLoading, setRefundLoading] = useState(false);
const [user, setUser] = useState(null);

  // ==========================================
  // LOAD ORDER
  // ==========================================

 useEffect(() => {
  const loadOrder = async () => {
    try {
      const sellerId = localStorage.getItem("sellerId");
      const sellerRole = localStorage.getItem("sellerRole");

      if (!sellerId || !sellerRole) {
        router.push("/seller/login");
        return;
      }

      const { data } = await axios.get(
        `/api/order/${orderId}`
      );
      console.log("FULL ORDER:", data);

      if (data.success) {
        setOrder(data.order);
setUser(data.user);
      } else {
        toast.error(data.message || "Order not found");
      }

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to load order"
      );

    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    loadOrder();
  }

}, [orderId, router]);


  // ==========================================
  // UPDATE ORDER STATUS
  // ==========================================

  const updateStatus = async (status) => {

    try {

      setUpdating(true);

      const { data } = await axios.put(
        `/api/seller/orders/${orderId}`,
        {
          status,
        }
      );

      if (data.success) {

        setOrder((prev) => ({
          ...prev,
          status,
        }));

        toast.success("Order status updated");

      } else {

        toast.error(
          data.message || "Failed to update status"
        );

      }

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update status"
      );

    } finally {

      setUpdating(false);

    }

  };


  // ==========================================
  // MARK REFUNDED
  // ==========================================

  const markAsRefunded = async () => {

    const confirmRefund = window.confirm(
      "Are you sure you want to mark this order as refunded?"
    );

    if (!confirmRefund) return;

    try {

      setRefundLoading(true);

      const { data } = await axios.put(
        `/api/seller/orders/${orderId}/refund`
      );

      if (data.success) {

        setOrder((prev) => ({
          ...prev,
          refundStatus: "Refunded",
        }));

        toast.success(
          "Order marked as refunded"
        );

      } else {

        toast.error(
          data.message ||
          "Failed to mark as refunded"
        );

      }

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Refund failed"
      );

    } finally {

      setRefundLoading(false);

    }

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <div className="flex-1 min-h-screen flex items-center justify-center">

        <p className="text-gray-500">
          Loading order...
        </p>

      </div>
    );

  }


  // ==========================================
  // ORDER NOT FOUND
  // ==========================================

  if (!order) {

    return (
      <div className="flex-1 min-h-screen flex flex-col items-center justify-center">

        <h2 className="text-xl font-semibold">
          Order not found
        </h2>

        <button
          onClick={() => router.push("/seller/orders")}
          className="mt-4 px-5 py-2 bg-[#1893bf] text-white rounded-lg"
        >
          Back to Orders
        </button>

      </div>
    );

  }


  const isPaid =
    order.paymentStatus === "PAID" ||
    order.paymentStatus === "Paid";

  const isPaymentFailed =
    order.paymentStatus === "FAILED" ||
    order.paymentStatus === "Failed";

  const isPending =
    order.paymentStatus === "PENDING" ||
    order.paymentStatus === "Pending";

const updateOrderStatus = async (order, e) => {
  const newStatus = e.target.value;

  try {
    setLoading(true);

    const { data } = await axios.patch(
      "/api/order/seller/orders",
      {
        orderId: order._id,
        status: newStatus,
      }
    );

    if (data.success) {
      toast.success("Order status updated");

      setOrder((prev) => ({
        ...prev,
        status: newStatus,
      }));
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to update order"
    );
  } finally {
    setLoading(false);
  }
};

  return (

    <div className="flex-1 min-h-screen bg-[#f4f7fb] p-4 md:p-8">

      {/* ==========================================
          NAVBAR
      ========================================== */}

      <div className="
        flex
        justify-between
        items-center
        bg-white
        rounded-xl
        shadow-sm
        px-5
        py-4
        mb-6
      ">

        <h1 className="
          text-xl
          md:text-2xl
          font-bold
          text-[#166534]
        ">
          Order Details
        </h1>


        <button
          onClick={() =>
            router.push("/seller/orders")
          }
          className="
            bg-[#1893bf]
            text-white
            px-4
            py-2
            rounded-lg
            text-sm
            font-medium
            hover:opacity-90
          "
        >
          ← Back to Orders
        </button>

      </div>


      {/* ==========================================
          ORDER CARD
      ========================================== */}

      <div className="
        bg-white
        rounded-2xl
        shadow-sm
        p-5
        md:p-8
      ">


        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-4
          mb-7
        ">

          <div>

            <h2 className="
              text-2xl
              md:text-3xl
              font-bold
              text-gray-800
            ">
              {order.address?.fullName ||
                "Customer"}
            </h2>

            <p className="text-gray-500 mt-1">
              Order ID: {order._id}
            </p>

          </div>


          {/* INVOICE */}

             <div>
         {isPaid ? (
  <a
    href={`/api/invoice/${order._id}`}
    target="_blank"
    
    rel="noopener noreferrer"
    className="
      inline-flex items-center gap-2
      bg-gradient-to-r
      from-green-500
      to-emerald-600
      hover:from-green-600
      hover:to-emerald-700
      text-white
      px-4 py-2
      rounded-xl
      shadow-md
      hover:shadow-lg
      transition-all duration-300
      text-sm font-medium
    "
  >
    <FileText size={16} />
    Download Invoice
  </a>
) : (
  <button
    disabled
    className="
      inline-flex items-center gap-2
      bg-gray-300
      text-gray-500
      px-4 py-2
      rounded-xl
      cursor-not-allowed
      text-sm font-medium
    "
  >
    <FileText size={16} />
   Download Invoice
  </button>
)}
      </div>

        </div>


        {/* ==========================================
            CUSTOMER INFORMATION
        ========================================== */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-5
          mb-6
        ">


          <div className="
            bg-gray-50
            p-5
            rounded-xl
          ">

            <h4 className="
              text-sm
              text-gray-500
              mb-2
            ">
              Customer Name
            </h4>

            <p className="font-semibold">
              {order.address?.fullName || "-"}
            </p>

          </div>


          <div className="
            bg-gray-50
            p-5
            rounded-xl
          ">

            <h4 className="
              text-sm
              text-gray-500
              mb-2
            ">
              Email
            </h4>

            <p className="font-semibold break-all">
              {user?.email || "-"}
            </p>

          </div>


          <div className="
            bg-gray-50
            p-5
            rounded-xl
          ">

            <h4 className="
              text-sm
              text-gray-500
              mb-2
            ">
              Phone
            </h4>

            <p className="font-semibold">
              {order.address?.phoneNumber || "-"}
            </p>

          </div>


          <div className="
            bg-gray-50
            p-5
            rounded-xl
          ">

            <h4 className="
              text-sm
              text-gray-500
              mb-2
            ">
              Pincode
            </h4>

            <p className="font-semibold">
              {order.address?.pincode || "-"}
            </p>

          </div>

        </div>


        {/* ==========================================
            DELIVERY ADDRESS
        ========================================== */}

        <div className="
          bg-gray-50
          p-5
          rounded-xl
          mb-7
        ">

          <h4 className="
            text-sm
            text-gray-500
            mb-2
          ">
            Delivery Address
          </h4>

          <p className="font-semibold leading-7">

            {order.address?.area || ""} <br/>
            {order.address?.landmark || ""}

            <br />

            {order.address?.city || ""},
            {" "}
            {order.address?.state || ""}

            <br />

            Pincode:
            {" "}
            {order.address?.pincode || ""}

          </p>

        </div>


        {/* ==========================================
            PRODUCTS
        ========================================== */}

        <div className="mb-7">

          <h3 className="
            text-xl
            font-semibold
            mb-4
          ">
            Ordered Products
          </h3>


          {/* DESKTOP HEADER */}

          <div className="
            hidden
            md:grid
            grid-cols-4
            gap-4
            bg-gray-100
            px-4
            py-3
            rounded-t-lg
            font-semibold
            text-gray-600
          ">

            <div>Product</div>

            <div className="text-center">
              Quantity
            </div>

            <div className="text-center">
              Price
            </div>

            <div className="text-right">
              Total
            </div>

          </div>


          {order.items?.map((item, index) => {

            const product =
              item.product || {};

            const price =
              product.offerPrice ??
              item.price ??
              0;

            const quantity =
              item.quantity || 0;

            const total =
              price * quantity;


            return (

              <div
                key={item._id || index}
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-4
                  gap-3
                  md:gap-4
                  px-4
                  py-4
                  border-b
                  border-gray-200
                "
              >

                <div>

                  <p className="font-medium">
                    {product.name ||
                      item.name ||
                      "Product"}
                  </p>

                  {item.size && (

                    <p className="
                      text-sm
                      text-gray-500
                    ">
                      Size: {item.size}
                    </p>

                  )}

                </div>


                <div className="
                  md:text-center
                  text-gray-600
                ">

                  Qty:
                  {" "}
                  {quantity}

                </div>


                <div className="
                  md:text-center
                  text-gray-600
                ">

                  ₹{price}

                </div>


                <div className="
                  md:text-right
                  font-semibold
                ">

                  ₹{total}

                </div>

              </div>

            );

          })}

        </div>


        {/* ==========================================
            TOTAL
        ========================================== */}

        <div className="
          ml-auto
          max-w-md
          bg-green-50
          rounded-xl
          p-5
        ">

          <div className="
            flex
            justify-between
            mb-3
            text-gray-600
          ">

            <span>
              Subtotal
            </span>

            <span>
              ₹{order.amount || 0}
            </span>

          </div>


          <div className="
            flex
            justify-between
            mb-3
            text-gray-600
          ">

            <span>
              Shipping Charges
            </span>

            <span>
              ₹{order.shippingCharge || 0}
            </span>

          </div>


          <hr className="my-3" />


          <div className="
            flex
            justify-between
            text-xl
            font-bold
            text-green-700
          ">

            <span>
              Total Amount
            </span>

            <span>
              ₹
              {(Number(order.amount) || 0) +
                (Number(order.shippingCharge) || 0)}
            </span>

          </div>

        </div>


        {/* ==========================================
            REFUND will work on
        ========================================== */}

        {/* <div className="mt-7">

          <h3 className="
            text-xl
            font-semibold
            mb-3
          ">
            Refund
          </h3>


          {order.refundStatus === "Refunded" ? (

            <button
              disabled
              className="
                bg-green-600
                text-white
                px-5
                py-3
                rounded-lg
                font-semibold
              "
            >
              ✓ Refunded
            </button>

          ) : isPending || isPaymentFailed ? (

            <button
              disabled
              className="
                bg-gray-300
                text-gray-500
                px-5
                py-3
                rounded-lg
              "
            >
              Mark as Refund
            </button>

          ) : (

            <button
              onClick={markAsRefunded}
              disabled={refundLoading}
              className="
                bg-red-600
                text-white
                px-5
                py-3
                rounded-lg
                font-semibold
                disabled:opacity-50
              "
            >

              {refundLoading
                ? "Processing..."
                : "Mark as Refund"}

            </button>

          )}

        </div> */}


        {/* ==========================================
            STATUS + PAYMENT
        ========================================== */}

        <div className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-6
          mt-8
          pt-6
          border-t
        ">


          {/* ORDER STATUS */}

          <div>

            <h3 className="
              text-xl
              font-semibold
              mb-3
            ">
              Order Status
            </h3>


<select
  value={order.status}
  disabled={order.paymentStatus !== "PAID" || loading}
  onChange={(e) => updateOrderStatus(order, e)}
  className="w-full border rounded-xl px-3 py-2"
>
  <option value="Pending">Pending</option>
  <option value="Dispatched">Dispatched</option>
  <option value="Delivered">Delivered</option>
  <option value="Cancelled">Cancelled</option>
</select>
          </div>


          {/* PAYMENT STATUS */}

          <div>

            <h3 className="
              text-xl
              font-semibold
              mb-3
            ">
              Payment Status
            </h3>


            <span className={`
              inline-block
              px-4
              py-2
              rounded-full
              font-semibold

              ${
                isPaid
                  ? "bg-green-100 text-green-700"
                  : isPaymentFailed
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }
            `}>

              {order.paymentStatus}

            </span>

          </div>

        </div>

      </div>

    </div>

  );

};

export default OrderDetails;