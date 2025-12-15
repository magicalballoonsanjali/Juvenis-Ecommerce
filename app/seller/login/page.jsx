'use client';
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAppContext } from "../../../context/AppContext";

const SellerLogin = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const {setUser,setIsSeller}=useAppContext()

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) return toast.error("Please enter email");

    try {
      const { data } = await axios.post("/api/seller/login", { email });
      console.log(data)

      if (data.success) {
        toast.success(data.message);
        localStorage.setItem("sellerEmail", data.seller.email);

        localStorage.setItem("sellerId", data.seller._id);
        // localStorage.setItem("isSeller", "true");
        setUser(data.seller)
        setIsSeller(true)

        router.push("/seller"); // redirect to seller dashboard
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md space-y-4 w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold text-center">Seller Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your seller email"
          className="w-full border border-gray-400 px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#1893bf] text-white py-2 rounded font-medium"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SellerLogin;
