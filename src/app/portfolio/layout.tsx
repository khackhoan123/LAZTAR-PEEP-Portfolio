import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://laztar-peep-portfolio.vercel.app"),
  title: "Tạ Khắc Khoan | Full-Stack Developer Portfolio",
  description:
    "Hồ sơ năng lực cá nhân, kỹ năng chuyên môn (Next.js, Three.js, NestJS) và các dự án thực chiến tại Laztar.",
  openGraph: {
    title: "Tạ Khắc Khoan | Full-Stack Developer Portfolio",
    description:
      "Hồ sơ năng lực cá nhân, kỹ năng chuyên môn (Next.js, Three.js, NestJS) và các dự án thực chiến tại Laztar.",
    url: "https://laztar-peep-portfolio.vercel.app/portfolio",
    siteName: "Tạ Khắc Khoan Portfolio",
    type: "website",
    locale: "vi_VN",
    images: [
      {
        url: "/images/avatar.jpg",
        width: 800,
        height: 1000,
        alt: "Tạ Khắc Khoan - Full-Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tạ Khắc Khoan | Full-Stack Developer Portfolio",
    description:
      "Hồ sơ năng lực cá nhân, kỹ năng chuyên môn (Next.js, Three.js, NestJS) và các dự án thực chiến tại Laztar.",
    images: ["/images/avatar.jpg"],
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
