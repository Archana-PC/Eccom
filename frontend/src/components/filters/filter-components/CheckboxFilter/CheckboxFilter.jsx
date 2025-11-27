// src/components/CheckboxFilter/CheckboxFilter.jsx
import React, { useState } from "react";

const CheckboxFilter = ({
  title = "Filter",
  options = [],
  selectedValues = [],
  onChange,
  type = "default", // "default", "color", "brand"
  maxVisible = 5,
  showSearch = true,
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);

  // Filter options based on search term
  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Options to display
  const displayOptions = showAll ? filteredOptions : filteredOptions.slice(0, maxVisible);

  // Handle checkbox change
  const handleCheckboxChange = (value, checked) => {
    const updatedValues = checked
      ? [...selectedValues, value]
      : selectedValues.filter(item => item !== value);
    
    onChange(updatedValues);
  };

  // Select all filtered options
  const handleSelectAll = () => {
    const allFilteredValues = filteredOptions.map(option => option.value);
    onChange([...new Set([...selectedValues, ...allFilteredValues])]);
  };

  // Clear all selected options
  const handleClearAll = () => {
    onChange([]);
  };

  // Check if all filtered options are selected
  const allFilteredSelected = filteredOptions.length > 0 && 
    filteredOptions.every(option => selectedValues.includes(option.value));

  // Render different content based on type
  const renderOptionContent = (option) => {
    switch (type) {
      case "color":
        return (
          <div className="flex items-center gap-3 flex-1">
            {/* Color Swatch */}
            <span
              className={`w-6 h-6 rounded-full border-2 ${
                selectedValues.includes(option.value) 
                  ? 'border-gray-900' 
                  : 'border-gray-300'
              }`}
              style={{ 
                backgroundColor: option.value,
                // Add pattern for white color
                ...(option.value.toLowerCase() === '#ffffff' || option.value.toLowerCase() === '#fff') && {
                  backgroundImage: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
                  backgroundSize: '8px 8px',
                  backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
                }
              }}
            />
            <span className="text-sm text-gray-700">{option.name}</span>
          </div>
        );

      case "brand":
        return (
          <div className="flex items-center gap-3 flex-1">
            {/* Brand Logo (if available) */}
            {option.logo && (
              <img
                src={option.logo}
                alt={`${option.name} logo`}
                className="w-6 h-6 object-contain rounded"
              />
            )}
            <span className="text-sm text-gray-700">{option.name}</span>
          </div>
        );

      default:
        return (
          <span className="text-sm text-gray-700">{option.name}</span>
        );
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center gap-2">
          {selectedValues.length > 0 && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {selectedValues.length}
            </span>
          )}
        </div>
      </div>

      {/* Search Input */}
      {showSearch && options.length > 5 && (
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Bulk Actions */}
      {filteredOptions.length > 0 && (
        <div className="flex justify-between items-center p-3 border-b border-gray-100 bg-gray-50">
          <button
            onClick={handleSelectAll}
            disabled={allFilteredSelected}
            className={`text-xs font-medium px-3 py-1 rounded ${
              allFilteredSelected
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            Select All
          </button>
          {selectedValues.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs font-medium text-red-600 hover:text-red-700 px-3 py-1 rounded hover:bg-red-50"
            >
              Clear All
            </button>
          )}
        </div>
      )}

      {/* Options List */}
      <div className="max-h-80 overflow-y-auto">
        {displayOptions.length > 0 ? (
          <div className="p-2">
            {displayOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option.value)}
                  onChange={(e) => handleCheckboxChange(option.value, e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                
                {renderOptionContent(option)}

                {/* Option count */}
                {option.count !== undefined && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {option.count}
                  </span>
                )}
              </label>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500 text-sm">
            No {title.toLowerCase()} found
          </div>
        )}
      </div>

      {/* Show More/Less Toggle */}
      {filteredOptions.length > maxVisible && (
        <div className="border-t border-gray-200 p-3">
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            {showAll ? `Show Less` : `Show ${filteredOptions.length - maxVisible} More`}
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckboxFilter;