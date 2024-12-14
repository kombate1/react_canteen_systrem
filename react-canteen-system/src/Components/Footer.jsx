import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-2">
              <p className="text-gray-300">Email: kanteen@acity.com</p>
              <p className="text-gray-300">Phone: 0505948237</p>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white hover:underline">Home</Link></li>
              <li><Link to="/menu" className="text-gray-300 hover:text-white hover:underline">Menu</Link></li>
              <li><Link to="/cart" className="text-gray-300 hover:text-white hover:underline">Cart</Link></li>
              <li><Link to="/order-tracking" className="text-gray-300 hover:text-white hover:underline">Track Order</Link></li>
            </ul>
          </div>

          {/* Hours Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Hours</h4>
            <div className="space-y-2">
              <p className="text-gray-300">Monday - Friday: 8:00 AM - 8:00 PM</p>
              <p className="text-gray-300">Saturday: 9:00 AM - 6:00 PM</p>
              <p className="text-gray-300">Sunday: Closed</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 Acity Canteen Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 