'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import {
  Mail,
  Phone,
  MapPin,
  Download,
  ArrowLeft,
  Copy,
  Check,
  Sparkles,
  Cpu,
  Server,
  Layout,
  Cloud,
  GraduationCap,
  Briefcase,
  Languages,
  CheckCircle2,
  ExternalLink,
  ChevronUp,
  FileText,
  Printer,
  X
} from 'lucide-react';
import GlowCursor from '@/components/ui/GlowCursor';

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

// Dynamically import 3D background without SSR (Building GLB is disabled)
const LaztarScene = dynamic(
  () => import('@/components/3d/LaztarScene'),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function PortfolioPage() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState<boolean>(false);

  // Track scroll progress for background wave dynamics
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigator.clipboard.writeText('takhackhoan@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleCopyPhone = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigator.clipboard.writeText('0944183376');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -80; // offset for fixed navbar
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div id="portfolio-page" className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-black text-[#FFF6ED] font-sans selection:bg-[#C88A35]/30 selection:text-[#FFF6ED] tabular-nums lining-nums">
      {/* ========================================================
          1. 3D LIQUID BRONZE BACKGROUND & FORGE SPARKS (MODEL DISABLED)
      ======================================================== */}
      <LaztarScene loadModel={false} scrollProgress={scrollProgress} />

      {/* ========================================================
          2. LUMINOUS GLOW CURSOR (OGL WebGL Shader)
      ======================================================== */}
      <GlowCursor
        color="#C88A35"
        secondaryColor="#FFF6ED"
        trailWidth={6}
        trailLength={36}
        glowIntensity={1.8}
        blendMode="screen"
        idleFade={true}
      />

      {/* Subtle Ambient Vignette Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[2] bg-radial-[circle_at_center,transparent_40%,rgba(0,0,0,0.85)_100%]" />

      {/* ========================================================
          NAVBAR WITH SMOOTH ANCHOR MENU & ACTIONS
      ======================================================== */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 py-3 sm:px-8 backdrop-blur-md bg-black/45 border-b border-white/10 transition-all print:hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 sm:gap-4">

          {/* Left Action: Return to 3D Showroom */}
          <Link
            href="/"
            className="group flex items-center gap-2 sm:gap-2.5 text-xs uppercase tracking-[0.2em] text-[#FFF6ED]/90 hover:text-amber-200 transition-colors shrink-0"
            title="Về 3D Showroom Laztar"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-amber-500/50 group-hover:scale-105 transition-all">
              <ArrowLeft className="w-4 h-4 text-amber-300 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="hidden sm:inline font-light tracking-widest font-sans">3D SHOWROOM LAZTAR</span>
            <span className="sm:hidden font-bold text-xs text-amber-300 tracking-wider font-sans">3D</span>
          </Link>

          {/* Center: In-page Anchor Links Menu (Hidden on mobile to avoid overflow) */}
          <nav className="hidden md:flex items-center gap-6 px-6 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
            <a
              href="#hero"
              onClick={(e) => scrollToSection(e, 'hero')}
              className="text-xs uppercase tracking-widest text-neutral-400 hover:text-amber-200 transition-colors cursor-pointer font-sans"
            >
              Giới Thiệu
            </a>
            <a
              href="#skills"
              onClick={(e) => scrollToSection(e, 'skills')}
              className="text-xs uppercase tracking-widest text-neutral-400 hover:text-amber-200 transition-colors cursor-pointer font-sans"
            >
              Kỹ Năng
            </a>
            <a
              href="#projects"
              onClick={(e) => scrollToSection(e, 'projects')}
              className="text-xs uppercase tracking-widest text-neutral-400 hover:text-amber-200 transition-colors cursor-pointer font-sans"
            >
              Dự Án
            </a>
            <a
              href="#experience"
              onClick={(e) => scrollToSection(e, 'experience')}
              className="text-xs uppercase tracking-widest text-neutral-400 hover:text-amber-200 transition-colors cursor-pointer font-sans"
            >
              Học Vấn &amp; KN
            </a>
          </nav>

          {/* Right Action: Download/Open Official PDF CV */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/Ta-Khac-Khoan-CV.pdf"
              download="Ta-Khac-Khoan-CV.pdf"
              className="text-xs font-semibold px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full bg-gradient-to-b from-[#FFF6ED] to-[#E2D5C5] text-black shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,1)] hover:brightness-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-1.5 font-sans shrink-0 min-h-[36px]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CV (PDF)</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-20 flex flex-col gap-14 sm:gap-20 print:hidden w-full overflow-x-hidden">

        {/* ========================================================
            SECTION 1: HERO & PROFILE SHOWCASE (#hero)
        ======================================================== */}
        <section id="hero" className="relative w-full pt-2 sm:pt-4 pb-2 scroll-mt-24 sm:scroll-mt-28">
          <div className="bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-5 sm:p-8 lg:p-12 relative overflow-hidden">
            {/* Top Amber Ambient Sheen */}
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-br from-amber-500/15 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-gradient-to-tr from-amber-600/10 to-transparent blur-3xl pointer-events-none" />

            {/* Responsive Flex: column-reverse on mobile, row on large screens */}
            <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-8 sm:gap-10">
              <div className="flex-1 space-y-5 sm:space-y-6 w-full text-center lg:text-left">

                {/* Single Refined Status Badge (Soft Wrap & Responsive text) */}
                <div className="flex justify-center lg:justify-start">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] sm:text-[11px] font-medium tracking-wider text-emerald-400 uppercase max-w-full leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    <span>OPEN TO WORK • FULL-STACK / BRSE (TP.HCM)</span>
                  </span>
                </div>

                {/* Primary Title: ONLY TẠ KHẮC KHOAN uses Cormorant Garamond */}
                <div>
                  <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#FFF6ED] leading-tight mb-2 sm:mb-3">
                    TẠ KHẮC KHOAN
                  </h1>
                  <h2 className="text-sm sm:text-lg lg:text-xl font-medium font-sans tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#FFF6ED] to-amber-400 tabular-nums lining-nums">
                    Full-Stack Software Engineer &amp; Korean Bridge System Engineer (BrSE)
                  </h2>
                </div>

                {/* Summary Intro - High Contrast */}
                <p className="text-neutral-200 text-xs sm:text-base lg:text-lg leading-relaxed max-w-2xl font-light font-sans tabular-nums lining-nums mx-auto lg:mx-0">
                  Kỹ sư Kỹ thuật phần mềm tốt nghiệp Đại học FPT với kinh nghiệm phát triển các ứng dụng web toàn diện (End-to-End), tích hợp mô hình AI đa phương thức và triển khai hệ thống lên môi trường VPS/Cloud.
                </p>

                {/* CTA Action Buttons Group - Mobile 2 cols / Desktop flex with 44px min touch target */}
                <div className="pt-2 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3.5">
                  {/* Primary CTA Button: Download / View CV */}
                  <button
                    onClick={() => setIsCvModalOpen(true)}
                    className="col-span-2 sm:col-auto rounded-full px-5 py-2.5 min-h-[44px] bg-gradient-to-b from-[#FFF6ED] to-[#E2D5C5] text-black font-semibold text-xs sm:text-sm shadow-[0_3px_10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,1)] hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
                  >
                    <Download className="w-4 h-4 text-black shrink-0" />
                    <span>Tải CV (Bản tiếng Anh)</span>
                  </button>

                  {/* Secondary: GitHub */}
                  <a
                    href="https://github.com/khackhoan0103"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full px-3.5 py-2.5 min-h-[44px] bg-white/5 border border-white/10 text-xs sm:text-sm text-neutral-200 hover:text-white hover:bg-white/10 hover:border-amber-400/40 backdrop-blur-sm transition-all flex items-center justify-center gap-2 group font-sans"
                  >
                    <GithubIcon className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform shrink-0" />
                    <span>GitHub</span>
                  </a>

                  {/* Secondary: Email copy */}
                  <button
                    onClick={handleCopyEmail}
                    className="rounded-full px-3.5 py-2.5 min-h-[44px] bg-white/5 border border-white/10 text-xs sm:text-sm text-neutral-200 hover:text-white hover:bg-white/10 hover:border-amber-400/40 backdrop-blur-sm transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="text-emerald-300 text-[11px] sm:text-xs">Đã chép!</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                        <span>Email</span>
                      </>
                    )}
                  </button>

                  {/* Navigate back to 3D Showroom */}
                  <Link
                    href="/"
                    className="col-span-2 sm:col-auto rounded-full px-4 py-2.5 min-h-[44px] bg-amber-500/10 border border-amber-500/25 text-xs sm:text-sm text-amber-200 hover:bg-amber-500/20 hover:border-amber-400 transition-all flex items-center justify-center gap-2 font-sans"
                  >
                    <ArrowLeft className="w-4 h-4 shrink-0" />
                    <span>3D Showroom</span>
                  </Link>
                </div>
              </div>

              {/* Profile Card with Real Avatar - Centered & Responsive dimensions */}
              <div className="flex flex-col items-center p-3.5 sm:p-5 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)] mx-auto lg:mx-0 self-center shrink-0 group">
                <div className="relative w-36 h-44 sm:w-48 sm:h-60 rounded-2xl overflow-hidden border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.6)] group-hover:border-amber-400/50 transition-all duration-500">
                  <Image
                    src="/images/avatar.jpg"
                    alt="Tạ Khắc Khoan - Software Engineer & Korean BrSE"
                    fill
                    priority
                    sizes="(max-width: 640px) 144px, 192px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                </div>

                <div className="text-center mt-3 sm:mt-4 space-y-1 w-full">
                  <h3 className="font-sans text-lg sm:text-xl font-bold text-[#FFF6ED] tracking-wide tabular-nums lining-nums">
                    Tạ Khắc Khoan
                  </h3>
                  <p className="text-[11px] sm:text-xs font-mono text-amber-300 tracking-wider font-medium">
                    Software Engineer / BrSE
                  </p>
                  <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-neutral-300 pt-0.5 sm:pt-1 font-sans">
                    <MapPin className="w-3 h-3 text-amber-400/80" />
                    <span>TP. Thủ Đức, TP.HCM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 2: TECHNICAL ARSENAL (#skills)
        ======================================================== */}
        <section id="skills" className="space-y-6 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-amber-400 mb-2">
                <Cpu className="w-4 h-4" />
                <span>Năng lực công nghệ &amp; Chuyên môn</span>
              </div>
              <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-[#FFF6ED] tabular-nums lining-nums">
                Technical Arsenal
              </h2>
            </div>
            <p className="text-xs text-neutral-300 max-w-sm font-sans">
              Phân tầng kiến trúc từ lõi Backend xử lý đa luồng, AI đa phương thức đến giao diện WebGL tương tác cao cấp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* 1. Backend & Architecture */}
            <div className="bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-5 sm:p-6 hover:border-amber-400/40 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform shrink-0">
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-sans text-lg font-bold text-[#FFF6ED] tabular-nums lining-nums">Backend &amp; Arch</h3>
                    <span className="text-[10px] text-amber-400/80 uppercase tracking-widest font-mono">Enterprise Core</span>
                  </div>
                </div>
                <p className="text-xs text-neutral-200 leading-relaxed mb-4 font-light font-sans tabular-nums lining-nums">
                  Thiết kế kiến trúc dịch vụ chuẩn MVC/Clean Architecture, xử lý bất đồng bộ đa luồng (Async), phân quyền bảo mật chuyên sâu và quản trị Transaction tin cậy.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  'Java',
                  'Spring Boot',
                  'Spring Security',
                  'Spring Data JPA',
                  'Hibernate',
                  'ASP.NET Core',
                  'RESTful APIs',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full px-2.5 py-0.5 bg-white/[0.07] border border-white/15 text-[10px] sm:text-[11px] text-[#FFF6ED] font-medium backdrop-blur-sm group-hover:border-amber-400/40 transition-colors font-sans tabular-nums lining-nums"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. Modern Frontend */}
            <div className="bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-5 sm:p-6 hover:border-amber-400/40 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform shrink-0">
                    <Layout className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-sans text-lg font-bold text-[#FFF6ED] tabular-nums lining-nums">Modern Frontend</h3>
                    <span className="text-[10px] text-amber-400/80 uppercase tracking-widest font-mono">Tactile &amp; 3D</span>
                  </div>
                </div>
                <p className="text-xs text-neutral-200 leading-relaxed mb-4 font-light font-sans tabular-nums lining-nums">
                  Xây dựng giao diện Dark Skeuomorphism xúc giác cao cấp, tối ưu hóa tái kết xuất, lập trình Shader 3D (Three.js/OGL) và tương thích hoàn toàn thiết bị.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  'React',
                  'TypeScript',
                  'Next.js',
                  'Tailwind CSS',
                  'Ant Design',
                  'Context API',
                  'Three.js / OGL',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full px-2.5 py-0.5 bg-white/[0.07] border border-white/15 text-[10px] sm:text-[11px] text-[#FFF6ED] font-medium backdrop-blur-sm group-hover:border-amber-400/40 transition-colors font-sans tabular-nums lining-nums"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. AI & Integrations */}
            <div className="bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-5 sm:p-6 hover:border-amber-400/40 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-sans text-lg font-bold text-[#FFF6ED] tabular-nums lining-nums">AI &amp; Integrations</h3>
                    <span className="text-[10px] text-amber-400/80 uppercase tracking-widest font-mono">Multimodal &amp; Vectors</span>
                  </div>
                </div>
                <p className="text-xs text-neutral-200 leading-relaxed mb-4 font-light font-sans tabular-nums lining-nums">
                  Tích hợp mô hình AI đa phương thức giải quyết bài toán thị giác máy tính và gợi ý thông minh, trích xuất đặc trưng Vector Embeddings và thuật toán Cosine Similarity.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  'Gemini APIs',
                  'Vector Embeddings',
                  'Semantic Search',
                  'Cosine Similarity',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full px-2.5 py-0.5 bg-white/[0.07] border border-white/15 text-[10px] sm:text-[11px] text-[#FFF6ED] font-medium backdrop-blur-sm group-hover:border-amber-400/40 transition-colors font-sans tabular-nums lining-nums"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 4. DevOps, Database & Systems */}
            <div className="bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-5 sm:p-6 hover:border-amber-400/40 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform shrink-0">
                    <Cloud className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-sans text-lg font-bold text-[#FFF6ED] tabular-nums lining-nums">DevOps &amp; Database</h3>
                    <span className="text-[10px] text-amber-400/80 uppercase tracking-widest font-mono">Deploy &amp; Stability</span>
                  </div>
                </div>
                <p className="text-xs text-neutral-200 leading-relaxed mb-4 font-light font-sans tabular-nums lining-nums">
                  Thiết kế lược đồ cơ sở dữ liệu quan hệ, tối ưu truy vấn Indexing, đóng gói Docker container hóa đa dịch vụ và triển khai thực tế trên môi trường máy chủ Linux VPS.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  'SQL Server',
                  'MySQL',
                  'Docker',
                  'VPS Deploy',
                  'Linux',
                  'Firebase',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full px-2.5 py-0.5 bg-white/[0.07] border border-white/15 text-[10px] sm:text-[11px] text-[#FFF6ED] font-medium backdrop-blur-sm group-hover:border-amber-400/40 transition-colors font-sans tabular-nums lining-nums"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================
            SECTION 3: FEATURED PROJECTS (#projects)
        ======================================================== */}
        <section id="projects" className="space-y-6 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-amber-400 mb-2">
                <Briefcase className="w-4 h-4" />
                <span>Minh chứng năng lực thực tế</span>
              </div>
              <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-[#FFF6ED] tabular-nums lining-nums">
                Featured Projects
              </h2>
            </div>
            <p className="text-xs text-neutral-300 max-w-sm font-sans">
              Bộ ba dự án tiêu biểu minh chứng năng lực kiến trúc hệ thống, tích hợp AI tiên tiến và giải quyết nghiệp vụ quy mô lớn.
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:gap-8">

            {/* PROJECT 01: CosMate */}
            <div className="bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-5 sm:p-8 lg:p-10 hover:border-amber-400/40 hover:shadow-[0_0_35px_rgba(200,138,53,0.15)] transition-all duration-300 relative overflow-hidden group">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-4 sm:gap-6 pb-5 sm:pb-6 border-b border-white/10">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">PROJECT 01</span>
                    <span className="text-white/30">•</span>
                    <span className="rounded-full px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/30 text-[10px] sm:text-[11px] text-amber-300 font-medium font-sans">
                      Full-stack &amp; AI Integration
                    </span>
                    <span className="rounded-full px-2.5 py-0.5 bg-white/5 border border-white/10 text-[10px] sm:text-[11px] text-neutral-300 font-sans">
                      Capstone Project &amp; FPT Software Academy
                    </span>
                  </div>
                  <h3 className="font-sans text-xl sm:text-2xl lg:text-3xl font-bold text-[#FFF6ED] group-hover:text-amber-200 transition-colors tabular-nums lining-nums">
                    CosMate — Nền Tảng Thuê Trang Phục Cosplay Tích Hợp AI
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1 lg:pt-0">
                  {['Spring Boot', 'React', 'Gemini APIs', 'Docker', 'VPS'].map((tag) => (
                    <span key={tag} className="rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 bg-white/[0.07] border border-white/15 text-[10px] sm:text-[11px] text-[#FFF6ED] backdrop-blur-sm font-sans tabular-nums lining-nums">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Body: Stacks description on top and metrics below on mobile */}
              <div className="pt-5 sm:pt-6 flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8">
                <div className="flex-1 space-y-4">
                  <h4 className="text-xs uppercase font-mono tracking-widest text-amber-300">Mô Tả &amp; Kiến Trúc Giải Pháp:</h4>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-light font-sans tabular-nums lining-nums">
                    Nền tảng thuê trang phục cosplay đa người dùng hỗ trợ 3 phân quyền và hơn 80 RESTful APIs. Tích hợp AI chấm điểm dáng và đề xuất thông minh qua Gemini Multimodal, Vector Embeddings và Cosine Similarity. Tối ưu độ tin cậy của tiến trình AI dài bằng Spring Async và Transaction Template; đóng gói Docker và triển khai thực tế trên VPS.
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-2">
                    <div className="flex items-start gap-2.5 text-xs text-neutral-100 font-sans tabular-nums lining-nums">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>80+ RESTful APIs:</strong> Bảo mật RBAC đa cấp độ với Spring Security &amp; JWT Token.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-100 font-sans tabular-nums lining-nums">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>AI Multimodal:</strong> Google Gemini phân tích hình ảnh, chấm điểm khớp dáng cosplay.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-100 font-sans tabular-nums lining-nums">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Vector Search:</strong> Trích xuất embeddings và tính độ tương đồng bằng Cosine Similarity.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-100 font-sans tabular-nums lining-nums">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Asynchronous &amp; Deploy:</strong> Xử lý tác vụ AI bằng Spring Async, Dockerize và host trên Linux VPS.</span>
                    </div>
                  </div>
                </div>

                {/* Key Metrics Box (Lining-nums & Tabular-nums) */}
                <div className="w-full lg:w-72 shrink-0 rounded-xl bg-black/50 border border-white/10 p-4 sm:p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400/80">Chỉ số nổi bật</span>
                    <div className="mt-3 grid grid-cols-3 lg:grid-cols-1 gap-3">
                      <div>
                        <div className="font-sans font-bold text-xl sm:text-2xl text-amber-300 tracking-tight lining-nums tabular-nums">80+ APIs</div>
                        <div className="text-[11px] sm:text-xs text-neutral-400 font-sans">Endpoints RESTful</div>
                      </div>
                      <div>
                        <div className="font-sans font-bold text-xl sm:text-2xl text-[#FFF6ED] tracking-tight lining-nums tabular-nums">3 Roles</div>
                        <div className="text-[11px] sm:text-xs text-neutral-400 font-sans">RBAC Permissions</div>
                      </div>
                      <div>
                        <div className="font-sans font-bold text-xl sm:text-2xl text-emerald-400 tracking-tight lining-nums tabular-nums">Docker</div>
                        <div className="text-[11px] sm:text-xs text-neutral-400 font-sans">Linux VPS Prod</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PROJECT 02: CineManage System */}
            <div className="bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-5 sm:p-8 lg:p-10 hover:border-amber-400/40 hover:shadow-[0_0_35px_rgba(200,138,53,0.15)] transition-all duration-300 relative overflow-hidden group">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-4 sm:gap-6 pb-5 sm:pb-6 border-b border-white/10">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">PROJECT 02</span>
                    <span className="text-white/30">•</span>
                    <span className="rounded-full px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/30 text-[10px] sm:text-[11px] text-amber-300 font-medium font-sans">
                      Real-time &amp; Payment Gateway
                    </span>
                    <span className="rounded-full px-2.5 py-0.5 bg-white/5 border border-white/10 text-[10px] sm:text-[11px] text-neutral-300 font-sans">
                      FPT Software Academy
                    </span>
                  </div>
                  <h3 className="font-sans text-xl sm:text-2xl lg:text-3xl font-bold text-[#FFF6ED] group-hover:text-amber-200 transition-colors tabular-nums lining-nums">
                    CineManage System — Hệ Sinh Thái Đặt Vé Xem Phim Thời Gian Thực
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1 lg:pt-0">
                  {['ASP.NET Core', 'React', 'TypeScript', 'SignalR', 'VNPay', 'JWT'].map((tag) => (
                    <span key={tag} className="rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 bg-white/[0.07] border border-white/15 text-[10px] sm:text-[11px] text-[#FFF6ED] backdrop-blur-sm font-sans tabular-nums lining-nums">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Body */}
              <div className="pt-5 sm:pt-6 flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8">
                <div className="flex-1 space-y-4">
                  <h4 className="text-xs uppercase font-mono tracking-widest text-amber-300">Mô Tả &amp; Kiến Trúc Giải Pháp:</h4>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-light font-sans tabular-nums lining-nums">
                    Hệ sinh thái đặt vé xem phim với 50+ RESTful APIs. Khóa ghế theo thời gian thực (Real-time seat locking) bằng SignalR, bảo mật JWT và tích hợp cổng thanh toán VNPay.
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-2">
                    <div className="flex items-start gap-2.5 text-xs text-neutral-100 font-sans tabular-nums lining-nums">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Real-time Seat Locking:</strong> Sử dụng SignalR Hubs ngăn chặn tuyệt đối tình trạng đặt trùng ghế (race condition).</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-100 font-sans tabular-nums lining-nums">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>50+ RESTful APIs:</strong> Kiến trúc module hóa trên ASP.NET Core Web API với Repository &amp; Unit of Work.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-100 font-sans tabular-nums lining-nums">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Cổng thanh toán VNPay:</strong> Xử lý quy trình thanh toán an toàn, cơ chế hoàn tiền và Webhook Instant Payment Notification (IPN).</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-100 font-sans tabular-nums lining-nums">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Quản trị cụm rạp:</strong> Quản lý lịch chiếu linh hoạt theo từng phòng chiếu, loại ghế VIP/Standard và giá vé theo khung giờ.</span>
                    </div>
                  </div>
                </div>

                {/* Key Metrics Box */}
                <div className="w-full lg:w-72 shrink-0 rounded-xl bg-black/50 border border-white/10 p-4 sm:p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400/80">Chỉ số nổi bật</span>
                    <div className="mt-3 grid grid-cols-3 lg:grid-cols-1 gap-3">
                      <div>
                        <div className="font-sans font-bold text-xl sm:text-2xl text-amber-300 tracking-tight lining-nums tabular-nums">50+ APIs</div>
                        <div className="text-[11px] sm:text-xs text-neutral-400 font-sans">ASP.NET Core C#</div>
                      </div>
                      <div>
                        <div className="font-sans font-bold text-xl sm:text-2xl text-[#FFF6ED] tracking-tight lining-nums tabular-nums">&lt; 100ms</div>
                        <div className="text-[11px] sm:text-xs text-neutral-400 font-sans">Độ trễ SignalR</div>
                      </div>
                      <div>
                        <div className="font-sans font-bold text-xl sm:text-2xl text-emerald-400 tracking-tight lining-nums tabular-nums">VNPay</div>
                        <div className="text-[11px] sm:text-xs text-neutral-400 font-sans">Cổng thanh toán</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PROJECT 03: KoiCareHome */}
            <div className="bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-5 sm:p-8 lg:p-10 hover:border-amber-400/40 hover:shadow-[0_0_35px_rgba(200,138,53,0.15)] transition-all duration-300 relative overflow-hidden group">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-4 sm:gap-6 pb-5 sm:pb-6 border-b border-white/10">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">PROJECT 03</span>
                    <span className="text-white/30">•</span>
                    <span className="rounded-full px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/30 text-[10px] sm:text-[11px] text-amber-300 font-medium font-sans">
                      Enterprise Java &amp; Data Management
                    </span>
                  </div>
                  <h3 className="font-sans text-xl sm:text-2xl lg:text-3xl font-bold text-[#FFF6ED] group-hover:text-amber-200 transition-colors tabular-nums lining-nums">
                    KoiCareHome — Nền Tảng Quản Lý Hồ Nuôi &amp; Sức Khỏe Cá Koi
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1 lg:pt-0">
                  {['Java', 'Spring Boot', 'React', 'SQL Server', 'Spring Security'].map((tag) => (
                    <span key={tag} className="rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 bg-white/[0.07] border border-white/15 text-[10px] sm:text-[11px] text-[#FFF6ED] backdrop-blur-sm font-sans tabular-nums lining-nums">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Body */}
              <div className="pt-5 sm:pt-6 flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8">
                <div className="flex-1 space-y-4">
                  <h4 className="text-xs uppercase font-mono tracking-widest text-amber-300">Mô Tả &amp; Kiến Trúc Giải Pháp:</h4>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-light font-sans tabular-nums lining-nums">
                    Ứng dụng quản lý hồ và cá Koi thông qua 50+ APIs, cấu hình phân quyền bảo mật với Spring Security và quản trị dữ liệu qua Spring Data JPA.
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-2">
                    <div className="flex items-start gap-2.5 text-xs text-neutral-100 font-sans tabular-nums lining-nums">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>50+ APIs chuyên biệt:</strong> Theo dõi chất lượng nước (nồng độ pH, Oxy, nhiệt độ, NO2) và hồ sơ từng cá thể cá Koi.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-100 font-sans tabular-nums lining-nums">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Bảo mật Spring Security:</strong> Kiểm soát chặt chẽ phân quyền chủ sở hữu hồ cá và kỹ thuật viên chăm sóc.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-100 font-sans tabular-nums lining-nums">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Spring Data JPA &amp; SQL Server:</strong> Thiết kế chuẩn hóa cơ sở dữ liệu quan hệ, tối ưu truy vấn thống kê dữ liệu.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-100 font-sans tabular-nums lining-nums">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Cảnh báo thông minh:</strong> Tự động tính toán lượng thức ăn theo độ tuổi/kích thước và cảnh báo sớm khi chất lượng nước bất thường.</span>
                    </div>
                  </div>
                </div>

                {/* Key Metrics Box */}
                <div className="w-full lg:w-72 shrink-0 rounded-xl bg-black/50 border border-white/10 p-4 sm:p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400/80">Chỉ số nổi bật</span>
                    <div className="mt-3 grid grid-cols-3 lg:grid-cols-1 gap-3">
                      <div>
                        <div className="font-sans font-bold text-xl sm:text-2xl text-amber-300 tracking-tight lining-nums tabular-nums">50+ APIs</div>
                        <div className="text-[11px] sm:text-xs text-neutral-400 font-sans">Dịch vụ quản lý nước</div>
                      </div>
                      <div>
                        <div className="font-sans font-bold text-xl sm:text-2xl text-[#FFF6ED] tracking-tight lining-nums tabular-nums">Automated</div>
                        <div className="text-[11px] sm:text-xs text-neutral-400 font-sans">Dinh dưỡng &amp; cảnh báo</div>
                      </div>
                      <div>
                        <div className="font-sans font-bold text-xl sm:text-2xl text-emerald-400 tracking-tight lining-nums tabular-nums">JPA / SQL</div>
                        <div className="text-[11px] sm:text-xs text-neutral-400 font-sans">Toàn vẹn dữ liệu</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================
            SECTION 4: EXPERIENCE, EDUCATION & LANGUAGES (#experience)
        ======================================================== */}
        <section id="experience" className="space-y-6 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-amber-400 mb-2">
                <GraduationCap className="w-4 h-4" />
                <span>Hành trình học vấn &amp; Kinh nghiệm</span>
              </div>
              <h2 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-[#FFF6ED] tabular-nums lining-nums">
                Experience &amp; Education
              </h2>
            </div>
            <p className="text-xs text-neutral-300 max-w-sm font-sans">
              Lộ trình đào tạo chuẩn kỹ sư phần mềm, thực tập doanh nghiệp và năng lực ngoại ngữ cầu nối đa quốc gia.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

            {/* Timeline: Experience & Education (2 Columns) */}
            <div className="lg:col-span-2 bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-5 sm:p-8">
              <div className="relative border-l border-amber-500/30 pl-4 sm:pl-6 ml-2 sm:ml-3 space-y-6 sm:space-y-8">

                {/* Milestone 1 */}
                <div className="relative group">
                  <div className="absolute -left-[23px] sm:-left-[31px] top-1.5 w-3 h-3 rounded-full bg-amber-400 ring-4 ring-[#161412] shadow-[0_0_10px_rgba(200,138,53,0.8)] group-hover:scale-125 transition-transform" />
                  <span className="text-xs font-mono font-bold text-amber-300 tracking-wider lining-nums tabular-nums">01/2026 – 07/2026</span>
                  <h3 className="font-sans text-lg sm:text-xl lg:text-2xl font-bold text-[#FFF6ED] mt-1 tabular-nums lining-nums">
                    Java Full-stack Fresher Training
                  </h3>
                  <div className="text-xs text-neutral-400 mb-2 font-sans">FPT Software Academy</div>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-light font-sans tabular-nums lining-nums">
                    Chương trình đào tạo Fresher chuyên sâu về kiến trúc Java Enterprise, phát triển hệ thống doanh nghiệp với Spring Boot, Spring Security, microservices chuẩn mực và quy trình phát triển phần mềm chuẩn Agile/Scrum.
                  </p>
                </div>

                {/* Milestone 2 */}
                <div className="relative group">
                  <div className="absolute -left-[23px] sm:-left-[31px] top-1.5 w-3 h-3 rounded-full bg-amber-300 ring-4 ring-[#161412] shadow-[0_0_10px_rgba(200,138,53,0.6)] group-hover:scale-125 transition-transform" />
                  <span className="text-xs font-mono font-bold text-amber-300 tracking-wider lining-nums tabular-nums">12/2024 – 04/2025</span>
                  <h3 className="font-sans text-lg sm:text-xl lg:text-2xl font-bold text-[#FFF6ED] mt-1 tabular-nums lining-nums">
                    .NET &amp; React Internship
                  </h3>
                  <div className="text-xs text-neutral-400 mb-2 font-sans">FPT Software Academy</div>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-light font-sans tabular-nums lining-nums">
                    Thực tập sinh kỹ thuật phần mềm, trực tiếp tham gia phát triển hệ thống CineManage System với ASP.NET Core Web API, xây dựng giao diện tương tác React TypeScript, triển khai SignalR đồng bộ dữ liệu thời gian thực và tích hợp cổng thanh toán VNPay.
                  </p>
                </div>

                {/* Milestone 3 */}
                <div className="relative group">
                  <div className="absolute -left-[23px] sm:-left-[31px] top-1.5 w-3 h-3 rounded-full bg-[#FFF6ED] ring-4 ring-[#161412] shadow-[0_0_10px_rgba(255,246,237,0.5)] group-hover:scale-125 transition-transform" />
                  <span className="text-xs font-mono font-bold text-neutral-400 tracking-wider lining-nums tabular-nums">2022 – 2026</span>
                  <h3 className="font-sans text-lg sm:text-xl lg:text-2xl font-bold text-[#FFF6ED] mt-1 tabular-nums lining-nums">
                    Cử nhân Kỹ thuật Phần mềm (Software Engineering)
                  </h3>
                  <div className="text-xs text-amber-300 mb-2 font-medium font-sans">Đại học FPT — Định hướng Kỹ sư Cầu nối tiếng Hàn (BrSE)</div>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-light font-sans tabular-nums lining-nums">
                    Tốt nghiệp cử nhân Kỹ thuật Phần mềm chính quy. Trang bị vững chắc nền tảng khoa học máy tính, cấu trúc dữ liệu và giải thuật, thiết kế hướng đối tượng (OOP), các mẫu thiết kế (Design Patterns) và đào tạo chuyên biệt kỹ sư cầu nối công nghệ tiếng Hàn (Korean Bridge SE).
                  </p>
                </div>

              </div>
            </div>

            {/* Languages & Bridge Capability (1 Column) */}
            <div className="bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-5 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2.5 text-amber-400 mb-4">
                  <Languages className="w-5 h-5" />
                  <h3 className="font-sans text-lg sm:text-xl font-bold text-[#FFF6ED] tabular-nums lining-nums">Năng Lực Ngôn Ngữ</h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed mb-6 font-light font-sans tabular-nums lining-nums">
                  Nền tảng ngoại ngữ vững chắc sẵn sàng đáp ứng vai trò Kỹ sư cầu nối (BrSE) hoặc làm việc trong môi trường dự án công nghệ quốc tế.
                </p>

                <div className="space-y-4 sm:space-y-5">
                  {/* Korean */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#FFF6ED] font-sans">Tiếng Hàn (Korean)</span>
                      <span className="rounded-full px-2.5 py-0.5 bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30 lining-nums tabular-nums">
                        TOPIK Level 3
                      </span>
                    </div>
                    <p className="text-xs text-neutral-200 leading-relaxed font-light font-sans tabular-nums lining-nums">
                      Khả năng giao tiếp trực tiếp, đọc hiểu tài liệu đặc tả yêu cầu phần mềm (SRS), dịch thuật tài liệu kỹ thuật và trao đổi nghiệp vụ với khách hàng Hàn Quốc.
                    </p>
                  </div>

                  {/* English */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#FFF6ED] font-sans">Tiếng Anh (English)</span>
                      <span className="rounded-full px-2.5 py-0.5 bg-white/10 text-white font-mono text-xs font-bold border border-white/15 lining-nums tabular-nums">
                        IELTS 6.0
                      </span>
                    </div>
                    <p className="text-xs text-neutral-200 leading-relaxed font-light font-sans tabular-nums lining-nums">
                      Nghiên cứu tài liệu công nghệ chuyên sâu, RFC, tài liệu API chuẩn hóa quốc tế, giao tiếp và viết báo cáo kỹ thuật trôi chảy.
                    </p>
                  </div>
                </div>
              </div>

              {/* Ready to connect banner */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-amber-500/15 to-transparent border border-amber-500/20 text-xs text-amber-200 flex items-center gap-3 font-sans">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                <span>Sẵn sàng tiếp nhận vị trí Full-stack Engineer hoặc Korean BrSE tại TP.HCM &amp; Remote.</span>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================
            SECTION 5: CONNECT FOOTER
        ======================================================== */}
        <footer className="w-full">
          <div className="bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-5 sm:p-8 lg:p-12 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-white/10">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-amber-400">
                  <Mail className="w-4 h-4" />
                  <span>Kênh liên lạc trực tiếp</span>
                </div>
                <h3 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFF6ED] tabular-nums lining-nums">
                  Sẵn Sàng Hợp Tác &amp; Cống Hiến
                </h3>
                <p className="text-xs sm:text-sm text-neutral-200 max-w-xl font-light font-sans">
                  Hãy kết nối với tôi để trao đổi về cơ hội nghề nghiệp, dự án phần mềm hoặc các vị trí Kỹ sư cầu nối công nghệ (BrSE).
                </p>
              </div>

              {/* Action Buttons */}
              <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                <button
                  onClick={() => setIsCvModalOpen(true)}
                  className="rounded-full px-5 py-2.5 min-h-[44px] bg-gradient-to-b from-[#FFF6ED] to-[#E2D5C5] text-black font-semibold text-xs sm:text-sm shadow-[0_3px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,1)] hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
                >
                  <Download className="w-4 h-4 text-black shrink-0" />
                  <span>Tải CV (Bản tiếng Anh)</span>
                </button>

                <a
                  href="mailto:takhackhoan@gmail.com"
                  className="rounded-full px-5 py-2.5 min-h-[44px] bg-white/5 border border-white/10 text-xs sm:text-sm text-neutral-100 hover:bg-white/10 hover:border-amber-400/40 backdrop-blur-sm transition-all flex items-center justify-center gap-2 font-sans"
                >
                  <Mail className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>Gửi Thư Điện Tử</span>
                </a>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans">

              {/* Email */}
              <div
                onClick={handleCopyEmail}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                  <span>EMAIL TRỰC TIẾP</span>
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-300" />}
                </div>
                <div className="text-sm font-medium text-[#FFF6ED] truncate">takhackhoan@gmail.com</div>
                <div className="text-[10px] text-amber-400/90 mt-1">
                  {copiedEmail ? 'Đã sao chép vào bộ nhớ tạm' : 'Bấm để sao chép'}
                </div>
              </div>

              {/* Phone */}
              <div
                onClick={handleCopyPhone}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                  <span>ĐIỆN THOẠI // ZALO</span>
                  {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Phone className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-300" />}
                </div>
                <div className="text-sm font-medium text-[#FFF6ED] tabular-nums lining-nums">0944 183 376</div>
                <div className="text-[10px] text-amber-400/90 mt-1">
                  {copiedPhone ? 'Đã sao chép số' : 'Bấm để sao chép'}
                </div>
              </div>

              {/* Location */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs text-neutral-400 mb-1">KHU VỰC LÀM VIỆC</div>
                <div className="text-sm font-medium text-[#FFF6ED]">TP. Thủ Đức, TP.HCM</div>
                <div className="text-[10px] text-neutral-400 mt-1">Việt Nam // On-site &amp; Hybrid</div>
              </div>

              {/* GitHub */}
              <a
                href="https://github.com/khackhoan0103"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-all group block"
              >
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                  <span>GITHUB PROFILE</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-300" />
                </div>
                <div className="text-sm font-medium text-[#FFF6ED] group-hover:text-amber-300 transition-colors">
                  @khackhoan0103
                </div>
                <div className="text-[10px] text-neutral-400 mt-1">Repositories &amp; Mã nguồn</div>
              </a>

            </div>

            {/* Copyright & Scroll to top */}
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-sans">
              <div>
                © 2026 TẠ KHẮC KHOAN. Bản quyền cá nhân. Thiết kế theo tiêu chuẩn Dark Skeuomorphism &amp; Glassmorphism.
              </div>

              <button
                onClick={scrollToTop}
                className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
              >
                <span>Về đầu trang</span>
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </footer>

      </main>

      {/* ========================================================
          CV PREVIEW & DOWNLOAD MODAL (SKEUOMORPHIC + 1-PAGE A4 RESUME)
      ======================================================== */}
      {isCvModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in cv-modal-overlay">
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#191613] border border-amber-500/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.95)] p-4 sm:p-6 lg:p-8 text-[#FFF6ED] cv-modal-card">

            {/* Modal Header & Pill Toolbar (Hidden in Print) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-white/10 gap-4 no-print">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="font-sans text-xl font-bold text-[#FFF6ED] tabular-nums lining-nums">
                  Hồ Sơ Kỹ Sư — Tạ Khắc Khoan
                </h3>
              </div>

              {/* Pill Toolbar */}
              <div className="flex flex-wrap items-center gap-2">
                {/* 1. Official PDF Download */}
                <a
                  href="/Ta-Khac-Khoan-CV.pdf"
                  download="Ta-Khac-Khoan-CV.pdf"
                  className="rounded-full px-4 py-2 bg-gradient-to-b from-[#FFF6ED] to-[#E2D5C5] text-black text-xs font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,1)] hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer font-sans"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải PDF chính thức (English CV)</span>
                </a>

                {/* 2. Print Clean A4 */}
                <button
                  onClick={() => window.print()}
                  className="rounded-full px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-medium text-white transition-all flex items-center gap-1.5 cursor-pointer font-sans"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-300" />
                  <span>In hồ sơ (Print)</span>
                </button>

                {/* 3. Close Button */}
                <button
                  onClick={() => setIsCvModalOpen(false)}
                  className="rounded-full px-3.5 py-2 bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-medium text-neutral-300 hover:text-white transition-all flex items-center gap-1 cursor-pointer font-sans"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Đóng</span>
                </button>
              </div>
            </div>

            {/* Modal Body / Printable Minimalist Tech Resume (Dual-mode: Screen Dark Mode & Print Clean 1-Page A4) */}
            <div id="printable-cv" className="py-4 space-y-4 text-sm text-neutral-100 font-sans tabular-nums lining-nums">

              {/* Header */}
              <div className="cv-print-header text-center pb-2 border-b border-white/10 print:border-black print:pb-1">
                <h1 className="font-sans text-2xl font-bold uppercase tracking-wide text-[#FFF6ED] print:text-black">
                  TẠ KHẮC KHOAN
                </h1>
                <h2 className="text-amber-300 print:text-neutral-800 font-semibold text-xs sm:text-sm mt-0.5">
                  Full-Stack Developer &amp; Korean Bridge System Engineer (BrSE)
                </h2>
                <div className="cv-print-contact text-xs text-neutral-300 print:text-neutral-700 font-mono mt-1 flex flex-wrap justify-center gap-2 sm:gap-3">
                  <span>takhackhoan@gmail.com</span>
                  <span className="text-white/30 print:text-black">•</span>
                  <span>0944 183 376</span>
                  <span className="text-white/30 print:text-black">•</span>
                  <span>github.com/khackhoan0103</span>
                  <span className="text-white/30 print:text-black">•</span>
                  <span>TP. Thủ Đức, TP.HCM</span>
                </div>
              </div>

              {/* 1. TÓM TẮT NĂNG LỰC */}
              <div className="cv-print-block">
                <div className="cv-print-section-title font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400 print:text-black border-b border-white/10 print:border-black pb-1 mb-2">
                  TÓM TẮT NĂNG LỰC
                </div>
                <p className="text-xs leading-relaxed text-neutral-200 print:text-black font-light font-sans">
                  Kỹ sư Kỹ thuật phần mềm tốt nghiệp Đại học FPT với nền tảng vững chắc về kiến trúc phần mềm, phát triển ứng dụng web toàn diện (End-to-End), tích hợp mô hình AI đa phương thức và đóng gói triển khai máy chủ VPS/Linux. Năng lực ngoại ngữ tiếng Hàn (TOPIK 3) và tiếng Anh (Upper-intermediate) sẵn sàng đảm nhận vai trò Kỹ sư cầu nối (BrSE) hoặc Full-stack Software Engineer.
                </p>
              </div>

              {/* 2. KỸ NĂNG CÔNG NGHỆ */}
              <div className="cv-print-block">
                <div className="cv-print-section-title font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400 print:text-black border-b border-white/10 print:border-black pb-1 mb-2">
                  KỸ NĂNG CÔNG NGHỆ
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                  <div>
                    <span className="font-bold text-[#FFF6ED] print:text-black">Backend:</span> Java, Spring Boot, Spring Security, Spring Data JPA, Hibernate, ASP.NET Core Web API, RESTful APIs, JWT.
                  </div>
                  <div>
                    <span className="font-bold text-[#FFF6ED] print:text-black">Frontend:</span> React, TypeScript, Next.js, Tailwind CSS, Ant Design, Three.js, OGL.
                  </div>
                  <div>
                    <span className="font-bold text-[#FFF6ED] print:text-black">AI &amp; Algorithms:</span> Google Gemini Multimodal APIs, Vector Embeddings, Semantic Search, Cosine Similarity.
                  </div>
                  <div>
                    <span className="font-bold text-[#FFF6ED] print:text-black">DevOps &amp; DB:</span> SQL Server, MySQL, Docker, Linux, VPS Deployment, Nginx, Git, Firebase.
                  </div>
                </div>
              </div>

              {/* 3. DỰ ÁN TIÊU BIỂU */}
              <div className="cv-print-block">
                <div className="cv-print-section-title font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400 print:text-black border-b border-white/10 print:border-black pb-1 mb-2">
                  DỰ ÁN TIÊU BIỂU
                </div>
                <div className="space-y-3 text-xs font-sans">

                  {/* Project 1 */}
                  <div className="cv-print-item">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <div>
                        <strong className="text-[#FFF6ED] print:text-black text-xs sm:text-sm">CosMate</strong>
                        <span className="text-neutral-400 print:text-neutral-700 ml-1.5">| <em>Spring Boot, React, Gemini AI, Vector Embeddings, Docker, VPS</em></span>
                      </div>
                      <span className="font-mono text-amber-300 print:text-black text-[11px]">Capstone Project &amp; FPT Software Academy</span>
                    </div>
                    <ul className="cv-print-bullets text-neutral-200 print:text-black font-light mt-1 space-y-0.5">
                      <li>• Xây dựng 80+ RESTful APIs với phân quyền RBAC 3 cấp độ bảo mật qua Spring Security &amp; JWT.</li>
                      <li>• Tích hợp Gemini Multimodal AI chấm điểm khớp dáng cosplay và Vector Embeddings (Cosine Similarity) gợi ý thông minh.</li>
                      <li>• Tối ưu tác vụ AI dài bằng Spring Async &amp; TransactionTemplate; đóng gói Docker triển khai thực tế trên Linux VPS.</li>
                    </ul>
                  </div>

                  {/* Project 2 */}
                  <div className="cv-print-item">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <div>
                        <strong className="text-[#FFF6ED] print:text-black text-xs sm:text-sm">CineManage System</strong>
                        <span className="text-neutral-400 print:text-neutral-700 ml-1.5">| <em>ASP.NET Core Web API, React, TypeScript, SignalR, VNPay</em></span>
                      </div>
                      <span className="font-mono text-amber-300 print:text-black text-[11px]">FPT Software Academy</span>
                    </div>
                    <ul className="cv-print-bullets text-neutral-200 print:text-black font-light mt-1 space-y-0.5">
                      <li>• Phát triển 50+ RESTful APIs quản trị cụm rạp, lịch chiếu và hệ thống đặt vé xem phim trực tuyến.</li>
                      <li>• Cơ chế khóa ghế theo thời gian thực (Real-time seat locking) bằng SignalR Hubs ngăn chặn triệt để đặt trùng ghế.</li>
                      <li>• Tích hợp cổng thanh toán trực tuyến bảo mật VNPay sandbox với cơ chế xác thực IPN và hoàn tiền tự động.</li>
                    </ul>
                  </div>

                  {/* Project 3 */}
                  <div className="cv-print-item">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <div>
                        <strong className="text-[#FFF6ED] print:text-black text-xs sm:text-sm">KoiCareHome</strong>
                        <span className="text-neutral-400 print:text-neutral-700 ml-1.5">| <em>Java, Spring Boot, React, SQL Server, Spring Security, Spring Data JPA</em></span>
                      </div>
                      <span className="font-mono text-amber-300 print:text-black text-[11px]">Java Enterprise Core</span>
                    </div>
                    <ul className="cv-print-bullets text-neutral-200 print:text-black font-light mt-1 space-y-0.5">
                      <li>• Thiết kế 50+ APIs giám sát chỉ số nước (pH, Oxy, nhiệt độ), quản lý hồ nuôi cá Koi và tự động hóa cảnh báo bất thường.</li>
                      <li>• Cấu hình phân quyền bảo mật nhiều tầng với Spring Security; quản trị toàn vẹn dữ liệu qua Spring Data JPA.</li>
                    </ul>
                  </div>

                </div>
              </div>

              {/* 4. HỌC VẤN & KINH NGHIỆM */}
              <div className="cv-print-block">
                <div className="cv-print-section-title font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400 print:text-black border-b border-white/10 print:border-black pb-1 mb-2">
                  HỌC VẤN &amp; KINH NGHIỆM
                </div>
                <div className="space-y-1.5 text-xs font-sans">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <strong className="text-[#FFF6ED] print:text-black">Đại học FPT</strong> — Cử nhân Kỹ thuật Phần mềm (Software Engineering) - Định hướng Korean BrSE
                    </div>
                    <span className="font-mono text-neutral-400 print:text-black text-[11px]">2022 – 2026</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <strong className="text-[#FFF6ED] print:text-black">FPT Software Academy</strong> — Java Full-stack Fresher Training
                    </div>
                    <span className="font-mono text-neutral-400 print:text-black text-[11px]">01/2026 – 07/2026</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <strong className="text-[#FFF6ED] print:text-black">FPT Software Academy</strong> — .NET &amp; React Internship
                    </div>
                    <span className="font-mono text-neutral-400 print:text-black text-[11px]">12/2024 – 04/2025</span>
                  </div>
                </div>
              </div>

              {/* 5. NĂNG LỰC NGOẠI NGỮ */}
              <div className="cv-print-block">
                <div className="cv-print-section-title font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400 print:text-black border-b border-white/10 print:border-black pb-1 mb-2">
                  NĂNG LỰC NGOẠI NGỮ
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                  <div>
                    <strong className="text-[#FFF6ED] print:text-black">Tiếng Hàn (Korean):</strong> TOPIK Level 3 — Giao tiếp, đọc hiểu tài liệu SRS và trao đổi kỹ thuật với đối tác Hàn Quốc.
                  </div>
                  <div>
                    <strong className="text-[#FFF6ED] print:text-black">Tiếng Anh (English):</strong> Upper-intermediate — Nghiên cứu tài liệu RFC/API, giao tiếp và viết báo cáo chuyên môn trôi chảy.
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Bottom Toolbar (Hidden in Print) */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 no-print">
              <span className="text-xs text-neutral-400 font-sans">
                Hồ sơ kỹ sư Tạ Khắc Khoan • Bản cập nhật 2026
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="rounded-full px-4 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer flex items-center gap-1.5 font-sans"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-300" />
                  <span>In Hồ Sơ (Print)</span>
                </button>
                <a
                  href="/Ta-Khac-Khoan-CV.pdf"
                  download="Ta-Khac-Khoan-CV.pdf"
                  className="rounded-full px-4 py-1.5 bg-gradient-to-b from-[#FFF6ED] to-[#E2D5C5] text-black text-xs font-semibold shadow-sm hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer font-sans"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải PDF Chính Thức</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
