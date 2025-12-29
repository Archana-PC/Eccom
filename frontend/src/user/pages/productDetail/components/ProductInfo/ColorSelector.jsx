import React from 'react';

const ColorSelector = ({ colors, selectedColor, onColorSelect }) => {
  const getTextColor = (backgroundColor) => {
    // Convert hex to RGB
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-900">
          Select Color: <span className="font-normal text-gray-500 ml-1">{selectedColor.name}</span>
        </label>
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <div className="w-3 h-3 rounded-full border border-gray-300"></div>
          <span>Selected</span>
        </div>
      </div>
      
      {/* Color Swatches */}
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => {
          const isSelected = selectedColor.name === color.name;
          const textColor = getTextColor(color.value);
          
          return (
            <button
              key={color.name}
              onClick={() => onColorSelect(color)}
              className={`relative group transition-all duration-200 ${
                isSelected ? 'scale-110' : 'scale-100'
              }`}
            >
              {/* Color Circle */}
              <div
                className={`w-14 h-14 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                  isSelected
                    ? 'border-primary-600 ring-2 ring-primary-600 ring-opacity-50 shadow-lg'
                    : 'border-gray-300 group-hover:border-gray-400 group-hover:shadow-md'
                }`}
                style={{ backgroundColor: color.value }}
              >
                {isSelected && (
                  <svg 
                    className="w-5 h-5" 
                    style={{ color: textColor }}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                
                {/* Border for light colors */}
                {(color.value === '#FFFFFF' || color.value === '#FFF' || color.value.toLowerCase() === 'white') && (
                  <div className="absolute inset-0 rounded-full border border-gray-300"></div>
                )}
              </div>
              
              {/* Color Name Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  {color.name}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Color Names Display */}
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onColorSelect(color)}
            className={`text-xs px-3 py-2 rounded-full border transition-all duration-200 ${
              selectedColor.name === color.name
                ? 'bg-primary-100 text-primary-800 border-primary-300 font-medium'
                : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
            }`}
          >
            {color.name}
          </button>
        ))}
      </div>

      {/* Color Description */}
      <div className="text-xs text-gray-500 bg-blue-50 rounded-lg p-3">
        <p className="font-medium text-blue-800 mb-1">Color Information</p>
        <p>Colors may vary slightly due to monitor settings. All colors are color-fast and won't fade easily.</p>
      </div>
    </div>
  );
};

export default ColorSelector;