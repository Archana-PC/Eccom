// src/layouts/ProductLayout.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

// import Breadcrumb from '../components/Breadcrumb';

const ProductLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      
      {/* Breadcrumb */}
      {/* <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Breadcrumb />
        </div>
      </div> */}
      
      {/* Product Content */}
      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>
      
      {/* Recently Viewed */}
      <section className="border-t bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-semibold mb-4">Recently Viewed</h3>
          {/* Recently viewed products component */}
        </div>
      </section>
    </div>
  );
};

export default ProductLayout;