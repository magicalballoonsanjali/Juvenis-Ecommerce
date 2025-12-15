import React from "react";
import { assets } from "../assets/juvenis-assets";
import Image from "next/image";
import { useAppContext } from "../context/AppContext";
import { Box, Heart} from "lucide-react";

const ProductCard = ({ product }) => {

  const { currency, router, toggleWishlist, wishlist } = useAppContext();
  
  const isWish = wishlist.includes(product._id);

  return (
    <div
      onClick={() => {
        router.push("/product/" + product._id);
        scrollTo(0, 0);
      }}
      className="flex flex-col items-start gap-1 w-full max-w-[260px] sm:max-w-[300px] md:max-w-[260px] cursor-pointer pb-5"
    >
      <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-80 flex items-center justify-center shadow-lg">
        <Image
          src={product.image[0]}
          alt={product.name}
          className="group-hover:scale-105 transition object-cover w-11/12 sm:w-full h-11/12 sm:h-full mix-blend-multiply"
          width={800}
          height={800}
        />
        <button
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product._id);
          }}
        >
          <Heart
            size={15}
            className={`h-5 w-5 ${
              wishlist.includes(product._id)
                ? "fill-red-500 text-red-500"
                : "text-gray-400"
            }`}
          />
        </button>

        {product.stock <= 0 ? (
          <div className="absolute top-1 left-1 text-xs bg-white px-2 py-0.5 w-auto h-6 shadow-md rounded-md flex items-center justify-center whitespace-nowrap">
            <div>out of stock</div>
          </div>
        ) : null}

      </div>

      <p className="md:text-lg font-medium pt-2 w-full truncate">
        {product.name}
      </p>
      <p className="w-full text-sm text-gray-500/70 max-sm:hidden truncate">
        {product.description}
      </p>
      <div className="flex items-center gap-2">
        <p className="text-xs">{4.5}</p>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Image
              key={index}
              className="h-4 w-4"
              src={
                index < Math.floor(4) ? assets.star_icon : assets.star_dull_icon
              }
              alt="star_icon"
            />
          ))}
        </div>
      </div>

      <div className="flex items-end justify-between w-full mt-1">
        <p className="text-base font-medium">Rs {product.offerPrice}</p>

        <button
          className={`px-4 py-1.5 rounded-md border border-gray-500/20 md:rounded-full text-xs transition ${
            product.stock <= 0
              ? "bg-gray-200 text-gray-700 cursor-not-allowed"
              : "bg-[#009bf1] text-white hover:bg-[#4ca1cf]"
          }`}
          disabled={product.stock <= 0} // disable if stock <= 0
        >
          Buy now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
