import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Arabica Blend",
      price: "$24.99",
      image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Ethiopian Roast",
      price: "$26.99",
      image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Colombian Supreme",
      price: "$22.99",
      image: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      name: "Brazilian Dark Roast",
      price: "$21.99",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-900 to-amber-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            FRESH COFFEE DROPS
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Discover our exclusive new collection starting November 27th
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/collections"
              className="bg-white text-amber-900 px-8 py-3 rounded-full font-semibold hover:bg-amber-100 transition-colors"
            >
              SHOP COLLECTIONS
            </Link>
            <Link
              to="/new-drops"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-amber-900 transition-colors"
            >
              VIEW NEW DROPS
            </Link>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="bg-black text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">COMING SOON</h2>
          <div className="flex justify-center space-x-4 text-2xl font-mono">
            <div className="text-center">
              <div className="text-4xl font-bold">05</div>
              <div className="text-sm">DAYS</div>
            </div>
            <div className="text-4xl">:</div>
            <div className="text-center">
              <div className="text-4xl font-bold">12</div>
              <div className="text-sm">HOURS</div>
            </div>
            <div className="text-4xl">:</div>
            <div className="text-center">
              <div className="text-4xl font-bold">45</div>
              <div className="text-sm">MINUTES</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">FEATURED COLLECTIONS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-amber-900 font-bold">{product.price}</p>
                  <button className="w-full mt-4 bg-amber-900 text-white py-2 rounded hover:bg-amber-800 transition-colors">
                    ADD TO WISHLIST
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">JOIN THE BEAN HOUSE REWARDS</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Earn points with every purchase and get exclusive access to new drops before anyone else.
          </p>
          <Link
            to="/rewards"
            className="bg-white text-amber-900 px-8 py-3 rounded-full font-semibold hover:bg-amber-100 transition-colors inline-block"
          >
            LEARN ABOUT REWARDS
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;