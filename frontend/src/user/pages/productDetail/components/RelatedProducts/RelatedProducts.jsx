import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../../../components/ui/ProductCard/ProductCard';



const RelatedProducts = ({ currentProductId, category, brand }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call for related products
    const fetchRelatedProducts = async () => {
      setLoading(true);
      
      setTimeout(() => {
        const mockRelatedProducts = [
          {
            id: '2',
            name: 'Classic Cotton Polo Shirt',
            brand: 'Nike',
            price: 34.99,
            originalPrice: 44.99,
            image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=300&fit=crop',
            category: "Men's Tops",
            rating: 4.3,
            reviewCount: 89,
            isNew: true,
            isOnSale: true,
            isOutOfStock: false,
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['#000000', '#FFFFFF', '#000080']
          },
          {
            id: '3',
            name: 'Premium Hooded Sweatshirt',
            brand: 'Nike',
            price: 49.99,
            originalPrice: 59.99,
            image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop',
            category: "Men's Outerwear",
            rating: 4.7,
            reviewCount: 156,
            isNew: false,
            isOnSale: true,
            isOutOfStock: false,
            sizes: ['M', 'L', 'XL', 'XXL'],
            colors: ['#808080', '#000000', '#8B4513']
          },
          {
            id: '4',
            name: 'Slim Fit Denim Jeans',
            brand: 'Levi\'s',
            price: 79.99,
            originalPrice: 89.99,
            image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop',
            category: "Men's Bottoms",
            rating: 4.5,
            reviewCount: 203,
            isNew: true,
            isOnSale: true,
            isOutOfStock: false,
            sizes: ['30x32', '32x32', '34x32', '36x32'],
            colors: ['#191970', '#000000', '#2F4F4F']
          },
          {
            id: '5',
            name: 'Sport Performance Shorts',
            brand: 'Adidas',
            price: 29.99,
            originalPrice: 39.99,
            image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=300&fit=crop',
            category: "Men's Activewear",
            rating: 4.2,
            reviewCount: 67,
            isNew: false,
            isOnSale: true,
            isOutOfStock: false,
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['#000000', '#FFFFFF', '#008000']
          },
          {
            id: '6',
            name: 'Casual Linen Shirt',
            brand: 'Tommy Hilfiger',
            price: 59.99,
            originalPrice: 69.99,
            image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=300&fit=crop',
            category: "Men's Tops",
            rating: 4.6,
            reviewCount: 124,
            isNew: true,
            isOnSale: false,
            isOutOfStock: false,
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['#F5F5DC', '#D2B48C', '#8B4513']
          },
          {
            id: '7',
            name: 'Winter Parka Jacket',
            brand: 'The North Face',
            price: 199.99,
            originalPrice: 249.99,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
            category: "Men's Outerwear",
            rating: 4.8,
            reviewCount: 89,
            isNew: false,
            isOnSale: true,
            isOutOfStock: false,
            sizes: ['M', 'L', 'XL', 'XXL'],
            colors: ['#000000', '#2F4F4F', '#8B0000']
          },
          {
            id: '8',
            name: 'Running Sneakers',
            brand: 'New Balance',
            price: 89.99,
            originalPrice: 109.99,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
            category: "Men's Footwear",
            rating: 4.4,
            reviewCount: 267,
            isNew: true,
            isOnSale: true,
            isOutOfStock: false,
            sizes: ['8', '9', '10', '11', '12'],
            colors: ['#000000', '#FFFFFF', '#FF0000']
          },
          {
            id: '9',
            name: 'Classic Wool Sweater',
            brand: 'Ralph Lauren',
            price: 129.99,
            originalPrice: 159.99,
            image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop',
            category: "Men's Knitwear",
            rating: 4.7,
            reviewCount: 98,
            isNew: false,
            isOnSale: true,
            isOutOfStock: false,
            sizes: ['S', 'M', 'L', 'XL'],
            colors: ['#800000', '#000080', '#2F4F4F']
          }
        ];
        
        setRelatedProducts(mockRelatedProducts);
        setLoading(false);
      }, 1000);
    };

    fetchRelatedProducts();
  }, [currentProductId, category, brand]);

  // Mock handlers for ProductCard
  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
    // Add your cart logic here
  };

  const handleAddToWishlist = (product) => {
    console.log('Added to wishlist:', product);
    // Add your wishlist logic here
  };

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-xl mb-4"></div>
                <div className="space-y-2">
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                  <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                  <div className="bg-gray-200 h-6 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">You Might Also Like</h2>
            <p className="text-gray-600">Discover similar products that match your style</p>
          </div>
          <Link 
            to={`/products?category=${category}`}
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-2 transition-colors"
          >
            <span>View All</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Related Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
          <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              showWishlist={true}
              showQuickView={true}
              className="h-full"
            />
          ))}
        </div>

        {/* View More Button for Mobile */}
        <div className="text-center mt-8 lg:hidden">
          <Link 
            to={`/products?category=${category}`}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            View All Related Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;