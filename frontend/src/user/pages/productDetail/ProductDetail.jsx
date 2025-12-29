import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageGallery from './components/ProductImages/ImageGallery';
import ProductImages from './components/ProductImages/ProductImages';
import ProductInfo from './components/ProductInfo/ProductInfo';
import ProductTabs from './components/ProductsTab/ProductTabs';
import RelatedProducts from './components/RelatedProducts/RelatedProducts';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [useAdvancedGallery, setUseAdvancedGallery] = useState(false);

  // Mock product data - replace with actual API call
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockProduct = {
          id: productId,
          name: "Premium Cotton T-Shirt",
          brand: "Nike",
          price: 29.99,
          originalPrice: 39.99,
          discount: 25,
          description: "A premium quality cotton t-shirt perfect for everyday wear. Features comfortable fit and durable fabric that maintains its shape wash after wash. Ideal for casual outings, workouts, or layering under jackets.",
          images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=800&fit=crop"
          ],
          sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
          colors: [
            { name: 'Black', value: '#000000' },
            { name: 'White', value: '#FFFFFF' },
            { name: 'Navy Blue', value: '#000080' },
            { name: 'Gray', value: '#808080' }
          ],
          inStock: true,
          stockQuantity: 15,
          sku: "NK-TS-001",
          category: "Men's T-Shirts",
          tags: ["cotton", "casual", "summer", "fashion"],
          features: [
            "100% Premium Cotton",
            "Machine Washable",
            "Regular Fit",
            "Pre-shrunk Fabric",
            "Breathable Material",
            "Color Fast"
          ],
          specifications: {
            "Material": "100% Cotton",
            "Fit": "Regular",
            "Style": "Casual",
            "Neck": "Round Neck",
            "Sleeve": "Short Sleeve",
            "Care": "Machine Wash Cold",
            "Origin": "Imported"
          },
          reviews: {
            average: 4.5,
            count: 128,
            ratings: [
              { stars: 5, count: 80 },
              { stars: 4, count: 32 },
              { stars: 3, count: 12 },
              { stars: 2, count: 3 },
              { stars: 1, count: 1 }
            ],
            featured: [
              {
                id: 1,
                user: "John D.",
                rating: 5,
                date: "2024-01-15",
                comment: "Perfect fit and very comfortable. The fabric quality is excellent for the price.",
                verified: true
              },
              {
                id: 2,
                user: "Sarah M.",
                rating: 4,
                date: "2024-01-10",
                comment: "Great t-shirt! True to size and holds up well after multiple washes.",
                verified: true
              }
            ]
          },
          shipping: {
            freeShipping: true,
            minOrder: 50,
            deliveryTime: "2-5 business days",
            returns: "30 days return policy"
          }
        };
        setProduct(mockProduct);
        setSelectedSize(mockProduct.sizes[2]); // Default to Medium
        setSelectedColor(mockProduct.colors[0]);
        setLoading(false);
      }, 800);
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    // Add to cart logic here
    const cartItem = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      image: product.images[0],
      sku: product.sku
    };
    
    console.log('Added to cart:', cartItem);
    
    // Show success message or trigger cart update
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  const handleAddToWishlist = () => {
    // Add to wishlist logic here
    const wishlistItem = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.images[0],
      inStock: product.inStock
    };
    
    console.log('Added to wishlist:', wishlistItem);
    alert(`Added ${product.name} to wishlist!`);
  };

  const toggleGalleryView = () => {
    setUseAdvancedGallery(!useAdvancedGallery);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          {/* <Breadcrumb 
            productName={product.name}
            category={product.category}
          /> */}
        </div>

        {/* Gallery Toggle Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleGalleryView}
            className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span>{useAdvancedGallery ? 'Simple View' : 'Advanced View'}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            {useAdvancedGallery ? (
              <ImageGallery
                images={product.images} 
                productName={product.name} 
              />
            ) : (
              <ProductImages 
                images={product.images} 
                productName={product.name} 
              />
            )}
            
            {/* Gallery Info */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>{product.images.length} images available</span>
                <button 
                  onClick={toggleGalleryView}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Switch to {useAdvancedGallery ? 'simple' : 'advanced'} view
                </button>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <ProductInfo
              product={product}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              quantity={quantity}
              setQuantity={setQuantity}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
            />
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mb-16">
          <ProductTabs product={product} />
        </div>

        {/* Related Products */}
        <div>
          <RelatedProducts
            currentProductId={product.id} 
            category={product.category} 
            brand={product.brand}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;