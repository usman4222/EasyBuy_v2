import React from 'react';
import product1 from "../assets/images/product_1.png";
import product2 from "../assets/images/product_2.png";
import { Link } from 'react-router-dom';

const CartPage = () => {
    const products = [
        {
            id: 1,
            image: product1,
            name: 'Product 1',
            description: 'Description of Product 1',
            price: 29.99,
            quantity: 2,
        },
        {
            id: 2,
            image: product2,
            name: 'Product 2',
            description: 'Description of Product 2',
            price: 39.99,
            quantity: 1,
        },
    ];

    const taxRate = 0.08;
    const subtotal = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
    const tax = subtotal * taxRate;
    const grandTotal = subtotal + tax;

    return (
        <div className='px-5 md:px-10 lg:px-20 pt-10 pb-20'>
            <h2 className="text-[32px] sm:text-[40px] leading-[36px] sm:leading-[48px] font-medium text-gray-800 font-sans pb-5">
                Cart
            </h2>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Product List */}
                <div className="flex-1 space-y-6">
                    {products.map((product) => (
                        <div key={product.id} className="flex flex-col sm:flex-row items-center gap-4 p-5 bg-white border-b rounded-lg shadow-md">
                            <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded" />
                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="text-lg sm:text-xl font-semibold">{product.name}</h3>
                                <p className="text-gray-600 text-sm sm:text-base">{product.description}</p>
                                <p className="mt-1 text-base sm:text-lg font-medium">Price: ${product.price.toFixed(2)}</p>
                            </div>
                            <div className="text-center sm:text-right">
                                <p className="text-lg font-semibold">Total: ${(product.price * product.quantity).toFixed(2)}</p>
                                <button
                                    className="mt-2 px-3 py-1 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-1/3 bg-white p-5 shadow-md rounded-lg space-y-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Order Summary</h3>
                    <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                        <span>Tax (8%):</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-gray-900 text-sm sm:text-base">
                        <span>Grand Total:</span>
                        <span>${grandTotal.toFixed(2)}</span>
                    </div>
                    <Link to="/checkout-process">
                        <button className="w-full mt-5 px-4 py-2 text-white bg-primaryRed rounded hover:bg-primaryRed-dark">
                            Proceed to Checkout
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
