import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from '@/components/Shared/SessionProviderWrapper';
import Navbar from "@/components/Ui/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Ui/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mic of Mithila - Open Mic Platform in Madhubani, Bihar",
  description: "MIC of Mithila is a platform based in Madhubani, Bihar, that provides an open mic stage for artists and talented individuals. It serves as a creative space for people to showcase their skills in poetry, storytelling, singing, stand-up comedy, and other performing arts.",
  icons: {
    icon: "/icon.png",             // Main icon (used by Android, browsers)
    shortcut: "/favicon.ico",      // Legacy browsers
    apple: "/apple-icon.png",      // Apple Touch devices
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProviderWrapper>
          <Navbar />
          {children}
          <Footer />
        </SessionProviderWrapper>
        <Toaster position="bottom-center" reverseOrder={true} />
      </body>
    </html>
  );
}
