# SlideEase Backend

Node.js/Express backend for the SlideEase e-commerce platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update .env with your values:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/slideease
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

## API Documentation

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Product Routes
- `GET /api/products` - Get all products (supports query filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart Routes
- `GET /api/cart` - Get user's cart items
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove` - Remove item from cart

### User Routes
- `GET /api/users` - Get all users (admin only)
- `PUT /api/users/:id/role` - Update user role (admin only)

## Database Models

### User
- name: String (required)
- email: String (required, unique)
- password: String (required, hashed)
- role: String (enum: 'user', 'admin', default: 'user')

### Product
- title: String (required)
- description: String (required)
- category: String (enum: 'slider', 'slipper', 'sandal', required)
- price: Number (required)
- mrp: Number (required)
- brand: String (required)
- stock: Number (required, default: 0)
- image: String (required)

### CartItem
- userId: ObjectId (ref: User, required)
- productId: ObjectId (ref: Product, required)
- quantity: Number (required, default: 1)