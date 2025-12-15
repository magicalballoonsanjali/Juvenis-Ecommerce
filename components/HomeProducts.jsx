import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";


const HomeProducts = () => {

  const { products, router } = useAppContext()
  const popularProducts = products.slice(0, 8);

  return (
    // <div className="flex flex-col items-center pt-14 px-10">
    //   <p className="text-2xl font-medium text-left w-full">Popular products</p>

    //   <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 flex-col items-center justify-items-center gap-6 mt-6 pb-14 w-full ">
    //     {products.map((product, index) => <ProductCard key={index} product={product} />)}
    //   </div>
      
    //   <button onClick={() => { router.push('/all-products') }} className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
    //     See more
    //   </button>
    // </div>
    <section className=" relative py-16 px-6 md:px-12  mt-2">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[url('/bg-pattern.svg')] bg-center bg-cover opacity-5 pointer-events-none"></div>

      {/* Heading */}
      <div className="relative flex flex-col items-center text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-semibold text-gray-800 tracking-wide">
          Popular Products
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-700 mt-3 rounded-full"></div>
        <p className="text-gray-500 mt-4 text-lg max-w-2xl">
          Explore our most loved items, chosen by our customers and trending now.
        </p>
      </div>

      {/* Product Grid */}
      <div className=" relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center">
         {products.map((product, index) => <ProductCard key={index} product={product} />)}
      </div>

      {/* CTA Button */}
      <div className="relative flex justify-center mt-14">
         <button onClick={() => { router.push('/all-products') }} className="px-12 py-2.5 border rounded bg-slate-200 text-gray-500/90 hover:bg-slate-50/90 transition">
         See more
      </button>
      </div>
    </section>
  );
};

export default HomeProducts;
// bg-gradient-to-b from-[#f9fafc] to-[#f3f4f8]