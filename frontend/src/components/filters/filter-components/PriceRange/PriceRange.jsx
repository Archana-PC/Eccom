// src/components/PriceRange/PriceRange.jsx
import React, { useState, useCallback } from 'react';
import RangeSlider from '../RangeSlider/RangeSlider';
import Input from '../../../ui/Input/Input';

const PriceRange = ({
  minPrice = 0,
  maxPrice = 1000,
  step = 10,
  value = [minPrice, maxPrice],
  onChange,
  currency = '$',
  showInputs = true,
  showPresets = true,
  className = '',
  title = 'Price Range'
}) => {
  const [localValue, setLocalValue] = useState(value);

  // Price presets for quick selection
  const pricePresets = [
    { label: `Under ${currency}25`, value: [0, 25] },
    { label: `${currency}25 - ${currency}50`, value: [25, 50] },
    { label: `${currency}50 - ${currency}100`, value: [50, 100] },
    { label: `${currency}100 - ${currency}200`, value: [100, 200] },
    { label: `${currency}200 - ${currency}500`, value: [200, 500] },
    { label: `Over ${currency}500`, value: [500, maxPrice] }
  ];

  // Format price with currency
  const formatPrice = (price) => {
    return `${currency}${price}`;
  };

  // Handle range change
  const handleRangeChange = useCallback((newRange) => {
    setLocalValue(newRange);
    onChange(newRange);
  }, [onChange]);

  // Handle preset selection
  const handlePresetSelect = (presetValue) => {
    handleRangeChange(presetValue);
  };

  // Check if preset is active
  const isPresetActive = (presetValue) => {
    return localValue[0] === presetValue[0] && localValue[1] === presetValue[1];
  };

  // Check if current range is default
  const isDefaultRange = localValue[0] === minPrice && localValue[1] === maxPrice;

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {!isDefaultRange && (
          <button
            onClick={() => handleRangeChange([minPrice, maxPrice])}
            className="text-sm text-amber-600 hover:text-amber-700 font-medium"
          >
            Reset
          </button>
        )}
      </div>

      <div className="p-4 space-y-6">
        {/* Range Slider */}
        <RangeSlider
          min={minPrice}
          max={maxPrice}
          step={step}
          value={localValue}
          onChange={handleRangeChange}
          formatValue={formatPrice}
          showInputs={showInputs}
          label={null}
        />

        {/* Price Presets */}
        {showPresets && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">Quick select:</p>
            <div className="grid grid-cols-2 gap-2">
              {pricePresets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => handlePresetSelect(preset.value)}
                  className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                    isPresetActive(preset.value)
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-amber-500 hover:text-amber-600'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Custom Price Inputs (Alternative to RangeSlider inputs) */}
        {showInputs && (
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <Input
                  type="number"
                  value={localValue[0]}
                  onChange={(e) => {
                    const newMin = Math.max(minPrice, Math.min(Number(e.target.value), localValue[1] - step));
                    handleRangeChange([newMin, localValue[1]]);
                  }}
                  label="Min Price"
                  prefixIcon={<span className="text-gray-500">{currency}</span>}
                  min={minPrice}
                  max={localValue[1] - step}
                />
              </div>
              
              <div className="flex items-center justify-center pb-2">
                <span className="text-gray-400">-</span>
              </div>
              
              <div className="flex-1">
                <Input
                  type="number"
                  value={localValue[1]}
                  onChange={(e) => {
                    const newMax = Math.min(maxPrice, Math.max(Number(e.target.value), localValue[0] + step));
                    handleRangeChange([localValue[0], newMax]);
                  }}
                  label="Max Price"
                  prefixIcon={<span className="text-gray-500">{currency}</span>}
                  min={localValue[0] + step}
                  max={maxPrice}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceRange;