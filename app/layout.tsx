import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scam Shield AI",
  description: "AI-powered scam detection app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white">
        {children}
      </body>
    </html>
  );
}