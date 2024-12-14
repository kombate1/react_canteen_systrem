import React from 'react';
import { useState } from 'react';
import Navbar from './Components/Navbar';

const Cart = () => {

  const [cart, setCart] = useState([
    { name: 'Chicken Wrap', price: 5.99, quantity: 1 },
    { name: 'Margherita Pizza', price: 8.99, quantity: 2 },
  ]);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);


  const handleQuantityChange = (index, increment) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += increment;
    if (updatedCart[index].quantity < 1) updatedCart[index].quantity = 1;
    setCart(updatedCart);
  };

  return (
    <div className="font-sans p-5">

        <Navbar/>

      {/* Menu Section */}
      <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-5 px-20">
        {[
          {
            name: 'Chicken Wrap',
            category: 'Wraps',
            price: 5.99,
            nutrition: '300 cal',
            toppings: ['Cheese', 'Lettuce'],
            img: 'https://via.placeholder.com/150',
          },
          {
            name: 'Margherita Pizza',
            category: 'Pizza',
            price: 8.99,
            nutrition: '450 cal',
            toppings: ['Extra Cheese', 'Olives'],
            img: 'https://via.placeholder.com/150',
          },
          {
            name: 'Beef Burger',
            category: 'Burgers',
            price: 7.49,
            nutrition: '550 cal',
            toppings: ['Bacon', 'Avocado'],
            img: 'https://via.placeholder.com/150',
          },
        ].map((item, index) => (
          <div key={index} className="border p-4 rounded-md">
            <img src={item.img} alt={item.name} className="w-full h-40 object-cover rounded-md mb-4" />
            <h2 className="font-bold text-lg">{item.name}</h2>
            <p className="text-sm text-gray-600">Category: {item.category}</p>
            <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)}</p>
            <p className="text-sm text-gray-600">Nutritional Info: {item.nutrition}</p>
            <div className="mt-3">
              <h3 className="font-semibold">Extra Toppings:</h3>
              {item.toppings.map((topping, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input type="checkbox" id={`topping-${index}-${idx}`} />
                  <label htmlFor={`topping-${index}-${idx}`} className="text-sm">{topping}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Cart Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 px-20">
        <div>
          <h2 className="text-xl font-bold mb-3">Your Cart</h2>
          <ul className="border p-4 rounded-md">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center mb-3">
                <span>{item.name}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(index, -1)}
                    className="px-2 py-1 bg-gray-200 rounded-md"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(index, 1)}
                    className="px-2 py-1 bg-gray-200 rounded-md"
                  >
                    +
                  </button>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-right font-semibold mt-4">Total: ${total.toFixed(2)}</div>
          <button className="mt-4 w-full px-4 py-2 bg-indigo-500 text-white rounded-md">Checkout</button>
        </div>

        {/* Additional Sections */}
        <div>
          <h2 className="text-xl font-bold mb-3">Order Tracking</h2>
          <div className="border p-4 rounded-md mb-5">
            <div className="relative w-full h-2 bg-gray-200 rounded-full">
              <div className="absolute top-0 left-0 h-2 bg-indigo-500 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span>Preparing</span>
              <span>Ready for Pickup</span>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-3">Loyalty Program</h2>
          <div className="border p-4 rounded-md">
            <p>Points Earned: 120</p>
            <p>Available Discounts: $5 off</p>
          </div>
        </div>
      </section>
    </div>
  );
};


export default Cart