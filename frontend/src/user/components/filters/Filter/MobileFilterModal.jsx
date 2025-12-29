// src/components/filters/FilterModal/FilterModal.jsx
import React, { useState, useEffect } from "react";
import FilterGroup from "../FilterGroup/FilterGroup";

const MobileFilterModal = ({
  category = "all",
  isOpen,
  onClose,
  onFilterChange,
  onClearFilters,
  activeFiltersCount,
}) => {
  const [activeSection, setActiveSection] = useState(null);
  const [tempFilters, setTempFilters] = useState({});
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);

  // Filter sections configuration
  const filterSections = {
    clothing: [
      { type: "size", title: "Size" },
      { type: "color", title: "Color" },
      { type: "price", title: "Price Range" },
      { type: "brand", title: "Brand" },
      { type: "fit", title: "Fit" },
      { type: "material", title: "Material" },
    ],
    shoes: [
      { type: "size", title: "Size" },
      { type: "color", title: "Color" },
      { type: "price", title: "Price Range" },
      { type: "brand", title: "Brand" },
      { type: "type", title: "Type" },
      { type: "width", title: "Width" },
    ],
    accessories: [
      { type: "color", title: "Color" },
      { type: "price", title: "Price Range" },
      { type: "brand", title: "Brand" },
      { type: "type", title: "Type" },
    ],
  };

  // Filter options configuration
  const filterOptions = {
    clothing: {
      size: [
        { value: "xs", name: "XS", count: 23 },
        { value: "s", name: "S", count: 45 },
        { value: "m", name: "M", count: 67 },
        { value: "l", name: "L", count: 54 },
        { value: "xl", name: "XL", count: 32 },
        { value: "xxl", name: "XXL", count: 18 },
      ],
      color: [
        { value: "#000000", name: "Black", count: 89 },
        { value: "#FFFFFF", name: "White", count: 76 },
        { value: "#1a237e", name: "Navy", count: 45 },
        { value: "#757575", name: "Gray", count: 56 },
        { value: "#d32f2f", name: "Red", count: 34 },
        { value: "#1976d2", name: "Blue", count: 42 },
      ],
      price: {
        min: 0,
        max: 500,
        step: 10,
        currency: "$",
      },
      brand: [
        { value: "nike", name: "Nike", count: 45 },
        { value: "adidas", name: "Adidas", count: 38 },
        { value: "zara", name: "Zara", count: 52 },
        { value: "hm", name: "H&M", count: 41 },
      ],
      fit: [
        { value: "slim", name: "Slim Fit", count: 67 },
        { value: "regular", name: "Regular Fit", count: 89 },
        { value: "loose", name: "Loose Fit", count: 34 },
        { value: "oversized", name: "Oversized", count: 23 },
      ],
      material: [
        { value: "cotton", name: "Cotton", count: 78 },
        { value: "polyester", name: "Polyester", count: 45 },
        { value: "wool", name: "Wool", count: 23 },
        { value: "linen", name: "Linen", count: 19 },
      ],
    },
    shoes: {
      size: [
        { value: "6", name: "US 6", count: 12 },
        { value: "7", name: "US 7", count: 18 },
        { value: "8", name: "US 8", count: 24 },
        { value: "9", name: "US 9", count: 31 },
        { value: "10", name: "US 10", count: 28 },
      ],
      color: [
        { value: "#000000", name: "Black", count: 45 },
        { value: "#FFFFFF", name: "White", count: 38 },
        { value: "#5d4037", name: "Brown", count: 29 },
      ],
      price: {
        min: 0,
        max: 300,
        step: 5,
        currency: "$",
      },
      brand: [
        { value: "nike", name: "Nike", count: 67 },
        { value: "adidas", name: "Adidas", count: 54 },
        { value: "puma", name: "Puma", count: 32 },
      ],
      type: [
        { value: "sneakers", name: "Sneakers", count: 89 },
        { value: "boots", name: "Boots", count: 34 },
        { value: "sandals", name: "Sandals", count: 23 },
      ],
      width: [
        { value: "narrow", name: "Narrow", count: 12 },
        { value: "regular", name: "Regular", count: 89 },
        { value: "wide", name: "Wide", count: 23 },
      ],
    },
    accessories: {
      color: [
        { value: "#000000", name: "Black", count: 34 },
        { value: "#5d4037", name: "Brown", count: 28 },
        { value: "#C0C0C0", name: "Silver", count: 22 },
      ],
      price: {
        min: 0,
        max: 200,
        step: 5,
        currency: "$",
      },
      brand: [
        { value: "coach", name: "Coach", count: 23 },
        { value: "michael-kors", name: "Michael Kors", count: 19 },
        { value: "fossil", name: "Fossil", count: 28 },
      ],
      type: [
        { value: "bags", name: "Bags", count: 45 },
        { value: "watches", name: "Watches", count: 32 },
        { value: "jewelry", name: "Jewelry", count: 28 },
      ],
    },
  };

  // Get current sections
  const currentSections = filterSections[category] || filterSections.clothing;
  const currentOptions = filterOptions[category] || filterOptions.clothing;

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempFilters({});
      setActiveSection(null);
    }
  }, [isOpen]);

  // Animation management
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to trigger CSS animation after mount
      setTimeout(() => {
        setIsAnimating(true);
      }, 10);
    } else {
      // Start closing animation
      setIsAnimating(false);
      // Wait for animation to finish before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Match CSS transition duration (300ms)
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle individual section filter change
  const handleSectionFilterChange = (filterType, values) => {
    setTempFilters((prev) => ({
      ...prev,
      [filterType]: values,
    }));
  };

  // Apply all filters
  const handleApplyFilters = () => {
    onFilterChange(tempFilters);
    onClose();
  };

  // Clear all filters
  const handleClearAll = () => {
    setTempFilters({});
    onClearFilters();
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle close button click
  const handleCloseClick = (e) => {
    e.stopPropagation();
    onClose();
  };

  // Count temp filters for display
  const tempFiltersCount = Object.values(tempFilters).reduce(
    (count, filterValues) => count + (filterValues?.length || 0),
    0
  );

  if (!shouldRender) return null;

  return (
    <div className="lg:hidden w-full fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop with fade animation */}
      <div
        className={`fixed inset-0 transition-opacity duration-800 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleBackdropClick}
      />

      {/* Modal with slide animation - THIS IS THE KEY FIX */}
      <div
        className={`fixed left-0 top-0 h-full w-full  transition-transform duration-800 ease-in-out ${
          isAnimating ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full bg-white shadow-xl flex">
          {/* Left Sidebar - Filter Categories */}
          <div className="w-2/5 bg-gray-50 border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="shrink-0 p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  onClick={handleCloseClick}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Active Filters Count */}
              {tempFiltersCount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {tempFiltersCount} applied
                  </span>
                  <button
                    onClick={handleClearAll}
                    className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>

            {/* Filter Sections List */}
            <div className="flex-1 overflow-y-auto">
              {currentSections.map((section) => {
                const hasSelection =
                  tempFilters[section.type] &&
                  tempFilters[section.type].length > 0;

                return (
                  <button
                    key={section.type}
                    onClick={() => setActiveSection(section.type)}
                    className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-100 transition-colors ${
                      activeSection === section.type
                        ? "bg-blue-50 border-l-4 border-l-blue-500"
                        : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="text-lg mr-3">{section.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {section.title}
                        </div>
                        {hasSelection && (
                          <div className="text-xs text-blue-600 font-medium mt-1">
                            {tempFilters[section.type].length} selected
                          </div>
                        )}
                      </div>
                      <div className="flex items-center">
                        {hasSelection && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side - Individual Filter Section */}
          <div className="w-4/5 bg-white flex flex-col">
            {activeSection ? (
              <>
                {/* Section Header */}
                <div className="shrink-0 flex items-center p-4 border-b border-gray-200 bg-white">
                  <button
                    onClick={() => setActiveSection(null)}
                    className="mr-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {
                      currentSections.find((s) => s.type === activeSection)
                        ?.title
                    }
                  </h3>
                </div>

                {/* Section Content */}
                <div className="flex-1 overflow-y-auto p-4">
                  {currentOptions[activeSection] && (
                    <FilterGroup
                      type={activeSection}
                      title=""
                      options={
                        Array.isArray(currentOptions[activeSection])
                          ? currentOptions[activeSection]
                          : []
                      }
                      selectedValues={tempFilters[activeSection] || []}
                      onSelectionChange={(values) =>
                        handleSectionFilterChange(activeSection, values)
                      }
                      priceConfig={
                        !Array.isArray(currentOptions[activeSection])
                          ? currentOptions[activeSection]
                          : null
                      }
                      isMobileSection={true}
                    />
                  )}
                </div>
              </>
            ) : (
              /* Default view when no section is selected */
              <div className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="text-center">
                  <div className="text-4xl mb-4 opacity-50">👈</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select a filter
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Choose a filter category from the left menu
                  </p>
                </div>
              </div>
            )}

            {/* Apply Button (always visible at bottom) */}
            <div className="shrink-0 p-4 bg-white border-t border-gray-200">
              <button
                onClick={handleApplyFilters}
                className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Apply Filters
                {tempFiltersCount > 0 && (
                  <span className="ml-2 bg-white text-black text-xs rounded-full px-2 py-1">
                    {tempFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterModal;
