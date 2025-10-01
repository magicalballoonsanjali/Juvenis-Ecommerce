import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import { Heart } from 'lucide-react';
const ProductCard = ({ product }) => {

    const { currency, router , toggleWishlist, wishlist} = useAppContext()
const isWish = wishlist.includes(product._id);

    return (
        <div
            onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
            className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer"
        >
            <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center shadow-lg">
                <Image
                    src={product.image[0]}
                    alt={product.name}
                    className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full mix-blend-multiply"
                    width={800}
                    height={800}
                />
                <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md" 
                onClick={(e)=>{ e.stopPropagation(); 
                 toggleWishlist(product._id);}}>
                    {/* <Image
                        className="h-3 w-3"
                        src={assets.heart_icon}
                        alt="heart_icon"
                    /> */}

                     <Heart size={15}
    className={`h-5 w-5 ${
      wishlist.includes(product._id) ? "fill-red-500 text-red-500" : "text-gray-400"
    }`}
  />
                </button>
            </div>

            <p className="md:text-base font-medium pt-2 w-full truncate">{product.name}</p>
            <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">{product.description}</p>
            <div className="flex items-center gap-2">
                <p className="text-xs">{4.5}</p>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Image
                            key={index}
                            className="h-3 w-3"
                            src={
                                index < Math.floor(4)
                                    ? assets.star_icon
                                    : assets.star_dull_icon
                            }
                            alt="star_icon"
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-end justify-between w-full mt-1">
                <p className="text-base font-medium">Rs {product.offerPrice}</p>
                <button className=" px-4 py-1.5 rounded-md  border border-gray-500/20 md:rounded-full text-xs hover:bg-[#4ca1cf] transition bg-[#009bf1] text-white">
                    Buy now
                </button>
            </div>
        </div>
    )
}

export default ProductCard