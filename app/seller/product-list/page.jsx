"use client";
import React, { useEffect, useState } from "react";
import { assets } from "../../../assets/juvenis-assets";
import Image from "next/image";
import { useAppContext } from "../../../context/AppContext";
import axios from "axios";
import Footer from "../../../components/Footer";
import Loading from "../../../components/Loading";
import toast from "react-hot-toast";

const ProductList = () => {
  const { router, user } = useAppContext(); // no getToken
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sellerId, setSellerId] = useState("")

    useEffect(() => {
    // if (!user?._id || !isSeller) return;
    const id = localStorage.getItem("sellerId")
    setSellerId(id)
    if(sellerId) {
     fetchSellerProducts();
    }
  }, [sellerId]);

 const fetchSellerProducts = async () => {
  try {
    // if (!user?.email) {
    //   toast.error("User email not found");
    //   return;
    // }

    const { data } = await axios.get(`/api/product/seller-list`);

    if (data.success) {
      setProducts(data.products);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (user) fetchSellerProducts();
  }, [user]);

  // if (loading) return <Loading />;

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>
            {/* Desktop Table */}
        <div className="hidden sm:flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="w-2/3 md:w-2/5 px-4 py-3 font-medium truncate">
                  Product
                </th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                  Category
                </th>
                <th className="px-4 py-3 font-medium truncate">Price</th>
                <th className="px-4 py-3 font-medium truncate ">Offer Price</th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden text-center">
                  Stock
                </th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.map((product, index) => (
                <tr key={index} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="bg-gray-500/10 rounded p-2">
                      <Image
                        src={product.image[0]}
                        alt="product Image"
                        className="w-16 h-16 object-cover rounded"
                        width={1280}
                        height={720}
                      />
                    </div>
                    <span className="truncate w-full">{product.name}</span>
                  </td>
                  <td className="px-4 py-3 max-sm:hidden">
                    {product.category}
                  </td>
                  <td className="px-4 py-3">Rs{product.price}</td>
                  <td className="px-4 py-3">Rs{product.offerPrice}</td>
                  <td className="px-3 py-3 max-sm:hidden">
                    {product.stock <= 0 ? (
                      <span className="text-red-600 font-bold">
                        Out of Stock
                      </span>
                    ) : (
                      <span className="text-green-600 font-bold">
                        Available
                      </span>
                    )}
                  </td>

                  <td>
                    <button
                      onClick={() => router.push(`/product/${product._id}`)}
                      className="flex items-center gap-1 px-1.5 md:px-3.5 py-2 bg-[#1893bf] text-white rounded-md"
                    >
                      <span className="hidden md:block">Visit</span>
                      <Image
                        className="h-3.5"
                        src={assets.redirect_icon}
                        alt="redirect_icon"
                      />
                    </button>
                  </td>
                  <td>
                    <button onClick={()=>router.push(`/seller/edit-product/${product._id}`)} className="flex items-center gap-1 px-1.5 md:px-3.5 py-2 bg-orange-500 text-white rounded-md">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
   {/* Mobile Card View */}
<div className="sm:hidden flex flex-col gap-4">
  {products.map((product, index) => (
    <div 
      key={index} 
      className="border border-gray-200 rounded-xl p-4 flex flex-col gap-3 bg-white shadow-md"
    >
      {/* Top Section: Image + Name + Price */}
      <div className="flex items-center gap-4">
        <div className="bg-gray-100 rounded-lg p-2 flex-shrink-0">
          <Image
            src={product.image[0]}
            alt={product.name}
            className="w-20 h-20 object-cover rounded-md"
            width={320}
            height={320}
          />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-base truncate">{product.name}</p>
          <p className="text-sm text-gray-500">{product.category}</p>
          <p className="font-bold text-[#1893bf] text-lg mt-1">
            ${product.offerPrice}
            <span className="text-gray-400 text-sm line-through ml-2">
              ${product.price}
            </span>
          </p>
        </div>
      </div>

      {/* Stock & Status */}
      <div className="flex items-center justify-between">
        {product.stock <= 0 ? (
          <span className="text-red-600 font-bold">Out of Stock</span>
        ) : (
          <span className="text-green-600 font-semibold">In Stock</span>
        )}

        <button
          onClick={() => router.push(`/product/${product._id}`)}
          className="px-4 py-2 rounded-md bg-[#1893bf] text-white font-medium hover:bg-[#127299] transition"
        >
          View Product
        </button>
      </div>
    </div>
  ))}
</div>

      </div>

      <Footer />
    </div>
  );
};

export default ProductList;
