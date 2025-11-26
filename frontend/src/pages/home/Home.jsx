import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ui/ProductCard/ProductCard';
import Carousel from '../../components/carousel/Carousel';
import CategoriesSection from '../../components/sections/CategoriesSection/CategoriesSection';


const Home = () => {  
  const featuredProducts = [
    {
      id: 1,
      name: "Classic White T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      category: "T-Shirts",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      brand: "PremiumWear",
      rating: 4.5,
      reviewCount: 128,
      isNew: true,
      isOnSale: true,
      sizes: ["S", "M", "L", "XL"],
      colors: ["#ffffff", "#000000", "#1e293b"]
    },
    {
      id: 2,
      name: "Slim Fit Jeans",
      price: 79.99,
      category: "Jeans",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
      brand: "DenimCo",
      rating: 4.2,
      reviewCount: 89,
      sizes: ["30x32", "32x32", "34x32"],
      colors: ["#1e3a8a", "#000000", "#374151"]
    },
    {
      id: 3,
      name: "Casual Blazer",
      price: 129.99,
      originalPrice: 159.99,
      category: "Jackets",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop",
      brand: "Elegance",
      rating: 4.8,
      reviewCount: 64,
      isOnSale: true,
      sizes: ["S", "M", "L", "XL"],
      colors: ["#1f2937", "#4b5563", "#6b7280"]
    },
    {
      id: 4,
      name: "Running Shoes",
      price: 89.99,
      category: "Footwear",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop",
      brand: "ActiveWear",
      rating: 4.3,
      reviewCount: 156,
      isNew: true,
      sizes: ["US 8", "US 9", "US 10", "US 11"],
      colors: ["#dc2626", "#000000", "#1e40af"]
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Carousel */}
      <Carousel>
        <img
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1470&q=80" 
          alt
          ="Men's Fashion 3"
          className="w-full h-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1470&q=80"
          alt="Men's Fashion 1"
          className="w-full h-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1470&q=80"   
          alt="Men's Fashion 2"   
          className="w-full h-full object-cover"
        />
       
        <img
          src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1470&q=80"
          alt="Men's Fashion 4"
          className="w-full h-full object-cover"
        />
      </Carousel>

      {/* Categories Section */}
      <CategoriesSection
        title="SHOP BY CATEGORY"
        subtitle="Explore our curated collections designed for the modern man"
        maxCategories={6}
        variant="default"
        columns={3}
        showAll={true}
        onCategoryClick={(category) => {
          // Add analytics tracking
          console.log('Homepage category click:', category);
        }}
        onSubcategoryClick={(subcategory) => {
          // Add analytics tracking  
          console.log('Homepage subcategory click:', subcategory);
        }}
      />

      {/* Featured Products */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              FEATURED COLLECTIONS
            </h2>
          </div>
          
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                // onAddToCart={handleAddToCart}
                // onAddToWishlist={handleAddToWishlist}
                showQuickView={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Premium Quality</h3>
              <p className="text-neutral-600">Crafted with the finest materials and attention to detail</p>
            </div>
            <div className="text-center">
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Sustainable Fashion</h3>
              <p className="text-neutral-600">Ethically sourced and environmentally conscious production</p>
            </div>
            <div className="text-center">
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Worldwide Shipping</h3>
              <p className="text-neutral-600">Free shipping on orders over $100 worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            JOIN STYLEHUB REWARDS
          </h2>
          <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto leading-relaxed">
            Earn points with every purchase, get exclusive access to new drops, and enjoy member-only benefits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/rewards"
              className="bg-amber-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-600 transition-colors shadow-lg"
            >
              LEARN ABOUT REWARDS
            </Link>
            <Link
              to="/signup"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-slate-900 transition-colors"
            >
              CREATE ACCOUNT
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;