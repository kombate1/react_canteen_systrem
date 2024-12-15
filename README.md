# Canteen Ordering Platform

## Login
username: bikinan@gmail.com
password: test

## Overview
The Canteen Ordering Platform is a web application designed to allow users to place food and beverage orders for a canteen or cafeteria online. The platform provides an intuitive interface for users to view the menu, select items, customize orders, and make payments. Administrators can manage the menu, view orders, and update inventory in real-time.

This project uses modern web development technologies and is designed to be deployed and hosted on Render for easy access and scalability.

## Features
- **User Authentication**: Secure login and registration for users.
- **Menu Display**: Dynamic menu with categories, item details, and pricing.
- **Order Customization**: Users can add items to their cart and customize them (e.g., size, add-ons).
- **Order History**: Users can view their past orders and repeat them.
- **Real-time Notifications**: Users receive notifications about order status (e.g., confirmation, preparation, ready for pickup).

## Tech Stack
- **Frontend**: React.js, Redux (for state management), Axios (for API calls)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (for storing user data, orders, and menu items)
- **Authentication**: JWT (JSON Web Token) for secure user authentication
- **Hosting**: Render for hosting both frontend and backend
- **Version Control**: Git, GitHub for version control

## Installation

### Prerequisites
Before you start, ensure you have the following installed on your local machine:
- Node.js (version 14.x or higher)
- MongoDB (for local development or a MongoDB cloud instance)
- Git (for version control)

### Setup Steps
1. **Clone the repository**:
   ```bash
   https://github.com/kombate1/react_canteen_systrem.git
   ```

2. **Install dependencies for both frontend and backend**:
   Navigate to the client and server directories, and run the following command in each:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create `.env` files in both client and server directories and populate them with necessary configuration details (e.g., database URL).

   Example for `.env` in the server:
   ```makefile
   MONGODB_URI=mongodb://localhost:27017/canteen
   ```

4. **Start the application**:
   To run both the frontend and backend, use the following commands:

   Start the backend server:
   ```bash
   npm run dev
   ```

   Start the frontend client:
   ```bash
   cd client
   npm start
   ```

   This will run the backend server on `http://localhost:3001` and the frontend on `http://localhost:3000`.

5. **Create the Database Schema**:
   Ensure your MongoDB database is set up with appropriate collections for users, orders, and menu items.

6. **Test Payment Integration**:
   Make sure to test the payment functionality with Stripe or PayPal using sandbox credentials.

## API Endpoints

(![Screenshot 2024-12-14 233144](https://github.com/user-attachments/assets/c3044ca3-dd82-4ecd-9320-8c4313e3395a)
)
![Screenshot 2024-12-14 233144](https://github.com/user-attachments/assets/88783b8d-4f58-47ce-8929-a612f27ba7a1)
![Screenshot 2024-12-14 232512](https://github.com/user-attachments/assets/1d436468-e017-4684-ae0b-2d4250a54e74)
![Screenshot 2024-12-14 232651](https://github.com/user-attachments/assets/570420e9-ca8a-4916-a9f5-a1967efd4095)
![Screenshot 2024-12-14 232902](https://github.com/user-attachments/assets/4341b1e6-f1be-47b6-8e61-4067768a941c)
![Screenshot 2024-12-14 232953](https://github.com/user-attachments/assets/584874eb-4996-4b06-8b7a-72250519683e)
![Screenshot 2024-12-14 233044](https://github.com/user-attachments/assets/32fc1895-4b60-42bb-9d04-26a9dd1a1904)





## Deployment on Render

### Step 1: Prepare Your React App

1. **Build Your React App**:
   First, ensure your React app is ready for production. You can do this by running the build command in your project directory:
   ```bash
   npm run build
   ```

### Step 2: Create a New Web Service on Render

1. **Sign Up / Log In to Render**:
   Go to [Render](https://render.com/) and sign up for an account or log in if you already have one.

2. **Create a New Web Service**:
   - Click on the **New** button in the top right corner.
   - Select **Web Service**.

3. **Connect Your Repository**:
   - Choose the repository where your React app is hosted (e.g., GitHub, GitLab, or Bitbucket).
   - Authorize Render to access your repository if prompted.

4. **Configure Your Service and host the backend first**:
   - **Name**: Give your service a name.
   - **Branch**: Select the branch you want to deploy (usually `main` or `master`).
   - **Root Directory**: Set it to Frontend.
   - **Build Command**: Set the build command to:
     ```bash
     npm run build
     ```
   
     Then set the start command to:
     ```bash
     npm start
     ```
   - **Environment**: Choose `Node` as the environment.

5. **Set Environment Variables** (if needed):
   If your app requires any environment variables (like API keys), you can set them in the **Environment** section.

6. **Select a Plan**:
   Choose a plan that suits your needs. Render offers a free tier for static sites.

7. **Create the Service**:
   Click on the **Create Web Service** button to deploy your app.
### Step 2.1 : Create a static application
**Configure Your Service and host the backend first**:
   - **Name**: Give your service a name.
   - **Branch**: Select the branch you want to deploy (usually `main` or `master`).
   - **Root Directory**: Set it to Backend.
   - **Build Command**: Set the build command to:
     ```bash
     npm run build
     ```
   
     Change directory to:
     ```bash
     dist
     ```
   - **Environment**: Choose `Node` as the environment.

5. **Set Environment Variables** (if needed):
   If your app requires any environment variables (like VITE_URL = backend render link), you can set them in the **Environment** section.

6. **Select a Plan**:
   Choose a plan that suits your needs. Render offers a free tier for static sites.

7. **Create the Service**:
   Click on the **Create Web Service** button to deploy your app.


### Step 3: Access Your Deployed App

- After a few moments, Render will build and deploy your app. You can view the deployment logs to see the progress.
- Once the deployment is complete, Render will provide you with a URL where your app is hosted. You can access your React app using this URL.

### Step 4: Update Your App

Whenever you make changes to your React app and push them to the connected repository, Render will automatically rebuild and redeploy your app.

## Usage
### User Registration:
- Create an account with your email and password.
- Login and start browsing the menu.

### Place an Order:
- Add items to your cart, select quantities, and choose customizations.
- Proceed to checkout to complete your payment.
