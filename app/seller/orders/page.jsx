// "use client";
// import React, { useEffect, useState } from "react";
// import { assets } from "../../../assets/juvenis-assets";
// import Image from "next/image";
// import { useAppContext } from "../../../context/AppContext";
// import Footer from "../../../components/Footer";
// import Loading from "../../../components/Loading";
// import toast from "react-hot-toast";
// import axios from "axios";

// const Orders = () => {
//   const { currency, user } = useAppContext();

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Update order status without token
//   const orderStatus = async (orderId, newStatus) => {
//     try {
//       const { data } = await axios.patch("/api/order/seller/orders", {
//         orderId,
//         status: newStatus,
//       });

//       if (data.success) {
//         setOrders((prev) =>
//           prev.map((o) =>
//             o._id === orderId ? { ...o, status: newStatus } : o
//           )
//         );
//         toast.success("Order status updated");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   const fetchSellerOrders = async () => {
//     if (!user) {
//       toast.error("User not logged in");
//       setLoading(false);
//       return;
//     }

//     try {
//       const { data } = await axios.get(
//         `/api/order/seller/orders?userId=${user._id}`
//       ); // send userId from context
//       if (data.success) {
//         const sortedOrders = data.orders.sort((a, b) => b.date - a.date);
//         setOrders(sortedOrders);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSellerOrders();
//   }, [user]);

//   if (loading) return <Loading />;

//   if (!user) return <p className="p-10 text-center text-red-500">Please login to view orders.</p>;

//   return (
//     <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm">
//       <div className="md:p-10 p-4 space-y-5">
//         <h2 className="text-lg font-medium">Orders</h2>
//         <div className="max-w-4xl rounded-md">
//           {orders.length === 0 && <p>No orders found</p>}
//           {orders.map((order) => (
//             <div
//               key={order._id}
//               className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-gray-300"
//             >
//               <div className="flex-1 flex gap-5 max-w-80">
//                 <Image
//                   className="max-w-16 max-h-16 object-cover"
//                   src={assets.box_icon}
//                   alt="box_icon"
//                 />
//                 <p className="flex flex-col gap-3">
//                   <span className="font-medium">
//                     {order.items
//                       .map((item) =>
//                         item.product
//                           ? `${item.product.name} x ${item.quantity}`
//                           : `Deleted Product x ${item.quantity}`
//                       )
//                       .join(", ")}
//                   </span>
//                   <span>Items : {order.items.length}</span>
//                 </p>
//               </div>

//               <div>
//                 <p>
//                   <span className="font-medium">{order.address.fullName}</span>
//                   <br />
//                   <span>{order.address.area}</span>
//                   <br />
//                   <span>{`${order.address.city}, ${order.address.state}`}</span>
//                   <br />
//                   <span>{order.address.phoneNumber}</span>
//                 </p>
//               </div>

//               <p className="font-medium my-auto">
//                 {currency} {(order.amount / 100).toFixed(2)}
//               </p>

//               <div>
//                 <p className="flex flex-col">
//                   <span>Date : {new Date(order.date).toLocaleDateString()}</span>
//                   <span>Payment Status:</span>
//                   <span
//                     className={
//                       order.paymentStatus === "PAID"
//                         ? "text-green-600"
//                         : "text-red-600"
//                     }
//                   >
//                     {order.paymentStatus}
//                   </span>
//                 </p>
//               </div>

//               <div className="flex gap-2 flex-col">
//                 <div>Order Status</div>
//                 <div className="flex md:justify-center items-center">
//                   <select
//                     value={order.status}
//                     onChange={(e) => orderStatus(order._id, e.target.value)}
//                     className="flex border p-1 rounded text-center"
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Dispatch">Dispatch</option>
//                     <option value="Delivery">Delivery</option>
//                     <option value="Cancelled">Cancelled</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Orders;





// orignal 14th august

