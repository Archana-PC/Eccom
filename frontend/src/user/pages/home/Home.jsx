
import React from "react";
import { useNavigate } from "react-router-dom";

import ProductGrid from "../../components/ui/ProductCard/ProductGrid";
import Carousel from "../../components/carousel/Carousel";
import CategoriesSection from "../../components/sections/CategoriesSection/CategoriesSection";
import CategoryRibbon from "../../components/ui/CategoryRibbon/CategoryRibbon";
import StylesList from "../../components/ui/StylesList";
import FadeInWhenVisible from "../../components/animations/FadeInWhenVisible";

import {
  useGetCategoriesQuery,
  useGetHomeProductsQuery,
  useGetStylesQuery,     // ✅ add this
} from "../../services/catalog/catalogApi";
import CategoryRibbonContainer from "../../components/ui/CategoryRibbon/CategoryRibbonContainer";

const Home = () => {
  const navigate = useNavigate();

  const { data: categories } = useGetCategoriesQuery();

  const { data: homeProducts, isLoading: isHomeLoading } = useGetHomeProductsQuery();

  // ✅ styles from API (because transformResponse returns array)
  const { data: styles = [], isLoading: stylesLoading } = useGetStylesQuery();
  console.log("Home products:", homeProducts);

  return (
    <div className="min-h-screen bg-neutral-50">

      <FadeInWhenVisible>
  <CategoryRibbonContainer
    showSaleBadge={true}
    saleBadgeText="Limited Time Offer"
    pageSize={10} // optional
  />
</FadeInWhenVisible>

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
          styles={styles}                 // ✅ API styles
          loading={stylesLoading}         // ✅ optional
          columns={5}
          onStyleClick={(style) => {
            // ✅ go to style products page
            navigate(`/styles/${style.slug}`);
          }}
        />
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.1}>
        <CategoriesSection
          title="SHOP BY CATEGORY"
          subtitle="Explore our curated collections designed for the modern man"
          maxCategories={6}
          variant="default"
          columns={3}
          showAll={true}
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
