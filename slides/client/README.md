# SlideEase Frontend

React TypeScript frontend for the SlideEase e-commerce platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
# Create .env in client root
REACT_APP_API_URL=http://localhost:5000/api
```

3. Start the development server:
```bash
npm start
```

## Features

### User Features
- **Home Page**: Hero section, category navigation, featured products
- **Product Listing**: Search, filter by category/brand/price
- **Product Detail**: Full product info, add to cart with quantity
- **Shopping Cart**: View items, update quantities, remove items
- **Authentication**: Register and login functionality

### Admin Features
- **Product Management**: Add, edit, delete products
- **User Management**: View all registered users
- **Inventory Control**: Manage stock levels

## Components

### Pages
- `Home` - Landing page with hero and featured products
- `Products` - Product listing with filters
- `ProductDetail` - Individual product page
- `Cart` - Shopping cart management
- `Login/Register` - Authentication pages
- `Admin` - Admin panel for product/user management

### Components
- `Navbar` - Navigation with cart count and user status
- `ProductCard` - Reusable product display component

### Context
- `AuthContext` - User authentication state
- `CartContext` - Shopping cart state management

## Styling

- **Tailwind CSS** for utility-first styling
- **Responsive Design** with mobile-first approach
- **Custom Color Scheme** with primary blue theme

## State Management

- **React Context API** for global state
- **Local Storage** for JWT token persistence
- **Axios Interceptors** for automatic token attachment

## Build & Deploy

```bash
# Build for production
npm run build

# Deploy to Vercel
# Connect GitHub repo to Vercel dashboard
```