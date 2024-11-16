// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Header/Navbar';
import "./App.css"
import LandingPage from './pages/LandingPage';
import ProductCategory from './pages/ProductCategory';
import FooterComponent from './components/FooterComponent';
import NewsLetter from './components/NewsLetter';
import OffersComponent from './components/OffersComponent';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckOutProcessPage from './pages/CheckOutProcessPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Admin/Dashboard';


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product-category" element={<ProductCategory />} />
        <Route path="/product-details" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout-process" element={<CheckOutProcessPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <OffersComponent />
      <NewsLetter />
      <FooterComponent />
    </>
  );
};

export default App;
