import React, { useState } from 'react';

const ProductImages = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">No Image Available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Large Image */}
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={images[selectedImage]}
          alt={productName}
          className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              className={`aspect-square overflow-hidden rounded-lg bg-gray-100 border-2 transition-all duration-200 ${
                selectedImage === index 
                  ? 'border-primary-600 ring-2 ring-primary-600 ring-opacity-50' 
                  : 'border-transparent hover:border-gray-300'
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image}
                alt={`${productName} - View ${index + 1}`}
                className="h-full w-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImages;