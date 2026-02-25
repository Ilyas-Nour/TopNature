import { auth } from "@/auth"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isLoginPage = req.nextUrl.pathname === '/admin/login'

    // If trying to access protected /admin routes without a session
    if (!isLoggedIn && !isLoginPage) {
        return Response.redirect(new URL('/admin/login', req.nextUrl))
    }

    // If already logged in and visiting the login page
    if (isLoggedIn && isLoginPage) {
        return Response.redirect(new URL('/admin', req.nextUrl))
    }
})

// Matcher intercepts any request going to /admin paths exactly as requested
export const config = {
    matcher: ['/admin/:path*']
}
