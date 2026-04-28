import { Geist, Geist_Mono, Neonderthaw } from "next/font/google";
import "./globals.css";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const neonderthaw = Neonderthaw({
  variable: "--font-neonderthaw",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "8 Ball Pool",
  description: "A game of 8 Ball Pool in Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${neonderthaw.variable} h-full antialiased`}>

      <body className="min-h-full bg-[#020308] text-white">

        <div className="relative min-h-screen flex flex-col overflow-hidden">
          {/* Outer Border */}
          <div className="pointer-events-none fixed inset-4 z-50 rounded-[36px] border border-cyan-400/20 shadow-[0_0_40px_rgba(34,211,238,0.08),inset_0_0_60px_rgba(34,211,238,0.04)]" />

          <Navigation />

          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </div>
      </body>

    </html>
  );
}