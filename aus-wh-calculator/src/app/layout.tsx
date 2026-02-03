import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script"; // Import Script component
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "호주 워홀 생존 계산기",
  description: "총 예산과 주당 비용으로 호주에서 얼마나 버틸 수 있는지 계산해보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4369552082623327"
          crossOrigin="anonymous"
          strategy="beforeInteractive" // Changed strategy for AdSense verification
        />
        {children}
      </body>
    </html>
  );
}
