// App.js
import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import Navbar from "./components/Header/Navbar";
import LandingPage from "./pages/LandingPage";
import ProductCategory from "./pages/ProductCategory";
import FooterComponent from "./components/FooterComponent";
import NewsLetter from "./components/NewsLetter";
import OffersComponent from "./components/OffersComponent";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CheckOutProcessPage from "./pages/CheckOutProcessPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Admin/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AddProduct from "./pages/Admin/Dashboard/ProductPages/AddProduct";
import AllProducts from "./pages/Admin/Dashboard/ProductPages/AllProducts";
import UpdateProduct from "./pages/Admin/Dashboard/ProductPages/UpdateProduct";
import ShippingDetails from "./components/CheckOutProcess/ShippingDetails";
import ConfirmOrder from "./components/CheckOutProcess/ConfirmOrder";
import Payment from "./components/CheckOutProcess/Payment";
import SuccessPage from "./pages/SuccessPage";
import UserProfile from "./components/User/UserProfile";
import AllUser from "./pages/Admin/Dashboard/UsersPages/AllUser";
import GetReviews from "./pages/Admin/Dashboard/Reviews/GetReviews";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

const App = () => {
  const location = useLocation();
  const hideLayout = [
    "/login",
    "/register",
    "/dashboard",
    "/add-product",
    "/all-products",
    "/update-product",
    "/all-user",
    "/product-reviews",
  ];

  const shouldHideLayout = hideLayout.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      <Routes>
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/checkout-process" element={<CheckOutProcessPage />} />
          <Route path="/shipping" element={<ShippingDetails />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/process/payment" element={<Payment />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Route>


        <Route element={<AdminProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/update-product/:id" element={<UpdateProduct />} />
          <Route path="/all-user" element={<AllUser />} />
          <Route path="/product-reviews" element={<GetReviews />} />
        </Route>


        <Route path="/" element={<LandingPage />} />
        <Route path="/product-category" element={<ProductCategory />} />
        <Route
          path="/product-details/:slug/:id"
          element={<ProductDetailsPage />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      {!shouldHideLayout && (
        <>
          <OffersComponent />
          <NewsLetter />
          <FooterComponent />
        </>
      )}
    </>
  );
};

export default App;
