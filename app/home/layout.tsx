import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "../footer/page";
import "../globals.css";
import Navbar from "../navbar/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "User Area",
  description: "User-facing pages.",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main className="min-h-screen pt-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
