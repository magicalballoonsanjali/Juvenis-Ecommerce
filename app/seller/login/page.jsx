"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAppContext } from "../../../context/AppContext";

const SellerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const {
    setUser,
    setIsSeller,
  } = useAppContext();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      const { data } = await axios.post(
        "/api/seller/login",
        {
          email,
          password,
        }
      );

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);

      // Save login information
      localStorage.setItem(
        "sellerId",
        data.seller._id
      );

      localStorage.setItem(
        "sellerEmail",
        data.seller.email
      );

      localStorage.setItem(
        "sellerRole",
        data.seller.role
      );

      // Save in Context
      setUser(data.seller);
      setIsSeller(true);

      // IMPORTANT:
      // Both admin and seller go to Orders
      router.push("/seller/orders");

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-5"
      >

        <h2 className="text-xl font-semibold text-center">
          Seller Login
        </h2>

        {/* EMAIL */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter email"
            className="w-full border border-gray-300 px-3 py-2.5 rounded outline-none"
            required
          />
        </div>

        {/* PASSWORD */}

        <div>
          <label className="block text-sm font-medium mb-1">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Enter password"
            className="w-full border border-gray-300 px-3 py-2.5 rounded outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#1893bf] text-white py-2.5 rounded font-medium"
        >
          Login
        </button>

      </form>

    </div>
  );
};

export default SellerLogin;