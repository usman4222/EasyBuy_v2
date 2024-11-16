import React, { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import product1 from "../assets/images/product_1.png";
import product2 from "../assets/images/product_2.png";
import product3 from "../assets/images/product_3.png";
import product4 from "../assets/images/product_4.png";
import product5 from "../assets/images/product_5.png";

const products = [
    { id: 1, category: 'Women', name: 'Women\'s Dress', originalPrice: 120, discountedPrice: 90, discount: '25%', imageUrl: product1 },
    { id: 2, category: 'Accessories', name: 'Handbag', originalPrice: 150, discountedPrice: 100, discount: '30%', imageUrl: product2 },
    { id: 3, category: 'Men', name: 'Men\'s Jacket', originalPrice: 200, discountedPrice: 160, discount: '20%', imageUrl: product3 },
    { id: 4, category: 'Accessories', name: 'Watch', originalPrice: 80, discountedPrice: 60, discount: '25%', imageUrl: product4 },
    { id: 5, category: 'Women', name: 'High Heels', originalPrice: 100, discountedPrice: 75, discount: '25%', imageUrl: product5 },
];

const NewArrival = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(product => product.category === selectedCategory);

    return (
        <div className="py-10">
            <h2 className="text-[40px] leading-[48px] font-medium customGray font-sans text-center pb-5 custom-underline">
                New Arrivals
            </h2>

            <div className="flex flex-col md:flex-row justify-center items-center gap-5 my-8">
                {['All', 'Women', 'Accessories', 'Men'].map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full border ${selectedCategory === category ? 'bg-primaryRed text-white' : 'bg-white text-gray-700'
                            } transition duration-300 ease-in-out hover:bg-primaryRed hover:text-white`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 md:px-10 lg:px-20">
                {filteredProducts.map(product => (
                    <div
                        key={product.id}
                        className="relative bg-white border rounded-lg shadow-md overflow-hidden group hover:shadow-2xl transition-shadow duration-300 p-4 transform transition-all duration-500 ease-in-out opacity-0 animate-slideInLeft"
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

                        <div className='flex justify-center mt-5'>
                            <button className="bottom-4 bg-primaryRed text-white py-2 px-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewArrival;
