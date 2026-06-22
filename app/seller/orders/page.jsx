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





// old

"use client"
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { assets } from "../../../assets/juvenis-assets";
import Image from "next/image";
import { FileText, Loader2Icon } from "lucide-react";

export default function SellerOrders() {
    const { user, isSeller } = useAppContext();
  const [sellerId, setSellerId] = useState("")
  const [orders, setOrders] = useState([]);
  const [orderStatusLoaderId, setOrderStatusLoaderId] = useState("")  
  // Fetch all orders on mount if user is a seller
  useEffect(() => {
    // if (!user?._id || !isSeller) return;
    const id = localStorage.getItem("sellerId")
    setSellerId(id)
    if(sellerId) {
      fetchOrders();
    }
  }, [sellerId]);

  const fetchOrders = async () => {
    try {
      // GET all orders (no filtering by seller)
      const { data } = await axios.get(`/api/order/seller/orders?sellerId=${sellerId}`);
      // console.log(data)
      if (data.success) setOrders(data.orders);
      else toast.error(data.message);
    } catch (err) {
      toast.error("Failed to load orders");
    }
  };

  const updateOrderStatus = (order) =>async(e)=> {
    const newStatus = e.target.value
    setOrderStatusLoaderId(order.id)
    try {
      const { data } = await axios.patch(`/api/order/seller/orders`, {
        orderId : order._id,
        status: newStatus,
        sellerId: sellerId,
      });
      if (data.success) {
        toast.success("Order updated");
        fetchOrders(); // refresh updated data
      } else toast.error(data.message);
    } catch (err) {
      toast.error("Failed to update order");
    }finally{
      setOrderStatusLoaderId("")
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-gray-50 overflow-y-auto">
      {/* {loading ? (
        <Loading />
      ) : ( */}
       <div className="max-w-7xl mx-auto p-4 md:p-8">
          <div className="mb-8">
  <h2 className="text-3xl font-bold text-gray-900">
    Orders
  </h2>

  <p className="text-gray-500 mt-1">
    Manage and track customer orders
  </p>
</div>
          <div className="space-y-5">
            {orders.map((order, index) => (
             <div
  key={index}
  className="
    bg-white
    border border-gray-200
    rounded-2xl
    shadow-sm
    hover:shadow-lg
    transition-all duration-300
    p-5 md:p-6
  "
>
  {/* Header */}
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5 border-b pb-4">
    <div>
      <h3 className="font-semibold text-lg text-gray-800">
        Order #{order._id.slice(-6)}
      </h3>

      <p className="text-sm text-gray-500">
        Date : {new Date(order.date).toLocaleDateString()}
      </p>
    </div>

    <span
      className={`inline-flex w-fit px-3 py-1 rounded-full text-xs font-semibold ${
        order.paymentStatus === "PAID"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {order.paymentStatus}
    </span>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-6">
    
    {/* Products */}
    <div className="xl:col-span-2 flex gap-4">
      <Image
        className="w-16 h-16 object-contain shrink-0"
        src={assets.parcel_icon}
        alt="box_icon"
      />

      <div className="flex flex-col gap-2">
        <h4 className="font-semibold text-gray-800">
          Ordered Products
        </h4>

        <div className="flex flex-col gap-1 text-sm text-gray-600">
          {order.items.map((item, idx) => (
            <span key={idx}>
              {item.product
                ? `${item.product.name} x ${item.quantity}`
                : `Deleted Product x ${item.quantity}`}
            </span>
          ))}
        </div>

        <span className="text-sm font-medium text-gray-500">
          Items : {order.items.length}
        </span>
      </div>
    </div>

    {/* Customer */}
    <div>
      <h4 className="font-semibold text-gray-800 mb-2">
        Customer
      </h4>

      <div className="text-sm text-gray-600 leading-6">
        <p className="font-medium text-gray-800">
          {order.address.fullName}
        </p>

        <p>{order.address.area}</p>

        <p>
          {order.address.city},{" "}
          {order.address.state}
        </p>

        <p>{order.address.phoneNumber}</p>
      </div>
    </div>

    {/* Amount */}
    <div>
      <h4 className="font-semibold text-gray-800 mb-2">
        Amount
      </h4>

      <p className="text-2xl font-bold text-green-600">
        Rs {order.amount }
      </p>
    </div>

    {/* Status + Invoice */}
    <div className="flex flex-col gap-5">
      
      <div>
        <h4 className="font-semibold text-gray-800 mb-2">
          Order Status
        </h4>

        <select
          value={order.status}
          onChange={updateOrderStatus(order)}
          className="
            w-full
            border border-gray-300
            rounded-xl
            px-3 py-2
            bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
          "
        >
          <option value="Pending">Pending</option>
          <option value="Dispatch">Dispatch</option>
          <option value="Delivery">Delivery</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      <div>
        <h4 className="font-semibold text-gray-800 mb-2">
          Invoice
        </h4>

        
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
        
      </div>
    </div>
  </div>
</div>

))}
          </div>
        </div>
    </div>
  );
}


// new 
// "use client";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useEffect, useState } from "react";
// import { useAppContext } from "../../../context/AppContext"; // import your context

// export default function SellerOrders() {
//   const { user, isSeller } = useAppContext();
//   const [sellerId, setSellerId] = useState("")
//   const [orders, setOrders] = useState([]);
//   // Fetch all orders on mount if user is a seller
//   useEffect(() => {
//     // if (!user?._id || !isSeller) return;
//     const sellerId = localStorage.getItem("sellerId")
//     setSellerId(sellerId)
//     fetchOrders();
//   }, [user, isSeller]);

//   const fetchOrders = async () => {
//     try {
//       // GET all orders (no filtering by seller)
//       const { data } = await axios.get(`/api/order/seller/orders?sellerId=${sellerId}`);
//       console.log(data)
//       if (data.success) setOrders(data.orders);
//       else toast.error(data.message);
//     } catch (err) {
//       toast.error("Failed to load orders");
//     }
//   };

//   const updateOrderStatus = async (orderId, newStatus) => {
//     try {
//       const { data } = await axios.patch(`/api/order/seller/orders`, {
//         orderId,
//         status: newStatus,
//       });
//       if (data.success) {
//         toast.success("Order updated");
//         fetchOrders(); // refresh updated data
//       } else toast.error(data.message);
//     } catch (err) {
//       toast.error("Failed to update order");
//     }
//   };

//   // if (!isSeller) return <p className="p-6 text-red-500">You are not a seller.</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-semibold mb-4">All Orders</h2>

//       {orders.length === 0 ? (
//         <p>No orders found</p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map(order => (
//             <div key={order._id} className="border p-4 rounded-md">
//               <p><strong>Order ID:</strong> {order._id}</p>
//               <p><strong>User:</strong> {order.userId?.name} ({order.userId?.email})</p>
//               <p><strong>Status:</strong> {order.status}</p>
//               <p>
//                 <strong>Items:</strong>{" "}
//                 {order.items.map(item => `${item.product?.name || "Deleted"} x ${item.quantity}`).join(", ")}
//               </p>
//               <p>
//                 <strong>Amount:</strong> ₹ {(order.amount / 100).toFixed(2)}
//               </p>

//               <div className="mt-2 flex gap-2">
//                 <button
//                   onClick={() => updateOrderStatus(order._id, "Dispatch")}
//                   className="bg-blue-600 text-white px-3 py-1 rounded"
//                 >
//                   Dispatch
//                 </button>
//                 <button
//                   onClick={() => updateOrderStatus(order._id, "Delivered")}
//                   className="bg-green-600 text-white px-3 py-1 rounded"
//                 >
//                   Delivered
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
