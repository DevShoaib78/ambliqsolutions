import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/motion/LenisProvider";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ambliq Solutions",
  description: "Ambliq Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
