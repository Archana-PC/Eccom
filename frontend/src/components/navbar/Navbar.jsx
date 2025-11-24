import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MobileMenuButton from '../ui/Button/MobileMenuButton';

const Navbar = ({  
  navConfig = {
    logo: {
      text: "STYLEHUB", // Updated name
      link: "/",
      customLogo: null
    },
    navItems: [
      { name: 'HOME', path: '/' },
      { name: 'NEW DROPS', path: '/new-drops' },
      { name: 'COLLECTIONS', path: '/collections' },
      { name: 'REWARDS', path: '/rewards' }
    ],
    showSearch: true,
    showUserAccount: true,
    showCart: true,
    cartItemsCount: 0,
    showWishlist: true,
    wishlistItemsCount: 0
  },  
  customContent = {
    leftContent: null,
    centerContent: null,
    rightContent: null
  },
  
  className = ""
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const defaultNavItems = [
    { name: 'HOME', path: '/' },
    { name: 'NEW DROPS', path: '/new-drops' },
    { name: 'COLLECTIONS', path: '/collections' },
    { name: 'REWARDS', path: '/rewards' },
    { name: 'ABOUT', path: '/about' }
  ];

  const navigationItems = navConfig.navItems || defaultNavItems;

  return (
    <nav className={className}>
      {/* Main Navigation */}
      <div className="bg-white shadow-elegant border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Left Section - Navigation Items (Desktop) */}
            <div className="hidden lg:flex items-center space-x-8">
              {customContent.leftContent || navigationItems.slice(0, 3).map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`transition-colors duration-200 font-medium ${
                    location.pathname === item.path 
                      ? 'text-primary-800 font-semibold' 
                      : 'text-neutral-700 hover:text-primary-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Center Section - Logo */}
            <div className="flex items-center">
              {customContent.centerContent || (
                <Link 
                  to={navConfig.logo.link} 
                  className="text-2xl font-display font-bold text-primary-900 hover:text-primary-800 transition-colors"
                >
                  {navConfig.logo.customLogo || navConfig.logo.text}
                </Link>
              )}
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center space-x-4">
              {customContent.rightContent || (
                <>
                  {/* Additional Navigation Items (Desktop) */}
                  <div className="hidden lg:flex items-center space-x-6 mr-4">
                    {navigationItems.slice(3).map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`transition-colors duration-200 font-medium ${
                          location.pathname === item.path 
                            ? 'text-primary-800 font-semibold' 
                            : 'text-neutral-700 hover:text-primary-700'
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* Action Icons */}
                  {navConfig.showSearch && (
                    <button className="p-2 text-neutral-600 hover:text-primary-700 hover:bg-primary-50 rounded-full transition-all duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  )}
                  
                  {navConfig.showUserAccount && (
                    <Link 
                      to="/account" 
                      className="p-2 text-neutral-600 hover:text-primary-700 hover:bg-primary-50 rounded-full transition-all duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </Link>
                  )}
                  
                  {navConfig.showWishlist && (
                    <Link 
                      to="/wishlist" 
                      className="p-2 text-neutral-600 hover:text-primary-700 hover:bg-primary-50 rounded-full transition-all duration-200 relative"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {navConfig.wishlistItemsCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                          {navConfig.wishlistItemsCount > 9 ? '9+' : navConfig.wishlistItemsCount}
                        </span>
                      )}
                    </Link>
                  )}
                  
                  {navConfig.showCart && (
                    <Link 
                      to="/cart" 
                      className="p-2 text-neutral-600 hover:text-primary-700 hover:bg-primary-50 rounded-full transition-all duration-200 relative"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      {navConfig.cartItemsCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                          {navConfig.cartItemsCount > 9 ? '9+' : navConfig.cartItemsCount}
                        </span>
                      )}
                    </Link>
                  )}
                </>
              )}

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <MobileMenuButton
                  isOpen={isMenuOpen}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  variant="minimal"
                  size="medium"
                />
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-neutral-200 bg-white">
              <div className="flex flex-col space-y-3">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`py-3 px-4 rounded-lg transition-all duration-200 font-medium ${
                      location.pathname === item.path 
                        ? 'bg-primary-50 text-primary-800 border-l-4 border-primary-600' 
                        : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;