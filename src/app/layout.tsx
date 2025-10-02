import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mess Bazar - Annoor Foods",
  description: "Your one-stop solution for all food needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full flex flex-col bg-gray-800`}
      >
        {/* Header is sticky itself, so no need to wrap in a div */}
        <Header />
        {/* Main content should respect header height */}
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
