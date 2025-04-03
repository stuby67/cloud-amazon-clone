import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Get to Know Us</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-gray-300">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-gray-300">Careers</Link></li>
              <li><Link to="/press" className="hover:text-gray-300">Press Releases</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Make Money with Us</h3>
            <ul className="space-y-2">
              <li><Link to="/sell" className="hover:text-gray-300">Sell products</Link></li>
              <li><Link to="/affiliate" className="hover:text-gray-300">Become an Affiliate</Link></li>
              <li><Link to="/advertise" className="hover:text-gray-300">Advertise Your Products</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Products</h3>
            <ul className="space-y-2">
              <li><Link to="/cards" className="hover:text-gray-300">Amazon Cards</Link></li>
              <li><Link to="/shop" className="hover:text-gray-300">Shop with Points</Link></li>
              <li><Link to="/reload" className="hover:text-gray-300">Reload Your Balance</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Let Us Help You</h3>
            <ul className="space-y-2">
              <li><Link to="/account" className="hover:text-gray-300">Your Account</Link></li>
              <li><Link to="/orders" className="hover:text-gray-300">Your Orders</Link></li>
              <li><Link to="/help" className="hover:text-gray-300">Help Center</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; 2025 AmazonClone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}