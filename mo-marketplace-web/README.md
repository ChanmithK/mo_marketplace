# MO Marketplace Web

React + TypeScript frontend for MO Marketplace technical assessment.

## Features

- **Product Management** - Create, view, and manage products
- **Variant Selection** - Interactive variant selector with stock awareness
- **Quick Buy Flow** - Fast checkout for selected variants
- **JWT Authentication** - Secure login and protected routes
- **Form Validation** - Zod schema validation with React Hook Form
- **Responsive Design** - Mobile-friendly UI with Tailwind CSS
- **Real-time Updates** - Dynamic price updates based on variant selection

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Forms**: React Hook Form
- **Validation**: Zod
- **Styling**: Tailwind CSS

## Prerequisites

- Node.js v20+
- npm v9+ or pnpm v8+

## Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Setup environment variables:**
   Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000
```

## Running the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

The application will start on `http://localhost:5173`

## Pages

### Login Page (`/login`)

- User authentication
- JWT token storage
- Redirect to products after login
- Default credentials displayed

### Product List Page (`/products`)

- Display all products in grid layout
- Show product count and variant count
- Navigate to product details
- Create new product button

### Product Create Page (`/products/create`)

- Create new products
- Add multiple variants dynamically
- Real-time combination key preview
- Form validation with Zod
- Variant management (add/remove)

### Product Detail Page (`/products/:id`)

- Product information display
- Interactive variant selector
- Out-of-stock variant disabling
- Price updates based on selection
- Quick Buy functionality

## Components

### UI Components

- `Button` - Reusable button with variants
- `Input` - Form input with error handling
- `Select` - Dropdown select with error handling
- `Modal` - Dialog modal for popups
- `Alert` - Success/error/warning/info alerts
- `LoadingSpinner` - Loading indicator

### Feature Components

- `Navbar` - Navigation bar with auth state
- `VariantSelector` - Variant selection interface
- `QuickBuyModal` - Quick purchase flow

## API Integration

### Axios Client Configuration

- Base URL from environment
- JWT token auto-injection
- Response interceptors for error handling
- Auto-logout on 401

### API Modules

- `auth.api.ts` - Authentication endpoints
- `products.api.ts` - Product CRUD operations
- `variants.api.ts` - Variant management and quick buy

## Authentication Flow

1. User enters credentials on login page
2. POST `/auth/login` → receives JWT token
3. Token stored in localStorage
4. User object stored in AuthContext
5. Protected routes check authentication
6. Token auto-injected in all API requests
7. Auto-logout on token expiration (401)

## Form Validation

### Login Schema

```typescript
{
  email: z.string().email(),
  password: z.string().min(6)
}
```

### Product Schema

```typescript
{
  name: z.string().min(1),
  description: z.string().optional(),
  basePrice: z.number().positive(),
  variants: z.array(variantSchema).optional()
}
```

### Variant Schema

```typescript
{
  color: z.string().min(1),
  size: z.string().min(1),
  material: z.string().min(1),
  stock: z.number().int().nonnegative(),
  price: z.number().positive().optional()
}
```

## State Management

### AuthContext

Global authentication state:

- `user` - Current user object
- `isAuthenticated` - Boolean flag
- `isLoading` - Loading state
- `login()` - Login function
- `logout()` - Logout function

## Edge Cases Handled

### Frontend

- ✅ Duplicate variant combinations → Display error from backend
- ✅ Out-of-stock variants → Disabled selection, visual indicator
- ✅ Invalid inputs → Zod validation before submission
- ✅ JWT missing → Redirect to login
- ✅ JWT invalid → Auto-logout on 401 response
- ✅ Loading states → Spinners during async operations
- ✅ Error states → User-friendly error messages

### Backend Integration

- ✅ 400 Bad Request → Display validation errors
- ✅ 401 Unauthorized → Redirect to login
- ✅ 404 Not Found → Show not found message
- ✅ 409 Conflict → Show duplicate combination error
- ✅ 500 Server Error → Generic error message

## Responsive Design

The application uses Tailwind CSS with responsive breakpoints:

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

Grid layouts adapt to screen size:

- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

## Project Structure

```
src/
├── pages/                 # Page components
│   ├── LoginPage.tsx
│   ├── ProductListPage.tsx
│   ├── ProductCreatePage.tsx
│   └── ProductDetailPage.tsx
├── components/
│   ├── ui/               # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Modal.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── Alert.tsx
│   ├── variant/          # Variant-related components
│   │   ├── VariantSelector.tsx
│   │   └── QuickBuyModal.tsx
│   └── Navbar.tsx        # Navigation bar
├── api/                  # API client and endpoints
│   ├── axios.client.ts
│   ├── auth.api.ts
│   ├── products.api.ts
│   └── variants.api.ts
├── store/                # State management
│   └── AuthContext.tsx
├── types/                # TypeScript types
│   └── index.ts
├── utils/                # Utilities and validation
│   └── validation.ts
├── App.tsx               # Main app component
└── main.tsx              # Entry point
```

## Type Safety

All data structures are fully typed:

- User
- Product
- Variant
- API requests/responses
- Form data

## Quick Start Guide

1. **Start the backend API:**

```bash
cd ../mo-marketplace-api
npm run start:dev
```

2. **Start the frontend:**

```bash
npm run dev
```

3. **Login with default credentials:**

- Email: `admin@mo-marketplace.com`
- Password: `password123`

4. **Create a product:**

- Click "Create New Product"
- Fill in product details
- Add variants with different combinations
- Submit to create

5. **View product details:**

- Click on any product card
- Select a variant
- Click "Quick Buy Now"

6. **Test edge cases:**

- Try creating duplicate variants
- Select out-of-stock variants
- Test invalid form inputs

## Testing Checklist

- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Create product without variants
- [ ] Create product with multiple variants
- [ ] View product list
- [ ] View product details
- [ ] Select variant (in stock)
- [ ] Attempt to select variant (out of stock)
- [ ] Quick buy flow
- [ ] Logout
- [ ] Access protected route without auth
- [ ] Token expiration handling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Code splitting by route
- Lazy loading components
- Axios interceptors for centralized logic
- React.memo for expensive components
- Debounced form inputs (if needed)

## Future Enhancements

- Shopping cart functionality
- Order history
- Product search and filtering
- Image upload for products
- Admin dashboard
- Multi-user support
- Payment integration

## License

UNLICENSED
