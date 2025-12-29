import React from "react";

const RenderResponsiveImage = ({ imageProps, index }) => {
  // If it's an object with mobile and desktop properties
  if (typeof imageProps === 'object' && (imageProps.mobile || imageProps.desktop)) {
    return (
      <picture>
        {/* Mobile image */}
        <source 
          media="(max-width: 768px)" 
          srcSet={imageProps.mobile || imageProps.desktop} 
        />
        {/* Desktop image */}
        <source 
          media="(min-width: 769px)" 
          srcSet={imageProps.desktop || imageProps.mobile} 
        />
        {/* Fallback image */}
        <img 
          src={imageProps.desktop || imageProps.mobile} 
          alt={`Slide ${index + 1}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </picture>
    );
  }
  
  // If it's a simple string (backward compatibility)
  return (
    <img 
      src={imageProps} 
      alt={`Slide ${index + 1}`}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  );
};

export default RenderResponsiveImage;