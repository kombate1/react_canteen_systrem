import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CustomizationModal } from '../Menu';

const CartPage = ({ 
  cartItems, 
  onUpdateQuantity, 
  onDelete, 
  onEdit, 
  onUpdateCartItem,
  editingCartItem,
  setEditingCartItem,
  calculateTotal,
  loyaltyPoints,
  onApplyPoints,
  user,
  clearCart 
}) => {
  const navigate = useNavigate();
  const [appliedPoints, setAppliedPoints] = useState(0);
  const [pointsToApply, setPointsToApply] = useState('');
  const [error, setError] = useState('');

  // Memoize the discounted total calculation
  const discountedTotal = useMemo(() => {
    const originalTotal = calculateTotal();
    const discount = appliedPoints * 0.01; // Each point is worth GH₵0.01
    return Math.max(originalTotal - discount, 0);
  }, [cartItems, appliedPoints, calculateTotal]);

  // Log state changes for debugging
  useEffect(() => {
    console.log('Applied Points:', appliedPoints);
    console.log('Points to Apply:', pointsToApply);
  }, [appliedPoints, pointsToApply]);

  // Handle applying points
  const handleApplyPoints = useCallback(async () => {
    setError('');
    const points = parseInt(pointsToApply);
    
    if (isNaN(points) || points <= 0) {
      setError('Please enter a valid number of points');
      return;
    }

    if (points > loyaltyPoints) {
      setError('You don\'t have enough points');
      return;
    }

    const maxPointsAllowed = Math.floor(calculateTotal() * 100);
    if (points > maxPointsAllowed) {
      setError(`You can only apply up to ${maxPointsAllowed} points to this order`);
      return;
    }

    try {
      const response = await fetch('https://react-canteen-systrem.onrender.com/api/user/points/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          pointsChange: points,
          action: 'redeemed'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to apply points');
      }

      const data = await response.json(); // Get updated points from response
      setAppliedPoints(points);
      setPointsToApply('');
      onApplyPoints(points); // Notify parent component

      // Update local storage with the new loyalty points
      const updatedLoyaltyPoints = loyaltyPoints - points;
      localStorage.setItem('loyaltyPoints', JSON.stringify(updatedLoyaltyPoints)); // Persist to localStorage

    } catch (error) {
      console.error('Error applying points:', error);
      setError('Failed to apply points. Please try again.');
    }
  }, [pointsToApply, loyaltyPoints, user, onApplyPoints, calculateTotal]);

  const handleRemovePoints = async () => {
    if (appliedPoints <= 0) return;

    try {
      const response = await fetch('https://react-canteen-systrem.onrender.com/api/user/points/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          pointsChange: appliedPoints,
          action: 'earned'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove points');
      }

      setAppliedPoints(0);
      setPointsToApply('');
      if (onApplyPoints) {
        onApplyPoints(0);
      }

      // Save updated loyaltyPoints to localStorage
      const updatedLoyaltyPoints = loyaltyPoints; // Assuming points are returned to the user
      localStorage.setItem('loyaltyPoints', JSON.stringify(updatedLoyaltyPoints));

    } catch (error) {
      console.error('Error removing points:', error);
      setError('Failed to remove points. Please try again.');
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    try {
      const pointsEarned = Math.floor(discountedTotal * 10);

      const orderData = {
        userId: user.id,
        items: cartItems,
        total: discountedTotal,
        originalTotal: calculateTotal(),
        pointsEarned,
        pointsUsed: appliedPoints,
        status: 'Placed'
      };

      const response = await fetch('https://react-canteen-systrem.onrender.com/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const { order } = await response.json();
      clearCart();
      navigate('/OrderTracking', { state: { order } });
    } catch (error) {
      console.error('Error during checkout:', error);
      setError('Failed to process checkout. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-4xl mx-auto p-4">
        {/* Points Summary Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Your Loyalty Points</h1>
              <p className="text-gray-600">Use your points to redeem rewards</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">{loyaltyPoints - appliedPoints}</p>
              <p className="text-gray-600">Available Points</p>
            </div>
          </div>
        </div>

        {/* Cart Content */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            <Link to="/menu" className="text-blue-500 hover:text-blue-700">
              Continue Shopping
            </Link>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Link
                to="/menu"
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md">
              {/* Cart Items */}
              {cartItems.map((item, index) => (
                <div key={index} className="border-b last:border-b-0 p-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-bold">{item.name}</h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => onEdit(index)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <span className="material-icons">edit</span>
                          </button>
                          <button
                            onClick={() => onDelete(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <span className="material-icons">delete</span>
                          </button>
                        </div>
                      </div>

                      {/* Customizations */}
                      {item.customizations.required?.map((customization, idx) => (
                        <p key={`req-${idx}`} className="text-sm text-gray-500">
                          {customization.group}: {customization.choice}
                          {customization.price > 0 && ` (+GH₵${customization.price.toFixed(2)})`}
                        </p>
                      ))}
                      {item.customizations.optional?.map((customization, idx) => (
                        <p key={`opt-${idx}`} className="text-sm text-gray-500">
                          {customization.choice}
                          {customization.price > 0 && ` (+GH₵${customization.price.toFixed(2)})`}
                        </p>
                      ))}

                      <div className="mt-2 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                            className="bg-gray-200 text-gray-700 rounded-md px-3 py-1"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                            className="bg-gray-200 text-gray-700 rounded-md px-3 py-1"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-bold">
                          GH₵{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Loyalty Points Section */}
              <div className="bg-white rounded-lg shadow-md p-4 mt-4">
                <div className="flex flex-col space-y-4">
                  <div>
                    <h3 className="font-bold">Your Loyalty Points: {loyaltyPoints - appliedPoints}</h3>
                    <p className="text-sm text-gray-600">
                      {appliedPoints > 0 
                        ? `Applied ${appliedPoints} points (-GH₵${(appliedPoints * 0.01).toFixed(2)})`
                        : `You can use your points for a discount (100 points = GH₵1.00)`
                      }
                    </p>
                  </div>
                  
                  {error && (
                    <div className="text-red-500 text-sm">
                      {error}
                    </div>
                  )}
                  
                  {appliedPoints === 0 && (
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => {
                          const maxPoints = Math.min(
                            loyaltyPoints,
                            Math.floor(calculateTotal() * 100)
                          );
                          setPointsToApply(maxPoints.toString());
                        }}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                        disabled={loyaltyPoints === 0}
                      >
                        Use Maximum Available Points ({Math.min(
                          loyaltyPoints,
                          Math.floor(calculateTotal() * 100)
                        )} points)
                      </button>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={pointsToApply}
                          onChange={(e) => {
                            setError('');
                            setPointsToApply(e.target.value);
                          }}
                          placeholder="Enter points to use"
                          className="p-2 border rounded-md flex-1"
                          min="0"
                          max={Math.min(loyaltyPoints, Math.floor(calculateTotal() * 100))}
                        />
                        <button
                          onClick={handleApplyPoints}
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={!pointsToApply || loyaltyPoints === 0}
                        >
                          Apply Points
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {appliedPoints > 0 && (
                    <button
                      onClick={handleRemovePoints}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove Applied Points
                    </button>
                  )}
                </div>
              </div>

              {/* Total Section */}
              <div className="p-4 border-t">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>GH₵{calculateTotal().toFixed(2)}</span>
                  </div>
                  {appliedPoints > 0 && (
                    <div className="flex justify-between items-center text-green-600">
                      <span>Points Discount:</span>
                      <span>-GH₵{(appliedPoints * 0.01).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total:</span>
                    <span>GH₵{discountedTotal.toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-green-600">
                    You'll earn {Math.floor(discountedTotal * 10)} points with this purchase
                  </div>
                </div>
                <button
                  className="w-full mt-4 bg-green-500 text-white py-3 rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}

          {editingCartItem && (
            <CustomizationModal
              item={editingCartItem.item}
              onClose={() => setEditingCartItem(null)}
              onConfirm={handleConfirmEdit}
              initialCustomizations={editingCartItem.item.customizations}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage; 