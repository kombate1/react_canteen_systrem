import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
app.use(bodyParser.json());






app.use(
  cors({
    origin: "https://react-canteen-systrem-1.onrender.com", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


mongoose.connect('mongodb+srv://bikinankombat:1234567890@canteensystem.ly7wk.mongodb.net/canteen_system?retryWrites=true&w=majority&appName=CanteenSystem')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const menuItemSchema = new mongoose.Schema({
    name: String,
    category: String,
    basePrice: Number,
    description: String,
    image: String,
    prepTime: Number,
    options: {
        required: [
            {
                name: String,
                choices: [
                    { name: String, price: Number }
                ]
            }
        ],
        optional: [
            {
                name: String,
                choices: [
                    { name: String, price: Number }
                ]
            }
        ]
    }
});


const MenuItems = mongoose.model('MenuItems', menuItemSchema);

// Insert dummy data
const insertDummyData = async () => {
    const dummyData = [
        {
            name: "Signature Burger",
            category: "sides",
            basePrice: 8.99,
            description: "Juicy beef patty with special sauce and fresh vegetables",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format",
            prepTime: 5,
            options: {
                required: [
                    {
                        name: "Toppings",
                        choices: [
                            { name: "Lettuce", price: 0 },
                            { name: "Tomato", price: 0 },
                            { name: "Cheese", price: 1.00 },
                            { name: "Bacon", price: 1.50 }
                        ]
                    }
                ],
                optional: [
                    {
                        name: "Sauce",
                        choices: [
                            { name: "Ketchup", price: 0 },
                            { name: "Mustard", price: 0 },
                            { name: "Barbeque", price: 10.00 }
                        ]
                    }
                ]
            }
        },
        {
            name: "Fresh Garden Salad",
            category: "sides",
            basePrice: 6.99,
            description: "Mixed greens with seasonal vegetables and house dressing",
            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format",
            prepTime: 3,
            options: {
                required: [
                    {
                        name: "Dressing",
                        choices: [
                            { name: "Ranch", price: 0 },
                            { name: "Vinaigrette", price: 0 },
                            { name: "Caesar", price: 0.50 }
                        ]
                    }
                ],
                optional: []
            }
        },
        {
            name: "Classic Pizza",
            category: "sides",
            basePrice: 12.99,
            description: "Hand-tossed pizza with premium toppings",
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format",
            prepTime: 10,
            options: {
                required: [
                    {
                        name: "Size",
                        choices: [
                            { name: "Small", price: 0 },
                            { name: "Medium", price: 2.00 },
                            { name: "Large", price: 4.00 }
                        ]
                    }
                ],
                optional: [
                    {
                        name: "Extra Toppings",
                        choices: [
                            { name: "Pepperoni", price: 1.50 },
                            { name: "Mushrooms", price: 1.00 },
                            { name: "Olives", price: 1.00 }
                        ]
                    }
                ]
            }
        },

{
            name: "Jollof Rice",
            category: "rice",
            basePrice: 25.00,
            description: "Spicy and flavorful rice cooked in rich tomato sauce with aromatic spices",
            image: "/images/jollof-rice.jpg",
            prepTime: 2,
            options: {
                required: [
                    {
                        name: "Protein Choice",
                        choices: [
                            { name: "Chicken", price: 0 },
                            { name: "Beef", price: 5.00 },
                            { name: "Fish", price: 7.00 }
                        ]
                    },
                    {
                        name: "Spice Level",
                        choices: [
                            { name: "Mild", price: 0 },
                            { name: "Medium", price: 0 },
                            { name: "Hot", price: 0 }
                        ]
                    }
                ],
                optional: [
                    {
                        name: "Add-ons",
                        choices: [
                            { name: "Extra Protein", price: 8.00 },
                            { name: "Fried Plantains", price: 5.00 },
                            { name: "Extra Sauce", price: 2.00 }
                        ]
                    }
                ]
            }
        },
        {
            name: "Waakye",
            category: "rice",
            basePrice: 20.00,
            description: "Rice and beans cooked with millet stalks, served with special black pepper sauce",
            image: "/images/waakye.jpg",
            prepTime: 2,
            options: {
                required: [
                    {
                        name: "Protein Choice",
                        choices: [
                            { name: "Fish", price: 0 },
                            { name: "Chicken", price: 5.00 },
                            { name: "Beef", price: 6.00 }
                        ]
                    }
                ],
                optional: [
                    {
                        name: "Toppings",
                        choices: [
                            { name: "Gari", price: 2.00 },
                            { name: "Spaghetti", price: 4.00 },
                            { name: "Boiled Egg", price: 2.50 },
                            { name: "Shito", price: 2.00 }
                        ]
                    }
                ]
            }
        },
        {
            name: "Banku and Tilapia",
            category: "traditional",
            basePrice: 35.00,
            description: "Fermented corn and cassava dough served with grilled tilapia and pepper sauce",
            image: "/images/banku-tilapia.jpg",
            prepTime: 3,
            options: {
                required: [
                    {
                        name: "Fish Size",
                        choices: [
                            { name: "Medium", price: 0 },
                            { name: "Large", price: 10.00 }
                        ]
                    },
                    {
                        name: "Pepper Level",
                        choices: [
                            { name: "Mild", price: 0 },
                            { name: "Spicy", price: 0 },
                            { name: "Extra Hot", price: 0 }
                        ]
                    }
                ],
                optional: [
                    {
                        name: "Extras",
                        choices: [
                            { name: "Extra Pepper Sauce", price: 3.00 },
                            { name: "Extra Banku", price: 7.00 },
                            { name: "Fresh Tomatoes", price: 2.00 }
                        ]
                    }
                ]
            }
        },
        {
            name: "Fufu and Soup",
            category: "traditional",
            basePrice: 30.00,
            description: "Pounded cassava and plantain with choice of light soup or groundnut soup",
            image: "/images/fufu-soup.jpg",
            prepTime: 2,
            options: {
                required: [
                    {
                        name: "Soup Choice",
                        choices: [
                            { name: "Light Soup", price: 0 },
                            { name: "Groundnut Soup", price: 0 },
                            { name: "Palm Nut Soup", price: 5.00 }
                        ]
                    },
                    {
                        name: "Meat Choice",
                        choices: [
                            { name: "Goat", price: 0 },
                            { name: "Beef", price: 0 },
                            { name: "Chicken", price: 0 }
                        ]
                    }
                ],
                optional: [
                    {
                        name: "Add-ons",
                        choices: [
                            { name: "Extra Meat", price: 8.00 },
                            { name: "Extra Soup", price: 5.00 },
                            { name: "Extra Fufu", price: 7.00 }
                        ]
                    }
                ]
            }
        },
        {
            name: "Kelewele",
            category: "sides",
            basePrice: 15.00,
            description: "Spiced and diced fried plantains with ground ginger and spices",
            image: "/images/kelewele.jpg",
            prepTime: 1,
            options: {
                required: [
                    {
                        name: "Spice Level",
                        choices: [
                            { name: "Mild", price: 0 },
                            { name: "Medium", price: 0 },
                            { name: "Hot", price: 0 }
                        ]
                    }
                ],
                optional: [
                    {
                        name: "Extras",
                        choices: [
                            { name: "Peanuts", price: 2.00 },
                            { name: "Extra Spice Mix", price: 2.00 },
                            { name: "Double Portion", price: 10.00 }
                        ]
                    }
                ]
            }
        },
        {
            name: "Red Red",
            category: "beans",
            basePrice: 25.00,
            description: "Spicy bean stew with fried plantains and gari",
            image: "/images/red-red.jpg",
            prepTime: 2,
            options: {
                required: [
                    {
                        name: "Plantain Type",
                        choices: [
                            { name: "Ripe Plantain", price: 0 },
                            { name: "Green Plantain", price: 0 }
                        ]
                    }
                ],
                optional: [
                    {
                        name: "Add-ons",
                        choices: [
                            { name: "Extra Plantains", price: 5.00 },
                            { name: "Extra Gari", price: 2.00 },
                            { name: "Fish Powder", price: 3.00 }
                        ]
                    }
                ]
            }
        },
        {
            name: "Yam and Palava Sauce",
            category: "traditional",
            basePrice: 28.00,
            description: "Boiled yam served with spinach stew (palava sauce) and choice of protein",
            image: "/images/yam-palava.jpg",
            prepTime: 2,
            options: {
                required: [
                    {
                        name: "Protein Choice",
                        choices: [
                            { name: "Smoked Fish", price: 0 },
                            { name: "Meat", price: 5.00 },
                            { name: "Eggs", price: 3.00 }
                        ]
                    }
                ],
                optional: [
                    {
                        name: "Extras",
                        choices: [
                            { name: "Extra Sauce", price: 5.00 },
                            { name: "Extra Yam", price: 7.00 },
                            { name: "Boiled Egg", price: 2.50 }
                        ]
                    }
                ]
            }
        },
        {
            name: "Tuo Zaafi",
            category: "traditional",
            basePrice: 30.00,
            description: "Northern Ghana specialty of corn flour pudding served with green soup",
            image: "/images/tuo-zaafi.jpg",
            prepTime: 3,
            options: {
                required: [
                    {
                        name: "Soup Type",
                        choices: [
                            { name: "Ayoyo Soup", price: 0 },
                            { name: "Mixed Vegetables", price: 0 }
                        ]
                    },
                    {
                        name: "Meat Choice",
                        choices: [
                            { name: "Beef", price: 0 },
                            { name: "Goat", price: 5.00 },
                            { name: "Fish", price: 3.00 }
                        ]
                    }
                ],
                optional: [
                    {
                        name: "Add-ons",
                        choices: [
                            { name: "Extra Meat", price: 8.00 },
                            { name: "Extra Soup", price: 5.00 },
                            { name: "Extra TZ", price: 7.00 }
                        ]
                    }
                ]
            }
        },
        {
            name: "Sprite",
            category: "drinks",
            basePrice: 5.00,
            description: "Lemon-lime flavored soda",
            image: "/images/sprite.jpg",
            prepTime: 0,
            options: {
                required: [],
                optional: []
            }
        },
        {
            name: "Water",
            category: "drinks",
            basePrice: 2.00,
            description: "Pure bottled water",
            image: "/images/water.jpg",
            prepTime: 0,
            options: {
                required: [],
                optional: []
            }
        },
        {
            name: "Coke",
            category: "drinks",
            basePrice: 5.00,
            description: "Refreshing cola drink",
            image: "/images/coke.jpg",
            prepTime: 0,
            options: {
                required: [],
                optional: []
            }
        },
        {
            name: "Fanta",
            category: "drinks",
            basePrice: 5.00,
            description: "Citrusy and refreshing orange soda",
            image: "/images/fanta.jpg",
            prepTime: 0,
            options: {
                required: [],
                optional: []
            }
        },
    ];

    try {
        // Clear existing data first
        await MenuItems.deleteMany({});
        await MenuItems.insertMany(dummyData);
        console.log('Dummy data inserted successfully');
    } catch (error) {
        console.error('Error inserting dummy data:', error);
    }
};

// Call the insertDummyData function after model initialization
insertDummyData();




// Define a simple route
app.get('/', (req, res) => {
    res.send('Welcome to the Backend!');
});

// Example of a POST route
app.post('/api/data', (req, res) => {
    const data = req.body;
    // Process the data and save to the database
    res.status(201).send('Data received');
});

// Define a schema and model for menu items
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

// Route to get all menu items
app.get('/api/menu-items', async (req, res) => {
    try {
        const items = await MenuItems.find();
        res.json(items);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});


app.get('/api/menu-items/:category', async (req, res) => {
    try {
        const category = req.params.category.toLowerCase();
        console.log('Filtering by category:', category); 

        if (category === 'all') {
            const items = await MenuItems.find();
            return res.json(items);
        }

        const items = await MenuItems.find({ 
            category: { $regex: new RegExp(category, 'i') } 
        });
        
        console.log('Found items:', items.length); 
        res.json(items);
    } catch (err) {
        console.error('Error fetching category items:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Add a route to check what categories exist in the database
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await MenuItems.distinct('category');
        res.json(categories);
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});


app.post('/api/customize', (req, res) => {
    const { itemId, selections } = req.body;
    res.status(200).send('Customization processed');
});

// Add this endpoint to your existing backend
app.post('/api/menu-items/prep-times', async (req, res) => {
    try {
        const { itemIds } = req.body;
        const prepTimes = await MenuItems.find(
            { _id: { $in: itemIds } },
            { _id: 1, prepTime: 1 }
        );
        res.json(prepTimes);
    } catch (error) {
        console.error('Error fetching prep times:', error);
        res.status(500).json({ error: 'Error fetching prep times' });
    }
});

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  dietaryRestrictions: [String],
  allergies: [String],
  loyaltyPoints: { type: Number, default: 0 },
  pointsHistory: [{
    timestamp: Date,
    action: String, // 'earned' or 'redeemed'
    points: Number,
    previousBalance: Number
  }]
});

const User = mongoose.model('User', userSchema);

// Authentication routes
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password, name, dietaryRestrictions, allergies } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      email,
      password, 
      name,
      dietaryRestrictions,
      allergies,
      loyaltyPoints: 0
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

app.post('/api/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Send user data (excluding password)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      dietaryRestrictions: user.dietaryRestrictions,
      allergies: user.allergies,
      loyaltyPoints: user.loyaltyPoints
    };

    res.json(userData);
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ message: 'Error signing in' });
  }
});

