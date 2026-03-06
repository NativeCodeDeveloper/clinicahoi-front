import { NextResponse, type NextRequest } from 'next/server'

// Middleware sin lógica: permite el acceso y mantiene matcher para dashboard.
export default function middleware(_req: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
