import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/motion/LenisProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ambliq Solutions — AI Automation for Service Businesses",
  description:
    "Ambliq Solutions helps service-based businesses capture, qualify, and convert more leads using AI automation. Our AI Voice Agents answer calls 24/7, qualify leads, and book appointments — so you never miss an opportunity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LenisProvider>
          <Navbar />
          {/* pt-24 clears the fixed navbar (pill is ~68px at top-4 = 16px from top) */}
          <div className="flex-1 flex flex-col pt-24">
            {children}
          </div>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
