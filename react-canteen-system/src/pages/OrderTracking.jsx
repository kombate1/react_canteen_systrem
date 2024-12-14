import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderStatus from '../Components/OrderStatus';

const OrderTracking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [totalPrepTime, setTotalPrepTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrderData = async (userId) => {
    try {
      // Fetch active order
      const activeResponse = await fetch(`http://localhost:3001/api/orders/active/${userId}`);
      const activeData = await activeResponse.json();
      
      if (activeResponse.ok && activeData.order) {
        setOrder(activeData.order);
        calculateTotalPrepTime(activeData.order.items);
      } else {
        setOrder(null);
      }

      // Fetch order history
      const historyResponse = await fetch(`http://localhost:3001/api/orders/history/${userId}`);
      const historyData = await historyResponse.json();
      
      if (historyResponse.ok) {
        setOrderHistory(historyData.orders);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch order details');
    } finally {
      setLoading(false);
    }
  };

  const handleOrderComplete = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      // Clear the completed order
      setOrder(null);
      // Fetch updated data
      await fetchOrderData(user.id);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        navigate('/signin');
        return;
      }

      if (location.state?.order) {
        // New order from cart
        setOrder(location.state.order);
        calculateTotalPrepTime(location.state.order.items);
        // Clear the location state
        navigate(location.pathname, { replace: true });
      } else {
        await fetchOrderData(user.id);
      }
    };

    fetchData();
  }, [location, navigate]);

  const calculateTotalPrepTime = async (items) => {
    try {
      const menuResponse = await fetch('http://localhost:3001/api/menu-items');
      const menuItems = await menuResponse.json();
      
      const total = items.reduce((sum, orderItem) => {
        const menuItem = menuItems.find(m => m.name === orderItem.name);
        if (menuItem) {
          return sum + (menuItem.prepTime * orderItem.quantity);
        }
        return sum;
      }, 0);
      
      const finalPrepTime = total > 0 ? total : 15;
      setTotalPrepTime(finalPrepTime);
      localStorage.setItem('orderPrepTime', finalPrepTime.toString());
    } catch (error) {
      console.error('Error calculating prep time:', error);
      setTotalPrepTime(15);
      localStorage.setItem('orderPrepTime', '15');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-4xl mx-auto p-4">
        {/* Active Order Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Order Tracking</h1>
          {order ? (
            <>
              <OrderStatus 
                status={order.status} 
                orderId={order.orderId} 
                estimatedTime={totalPrepTime}
                onOrderComplete={handleOrderComplete}
              />
              
              {/* Order Details */}
              <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Order Details</h2>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        {item.customizations && (
                          <div className="text-sm text-gray-500">
                            {item.customizations.required?.map((cust, idx) => (
                              <p key={`req-${idx}`}>
                                {cust.group}: {cust.choice}
                                {cust.price > 0 && ` (+GH₵${cust.price.toFixed(2)})`}
                              </p>
                            ))}
                            {item.customizations.optional?.map((cust, idx) => (
                              <p key={`opt-${idx}`}>
                                {cust.choice}
                                {cust.price > 0 && ` (+GH₵${cust.price.toFixed(2)})`}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="font-medium">GH₵{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>GH₵{order.total.toFixed(2)}</span>
                    </div>
                    {order.pointsEarned > 0 && (
                      <p className="text-green-600 text-sm mt-2">
                        Points Earned: {order.pointsEarned}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-600">No active order</p>
              <button
                onClick={() => navigate('/menu')}
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Place New Order
              </button>
            </div>
          )}
        </div>

        {/* Order History Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Order History</h2>
          {orderHistory.length > 0 ? (
            <div className="space-y-4">
              {orderHistory.map((historyOrder) => (
                <div 
                  key={historyOrder.orderId} 
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">Order #{historyOrder.orderId}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(historyOrder.timestamp).toLocaleDateString()} at{' '}
                        {new Date(historyOrder.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      historyOrder.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {historyOrder.status}
                    </span>
                  </div>
                  
                  {/* Order Items */}
                  <div className="space-y-2">
                    {historyOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.quantity}x {item.name}</span>
                        <span>GH₵{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Order Total */}
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>GH₵{historyOrder.total.toFixed(2)}</span>
                    </div>
                    {historyOrder.pointsEarned > 0 && (
                      <p className="text-green-600 text-sm mt-1">
                        Points Earned: {historyOrder.pointsEarned}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-600">No order history found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking; 