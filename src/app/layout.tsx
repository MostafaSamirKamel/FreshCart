import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/Styles/globals.css";
import Navbar from "@/Components/Shared/Navbar";
import Footer from "@/Components/Shared/Footer";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReduxProvider from "@/Store/Provider";
import AuthCheck from "@/Components/Auth/AuthCheck";
config.autoAddCss = false;
import favicon from "@/assets/images/mini-logo.png";

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
    default: "FreshCart | Mostafa Samir",
    template: "%s | FreshCart",
  },
  description:
    "Shop the freshest groceries, household essentials, and more at FreshCart. Fast delivery, best prices, and premium quality guaranteed.",
  keywords: ["grocery", "ecommerce", "fresh food", "shopping", "delivery"],
  authors: [{ name: "FreshCart Team" }],
  icons: {
    icon: favicon.src,
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ReduxProvider>
          <AuthCheck>
            <Navbar />
            {children}
            <Footer />
            <ToastContainer />
          </AuthCheck>
        </ReduxProvider>
      </body>
    </html>
  );
}
