import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('------ Middleware Start ------');
  console.log('Request URL:', request.url);
  
  const path = request.nextUrl.pathname;
  console.log('Current path:', path);
  
  // Check which portal is being accessed
  const isAdminPortal = path.startsWith('/Admin');
  const isSellerPortal = path.startsWith('/Seller');
  console.log('Portal type:', isAdminPortal ? 'Admin' : isSellerPortal ? 'Seller' : 'Unknown');
  
  // Strip the portal prefix for easier path matching
  const strippedPath = isAdminPortal 
    ? path.replace('/Admin', '') 
    : path.replace('/Seller', '');
  console.log('Stripped path:', strippedPath);

  // Define public paths for each portal
  const publicPaths = [
    '/login',
    '/signup',
    '/forgot-password',
    '/signup/signup-mobile'
  ];

  const isPublicPath = publicPaths.includes(strippedPath);
  console.log('Is public path:', isPublicPath);

  // Get the appropriate token based on portal type
  const adminToken = request.cookies.get('admin_token')?.value || '';
  const sellerToken = request.cookies.get('seller_token')?.value || '';
  console.log('Admin token exists:', !!adminToken);
  console.log('Seller token exists:', !!sellerToken);
  
  // Determine which token to use
  const token = isAdminPortal ? adminToken : sellerToken;
  console.log('Using token type:', isAdminPortal ? 'admin_token' : 'seller_token');

  // Handle root path
  if (path === '/') {
    console.log('Root path detected, proceeding normally');
    console.log('------ Middleware End ------');
    return NextResponse.next();
  }

  // Redirect authenticated users trying to access public pages
  if (isPublicPath && token) {
    const portalPrefix = isAdminPortal ? '/Admin' : '/Seller';
    const redirectUrl = `${portalPrefix}/dashboard`;
    console.log('Authenticated user attempting to access public page');
    console.log('Redirecting to:', redirectUrl);
    console.log('------ Middleware End ------');
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Redirect unauthenticated users trying to access protected pages
  if (!isPublicPath && !token) {
    const portalPrefix = isAdminPortal ? '/Admin' : '/Seller';
    const redirectUrl = `${portalPrefix}/login`;
    console.log('Unauthenticated user attempting to access protected page');
    console.log('Redirecting to:', redirectUrl);
    console.log('------ Middleware End ------');
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  console.log('Request authorized, proceeding normally');
  console.log('------ Middleware End ------');
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