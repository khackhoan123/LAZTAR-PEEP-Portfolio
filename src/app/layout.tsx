import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fontHeading = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const fontBody = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'https://laztar-peep-portfolio.vercel.app')
  ),
  title: "LAZTAR CONSTRUCTION | Giải Pháp Kiến Trúc & Thi Công Chuẩn Mực",
  description: "Trang giới thiệu năng lực thi công, quy hoạch công trình và dự án tiêu biểu của Laztar Construction.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    title: "LAZTAR CONSTRUCTION | Giải Pháp Kiến Trúc & Thi Công Chuẩn Mực",
    description: "Khởi sinh từ tư duy quy hoạch chuẩn mực và kỹ nghệ thi công tinh xảo của Laztar. Mỗi công trình là một biểu tượng trường tồn.",
    siteName: "LAZTAR CONSTRUCTION",
    images: [
      {
        url: "/images/projects/tower.jpg",
        width: 1200,
        height: 630,
        alt: "LAZTAR CONSTRUCTION Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LAZTAR CONSTRUCTION | Giải Pháp Kiến Trúc & Thi Công Chuẩn Mực",
    description: "Trang giới thiệu năng lực thi công, quy hoạch công trình và dự án tiêu biểu của Laztar Construction.",
    images: ["/images/projects/tower.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`dark h-full antialiased selection:bg-amber-500/30 selection:text-amber-200 ${fontHeading.variable} ${fontBody.variable}`}>
      <body className="min-h-full bg-black text-[#e2e8f0] overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
