  import React from "react";
  import { Link } from "react-router-dom";

  

  
import ProductGrid from "../../components/ui/ProductCard/ProductGrid";
import Carousel from "../../components/carousel/Carousel";
import CategoriesSection from "../../components/sections/CategoriesSection/CategoriesSection";
import CategoryRibbon from "../../components/ui/CategoryRibbon/CategoryRibbon";
import StylesList from "../../components/ui/StylesList";
import FadeInWhenVisible from "../../components/animations/FadeInWhenVisible";
import { useGetCategoriesQuery, useGetHomeProductsQuery } from "../../../services/catalog/catalogApi";

  const Home = () => {

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

    const { data: categories, isLoading, isError } = useGetCategoriesQuery();

    const {
      data: homeProducts,
      isLoading: isHomeLoading,
      isError: isHomeError,
    } = useGetHomeProductsQuery();

    console.log("home products", homeProducts);

    return (
      <div className="min-h-screen bg-neutral-50">
        {/* Category Ribbon */}
        <FadeInWhenVisible>
          <CategoryRibbon
            categories={categories?.results}
            showSaleBadge={true}
            saleBadgeText="Limited Time Offer"
            // onCategoryClick={handleCategoryClick}
          />
        </FadeInWhenVisible>

        {/* Hero Carousel */}
        <FadeInWhenVisible delay={0.1}>
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
        <FadeInWhenVisible  delay={0.1}>
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
        </FadeInWhenVisible>

        {homeProducts?.sections?.map((section) => (
          <FadeInWhenVisible key={section.key} delay={0.1}>
            <ProductGrid
              products={section.products}
              loading={isHomeLoading}
              title={section.title}
            />
          </FadeInWhenVisible>
        ))}
      </div>
    );
  };

  export default Home;
