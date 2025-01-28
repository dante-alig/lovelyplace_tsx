import React from 'react';

const BASE_URL = "https://site--back-lovelyplace-main--dqd24mcv82s5.code.run";

interface AuthResponse {
  token: string;
  message?: string;
}

export const signup = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data: AuthResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erreur lors de l'inscription");
    }

    if (data.token) {
      localStorage.setItem("userToken", data.token);
    }

    return data;
  } catch (error) {
    console.error("Erreur signup:", error);
    throw error;
  }
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data: AuthResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erreur lors de la connexion");
    }

    if (data.token) {
      localStorage.setItem("userToken", data.token);
    }

    return data;
  } catch (error) {
    console.error("Erreur login:", error);
    throw error;
  }
};

export const logout = (): void => {
  localStorage.removeItem("userToken");
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("userToken");
  return !!token;
};

export const getToken = (): string | null => {
  return localStorage.getItem("userToken");
};
