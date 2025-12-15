
// import { useAppContext } from "../context/AppContext";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import axios from "axios";

// const OrderSummary = () => {

//   const { currency, router, getCartCount, getCartAmount,getToken,user,cartItems,setCartItems } = useAppContext()
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const [userAddresses, setUserAddresses] = useState([]);

//   const fetchUserAddresses = async () => {

//       try{
//           const userId = localStorage.getItem("userId");
//             if (!userId) return toast.error("User not found");
//         const { data } = await axios.get(`/api/user/get-address?userId=${userId}`);
//         if(data.success){
//           setUserAddresses(data.addresses)
//           if(data.addresses && data.addresses.length > 0 ){
//             setSelectedAddress(data.addresses[0])
//           }
//         }else{
//           toast.error(data.message)
//         }
//       }catch(error){
//         toast.error(error.message)
//       }
//   }

//   const handleAddressSelect = (address) => {
//     setSelectedAddress(address);
//     setIsDropdownOpen(false);
//   };

//   const createOrder = async () => {
//   try {
//     if (!selectedAddress) {
//       return toast.error("Please select an address");
//     }

//     // Convert cartItems object to array
//     let cartItemsArray = Object.keys(cartItems)
//       .map((key) => ({ product: key, quantity: cartItems[key] }))
//       .filter((item) => item.quantity > 0);

//     if (cartItemsArray.length === 0) {
//       return toast.error("Cart is empty");
//     }

//     const userId = localStorage.getItem("userId"); // get userId from localStorage

//     if (!userId) {
//       return toast.error("User not found");
//     }

//     const { data } = await axios.post("/api/checkout", {
//       userId,
//       addressId: selectedAddress._id,
//       items: cartItemsArray,
//     });

//     if (data.success) {
//       toast.success(data.message || "Order created successfully!");
//       setCartItems({}); // clear cart
//       if (data.url) {
//         // redirect to payment
//         window.location.href = data.url;
//       } else {
//         router.push("/order-placed"); // fallback if no payment url
//       }
//     } else {
//       toast.error(data.message || "Failed to create order");
//     }
//   } catch (error) {
//     toast.error(error.response?.data?.message || error.message);
//   }
// };

//   useEffect(() => {
//     if(user){
//       fetchUserAddresses();
//     }
  
//   }, [user])

//   return (
//     <div className="w-full md:w-96 bg-gray-500/5 p-5">
//       <h2 className="text-xl md:text-2xl font-medium text-gray-700">
//         Order Summary
//       </h2>
//       <hr className="border-gray-500/30 my-5" />
//       <div className="space-y-6">
//         <div>
//           <label className="text-base font-medium uppercase text-gray-600 block mb-2">
//             Select Address
//           </label>
//           <div className="relative inline-block w-full text-sm border">
//             <button
//               className="peer w-full text-left px-4 pr-2 py-2 bg-white text-gray-700 focus:outline-none"
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             >
//               <span>
//                 {selectedAddress
//                   ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
//                   : "Select Address"}
//               </span>
//               <svg className={`w-5 h-5 inline float-right transition-transform duration-200 ${isDropdownOpen ? "rotate-0" : "-rotate-90"}`}
//                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#6B7280"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//               </svg>
//             </button>

//             {isDropdownOpen && (
//               <ul className="absolute w-full bg-white border shadow-md mt-1 z-10 py-1.5">
//                 {userAddresses.map((address, index) => (
//                   <li
//                     key={index}
//                     className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer"
//                     onClick={() => handleAddressSelect(address)}
//                   >
//                     {address.fullName}, {address.area}, {address.city}, {address.state}
//                   </li>
//                 ))}
//                 <li
//                   onClick={() => router.push("/add-address")}
//                   className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer text-center"
//                 >
//                   + Add New Address
//                 </li>
//               </ul>
//             )}
//           </div>
//         </div>

//         <div>
//           <label className="text-base font-medium uppercase text-gray-600 block mb-2">
//             Promo Code
//           </label>
//           <div className="flex flex-col items-start gap-3">
//             <input
//               type="text"
//               placeholder="Enter promo code"
//               className="flex-grow w-full outline-none p-2.5 text-gray-600 border"
//             />
//             <button className="bg-[#009bf1] text-white px-9 py-2 hover:bg-[#5589a5]">
//               Apply
//             </button>
//           </div>
//         </div>

//         <hr className="border-gray-500/30 my-5" />