// "use client"
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useEffect, useState } from "react";
// import { useAppContext } from "../../../context/AppContext";
// import { assets } from "../../../assets/juvenis-assets";
// import Image from "next/image";
// import { FileText, Loader2Icon } from "lucide-react";
// import { Router } from "next/router";
// import { useRouter } from "next/navigation";

// export default function SellerOrders() {
//     const { user, isSeller } = useAppContext();
//     const router = useRouter()
//   const [sellerId, setSellerId] = useState("")
//   const [orders, setOrders] = useState([]);
//   const [orderStatusLoaderId, setOrderStatusLoaderId] = useState("")
    
//   // Fetch all orders on mount if user is a seller
//   useEffect(() => {
//     // if (!user?._id || !isSeller) return;
//     const id = localStorage.getItem("sellerId")
//     setSellerId(id)
//     if(sellerId) {
//       fetchOrders();
//     }
//   }, [sellerId]);

//   const fetchOrders = async () => {
//     try {
//       // GET all orders (no filtering by seller)
//       const { data } = await axios.get(`/api/order/seller/orders?sellerId=${sellerId}`);
//       // console.log(data)
//       if (data.success) setOrders(data.orders);
//       else toast.error(data.message);
//     } catch (err) {
//       toast.error("Failed to load orders");
//     }
//   };

//   const updateOrderStatus = (order) =>async(e)=> {
//     const newStatus = e.target.value
//     setOrderStatusLoaderId(order.id)
//     try {
//       const { data } = await axios.patch(`/api/order/seller/orders`, {
//         orderId : order._id,
//         status: newStatus,
//         sellerId: sellerId,
//       });
//       if (data.success) {
//         toast.success("Order updated");
//         fetchOrders(); // refresh updated data
//       } else toast.error(data.message);
//     } catch (err) {
//       toast.error("Failed to update order");
//     }finally{
//       setOrderStatusLoaderId("")
//     }
//   };

//   return (
//     <div className="flex-1 min-h-screen bg-gray-50 overflow-y-auto">
//       {/* {loading ? (
//         <Loading />
//       ) : ( */}
//        <div className="max-w-7xl mx-auto p-4 md:p-8">
//           <div className="mb-8">
//   <h2 className="text-3xl font-bold text-gray-900">
//     Orders
//   </h2>

//   <p className="text-gray-500 mt-1">
//     Manage and track customer orders
//   </p>
// </div>
//           <div className="space-y-5">
//             {orders.map((order, index) => (
//              <div
//  key={order._id}
//     onClick={() =>
//       router.push(`/seller/order-details/${order._id}`)
//     }
//   className="
//     bg-white
//     border border-gray-200
//     rounded-2xl
//     shadow-sm
//     hover:shadow-lg
//     transition-all duration-300
//     p-5 md:p-6
//   "
// >
//   {/* Header */}
//   <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5 border-b pb-4">
//     <div>
//       <h3 className="font-semibold text-lg text-gray-800">
//         Order #{order._id.slice(-6)}
//       </h3>

//       <p className="text-sm text-gray-500">
//         Date : {new Date(order.date).toLocaleDateString()}
//       </p>
//     </div>

//     <span
//       className={`inline-flex w-fit px-3 py-1 rounded-full text-xs font-semibold ${
//         order.paymentStatus === "PAID"
//           ? "bg-green-100 text-green-700"
//           : "bg-red-100 text-red-700"
//       }`}
//     >
//       {order.paymentStatus}
//     </span>
//   </div>

//   <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-6">
    
//      {/* Customer */}
//     <div>
//       <h4 className="font-semibold text-gray-800 mb-2">
//         Customer
//       </h4>

//       <div className="text-sm text-gray-600 leading-6">
//         <p className="font-medium text-gray-800">
//           {order.address.fullName}
//         </p>

//         <p>{order.address.area}</p>
//         <p>{order.address.landmark}</p>

//         <p>
//           {order.address.city},{" "}
//           {order.address.state}
//         </p>

//         <p>{order.address.phoneNumber}</p>
//       </div>
//     </div>

