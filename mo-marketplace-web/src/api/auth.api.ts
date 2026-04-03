import apiClient from "./axios.client";
import type { LoginRequest, LoginResponse, User } from "../types";

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>("/auth/login", data);
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<User>("/auth/profile");
    return response.data;
  },
};
