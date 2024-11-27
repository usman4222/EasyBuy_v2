import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAminProducts, getProducts } from "../../actions/productsAction";
import { useNavigate } from "react-router-dom"; // For navigation
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";

const ProductTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [resultPerPage, setResultPerPage] = useState(10);

  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const { loading, products } = useSelector((state) => state.allAdminProducts);

  console.log("admin products", products);

  useEffect(() => {
    dispatch(getAminProducts());
  }, [dispatch]);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(products.length / resultPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleResultPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setResultPerPage(value);
      setCurrentPage(1); // Reset to the first page
    }
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * resultPerPage,
    currentPage * resultPerPage
  );

  const handleEdit = (id) => {
    navigate(`/update-product/${id}`);
  };

  const handleDelete = (productId) => {
    // Handle product deletion logic
    console.log(`Delete product with ID: ${productId}`);
  };

  return (
    <div className="h-[100vh] overflow-x-auto">
      <table className="w-full table-auto bg-[#F8FAFC] rounded-[12px]">
        <thead>
          <tr>
            <th className="p-4 text-left">#</th>
            <th className="p-4 text-left">Id</th>
            <th className="p-4 text-left">Image</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Description</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Ratings</th>
            <th className="p-4 text-left">Stock</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="9" className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td colSpan="10" className="text-center p-4 text-gray-500">
                This admin has no products
              </td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr key={product._id} className="border-b">
                <td className="p-4">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="p-4">{product._id}</td>
                <td className="p-4 w-20">
                  <img
                    src={product.image}
                    alt=""
                    className="w-12 h-12 object-cover"
                  />
                </td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.description}</td>
                <td className="p-4">${product.price}</td>
                <td className="p-4">{product.category}</td>
                <td className="p-4">{product.ratings}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <RiDeleteBin2Line />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(products.length / resultPerPage)}
        </span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(products.length / resultPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
