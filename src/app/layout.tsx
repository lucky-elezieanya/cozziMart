
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { CartProvider } from "@/components/context/CartContext";
import ScrollTop from "@/components/sections/ScrollTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CozziMart Ecommerce Store",
  description: "Welcome to CozziMart, your one-stop shop for all your needs!",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col">
        <CartProvider>
          <div className="relative w-full">
            <Navbar />
          </div>

          <main className="relative w-full flex-1">
            {children}
          </main>
          <ScrollTop/>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}