import type { Metadata } from "next";
import { Geist, Geist_Mono, Merienda, Unbounded } from "next/font/google";
import "./globals.css";
import WhatsAppFloat from "@/app/Components/WhatsAppFloat";
import Navbar from "./Components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Components/Footer/Footer";
import ScrollToTop from "./Components/ScrollToTop";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  display: "swap",
});

const merienda = Merienda({
  variable: "--font-merienda",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Steve Obizz Store | Online Shopping for Stationery, Office Supplies & Gifts",
    template: "%s | Steve OBizz Store",
  },
    icons: {
    icon: "/favicon.ico",
  },

  description: "Shop premium office supplies, school stationery, art materials, and corporate gifts at the best prices in Nigeria. Fast delivery to your doorstep.",
  keywords: [
    "Stationery Store Lagos",
    "Office Supplies Nigeria",
    "School Supplies Online",
    "Corporate Gifts Ikeja",
    "Art Materials Shop",
    "Steve O'Bizz",
    "Buy Paper Online",
    "Office Equipment",
  ],
  authors: [{ name: "Steve O'Bizz Team" }],
  creator: "Steve O'Bizz Store",
  publisher: "Steve O'Bizz Store",
  
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://steveobizzstore.vercel.app",
    title: "Steve Obizz Store | Online Shopping for Stationery, Office Supplies & Gifts",
    description: "Shop premium office supplies, school stationery, art materials, and corporate gifts at the best prices in Nigeria.",
    siteName: "Steve O'Bizz Store",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${unbounded.variable} ${merienda.variable}`}
      >
        <Navbar />
        {children}
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <WhatsAppFloat />
        <ScrollToTop />
      </body>
    </html>
  );
}
