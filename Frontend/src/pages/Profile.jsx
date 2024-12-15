import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ user, loyaltyPoints, onUpdateUser }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [pointsHistory, setPointsHistory] = useState([]);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    dietaryRestrictions: user?.dietaryRestrictions || [],
    allergies: user?.allergies || []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchPointsHistory();
    }
  }, [user]);

  const fetchPointsHistory = async () => {
    try {
      const response = await fetch(`https://react-canteen-systrem.onrender.com/api/user/points/history/${user.id}`);
      const data = await response.json();
      if (response.ok) {
        setPointsHistory(data.pointsHistory || []);
      }
    } catch (error) {
      console.error('Error fetching points history:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInputChange = (e, field) => {
    const values = e.target.value.split(',').map(item => item.trim());
    setFormData(prev => ({
      ...prev,
      [field]: values
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`https://react-canteen-systrem.onrender.com/api/user/update/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        onUpdateUser({ ...user, ...formData });
        setIsEditing(false);
      } else {
        setError(data.message || 'Failed to update profile');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">{user?.name}</h1>
                <p className="text-indigo-100 mt-2">{user?.email}</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold">{loyaltyPoints}</p>
                <p className="text-indigo-100">Loyalty Points</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Profile Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dietary Restrictions (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.dietaryRestrictions.join(', ')}
                      onChange={(e) => handleArrayInputChange(e, 'dietaryRestrictions')}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Allergies (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.allergies.join(', ')}
                      onChange={(e) => handleArrayInputChange(e, 'allergies')}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>

                  {error && (
                    <div className="text-red-600 text-sm mt-2">
                      {error}
                    </div>
                  )}
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Dietary Restrictions</h3>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {user?.dietaryRestrictions?.map((restriction, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                        >
                          {restriction}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Allergies</h3>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {user?.allergies?.map((allergy, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Points History */}
          <div>
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Points History</h2>
              <div className="space-y-4">
                {pointsHistory.map((transaction, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {transaction.action === 'earned' ? 'Earned' : 'Redeemed'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <p className={`font-bold ${
                      transaction.action === 'earned' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {transaction.action === 'earned' ? '+' : '-'}
                      {transaction.points}
                    </p>
                  </div>
                ))}

                {pointsHistory.length === 0 && (
                  <p className="text-center text-gray-500 py-4">
                    No points history yet
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 