"use client";
import { Suspense, useEffect, useState } from "react";
import { assets } from "../../../assets/juvenis-assets";
import ProductCard from "../../../components/ProductCard";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "../../../components/Loading";
import { useAppContext } from "../../../context/AppContext";
import React from "react";

const Product = () => {
  const { id } = useParams();
  const { products, router, addToCart } = useAppContext();

  const [mainImage, setMainImage] = useState(null);
  const [productData, setProductData] = useState(null);
  const [related, setRelated] = useState([]);

  const fetchProductData = async () => {
    const product = products.find((product) => product._id === id);
    setProductData(product);
  };

  useEffect(() => {
    fetchProductData();
  }, [id, products.length]);

  useEffect(() => {
    if (products.length > 0 && productData) {
      let productCopy = products.filter(
        (item) => item.category === productData.category && item._id !== productData._id
      );
      setRelated(productCopy.slice(0, 5));
    }
  }, [products, productData]);

  return productData ? (
    <>
      <Suspense fallback={<div>Loading Navbar...</div>}>
        <Navbar />
      </Suspense>

      <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left - Images */}
          <div className="px-5 lg:px-16 xl:px-20">
            <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
              <Image
                src={mainImage || productData.image[0]}
                alt={productData.name}
                width={400}
                height={400}
                className="w-full h-auto object-cover mix-blend-multiply"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {productData.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setMainImage(image)}
                  className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                >
                  <Image
                    src={image}
                    alt={`product-${index}`}
                    width={200}
                    height={200}
                    className="w-full h-auto object-cover mix-blend-multiply"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
              {productData.name}
            </h1>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                <Image className="h-4 w-4" src={assets.star_dull_icon} alt="star_dull_icon" />
              </div>
              <p>(4.5)</p>
            </div>

            <p className="text-gray-600 mt-3">{productData.description}</p>
            <hr className="bg-gray-600 my-6" />

            <div className="overflow-x-auto">
              <table className="table-auto border-collapse w-full max-w-72">
                <tbody>
                  <tr>
                    <td className="text-gray-600 font-medium">Category</td>
                    <td className="text-gray-800/50">{productData.category}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-3xl font-medium mt-6">
              Rs {productData.offerPrice}
              <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                Rs {productData.price}
              </span>
            </p>

            {/* Stock Status */}
            <div className="flex items-center justify-between mt-4">
              {productData.stock <= 0 ? (
                <span className="text-red-600 font-bold">Out of Stock</span>
              ) : (
                <span className="text-green-600 font-semibold">In Stock</span>
              )}
            </div>

            <div className="flex items-center mt-10 gap-4">
              <button
                onClick={() => addToCart(productData._id)}
                disabled={productData.stock <= 0}
                className={`w-full py-3.5 ${
                  productData.stock <= 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
                }`}
              >
                Add to Cart
              </button>
{/* to dooooooooooo */}
              <button 
                onClick={() => {
                  productData.stock <= 0 ? router.push("/address"):
                  addToCart(productData._id, false);
                  router.push("/cart");
                }}
                
                className={`w-full py-3.5 bg-[#009bf1] text-white hover:bg-[#34a2dd] transition`}
              >
                {productData.stock <= 0 ? "Notify Me":"Buy Now" }
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-4 mt-16">
            <p className="text-3xl font-medium">
              Related <span className="font-medium text-[#009bf1]">Products</span>
            </p>
            <div className="w-28 h-0.5 bg-[#009bf1] mt-2"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
            {related.slice(0, 5).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
          <button className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
            See more
          </button>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default Product;
