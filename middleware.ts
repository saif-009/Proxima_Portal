import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Check which portal is being accessed
  const isAdminPortal = path.startsWith('/admin');
  const isSellerPortal = path.startsWith('/seller');
  
  // Strip the portal prefix for easier path matching
  const strippedPath = isAdminPortal 
    ? path.replace('/admin', '') 
    : path.replace('/seller', '');

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
    const portalPrefix = isAdminPortal ? '/admin' : '/seller';
    return NextResponse.redirect(new URL(`${portalPrefix}/dashboard`, request.url));
  }

  // Redirect unauthenticated users trying to access protected pages
  if (!isPublicPath && !token) {
    const portalPrefix = isAdminPortal ? '/admin' : '/seller';
    return NextResponse.redirect(new URL(`${portalPrefix}/login`, request.url));
  }

  return NextResponse.next();
}

// Updated matcher configuration to include both portals
export const config = {
  matcher: [
    // Admin Portal routes
    '/admin/dashboard/:path*',
    '/admin/products/:path*',
    '/admin/product-categories/:path*',
    '/admin/Sellers/:path*',
    '/admin/analytics/:path*',
    '/admin/reports/:path*',
    '/admin/settings/:path*',
    '/admin/login',
    '/admin/signup',
    '/admin/forgot-password',
    '/admin/signup/signup-mobile',

    // Seller Portal routes
    '/seller/dashboard/:path*',
    '/seller/products/:path*',
    '/seller/product-categories/:path*',
    '/seller/Sellers/:path*',
    '/seller/analytics/:path*',
    '/seller/reports/:path*',
    '/seller/settings/:path*',
    '/seller/login',
    '/seller/signup',
    '/seller/forgot-password',
    '/seller/signup/signup-mobile',
  ]
};