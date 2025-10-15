import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";
import AdminShortcut from "@/components/AdminShortcut";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/auth/Context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mutadeen Foundation",
  description: "Your one-stop solution for all food needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {/* Header is sticky itself, so no need to wrap in a div */}
            <Header />
            {/* Main content should respect header height */}
            <main className="flex-1">{children}</main>
            <Footer />
            <AdminShortcut
              combo="Ctrl+Shift+A"
              route="/admin"
              requirePassword={true}
              password="admin"
            />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
