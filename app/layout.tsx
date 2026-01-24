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
  title: "Steve O Bizz Store",
  description: "Steve O Bizz Stationery Store",
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
