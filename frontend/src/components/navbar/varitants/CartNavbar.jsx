import React from 'react';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import Navbar from '../Navbar';


const CartNavbar = ({ cartItemsCount, ...props }) => {
  const { getCartItemsCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const actualCartCount = cartItemsCount !== undefined ? cartItemsCount : getCartItemsCount();
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
        cartItemsCount: actualCartCount,
        showWishlist: true,
        wishlistItemsCount: getWishlistCount()
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