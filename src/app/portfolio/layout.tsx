import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tạ Khắc Khoan | Full-Stack Software Engineer & Korean BrSE',
  description:
    'Hồ sơ năng lực kỹ sư phần mềm Tạ Khắc Khoan (Đại học FPT) — Chuyên sâu Full-stack (Spring Boot, React, Next.js, .NET), Tích hợp AI Đa phương thức & Kỹ sư cầu nối tiếng Hàn (TOPIK 3).',
  keywords: [
    'Tạ Khắc Khoan',
    'Ta Khac Khoan',
    'Portfolio',
    'Full-stack Engineer',
    'Software Engineer',
    'Korean BrSE',
    'Bridge System Engineer',
    'Spring Boot',
    'React',
    'Next.js',
    'AI Multimodal',
  ],
  authors: [{ name: 'Tạ Khắc Khoan', url: 'https://github.com/khackhoan0103' }],
  creator: 'Tạ Khắc Khoan',
  openGraph: {
    type: 'profile',
    locale: 'vi_VN',
    url: '/portfolio',
    title: 'Tạ Khắc Khoan | Full-Stack Software Engineer & Korean BrSE',
    description:
      'Hồ sơ năng lực cá nhân, kỹ năng chuyên môn (Spring Boot, React, Next.js, Three.js) và các dự án thực chiến tích hợp AI.',
    siteName: 'Tạ Khắc Khoan Portfolio',
    images: [
      {
        url: '/images/avatar.jpg',
        width: 800,
        height: 1000,
        alt: 'Tạ Khắc Khoan - Full-Stack Software Engineer & Korean BrSE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tạ Khắc Khoan | Full-Stack Software Engineer & Korean BrSE',
    description:
      'Hồ sơ năng lực cá nhân, kỹ năng chuyên môn (Spring Boot, React, Next.js, Three.js) và các dự án thực chiến tích hợp AI.',
    images: ['/images/avatar.jpg'],
    creator: '@khackhoan0103',
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
