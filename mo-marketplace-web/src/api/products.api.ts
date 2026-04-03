import apiClient from "./axios.client";
import type {
  Product,
  CreateProductRequest,
  Variant,
  CreateVariantRequest,
} from "../types";

export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>("/products");
    return response.data;
  },

  getById: async (id: string): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  create: async (data: CreateProductRequest): Promise<Product> => {
    const response = await apiClient.post<Product>("/products", data);
    return response.data;
  },

  createVariant: async (
    productId: string,
    data: CreateVariantRequest,
  ): Promise<Variant> => {
    const response = await apiClient.post<Variant>(
      `/products/${productId}/variants`,
      data,
    );
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<CreateProductRequest>,
  ): Promise<Product> => {
    const response = await apiClient.patch<Product>(`/products/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  },
};
