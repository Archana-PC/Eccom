import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import CartNavbar from '../../components/navbar/varitants/CartNavbar';
import Button from '../../components/ui/Button/Button';
import ProductCard from '../../components/ui/ProductCard/ProductCard';

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist, getWishlistCount } = useWishlist();
  const { addToCart } = useCart();
  const { showSuccess, showInfo } = useToast();
  
  const wishlistCount = getWishlistCount();

  const handleRemoveFromWishlist = (productId) => {
    const product = items.find(item => item.id === productId);
    removeFromWishlist(productId);
    if (product) {
      showInfo(`${product.name} removed from wishlist`);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    showSuccess(`${product.name} added to cart!`);
  };

  const handleMoveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
    showSuccess(`${product.name} moved to cart!`);
  };

  const handleClearWishlist = () => {
    clearWishlist();
    showInfo('Wishlist cleared');
  };

  if (wishlistCount === 0) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <CartNavbar />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="bg-white rounded-xl shadow-md border border-neutral-200 p-6 lg:p-8 text-center">
            <div className="mb-8">
              <svg className="mx-auto h-24 w-24 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Your Wishlist is Empty</h1>
              <p className="text-neutral-600 mb-8">Save your favorite items to your wishlist so you can find them later.</p>
              <Button
                variant="premium"
                size="large"
                className="text-lg py-4 px-8"
                onClick={() => window.location.href = '/'}
              >
                DISCOVER PRODUCTS
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <CartNavbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="bg-white rounded-xl shadow-md border border-neutral-200 p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">Your Wishlist</h1>
              <p className="text-neutral-600">{wishlistCount} {wishlistCount === 1 ? 'item' : 'items'} saved</p>
            </div>
            {wishlistCount > 0 && (
              <div className="mt-4 sm:mt-0 flex space-x-3">
                <Button
                  variant="outline"
                  size="medium"
                  onClick={handleClearWishlist}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  Clear All
                </Button>
              </div>
            )}
          </div>
          
          {/* Wishlist Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {items.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onAddToWishlist={handleRemoveFromWishlist}
                  showQuickView={true}
                  className="h-full"
                />
                
                {/* Wishlist Actions Overlay */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2 z-10">
                  <Button
                    variant="minimal"
                    size="small"
                    iconOnly
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    className="bg-white shadow-md hover:shadow-lg text-red-500 hover:text-red-700"
                    title="Remove from Wishlist"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Button>
                </div>

                {/* Move to Cart Button */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="small"
                      className="flex-1 bg-white shadow-lg border-primary-600 text-primary-700 hover:bg-primary-50"
                      onClick={() => handleMoveToCart(product)}
                    >
                      Move to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Wishlist Summary */}
          <div className="bg-neutral-50 rounded-lg p-6 lg:p-8 border border-neutral-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Wishlist Summary</h3>
                <p className="text-neutral-600">
                  You have {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'} saved for later
                </p>
              </div>
              
              <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <Button
                  variant="outline"
                  size="large"
                  onClick={() => window.location.href = '/'}
                  className="whitespace-nowrap"
                >
                  Continue Shopping
                </Button>
                <Button
                  variant="premium"
                  size="large"
                  onClick={() => {
                    items.forEach(product => {
                      addToCart(product);
                    });
                    clearWishlist();
                    showSuccess('All items moved to cart!');
                  }}
                  className="whitespace-nowrap"
                >
                  Add All to Cart
                </Button>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-8 pt-8 border-t border-neutral-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">You might also like</h3>
            <p className="text-neutral-600 mb-6">Based on your wishlist preferences</p>
            
            <div className="text-center py-12">
              <p className="text-neutral-500 mb-4">Recommendations coming soon...</p>
              <Link 
                to="/" 
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                Explore all products →
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 pt-8 border-t border-neutral-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-neutral-600">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>Save for Later</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-neutral-600">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5zm0 0v-5a7.5 7.5 0 00-15 0v5" />
                </svg>
                <span>Price Drop Alerts</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-neutral-600">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414A1 1 0 0117.414 13H20" />
                </svg>
                <span>Easy Sharing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;