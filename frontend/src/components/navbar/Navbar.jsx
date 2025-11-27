import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CategorySidebar from '../sidebar/CategorySidebar';
import Button from '../ui/Button/Button';
import MobileMenuButton from '../ui/Button/MobileMenuButton';
import AccountDropdown from '../account/AccountDropdown';

const Navbar = ({  
  navConfig = {
    logo: {
      text: "STYLEHUB",
      link: "/",
      customLogo: null
    },
    navItems: [],
    showSearch: true,
    showUserAccount: true,
    showCart: true,
    cartItemsCount: 0,
    showWishlist: true,
    wishlistItemsCount: 0,
    showShowAll: true, 
    isLoggedIn: false,
    user: null // { firstName: "John", lastName: "Doe", email: "john@example.com" }
  },  
  customContent = {
    leftContent: null,
    centerContent: null,
    rightContent: null
  },
  className = ""
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const defaultNavItems = [
    { name: 'HOME', path: '/' },
    { name: 'NEW ARRIVALS', path: '/new-arrivals' },
    { name: 'CLOTHING', path: '/clothing' },
    { name: 'BRANDS', path: '/brands' }
  ];

  const navigationItems = navConfig.navItems && navConfig.navItems.length > 0 ? navConfig.navItems : defaultNavItems;

  const handleSidebarOpen = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`bg-white border-b border-neutral-200 ${className} relative z-50`}>
        {/* Main Navigation */}
        <div className="shadow-elegant">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center h-16">
              
              {/* Left Section */}
              <div className="hidden lg:flex items-center space-x-4 flex-1 justify-start">
                {customContent.leftContent || (
                  <>
                    {/* SHOW ALL Button - Conditionally rendered */}
                    {navConfig.showShowAll && (
                      <div
                        className="relative"
                        onMouseEnter={handleSidebarOpen}
                        onMouseLeave={handleSidebarClose}
                      >
                        <Button 
                          variant="primary"
                          size="medium"
                          className='p-0! border-0! shadow-none!  hover:bg-neutral'  
                          icon={
                            <svg 
                              className="w-4 h-4 text-black" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                          }
                        >
                          <span className="text-black font-small">SHOW ALL</span>
                        </Button>

                         {isSidebarOpen && (
                          <div 
                            className="absolute top-full left-0 w-full h-3  bg-transparent"
                            onMouseEnter={handleSidebarOpen}
                          />
                        )}
                      </div>
                    )}

                    {/* Other Navigation Items */}
                    <div className="flex items-center space-x-2">
                      {navigationItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={`text-sm font-medium transition-all duration-200 relative group py-2 px-1 ${
                            location.pathname === item.path 
                              ? 'text-primary-700' 
                              : 'text-neutral-700 hover:text-primary-600'
                          }`}
                        >
                          {item.name}
                          <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-primary-600 transition-all duration-200 ${
                            location.pathname === item.path ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`} />
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Center Section - Logo */}
              <div className="flex items-center justify-center shrink-0 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
                {customContent.centerContent || (
                  <Link 
                    to={navConfig.logo.link} 
                    className="text-2xl font-display font-bold text-primary-800 hover:text-primary-700 transition-colors tracking-tight"
                  >
                    {navConfig.logo.customLogo || navConfig.logo.text}
                  </Link>
                )}
              </div>

              {/* Right Section - Action Icons (Desktop only) */}
              <div className="hidden lg:flex items-center space-x-2 flex-1 justify-end">
                {customContent.rightContent || (
                  <div className="flex items-center space-x-1">
                    {navConfig.showSearch && (
                      <Button
                        variant="ghost"
                        size="medium"
                        iconOnly
                        icon={
                          <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        }
                        className="text-neutral-600 hover:text-primary-600 hover:bg-primary-50"
                      />
                    )}
                    
                    {/* Replace the simple user account button with AccountDropdown */}
                    {navConfig.showUserAccount && (
                      <AccountDropdown
                        isLoggedIn={navConfig.isLoggedIn}
                        user={navConfig.user}
                      />
                    )}
                    
                    {navConfig.showWishlist && (
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="medium"
                          iconOnly
                          onClick={() => navigate('/wishlist')}
                          icon={
                            <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          }
                          className="text-neutral-600 hover:text-primary-600 hover:bg-primary-50"
                        />
                        {navConfig.wishlistItemsCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold leading-none shadow-sm">
                            {navConfig.wishlistItemsCount > 9 ? '9+' : navConfig.wishlistItemsCount}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {navConfig.showCart && (
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="medium"
                          iconOnly
                          onClick={() => navigate('/cart')}
                          icon={
                            <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          }
                          className="text-neutral-600 hover:text-primary-600 hover:bg-primary-50"
                        />
                        {navConfig.cartItemsCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold leading-none shadow-sm">
                            {navConfig.cartItemsCount > 9 ? '9+' : navConfig.cartItemsCount}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <MobileMenuButton
                  isOpen={isMenuOpen}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  variant="ghost"
                  size="medium"
                />
              </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="lg:hidden py-4 border-t border-neutral-200 bg-white">
                <div className="flex flex-col space-y-3">
                  {/* SHOW ALL in Mobile - Conditionally rendered */}
                  {navConfig.showShowAll && (
                    <div className="mb-3">
                      <Button
                        variant="primary"
                        size="medium"
                        fullWidth
                        icon={
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                          </svg>
                        }
                      >
                        <span className="text-white font-medium">SHOW ALL CATEGORIES</span>
                      </Button>
                    </div>
                  )}

                  {/* Navigation Items */}
                  <div className="space-y-1">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`block py-3 px-4 rounded-lg transition-all duration-200 font-medium text-sm ${
                          location.pathname === item.path 
                            ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600' 
                            : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary-600'
                        }`}
                        onClick={closeMobileMenu}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  
                  {/* Mobile Action Links */}
                  <div className="border-t border-neutral-200 pt-4 mt-4 space-y-2">
                    {navConfig.showSearch && (
                      <Button
                        variant="ghost"
                        size="medium"
                        fullWidth
                        onClick={closeMobileMenu}
                        icon={
                          <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        }
                        className="justify-start text-neutral-700"
                      >
                        <span className="text-neutral-700">Search</span>
                      </Button>
                    )}
                    
                    {/* Mobile Auth Links */}
                    {navConfig.showUserAccount && (
                      <>
                        {navConfig.isLoggedIn ? (
                          <>
                            <div className="px-4 py-2 border-b border-neutral-100 mb-2">
                              <p className="text-sm font-semibold text-neutral-900">
                                Hello, {navConfig.user?.firstName}
                              </p>
                              <p className="text-xs text-neutral-500">{navConfig.user?.email}</p>
                            </div>
                            <Link
                              to="/account/profile"
                              className="block py-3 px-4 text-neutral-700 hover:bg-primary-50 rounded-lg transition-colors"
                              onClick={closeMobileMenu}
                            >
                              My Profile
                            </Link>
                            <Link
                              to="/account/orders"
                              className="block py-3 px-4 text-neutral-700 hover:bg-primary-50 rounded-lg transition-colors"
                              onClick={closeMobileMenu}
                            >
                              My Orders
                            </Link>
                            <Link
                              to="/wishlist"
                              className="block py-3 px-4 text-neutral-700 hover:bg-primary-50 rounded-lg transition-colors"
                              onClick={closeMobileMenu}
                            >
                              Wishlist
                            </Link>
                            <button
                              onClick={() => {
                                alert('Logged out successfully!');
                                closeMobileMenu();
                              }}
                              className="block w-full text-left py-3 px-4 text-error-600 hover:bg-error-50 rounded-lg transition-colors"
                            >
                              Sign Out
                            </button>
                          </>
                        ) : (
                          <>
                            <Link
                              to="/login"
                              className="block py-3 px-4 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors font-medium"
                              onClick={closeMobileMenu}
                            >
                              Sign In
                            </Link>
                            <Link
                              to="/register"
                              className="block py-3 px-4 text-neutral-700 hover:bg-primary-50 rounded-lg transition-colors"
                              onClick={closeMobileMenu}
                            >
                              Create Account
                            </Link>
                            <Link
                              to="/forgot-password"
                              className="block py-3 px-4 text-neutral-500 hover:text-primary-600 rounded-lg transition-colors text-sm"
                              onClick={closeMobileMenu}
                            >
                              Forgot Password?
                            </Link>
                          </>
                        )}
                      </>
                    )}
                    
                    {navConfig.showWishlist && (
                      <Button
                        variant="ghost"
                        size="medium"
                        fullWidth
                        onClick={() => {
                          navigate('/wishlist');
                          closeMobileMenu();
                        }}
                        icon={
                          <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        }
                        className="justify-start text-neutral-700"
                      >
                        <span className="text-neutral-700">Wishlist {navConfig.wishlistItemsCount > 0 && `(${navConfig.wishlistItemsCount})`}</span>
                      </Button>
                    )}
                    
                    {navConfig.showCart && (
                      <Button
                        variant="ghost"
                        size="medium"
                        fullWidth
                        onClick={() => {
                          navigate('/cart');
                          closeMobileMenu();
                        }}
                        icon={
                          <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        }
                        className="justify-start text-neutral-700"
                      >
                        <span className="text-neutral-700">Cart {navConfig.cartItemsCount > 0 && `(${navConfig.cartItemsCount})`}</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Category Sidebar - Only render if showShowAll is true */}
      {navConfig.showShowAll && (
        <CategorySidebar
          isOpen={isSidebarOpen}
          onToggle={setIsSidebarOpen}
        />
      )}
    </>
  );
};

export default Navbar;