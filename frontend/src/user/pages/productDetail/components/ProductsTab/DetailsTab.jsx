import React from 'react';

const DetailsTab = ({ product }) => {
  const {
    specifications,
    sku,
    category,
    tags,
    features
  } = product;

  return (
    <div className="space-y-8">
      {/* Specifications */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Product Specifications</h3>
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          <table className="w-full">
            <tbody className="divide-y divide-gray-200">
              {Object.entries(specifications).map(([key, value], index) => (
                <tr key={key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap border-r border-gray-200">
                    {key}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Technical Details */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Technical Details</h4>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">SKU</span>
              <span className="text-sm font-medium text-gray-900">{sku}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">Category</span>
              <span className="text-sm font-medium text-gray-900">{category}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">Material</span>
              <span className="text-sm font-medium text-gray-900">{specifications.Material}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-sm text-gray-600">Fit</span>
              <span className="text-sm font-medium text-gray-900">{specifications.Fit}</span>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">All Features</h4>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Product Tags</h4>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Size & Fit Guide */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="font-semibold text-blue-900 mb-3">Size & Fit Guide</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="font-medium text-blue-900 mb-1">XS</div>
            <div className="text-blue-700">32-34" Chest</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-blue-900 mb-1">S</div>
            <div className="text-blue-700">34-36" Chest</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-blue-900 mb-1">M</div>
            <div className="text-blue-700">36-38" Chest</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-blue-900 mb-1">L</div>
            <div className="text-blue-700">38-40" Chest</div>
          </div>
        </div>
        <p className="text-xs text-blue-600 mt-3 text-center">
          Need help with sizing? <button className="font-medium underline">Contact our support team</button>
        </p>
      </div>
    </div>
  );
};

export default DetailsTab;