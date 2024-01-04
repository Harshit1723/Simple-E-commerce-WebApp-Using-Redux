// Navigation.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Navigation = ({ token }) => {
  const location = useLocation();
  const items = useSelector((state) => state.cart.items);
  return (
    
    <nav className="flex bg-black justify-center  pr-4">
    {token && location.pathname !== '/cart' && (
      <Link to="/cart" className="border border-violet-600 rounded-2xl p-3 font-bold text-2xl mt-2 px-11 text-black bg-gradient-to-r  from-yellow-200 to-orange-200">
        Cart : {items.reduce((total, item) => total + item.quantity, 0)}
   
      </Link>
    )}
  </nav>

  );
};

export default Navigation;
