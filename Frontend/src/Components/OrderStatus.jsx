import React, { useState, useEffect } from 'react';

const OrderStatus = ({ status: initialStatus, orderId, estimatedTime, onOrderComplete }) => {
  const stages = ['Placed', 'Preparing', 'Ready for Pickup', 'Completed'];
  const [status, setStatus] = useState(initialStatus);
  const [progress, setProgress] = useState(0);
  const [completedData, setCompletedData] = useState(null);
  const currentStageIndex = stages.indexOf(status);

  useEffect(() => {
    // Function to check order status
    const checkOrderStatus = async () => {
      try {
        const response = await fetch(
          `https://react-canteen-systrem.onrender.com/api/orders/${orderId}/check-status?prepTime=${estimatedTime}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status !== status) {
            setStatus(data.status);
            
            // If the order is completed, store completion data and notify parent
            if (data.status === 'Completed') {
              setCompletedData({
                completedAt: data.completedAt,
                pointsEarned: data.pointsEarned
              });
              localStorage.removeItem(`orderStartTime_${orderId}`);
              if (onOrderComplete) {
                // Wait a short moment to show completion state before refreshing
                setTimeout(() => {
                  onOrderComplete();
                }, 3000);
              }
            }
          }
        }
      } catch (error) {
        console.error('Error checking order status:', error);
      }
    };

    // Calculate progress based on time
    const calculateProgress = () => {
      const startTime = parseInt(localStorage.getItem(`orderStartTime_${orderId}`)) || Date.now();
      const currentTime = Date.now();
      const elapsedMinutes = (currentTime - startTime) / (1000 * 60);
      const progressPercentage = Math.min((elapsedMinutes / estimatedTime) * 100, 100);
      
      setProgress(progressPercentage);

      // Store start time if not already stored
      if (!localStorage.getItem(`orderStartTime_${orderId}`)) {
        localStorage.setItem(`orderStartTime_${orderId}`, startTime.toString());
      }

      // If progress reaches 100%, trigger completion check
      if (progressPercentage >= 100 && status !== 'Completed') {
        checkOrderStatus();
      }
    };

    // Set up intervals for status check and progress update
    const statusInterval = setInterval(checkOrderStatus, 30000); // Check status every 30 seconds
    const progressInterval = setInterval(calculateProgress, 1000); // Update progress every second

    // Initial checks
    checkOrderStatus();
    calculateProgress();

    // Cleanup intervals
    return () => {
      clearInterval(statusInterval);
      clearInterval(progressInterval);
    };
  }, [orderId, estimatedTime, status, onOrderComplete]);

  const getEstimatedTimeMessage = () => {
    if (status === 'Completed') {
      if (completedData?.pointsEarned) {
        return `Order completed! You earned ${completedData.pointsEarned} points. Thank you for ordering!`;
      }
      return 'Order completed! Thank you for ordering.';
    }
    if (status === 'Ready for Pickup') {
      return 'Your order is ready! Please collect it from the counter.';
    }
    
    const remainingMinutes = Math.max(
      Math.ceil(estimatedTime - ((progress / 100) * estimatedTime)),
      0
    );
    return `Estimated time remaining: ${remainingMinutes} minutes`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Order #{orderId}</h2>
        <p className={`text-gray-600 ${status === 'Completed' ? 'text-green-600 font-semibold' : ''}`}>
          Current Status: {status}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          {stages.map((stage, index) => (
            <div
              key={stage}
              className={`flex flex-col items-center ${
                index <= currentStageIndex ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              {/* Circle */}
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
                  progress >= (index / (stages.length - 1)) * 100
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300'
                }`}
              >
                {progress >= (index / (stages.length - 1)) * 100 ? '✓' : ''}
              </div>
              {/* Label */}
              <div className="text-xs mt-1">{stage}</div>
            </div>
          ))}
        </div>
        {/* Progress Line */}
        <div className="flex-1">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div
              style={{ 
                width: `${progress}%`,
                transition: 'width 1s linear'
              }}
              className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'
              }`}
            ></div>
          </div>
        </div>
      </div>

      {/* Estimated Time */}
      <div className="mt-4 text-center">
        <p className={`text-sm ${status === 'Completed' ? 'text-green-600 font-semibold' : 'text-gray-600'}`}>
          {getEstimatedTimeMessage()}
        </p>
      </div>

      {/* Progress Percentage */}
      <div className="text-center mt-2">
        <p className="text-sm text-gray-500">
          Progress: {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
};

export default OrderStatus; 