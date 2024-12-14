// utils/cookies.ts
import Cookies from 'js-cookie';

const ADMIN_TOKEN_KEY = 'admin_token';
const SELLER_TOKEN_KEY = 'seller_token';

interface TokenOptions {
  expires?: number; // days
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export const cookieUtils = {
  // Set tokens
  setAdminToken: (token: string, options: TokenOptions = {}) => {
    const defaultOptions = {
      expires: 7, // 7 days by default
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const
    };
    
    Cookies.set(ADMIN_TOKEN_KEY, token, {
      ...defaultOptions,
      ...options
    });
  },

  setSellerToken: (token: string, options: TokenOptions = {}) => {
    const defaultOptions = {
      expires: 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const
    };
    
    Cookies.set(SELLER_TOKEN_KEY, token, {
      ...defaultOptions,
      ...options
    });
  },

  // Get tokens
  getAdminToken: () => {
    return Cookies.get(ADMIN_TOKEN_KEY);
  },

  getSellerToken: () => {
    return Cookies.get(SELLER_TOKEN_KEY);
  },

  // Remove tokens
  removeAdminToken: () => {
    Cookies.remove(ADMIN_TOKEN_KEY);
  },

  removeSellerToken: () => {
    Cookies.remove(SELLER_TOKEN_KEY);
  },

  // Clear all tokens
  clearAllTokens: () => {
    Cookies.remove(ADMIN_TOKEN_KEY);
    Cookies.remove(SELLER_TOKEN_KEY);
  }
};