"use client";

import React from "react";
import { assets } from "../../assets/juvenis-assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear seller session
    localStorage.removeItem("sellerEmail");
    localStorage.removeItem("sellerId");

    // Redirect to login
    router.push("/seller/login");
  };

  return (
    <div className="flex items-center px-4 md:px-8 py-3 justify-between border-b">
      <Image
        className="cursor-pointer"
        onClick={() => router.push("/")}
        src={assets.juvenis_logo}
        alt="logo"
      />
      <button
        onClick={handleLogout}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
