// src/layouts/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../user/components/footer/Footer'
import Navbar from '../user/components/navbar/Navbar'

const MainLayout = () => {
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

     
      // Remove navItems array so it uses default items which include the SHOW ALL button logic
    ],
    showShowAll: true,
    showSearch: true,
    showUserAccount: true,
    showCart: true,
    cartItemsCount: 3,
    showWishlist: true,
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Announcement Bar */}
      {/* <TopAnnouncementBar 
        message="FREE SHIPPING ON ORDERS OVER $50 • USE CODE: STYLE20"
        showCloseButton={true}
      /> */}
      
      {/* Your Navbar */}
      <Navbar navConfig={navConfig} className="sticky top-0 z-50" />
      
      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;