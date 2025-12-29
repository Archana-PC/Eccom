import React, { useState } from 'react';
import DescriptionTab from './DescriptionTab';
import DetailsTab from './DetailsTab';
import ReviewsTab from './ReviewsTab';

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', name: 'Description', icon: '📝' },
    { id: 'details', name: 'Product Details', icon: '🔍' },
    { id: 'reviews', name: `Reviews (${product.reviews.count})`, icon: '⭐' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return <DescriptionTab product={product} />;
      case 'details':
        return <DetailsTab product={product} />;
      case 'reviews':
        return <ReviewsTab product={product} />;
      default:
        return <DescriptionTab product={product} />;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Tab Headers */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center py-4 px-6 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600 bg-primary-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2 text-lg">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductTabs;