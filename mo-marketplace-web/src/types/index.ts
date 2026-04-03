export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  basePrice: number;
  createdAt: string;
  updatedAt: string;
  variants?: Variant[];
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  basePrice: number;
}

export interface Variant {
  id: string;
  productId: string;
  color: string;
  size: string;
  material: string;
  stock: number;
  price?: number | null;
  combinationKey: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVariantRequest {
  color: string;
  size: string;
  material: string;
  stock: number;
  price?: number;
}

export interface UpdateVariantRequest {
  color?: string;
  size?: string;
  material?: string;
  stock?: number;
  price?: number;
}

export interface QuickBuyRequest {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface QuickBuyResponse {
  success: boolean;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}
