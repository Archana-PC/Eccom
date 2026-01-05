import React, { useState, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import Navbar from "../user/components/navbar/Navbar";
import MobileFilterModal from "../user/components/filters/Filter/MobileFilterModal";
import Filter from "../user/components/filters/Filter/Filter";
import { useGetStylesQuery, useGetCategoriesQuery } from "../user/services/catalog/catalogApi";
import StylesRibbon from "../user/components/ui/StylesRibbon /StylesRibbon";

// Small ribbon for styles (only name, click -> /styles/:slug)


const StyleLayout = () => {
  const { style } = useParams(); // URL: /styles/:style
  const [activeFilters, setActiveFilters] = useState({});
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("newest");

  // optional: keep categories ribbon also (if you want)
  const { data: categories } = useGetCategoriesQuery();

  // styles list
  const { data: stylesResp } = useGetStylesQuery();
  const styles = stylesResp?.results ?? []; // because API returns {results:[]}

  useEffect(() => setIsMobileFilterOpen(false), [style]);

  const handleFilterChange = (filters) => setActiveFilters(filters);
  const handleClearFilters = () => setActiveFilters({});
  const handleSortChange = (v) => setSortOption(v);

  const activeFiltersCount = Object.values(activeFilters).reduce(
    (count, v) => count + (Array.isArray(v) ? v.length : 0),
    0
  );

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar
        navConfig={{
          logo: { text: "STYLEHUB", link: "/" },
          showSearch: true,
          showUserAccount: true,
          showCart: true,
          cartItemsCount: 2,
          showWishlist: true,
        }}
      />

      {/* Optional: keep category ribbon */}
      {/* <CategoryRibbon categories={categories?.results} showSaleBadge saleBadgeText="Limited Time Offer" /> */}

      {/* Style ribbon */}
      <StylesRibbon styles={styles} />

      <div className="flex flex-1 w-full max-w-full">
        <aside className="hidden lg:block w-60 bg-white">
          <div className="sticky top-24">
            <Filter
              category={"all"}              // keep your Filter working
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        </aside>

        <main className="flex-1 overflow-hidden">
          <div className="lg:hidden border-b p-4 bg-white sticky top-0 z-10">
            <div className="flex items-center justify-between space-x-4 max-w-full">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="flex items-center space-x-2 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors shrink-0"
              >
                <span className="truncate">Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-5 h-5 flex items-center justify-center shrink-0">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <select
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm max-w-[140px] truncate"
              >
                <option value="newest">Newest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          <div className="p-2 lg:p-6 overflow-x-hidden">
            <Outlet
              context={{
                style,
                activeFilters,
                sortOption,
              }}
            />
          </div>
        </main>
      </div>

      <MobileFilterModal
        category={"all"}
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        activeFiltersCount={activeFiltersCount}
      />
    </div>
  );
};

export default StyleLayout;
