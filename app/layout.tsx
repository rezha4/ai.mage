import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

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
    <ClerkProvider>
      <html lang="en">
        <body>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
