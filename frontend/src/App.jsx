import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Wishlist from './pages/wishlist/Wishlist';
import Cart from './pages/cart/Cart';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';
import ProductLayout from './layouts/ProductLayout';
import CategoryLayout from './layouts/CategoryLayout/CategoryLayout';
import ProductDetail from './pages/productDetail/ProductDetail';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AuthLayout from './layouts/AuthLayout';

// Category Pages
import CategoryPage from './pages/category/CategoryPage';
import CheckoutLayout from './layouts/CheckoutLayout';

import Payment from './pages/checkout/Payment';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Main Layout - Home, Account, etc. */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route element={<ProtectedRoute />}>
            <Route path="wishlist" element={<Wishlist />} />
          </Route>
        </Route>

        {/* Category Layout - Shopping Pages with Filters */}
        <Route element={<CategoryLayout />}>
          <Route path="/clothing" element={<CategoryPage category="clothing" />} />
          <Route path="/clothing/:subcategory" element={<CategoryPage category="clothing" />} />
          <Route path="/shoes" element={<CategoryPage category="shoes" />} />
          <Route path="/accessories" element={<CategoryPage category="accessories" />} />
          <Route path="/brands" element={<CategoryPage category="all" />} />
          <Route path="/sale" element={<CategoryPage category="sale" />} />
          {/* Additional category routes */}
          <Route path="/men" element={<CategoryPage category="clothing" gender="men" />} />
          <Route path="/women" element={<CategoryPage category="clothing" gender="women" />} />
          <Route path="/kids" element={<CategoryPage category="clothing" gender="kids" />} />
          <Route path="/new-arrivals" element={<CategoryPage category="all" filter="new" />} />
        </Route>

        {/* Product Layout - Individual Products */}
        <Route element={<ProductLayout />}>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Route>

        {/* Cart as standalone route */}
        <Route path="/cart" element={<CheckoutLayout />}>
          <Route index element={<Cart />} />
        </Route>

        {/* Checkout routes */}
        <Route path="/checkout" element={<CheckoutLayout />}>
          {/* <Route index element={<Address />} /> */}
          {/* <Route path="address" element={<Address/>} /> */}
          <Route path="payment" element={<Payment />} />
        </Route>

        {/* Auth Layout - Login, Register */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* 404 - Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;