"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "../assets/juvenis-assets";
import { Heart, HomeIcon, Menu, X, User } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";


export default function Navbar() {
  const { user, router, mockLogin, logout } = useAppContext();
const isSeller = user?.isSeller;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const routerNext = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  const debouncedNavigate = useDebouncedCallback((query) => {
    const url = query.trim()
      ? `/all-products?search=${encodeURIComponent(query)}`
      : `/all-products`;
    routerNext.push(url);
  }, 500);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedNavigate(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const url = searchQuery.trim()
        ? `/all-products?search=${encodeURIComponent(searchQuery)}`
        : `/all-products`;
      routerNext.push(url);
    }
  };

//  useEffect(() => {
//   if (user) setIsSeller(user.isSeller);
// }, [user]);
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <nav className="relative flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
        <Image
          className="hidden md:block cursor-pointer"
          onClick={() => routerNext.push("/")}
          src={assets.juvenis_logo}
          alt="logo"
        />

    {/* Navigation Links */}
<div className="flex items-center gap-6 max-md:hidden">
  <Link
    href="/"
    className="relative group text-gray-700 hover:text-[#1893bf] transition"
  >
    Home
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#1893bf] transition-all duration-300 group-hover:w-full"></span>
  </Link>

  <Link
    href="/all-products"
    className="relative group text-gray-700 hover:text-[#1893bf] transition"
  >
    Shop
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#1893bf] transition-all duration-300 group-hover:w-full"></span>
  </Link>

  <Link
    href="/about-us"
    className="relative group text-gray-700 hover:text-[#1893bf] transition"
  >
    About Us
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#1893bf] transition-all duration-300 group-hover:w-full"></span>
  </Link>

  <Link
    href="/contact-us"
    className="relative group text-gray-700 hover:text-[#1893bf] transition"
  >
    Contact
    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#1893bf] transition-all duration-300 group-hover:w-full"></span>
  </Link>
  {isSeller && (
  <button
    onClick={() => router.push("/seller")}
    className="text-xs border px-4 py-1.5 rounded-full"
  >
    Seller Dashboard
  </button>
)}

</div>


        {/* Search + Icons */}
        <ul className="hidden md:flex items-center gap-4">
          <div className="flex items-center border rounded-full px-3 py-1">
            <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              placeholder="Search products..."
              className="outline-none px-2 py-1 text-sm"
            />
          </div>

          <button onClick={() => routerNext.push("/wishlist")}>
            <Image className="w-4 h-4" src={assets.heart_icon} alt="heart_icon" />
          </button>

          {/* Custom Dropdown Menu */}
          <div className="relative">
            <button
  onClick={() => setMenuOpen(!menuOpen)}
  className="flex items-center gap-2 hover:text-gray-900 transition"
>
  <User size={20} />
  {user ? user.name : "Account"}
</button>

  {menuOpen && (
  <div
    className="absolute right-0 mt-3 bg-white shadow-xl rounded-lg w-52 p-3 border border-gray-200 z-50"
    style={{
      backdropFilter: "none",
      WebkitBackdropFilter: "none",
    }}
  >
    {[
      { label: "Home", path: "/" },
      { label: "Products", path: "/all-products" },
      { label: "Cart", path: "/cart" },
      { label: "My Orders", path: "/my-orders" },
      { label: "Wishlist", path: "/wishlist" },
    ].map((item, i) => (
      <button
        key={i}
        onClick={() => {
          routerNext.push(item.path);
          setMenuOpen(false);
        }}
        className="flex items-center gap-2 w-full text-left py-2 px-2 hover:bg-gray-100 rounded-md transition"
      >
        {item.label}
      </button>
    ))}

    <hr className="my-2 border-gray-300" />

    {user ? (
      <button
        onClick={() => {
          logout();
          setMenuOpen(false);
        }}
        className="w-full py-2 px-2 text-red-600 hover:bg-red-50 rounded-md transition"
      >
        Logout
      </button>
    ) : (
      <button
            onClick={() => router.push("/login")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
    )}
  </div>
)}

          </div>
        </ul>

        {/* Mobile Navbar */}
      
      </nav>
      <div className="md:hidden relative flex items-center justify-between py-3 px-4 bg-white gap-10 border-b border-gray-300">
      
      {/* LEFT: Hamburger Drawer */}
      <button onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* CENTER: Logo */}
       <Image
          className=" md:hidden  cursor-pointer"
          onClick={() => router.push("/")}
          src={assets.juvenis_logo}
          alt="logo"
        />

      {/* RIGHT: User Menu */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 hover:text-gray-900 transition"
        >
          <User size={20} />
          {user ? user.name : "Account"}
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-3 bg-white shadow-xl rounded-lg w-52 p-3 border border-gray-200 z-50">
            {[
              { label: "Home", path: "/" },
              { label: "Products", path: "/all-products" },
              { label: "Cart", path: "/cart" },
              { label: "My Orders", path: "/my-orders" },
              { label: "Wishlist", path: "/wishlist" },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  router.push(item.path);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full text-left py-2 px-2 hover:bg-gray-100 rounded-md transition"
              >
                {item.label}
              </button>
            ))}

            <hr className="my-2 border-gray-300" />

            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="w-full py-2 px-2 text-red-600 hover:bg-red-50 rounded-md transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  router.push("/login");
                  setMenuOpen(false);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>

      {/* LEFT DRAWER CONTENT */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-white  shadow-md flex flex-col gap-4 px-6 py-4 z-50">
          
          {/* Search Bar */}
          <div className="flex items-center border rounded-lg px-3 py-1">
            <Image
              className="w-4 h-4"
              src={assets.search_icon}
              alt="search icon"
              width={16}
              height={16}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              placeholder="Search products..."
              className="outline-none px-2 py-1 text-sm w-full"
            />
          </div>

          {/* Navigation Links */}
          <Link href="/" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <Link href="/all-products" onClick={() => setMobileOpen(false)}>
            Shop
          </Link>
          <Link href="/about-us" onClick={() => setMobileOpen(false)}>
            About Us
          </Link>
          <Link href="/contact-us" onClick={() => setMobileOpen(false)}>
            Contact
          </Link>

          {/* Seller Dashboard */}
          {isSeller && (
            <button
              onClick={() => {
                router.push("/seller");
                setMobileOpen(false);
              }}
              className="text-md px-2 py-2 border rounded-lg mt-2"
            >
              Seller Dashboard
            </button>
          )}
        </div>
      )}
    </div>
      
    </Suspense>
  );
}
