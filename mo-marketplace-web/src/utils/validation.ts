import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const variantSchema = z.object({
  color: z.string().min(1, "Color is required"),
  size: z.string().min(1, "Size is required"),
  material: z.string().min(1, "Material is required"),
  stock: z.number().int().nonnegative("Stock must be non-negative"),
  price: z.number().positive().optional(),
});

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  basePrice: z.number().positive("Base price must be positive"),
  variants: z.array(variantSchema).optional(),
});

export const quickBuySchema = z.object({
  productId: z.string().uuid("Invalid product ID"),
  variantId: z.string().uuid("Invalid variant ID"),
  quantity: z.number().int().positive("Quantity must be at least 1"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type ProductFormData = z.infer<typeof productSchema>;
export type VariantFormData = z.infer<typeof variantSchema>;
export type QuickBuyFormData = z.infer<typeof quickBuySchema>;
