import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Button from '../ui/Button/Button';

const CategorySidebar = ({ isOpen, onToggle }) => {
  const [navbarHeight, setNavbarHeight] = useState(80);

  useEffect(() => {
    const calculateNavbarHeight = () => {
      const navbar = document.querySelector('nav') || document.querySelector('[class*="nav"]');
      if (navbar) {
        const height = navbar.getBoundingClientRect().height;
        setNavbarHeight(height || 80);
      }
    };

    calculateNavbarHeight();
    window.addEventListener('resize', calculateNavbarHeight);
    const timeout = setTimeout(calculateNavbarHeight, 100);

    return () => {
      window.removeEventListener('resize', calculateNavbarHeight);
      clearTimeout(timeout);
    };
  }, []);

  const mensCategories = [
    {
      id: 'tops',
      name: 'Tops',
      icon: '👕',
      subcategories: ['T-Shirts', 'Polo Shirts', 'Casual Shirts', 'Formal Shirts', 'Hoodies', 'Sweaters']
    },
    {
      id: 'bottoms',
      name: 'Bottoms',
      icon: '👖',
      subcategories: ['Jeans', 'Casual Pants', 'Formal Trousers', 'Shorts', 'Joggers', 'Cargos']
    },
    {
      id: 'outerwear',
      name: 'Outerwear',
      icon: '🧥',
      subcategories: ['Jackets', 'Coats', 'Blazers', 'Bomber Jackets', 'Leather Jackets', 'Windbreakers']
    },
    {
      id: 'footwear',
      name: 'Footwear',
      icon: '👟',
      subcategories: ['Sneakers', 'Formal Shoes', 'Boots', 'Sandals', 'Loafers', 'Sports Shoes']
    },
    {
      id: 'accessories',
      name: 'Accessories',
      icon: '⌚',
      subcategories: ['Watches', 'Belts', 'Wallets', 'Sunglasses', 'Hats', 'Bags']
    },
    {
      id: 'activewear',
      name: 'Activewear',
      icon: '🏃',
      subcategories: ['Sports T-Shirts', 'Training Pants', 'Gym Shorts', 'Sports Jackets', 'Athletic Shoes']
    }
  ];

  const handleCategoryClick = (category, event) => {
    console.log('Category clicked:', category);
    // Navigate to category page
    window.location.href = `/men/${category.name.toLowerCase().replace(/\s+/g, '-')}`;
    onToggle(false);
  };

  const handleSubcategoryClick = (subcategory, event) => {
    console.log('Subcategory clicked:', subcategory);
    // Navigate to subcategory page
    window.location.href = `/men/${subcategory.toLowerCase().replace(/\s+/g, '-')}`;
    onToggle(false);
  };

  const sidebarContent = (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          style={{ top: navbarHeight + 'px' }}
          onClick={() => onToggle(false)}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed left-0 bg-white shadow-xl border-r border-neutral-200 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'w-80 opacity-100 z-50' : 'w-0 opacity-0 z-0'
        }`}
        style={{ 
          top: navbarHeight + 'px',
          height: `calc(100vh - ${navbarHeight}px)`,
          zIndex: isOpen ? 9999 : 0
        }}
        onMouseEnter={() => onToggle(true)}
        onMouseLeave={() => onToggle(false)}
      >
        <div className={`h-full flex flex-col ${isOpen ? 'block' : 'hidden'}`}>
          {/* Sidebar Header */}
          <div className="p-6 border-b border-neutral-100">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Men's Categories</h2>
            <p className="text-sm text-gray-600">Browse our complete collection</p>
          </div>

          {/* Categories List */}
          <div className="flex-1 overflow-y-auto py-4">
            {mensCategories.map((category) => (
              <div key={category.id} className="mb-2">
                {/* Main Category */}
                <button
                  onClick={(e) => handleCategoryClick(category, e)}
                  className="w-full flex items-center justify-between px-6 py-3 text-left hover:bg-gray-50 transition-colors duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{category.icon}</span>
                    <span className="font-medium text-gray-900 group-hover:text-primary-600">
                      {category.name}
                    </span>
                  </div>
                  <svg 
                    className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Subcategories */}
                <div className="ml-6 pl-6 border-l border-gray-100">
                  {category.subcategories.map((subcategory) => (
                    <button
                      key={subcategory}
                      onClick={(e) => handleSubcategoryClick(subcategory, e)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-all duration-200"
                    >
                      {subcategory}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-neutral-100">
            <Button
              variant="primary"
              size="medium"
              fullWidth
              onClick={() => {
                window.location.href = '/men';
                onToggle(false);
              }}
            >
              Shop All Men's
            </Button>
          </div>
        </div>
      </div>
    </>
  );

  // Portal management
  let portalRoot = document.getElementById('category-sidebar-portal');
  
  if (!portalRoot) {
    portalRoot = document.createElement('div');
    portalRoot.id = 'category-sidebar-portal';
    portalRoot.style.position = 'fixed';
    portalRoot.style.top = '0';
    portalRoot.style.left = '0';
    portalRoot.style.zIndex = '9999';
    portalRoot.style.pointerEvents = 'none';
    document.body.appendChild(portalRoot);
  }

  if (portalRoot) {
    portalRoot.style.pointerEvents = isOpen ? 'auto' : 'none';
  }

  return ReactDOM.createPortal(sidebarContent, portalRoot);
};

export default CategorySidebar;