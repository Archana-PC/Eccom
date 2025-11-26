import React from 'react';

const DescriptionTab = ({ product }) => {
  const {
    description,
    features,
    specifications
  } = product;

  return (
    <div className="space-y-8">
      {/* Main Description */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Description</h3>
        <div className="prose prose-lg text-gray-700 leading-relaxed">
          <p className="text-lg">{description}</p>
        </div>
      </div>

      {/* Key Features */}
      {features && features.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Benefits Section */}
      <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Why You'll Love It</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Premium Quality</h4>
            <p className="text-sm text-gray-600">Crafted with the finest materials for lasting durability</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Perfect Fit</h4>
            <p className="text-sm text-gray-600">Designed for comfort and optimal fit for everyday wear</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Customer Favorite</h4>
            <p className="text-sm text-gray-600">Rated 4.5+ stars by thousands of satisfied customers</p>
          </div>
        </div>
      </div>

      {/* Care Instructions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Care Instructions</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h4 className="font-medium text-yellow-800 mb-1">Important Care Tips</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Machine wash cold with similar colors</li>
                <li>• Tumble dry low or hang to dry</li>
                <li>• Do not bleach</li>
                <li>• Iron on low heat if needed</li>
                <li>• Do not dry clean</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionTab;