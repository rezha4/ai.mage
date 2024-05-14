import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

export const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "AI.mage",
  description: "Transform your images with the magic of AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          rubik.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
