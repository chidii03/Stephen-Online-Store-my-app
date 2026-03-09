import type { Metadata } from "next";
import { Geist, Geist_Mono, Merienda, Unbounded } from "next/font/google";
import "./globals.css";
import WhatsAppFloat from "@/app/Components/WhatsAppFloat";
import Navbar from "./Components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Components/Footer/Footer";
import ScrollToTop from "./Components/ScrollToTop";
import Script from "next/script"; 

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
        className={`${geistSans.variable} ${geistMono.variable} ${unbounded.variable} ${merienda.variable} antialiased`}
      >
        {/* TikTok Pixel Integration */}
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
              var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
              ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

              ttq.load('D6HHBVJC77U7C65PCLTG');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>

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
