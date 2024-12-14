import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ user, onLogout, cartItemCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className='fixed w-full z-50'>
      <div className="menu_container w-full flex flex-wrap justify-between px-4 md:px-40 py-7 bg-blue-400 items-center">
        <h4 className="logo text-3xl font-bold">Kanteen</h4>
        
        {/* Hamburger Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Menu Items */}
        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:items-center`}>
          <ul className="menu_buttons flex flex-col md:flex-row gap-4 md:gap-7 cursor-pointer mt-4 md:mt-0">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            {user && (
              <>
                <li><Link to="/menu" className="hover:text-white">Menu</Link></li>
                <li><Link to="/cart" className="hover:text-white">Cart {cartItemCount > 0 && `(${cartItemCount})`}</Link></li>
                <li><Link to="/orders" className="hover:text-white">Orders</Link></li>
                <li><Link to="/profile" className="hover:text-white">Profile</Link></li>
                <li><Link to="/OrderTracking" className="hover:text-white">Track Order</Link></li>
              </>
            )}
          </ul>
        </div>

        {user ? (
          <div className="hidden md:flex items-center gap-4">
            <span className="text-white">Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white rounded-md hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-4">
            <Link to="/signin">
              <button className="px-4 py-2 bg-white rounded-md hover:bg-gray-100">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar;
