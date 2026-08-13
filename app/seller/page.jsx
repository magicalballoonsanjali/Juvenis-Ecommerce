"use client";

import React from "react";
import { useAppContext } from "../../context/AppContext";

const Page = () => {




  return (
    <div className="min-h-[calc(100vh-70px)] bg-gray-50 flex items-center justify-center p-6">

      <div className="w-full max-w-3xl">

        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">

          <div className="text-center">

            {/* Icon */}
            <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-[#1893bf]/10 flex items-center justify-center">
              <span className="text-4xl">👋</span>
            </div>

            <p className="text-sm font-medium text-[#1893bf] uppercase tracking-wider mb-2">
              Seller Dashboard
            </p>


            <p className="mt-4 text-gray-500 text-base md:text-lg">
              Welcome to the Juvenis Seller Dashboard.
            </p>

            <p className="mt-2 text-gray-400">
              Manage your products and orders easily from the sidebar.
            </p>

          </div>

          {/* Quick Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">

            <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
              <div className="text-2xl mb-3">
                📦
              </div>

              <h3 className="font-semibold text-gray-800">
                Product List
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                View and manage your products.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
              <div className="text-2xl mb-3">
                🛍️
              </div>

              <h3 className="font-semibold text-gray-800">
                Orders
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                View and manage customer orders.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Page;