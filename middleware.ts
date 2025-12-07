import { NextRequest, NextResponse } from 'next/server'

// Rate limiting store (in-memory for demo - use Redis in production)
const rateLimit = new Map<string, { count: number; lastReset: number }>()

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10 // requests per window

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimit.get(ip)
  
  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW) {
    // Reset window
    rateLimit.set(ip, { count: 1, lastReset: now })
    return false
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true
  }
  
  // Increment count
  record.count++
  return false
}

export function middleware(request: NextRequest) {
  // 1. CANONICALIZACIÓN - Force www subdomain
  const hostname = request.headers.get('host')
  if (hostname === 'sellifyworks.com') {
    const url = request.nextUrl.clone()
    url.host = 'www.sellifyworks.com'
    return NextResponse.redirect(url, 301)
  }

  const response = NextResponse.next()
  
  // Get client IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
    request.headers.get('x-real-ip') || 
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  
  // Apply rate limiting to API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    if (isRateLimited(ip)) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests' }),
        { 
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60'
          }
        }
      )
    }
  }
  
  // Security Headers
  const securityHeaders = {
    // Prevent clickjacking attacks
    'X-Frame-Options': 'DENY',
    
    // Prevent MIME type sniffing
    'X-Content-Type-Options': 'nosniff',
    
    // Enable XSS protection
    'X-XSS-Protection': '1; mode=block',
    
    // Control referrer information
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Prevent DNS prefetching
    'X-DNS-Prefetch-Control': 'off',
    
    // Content Security Policy
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com https://googleads.g.doubleclick.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://api.brevo.com https://a.klaviyo.com https://www.google-analytics.com https://analytics.google.com",
      "frame-src 'self' https://www.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; '),
    
    // Strict Transport Security (HSTS) - only for HTTPS
    ...(request.nextUrl.protocol === 'https:' && {
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
    }),
    
    // Permissions Policy
    'Permissions-Policy': [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'browsing-topics=()'
    ].join(', ')
  }
  
  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  
  return response
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|assets|public).*)',
  ],
}