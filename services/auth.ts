// services/auth.ts
import { cookieUtils } from '../utils/cookies';

interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    // other user properties
  };
}

export const authService = {
  // Admin Login
  async adminLogin(email: string, password: string) {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save token in cookie
      cookieUtils.setAdminToken(data.token);

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Seller Login
  async sellerLogin(email: string, password: string) {
    try {
      const response = await fetch('/api/seller/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save token in cookie
      cookieUtils.setSellerToken(data.token);

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Logout handlers
  adminLogout() {
    cookieUtils.removeAdminToken();
    // Additional cleanup if needed
  },

  sellerLogout() {
    cookieUtils.removeSellerToken();
    // Additional cleanup if needed
  }
};