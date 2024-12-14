import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Check which portal is being accessed
  const isAdminPortal = path.startsWith('/Admin');
  const isSellerPortal = path.startsWith('/Seller');
  
  // Strip the portal prefix for easier path matching
  const strippedPath = isAdminPortal 
    ? path.replace('/Admin', '') 
    : path.replace('/Seller', '');

  // Define public paths for each portal
  const publicPaths = [
    '/login',
    '/signup',
    '/forgot-password',
    '/signup/signup-mobile'
  ];

  const isPublicPath = publicPaths.includes(strippedPath);

  // Get the appropriate token based on portal type
  const adminToken = request.cookies.get('admin_token')?.value || '';
  const sellerToken = request.cookies.get('seller_token')?.value || '';
  
  // Determine which token to use
  const token = isAdminPortal ? adminToken : sellerToken;

  // Handle root path
  if (path === '/') {
    return NextResponse.next();
  }

  // Redirect authenticated users trying to access public pages
  if (isPublicPath && token) {
    const portalPrefix = isAdminPortal ? '/Admin' : '/Seller';
    return NextResponse.redirect(new URL(`${portalPrefix}/dashboard`, request.url));
  }

  // Redirect unauthenticated users trying to access protected pages
  if (!isPublicPath && !token) {
    const portalPrefix = isAdminPortal ? '/Admin' : '/Seller';
    return NextResponse.redirect(new URL(`${portalPrefix}/login`, request.url));
  }

  return NextResponse.next();
}

// Updated matcher configuration to include both portals
export const config = {
  matcher: [
    // Admin Portal routes
    '/Admin/dashboard/:path*',
    '/Admin/products/:path*',
    '/Admin/product-categories/:path*',
    '/Admin/Sellers/:path*',
    '/Admin/analytics/:path*',
    '/Admin/reports/:path*',
    '/Admin/settings/:path*',
    '/Admin/login',
    '/Admin/signup',
    '/Admin/forgot-password',
    '/Admin/signup/signup-mobile',

    // Seller Portal routes
    '/Seller/dashboard/:path*',
    '/Seller/products/:path*',
    '/Seller/product-categories/:path*',
    '/Seller/Sellers/:path*',
    '/Seller/analytics/:path*',
    '/Seller/reports/:path*',
    '/Seller/settings/:path*',
    '/Seller/login',
    '/Seller/signup',
    '/Seller/forgot-password',
    '/Seller/signup/signup-mobile',
  ]
};