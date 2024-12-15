import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Home'
import Menu from './Menu'
import OrderTracking from './pages/OrderTracking'
import RedeemPoints from './pages/RedeemPoints'
import ErrorBoundary from './Components/ErrorBoundary'
import CartPage from './pages/CartPage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import OrderHistory from './pages/OrderHistory'
import Footer from './Components/Footer'

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [editingCartItem, setEditingCartItem] = useState(null);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setLoyaltyPoints(parsedUser.loyaltyPoints || 0);
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setLoyaltyPoints(userData.loyaltyPoints || 0);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setLoyaltyPoints(0);
    setCartItems([]);
    localStorage.removeItem('user');
  };

  const handleApplyPoints = async (points) => {
    if (user) {
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

        const data = await response.json();
        
        if (response.ok) {
          setLoyaltyPoints(data.loyaltyPoints);
          const updatedUser = { ...user, loyaltyPoints: data.loyaltyPoints };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      } catch (error) {
        console.error('Error applying points:', error);
      }
    }
  };

  const handlePointsEarned = async (points) => {
    if (user) {
      try {
        const response = await fetch('https://react-canteen-systrem.onrender.com/api/user/points/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            pointsChange: points,
            action: 'earned'
          }),
        });

        const data = await response.json();
        
        if (response.ok) {
          setLoyaltyPoints(data.loyaltyPoints);
          const updatedUser = { ...user, loyaltyPoints: data.loyaltyPoints };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      } catch (error) {
        console.error('Error updating earned points:', error);
      }
    }
  };

  // Add a function to fetch current points
  const fetchUserPoints = async () => {
    if (user) {
      try {
        const response = await fetch(`https://react-canteen-systrem.onrender.com/api/user/points/${user.id}`);
        const data = await response.json();
        
        if (response.ok) {
          setLoyaltyPoints(data.loyaltyPoints);
          const updatedUser = { ...user, loyaltyPoints: data.loyaltyPoints };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      } catch (error) {
        console.error('Error fetching user points:', error);
      }
    }
  };

  // Add effect to fetch points when user changes
  useEffect(() => {
    if (user) {
      fetchUserPoints();
    }
  }, [user?.id]);

  // Protected Route component with loading state
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (!user) {
      return <Navigate to="/signin" />;
    }
    return children;
  };

  // Cart functions
  const handleUpdateQuantity = (index, newQuantity) => {
    if (newQuantity >= 1) {
      setCartItems(prevItems => {
        const newItems = [...prevItems];
        newItems[index] = { ...newItems[index], quantity: newQuantity };
        return newItems;
      });
    } else if (newQuantity === 0) {
      handleDeleteCartItem(index);
    }
  };

  const handleDeleteCartItem = (index) => {
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const handleEditCartItem = (index) => {
    setEditingCartItem({
      item: cartItems[index],
      cartIndex: index
    });
  };

  const handleUpdateCartItem = (index, updatedItem) => {
    setCartItems(prevItems => {
      const newItems = [...prevItems];
      newItems[index] = updatedItem;
      return newItems;
    });
    setEditingCartItem(null);
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={
              <>
                <Navbar cartItemCount={cartItems.length} user={user} onLogout={handleLogout} />
                <Home user={user} />
              </>
            } />
            <Route path="/Home" element={<Navigate to="/" replace />} />
            <Route path="/signin" element={<SignIn setUser={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Protected Routes */}
            <Route 
              path="/menu" 
              element={
                <ProtectedRoute>
                  <Navbar cartItemCount={cartItems.length} user={user} onLogout={handleLogout} />
                  <Menu 
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                  />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cart" 
              element={
                <ProtectedRoute>
                  <Navbar cartItemCount={cartItems.length} user={user} onLogout={handleLogout} />
                  <CartPage 
                    cartItems={cartItems}
                    onUpdateQuantity={handleUpdateQuantity}
                    onDelete={handleDeleteCartItem}
                    onEdit={handleEditCartItem}
                    onUpdateCartItem={handleUpdateCartItem}
                    editingCartItem={editingCartItem}
                    setEditingCartItem={setEditingCartItem}
                    calculateTotal={calculateTotal}
                    loyaltyPoints={loyaltyPoints}
                    onApplyPoints={handleApplyPoints}
                    onPointsEarned={handlePointsEarned}
                    user={user}
                    clearCart={clearCart}
                  />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/OrderTracking" 
              element={
                <ProtectedRoute>
                  <Navbar cartItemCount={cartItems.length} user={user} onLogout={handleLogout} />
                  <OrderTracking />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/RedeemPoints" 
              element={
                <ProtectedRoute>
                  <Navbar cartItemCount={cartItems.length} user={user} onLogout={handleLogout} />
                  <RedeemPoints loyaltyPoints={loyaltyPoints} />
                </ProtectedRoute>
              } 
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Navbar cartItemCount={cartItems.length} user={user} onLogout={handleLogout} />
                  <Profile 
                    user={user}
                    loyaltyPoints={loyaltyPoints}
                    onUpdateUser={handleLogin}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-history"
              element={
                <ProtectedRoute>
                  <Navbar cartItemCount={cartItems.length} user={user} onLogout={handleLogout} />
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ErrorBoundary>
        <Footer />
      </div>
    </Router>
  )
}

export default App