//     {/* Products */}
//     <div className="xl:col-span-2 flex gap-4">
//       {/* <Image
//         className="w-16 h-16 object-contain shrink-0"
//         src={assets.parcel_icon}
//         alt="box_icon"
//       /> */}

//       <div className="flex flex-col gap-2">
//         <h4 className="font-semibold text-gray-800">
//           Ordered Products
//         </h4>

//         <div className="flex flex-col gap-1 text-sm text-gray-600">
//           {order.items.map((item, idx) => (
//             <span key={idx}>
//               {item.product
//                 ? `${item.product.name} x ${item.quantity}`
//                 : `Deleted Product x ${item.quantity}`}
//             </span>
//           ))}
//         </div>

//        <span className="text-sm font-medium text-gray-500">
//   Items : {order.items.reduce((total, item) => total + item.quantity, 0)}
// </span>
//       </div>
//     </div>

   

//     {/* Amount */}
//     <div>
//       <h4 className="font-semibold text-gray-800 mb-2">
//         Amount
//       </h4>

//       <p className="text-2xl font-bold text-green-600">
//         Rs {order.amount }
//       </p>
//     </div>

//     {/* Status + Invoice */}
//     <div className="flex flex-col gap-5">
      
//       <div>
//         <h4 className="font-semibold text-gray-800 mb-2">
//           Order Status
//         </h4>

//         <select
//   value={order.status}
//   disabled
//   className={`
//     w-full
//     border
//     rounded-xl
//     px-3 py-2
//     focus:outline-none

//     ${
//       order.status === "Pending"
//         ? "bg-yellow-100 text-yellow-800 border-yellow-300"
//         : order.status === "Dispatched"
//         ? "bg-blue-100 text-blue-800 border-blue-300"
//         : order.status === "Delivered"
//         ? "bg-green-100 text-green-800 border-green-300"
//         : order.status === "Cancelled"
//         ? "bg-red-100 text-red-800 border-red-300"
//         : "bg-gray-100 text-gray-600 border-gray-300"
//     }
//   `}
// >
//   <option value="Pending">Pending</option>
//   <option value="Dispatched">Dispatched</option>
//   <option value="Delivered">Delivered</option>
//   <option value="Cancelled">Cancelled</option>
// </select>
//       </div>


 
     
//     </div>
//   </div>
// </div>

// ))}
//           </div>
//         </div>
//     </div>
//   );
// }

//new filter one
"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { useRouter } from "next/navigation";

