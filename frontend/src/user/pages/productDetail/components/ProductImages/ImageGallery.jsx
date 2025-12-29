import React, { useState } from 'react';

const ImageGallery = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">No Image Available</span>
      </div>
    );
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setIsZoomed(false);
  };

  // SVG Icons as components
  const CloseIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  const LeftArrowIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );

  const RightArrowIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  const ZoomIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
    </svg>
  );

  const CheckIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );

  // Fullscreen Gallery Component
  const FullscreenGallery = () => (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={closeFullscreen}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
      >
        <CloseIcon />
      </button>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-3"
          >
            <LeftArrowIcon />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-3"
          >
            <RightArrowIcon />
          </button>
        </>
      )}

      {/* Main Fullscreen Image */}
      <div className="relative max-w-4xl max-h-full mx-4">
        <img
          src={images[selectedImage]}
          alt={productName}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`w-16 h-16 overflow-hidden rounded border-2 transition-all ${
                selectedImage === index 
                  ? 'border-white' 
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image}
                alt={`${productName} - View ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
        {selectedImage + 1} / {images.length}
      </div>
    </div>
  );

  return (
    <>
      <div className="space-y-4 relative">
        {/* Main Image with Zoom and Fullscreen Controls */}
        <div 
          className="aspect-square overflow-hidden rounded-lg bg-gray-100 relative group cursor-zoom-in"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onClick={openFullscreen}
        >
          <img
            src={images[selectedImage]}
            alt={productName}
            className={`h-full w-full object-cover object-center transition-transform duration-500 ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
          />
          
          {/* Zoom Indicator */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="bg-black bg-opacity-50 text-white p-2 rounded-full">
              <ZoomIcon />
            </div>
          </div>

          {/* Navigation Arrows for Main View */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
              >
                <LeftArrowIcon />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
              >
                <RightArrowIcon />
              </button>
            </>
          )}
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
                {selectedImage === index && (
                  <div className="absolute inset-0 bg-primary-600 bg-opacity-20 flex items-center justify-center">
                    <div className="bg-primary-600 rounded-full p-1">
                      <CheckIcon />
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="text-center text-sm text-gray-500">
            Image {selectedImage + 1} of {images.length}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && <FullscreenGallery />}
    </>
  );
};

export default ImageGallery;