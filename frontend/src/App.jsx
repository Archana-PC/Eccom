import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';
import Wishlist from './pages/wishlist/Wishlist';


function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              {/* <Route path="/collections" element={<Collections />} /> */}
              {/* Add more routes as needed */}
            </Routes> 
           
          </div>
        </WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
}

export default App;