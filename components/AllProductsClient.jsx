'use client';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';
import { useSearchParams } from 'next/navigation';

export default function AllProductsClient() {
  const { products } = useAppContext();
  const searchParams = useSearchParams();
  const searchTerm = (searchParams.get('search') || '').toLowerCase();

  const [showFilter, setShowFilter] = useState(false);
  const [categories, setCategories] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const toggleCategory = (value) => {
    setCategories((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const applyFilter = () => {
    let copy = products.slice();
    if (categories.length > 0) {
      copy = copy.filter((item) => categories.includes(item.category));
    }
    setFilteredProducts(copy);
  };

  const sortProducts = () => {
    let copy = [...filteredProducts];
    switch (sortType) {
      case 'Low-High':
        copy.sort((a, b) => a.offerPrice - b.offerPrice);
        break;
      case 'High-Low':
        copy.sort((a, b) => b.offerPrice - a.offerPrice);
        break;
      default:
        applyFilter();
        return;
    }
    setFilteredProducts(copy);
  };

  useEffect(() => setFilteredProducts(products), [products]);
  useEffect(() => applyFilter(), [categories]);
  useEffect(() => sortProducts(), [sortType]);

  useEffect(() => {
    let copy = products.slice();
    if (searchTerm) {
      copy = copy.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm) ||
          item.category.toLowerCase().includes(searchTerm)
      );
    }
    setFilteredProducts(copy);
  }, [products, searchTerm]);

  return (
    <div className="flex flex-col md:flex-row items-start px-6 md:px-16 lg:px-32 pt-10 gap-10">
      {/* Left: Filters */}
      <div className="w-[320px] md:w-[240px]">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer sm:cursor-default"
        >
          Filter
          <img
            src="./dropdown_icon.png"
            className={`h-3 sm:hidden ml-2 transition-transform ${
              showFilter ? 'rotate-90' : ''
            }`}
            alt=""
          />
        </p>

        <div
          className={`border border-gray-300 pl-5 py-3 mt-3 ${
            showFilter ? '' : 'hidden'
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {['Body Care', 'Skin Care', 'Face Care', 'Hair Care'].map((cat) => (
              <label key={cat} className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={cat}
                  onChange={(e) => toggleCategory(e.target.value)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Products */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4 gap-5">
          <div>
            <p className="text-2xl font-medium">All Products</p>
            <div className="w-16 h-0.5 bg-[#009bf1] rounded-full"></div>
          </div>

          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2 py-1 rounded"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="Low-High">Sort by: Low to High</option>
            <option value="High-Low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 mt-6 pb-14 w-full justify-items-center items-center">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
