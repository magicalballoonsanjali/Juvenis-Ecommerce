"use client";
import React, { Suspense, useEffect, useState } from "react";
import { assets } from "../../assets/juvenis-assets";
import Image from "next/image";
import { useAppContext } from "../../context/AppContext";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";
import axios from "axios";

const MyOrders = () => {
  const { currency, user,userLoaded } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  if (!userLoaded) return; // wait for user to load

  const fetchOrders = async () => {

    // if(!user) {setLoading(false); return}
    if (!user?._id) {
      toast.error("Please log in first");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.get(`/api/order/list?userId=${user._id}`);
      if (data.success) {
        setOrders(data.orders.reverse());
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, [user,userLoaded]);

  return (
    <>
      <Suspense fallback={<div>Loading Navbar...</div>}>
        <Navbar />
      </Suspense>

      {/* MAIN CONTENT WRAPPER */}
      <main className="flex flex-col px-6 md:px-16 lg:px-32 py-10 min-h-[80vh]">
        <h2 className="text-lg md:text-2xl font-semibold mb-6">My Orders</h2>

        {loading ? (
          <Loading />
        ) : orders.length === 0 ? (
          <p className="mt-10 text-gray-500">No orders found.</p>
        ) : (
          <div className="max-w-5xl border-t border-gray-300 text-sm space-y-4">
            {orders.map((order, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-5 justify-between p-5 border-b border-gray-300"
              >
                {/* Product Summary */}
                <div className="flex-1 flex gap-5 max-w-80">
                  <Image
                    className="w-16 h-16 object-cover"
                    src={assets.parcel_icon}
                    alt="box_icon"
                    width={64}
                    height={64}
                  />
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-base space-y-1">
                      {order.items
                        ?.map(
                          (item,index) =>(
                            <p key={index} >
                              {item.product?.name || "Product"} x {
                              item.quantity
                            }
                            </p>
                          )
                        )
                        }
                    </span>
                    <span className="text-sm text-gray-600">Items: {order.items?.length || 0}</span>
                  </div>
                </div>

                {/* Address */}
                <div className="text-gray-700">
                  <p className="text-sm">
                    <span className="font-medium">
                      {order.address?.fullName || "No Name"}
                    </span>
                    <br />
                    <span>{order.address?.area || "No Area"}</span>
                    <br />
                    <span>
                      {`${order.address?.city || "City"}, ${
                        order.address?.state || "State"
                      }`}
                    </span>
                    <br />
                    <span>{order.address?.phoneNumber || "No Phone"}</span>
                  </p>
                </div>

                {/* Amount */}
                <p className="font-medium my-auto">
                  {currency} {(order.amount / 100).toFixed(2)}
                </p>

                {/* Status */}
                <div className="flex flex-col gap-1 text-sm">
                  <span>
                    Date: {new Date(order.date).toLocaleDateString()}
                  </span>
                  <span>
                    Order Status:{" "}
                    <span
                      className={`font-medium ${
                        order.status === "Cancelled"
                          ? "text-red-600"
                          : order.status === "Dispatch"
                          ? "text-orange-500"
                          : "text-green-600"
                      }`}
                    >
                      {order.status || "Unknown"}
                    </span>
                  </span>
                  <span>
                    Payment Status:{" "}
                    <span
                      className={
                        order.paymentStatus === "PAID"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {order.paymentStatus || "Pending"}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default MyOrders;
