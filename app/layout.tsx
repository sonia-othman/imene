"use client";
import "./globals.css";
import { Geist, Geist_Mono, Noto_Kufi_Arabic } from "next/font/google";
import { CartProvider } from "./context/CartContext";
import Footer from "./components/Footer";
import "@/app/i18n/client"; // Initialize i18n

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoKufi = Noto_Kufi_Arabic({
  variable: "--font-noto-kufi",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"], 
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoKufi.variable} antialiased`}
      >
        <CartProvider>{children}</CartProvider>
        <Footer />
      </body>
    </html>
  );
}
