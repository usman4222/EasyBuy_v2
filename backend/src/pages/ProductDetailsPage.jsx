import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import productImage1 from "../assets/images/single_1.jpg";
import productImage2 from "../assets/images/single_2.jpg";
import productImage3 from "../assets/images/single_3.jpg";
import productImage4 from "../assets/images/single_2_thumb.jpg";
import productImage5 from "../assets/images/single_3_thumb.jpg";
import productImage6 from "../assets/images/single_1_thumb.jpg";
import { MdLocalShipping } from "react-icons/md";
import { FaStar, FaRegStar, FaStarHalfAlt, FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import { AiOutlineHeart } from 'react-icons/ai';
import ProductAdditionalInfo from '../components/ProductAdditionalInfo';
import ProductReview from '../components/ProductReview';

const ProductDetailsPage = () => {
    const breadcrumbItems = ['Home', "Men's", "Single Product"];
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(productImage1);
    const [activeSection, setActiveSection] = useState('additionalInfo');

    const thumbnailImages = [productImage1, productImage2, productImage3];

    const handleIncrease = () => setQuantity(prevQuantity => prevQuantity + 1);
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    return (
        <div>
            <Breadcrumb items={breadcrumbItems} />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 px-5 md:px-10 lg:px-20 py-10 border-b mb-10'>
                <div className='flex gap-5'>
                    <div className='hidden md:block'>
                        {thumbnailImages.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`product thumbnail ${index + 1}`}
                                className={`w-20 md:w-32 lg:w-52 cursor-pointer mb-5 ${selectedImage === image ? 'border border-primaryRed' : ''}`}
                                onClick={() => setSelectedImage(image)}
                            />
                        ))}
                    </div>
                    <img src={selectedImage} alt="Selected product" className='w-full md:max-w-lg lg:max-w-xl mb-5' />
                </div>

                <div>
                    <h2 className='text-[24px] md:text-[36px] leading-tight font-medium text-customGray'>
                        Pocket cotton sweatshirt
                    </h2>
                    <p className='text-[rgb(81,84,95)] text-sm md:text-base leading-6'>
                        Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis...
                    </p>
                    <div className='flex justify-center md:justify-start items-center mt-5 md:mt-10 mb-5'>
                        <button className='uppercase flex items-center justify-center gap-2 bg-[#F5F5F5] w-full md:w-auto h-10 px-4 hover:text-primaryRed transition-all'>
                            <MdLocalShipping /> free delivery
                        </button>
                    </div>
                    <div className="flex flex-col mt-2">
                        <span className="text-gray-400 line-through text-sm md:text-base">$344</span>
                        <div className='flex items-center gap-5'>
                            <span className="text-primaryRed font-medium text-lg md:text-2xl">$200</span>
                            <div className='flex text-[#FAC451]'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStarHalfAlt />
                                <FaRegStar />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row items-center gap-4 py-5'>
                        <h4 className='text-sm font-normal text-customGray'>Quantity:</h4>
                        <div className='border flex items-center justify-center w-24 h-10'>
                            <button onClick={handleDecrease} className="px-2">
                                <TiMinus />
                            </button>
                            <span className="px-4">{quantity}</span>
                            <button onClick={handleIncrease} className="px-2">
                                <FaPlus />
                            </button>
                        </div>
                        <button className="mt-3 md:mt-0 bg-primaryRed text-white py-2 px-6 hover:opacity-100 transition-opacity duration-300">
                            Add to Cart
                        </button>
                        <button className="text-gray-500 hover:text-primaryRed transition-colors duration-200">
                            <AiOutlineHeart size={24} />
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex gap-5 items-center mb-5'>
                    <button
                        onClick={() => setActiveSection('additionalInfo')}
                        className={`text-customGray hover:text-lightBlack duration-300 transition-all text-[16px] leading-[40px] font-medium ${activeSection === 'additionalInfo' ? 'underline text-primaryRed' : ''}`}
                    >
                        Additional Information
                    </button>
                    <button
                        onClick={() => setActiveSection('reviews')}
                        className={` text-customGray hover:text-lightBlack  duration-300 transition-all text-[16px] leading-[40px] font-medium ${activeSection === 'reviews' ? 'underline text-primaryRed' : ''}`}
                    >
                        Reviews(1)
                    </button>
                </div>

            </div>
            {activeSection === 'additionalInfo' ? <ProductAdditionalInfo /> : <ProductReview />}
        </div>
    );
};

export default ProductDetailsPage;
