import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/providers/lenis-provider";
import { FloatingWhatsAppButton } from "@/components/ui/floating-whatsapp";
import { Navbar } from "@/components/shared/navbar";
import { MobileTabBar } from "@/components/shared/mobile-tab-bar";
import { Footer } from "@/components/shared/footer";
import { ScrollToTop } from "@/components/shared/scroll-to-top";
import { PageTransition } from "@/components/shared/page-transition";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Top Nature | Premium Wellness Simplified",
  description: "Highest-grade natural supplements for energy, sleep, and focus. Pure, lab-tested, and effective.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${outfit.variable} antialiased`}
        suppressHydrationWarning
      >
        <Navbar />
        <MobileTabBar />
        <LenisProvider>
          <ScrollToTop />
          <main className="pb-20 md:pb-0 min-h-screen">
            <PageTransition>
              {children}
            </PageTransition>
            <Footer />
          </main>
          <FloatingWhatsAppButton />
        </LenisProvider>
      </body>
    </html>
  );
}
