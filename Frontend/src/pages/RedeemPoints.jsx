import React from 'react';
import { Link } from 'react-router-dom';

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
                <button
                  className={`px-4 py-2 rounded-md ${
                    loyaltyPoints >= reward.points
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={loyaltyPoints < reward.points}
                >
                  Redeem
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RedeemPoints; 