import React from 'react';
import food from './images/food-bg2.jpeg';
import { Link } from 'react-router-dom';

// Define the RedeemPoints component outside of Home
const RedeemPoints = ({ loyaltyPoints }) => {
  const rewards = [
    { 
      id: 1, 
      name: '$5 Off Your Next Order',
      points: 500,
      description: 'Get $5 off on your next purchase',
      image: '🎫'
    },
    { 
      id: 2, 
      name: 'Free Drink',
      points: 800,
      description: 'Get any drink for free with your meal',
      image: '🥤'
    },
    { 
      id: 3, 
      name: 'Free Side Dish',
      points: 1000,
      description: 'Choose any side dish for free',
      image: '🍟'
    },
    { 
      id: 4, 
      name: '$15 Off Your Next Order',
      points: 1500,
      description: 'Get $15 off on your next purchase',
      image: '🎁'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Your Loyalty Points</h1>
              <p className="text-gray-600">Use your points to redeem rewards</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">{loyaltyPoints}</p>
              <p className="text-gray-600">Available Points</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rewards.map(reward => (
            <div key={reward.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-4xl mb-4 block">{reward.image}</span>
                  <h3 className="text-xl font-bold">{reward.name}</h3>
                  <p className="text-gray-600 mt-2">{reward.description}</p>
                  <p className="text-blue-600 font-bold mt-2">{reward.points} points</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Home = ({ user }) => {
  // Featured items data
  const featuredItems = [
    {
      id: 1,
      name: "Signature Burger",
      description: "Juicy beef patty with special sauce and fresh vegetables",
      price: "GH₵8.99",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format",
      tag: "Bestseller"
    },
    {
      id: 2,
      name: "Fresh Garden Salad",
      description: "Mixed greens with seasonal vegetables and house dressing",
      price: "GH₵6.99",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format",
      tag: "Healthy Choice"
    },
    {
      id: 3,
      name: "Classic Pizza",
      description: "Hand-tossed pizza with premium toppings",
      price: "GH₵12.99",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format",
      tag: "Popular"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      comment: "The best campus food I've ever had! Fresh ingredients and amazing service.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 2,
      name: "John D.",
      comment: "Quick service and delicious food. The loyalty program is a great bonus!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      id: 3,
      name: "Emily R.",
      comment: "Love the variety of healthy options. Perfect for busy students!",
      rating: 4,
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    }
  ];

  return (
    <div>
      <div className="font-sans">
        {/* Hero Section */}
        <section className="relative bg-gray-800 text-white py-15 h-auto">
          <img
            src={food}
            alt="Hero Background"
            className="w-full h-96 object-cover opacity-60"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Kanteen</h1>
            <p className="text-xl mb-6">Delicious food at your fingertips</p>
            {!user && (
              <Link to="/signup">
                <button className="px-8 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                  Get Started
                </button>
              </Link>
            )}
          </div>
        </section>

        {/* Featured Items Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative">
                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover"/>
                    <span className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                      {item.tag}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-indigo-600">{item.price}</span>
                      <Link to={user ? "/menu" : "/signin"}>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
                          Order Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">About Kanteen</h2>
                <p className="text-gray-600 mb-4">
                  Welcome to Kanteen, your premier campus dining destination. We're committed to serving fresh, delicious meals that fuel your academic journey.
                </p>
                <p className="text-gray-600 mb-6">
                  Our mission is to provide high-quality, nutritious food options that cater to diverse dietary preferences and restrictions, all while ensuring a seamless ordering experience.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-white rounded-lg shadow">
                    <h4 className="text-2xl font-bold text-indigo-600">1000+</h4>
                    <p className="text-sm text-gray-600">Daily Orders</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow">
                    <h4 className="text-2xl font-bold text-indigo-600">50+</h4>
                    <p className="text-sm text-gray-600">Menu Items</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow">
                    <h4 className="text-2xl font-bold text-indigo-600">4.8</h4>
                    <p className="text-sm text-gray-600">Rating</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=500&auto=format" 
                  alt="Our Kitchen" 
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-6 -left-6 bg-indigo-600 text-white p-6 rounded-lg">
                  <p className="text-lg font-bold">Quality Food</p>
                  <p className="text-sm">Made with ❤️</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map(testimonial => (
                <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <div className="flex text-yellow-400">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">{testimonial.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-gray-100 py-16">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
            {[ 
              { icon: "🍽️", text: 'Choose your meal' },
              { icon: "✨", text: 'Customize your meal' },
              { icon: "🛒", text: 'Add to cart' },
              { icon: "📍", text: 'Track your order' },
            ].map((item, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-lg shadow-md">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <p className="text-lg font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;