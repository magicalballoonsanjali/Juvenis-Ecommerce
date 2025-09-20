'use client';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAppContext } from '@/context/AppContext';

const AllProducts = () => {
  const { products } = useAppContext();

  // filters
  const [showFilter, setShowFilter] = useState(false);

  const [categories, setCategories] = useState([]);
  const [sortType, setSortType] = useState('relevant');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // toggle category selection
  const toggleCategory = (value) => {
    setCategories((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // apply filters
  const applyFilter = () => {
    let copy = products.slice();

    // category filter
    if (categories.length > 0) {
      copy = copy.filter((item) => categories.includes(item.category));
    }

    setFilteredProducts(copy);
  };

  // sort products
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
        // relevant = just apply filter again
        applyFilter();
        return;
    }

    setFilteredProducts(copy);
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [categories]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row items-start px-6 md:px-16 lg:px-32 pt-10 gap-10 ">
        {/* Left: Category Filter Sidebar */}

       <div className="w-[320px] md:w-[240px]">
  {/* Heading + dropdown icon */}
  <p
    onClick={() => setShowFilter(!showFilter)}
    className="my-2 text-xl flex items-center cursor-pointer sm:cursor-default"
  >
    Filter
    <img
      src="./dropdown_icon.png" // or any icon you want
      className={`h-3 sm:hidden ml-2 transition-transform ${
        showFilter ? 'rotate-90' : ''
      }`}
      alt=""
    />
  </p>

  {/* Category filter */}
  <div
    className={`border border-gray-300 pl-5 py-3 mt-3  ${
      showFilter ? '' : 'hidden'
    } sm:block`}
  >
    <p className="mb-3 text-sm font-medium">CATEGORIES</p>
    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
      <label className="flex gap-2">
        <input
          type="checkbox"
          className="w-3"
          value="Body Care"
          onChange={(e) => toggleCategory(e.target.value)}
        />
        Body Care
      </label>
      <label className="flex gap-2">
        <input
          type="checkbox"
          className="w-3"
          value="Skin Care"
          onChange={(e) => toggleCategory(e.target.value)}
        />
        Skin Care
      </label>
      <label className="flex gap-2">
        <input
          type="checkbox"
          className="w-3"
          value="Face Care"
          onChange={(e) => toggleCategory(e.target.value)}
        />
        Face Care
      </label>
      <label className="flex gap-2">
        <input
          type="checkbox"
          className="w-3"
          value="Hair Care"
          onChange={(e) => toggleCategory(e.target.value)}
        />
        Hair Care
      </label>
    </div>
  </div>
</div>

        {/* Right: Top Bar + Product Grid */}
        <div className="flex-1">
          {/* top bar like your reference */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-2xl font-medium">All Products</p>
              <div className="w-16 h-0.5 bg-[#009bf1] rounded-full"></div>
            </div>

            {/* clean select like reference */}
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="border-2 border-gray-300 text-sm px-2 py-1 rounded"
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="Low-High">Sort by: Low to High</option>
              <option value="High-Low">Sort by: High to Low</option>
            </select>
          </div>

          {/* products grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 mt-6 pb-14 w-full">
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllProducts;
