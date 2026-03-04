import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to handle payment gateway redirects.
 * 
 * Payment gateways like PayU often redirect back to the application using a POST request
 * containing transaction details. Next.js App Router pages return a 405 Method Not Allowed
 * for POST requests to page routes.
 * 
 * This middleware intercepts POST requests to the success and failure pages and 
 * redirects them to the same URL using a 303 See Other status, which forces 
 * the browser to perform a GET request.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is a POST request to our payment result pages
  if (request.method === 'POST') {
    if (pathname === '/payment/success' || pathname === '/payment/failure') {
      // Create the target URL (maintaining any query params if present)
      const url = request.nextUrl.clone();
      
      // Use 303 redirect to force the method to GET
      return NextResponse.redirect(url, 303);
    }
  }

  return NextResponse.next();
}

// Only run middleware on the payment result routes to keep performance high
export const config = {
  matcher: ['/payment/success', '/payment/failure'],
};
