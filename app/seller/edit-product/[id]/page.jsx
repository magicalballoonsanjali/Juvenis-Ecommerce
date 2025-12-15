'use client'
import React, { useEffect, useState } from "react";
import { assets } from "../../../../assets/juvenis-assets";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

const EditProduct = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  const [sellerId, setSellerId] = useState('');
  const [files, setFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Skin Care');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  // Get sellerId from localStorage
  useEffect(() => {
    const id = localStorage.getItem("sellerId");
    if (!id) {
      router.push("/seller/login");
      return;
    }
    setSellerId(id);
  }, [router]);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`/api/product/${productId}`);
      if (data.success) {
        const p = data.product;
        setName(p.name);
        setDescription(p.description);
        setCategory(p.category);
        setPrice(p.price);
        setOfferPrice(p.offerPrice);
        setQuantity(p.stock);
        setExistingImages(p.image); // store existing images
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('offerprice', offerPrice);
    formData.append('quantity', quantity);
    formData.append('userId', sellerId); // ✅ send sellerId

    // Append new images only
    files.forEach((file) => formData.append('images', file));

    try {
      const { data } = await axios.patch(`/api/product/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success(data.message);
        router.push('/seller/product-list');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        
        {/* Product Images */}
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {/* Existing Images */}
            {existingImages.map((img, index) => (
              <div key={index} className="relative">
                <Image
                  src={img}
                  alt="existing"
                  width={100}
                  height={100}
                  className="rounded"
                />
              </div>
            ))}

            {/* New Images */}
            {[...Array(2)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  type="file"
                  id={`image${index}`}
                  hidden
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                  }}
                />
                <Image
                  src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                  alt=""
                  width={100}
                  height={100}
                  className="cursor-pointer max-w-24"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1 max-w-md">
          <label htmlFor="product-name" className="text-base font-medium">Product Name</label>
          <input
            type="text"
            id="product-name"
            placeholder="Type here"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-1 max-w-md">
          <label htmlFor="product-description" className="text-base font-medium">Product Description</label>
          <textarea
            id="product-description"
            rows={4}
            placeholder="Type here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
          />
        </div>

        {/* Category, Price, Offer Price, Quantity */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-32">
            <label htmlFor="category" className="text-base font-medium">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            >
              <option value="Skin Care">Skin Care</option>
              <option value="Face Care">Face Care</option>
              <option value="Body Care">Body Care</option>
              <option value="Hair Care">Hair Care</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label htmlFor="product-price" className="text-base font-medium">Product Price</label>
            <input
              type="number"
              id="product-price"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            />
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label htmlFor="offer-price" className="text-base font-medium">Offer Price</label>
            <input
              type="number"
              id="offer-price"
              placeholder="0"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              required
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            />
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label htmlFor="quantity" className="text-base font-medium">Quantity</label>
            <input
              type="number"
              id="quantity"
              placeholder="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="px-8 py-2.5 bg-[#1893bf] text-white font-medium rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
