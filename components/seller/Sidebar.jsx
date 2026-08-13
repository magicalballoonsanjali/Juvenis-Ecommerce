"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { assets } from "../../assets/juvenis-assets";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "./Navbar";


const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [role, setRole] = useState(null);

  useEffect(() => {
    const sellerRole = localStorage.getItem("sellerRole");
    setRole(sellerRole);
  }, []);

  const menuItems = [
    {
      name: "Add Product",
      path: "/seller/add-product",
      icon: assets.add_icon,
      role: "admin",
    },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    {
      name: "Orders",
      path: "/seller/orders",
      icon: assets.order_icon,
    },
  ];



  return (
    <div className="md:w-64 w-16 border-r min-h-screen border-gray-300 py-2 flex flex-col">

      {/* MENU */}
      <div className="flex-1">

        {menuItems
          .filter((item) => {
            // Admin only
            if (item.role === "admin") {
              return role === "admin";
            }

            return true;
          })
          .map((item) => {

            const isActive = pathname === item.path;

            return (
              <Link
                href={item.path}
                key={item.name}
              >
                <div
                  className={`flex items-center py-3 px-4 gap-3 ${
                    isActive
                      ? "border-r-4 md:border-r-[6px] bg-[#1893bf]/10 border-[#1893bf]"
                      : "hover:bg-gray-100/90"
                  }`}
                >

                  <Image
                    src={item.icon}
                    alt={item.name}
                    className="w-7 h-7"
                  />

                  <p className="md:block hidden">
                    {item.name}
                  </p>

                </div>
              </Link>
            );
          })}

      </div>



    </div>
  );
};

export default Sidebar;