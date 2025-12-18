import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ui/ProductCard/ProductCard";
import Carousel from "../../components/carousel/Carousel";
import CategoriesSection from "../../components/sections/CategoriesSection/CategoriesSection";
import CategoryRibbon from "../../components/ui/CategoryRibbon/CategoryRibbon";
import StylesList from "../../components/ui/StylesList";
import ProductGrid from "../../components/ui/ProductCard/ProductGrid";
import FadeInWhenVisible from "../../components/animations/FadeInWhenVisible";

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Classic White T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      category: "T-Shirts",
      image:
        "src/assets/1L9A7405.JPG",
      brand: "PremiumWear",
      rating: 4.5,
      reviewCount: 128,
      isNew: false,
      isOnSale: true,
      sizes: ["S", "M", "L", "XL"],
      colors: ["#ffffff", "#000000", "#1e293b"],
    },
    {
      id: 2,
      name: "Slim Fit Jeans",
      price: 79.99,
      category: "Jeans",
      image:
        "src/assets/1L9A7413.JPG",
      brand: "DenimCo",
      rating: 4.2,
      reviewCount: 89,
      sizes: ["30x32", "32x32", "34x32"],
      colors: ["#1e3a8a", "#000000", "#374151"],
    },
    {
      id: 3,
      name: "Casual Blazer",
      price: 129.99,
      originalPrice: 159.99,
      category: "Jackets",
      image:
        "src/assets/1L9A7415.JPG",
      brand: "Elegance",
      rating: 2.1,
      reviewCount: 64,
      isOnSale: true,
      sizes: ["S", "M", "L", "XL"],
      colors: ["#1f2937", "#4b5563", "#6b7280"],
    },
    {
      id: 4,
      name: "Running Shoes",
      price: 89.99,
      category: "Footwear",
      image:
        "src/assets/1L9A7416.JPG",
      brand: "ActiveWear",
      rating: 3.3,
      reviewCount: 156,
      isNew: true,
      sizes: ["US 8", "US 9", "US 10", "US 11"],
      colors: ["#dc2626", "#000000", "#1e40af"],
    },
     {
      id: 5,
      name: "Running Shoes",
      price: 89.99,
      category: "Footwear",
      image:
        "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&q=80",
      brand: "ActiveWear",
      rating: 4.3,
      reviewCount: 156,
      isNew: true,
      sizes: ["US 8", "US 9", "US 10", "US 11"],
      colors: ["#dc2626", "#000000", "#1e40af"],
    },
  ];

  const styles = [
    {
      name: "MOUNT",
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
    },
    {
      name: "MAI",
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=800&q=80",
    },
    {
      name: "METRIC",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    },
    {
      name: "TWILL SHIRT",
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    },
    {
      name: "OXFORD SHIRT",
      image:
        "https://images.unsplash.com/photo-1589330694658-53be0d6b2c79?w=800&q=80",
    },
    {
      name: "SHARK OVERSIZE GRAPHIC",
      image:
        "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80",
    },
    {
      name: "SHARK CREW",
      image:
        "https://images.unsplash.com/photo-1618354691399-1ba7cf59bd35?w=800&q=80",
    },
    {
      name: "CHINOS",
      image:
        "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&q=80",
    },
    {
      name: "SHARK POLO",
      image:
        "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?w=800&q=80",
    },
    {
      name: "SHARK JEANS",
      image:
        "https://images.unsplash.com/photo-1514995428455-447d4443fa7f?w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Category Ribbon */}
      <FadeInWhenVisible>

         <CategoryRibbon
        // categories={backendCategories}
        showSaleBadge={true}
        saleBadgeText="Limited Time Offer"
        // onCategoryClick={handleCategoryClick}
      />
      </FadeInWhenVisible>
     
      {/* Hero Carousel */}
      <FadeInWhenVisible  delay={0.1}>

      <Carousel>
        {/* Premium Suits */}
        <img
          src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1470&q=80"
          alt="Premium Tailored Suits"
          className="w-full h-full object-cover"
        />

        {/* Casual Wear */}
        <img
          src="https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1470&q=80"
          alt="Premium Shirts Collection"
          className="w-full h-full object-cover"
        />

        {/* Shirts */}
        <img
          src="https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1470&q=80"
          alt="Premium Shirts Collection"
          className="w-full h-full object-cover"
        />

        {/* Winter Jackets */}
        <img
          src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=1470&q=80"
          alt="Winter Jackets & Coats"
          className="w-full h-full object-cover"
        />

        {/* Denim Jeans */}
        <img
          src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1470&q=80"
          alt="Premium Denim Jeans"
          className="w-full h-full object-cover"
        />

        {/* Accessories */}
        <img
          src="https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=1470&q=80"
          alt="Men's Accessories"
          className="w-full h-full object-cover"
        />
      </Carousel>
</FadeInWhenVisible>
<FadeInWhenVisible delay={0.2}>
      <StylesList
        styles={styles}
        columns={5}
        onStyleClick={(style) => console.log("Clicked:", style)}
      />
</FadeInWhenVisible>
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
          console.log("Homepage category click:", category);
        }}
        onSubcategoryClick={(subcategory) => {
          // Add analytics tracking
          console.log("Homepage subcategory click:", subcategory);
        }}
      /> 

<FadeInWhenVisible delay={0.3}>
     <ProductGrid
      products={featuredProducts}
      title="Trending Now"
      showTitle={true}
      showViewAll={true}
      // originalPrice={originalPrice}
    />
  </FadeInWhenVisible>
    </div>
  );
};

export default Home;