// Get user's loyalty points
app.get('/api/user/points/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ loyaltyPoints: user.loyaltyPoints });
  } catch (error) {
    console.error('Error fetching points:', error);
    res.status(500).json({ message: 'Error fetching points' });
  }
});

// Update user's loyalty points
app.post('/api/user/points/update', async (req, res) => {
  try {
    const { userId, pointsChange, action } = req.body;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a points transaction record
    const transaction = {
      timestamp: new Date(),
      action: action, // 'earned' or 'redeemed'
      points: Math.abs(pointsChange),
      previousBalance: user.loyaltyPoints
    };

    // Update points based on action
    if (action === 'earned') {
      user.loyaltyPoints += pointsChange;
    } else if (action === 'redeemed') {
      if (user.loyaltyPoints < pointsChange) {
        return res.status(400).json({ message: 'Insufficient points' });
      }
      user.loyaltyPoints -= pointsChange;
    }

    // Add transaction to history
    if (!user.pointsHistory) {
      user.pointsHistory = [];
    }
    user.pointsHistory.push(transaction);

    await user.save();
    res.json({ 
      loyaltyPoints: user.loyaltyPoints,
      transaction: transaction
    });
  } catch (error) {
    console.error('Error updating points:', error);
    res.status(500).json({ message: 'Error updating points' });
  }
});