//         <div className="space-y-4">
//           <div className="flex justify-between text-base font-medium">
//             <p className="uppercase text-gray-600">Items {getCartCount()}</p>
//             {/* <p className="text-gray-800"> {currency}{(getCartAmount() + getCartAmount() * 0.02).toFixed(2)}</p> */}
//           </div>
//           <div className="flex justify-between">
//             <p className="text-gray-600">Shipping Fee</p>
//             <p className="font-medium text-gray-800">Free</p>
//           </div>
//           <div className="flex justify-between">
//             <p className="text-gray-600">Tax (2%)</p>
//             {/* <p className="font-medium text-gray-800">{currency}{(getCartAmount() * 0.02).toFixed(2)}</p> */}
//           </div>
//           <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">
//             <p>Total</p>
//             {/* <p> {currency}{(getCartAmount() + getCartAmount() * 0.02).toFixed(2)}</p> */}
//           </div>
//         </div>
//       </div>

//       <button onClick={createOrder} className="w-full bg-[#009bf1] text-white py-3 mt-5 hover:bg-[#5589a5]">
//         Place Order
//       </button>
//     </div>
//   );
// };

// export default OrderSummary;





// new
// ===============================
// OrderSummary.jsx (FINAL VERSION)
// ===============================

import { useAppContext } from "../context/AppContext";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const OrderSummary = () => {
  const {
    currency,
    router,
    getCartCount,
    getCartAmount,
    user,
    cartItems,
    setCartItems,
  } = useAppContext();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);

  // -----------------------------
  // Fetch user addresses
  // -----------------------------
  const fetchUserAddresses = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return toast.error("User not found");

      const { data } = await axios.get(
        `/api/user/get-address?userId=${userId}`
      );

      if (data.success) {
        setUserAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  // -----------------------------
  // Load Razorpay script
  // -----------------------------
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  // -----------------------------
  // Create Order
  // -----------------------------
  const createOrder = async () => {
    try {
      if (!selectedAddress) return toast.error("Please select an address");

      let cartItemsArray = Object.keys(cartItems)
        .map((key) => ({ product: key, quantity: cartItems[key] }))
        .filter((item) => item.quantity > 0);

      if (cartItemsArray.length === 0)
        return toast.error("Cart is empty");

      const userId = localStorage.getItem("userId");
      if (!userId) return toast.error("User not found");

      // 1️⃣ Create Razorpay order
      const { data } = await axios.post("/api/payment", {
        userId,
        addressId: selectedAddress._id,
        items: cartItemsArray,
      });

      if (!data.success)
        return toast.error("Failed to create Razorpay order");

      const { razorpayOrder, key } = data;

      // 2️⃣ Load Razorpay script
      const loaded = await loadRazorpay();
      if (!loaded) return toast.error("Razorpay failed to load");

      // 3️⃣ Open Razorpay popup
      const options = {
        key,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Juvenis",
        description: "Order Payment",
        order_id: razorpayOrder.id,

        handler: async function (response) {
  try {
    const verifyRes = await axios.post("/api/verify", {
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
      orderId: data.orderId, // 👈 must come from backend
    });

    if (verifyRes.data.success) {
      toast.success("Payment successful!");
      setCartItems({});
      router.push("/order-placed");
    } else {
      toast.error("Payment verification failed");
    }
  } catch (error) {
    toast.error("Payment verification error");
  }
},


        theme: { color: "#009bf1" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) fetchUserAddresses();
  }, [user]);

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700">
        Order Summary
      </h2>

      <hr className="border-gray-500/30 my-5" />

      {/* Address */}
      <div className="space-y-6">
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Select Address
          </label>

          <div className="relative inline-block w-full text-sm border">
            <button
              className="peer w-full text-left px-4 pr-2 py-2 bg-white text-gray-700 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedAddress
                ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                : "Select Address"}

              <svg
                className={`w-5 h-5 inline float-right transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-0" : "-rotate-90"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="#6B7280"
                fill="none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border shadow-md mt-1 z-10 py-1.5">
                {userAddresses.map((address, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullName}, {address.area}, {address.city},{" "}
                    {address.state}
                  </li>
                ))}

                <li
                  onClick={() => router.push("/add-address")}
                  className="px-4 py-2 hover:bg-gray-500/10 text-center cursor-pointer"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        <hr className="border-gray-500/30 my-5" />

        {/* Cart Summary */}
        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-gray-600">
              Items {getCartCount()}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-600">Shipping Fee</p>
            <p className="font-medium text-gray-800">Free</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-600">Tax (2%)</p>
            <p className="font-medium text-gray-800">Included</p>
          </div>

          <div className="flex justify-between text-lg font-medium border-t pt-3">
            <p>Total</p>
          </div>
        </div>
      </div>

      <button
        onClick={createOrder}
        className="w-full bg-[#009bf1] text-white py-3 mt-5 hover:bg-[#5589a5]"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;