export default function SellerOrders() {
  const { user, isSeller } = useAppContext();
  const router = useRouter();

  const [sellerId, setSellerId] = useState("");
  const [orders, setOrders] = useState([]);
  const [orderStatusLoaderId, setOrderStatusLoaderId] = useState("");

  // ==============================
  // FILTER STATES
  // ==============================

  const [paymentFilter, setPaymentFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  // ==============================
  // FETCH ORDERS
  // ==============================

  useEffect(() => {
    const id = localStorage.getItem("sellerId");

    setSellerId(id);

    if (id) {
      fetchOrders(id);
    }
  }, []);

  const fetchOrders = async (id = sellerId) => {
    try {
      const { data } = await axios.get(
        `/api/order/seller/orders?sellerId=${id}`
      );

      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load orders");
    }
  };

  // ==============================
  // UPDATE ORDER STATUS
  // ==============================

  const updateOrderStatus = (order) => async (e) => {
    const newStatus = e.target.value;

    setOrderStatusLoaderId(order._id);

    try {
      const { data } = await axios.patch(
        `/api/order/seller/orders`,
        {
          orderId: order._id,
          status: newStatus,
          sellerId: sellerId,
        }
      );

      if (data.success) {
        toast.success("Order updated");
        fetchOrders();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update order");
    } finally {
      setOrderStatusLoaderId("");
    }
  };

  // ==============================
  // FILTER ORDERS
  // ==============================

  const filteredOrders = orders.filter((order) => {
    // ------------------------------
    // PAYMENT FILTER
    // ------------------------------

    const paymentMatch =
      paymentFilter === "ALL" ||
      order.paymentStatus === paymentFilter;

    // ------------------------------
    // ORDER STATUS FILTER
    // ------------------------------

    const statusMatch =
      statusFilter === "ALL" ||
      order.status === statusFilter;

    // ------------------------------
    // SEARCH
    // ------------------------------

    const searchText = search.toLowerCase().trim();

    const customerName =
      order.address?.fullName?.toLowerCase() || "";

    const phone =
      order.address?.phoneNumber?.toLowerCase() || "";

    const city =
      order.address?.city?.toLowerCase() || "";

    const orderId =
      order._id?.toLowerCase() || "";

    const amount =
      String(order.amount || "").toLowerCase();

    const paymentStatus =
      order.paymentStatus?.toLowerCase() || "";

    const orderStatus =
      order.status?.toLowerCase() || "";

    const productNames =
      order.items
        ?.map((item) => item.product?.name || "")
        .join(" ")
        .toLowerCase() || "";

    /*
      Email:
      Your Order currently doesn't contain email directly.
      We will safely check it if it exists.
    */
    const email =
      order.email?.toLowerCase() ||
      order.userId?.email?.toLowerCase() ||
      "";

    const searchMatch =
      !searchText ||
      customerName.includes(searchText) ||
      email.includes(searchText) ||
      phone.includes(searchText) ||
      city.includes(searchText) ||
      orderId.includes(searchText) ||
      amount.includes(searchText) ||
      paymentStatus.includes(searchText) ||
      orderStatus.includes(searchText) ||
      productNames.includes(searchText);

    return (
      paymentMatch &&
      statusMatch &&
      searchMatch
    );
  });

  // ==============================
  // UI
  // ==============================

  return (
    <div className="flex-1 min-h-screen bg-gray-50 overflow-y-auto">

      <div className="max-w-7xl mx-auto p-4 md:p-8">

        {/* =========================
            PAGE TITLE
        ========================= */}

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Orders
          </h2>

          <p className="text-gray-500 mt-1">
            Manage and track customer orders
          </p>
        </div>


        {/* =========================
            FILTER + SEARCH
        ========================= */}

        <div className="
          bg-white
          border border-gray-200
          rounded-2xl
          p-4 md:p-5
          mb-7
          shadow-sm
        ">

          <div className="
            flex
            flex-col
            xl:flex-row
            xl:items-end
            gap-5
            justify-between
          ">

            {/* =====================
                PAYMENT FILTER
            ===================== */}

            <div className="flex flex-col gap-2">

              <h4 className="
                text-sm
                font-semibold
                text-gray-700
              ">
                Payment
              </h4>

              <div className="flex flex-wrap gap-2">

                <button
                  onClick={() => setPaymentFilter("ALL")}
                  className={`
                    px-4 py-2
                    rounded-xl
                    text-sm
                    font-medium
                    border
                    transition
                    ${
                      paymentFilter === "ALL"
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                    }
                  `}
                >
                  All
                </button>

                <button
                  onClick={() => setPaymentFilter("PAID")}
                  className={`
                    px-4 py-2
                    rounded-xl
                    text-sm
                    font-medium
                    border
                    transition
                    ${
                      paymentFilter === "PAID"
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-green-50"
                    }
                  `}
                >
                  Paid
                </button>

                <button
                  onClick={() => setPaymentFilter("PENDING")}
                  className={`
                    px-4 py-2
                    rounded-xl
                    text-sm
                    font-medium
                    border
                    transition
                    ${
                      paymentFilter === "PENDING"
                        ? "bg-yellow-500 text-white border-yellow-500"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-yellow-50"
                    }
                  `}
                >
                  Pending
                </button>

              </div>

            </div>


            {/* =====================
                ORDER STATUS FILTER
            ===================== */}

            <div className="flex flex-col gap-2">

              <h4 className="
                text-sm
                font-semibold
                text-gray-700
              ">
                Order Status
              </h4>

              <div className="flex flex-wrap gap-2">

                <button
                  onClick={() => setStatusFilter("ALL")}
                  className={`
                    px-4 py-2
                    rounded-xl
                    text-sm
                    font-medium
                    border
                    transition
                    ${
                      statusFilter === "ALL"
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                    }
                  `}
                >
                  All
                </button>

                <button
                  onClick={() => setStatusFilter("Pending")}
                  className={`
                    px-4 py-2
                    rounded-xl
                    text-sm
                    font-medium
                    border
                    transition
                    ${
                      statusFilter === "Pending"
                        ? "bg-yellow-500 text-white border-yellow-500"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-yellow-50"
                    }
                  `}
                >
                  Pending
                </button>

                <button
                  onClick={() => setStatusFilter("Dispatched")}
                  className={`
                    px-4 py-2
                    rounded-xl
                    text-sm
                    font-medium
                    border
                    transition
                    ${
                      statusFilter === "Dispatched"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-blue-50"
                    }
                  `}
                >
                  Dispatched
                </button>

                <button
                  onClick={() => setStatusFilter("Delivered")}
                  className={`
                    px-4 py-2
                    rounded-xl
                    text-sm
                    font-medium
                    border
                    transition
                    ${
                      statusFilter === "Delivered"
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-green-50"
                    }
                  `}
                >
                  Delivered
                </button>

                <button
                  onClick={() => setStatusFilter("Cancelled")}
                  className={`
                    px-4 py-2
                    rounded-xl
                    text-sm
                    font-medium
                    border
                    transition
                    ${
                      statusFilter === "Cancelled"
                        ? "bg-red-600 text-white border-red-600"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-red-50"
                    }
                  `}
                >
                  Cancelled
                </button>

              </div>

            </div>


            {/* =====================
                SEARCH
            ===================== */}

            <div className="
              flex
              flex-col
              gap-2
              xl:min-w-[280px]
            ">

              <h4 className="
                text-sm
                font-semibold
                text-gray-700
              ">
                Search Orders
              </h4>

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search name, email, amount..."
                className="
                  w-full
                  px-4
                  py-2.5
                  rounded-xl
                  border
                  border-gray-200
                  outline-none
                  focus:ring-2
                  focus:ring-green-500
                  focus:border-green-500
                  text-sm
                "
              />

            </div>

          </div>


          {/* =========================
              RESULT COUNT
          ========================= */}

          <div className="
            mt-4
            pt-4
            border-t
            border-gray-100
            text-sm
            text-gray-500
          ">
            Showing{" "}
            <span className="font-semibold text-gray-800">
              {filteredOrders.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-800">
              {orders.length}
            </span>{" "}
            orders
          </div>

        </div>


        {/* =========================
            ORDERS
        ========================= */}

        <div className="space-y-5">

          {filteredOrders.length === 0 ? (

            <div className="
              bg-white
              border border-gray-200
              rounded-2xl
              p-12
              text-center
            ">

              <h3 className="
                text-xl
                font-semibold
                text-gray-800
              ">
                No Orders Found
              </h3>

              <p className="
                text-gray-500
                mt-2
              ">
                Try changing your filters or search.
              </p>

            </div>

          ) : (

            filteredOrders.map((order) => (

              <div
                key={order._id}
                onClick={() =>
                  router.push(
                    `/seller/order-details/${order._id}`
                  )
                }
                className="
                  bg-white
                  border border-gray-200
                  rounded-2xl
                  shadow-sm
                  hover:shadow-lg
                  transition-all duration-300
                  p-5 md:p-6
                  cursor-pointer
                "
              >

                {/* =========================
                    HEADER
                ========================= */}

                <div className="
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  gap-3
                  mb-5
                  border-b
                  pb-4
                ">

                  <div>

                    <h3 className="
                      font-semibold
                      text-lg
                      text-gray-800
                    ">
                      Order #{order._id.slice(-6)}
                    </h3>

                    <p className="
                      text-sm
                      text-gray-500
                    ">
                      Date :{" "}
                      {new Date(
                        order.date
                      ).toLocaleDateString()}
                    </p>

                  </div>


                  {/* PAYMENT STATUS */}

                  <span
                    className={`
                      inline-flex
                      w-fit
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-semibold
                      ${
                        order.paymentStatus === "PAID"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {order.paymentStatus}
                  </span>

                </div>


                {/* =========================
                    ORDER CONTENT
                ========================= */}

                <div className="
                  grid
                  grid-cols-1
                  lg:grid-cols-2
                  xl:grid-cols-5
                  gap-6
                ">

                  {/* CUSTOMER */}

                  <div>

                    <h4 className="
                      font-semibold
                      text-gray-800
                      mb-2
                    ">
                      Customer
                    </h4>

                    <div className="
                      text-sm
                      text-gray-600
                      leading-6
                    ">

                      <p className="
                        font-medium
                        text-gray-800
                      ">
                        {order.address?.fullName}
                      </p>

                      <p>
                        {order.address?.area}
                      </p>

                      <p>
                        {order.address?.landmark}
                      </p>

                      <p>
                        {order.address?.city},{" "}
                        {order.address?.state}
                      </p>

                      <p>
                        {order.address?.phoneNumber}
                      </p>

                    </div>

                  </div>


                  {/* PRODUCTS */}

                  <div className="
                    xl:col-span-2
                    flex gap-4
                  ">

                    <div className="
                      flex
                      flex-col
                      gap-2
                    ">

                      <h4 className="
                        font-semibold
                        text-gray-800
                      ">
                        Ordered Products
                      </h4>

                      <div className="
                        flex
                        flex-col
                        gap-1
                        text-sm
                        text-gray-600
                      ">

                        {order.items.map(
                          (item, idx) => (

                            <span key={idx}>

                              {item.product
                                ? `${item.product.name} x ${item.quantity}`
                                : `Deleted Product x ${item.quantity}`}

                            </span>

                          )
                        )}

                      </div>

                      <span className="
                        text-sm
                        font-medium
                        text-gray-500
                      ">
                        Items :{" "}
                        {order.items.reduce(
                          (total, item) =>
                            total + item.quantity,
                          0
                        )}
                      </span>

                    </div>

                  </div>


                  {/* AMOUNT */}

                  <div>

                    <h4 className="
                      font-semibold
                      text-gray-800
                      mb-2
                    ">
                      Amount
                    </h4>

                    <p className="
                      text-2xl
                      font-bold
                      text-green-600
                    ">
                      Rs {order.amount}
                    </p>

                  </div>


                  {/* STATUS */}

                  <div className="
                    flex
                    flex-col
                    gap-5
                  ">

                    <div>

                      <h4 className="
                        font-semibold
                        text-gray-800
                        mb-2
                      ">
                        Order Status
                      </h4>

                      <select
                        value={order.status}
                        disabled
                        onClick={(e) =>
                          e.stopPropagation()
                        }
                        className={`
                          w-full
                          border
                          rounded-xl
                          px-3
                          py-2
                          focus:outline-none
                          ${
                            order.status === "Pending"
                              ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                              : order.status === "Dispatched"
                              ? "bg-blue-100 text-blue-800 border-blue-300"
                              : order.status === "Delivered"
                              ? "bg-green-100 text-green-800 border-green-300"
                              : order.status === "Cancelled"
                              ? "bg-red-100 text-red-800 border-red-300"
                              : "bg-gray-100 text-gray-600 border-gray-300"
                          }
                        `}
                      >

                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Dispatched">
                          Dispatched
                        </option>

                        <option value="Delivered">
                          Delivered
                        </option>

                        <option value="Cancelled">
                          Cancelled
                        </option>

                      </select>

                    </div>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}