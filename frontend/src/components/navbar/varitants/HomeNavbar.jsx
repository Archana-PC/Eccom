import React from 'react';
import Navbar from '../Navbar';


const HomeNavbar = (props) => {
  return (
    <Navbar
      navConfig={{
        logo: {
          text: "THE BEAN HOUSE",
          link: "/"
        },
        navItems: [
          { name: 'HOME', path: '/' },
          { name: 'NEW DROPS', path: '/new-drops' },
          { name: 'COLLECTIONS', path: '/collections' },
          { name: 'REWARDS', path: '/rewards' },
          { name: 'ABOUT', path: '/about' }
        ],
        showSearch: true,
        showUserAccount: true,
        showCart: true,
        cartItemsCount: 0
      }}
      {...props}
    />
  );
};

export default HomeNavbar;