"use client";
import React, { useRef } from "react";
import { useState,useEffect } from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const FeaturedProduct = () => {
  const { products } = useAppContext();
  const featuredProducts = products.slice(0, 8);

  const scrollRef = useRef(null);
  const animationRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);

  // 🔁 Auto-scroll function
  const autoScroll = () => {
    if (scrollRef.current && !isHovered) {
      scrollRef.current.scrollLeft += 1; // <-- scrolling speed
    }
    animationRef.current = requestAnimationFrame(autoScroll);
  };

  // 🔁 Start scrolling on mount
  useEffect(() => {
    animationRef.current = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isHovered]);


  return (
    <section className="py-16 px-6 md:px-12 bg-gradient-to-b from-[#f9fafc] to-[#eef0f6] mt-10">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
          Featured Products
        </h2>
      </div>

      {/* Horizontal scroll container */}
      <div
  ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}   // 🛑 stop auto scrolling
        onMouseLeave={() => setIsHovered(false)}  // ▶ resume auto scrolling
        className="flex gap-6 overflow-x-hidden scrollbar-hide py-4 cursor-pointer"
>

        {featuredProducts.map((product, index) => (
          <div
            key={index}
            className="flex-shrink-0 min-w-[250px] sm:min-w-[280px] md:min-w-[300px] transition-transform duration-300 hover:scale-105"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* CTA Button */}
      {/* <div className="flex justify-center mt-12">
       <button onClick={() => { router.push('/all-products') }} className="px-12 py-2.5 border rounded bg-slate-200 text-gray-500/90 hover:bg-slate-50/90 transition">
         See more
      </button>
      </div> */}
    </section>
  );
};

export default FeaturedProduct;
