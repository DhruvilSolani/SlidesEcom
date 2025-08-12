# SlideEase - E-commerce Platform
ADMIN PASSWORD
admin@slideease.com
admin123
A full-stack e-commerce web application specialized in selling sliders, slippers, and sandals.

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Context API for state management
- Axios for API calls

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT authentication with bcrypt
- CORS enabled

## Features

### User Features
- Browse products by category (sliders, slippers, sandals)
- Search and filter products
- User authentication (register/login)
- Shopping cart management
- Product detail pages

### Admin Features
- Add, edit, delete products
- View all users
- Manage product inventory

## Project Structure

```
SlideEase/
├── client/          # React frontend
├── server/          # Node.js backend
└── README.md
```

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)

### Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
npm start
```

### Default Admin Account
Create an admin user by registering normally, then update the user's role to 'admin' in MongoDB.

## API Endpoints

### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login

### Products
- GET `/api/products` - Get all products (with filters)
- GET `/api/products/:id` - Get single product
- POST `/api/products` - Add product (admin only)
- PUT `/api/products/:id` - Update product (admin only)
- DELETE `/api/products/:id` - Delete product (admin only)

### Cart
- GET `/api/cart` - Get user's cart
- POST `/api/cart/add` - Add item to cart
- PUT `/api/cart/update` - Update cart item quantity
- DELETE `/api/cart/remove` - Remove item from cart

### Users
- GET `/api/users` - Get all users (admin only)
- PUT `/api/users/:id/role` - Update user role (admin only)

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `build`

### Backend (Render/Railway)
1. Connect your GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/slideease
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```


## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
