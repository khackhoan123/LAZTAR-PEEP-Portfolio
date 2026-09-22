import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LAZTAR CONSTRUCTION | Giải Pháp Kiến Trúc & Thi Công Chuẩn Mực",
  description: "Trang giới thiệu năng lực thi công, quy hoạch công trình và dự án tiêu biểu của Laztar Construction.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="dark h-full antialiased selection:bg-amber-500/30 selection:text-amber-200">
      <body className="min-h-full bg-[#08090b] text-[#e2e8f0] overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
