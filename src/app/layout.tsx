import "./globals.css";
import Link from "next/link";
import CookieBanner from "./components/CookieBanner";
import GoogleAnalytics from "./components/GoogleAnalytics"; // You need to import the component

import type { Metadata } from "next";

// --- Replace Geist with a Google Font like Inter ---
import { Inter } from 'next/font/google';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});
// --------------------------------------------------

export const metadata: Metadata = {
  title: "Resume Builder",
  description: "Create your Resume/CV for free",
  authors: [{ name: "Helmar Baechle" }],
  openGraph: {
    title: "Resume Builder",
    description: "Create your Resume/CV for free",
    url: "https://resume-vibes.web.app",
    siteName: "Resume Builder",
    images: [
      {
        url: "https://resume-vibes.web.app/resume.png", // Updated to absolute URL
        width: 1200,
        height: 630,
        alt: "Resume Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Builder",
    description: "Create your Resume/CV for free",
    images: ["https://resume-vibes.web.app/resume.png"], // Updated to absolute URL
    creator: "@helmarbaechle",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <html lang="en">
      {/* Apply the Inter font to the entire body */}
      <body className={`${inter.className} antialiased flex flex-col min-h-screen`}>
        <GoogleAnalytics GA_MEASUREMENT_ID='G-9YDL5J7ZVQ'/> 

        
        <main className="flex-grow">{children}</main>
         <footer className="bg-gray-900 text-white text-center py-6">
          <p className="mb-3 text-sm">
            &copy; {new Date().getFullYear()} | Built by{" "}
            <a
              href="https://uspekhi.web.app"
              target="_blank"
              rel="noopener"
              aria-label="USPEKHI Web Design"
              className="font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
              USPEKHI
            </a>
          </p>

          <nav className="space-x-4">
            <Link
              href="/"
              className="hover:underline hover:text-blue-300 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/contact"
              className="hover:underline hover:text-blue-300 transition-colors"
            >
              Contact
            </Link>
          </nav>
        </footer>
          <CookieBanner />
      </body>
    </html>
  );
}