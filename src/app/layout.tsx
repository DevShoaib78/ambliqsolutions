import { Manrope } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/motion/LenisProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";
import RouteScroll from "@/components/motion/RouteScroll";
import { defaultMetadata, organizationJsonLd, websiteJsonLd, serviceJsonLd, faqJsonLd } from "@/lib/seo";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* Warm up the Calendly connection before the user reaches /book, so the
            booking calendar starts fetching without a DNS + TLS round trip. */}
        <link rel="preconnect" href="https://calendly.com" />
        <link rel="dns-prefetch" href="https://calendly.com" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organizationJsonLd(),
              websiteJsonLd(),
              serviceJsonLd(),
              faqJsonLd(),
            ]),
          }}
        />
        <LenisProvider>
          <Navbar />
          {/* pt-24 clears the fixed navbar; overflow-x-clip stops decorative
              blurs/glows from ever creating a horizontal scrollbar on mobile */}
          <div className="flex-1 flex flex-col pt-24 overflow-x-clip">
            {children}
          </div>
          <Footer />
          <ScrollToTop />
          <RouteScroll />
        </LenisProvider>
      </body>
    </html>
  );
}
