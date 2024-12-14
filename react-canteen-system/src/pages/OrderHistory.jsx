import React, { useState, useEffect } from 'react';

const OrderHistory = ({ user }) => {
  const [activeOrders, setActiveOrders] = useState([]);
  const [previousOrders, setPreviousOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/orders/${user.id}`);
      const data = await response.json();
      
      if (response.ok) {
        // Separate active and completed orders
        const active = data.orders.filter(order => 
          ['Placed', 'Preparing', 'Ready'].includes(order.status)
        );
        const previous = data.orders.filter(order => 
          order.status === 'Completed' || order.status === 'Cancelled'
        );
        
        setActiveOrders(active);
        setPreviousOrders(previous);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      'Placed': 'bg-yellow-100 text-yellow-800',
      'Preparing': 'bg-blue-100 text-blue-800',
      'Ready': 'bg-green-100 text-green-800',
      'Completed': 'bg-gray-100 text-gray-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Active Orders Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Active Orders</h2>
          {activeOrders.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">No Active Orders</h3>
              <p className="text-gray-600">Your active orders will appear here once you place an order.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeOrders.map(order => (
                <div key={order._id} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium text-gray-800">Order #{order._id.slice(-6)}</h3>
                      <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium">GH₵{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-bold">GH₵{order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Previous Orders Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>
          {previousOrders.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <div className="text-6xl mb-4">📜</div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">No Previous Orders</h3>
              <p className="text-gray-600">Your order history will appear here after completing orders.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {previousOrders.map(order => (
                <div key={order._id} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium text-gray-800">Order #{order._id.slice(-6)}</h3>
                      <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium">GH₵{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between">
                      <span className="font-medium">Total</span>
                      <span className="font-bold">GH₵{order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default OrderHistory; 