import React, { useState, useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import empty from "../assets/images/empty.gif";

const NewArrival = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const { products, resultPerPage, filteredProductsCount } = useSelector(
    (state) => state.allProducts
  );

  // Filter and paginate products based on category and page
  useEffect(() => {
    const filtered =
      selectedCategory === "All"
        ? products
        : products.filter((product) => product.category === selectedCategory.toLowerCase());

    const startIndex = (currentPage - 1) * resultPerPage;
    const paginated = filtered.slice(startIndex, startIndex + resultPerPage);

    setDisplayedProducts(paginated);
  }, [products, selectedCategory, currentPage, resultPerPage]);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredProductsCount / resultPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="py-10">
      <h2 className="text-[40px] leading-[48px] font-medium customGray font-sans text-center pb-5 custom-underline">
        New Arrivals
      </h2>

      {/* Category Selection */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 my-8">
        {["All", "Women", "Accessories", "Men"].map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1); // Reset to first page
            }}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === category
                ? "bg-primaryRed text-white"
                : "bg-white text-gray-700"
            } transition duration-300 ease-in-out hover:bg-primaryRed hover:text-white`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Loading, Empty State, or Products */}
      {products.length === 0 ? (
        <div className="col-span-4 text-center text-gray-500 text-lg font-medium">
          No products available in this category.
          <div className="flex justify-center">
            <img src={empty} alt="empty" className="w-52" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 md:px-10 lg:px-20">
          {displayedProducts.map((product) => (
            <Link
              to={`/product-details/${product.slug}/${product._id}`}
              key={product._id}
            >
              <div className="relative bg-white border rounded-lg shadow-md overflow-hidden group hover:shadow-2xl transition-shadow duration-300 p-4 transform transition-all duration-500 ease-in-out">
                <button className="absolute top-4 left-4 text-gray-500 hover:text-primaryRed transition-colors duration-200">
                  <AiOutlineHeart size={24} />
                </button>
                <span className="absolute top-4 right-4 bg-primaryRed text-white text-xs font-semibold py-1 px-2 rounded-full">
                  {product.discount} OFF
                </span>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover mt-4 rounded-md"
                />
                <div className="text-center mt-4">
                  <h3 className="text-lg font-semibold text-gray-700">
                    {product.name}
                  </h3>
                  <div className="flex justify-center items-center mt-2 space-x-2">
                    <span className="text-primaryRed font-bold text-lg">
                      ${product.price}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <button className="bottom-4 bg-primaryRed text-white py-2 px-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-col items-center mt-6 space-y-4">
        <div className="text-gray-600">
          <span className="font-semibold">{`Total: ${
            filteredProductsCount || 0
          }`}</span>
          <span className="mx-2">|</span>
          <span className="font-semibold">{`Results per page: ${
            resultPerPage || 0
          }`}</span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="flex items-center px-4 py-2 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition"
          >
            <span className="mr-2">&larr;</span> Previous
          </button>
          <span className="text-gray-700">{`Page ${currentPage} of ${Math.ceil(
            filteredProductsCount / resultPerPage
          )}`}</span>
          <button
            onClick={handleNextPage}
            disabled={
              currentPage >= Math.ceil(filteredProductsCount / resultPerPage)
            }
            className="flex items-center px-4 py-2 rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition"
          >
            Next <span className="ml-2">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
