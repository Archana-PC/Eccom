import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ 
  startDate = "27 NOV, 6 PM", 
  wishlistText = "WISHLIST NOW",
  showNewDrops = true,
  showRewards = true,
  logoText = "THE BEAN HOUSE",
  customStyles = {}
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'NEW DROPS', path: '/new-drops' },
    { name: 'COLLECTIONS', path: '/collections' },
    { name: 'REWARDS', path: '/rewards' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' }
  ];

  return (
    <nav className={`bg-white shadow-sm ${customStyles.navbar || ''}`}>
      {/* Top Banner */}
      <div className="bg-black text-white text-center py-2 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-sm">
          <span className="font-semibold">STARTS {startDate}</span>
          <Link 
            to="/wishlist" 
            className="hover:text-gray-300 transition-colors mt-1 sm:mt-0"
          >
            {wishlistText}
          </Link>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-900">
            {logoText}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-700 hover:text-black transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-0.5 bg-black mb-1.5"></div>
            <div className="w-6 h-0.5 bg-black mb-1.5"></div>
            <div className="w-6 h-0.5 bg-black"></div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-700 hover:text-black transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Optional Secondary Banner */}
      {(showNewDrops || showRewards) && (
        <div className="bg-gray-100 border-t border-b border-gray-200">
          <div className="container mx-auto px-4 py-2">
            <div className="flex justify-center space-x-6 text-sm font-medium">
              {showNewDrops && (
                <Link to="/new-drops" className="hover:text-gray-600 transition-colors">
                  NEW DROPS
                </Link>
              )}
              {showRewards && (
                <Link to="/rewards" className="hover:text-gray-600 transition-colors">
                  REWARDS
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;