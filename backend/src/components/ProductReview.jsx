import React, { useState } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';

const ProductReview = () => {
    const [rating, setRating] = useState(0);  
    const [hoverRating, setHoverRating] = useState(0); 

    const handleRating = (rate) => setRating(rate);

    const renderStars = () => {
        return Array(5)
            .fill(0)
            .map((_, index) => {
                const starIndex = index + 1;
                return (
                    <span
                        key={starIndex}
                        onClick={() => handleRating(starIndex)}
                        onMouseEnter={() => setHoverRating(starIndex)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="cursor-pointer"
                    >
                        {starIndex <= (hoverRating || rating) ? <FaStar /> : <FaRegStar />}
                    </span>
                );
            });
    };

    return (
        <div className="px-5 md:px-10 lg:px-20 py-10">
            <h2 className='text-primaryRed font-medium text-[20px] md:text-[24px] leading-[29px] uppercase underline mb-10'>
                Reviews (1)
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='flex flex-col md:flex-row gap-4 md:gap-5'>
                    <div className='flex flex-col items-center md:items-start'>
                        <img src="user" className='w-12 h-12 bg-red-400 rounded-full my-3 md:my-5' alt="user" />
                        <div className='flex text-[#FAC451] text-sm'>
                            {[...Array(4)].map((_, i) => <FaStar key={i} />)}
                            <FaRegStar />
                        </div>
                    </div>

                    <div>
                        <span className='font-normal text-[12px] md:text-[14px] leading-[23px] text-primaryRed'>
                            27 Aug 2016
                        </span>
                        <h6 className='font-medium text-[14px] md:text-[16px] leading-[23px] text-customGray'>
                            Brandon William
                        </h6>
                        <p className='font-normal text-[12px] md:text-[14px] leading-[20px] md:leading-[23px] text-customGray mt-3 md:mt-4'>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </div>
                </div>

                <div>
                    <h4 className='font-medium text-[18px] leading-[22px]'>Add Review</h4>
                    <div className='flex flex-col gap-5 py-6'>
                        <input type="text" placeholder='Name*' className='border focus:outline-none pl-5 py-2' />
                        <input type="email" placeholder='Email*' className='border focus:outline-none pl-5 py-2' />
                    </div>

                    <div className='flex gap-5 items-center'>
                        <h4 className='font-medium text-[18px] leading-[22px]'>Your Rating:</h4>
                        <div className='flex text-[#FAC451] text-sm'>
                            {renderStars()}
                        </div>
                    </div>

                    <textarea className='border focus:outline-none p-4 my-5 w-full' placeholder='Your Review...'></textarea>
                    <button className='bg-primaryRed text-white py-2 px-6 hover:opacity-90 transition-opacity duration-300'>
                        Submit Review
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductReview;
