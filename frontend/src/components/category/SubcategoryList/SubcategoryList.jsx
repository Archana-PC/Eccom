import React, { useState } from 'react';
import SubcategoryItem from './SubcategoryItem';
import Button from '../../ui/Button/Button';

const SubcategoryList = ({ 
  subcategories = [], 
  parentPath,
  maxVisible = 4,
  onSubcategoryClick,
  className = ''
}) => {
  const [showAll, setShowAll] = useState(false);
  
  const visibleSubcategories = showAll 
    ? subcategories 
    : subcategories.slice(0, maxVisible);
  
  const hasMore = subcategories.length > maxVisible;

  return (
    <div className={`ml-4 space-y-1 ${className}`}>
      {visibleSubcategories.map((subcategory) => (
        <SubcategoryItem
          key={subcategory}
          subcategory={subcategory}
          parentPath={parentPath}
          onClick={onSubcategoryClick}
        />
      ))}
      
      {hasMore && !showAll && (
        <Button
          variant="ghost"
          size="small"
          onClick={() => setShowAll(true)}
          className="ml-3 text-xs text-primary-600 hover:text-primary-700"
        >
          +{subcategories.length - maxVisible} more
        </Button>
      )}
      
      {showAll && hasMore && (
        <Button
          variant="ghost"
          size="small"
          onClick={() => setShowAll(false)}
          className="ml-3 text-xs text-neutral-600 hover:text-neutral-700"
        >
          Show less
        </Button>
      )}
    </div>
  );
};

export default SubcategoryList;