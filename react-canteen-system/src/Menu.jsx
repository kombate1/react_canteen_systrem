import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import { useNavigate, Link } from 'react-router-dom';

// Define categories and menu items outside the component for clarity
const categories = [
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'rice', name: 'Rice', icon: '🍚' },
  { id: 'noodles', name: 'Noodles', icon: '🍜' },
  { id: 'drinks', name: 'Drinks', icon: '🥤' },
  { id: 'sides', name: 'Sides', icon: '🍟' },
];

// Enhanced CategoryButton component
const CategoryButton = ({ category, isSelected, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 ${
      isSelected 
        ? 'bg-indigo-600 text-white shadow-lg transform scale-105' 
        : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
    }`}
  >
    <span className="text-2xl">{category.icon}</span>
    <span className="font-medium">{category.name}</span>
  </button>
);

// Enhanced MenuItem component
const MenuItem = ({ item, onAddToCart }) => {
  const [updatedPrice, setUpdatedPrice] = useState(item.basePrice);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentSelections, setCurrentSelections] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const handleCustomize = () => {
    setSelectedItem(item);
  };

  const handleConfirm = (newPrice, selections) => {
    console.log('New price received:', newPrice);
    console.log('Selections:', selections); // Debug log
    setUpdatedPrice(newPrice);
    setCurrentSelections(selections);
    setSelectedItem(null);
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: item._id,
      name: item.name,
      price: updatedPrice,
      basePrice: item.basePrice,
      customizations: currentSelections || { required: [], optional: [] },
      image: item.image,
      quantity: quantity
    };
    onAddToCart(cartItem);
    setQuantity(1);
  };

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-48 object-cover transition-transform duration-300"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-indigo-600 shadow-lg">
          GH₵{updatedPrice.toFixed(2)}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
        
        {/* Customizations display */}
        {currentSelections && (
          <div className="space-y-1 mb-4 bg-gray-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-gray-700">Customizations:</p>
            {currentSelections.required?.map((item, index) => (
              <div key={`req-${index}`} className="text-xs text-gray-600 flex justify-between">
                <span>{item.group}: {item.choice}</span>
                {item.price > 0 && <span className="text-indigo-600">+GH₵{item.price.toFixed(2)}</span>}
              </div>
            ))}
            {currentSelections.optional?.map((item, index) => (
              <div key={`opt-${index}`} className="text-xs text-gray-600 flex justify-between">
                <span>{item.choice}</span>
                {item.price > 0 && <span className="text-indigo-600">+GH₵{item.price.toFixed(2)}</span>}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            onClick={handleCustomize}
            className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            Customize
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-gray-100 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                -
              </button>
              <span className="px-3 font-medium text-gray-800">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                +
              </button>
            </div>
            
            <button
              onClick={handleAddToCart}
              className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {selectedItem && (
        <CustomizationModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

// Enhanced CartItem component
const CartItem = ({ item, index, onUpdateQuantity, onDelete, onEdit }) => {
  return (
    <div className="mb-6 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-center">
        <div className="relative w-20 h-20">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover rounded-lg"
          />
          <span className="absolute -top-2 -right-2 bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
            {item.quantity}
          </span>
        </div>
        
        <div className="ml-4 flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-gray-800">{item.name}</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(index)}
                className="text-gray-400 hover:text-indigo-600 transition-colors"
              >
                ✎
              </button>
              <button
                onClick={() => onDelete(index)}
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          </div>
          
          <p className="text-indigo-600 font-medium mt-1">
            GH₵{(item.price * item.quantity).toFixed(2)}
          </p>
          
          {/* Customizations */}
          <div className="mt-2 space-y-1">
            {item.customizations.required?.map((customization, idx) => (
              <p key={`req-${idx}`} className="text-xs text-gray-500">
                • {customization.group}: {customization.choice}
                {customization.price > 0 && 
                  <span className="text-indigo-500"> (+GH₵{customization.price.toFixed(2)})</span>
                }
              </p>
            ))}
            {item.customizations.optional?.map((customization, idx) => (
              <p key={`opt-${idx}`} className="text-xs text-gray-500">
                • {customization.choice}
                {customization.price > 0 && 
                  <span className="text-indigo-500"> (+GH₵{customization.price.toFixed(2)})</span>
                }
              </p>
            ))}
          </div>
          
          <div className="flex items-center mt-3">
            <button
              onClick={() => onUpdateQuantity(index, item.quantity - 1)}
              className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
            >
              -
            </button>
            <span className="mx-3 font-medium">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(index, item.quantity + 1)}
              className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Menu component
const Menu = ({ cartItems, setCartItems }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [editingCartItem, setEditingCartItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        let url = 'http://localhost:3001/api/menu-items';
        if (selectedCategory !== 'all') {
          url = `http://localhost:3001/api/menu-items/${selectedCategory}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, [selectedCategory]);

  const handleDeleteCartItem = (index) => {
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const handleEditCartItem = (index) => {
    setEditingCartItem({
      item: menuItems.find(item => item._id === cartItems[index].id),
      cartIndex: index,
      currentCustomizations: cartItems[index].customizations,
      currentQuantity: cartItems[index].quantity
    });
  };

  const updateCartItemQuantity = (index, newQuantity) => {
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

  const handleAddToCart = (item) => {
    setCartItems(prevItems => [...prevItems, item]);
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleUpdateCartItem = (updatedItem) => {
    if (editingCartItem !== null) {
      setCartItems(prevItems => {
        const newItems = [...prevItems];
        newItems[editingCartItem.cartIndex] = updatedItem;
        return newItems;
      });
      setEditingCartItem(null);
    }
  };

  const handleViewOrderTracking = () => {
    if (cartItems.length === 0) {
      navigate('/OrderTracking'); // Show NoOrderDisplay when cart is empty
    } else {
      // Navigate with order data when there are items
      navigate('/OrderTracking', { 
        state: { 
          order: {
            items: cartItems,
            status: 'Placed',
            total: calculateTotal(),
            orderId: `ORD-${Date.now()}` // Generate a simple order ID
          }
        } 
      });
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Our Menu</h1>
          <p className="text-gray-600">Discover our delicious selection of meals</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {categories.map(category => (
            <CategoryButton
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
            />
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredItems.map(item => (
            <MenuItem
              key={item._id}
              item={item}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="hidden lg:block w-96 bg-white p-6 shadow-xl">
        <div className="sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
            <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
              {cartItems.length} items
            </span>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">🛒</span>
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
                {cartItems.map((item, index) => (
                  <CartItem
                    key={index}
                    item={item}
                    index={index}
                    onUpdateQuantity={updateCartItemQuantity}
                    onDelete={handleDeleteCartItem}
                    onEdit={handleEditCartItem}
                  />
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">GH₵{calculateTotal().toFixed(2)}</span>
                </div>
                <button
                  onClick={handleViewOrderTracking}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                >
                  {cartItems.length > 0 ? 'Place Order' : 'View Orders'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Cart Button */}
      <div className="lg:hidden fixed bottom-6 right-6">
        <Link 
          to="/cart" 
          className="bg-indigo-600 text-white rounded-full p-4 shadow-lg flex items-center space-x-2 hover:bg-indigo-700 transition-colors"
        >
          <svg viewBox="0 0 256 256" className="w-6 h-6">
            <rect fill="none" height="256" width="256"/>
            <path d="M184,184H69.8L41.9,30.6A8,8,0,0,0,34.1,24H16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
            <circle cx="80" cy="204" fill="none" r="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
            <circle cx="184" cy="204" fill="none" r="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
            <path d="M62.5,144H188.1a15.9,15.9,0,0,0,15.7-13.1L216,64H48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/>
          </svg>
          {cartItems.length > 0 && (
            <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm">
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>

      {/* Edit Modal */}
      {editingCartItem && (
        <CustomizationModal
          item={editingCartItem.item}
          initialCustomizations={editingCartItem.currentCustomizations}
          initialQuantity={editingCartItem.currentQuantity}
          onClose={() => setEditingCartItem(null)}
          onConfirm={(price, customizations) => {
            handleUpdateCartItem({
              ...cartItems[editingCartItem.cartIndex],
              price,
              customizations,
            });
          }}
        />
      )}
    </div>
  );
};

// Component for customizing menu items
const CustomizationModal = ({ item, onClose, onConfirm }) => {
  const [selections, setSelections] = useState({
    required: {},
    optional: new Set()
  });

  const calculateTotal = () => {
    let total = item.basePrice;
    
    if (item.options?.required) {
      Object.values(selections.required).forEach(choice => {
        const option = item.options.required
          .flatMap(group => group.choices)
          .find(c => c.name === choice);
        if (option?.price) total += option.price;
      });
    }

    if (item.options?.optional) {
      selections.optional.forEach(choice => {
        const option = item.options.optional
          .flatMap(group => group.choices)
          .find(c => c.name === choice);
        if (option?.price) total += option.price;
      });
    }

    return total;
  };

  const handleConfirm = () => {
    const totalPrice = calculateTotal();
    
    // Create a detailed summary of selections with prices
    const customizationDetails = {
      required: Object.entries(selections.required).map(([groupIndex, choiceName]) => {
        const group = item.options.required[groupIndex];
        const choice = group.choices.find(c => c.name === choiceName);
        return {
          group: group.name,
          choice: choiceName,
          price: choice?.price || 0
        };
      }),
      optional: Array.from(selections.optional).map(choiceName => {
        const choice = item.options.optional
          .flatMap(group => group.choices)
          .find(c => c.name === choiceName);
        return {
          choice: choiceName,
          price: choice?.price || 0
        };
      })
    };

    onConfirm(totalPrice, customizationDetails);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">{item.name}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        {/* Required Options */}
        {item.options?.required?.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-6">
            <h4 className="font-semibold mb-3">{group.name} *</h4>
            {group.choices?.map((choice, choiceIndex) => (
              <label key={choiceIndex} className="flex items-center space-x-2 mb-2">
                <input
                  type="radio"
                  name={`required-${groupIndex}`}
                  value={choice.name}
                  onChange={(e) => setSelections(prev => ({
                    ...prev,
                    required: {
                      ...prev.required,
                      [groupIndex]: e.target.value
                    }
                  }))}
                  className="form-radio text-blue-500"
                />
                <span>{choice.name}</span>
                {choice.price > 0 && (
                  <span className="text-gray-500">(+GH₵{choice.price.toFixed(2)})</span>
                )}
              </label>
            ))}
          </div>
        ))}

        {/* Optional Options */}
        {item.options?.optional?.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-6">
            <h4 className="font-semibold mb-3">{group.name}</h4>
            {group.choices?.map((choice, choiceIndex) => (
              <label key={choiceIndex} className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setSelections(prev => {
                      const newOptional = new Set(prev.optional);
                      if (e.target.checked) {
                        newOptional.add(choice.name);
                      } else {
                        newOptional.delete(choice.name);
                      }
                      return {
                        ...prev,
                        optional: newOptional
                      };
                    });
                  }}
                  className="form-checkbox text-blue-500"
                />
                <span>{choice.name}</span>
                {choice.price > 0 && (
                  <span className="text-gray-500">(+GH₵{choice.price.toFixed(2)})</span>
                )}
              </label>
            ))}
          </div>
        ))}

        <div className="mt-6">
          <h3 className="font-semibold mb-3">Total</h3>
          <p className="text-lg font-bold">GH₵{calculateTotal().toFixed(2)}</p>
        </div>

        <div className="mt-6">
          <button 
            onClick={handleConfirm}
            className="w-full bg-blue-500 text-white rounded-md p-2"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export { CustomizationModal };
export default Menu;
