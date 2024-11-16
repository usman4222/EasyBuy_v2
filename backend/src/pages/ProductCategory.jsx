import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import product1 from "../assets/images/product_1.png";
import product2 from "../assets/images/product_2.png";
import product3 from "../assets/images/product_3.png";
import product4 from "../assets/images/product_4.png";
import product5 from "../assets/images/product_5.png";
import { AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const ProductCategory = () => {
  const breadcrumbItems = ['Home', "Men's"];
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const products = [
    { id: 1, category: 'Women', name: 'Women\'s Dress', originalPrice: 120, discountedPrice: 90, discount: '25%', imageUrl: product1 },
    { id: 2, category: 'Accessories', name: 'Handbag', originalPrice: 150, discountedPrice: 100, discount: '30%', imageUrl: product2 },
    { id: 3, category: 'Men', name: 'Men\'s Jacket', originalPrice: 200, discountedPrice: 160, discount: '20%', imageUrl: product3 },
    { id: 4, category: 'Accessories', name: 'Watch', originalPrice: 80, discountedPrice: 60, discount: '25%', imageUrl: product4 },
    { id: 5, category: 'Women', name: 'High Heels', originalPrice: 100, discountedPrice: 75, discount: '25%', imageUrl: product5 },
  ];

  const handleMinChange = (event) => {
    const value = Math.min(Number(event.target.value), maxPrice - 1);
    setMinPrice(value);
  };

  const handleMaxChange = (event) => {
    const value = Math.max(Number(event.target.value), minPrice + 1);
    setMaxPrice(value);
  };

  const rangeBackgroundStyle = {
    background: `linear-gradient(
      to right, 
      #ccc ${minPrice / 10}%, 
      #FE4C50 ${minPrice / 10}%, 
      #FE4C50 ${maxPrice / 10}%, 
      #ccc ${maxPrice / 10}%
    )`
  };

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6 px-5 md:px-10 lg:px-20 pt-10 pb-20">
        <div className="md:col-span-1">
          <div>
            <h4 className="text-customGray font-medium text-[18px] leading-[22px]">Product Category</h4>
            <div className="flex flex-col gap-3 py-10 border-b">
              {['Men', 'Women', 'Accessories', 'New Arrival', 'Collection', 'Shop'].map((category, idx) => (
                <h6 key={idx} className="text-customGray hover:text-lightBlack duration-300 cursor-pointer">
                  {category}
                </h6>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-customGray font-medium text-[18px] leading-[22px]">Filter by Price</h4>
            <div className="flex flex-col gap-3 py-10 border-b">
              <div className="range-slider-container" style={rangeBackgroundStyle}>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={minPrice}
                  onChange={handleMinChange}
                  className="range-slider"
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={maxPrice}
                  onChange={handleMaxChange}
                  className="range-slider"
                />
              </div>
              <div className="text-sm font-medium text-customGray">
                Selected Price Range: ${minPrice} - ${maxPrice}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:col-span-3 lg:col-span-4">
          {products.map(product => (
            <Link to="/product-details">
              <div
                key={product.id}
                className="relative cursor-pointer bg-white border rounded-lg shadow-md overflow-hidden group hover:shadow-2xl transition-shadow duration-300 p-4 transform transition-all duration-500 ease-in-out"
              >
                <button className="absolute top-4 left-4 text-gray-500 hover:text-primaryRed transition-colors duration-200">
                  <AiOutlineHeart size={24} />
                </button>

                <span className="absolute top-4 right-4 bg-primaryRed text-white text-xs font-semibold py-1 px-2 rounded-full">
                  {product.discount} OFF
                </span>

                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover mt-4 rounded-md"
                />

                <div className="text-center mt-4">
                  <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
                  <div className="flex justify-center items-center mt-2 space-x-2">
                    <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
                    <span className="text-primaryRed font-bold text-lg">${product.discountedPrice}</span>
                  </div>
                </div>

                <div className="flex justify-center mt-5">
                  <button className="bg-primaryRed text-white py-2 px-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
