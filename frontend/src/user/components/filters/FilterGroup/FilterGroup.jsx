import React from 'react';
import CheckboxFilter from '../filter-components/CheckboxFilter/CheckboxFilter';
import PriceRange from '../filter-components/PriceRange/PriceRange';

const FilterGroup = ({ 
  type,
  title,
  options = [],
  selectedValues = [],
  onSelectionChange,
  priceConfig = {},
  className = ""
}) => {
  
  // Handle different filter types
  switch (type) {
    case 'price':
      return (
        <div className={className}>
          <PriceRange
            title={title}
            minPrice={priceConfig.min || 0}
            maxPrice={priceConfig.max || 1000}
            step={priceConfig.step || 10}
            value={selectedValues.length > 0 ? selectedValues[0] : [priceConfig.min || 0, priceConfig.max || 1000]}
            onChange={(range) => onSelectionChange([range])}
            currency={priceConfig.currency || '$'}
            showInputs={true}
            showPresets={true}
          />
        </div>
      );
      
    case 'color':
      return (
        <div className={className}>
          <CheckboxFilter
            title={title}
            options={options}
            selectedValues={selectedValues}
            onChange={onSelectionChange}
            type="color"
            maxVisible={8}
            showSearch={true}
          />
        </div>
      );
      
    case 'brand':
      return (
        <div className={className}>
          <CheckboxFilter
            title={title}
            options={options}
            selectedValues={selectedValues}
            onChange={onSelectionChange}
            type="brand"
            maxVisible={6}
            showSearch={true}
          />
        </div>
      );
      
    case 'size':
    case 'material':
    case 'fit':
    case 'type':
    case 'width':
    default:
      return (
        <div className={className}>
          <CheckboxFilter
            title={title}
            options={options}
            selectedValues={selectedValues}
            onChange={onSelectionChange}
            type="default"
            maxVisible={5}
            showSearch={options.length > 8}
          />
        </div>
      );
  }
};

export default FilterGroup;