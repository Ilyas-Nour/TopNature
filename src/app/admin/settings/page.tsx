import React from 'react'
import { Settings as SettingsIcon, Shield, Bell, Database, Globe } from 'lucide-react'

export default function AdminSettingsPage() {
    return (
        <div className="space-y-16 animate-in fade-in duration-700">
            <div>
                <h1 className="text-5xl font-serif font-bold tracking-tight text-black">Settings</h1>
                <p className="text-muted-foreground mt-4 font-medium uppercase tracking-[0.2em] text-[11px]">System Configuration & Preferences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                    { title: 'Store Identity', desc: 'Manage your brand name, logo, and public contact information.', icon: Globe },
                    { title: 'Security & Access', desc: 'Secure your administrative gateway and manage staff permissions.', icon: Shield },
                    { title: 'Notifications', desc: 'Configure system alerts and customer transaction emails.', icon: Bell },
                    { title: 'Data Management', desc: 'Backup your catalog and export transaction records.', icon: Database },
                ].map((setting, i) => (
                    <div key={i} className="p-10 bg-white border border-gray-50 rounded-[2.5rem] shadow-sm hover:border-black/10 transition-all group cursor-pointer">
                        <div className="flex items-start justify-between mb-6">
                            <div className="p-4 bg-[#FAFAFA] rounded-2xl group-hover:bg-black group-hover:text-white transition-all">
                                <setting.icon className="w-6 h-6" strokeWidth={1.5} />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-black mb-2">{setting.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{setting.desc}</p>
                    </div>
                ))}
            </div>

            <div className="p-12 bg-black rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight mb-2">Technical Maintenance</h2>
                    <p className="text-white/60 text-sm max-w-md">Your terminal is currently synchronized with the production database. All changes are immutable once committed.</p>
                </div>
                <button className="px-10 py-5 bg-white text-black rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-gray-100 transition-all active:scale-95">
                    Sync Database
                </button>
            </div>
        </div>
    )
}
