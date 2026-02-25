import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Hardcoded admin check as requested
                if (credentials?.email === "admin@animy.com" && credentials?.password === "admin") {
                    return { id: "1", name: "Admin", email: "admin@animy.com" }
                }
                return null
            }
        })
    ],
    pages: {
        signIn: '/admin/login',
    },
    secret: process.env.AUTH_SECRET || "development_secret_super_secure_123",
})
