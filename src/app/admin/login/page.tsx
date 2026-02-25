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
        <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-6 lg:p-12 font-inter">
            <div className="w-full max-w-md space-y-12">
                <div className="text-center space-y-4">
                    <span className="text-4xl font-serif text-black font-bold tracking-tight">TopNature</span>
                    <h1 className="text-xs uppercase tracking-[0.4em] font-bold text-muted-foreground mt-8">Administrative Gateway</h1>
                </div>

                <div className="bg-white rounded-[2.5rem] p-12 shadow-sm border border-gray-100">
                    <form action={handleLogin} className="space-y-10">
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Secure Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="admin@animy.com"
                                    className="w-full px-8 py-5 rounded-full bg-[#FAFAFA] border-transparent focus:bg-white focus:border-black outline-none transition-all text-sm font-medium"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Access Token</label>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full px-8 py-5 rounded-full bg-[#FAFAFA] border-transparent focus:bg-white focus:border-black outline-none transition-all text-sm font-medium"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-6 px-10 bg-black hover:bg-gray-800 text-white text-[11px] font-bold uppercase tracking-widest rounded-full transition-all active:scale-[0.98] shadow-lg shadow-black/10"
                        >
                            Establish Connection
                        </button>
                    </form>
                </div>

                <p className="text-center text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60">
                    Encrypted Session • TopNature Systems v2.0
                </p>
            </div>
        </div>
    )
}
