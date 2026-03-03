import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css"; // ✅ MOST IMPORTANT (TAILWIND FIX)

export const metadata: Metadata = {
  title: "Scam Detector AI - Check Messages Instantly",
  description:
    "Detect scam, OTP fraud, phishing messages instantly using AI. Free scam checker tool.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        {children}

        {/* 🔥 Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXX');
          `}
        </Script>

      </body>
    </html>
  );
}