// Get user's points history
app.get('/api/user/points/history/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ pointsHistory: user.pointsHistory || [] });
  } catch (error) {
    console.error('Error fetching points history:', error);
    res.status(500).json({ message: 'Error fetching points history' });
  }
});

// Update the order completion endpoint
app.post('/api/orders/complete', async (req, res) => {
  try {
    const { userId, order } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate points earned (10 points per dollar spent)
    const pointsEarned = Math.floor(order.total * 10);

    // Update user's points
    user.loyaltyPoints += pointsEarned;

    // Add to points history
    if (!user.pointsHistory) {
      user.pointsHistory = [];
    }
    user.pointsHistory.push({
      timestamp: new Date(),
      action: 'earned',
      points: pointsEarned,
      previousBalance: user.loyaltyPoints - pointsEarned
    });

    await user.save();

    res.json({
      message: 'Order completed successfully',
      pointsEarned,
      newPointsBalance: user.loyaltyPoints
    });
  } catch (error) {
    console.error('Error completing order:', error);
    res.status(500).json({ message: 'Error completing order' });
  }
});

// Add this endpoint after the other user-related endpoints
app.put('/api/user/update/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, dietaryRestrictions, allergies } = req.body;

    // Find user and check if email is already taken (if email is being changed)
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    // Update user
    user.name = name;
    user.email = email;
    user.dietaryRestrictions = dietaryRestrictions;
    user.allergies = allergies;

    await user.save();

    // Send updated user data (excluding password)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      dietaryRestrictions: user.dietaryRestrictions,
      allergies: user.allergies,
      loyaltyPoints: user.loyaltyPoints
    };

    res.json(userData);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderId: String,
  items: [{
    id: String,
    name: String,
    price: Number,
    quantity: Number,
    image: String,
    customizations: {
      required: [{
        group: String,
        choice: String,
        price: Number
      }],
      optional: [{
        choice: String,
        price: Number
      }]
    }
  }],
  total: {
    type: Number,
    required: true
  },
  originalTotal: Number,
  pointsEarned: Number,
  pointsUsed: Number,
  status: {
    type: String,
    enum: ['Placed', 'Preparing', 'Ready for Pickup', 'Completed', 'Cancelled'],
    default: 'Placed'
  },
  timestamp: {
    type: Date,
    
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);



