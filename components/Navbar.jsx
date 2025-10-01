"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppContext";
import { assets, CartIcon, BagIcon, BoxIcon } from "@/assets/juvenis-assets";
import { Heart, HomeIcon, Menu, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk();
  const routerNext = useRouter();
  const searchParams = useSearchParams();

  // search query state
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  // handle input change for live search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // handle Enter key to redirect first time
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      routerNext.push(`/all-products?search=${encodeURIComponent(searchQuery)}`);
    }
  };



  return (
      <Suspense fallback={<div>Loading...</div>}>
    <nav className="relative flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <Image
        className=" hidden md:block cursor-pointer"
        onClick={() => router.push("/")}
        src={assets.juvenis_logo}
        alt="logo"
      />

      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="relative group inline-block hover:text-[#1893bf]">
          Home
          <hr className="absolute left-0 -bottom-7 h-[4px] w-0 bg-[#1893bf] transition-all duration-300 ease-in-out group-hover:w-[50px]" />
        </Link>
        <Link href="/all-products" className="relative group inline-block hover:text-[#1893bf]">
          Shop
          <hr className="absolute left-0 -bottom-7 h-[4px] w-0 bg-[#1893bf] transition-all duration-300 ease-in-out group-hover:w-[50px]" />
        </Link>
        <Link href="/about-us" className="relative group inline-block hover:text-[#1893bf]">
          About Us
          <hr className="absolute left-0 -bottom-7 h-[4px] w-0 bg-[#1893bf] transition-all duration-300 ease-in-out group-hover:w-[50px]" />
        </Link>
        <Link href="/contact-us" className="relative group inline-block hover:text-[#1893bf]">
          Contact
          <hr className="absolute left-0 -bottom-7 h-[4px] w-0 bg-[#1893bf] transition-all duration-300 ease-in-out group-hover:w-[50px]" />
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

      <ul className="hidden md:flex items-center gap-4">
        {/* Search Input */}

        <div className="flex items-center border rounded-full px-3 py-1">
          <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Search products..."
            className=" outline-none px-2 py-1 text-sm"
          />
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push("/wishlist");
          }}
        >
          <Image className="w-4 h-4 " src={assets.heart_icon} alt="heart_icon" />
        </button>

        {user ? (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action label="Home" labelIcon={<HomeIcon />} onClick={() => router.push("/")} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="Products" labelIcon={<BoxIcon />} onClick={() => router.push("/all-products")} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push("/cart")} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="My Order" labelIcon={<BagIcon />} onClick={() => router.push("/my-orders")} />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
  onClick={() => routerNext.push('/sign-in')}
  className="flex items-center gap-2 hover:text-gray-900 transition"
>
  <Image src={assets.user_icon} alt="user icon" />
  Account
</button>
        )}
      </ul>

      {/* Mobile Navbar*/}
    
      <div className="md:hidden">
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={28}/> : <Menu size={28} />}
        </button>

        {mobileOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-md flex flex-col gap-4 px-6 py-4 z-50">
             <div className="flex items-center border rounded-lg px-3 py-1">

          <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />

          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Search products..."
            className=" outline-none px-2 py-1 text-sm"
          />
        </div>
            <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/all-products" onClick={() => setMobileOpen(false)}>Shop</Link>
            <Link href="/about-us" onClick={() => setMobileOpen(false)}>About Us</Link>
            <Link href="/contact-us" onClick={() => setMobileOpen(false)}>Contact</Link>

            {isSeller && (
              <button
                onClick={() => {
                  router.push("/seller");
                  setMobileOpen(false);
                }}
                className="text-md px-2 py-2 border rounded-lg"
              >
                Seller Dashboard
              </button>
            )}
          </div>
        )}
      </div> 

       <Image
        className=" md:hidden  cursor-pointer"
        onClick={() => router.push("/")}
        src={assets.juvenis_logo}
        alt="logo"
      />

      <div className="flex items-center md:hidden gap-3">
        {user ? (
         <UserButton>
            <UserButton.MenuItems>
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="Products" labelIcon={<BoxIcon />} onClick={() => router.push("/all-products")} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push("/cart")} />
            </UserButton.MenuItems>
            <UserButton.MenuItems>
              <UserButton.Action label="My Order" labelIcon={<BagIcon />} onClick={() => router.push("/my-orders")} />
              <UserButton.Action label="Wishlist" labelIcon={<Heart  size={20}/>} onClick={() => router.push("/wishlist")} />
            </UserButton.MenuItems>
          </UserButton>
        ) : (
          <button
  onClick={() => routerNext.push('/sign-in')}
  className="flex items-center gap-2 hover:text-gray-900 transition"
>
  <Image src={assets.user_icon} alt="user icon" />
  Account
</button>
        )}
      </div>
      
    </nav>
     </Suspense>
  );
};

export default Navbar;
