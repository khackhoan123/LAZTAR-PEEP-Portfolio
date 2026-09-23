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

  return (
    <div id="portfolio-page" className="relative min-h-screen w-full bg-black text-[#FFF6ED] font-sans selection:bg-[#C88A35]/30 selection:text-[#FFF6ED]">
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

      {/* Floating Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 backdrop-blur-md bg-black/40 border-b border-white/5 transition-all print:hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-xs uppercase tracking-[0.25em] text-[#FFF6ED]/90 hover:text-[#FFF6ED] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-amber-500/50 group-hover:scale-105 transition-all">
              <ArrowLeft className="w-4 h-4 text-amber-300 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span className="hidden sm:inline font-light">3D Showroom Laztar</span>
          </Link>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 bg-[#161412]/90 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)] text-[11px] font-medium text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="tracking-wider">SẴN SÀNG NHẬN VIỆC</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/Ta-Khac-Khoan-CV.pdf"
              download="Ta-Khac-Khoan-CV.pdf"
              className="text-xs font-semibold px-4 py-1.5 rounded-full bg-gradient-to-b from-[#FFF6ED] to-[#E2D5C5] text-black shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,1)] hover:brightness-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CV (PDF)</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20 flex flex-col gap-20 print:hidden">

        {/* ========================================================
            SECTION 1: HERO & PROFILE SHOWCASE
        ======================================================== */}
        <section className="relative w-full pt-6 pb-2">
          <div className="bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-8 sm:p-12 relative overflow-hidden">
            {/* Top Amber Ambient Sheen */}
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-br from-amber-500/15 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-gradient-to-tr from-amber-600/10 to-transparent blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="flex-1 space-y-6">

                {/* Single Refined Status Badge */}
                <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 bg-white/5 border border-white/10 text-xs text-neutral-200 backdrop-blur-sm shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="tracking-wide font-medium">Sẵn sàng nhận việc // TP.HCM</span>
                </div>

                {/* Primary Title */}
                <div>
                  <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#FFF6ED] leading-none mb-3">
                    TẠ KHẮC KHOAN
                  </h1>
                  <h2 className="text-lg sm:text-xl font-medium tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-[#FFF6ED] to-amber-400">
                    Full-Stack Software Engineer &amp; Korean Bridge System Engineer (BrSE)
                  </h2>
                </div>

                {/* Summary Intro - High Contrast */}
                <p className="text-neutral-200 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
                  Kỹ sư Kỹ thuật phần mềm tốt nghiệp Đại học FPT với kinh nghiệm phát triển các ứng dụng web toàn diện (End-to-End), tích hợp mô hình AI đa phương thức và triển khai hệ thống lên môi trường VPS/Cloud.
                </p>

                {/* CTA Action Buttons Group */}
                <div className="pt-2 flex flex-wrap items-center gap-3.5">
                  {/* Primary CTA Button: Download / View CV */}
                  <button
                    onClick={() => setIsCvModalOpen(true)}
                    className="rounded-full px-6 py-2.5 bg-gradient-to-b from-[#FFF6ED] to-[#E2D5C5] text-black font-semibold shadow-[0_3px_10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,1)] hover:brightness-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-black" />
                    <span>Tải CV (Bản tiếng Anh)</span>
                  </button>

                  {/* Secondary: GitHub */}
                  <a
                    href="https://github.com/khackhoan0103"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full px-4 py-2.5 bg-white/5 border border-white/10 text-xs sm:text-sm text-neutral-200 hover:text-white hover:bg-white/10 hover:border-amber-400/40 backdrop-blur-sm transition-all flex items-center gap-2 group"
                  >
                    <GithubIcon className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
                    <span>GitHub</span>
                  </a>

                  {/* Secondary: Email copy */}
                  <button
                    onClick={handleCopyEmail}
                    className="rounded-full px-4 py-2.5 bg-white/5 border border-white/10 text-xs sm:text-sm text-neutral-200 hover:text-white hover:bg-white/10 hover:border-amber-400/40 backdrop-blur-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300">Đã chép Email!</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 text-amber-300" />
                        <span>Email</span>
                      </>
                    )}
                  </button>

                  {/* Navigate back to 3D Showroom */}
                  <Link
                    href="/"
                    className="rounded-full px-4 py-2.5 bg-amber-500/10 border border-amber-500/25 text-xs sm:text-sm text-amber-200 hover:bg-amber-500/20 hover:border-amber-400 transition-all flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>3D Showroom</span>
                  </Link>
                </div>
              </div>

              {/* Profile Card with Real Avatar */}
              <div className="flex flex-col items-center p-5 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)] self-center shrink-0 group">
                <div className="relative w-48 h-60 sm:w-52 sm:h-64 rounded-2xl overflow-hidden border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.6)] group-hover:border-amber-400/50 transition-all duration-500">
                  <Image
                    src="/images/avatar.jpg"
                    alt="Tạ Khắc Khoan - Software Engineer & Korean BrSE"
                    fill
                    priority
                    sizes="(max-width: 640px) 192px, 208px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                </div>

                <div className="text-center mt-4 space-y-1 w-full">
                  <h3 className="font-heading text-xl font-bold text-[#FFF6ED] tracking-wide">
                    Tạ Khắc Khoan
                  </h3>
                  <p className="text-xs font-mono text-amber-300 tracking-wider font-medium">
                    Software Engineer / BrSE
                  </p>
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-300 pt-1">
                    <MapPin className="w-3 h-3 text-amber-400/80" />
                    <span>TP. Thủ Đức, TP.HCM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 2: TECHNICAL ARSENAL
        ======================================================== */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-amber-400 mb-2">
                <Cpu className="w-4 h-4" />
                <span>Năng lực công nghệ &amp; Chuyên môn</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-[#FFF6ED]">
                Technical Arsenal
              </h2>
            </div>
            <p className="text-xs text-neutral-300 max-w-sm">
              Phân tầng kiến trúc từ lõi Backend xử lý đa luồng, AI đa phương thức đến giao diện WebGL tương tác cao cấp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* 1. Backend & Architecture */}
            <div className="bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-6 sm:p-8 hover:border-amber-400/40 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-[#FFF6ED]">Backend &amp; Architecture</h3>
                  <span className="text-[11px] text-amber-400/80 uppercase tracking-widest font-mono">Robust Enterprise Core</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed mb-5 font-light">
                Thiết kế kiến trúc dịch vụ chuẩn MVC/Clean Architecture, xử lý bất đồng bộ đa luồng (Async/Thread Pool), phân quyền bảo mật chuyên sâu và quản trị Transaction tin cậy.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Java',
                  'Spring Boot',
                  'Spring Security',
                  'Spring Data JPA',
                  'Hibernate',
                  'ASP.NET Core Web API',
                  'RESTful APIs',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full px-3 py-1 bg-white/[0.07] border border-white/15 text-[11px] text-[#FFF6ED] font-medium backdrop-blur-sm group-hover:border-amber-400/40 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. Modern Frontend */}
            <div className="bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-6 sm:p-8 hover:border-amber-400/40 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                  <Layout className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-[#FFF6ED]">Modern Frontend</h3>
                  <span className="text-[11px] text-amber-400/80 uppercase tracking-widest font-mono">Tactile &amp; 3D Graphics</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed mb-5 font-light">
                Xây dựng giao diện Dark Skeuomorphism xúc giác cao cấp, tối ưu hóa tái kết xuất (React Rendering Performance), lập trình Shader 3D (Three.js/OGL) và tương thích hoàn toàn thiết bị.
              </p>
              <div className="flex flex-wrap gap-2">
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
                    className="rounded-full px-3 py-1 bg-white/[0.07] border border-white/15 text-[11px] text-[#FFF6ED] font-medium backdrop-blur-sm group-hover:border-amber-400/40 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. AI & Integrations */}
            <div className="bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-6 sm:p-8 hover:border-amber-400/40 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-[#FFF6ED]">AI &amp; Integrations</h3>
                  <span className="text-[11px] text-amber-400/80 uppercase tracking-widest font-mono">Multimodal &amp; Vectors</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed mb-5 font-light">
                Tích hợp mô hình AI đa phương thức giải quyết bài toán thị giác máy tính và gợi ý thông minh, trích xuất đặc trưng Vector Embeddings và thuật toán tính độ tương đồng Cosine Similarity.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Google Gemini Multimodal APIs',
                  'Vector Embeddings',
                  'Semantic Search',
                  'Cosine Similarity',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full px-3 py-1 bg-white/[0.07] border border-white/15 text-[11px] text-[#FFF6ED] font-medium backdrop-blur-sm group-hover:border-amber-400/40 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* 4. DevOps, Database & Systems */}
            <div className="bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-6 sm:p-8 hover:border-amber-400/40 transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-[#FFF6ED]">DevOps, Database &amp; Systems</h3>
                  <span className="text-[11px] text-amber-400/80 uppercase tracking-widest font-mono">Deployment &amp; Stability</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed mb-5 font-light">
                Thiết kế lược đồ cơ sở dữ liệu quan hệ, tối ưu truy vấn Indexing, đóng gói Docker container hóa đa dịch vụ và triển khai thực tế trên môi trường máy chủ Linux VPS bảo mật.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'SQL Server',
                  'MySQL',
                  'Docker',
                  'VPS Deployment',
                  'Linux',
                  'Firebase',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full px-3 py-1 bg-white/[0.07] border border-white/15 text-[11px] text-[#FFF6ED] font-medium backdrop-blur-sm group-hover:border-amber-400/40 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================
            SECTION 3: FEATURED PROJECTS
        ======================================================== */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-amber-400 mb-2">
                <Briefcase className="w-4 h-4" />
                <span>Minh chứng năng lực thực tế</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-[#FFF6ED]">
                Featured Projects
              </h2>
            </div>
            <p className="text-xs text-neutral-300 max-w-sm">
              Bộ ba dự án tiêu biểu minh chứng năng lực kiến trúc hệ thống, tích hợp AI tiên tiến và giải quyết nghiệp vụ quy mô lớn.
            </p>
          </div>

          <div className="flex flex-col gap-8">

            {/* PROJECT 01: CosMate */}
            <div className="bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-8 sm:p-10 hover:border-amber-400/40 hover:shadow-[0_0_35px_rgba(200,138,53,0.15)] transition-all duration-300 relative overflow-hidden group">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-6 pb-6 border-b border-white/10">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">PROJECT 01</span>
                    <span className="text-white/30">•</span>
                    <span className="rounded-full px-3 py-0.5 bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 font-medium">
                      Full-stack &amp; AI Integration
                    </span>
                    <span className="rounded-full px-3 py-0.5 bg-white/5 border border-white/10 text-[11px] text-neutral-300">
                      Capstone Project &amp; FPT Software Academy
                    </span>
                  </div>
                  <h3 className="font-heading text-3xl sm:text-4xl font-semibold text-[#FFF6ED] group-hover:text-amber-200 transition-colors">
                    CosMate — Nền Tảng Thuê Trang Phục Cosplay Tích Hợp AI
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['Spring Boot', 'React', 'Gemini APIs', 'Docker', 'VPS'].map((tag) => (
                    <span key={tag} className="rounded-full px-3 py-1 bg-white/[0.07] border border-white/15 text-[11px] text-[#FFF6ED] backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Body */}
              <div className="pt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <h4 className="text-xs uppercase font-mono tracking-widest text-amber-300">Mô Tả &amp; Kiến Trúc Giải Pháp:</h4>
                  <p className="text-sm text-neutral-200 leading-relaxed font-light">
                    Nền tảng thuê trang phục cosplay đa người dùng hỗ trợ 3 phân quyền và hơn 80 RESTful APIs. Tích hợp AI chấm điểm dáng và đề xuất thông minh qua Gemini Multimodal, Vector Embeddings và Cosine Similarity. Tối ưu độ tin cậy của tiến trình AI dài bằng Spring Async và Transaction Template; đóng gói Docker và triển khai thực tế trên VPS.
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-start gap-2.5 text-xs text-neutral-100">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>80+ RESTful APIs:</strong> Bảo mật RBAC đa cấp độ với Spring Security &amp; JWT Token.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-100">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>AI Multimodal:</strong> Google Gemini phân tích hình ảnh, chấm điểm khớp dáng cosplay.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-100">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Vector Search:</strong> Trích xuất embeddings và tính độ tương đồng bằng Cosine Similarity.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-100">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Asynchronous &amp; Deploy:</strong> Xử lý tác vụ AI bằng Spring Async, Dockerize và host trên Linux VPS.</span>
                    </div>
                  </div>
                </div>

                {/* Key Metrics Box */}
                <div className="rounded-xl bg-black/50 border border-white/10 p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400/80">Chỉ số nổi bật</span>
                    <div className="mt-3 space-y-3">
                      <div>
                        <div className="text-2xl font-bold font-heading text-amber-300">80+ APIs</div>
                        <div className="text-[11px] text-neutral-300">Endpoints RESTful bảo mật tối đa</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold font-heading text-[#FFF6ED]">3 Roles</div>
                        <div className="text-[11px] text-neutral-300">Customer, Cosplayer Shop, System Admin</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold font-heading text-emerald-400">100% Dockerized</div>
                        <div className="text-[11px] text-neutral-300">Môi trường sản xuất trên Linux VPS</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PROJECT 02: CineManage System */}
            <div className="bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-8 sm:p-10 hover:border-amber-400/40 hover:shadow-[0_0_35px_rgba(200,138,53,0.15)] transition-all duration-300 relative overflow-hidden group">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-6 pb-6 border-b border-white/10">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">PROJECT 02</span>
                    <span className="text-white/30">•</span>
                    <span className="rounded-full px-3 py-0.5 bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 font-medium">
                      Real-time &amp; Payment Gateway
                    </span>
                    <span className="rounded-full px-3 py-0.5 bg-white/5 border border-white/10 text-[11px] text-neutral-300">
                      FPT Software Academy
                    </span>
                  </div>
                  <h3 className="font-heading text-3xl sm:text-4xl font-semibold text-[#FFF6ED] group-hover:text-amber-200 transition-colors">
                    CineManage System — Hệ Sinh Thái Đặt Vé Xem Phim Thời Gian Thực
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['ASP.NET Core', 'React', 'TypeScript', 'SignalR', 'VNPay', 'JWT'].map((tag) => (
                    <span key={tag} className="rounded-full px-3 py-1 bg-white/[0.07] border border-white/15 text-[11px] text-[#FFF6ED] backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Body */}
              <div className="pt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <h4 className="text-xs uppercase font-mono tracking-widest text-amber-300">Mô Tả &amp; Kiến Trúc Giải Pháp:</h4>
                  <p className="text-sm text-neutral-200 leading-relaxed font-light">
                    Hệ sinh thái đặt vé xem phim với 50+ RESTful APIs. Khóa ghế theo thời gian thực (Real-time seat locking) bằng SignalR, bảo mật JWT và tích hợp cổng thanh toán VNPay.
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-start gap-2.5 text-xs text-neutral-100">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Real-time Seat Locking:</strong> Sử dụng SignalR Hubs ngăn chặn tuyệt đối tình trạng đặt trùng ghế (race condition).</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-100">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>50+ RESTful APIs:</strong> Kiến trúc module hóa trên ASP.NET Core Web API với Repository &amp; Unit of Work.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-100">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Cổng thanh toán VNPay:</strong> Xử lý quy trình thanh toán an toàn, cơ chế hoàn tiền và Webhook Instant Payment Notification (IPN).</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-100">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Quản trị cụm rạp:</strong> Quản lý lịch chiếu linh hoạt theo từng phòng chiếu, loại ghế VIP/Standard và giá vé theo khung giờ.</span>
                    </div>
                  </div>
                </div>

                {/* Key Metrics Box */}
                <div className="rounded-xl bg-black/50 border border-white/10 p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400/80">Chỉ số nổi bật</span>
                    <div className="mt-3 space-y-3">
                      <div>
                        <div className="text-2xl font-bold font-heading text-amber-300">50+ APIs</div>
                        <div className="text-[11px] text-neutral-300">ASP.NET Core C# Backend tối ưu</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold font-heading text-[#FFF6ED]">&lt; 100ms</div>
                        <div className="text-[11px] text-neutral-300">Độ trễ đồng bộ ghế qua SignalR</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold font-heading text-emerald-400">VNPay Gateway</div>
                        <div className="text-[11px] text-neutral-300">Thanh toán bảo mật chuẩn ngân hàng</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PROJECT 03: KoiCareHome */}
            <div className="bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-8 sm:p-10 hover:border-amber-400/40 hover:shadow-[0_0_35px_rgba(200,138,53,0.15)] transition-all duration-300 relative overflow-hidden group">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-6 pb-6 border-b border-white/10">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">PROJECT 03</span>
                    <span className="text-white/30">•</span>
                    <span className="rounded-full px-3 py-0.5 bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 font-medium">
                      Enterprise Java &amp; Data Management
                    </span>
                  </div>
                  <h3 className="font-heading text-3xl sm:text-4xl font-semibold text-[#FFF6ED] group-hover:text-amber-200 transition-colors">
                    KoiCareHome — Nền Tảng Quản Lý Hồ Nuôi &amp; Sức Khỏe Cá Koi
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['Java', 'Spring Boot', 'React', 'SQL Server', 'Spring Security'].map((tag) => (
                    <span key={tag} className="rounded-full px-3 py-1 bg-white/[0.07] border border-white/15 text-[11px] text-[#FFF6ED] backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Body */}
              <div className="pt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <h4 className="text-xs uppercase font-mono tracking-widest text-amber-300">Mô Tả &amp; Kiến Trúc Giải Pháp:</h4>
                  <p className="text-sm text-neutral-200 leading-relaxed font-light">
                    Ứng dụng quản lý hồ và cá Koi thông qua 50+ APIs, cấu hình phân quyền bảo mật với Spring Security và quản trị dữ liệu qua Spring Data JPA.
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="flex items-start gap-2.5 text-xs text-neutral-100">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>50+ APIs chuyên biệt:</strong> Theo dõi chất lượng nước (nồng độ pH, Oxy, nhiệt độ, NO2) và hồ sơ từng cá thể cá Koi.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-100">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Bảo mật Spring Security:</strong> Kiểm soát chặt chẽ phân quyền chủ sở hữu hồ cá và kỹ thuật viên chăm sóc.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-100">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Spring Data JPA &amp; SQL Server:</strong> Thiết kế chuẩn hóa cơ sở dữ liệu quan hệ, tối ưu truy vấn thống kê dữ liệu.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-neutral-100">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Cảnh báo thông minh:</strong> Tự động tính toán lượng thức ăn theo độ tuổi/kích thước và cảnh báo sớm khi chất lượng nước bất thường.</span>
                    </div>
                  </div>
                </div>

                {/* Key Metrics Box */}
                <div className="rounded-xl bg-black/50 border border-white/10 p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400/80">Chỉ số nổi bật</span>
                    <div className="mt-3 space-y-3">
                      <div>
                        <div className="text-2xl font-bold font-heading text-amber-300">50+ APIs</div>
                        <div className="text-[11px] text-neutral-300">Dịch vụ quản lý nước &amp; cá Koi</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold font-heading text-[#FFF6ED]">Automated</div>
                        <div className="text-[11px] text-neutral-300">Tính toán dinh dưỡng &amp; cảnh báo chỉ số nước</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold font-heading text-emerald-400">JPA &amp; SQL Server</div>
                        <div className="text-[11px] text-neutral-300">Toàn vẹn dữ liệu chuỗi lịch sử chăm sóc</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================
            SECTION 4: EXPERIENCE, EDUCATION & LANGUAGES
        ======================================================== */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-amber-400 mb-2">
                <GraduationCap className="w-4 h-4" />
                <span>Hành trình học vấn &amp; Kinh nghiệm</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight text-[#FFF6ED]">
                Experience &amp; Education
              </h2>
            </div>
            <p className="text-xs text-neutral-300 max-w-sm">
              Lộ trình đào tạo chuẩn kỹ sư phần mềm, thực tập doanh nghiệp và năng lực ngoại ngữ cầu nối đa quốc gia.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Timeline: Experience & Education (2 Columns) */}
            <div className="lg:col-span-2 bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-8">
              <div className="relative border-l border-amber-500/30 pl-6 ml-3 space-y-8">

                {/* Milestone 1 */}
                <div className="relative group">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-amber-400 ring-4 ring-[#161412] shadow-[0_0_10px_rgba(200,138,53,0.8)] group-hover:scale-125 transition-transform" />
                  <span className="text-xs font-mono font-bold text-amber-300 tracking-wider">01/2026 – 07/2026</span>
                  <h3 className="font-heading text-2xl font-semibold text-[#FFF6ED] mt-1">
                    Java Full-stack Fresher Training
                  </h3>
                  <div className="text-xs text-neutral-400 mb-2">FPT Software Academy</div>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-light">
                    Chương trình đào tạo Fresher chuyên sâu về kiến trúc Java Enterprise, phát triển hệ thống doanh nghiệp với Spring Boot, Spring Security, microservices chuẩn mực và quy trình phát triển phần mềm chuẩn Agile/Scrum.
                  </p>
                </div>

                {/* Milestone 2 */}
                <div className="relative group">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-amber-300 ring-4 ring-[#161412] shadow-[0_0_10px_rgba(200,138,53,0.6)] group-hover:scale-125 transition-transform" />
                  <span className="text-xs font-mono font-bold text-amber-300 tracking-wider">12/2024 – 04/2025</span>
                  <h3 className="font-heading text-2xl font-semibold text-[#FFF6ED] mt-1">
                    .NET &amp; React Internship
                  </h3>
                  <div className="text-xs text-neutral-400 mb-2">FPT Software Academy</div>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-light">
                    Thực tập sinh kỹ thuật phần mềm, trực tiếp tham gia phát triển hệ thống CineManage System với ASP.NET Core Web API, xây dựng giao diện tương tác React TypeScript, triển khai SignalR đồng bộ dữ liệu thời gian thực và tích hợp cổng thanh toán VNPay.
                  </p>
                </div>

                {/* Milestone 3 */}
                <div className="relative group">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[#FFF6ED] ring-4 ring-[#161412] shadow-[0_0_10px_rgba(255,246,237,0.5)] group-hover:scale-125 transition-transform" />
                  <span className="text-xs font-mono font-bold text-neutral-400 tracking-wider">2022 – 2026</span>
                  <h3 className="font-heading text-2xl font-semibold text-[#FFF6ED] mt-1">
                    Cử nhân Kỹ thuật Phần mềm (Software Engineering)
                  </h3>
                  <div className="text-xs text-amber-300 mb-2 font-medium">Đại học FPT — Định hướng Kỹ sư Cầu nối tiếng Hàn (BrSE)</div>
                  <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-light">
                    Tốt nghiệp cử nhân Kỹ thuật Phần mềm chính quy. Trang bị vững chắc nền tảng khoa học máy tính, cấu trúc dữ liệu và giải thuật, thiết kế hướng đối tượng (OOP), các mẫu thiết kế (Design Patterns) và đào tạo chuyên biệt kỹ sư cầu nối công nghệ tiếng Hàn (Korean Bridge SE).
                  </p>
                </div>

              </div>
            </div>

            {/* Languages & Bridge Capability (1 Column) */}
            <div className="bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2.5 text-amber-400 mb-4">
                  <Languages className="w-5 h-5" />
                  <h3 className="font-heading text-2xl font-semibold text-[#FFF6ED]">Năng Lực Ngôn Ngữ</h3>
                </div>
                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed mb-6 font-light">
                  Nền tảng ngoại ngữ vững chắc sẵn sàng đáp ứng vai trò Kỹ sư cầu nối (BrSE) hoặc làm việc trong môi trường dự án công nghệ quốc tế.
                </p>

                <div className="space-y-5">
                  {/* Korean */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#FFF6ED]">Tiếng Hàn (Korean)</span>
                      <span className="rounded-full px-2.5 py-0.5 bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/30">
                        TOPIK Level 3
                      </span>
                    </div>
                    <p className="text-xs text-neutral-200 leading-relaxed font-light">
                      Khả năng giao tiếp trực tiếp, đọc hiểu tài liệu đặc tả yêu cầu phần mềm (SRS), dịch thuật tài liệu kỹ thuật và trao đổi nghiệp vụ với khách hàng Hàn Quốc.
                    </p>
                  </div>

                  {/* English */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#FFF6ED]">Tiếng Anh (English)</span>
                      <span className="rounded-full px-2.5 py-0.5 bg-white/10 text-white font-mono text-xs font-bold border border-white/15">
                        Upper-intermediate
                      </span>
                    </div>
                    <p className="text-xs text-neutral-200 leading-relaxed font-light">
                      Nghiên cứu tài liệu công nghệ chuyên sâu, RFC, tài liệu API chuẩn hóa quốc tế, giao tiếp và viết báo cáo kỹ thuật trôi chảy.
                    </p>
                  </div>
                </div>
              </div>

              {/* Ready to connect banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 to-transparent border border-amber-500/20 text-xs text-amber-200 flex items-center gap-3">
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
          <div className="bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-8 sm:p-12 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-white/10">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-amber-400">
                  <Mail className="w-4 h-4" />
                  <span>Kênh liên lạc trực tiếp</span>
                </div>
                <h3 className="font-heading text-3xl sm:text-4xl font-semibold text-[#FFF6ED]">
                  Sẵn Sàng Hợp Tác &amp; Cống Hiến
                </h3>
                <p className="text-xs sm:text-sm text-neutral-200 max-w-xl font-light">
                  Hãy kết nối với tôi để trao đổi về cơ hội nghề nghiệp, dự án phần mềm hoặc các vị trí Kỹ sư cầu nối công nghệ (BrSE).
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsCvModalOpen(true)}
                  className="rounded-full px-6 py-2.5 bg-gradient-to-b from-[#FFF6ED] to-[#E2D5C5] text-black font-semibold shadow-[0_3px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,1)] hover:brightness-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-black" />
                  <span>Tải CV (Bản tiếng Anh)</span>
                </button>

                <a
                  href="mailto:takhackhoan@gmail.com"
                  className="rounded-full px-5 py-2.5 bg-white/5 border border-white/10 text-sm text-neutral-100 hover:bg-white/10 hover:border-amber-400/40 backdrop-blur-sm transition-all flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-amber-300" />
                  <span>Gửi Thư Điện Tử</span>
                </a>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

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
                <div className="text-sm font-medium text-[#FFF6ED]">0944 183 376</div>
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
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
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
          CV PREVIEW & DOWNLOAD MODAL (SKEUOMORPHIC + CLEAN A4 PRINT)
      ======================================================== */}
      {isCvModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in cv-modal-overlay">
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#191613] border border-amber-500/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.95)] p-6 sm:p-8 text-[#FFF6ED] cv-modal-card">

            {/* Modal Header & Pill Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-white/10 gap-4 no-print">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="font-heading text-2xl font-semibold text-[#FFF6ED]">
                  Hồ Sơ Kỹ Sư — Tạ Khắc Khoan
                </h3>
              </div>

              {/* Pill Toolbar */}
              <div className="flex flex-wrap items-center gap-2">
                {/* 1. Official PDF Download */}
                <a
                  href="/Ta-Khac-Khoan-CV.pdf"
                  download="Ta-Khac-Khoan-CV.pdf"
                  className="rounded-full px-4 py-2 bg-gradient-to-b from-[#FFF6ED] to-[#E2D5C5] text-black text-xs font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,1)] hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải PDF chính thức (English CV)</span>
                </a>

                {/* 2. Print Clean A4 */}
                <button
                  onClick={() => window.print()}
                  className="rounded-full px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-medium text-white transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-300" />
                  <span>In hồ sơ (Print)</span>
                </button>

                {/* 3. Close Button */}
                <button
                  onClick={() => setIsCvModalOpen(false)}
                  className="rounded-full px-3.5 py-2 bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-medium text-neutral-300 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Đóng</span>
                </button>
              </div>
            </div>

            {/* Modal Body / Printable CV (Dual-mode: Screen Dark Mode & Print Clean A4) */}
            <div id="printable-cv" className="py-6 space-y-6 text-sm text-neutral-100">

              {/* Header Box */}
              <div className="cv-print-section p-5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#FFF6ED]">TẠ KHẮC KHOAN</h1>
                    <h2 className="text-amber-300 font-semibold text-sm mt-0.5">
                      Full-Stack Software Engineer &amp; Korean Bridge System Engineer (BrSE)
                    </h2>
                  </div>
                  <div className="text-xs text-neutral-300 font-mono space-y-1 sm:text-right">
                    <div>Email: takhackhoan@gmail.com</div>
                    <div>Điện thoại: 0944 183 376</div>
                    <div>Địa điểm: TP. Thủ Đức, TP.HCM</div>
                    <div>GitHub: github.com/khackhoan0103</div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="cv-print-section">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-2">
                  1. TÓM TẮT NĂNG LỰC (EXECUTIVE SUMMARY)
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-neutral-200 font-light">
                  Kỹ sư Kỹ thuật phần mềm tốt nghiệp Đại học FPT với nền tảng vững chắc về kiến trúc phần mềm, phát triển ứng dụng web quy mô lớn (End-to-End), tích hợp mô hình AI đa phương thức và đóng gói triển khai máy chủ VPS/Linux. Năng lực ngoại ngữ tiếng Hàn (TOPIK 3) và tiếng Anh (Upper-intermediate) sẵn sàng đảm nhận vai trò Kỹ sư cầu nối (BrSE) hoặc Full-stack Software Engineer.
                </p>
              </div>

              {/* Core Technical Arsenal */}
              <div className="cv-print-section">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-2">
                  2. KỸ NĂNG CÔNG NGHỆ CHÍNH (TECHNICAL ARSENAL)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-lg bg-black/40 border border-white/10 cv-print-pill">
                    <span className="font-semibold text-[#FFF6ED]">Backend:</span> Java, Spring Boot, Spring Security, Spring Data JPA, Hibernate, ASP.NET Core Web API, RESTful APIs, JWT.
                  </div>
                  <div className="p-3.5 rounded-lg bg-black/40 border border-white/10 cv-print-pill">
                    <span className="font-semibold text-[#FFF6ED]">Frontend:</span> React, TypeScript, Next.js, Tailwind CSS, Ant Design, Three.js, OGL, Dark Skeuomorphism UI.
                  </div>
                  <div className="p-3.5 rounded-lg bg-black/40 border border-white/10 cv-print-pill">
                    <span className="font-semibold text-[#FFF6ED]">AI &amp; Algorithms:</span> Google Gemini Multimodal APIs, Vector Embeddings, Semantic Search, Cosine Similarity.
                  </div>
                  <div className="p-3.5 rounded-lg bg-black/40 border border-white/10 cv-print-pill">
                    <span className="font-semibold text-[#FFF6ED]">DevOps &amp; DB:</span> SQL Server, MySQL, Docker, Linux, VPS Deployment, Nginx, Git, Firebase.
                  </div>
                </div>
              </div>

              {/* Featured Projects */}
              <div className="cv-print-section">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-2">
                  3. DỰ ÁN TRỌNG ĐIỂM (KEY PROJECTS)
                </h3>
                <div className="space-y-4 text-xs text-neutral-200">

                  {/* Project 1 */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 cv-print-pill space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <span className="font-bold text-[#FFF6ED] text-sm">
                        CosMate — Nền tảng thuê trang phục cosplay tích hợp AI
                      </span>
                      <span className="font-mono text-amber-300 text-[11px]">Capstone Project &amp; FPT Software Academy</span>
                    </div>
                    <div className="text-[11px] text-amber-200/80 font-mono">
                      Tech Stack: Spring Boot, React, Gemini Multimodal, Vector Embeddings, Docker, VPS
                    </div>
                    <p className="leading-relaxed font-light text-neutral-200 pt-1">
                      - Xây dựng 80+ RESTful APIs bảo mật RBAC 3 phân quyền (Customer, Shop, Admin) qua Spring Security &amp; JWT.<br />
                      - Tích hợp Gemini Multimodal AI chấm điểm khớp dáng cosplay và gợi ý sản phẩm thông minh qua Vector Embeddings và Cosine Similarity.<br />
                      - Xử lý tiến trình AI dài bằng Spring Async và Transaction Template; đóng gói Docker triển khai thực tế trên Linux VPS.
                    </p>
                  </div>

                  {/* Project 2 */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 cv-print-pill space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <span className="font-bold text-[#FFF6ED] text-sm">
                        CineManage System — Hệ sinh thái đặt vé xem phim thời gian thực
                      </span>
                      <span className="font-mono text-amber-300 text-[11px]">FPT Software Academy</span>
                    </div>
                    <div className="text-[11px] text-amber-200/80 font-mono">
                      Tech Stack: ASP.NET Core Web API, React, TypeScript, SignalR Hubs, VNPay Gateway
                    </div>
                    <p className="leading-relaxed font-light text-neutral-200 pt-1">
                      - Phát triển 50+ RESTful APIs quản trị lịch chiếu, cụm rạp và hệ thống đặt vé xem phim.<br />
                      - Triển khai cơ chế khóa ghế theo thời gian thực (Real-time seat locking) bằng SignalR Hubs, ngăn chặn triệt để đặt trùng ghế.<br />
                      - Tích hợp cổng thanh toán trực tuyến bảo mật VNPay sandbox kèm cơ chế hoàn tiền tự động và IPN.
                    </p>
                  </div>

                  {/* Project 3 */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 cv-print-pill space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <span className="font-bold text-[#FFF6ED] text-sm">
                        KoiCareHome — Ứng dụng quản lý hồ nuôi &amp; sức khỏe cá Koi
                      </span>
                      <span className="font-mono text-amber-300 text-[11px]">Java Enterprise &amp; Spring Boot</span>
                    </div>
                    <div className="text-[11px] text-amber-200/80 font-mono">
                      Tech Stack: Java, Spring Boot, React, SQL Server, Spring Security, Spring Data JPA
                    </div>
                    <p className="leading-relaxed font-light text-neutral-200 pt-1">
                      - Thiết kế 50+ APIs theo dõi thông số nước (pH, Oxy, nhiệt độ), lịch sử tăng trưởng và chu kỳ cho ăn của cá Koi.<br />
                      - Cấu hình phân quyền bảo mật nhiều cấp bằng Spring Security và quản trị toàn vẹn dữ liệu qua Spring Data JPA &amp; SQL Server.<br />
                      - Tự động hóa cảnh báo môi trường nước khi phát hiện chỉ số vượt ngưỡng an toàn.
                    </p>
                  </div>

                </div>
              </div>

              {/* Education & Experience */}
              <div className="cv-print-section">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-2">
                  4. HỌC VẤN &amp; KINH NGHIỆM ĐÀO TẠO (EDUCATION &amp; TRAINING)
                </h3>
                <div className="space-y-2 text-xs text-neutral-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <strong>Đại học FPT:</strong> Cử nhân Kỹ thuật Phần mềm (Software Engineering) - Định hướng Korean BrSE
                    </div>
                    <span className="font-mono text-neutral-400 text-[11px]">2022 – 2026</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <strong>FPT Software Academy:</strong> Java Full-stack Fresher Training
                    </div>
                    <span className="font-mono text-neutral-400 text-[11px]">01/2026 – 07/2026</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div>
                      <strong>FPT Software Academy:</strong> .NET &amp; React Internship
                    </div>
                    <span className="font-mono text-neutral-400 text-[11px]">12/2024 – 04/2025</span>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="cv-print-section">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-2">
                  5. NĂNG LỰC NGOẠI NGỮ (LANGUAGES)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-200">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/10 cv-print-pill">
                    <strong>Tiếng Hàn (Korean):</strong> TOPIK Level 3 — Đọc hiểu tài liệu SRS, đặc tả phần mềm và giao tiếp kỹ thuật với khách hàng Hàn Quốc.
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/10 cv-print-pill">
                    <strong>Tiếng Anh (English):</strong> Upper-intermediate — Đọc hiểu tài liệu RFC, API specification và trao đổi chuyên môn quốc tế trôi chảy.
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Bottom Toolbar */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 no-print">
              <span className="text-xs text-neutral-400">
                Hồ sơ kỹ sư Tạ Khắc Khoan • Cập nhật 2026
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="rounded-full px-4 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-300" />
                  <span>In Hồ Sơ (Print)</span>
                </button>
                <a
                  href="/Ta-Khac-Khoan-CV.pdf"
                  download="Ta-Khac-Khoan-CV.pdf"
                  className="rounded-full px-4 py-1.5 bg-gradient-to-b from-[#FFF6ED] to-[#E2D5C5] text-black text-xs font-semibold shadow-sm hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
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
