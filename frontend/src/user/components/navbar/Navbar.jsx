import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CategorySidebar from "../sidebar/CategorySidebar";
import AccountDropdown from "../account/AccountDropdown";
import { useSelector } from "react-redux";

const Navbar = ({
  navConfig = {
    logo: { text: "SHARK PLUS", link: "/", customLogo: null },
    navItems: [],
    showSearch: true,
    showUserAccount: true,
    showCart: true,
    cartItemsCount: 0,
    showWishlist: true,
    wishlistItemsCount: 0,
    showShowAll: true,
    isLoggedIn: false,
    user: null,
  },
  className = "",
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const defaultNavItems = [
    { name: "HOME", path: "/" },
    { name: "NEW ARRIVALS", path: "/new-arrivals" },
    { name: "CLOTHING", path: "/clothing" },
  ];

  const navItems =
  navConfig?.navItems?.length > 0
    ? navConfig.navItems
    : defaultNavItems;

    const { isAuthenticated, user } = useSelector((state) => state.auth);
    console.log(isAuthenticated, user);

  return (
    <>
      {/* ================================
          STICKY NAVBAR (MOBILE + DESKTOP)
      ================================= */}
      <nav
        className={`
          sticky top-0 z-999
          bg-white border-b border-gray-200 shadow-sm 
          h-16 flex items-center
          ${className}
        `}
        
      >
        <div className="px-4 md:px-6 w-full">
          <div className="flex justify-between items-center h-16">
            {/* ===== MOBILE MENU BUTTON ===== */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
              
                {isMenuOpen ? (
                  <svg className="w-5 h-5" stroke="black" fill="none">
                    <path strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" stroke="black" fill="none">
                    <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

            {/* ===== DESKTOP LEFT NAVIGATION ===== */}
            <div className="hidden lg:flex items-center space-x-6 flex-1">
              {/* SHOW ALL */}
              {navConfig.showShowAll && (
                <button
                  onMouseEnter={() => setIsSidebarOpen(true)}
                  className="flex items-center px-4 py-2.5 rounded-lg text-[#4A6370] hover:text-[#006699] text-sm font-medium"
                >
               
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              )}

              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`
                    text-sm font-medium relative tracking-wide pb-1
                    ${
                      location.pathname === item.path
                        ? "text-[#006699] font-semibold"
                        : "text-[#4A6370] hover:text-[#006699]"
                    }
                  `}
                >
                  {item.name}
                  <span
                    className={`
                      absolute left-0 bottom-0 w-full h-0.5 bg-[#0099CC] rounded-full
                      transition-all ${
                        location.pathname === item.path
                          ? "opacity-100 scale-x-100"
                          : "opacity-0 scale-x-0"
                      }
                    `}
                  />
                </Link>
              ))}
            </div>

            {/* ===== CENTER LOGO ===== */}

            <div className="flex justify-center lg:absolute lg:left-1/2 lg:-translate-x-1/2 cursor-pointer">
              <Link to="/">
                <img
                  src="/src/assets/logo2.png"
                  alt="Shark Plus"
                  className="
                    h-32 w-auto 
                    drop-shadow-md
                    transition duration-300
                    hover:scale-105 hover:drop-shadow-xl
                  "
                />
              </Link>
            </div>
            {/* ===== RIGHT ICONS ===== */}
            <div className="flex items-center space-x-2 flex-1 justify-end">
              {/* PERMANENT SEARCH BAR */}
              <div className="hidden lg:flex items-center mr-3">
                <div className="flex items-center w-64 bg-gray-100 border border-gray-300 rounded-full px-3 py-1.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-500 mr-2 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>

                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 bg-transparent outline-none text-sm text-gray-700"
                  />
                </div>
              </div>

              {/* Wishlist */}
              <button
                onClick={() => navigate("/wishlist")}
                className="relative p-3"
              >
                <svg
                  className="w-6 h-6 text-[#4A6370]"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 
                  20.364l7.682-7.682a4.5 4.5 0 
                  00-6.364-6.364L12 7.636l-1.318-1.318a4.5 
                  4.5 0 00-6.364 0z"
                  />
                </svg>

                {navConfig.wishlistItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#0099CC] text-white w-5 h-5 text-xs rounded-full flex justify-center items-center">
                    {navConfig.wishlistItemsCount}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => navigate("/cart")}
                className="relative p-3"
              >
                <svg
                  className="w-6 h-6 text-[#4A6370]"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 
                  13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 
                  1.707.707 1.707H17m0 
                  0a2 2 0 100 4 2 2 0 
                  000-4zm-8 2a2 2 0 
                  11-4 0 2 2 0 014 0z"
                  />
                </svg>

                {navConfig.cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#0099CC] text-white w-5 h-5 text-xs rounded-full flex justify-center items-center">
                    {navConfig.cartItemsCount}
                  </span>
                )}
              </button>

              {/* Account Dropdown (Desktop only) */}
              <div className="hidden lg:block">
                <AccountDropdown
                  isLoggedIn={isAuthenticated}
                  user={user}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ===========================
           MOBILE LEFT DRAWER MENU
      ============================ */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-9999 lg:hidden">
          {/* LIGHT OVERLAY */}
          <div
            className="absolute inset-0 bg-[rgba(0,0,0,0.12)] backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* SLIDING DRAWER */}
          <div
            className="absolute left-0 top-0 h-full w-[65%] max-w-[300px]
                       bg-white shadow-2xl border-r border-gray-200 rounded-r-2xl
                       p-5 animate-slideInLeft"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 mb-4 rounded-full border border-gray-300 hover:bg-gray-100"
            >
              <svg className="w-5 h-5" stroke="black" fill="none">
                <path strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* SHOW ALL BUTTON */}
            {navConfig.showShowAll && (
              <button className="w-full flex items-center gap-2 px-4 py-3 bg-[#006699] text-white rounded-xl font-medium shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="white">
                  <path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                SHOW ALL CATEGORIES
              </button>
            )}

            {/* NAV ITEMS */}
            <div className="mt-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    block px-4 py-3 rounded-xl text-sm font-medium transition
                    ${
                      location.pathname === item.path
                        ? "bg-[#e8f6ff] text-[#006699]"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* USER SECTION */}
            <div className="border-t border-gray-200 mt-4 pt-4">
              {!navConfig.isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-[#006699] font-medium hover:bg-gray-100 rounded-xl"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 hover:bg-gray-100 rounded-xl"
                  >
                    Create Account
                  </Link>
                </>
              ) : (
                <>
                  <div className="px-4 pb-2">
                    <p className="font-semibold">{navConfig.user?.firstName}</p>
                    <p className="text-xs text-gray-500">
                      {navConfig.user?.email}
                    </p>
                  </div>
                  <Link
                    to="/account/profile"
                    className="block px-4 py-3 hover:bg-gray-100 rounded-xl"
                  >
                    My Profile
                  </Link>
                  <button className="block px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl">
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP CATEGORY SIDEBAR */}
      <CategorySidebar isOpen={isSidebarOpen} onToggle={setIsSidebarOpen} />
    </>
  );
};

export default Navbar;
