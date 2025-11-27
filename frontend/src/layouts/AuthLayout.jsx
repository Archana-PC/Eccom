import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';


const AuthLayout = () => {
  const navConfig = {
    logo: {
      text: "MANSTYLE",
      link: "/",
      customLogo: null
    },
    navItems: [
      { name: 'HOME', path: '/' },
      { name: 'NEW ARRIVALS', path: '/new-arrivals' },
      { name: 'CLOTHING', path: '/clothing' },
      { name: 'BRANDS', path: '/brands' },
    ],
    showSearch: true,
    showUserAccount: false, // Hide account dropdown in auth pages
    showCart: true,
    cartItemsCount: 3,
    showWishlist: true,
    wishlistItemsCount: 2,
    isLoggedIn: false, // Explicitly set for auth pages
    user: null
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-50 to-secondary-50">
      {/* Navbar */}
      <Navbar navConfig={navConfig} className="sticky top-0 z-50" />
      
      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;