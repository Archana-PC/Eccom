import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Wishlist from './pages/wishlist/Wishlist'
import Cart from './pages/cart/Cart';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';
import ProductLayout from './layouts/ProductLayout';
import ProductDetail from './pages/productDetail/ProductDetail';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AuthLayout from './layouts/AuthLayout';




function App() {
  return (
          <div className="App">
            <Routes>
                {/* Main Layout - Home, Account, etc. */}
                <Route element={<MainLayout />}>
                  <Route index element={<Home />} />
                  <Route path='wishlist' element={<Wishlist/>} />
                  <Route path='/cart' element={<Cart/>} />
                  {/* <Route path="/new-arrivals" element={<NewArrivals />} />
                  <Route path="/account" element={<Account />} /> */}
                </Route>

                 {/* Category Layout - Shopping Pages */}
                {/* <Route element={<CategoryLayout />}>
                  <Route path="/clothing" element={<CategoryPage />} />
                  <Route path="/clothing/:subcategory" element={<CategoryPage />} />
                  <Route path="/shoes" element={<CategoryPage />} />
                  <Route path="/accessories" element={<CategoryPage />} />
                  <Route path="/brands" element={<CategoryPage />} />
                  <Route path="/sale" element={<CategoryPage />} />
                </Route> */}

                {/* Product Layout - Individual Products */}
                <Route element={<ProductLayout />}>
                  <Route path="/product/:id" element={<ProductDetail/>} />
                </Route>

                {/* Checkout Layout - Cart & Checkout */}
                {/* <Route element={<CheckoutLayout />}>
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                </Route> */}

                {/* Auth Layout - Login, Register */}
                <Route element={<AuthLayout />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>  
          </div>
       
  );
}

export default App;