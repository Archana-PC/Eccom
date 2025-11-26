import React, { useState } from 'react';

const SizeSelector = ({ sizes, selectedSize, onSizeSelect }) => {
  const [showGuide, setShowGuide] = useState(false);

  const sizeGuide = {
    'XS': { chest: '32-34"', waist: '26-28"', fit: 'Extra Slim' },
    'S': { chest: '34-36"', waist: '28-30"', fit: 'Slim' },
    'M': { chest: '36-38"', waist: '30-32"', fit: 'Regular' },
    'L': { chest: '38-40"', waist: '32-34"', fit: 'Regular' },
    'XL': { chest: '40-42"', waist: '34-36"', fit: 'Relaxed' },
    'XXL': { chest: '42-44"', waist: '36-38"', fit: 'Relaxed' }
  };

  const sizeNames = {
    'XS': 'Extra Small',
    'S': 'Small',
    'M': 'Medium',
    'L': 'Large',
    'XL': 'Extra Large',
    'XXL': 'Double Extra Large'
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-900 block">
            Select Size
          </label>
          {selectedSize && (
            <span className="text-sm text-gray-500">
              {sizeNames[selectedSize]}
            </span>
          )}
        </div>
        <button 
          onClick={() => setShowGuide(!showGuide)}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          Size Guide
        </button>
      </div>
      
      {/* Size Guide Modal */}
      {showGuide && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-900">Size Guide</h4>
            <button 
              onClick={() => setShowGuide(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2 text-xs">
            <div className="font-medium">Size</div>
            <div className="font-medium">Chest</div>
            <div className="font-medium">Waist</div>
            <div className="font-medium">Fit</div>
            {Object.entries(sizeGuide).map(([size, measurements]) => (
              <React.Fragment key={size}>
                <div className="font-medium">{size}</div>
                <div>{measurements.chest}</div>
                <div>{measurements.waist}</div>
                <div>{measurements.fit}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
      
      {/* Size Buttons */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelect(size)}
            className={`py-3 px-2 border-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedSize === size
                ? 'border-primary-600 bg-primary-600 text-white shadow-md transform scale-105'
                : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
            } ${
              size === 'XXL' ? 'col-span-3 sm:col-span-1' : ''
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      {/* Size Help Text */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Not sure about size?</span>
        <button className="text-primary-600 hover:text-primary-700 font-medium">
          Contact us for help
        </button>
      </div>
    </div>
  );
};

export default SizeSelector;