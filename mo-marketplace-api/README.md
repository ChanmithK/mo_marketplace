# MO Marketplace API

NestJS backend API for MO Marketplace technical assessment.

## Features

- **JWT Authentication** - Secure token-based authentication
- **Product Management** - Full CRUD operations for products
- **Variant Management** - Product variants with automatic combination_key generation
- **Duplicate Prevention** - Unique constraint on variant combinations
- **Swagger Documentation** - Interactive API documentation
- **DTO Validation** - Comprehensive input validation using class-validator
- **PostgreSQL Database** - Robust data persistence with TypeORM

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT (Passport)
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI

## Prerequisites

- Node.js v20+
- npm v9+ or pnpm v8+
- PostgreSQL 15+

## Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Setup environment variables:**
   Create a `.env` file in the root directory:

```env
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=mo_marketplace
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRATION=1d
PORT=3000
```

3. **Setup PostgreSQL database:**

```bash
# Create database
createdb mo_marketplace

# Or using Docker
docker run --name mo-marketplace-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=mo_marketplace \
  -p 5432:5432 \
  -d postgres:15
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod

# Debug mode
npm run start:debug
```

The application will start on `http://localhost:3000`

## API Documentation

Swagger UI is available at: `http://localhost:3000/api`

### Authentication Endpoints

#### POST /auth/login

Login user and get JWT token

```json
{
  "email": "admin@mo-marketplace.com",
  "password": "password123"
}
```

Response:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "email": "admin@mo-marketplace.com",
    "name": "Admin User"
  }
}
```

#### GET /auth/profile

Get current user profile (Requires JWT)

### Product Endpoints

#### POST /products

Create a new product (Requires JWT)

```json
{
  "name": "T-Shirt Premium",
  "description": "High quality cotton t-shirt",
  "basePrice": 29.99
}
```

#### GET /products

Get all products (public)

#### GET /products/:id

Get a single product by ID (public)

#### PATCH /products/:id

Update a product (Requires JWT)

#### DELETE /products/:id

Delete a product (Requires JWT)

#### POST /products/quick-buy

Quick buy endpoint

```json
{
  "productId": "uuid",
  "variantId": "uuid",
  "quantity": 1
}
```

Response:

```json
{
  "success": true
}
```

### Variant Endpoints

#### POST /products/:productId/variants

Create a variant for a product (Requires JWT)

```json
{
  "color": "Red",
  "size": "M",
  "material": "Cotton",
  "stock": 100,
  "price": 34.99
}
```

Generates combination_key automatically: `red-m-cotton`

#### GET /products/:productId/variants

Get all variants for a product

#### GET /variants/:id

Get a single variant by ID

#### PATCH /variants/:id

Update a variant (Requires JWT)

#### DELETE /variants/:id

Delete a variant (Requires JWT)

## Database Schema

### Product Entity

```typescript
{
  id: string (UUID)
  name: string
  description?: string
  basePrice: decimal
  createdAt: timestamp
  updatedAt: timestamp
  variants: Variant[]
}
```

### Variant Entity

```typescript
{
  id: string (UUID)
  productId: string (UUID)
  color: string
  size: string
  material: string
  stock: number
  price?: decimal
  combinationKey: string (UNIQUE)
  createdAt: timestamp
  updatedAt: timestamp
}
```

## Edge Cases Handled

### Backend

- ✅ Duplicate variant combinations → 409 Conflict error
- ✅ Out-of-stock variants → Stock validation
- ✅ Invalid inputs → 400 Bad request with validation errors
- ✅ Missing JWT → 401 Unauthorized
- ✅ Invalid JWT → 401 Unauthorized
- ✅ Non-existent resources → 404 Not Found

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Default Test Credentials

Email: `admin@mo-marketplace.com`
Password: `password123`

## Project Structure

```
src/
├── auth/                  # Authentication module
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── strategies/
│   │   └── jwt.strategy.ts
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   └── dto/
│       ├── login.dto.ts
│       └── user.dto.ts
├── products/              # Products module
│   ├── products.controller.ts
│   ├── products.service.ts
│   ├── products.module.ts
│   └── dto/
│       ├── create-product.dto.ts
│       ├── update-product.dto.ts
│       ├── product-response.dto.ts
│       └── quick-buy.dto.ts
├── variants/              # Variants module
│   ├── variants.controller.ts
│   ├── variants.service.ts
│   ├── variants.module.ts
│   └── dto/
│       ├── create-variant.dto.ts
│       ├── update-variant.dto.ts
│       └── variant-response.dto.ts
├── entities/              # TypeORM entities
│   ├── product.entity.ts
│   └── variant.entity.ts
├── common/                # Shared utilities
│   ├── filters/
│   ├── interceptors/
│   ├── utils/
│   └── decorators/
├── config/                # Configuration
│   └── database.config.ts
├── app.module.ts
└── main.ts
```

## Key Implementation Details

### Combination Key Generation

- Format: `${color}-${size}-${material}` (all lowercase)
- Example: `"Red-M-Cotton"` → `"red-m-cotton"`
- Unique constraint enforced at database level
- Automatic duplicate detection returns 409 Conflict

### JWT Strategy

- Token expiration: 1 day (configurable)
- Bearer token authentication
- Passport JWT strategy
- Mock user database for demo purposes

### Validation

- DTO validation on all endpoints
- class-validator decorators
- Whitelist enabled (forbids non-whitelisted properties)
- Automatic transformation

## License

UNLICENSED
