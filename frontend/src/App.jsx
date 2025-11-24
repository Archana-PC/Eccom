import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart';


function App() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/collections" element={<Collections />} /> */}
          {/* Add more routes as needed */}
        </Routes> 
       
      </div>
  );
}

export default App;