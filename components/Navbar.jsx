"use client"
import React from "react";
// import { assets} from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";
import { assets,CartIcon, BagIcon, BoxIcon } from "@/assets/juvenis-assets";
import { HomeIcon } from "lucide-react";




const Navbar = () => {

  const { isSeller, router, user } = useAppContext();
  const {openSignIn} = useClerk()

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      <Image
        className="cursor-pointer "
        onClick={() => router.push('/')}
        src={assets.juvenis_logo}
        alt="logo"
        
      />
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="relative group inline-block hover:text-[#1893bf]">
          Home
          <hr className="absolute left-0 -bottom-7 h-[4px] w-0 bg-[#1893bf] transition-all duration-300 ease-in-out group-hover:w-[50px]"
            ></hr>
        </Link>
        <Link href="/all-products" className="relative group inline-block hover:text-[#1893bf]">
          Shop
           <hr className="absolute left-0 -bottom-7 h-[4px] w-0 bg-[#1893bf] transition-all duration-300 ease-in-out group-hover:w-[50px]"
            ></hr>
        </Link>
        <Link href="/about-us" className="relative group inline-block hover:text-[#1893bf]">
          About Us
           <hr className="absolute left-0 -bottom-7 h-[4px] w-0 bg-[#1893bf] transition-all duration-300 ease-in-out group-hover:w-[50px]"
            ></hr>
        </Link>
        <Link href="/" className="relative group inline-block hover:text-[#1893bf]">
          Contact
           <hr className="absolute left-0 -bottom-7 h-[4px] w-0 bg-[#1893bf] transition-all duration-300 ease-in-out group-hover:w-[50px]"
            ></hr>
        </Link>

{/* For seller */}

        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}

      </div>

      <ul className="hidden md:flex items-center gap-4 ">
        <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />

        { user ?
         <> 
         <UserButton>
           <UserButton.MenuItems>
            <UserButton.Action label="Home" labelIcon={<HomeIcon/>} onClick={()=>router.push('/')}/>
          </UserButton.MenuItems>
           <UserButton.MenuItems>
            <UserButton.Action label="Products" labelIcon={<BoxIcon/>} onClick={()=>router.push('/all-products')}/>
          </UserButton.MenuItems>
          <UserButton.MenuItems>
            <UserButton.Action label="Cart" labelIcon={<CartIcon/>} onClick={()=>router.push('/cart')}/>
          </UserButton.MenuItems>
          <UserButton.MenuItems>
            <UserButton.Action label="My Order" labelIcon={<BagIcon/>} onClick={()=>router.push('/my-orders')}/>
          </UserButton.MenuItems>
         </UserButton>
         </> 
         : <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button>}
      </ul>

      <div className="flex items-center md:hidden gap-3">
        {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}
        { user ?
         <> 
         <UserButton>
          <UserButton.MenuItems>
            <UserButton.Action label="Cart" labelIcon={<CartIcon/>} onClick={()=>router.push('/cart')}/>
          </UserButton.MenuItems>
          <UserButton.MenuItems>
            <UserButton.Action label="My Order" labelIcon={<BagIcon/>} onClick={()=>router.push('/my-orders')}/>
          </UserButton.MenuItems>
         </UserButton>
         </> 
         : <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
          <Image src={assets.user_icon} alt="user icon" />
          Account
        </button>}
      </div>
    </nav>
  );
};

export default Navbar;