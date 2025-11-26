import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button/Button';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Classic White Sneakers",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop",
      brand: "SportStyle",
      inStock: true,
      colors: ['White', 'Black', 'Navy'],
      sizes: ['US 8', 'US 9', 'US 10', 'US 11'],
      rating: 4.5,
      reviewCount: 128
    },
    {
      id: 2,
      name: "Leather Wallet",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop",
      brand: "Luxe",
      inStock: true,
      colors: ['Brown', 'Black'],
      rating: 4.8,
      reviewCount: 89
    },
    {
      id: 3,
      name: "Denim Jacket",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=400&fit=crop",
      brand: "UrbanWear",
      inStock: false,
      colors: ['Blue', 'Black'],
      sizes: ['S', 'M', 'L', 'XL'],
      rating: 4.3,
      reviewCount: 64
    },
    {
      id: 4,
      name: "Smart Watch",
      price: 199.99,
      originalPrice: 249.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=400&fit=crop",
      brand: "TechStyle",
      inStock: true,
      colors: ['Silver', 'Black', 'Gold'],
      rating: 4.6,
      reviewCount: 203
    }
  ]);

  const [selectedItems, setSelectedItems] = useState([]);

  const removeFromWishlist = (id) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
    setSelectedItems(selected => selected.filter(itemId => itemId !== id));
  };

  const addToCart = (item) => {
    // Mock add to cart functionality
    alert(`${item.name} added to cart!`);
  };

  const toggleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const selectAllItems = () => {
    setSelectedItems(wishlistItems.map(item => item.id));
  };

  const clearSelectedItems = () => {
    setSelectedItems([]);
  };

  const removeSelectedItems = () => {
    setWishlistItems(items => items.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const moveSelectedToCart = () => {
    const selectedProducts = wishlistItems.filter(item => selectedItems.includes(item.id));
    selectedProducts.forEach(item => addToCart(item));
    removeSelectedItems();
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Start adding items you love to your wishlist. They'll appear here for easy access later.
            </p>
            <Link to="/">
              <Button variant="primary" size="large">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-600 mt-2">{wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved</p>
          </div>

          {/* Bulk Actions */}
          {wishlistItems.length > 0 && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={selectedItems.length === wishlistItems.length ? clearSelectedItems : selectAllItems}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  {selectedItems.length === wishlistItems.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>
              
              {selectedItems.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="small"
                    onClick={moveSelectedToCart}
                  >
                    Add to Cart ({selectedItems.length})
                  </Button>
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={removeSelectedItems}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove ({selectedItems.length})
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Selection Checkbox */}
              <div className="absolute top-3 left-3 z-10">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleSelectItem(item.id)}
                  className="w-4 h-4 text-primary-600 bg-white border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                />
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <Link to={`/product/${item.id}`} className="block">
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-64 object-cover"
                  />
                  
                  {/* Stock Status */}
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                        Out of Stock
                      </span>
                    </div>
                  )}

                  {/* Sale Badge */}
                  {item.originalPrice && (
                    <div className="absolute top-3 left-12">
                      <span className="bg-red-500 text-white px-2 py-1 text-xs rounded-md font-medium">
                        SALE
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({item.reviewCount})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg font-bold text-gray-900">${item.price}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                    )}
                  </div>

                  {/* Available Colors */}
                  {item.colors && (
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xs text-gray-600">Colors:</span>
                      <div className="flex space-x-1">
                        {item.colors.slice(0, 3).map((color, index) => (
                          <span key={index} className="text-xs text-gray-500">
                            {color}{index < Math.min(item.colors.length - 1, 2) && ','}
                          </span>
                        ))}
                        {item.colors.length > 3 && (
                          <span className="text-xs text-gray-500">+{item.colors.length - 3}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Link>

              {/* Action Button */}
              <div className="px-4 pb-4">
                <Button
                  variant={item.inStock ? "primary" : "outline"}
                  size="medium"
                  fullWidth
                  onClick={() => item.inStock ? addToCart(item) : null}
                  disabled={!item.inStock}
                >
                  {item.inStock ? "Add to Cart" : "Notify When Available"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <Link to="/">
            <Button variant="outline" size="large">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;