// Create new order
app.post('/api/orders', async (req, res) => {
  try {
    const { userId, items, total, originalTotal, pointsEarned, pointsUsed } = req.body;
    
    // Generate a unique order ID
    const orderId = `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
    
    // Create the order
    const order = new Order({
      userId,
      orderId,
      items: items.map(item => ({
        ...item,
        image: item.image || '' // Ensure image property exists
      })),
      total,
      originalTotal,
      pointsEarned,
      pointsUsed,
      status: 'Placed',
      timestamp: new Date()
    });

    await order.save();

    // If points were used, deduct them from the user's account
    if (pointsUsed > 0) {
      const user = await User.findById(userId);
      if (user) {
        user.loyaltyPoints -= pointsUsed;
        user.pointsHistory.push({
          timestamp: new Date(),
          action: 'redeemed',
          points: pointsUsed,
          previousBalance: user.loyaltyPoints + pointsUsed
        });
        await user.save();
      }
    }

    // Return the created order
    res.status(201).json({
      message: 'Order created successfully',
      order: {
        ...order.toObject(),
        items: items.map(item => ({
          ...item,
          image: item.image || ''
        }))
      }
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
});

// Get single order by orderId - This specific route should come FIRST
app.get('/api/orders/single/:orderId', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ order });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Error fetching order' });
  }
});

// Get user's active order
app.get('/api/orders/active/:userId', async (req, res) => {
  try {
    let userId;
    try {
      // Check if userId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
      }
      userId = new mongoose.Types.ObjectId(req.params.userId);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const order = await Order.findOne({
      userId: userId,
      status: { $ne: 'Completed' }
    })
    .sort({ timestamp: -1 })
    .select('-__v')
    .lean();

    if (!order) {
      return res.status(404).json({ message: 'No active order found' });
    }

    res.json({ order });
  } catch (error) {
    console.error('Error fetching active order:', error);
    res.status(500).json({ 
      message: 'Error fetching active order',
      error: error.message 
    });
  }
});

// Get user's order history
app.get('/api/orders/history/:userId', async (req, res) => {
  try {
    let userId;
    try {
      // Check if userId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
      }
      userId = new mongoose.Types.ObjectId(req.params.userId);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }

    const orders = await Order.find({ userId })
      .sort({ timestamp: -1 })
      .select('-__v') // Exclude version field
      .lean(); // Convert to plain JavaScript objects

    res.json({ orders });
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ 
      message: 'Error fetching order history',
      error: error.message 
    });
  }
});

// Get user's orders (generic route should come LAST)
app.get('/api/orders/:userId', async (req, res) => {
  try {
    const userId = new Types.ObjectId(req.params.userId);
    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Update order status
app.put('/api/orders/:orderId/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    // Find and update order by orderId string
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { 
        $set: { 
          status,
          ...(status === 'Completed' ? { completedAt: new Date() } : {})
        }
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // If order is completed, update user's points
    if (status === 'Completed') {
      const user = await User.findById(order.userId);
      if (user) {
        // Add points earned
        if (order.pointsEarned > 0) {
          user.loyaltyPoints += order.pointsEarned;
          user.pointsHistory.push({
            timestamp: new Date(),
            action: 'earned',
            points: order.pointsEarned,
            previousBalance: user.loyaltyPoints - order.pointsEarned
          });
        }
        await user.save();
      }
    }

    res.json({ order });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status' });
  }
});

// Update order status
app.patch('/api/orders/:orderId', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json({ order });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Error updating order' });
  }
});

// Delete an order from the user's history
app.delete('/api/orders/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find and delete the order by orderId
    const order = await Order.findOneAndDelete({ orderId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Error deleting order' });
  }
});

// Add automatic order status update function
const updateOrderStatus = async (orderId, prepTime) => {
  try {
    const order = await Order.findOne({ orderId });
    if (!order || order.status === 'Completed') return;

    const startTime = new Date(order.timestamp).getTime();
    const currentTime = Date.now();
    const elapsedMinutes = (currentTime - startTime) / (1000 * 60);
    const progressPercentage = (elapsedMinutes / prepTime) * 100;

    let newStatus = order.status;
    if (progressPercentage >= 100) {
      newStatus = 'Completed';
    } else if (progressPercentage >= 75) {
      newStatus = 'Ready for Pickup';
    } else if (progressPercentage >= 25) {
      newStatus = 'Preparing';
    }

    if (newStatus !== order.status) {
      const updatedOrder = await Order.findOneAndUpdate(
        { orderId },
        { 
          status: newStatus,
          ...(newStatus === 'Completed' ? { 
            completedAt: new Date(),
            // Add any points earned when order is completed
            pointsEarned: Math.floor(order.total * 10) // 10 points per dollar
          } : {})
        },
        { new: true }
      );

      // If order is completed, update user's points
      if (newStatus === 'Completed' && updatedOrder.pointsEarned > 0) {
        const user = await User.findById(order.userId);
        if (user) {
          user.loyaltyPoints += updatedOrder.pointsEarned;
          user.pointsHistory.push({
            timestamp: new Date(),
            action: 'earned',
            points: updatedOrder.pointsEarned,
            previousBalance: user.loyaltyPoints - updatedOrder.pointsEarned
          });
          await user.save();
        }
      }

      return newStatus;
    }

    return order.status;
  } catch (error) {
    console.error('Error updating order status:', error);
  }
};

// Update the check status endpoint to include more order details
app.get('/api/orders/:orderId/check-status', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const prepTime = parseInt(req.query.prepTime) || 15;
    const newStatus = await updateOrderStatus(req.params.orderId, prepTime);
    
    // Fetch the updated order to get the latest data
    const updatedOrder = await Order.findOne({ orderId: req.params.orderId });
    
    res.json({ 
      status: newStatus || order.status,
      timestamp: order.timestamp,
      completedAt: updatedOrder.completedAt,
      pointsEarned: updatedOrder.pointsEarned
    });
  } catch (error) {
    console.error('Error checking order status:', error);
    res.status(500).json({ message: 'Error checking order status' });
  }
});

// Start the servers
app.listen(3001, () => console.log('Server running on http://localhost:3001'));
