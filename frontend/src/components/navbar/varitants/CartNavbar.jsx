import React from 'react';
import Navbar from '../Navbar';


const CartNavbar = ({ cartItemsCount = 0, ...props }) => {
  return (
    <Navbar
      bannerConfig={{
        showBanner: false
      }}
      secondaryBannerConfig={{
        showSecondaryBanner: false
      }}
      navConfig={{
        logo: { 
          text: "THE BEAN HOUSE", 
          link: "/" 
        },
        navItems: [
          { name: 'HOME', path: '/' },
          { name: 'CONTINUE SHOPPING', path: '/collections' }
        ],
        showSearch: false,
        showUserAccount: true,
        showCart: true,
        cartItemsCount: cartItemsCount
      }}
      customContent={{
        centerContent: (
          <h1 className="text-xl font-bold text-gray-900">SHOPPING CART</h1>
        )
      }}
      className="border-b"
      {...props}
    />
  );
};

export default CartNavbar;