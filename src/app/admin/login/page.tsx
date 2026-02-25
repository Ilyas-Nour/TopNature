import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { Lock } from 'lucide-react'

export const metadata = {
    title: 'Admin Login | EcomStore',
}

export default function AdminLoginPage() {
    const handleLogin = async (formData: FormData) => {
        "use server"
        try {
            await signIn("credentials", formData, { redirectTo: "/admin" })
        } catch (error) {
            if (error instanceof AuthError) {
                // Fallback for Auth failures (will not execute on success due to Next.js redirect throw behavior)
            }
            // Auth.js requires re-throwing the `Redirect` error to actually navigate naturally
            throw error
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <div className="flex justify-center mb-8">
                    <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                        <Lock className="h-6 w-6" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-slate-900 text-center mb-2">Admin Portal</h1>
                <p className="text-slate-500 text-center mb-8">Enter your credentials to access the dashboard</p>

                <form action={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                        <input
                            name="email"
                            type="email"
                            required
                            placeholder="admin@animy.com"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-blue-600 outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-blue-600 outline-none transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-sm"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}
