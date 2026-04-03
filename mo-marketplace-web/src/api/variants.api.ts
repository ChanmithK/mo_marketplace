import apiClient from "./axios.client";
import type {
  Variant,
  CreateVariantRequest,
  UpdateVariantRequest,
  QuickBuyRequest,
  QuickBuyResponse,
} from "../types";

export const variantsApi = {
  create: async (
    productId: string,
    data: CreateVariantRequest,
  ): Promise<Variant> => {
    const response = await apiClient.post<Variant>(
      `/products/${productId}/variants`,
      data,
    );
    return response.data;
  },

  getByProduct: async (productId: string): Promise<Variant[]> => {
    const response = await apiClient.get<Variant[]>(
      `/products/${productId}/variants`,
    );
    return response.data;
  },

  getById: async (id: string): Promise<Variant> => {
    const response = await apiClient.get<Variant>(`/variants/${id}`);
    return response.data;
  },

  update: async (id: string, data: UpdateVariantRequest): Promise<Variant> => {
    const response = await apiClient.patch<Variant>(`/variants/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/variants/${id}`);
  },

  quickBuy: async (data: QuickBuyRequest): Promise<QuickBuyResponse> => {
    const response = await apiClient.post<QuickBuyResponse>(
      "/products/quick-buy",
      data,
    );
    return response.data;
  },
};
