'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { 
  MapPin, 
  Maximize2, 
  X, 
  CheckCircle2, 
  Send, 
  Layers, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import GlowCursor from '@/components/ui/GlowCursor';

// Dynamic import with ssr: false for 3D Scene
const LaztarScene = dynamic(
  () => import('@/components/3d/LaztarScene'),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 bg-[#000000] flex flex-col items-center justify-center z-50">
        <div className="w-14 h-14 rounded-full border-2 border-amber-500/20 border-t-amber-400 animate-spin" />
        <span className="mt-4 font-sans text-sm tracking-[0.3em] text-white/90 uppercase font-light">
          LAZTAR
        </span>
        <span className="text-[10px] tracking-widest text-amber-400/70 uppercase mt-1">
          Khởi tạo không gian 3D...
        </span>
      </div>
    ),
  }
);

interface ProjectItem {
  id: string;
  title: string;
  location: string;
  scale: string;
  type: string;
  solution: string;
  investment: string;
  year: string;
  image: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'villa',
    title: 'Biệt Thự Đồi Sapphire',
    location: 'Đà Lạt, Lâm Đồng',
    scale: '1.200 m² sàn • 3 Tầng',
    type: 'Biệt Thự Sinh Thái Nghỉ Dưỡng',
    solution: 'Kết cấu bê tông cốt thép dự ứng lực & Kính Low-E cản nhiệt',
    investment: '45+ Tỷ VNĐ',
    year: '2025 - 2026',
    image: '/images/projects/villa.jpg',
  },
  {
    id: 'tower',
    title: 'Laztar Innovation Tower',
    location: 'Cầu Giấy, Hà Nội',
    scale: '85.000 m² sàn • 45 Tầng',
    type: 'Tòa Nhà Văn Phòng & Khách Sạn',
    solution: 'Mặt dựng Unitized đúc sẵn tiêu chuẩn LEED Platinum & Cốt thép cường độ cao',
    investment: '1.200+ Tỷ VNĐ',
    year: '2024 - 2026',
    image: '/images/projects/tower.jpg',
  },
  {
    id: 'eco',
    title: 'Khu Đô Thị Eco-Haven',
    location: 'Bến Cát, Bình Dương',
    scale: '50 Hecta • 1.500 Căn Biệt Thự',
    type: 'Đại Đô Thị Sinh Thái Thông Minh',
    solution: 'Hạ tầng ngầm kỹ thuật số, hồ cảnh quan điều hòa & Năng lượng mặt trời tập trung',
    investment: '3.500+ Tỷ VNĐ',
    year: '2025 - 2028',
    image: '/images/projects/eco.jpg',
  },
];

interface FormErrors {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
}

export default function HomePage() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSlide, setActiveSlide] = useState<number>(1);

  // Modal States
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);
  const [activeDetailProject, setActiveDetailProject] = useState<ProjectItem | null>(null);

  // Form State & Validation
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<{ [key: string]: boolean }>({});

  // Validation rules
  const validateField = (name: string, value: string): string => {
    if (name === 'fullName') {
      if (!value.trim()) return 'Vui lòng nhập họ và tên của bạn';
      if (value.trim().length < 2) return 'Họ và tên tối thiểu 2 ký tự';
    }
    if (name === 'phoneNumber') {
      if (!value.trim()) return 'Vui lòng nhập số điện thoại liên hệ';
      const clean = value.replace(/[\s.-]/g, '');
      const vnPhoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
      if (!vnPhoneRegex.test(clean)) {
        return 'Số điện thoại không hợp lệ (10 số, bắt đầu bằng 03, 05, 07, 08, 09 hoặc +84)';
      }
    }
    if (name === 'email') {
      if (!value.trim()) return 'Vui lòng nhập địa chỉ email';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) {
        return 'Email không hợp lệ (VD: contact@laztar.vn)';
      }
    }
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormErrors]) {
      const err = validateField(name, value);
      setFormErrors(prev => ({ ...prev, [name]: err }));
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setFormErrors(prev => ({ ...prev, [name]: err }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameErr = validateField('fullName', formData.fullName);
    const phoneErr = validateField('phoneNumber', formData.phoneNumber);
    const emailErr = validateField('email', formData.email);

    if (nameErr || phoneErr || emailErr) {
      setFormErrors({
        fullName: nameErr,
        phoneNumber: phoneErr,
        email: emailErr,
      });
      setTouchedFields({
        fullName: true,
        phoneNumber: true,
        email: true,
      });
      return;
    }

    setFormErrors({});
    setContactSubmitted(true);
    setTimeout(() => {
      setIsContactOpen(false);
      setContactSubmitted(false);
      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        message: '',
      });
      setTouchedFields({});
    }, 2500);
  };

  // Track scroll smoothly
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
        setScrollProgress(progress);

        if (progress < 0.25) {
          setActiveSlide(1);
        } else if (progress >= 0.25 && progress < 0.50) {
          setActiveSlide(2);
        } else if (progress >= 0.50 && progress < 0.78) {
          setActiveSlide(3);
        } else {
          setActiveSlide(4);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation jump
  const scrollToSlide = (slideIndex: number) => {
    const targetScrolls = [0.0, 0.35, 0.64, 0.95];
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = maxScroll * (targetScrolls[slideIndex - 1] ?? 0);
    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  const getDashFill = (index: number) => {
    const start = (index - 1) * 0.25;
    const end = index * 0.25;
    const p = Math.max(0, Math.min(1, (scrollProgress - start) / (end - start)));
    return `${p * 100}%`;
  };

  return (
    <div className="relative w-full min-h-[500vh] bg-black select-none font-sans">
      {/* ========================================================
          1. LUMINOUS GLOW CURSOR (OGL WebGL Shader)
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

      {/* ========================================================
          FIXED 3D WEBGL BACKGROUND (Canvas + Fluid Waves + 3D Building)
          Preserved 100% intact
      ======================================================== */}
      <div className="fixed inset-0 w-full h-full z-1 pointer-events-auto">
        <LaztarScene scrollProgress={scrollProgress} />
      </div>

      {/* ========================================================
          EDITORIAL STRUCTURAL GRID OVERLAY
      ======================================================== */}
      <div className="grid-horizontal-line" />
      <div className="grid-lines">
        <div className="grid-line">
          <div className="grid-dot" style={{ top: `${((scrollProgress * 120 + 20) % 80) + 10}%` }} />
        </div>
        <div className="grid-line">
          <div className="grid-dot" style={{ top: `${((scrollProgress * -150 + 60) % 80 + 80) % 80 + 10}%` }} />
        </div>
        <div className="grid-line">
          <div className="grid-dot" style={{ top: `${((scrollProgress * 140 + 40) % 80) + 10}%` }} />
        </div>
        <div className="grid-line">
          <div className="grid-dot" style={{ top: `${((scrollProgress * -110 + 75) % 80 + 80) % 80 + 10}%` }} />
        </div>
        <div className="grid-line relative">
          <div className="grid-dot" style={{ top: `${((scrollProgress * 180 + 15) % 80) + 10}%` }} />
          
          <div className="story-dashes">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="story-dash">
                <div 
                  className="story-dash-fill" 
                  style={{ height: getDashFill(i) }} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================
          CINEMATIC FIXED CONTAINER (Navbar + Skeuomorphic Stages)
      ======================================================== */}
      <div className="fixed inset-0 w-full h-full z-10 pointer-events-none flex flex-col justify-between px-6 sm:px-12 lg:px-16 py-5 box-border">
        
        {/* ========================================================
            CLEAN NAVBAR (Logo + 4 Scroll Anchors + Tactile CTA)
        ======================================================== */}
        <header className="w-full flex items-center justify-between pointer-events-auto z-20">
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => scrollToSlide(1)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-[#161412]/85 border border-white/15 p-1 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_8px_20px_rgba(0,0,0,0.7)] group-hover:border-amber-400/50 transition-all">
              <Image 
                src="/images/logo.png" 
                alt="Laztar Logo" 
                width={36} 
                height={36} 
                className="w-full h-full object-contain"
                priority 
              />
            </div>
            <div>
              <span className="font-sans text-base tracking-[0.2em] text-white block leading-none group-hover:text-amber-300 transition-colors font-semibold">
                LAZTAR
              </span>
              <span className="text-[9px] tracking-[0.25em] text-[#C88A35] uppercase font-medium">
                CONSTRUCTION
              </span>
            </div>
          </div>

          {/* 4 Scroll Anchors + Tactile Pill CTA */}
          <div className="flex items-center gap-4 sm:gap-6">
            <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-[#161412]/80 backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_24px_rgba(0,0,0,0.6)] text-xs uppercase tracking-[2px]">
              {[
                { name: 'Kiến Trúc', slide: 1 },
                { name: 'Cảnh Quan', slide: 2 },
                { name: 'Showroom', slide: 3 },
                { name: 'Dự Án', slide: 4 },
              ].map((item) => (
                <button
                  key={item.slide}
                  onClick={() => scrollToSlide(item.slide)}
                  className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                    activeSlide === item.slide 
                      ? 'bg-white/10 text-[#FFF6ED] font-medium shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] border border-white/10' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Tactile Button: CTA Liên Hệ */}
            <button
              onClick={() => setIsContactOpen(true)}
              className="rounded-full px-6 py-2.5 bg-gradient-to-b from-[#FFF6ED] to-[#E2D5C5] text-black font-semibold text-[11px] uppercase tracking-wider shadow-[0_3px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,1)] hover:brightness-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Liên Hệ</span>
              <span className="w-1.5 h-1.5 rounded-full bg-black/80" />
            </button>
          </div>
        </header>

        {/* ========================================================
            STAGE 1: HERO - TOÀN CẢNH KIẾN TRÚC
        ======================================================== */}
        <div 
          className={`absolute bottom-[11%] left-6 sm:left-12 lg:left-16 transition-all duration-700 pointer-events-auto ${
            activeSlide === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <div className="bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-6 sm:p-8 max-w-lg">
            {/* Micro-Badge: 01 // SHOWCASE KIẾN TRÚC */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm text-[11px] font-medium tracking-[0.2em] text-[#FFF6ED]/80 uppercase mb-3 font-body">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
              <span>01 // SHOWCASE KIẾN TRÚC</span>
            </div>

            {/* Title with White-to-Metallic Gradient */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wider text-[#FFF6ED] mb-3">
              <span className="block bg-clip-text text-transparent bg-gradient-to-b from-[#FFF6ED] via-[#f7eee4] to-[#C8B8A6]">
                Kiến Trúc &amp; Tầm Vóc
              </span>
            </h1>

            {/* Contrast-Rich Description */}
            <p className="font-body font-light text-sm text-[#d1d5db] leading-relaxed">
              Khởi sinh từ tư duy quy hoạch chuẩn mực và kỹ nghệ thi công tinh xảo của Laztar. Mỗi công trình là một biểu tượng trường tồn, dung hòa tuyệt đối giữa công năng hiện đại và thẩm mỹ vị lai.
            </p>
          </div>
        </div>

        {/* ========================================================
            STAGE 2: CẬN CẢNH & TIẾN VÀO SHOWROOM NỘI BỘ
        ======================================================== */}
        <div 
          className={`absolute bottom-[11%] left-6 sm:left-12 lg:left-16 transition-all duration-700 pointer-events-auto ${
            activeSlide === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <div className="bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-6 sm:p-8 max-w-lg">
            {/* Micro-Badge: 02 // KHÔNG GIAN NỘI KHU */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm text-[11px] font-medium tracking-[0.2em] text-[#FFF6ED]/80 uppercase mb-3 font-body">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
              <span>02 // KHÔNG GIAN NỘI KHU</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wider text-[#FFF6ED] mb-3">
              <span className="block bg-clip-text text-transparent bg-gradient-to-b from-[#FFF6ED] via-[#f7eee4] to-[#C8B8A6]">
                Quy Hoạch &amp; Cảnh Quan
              </span>
            </h2>

            <p className="font-body font-light text-sm text-[#d1d5db] leading-relaxed">
              Bước qua lớp kính tràn viền vào không gian triển lãm nội khu. Nơi hội tụ các giải pháp kết cấu vượt nhịp, mặt nước sinh thái và nghệ thuật hoàn thiện bề mặt tiêu chuẩn quốc tế.
            </p>
          </div>
        </div>

        {/* ========================================================
            STAGE 3: SHOWROOM TRIỂN LÃM 3 DỰ ÁN TIÊU BIỂU
        ======================================================== */}
        <div 
          className={`absolute bottom-[7%] left-6 sm:left-12 lg:left-16 right-6 sm:right-12 lg:right-16 transition-all duration-700 ${
            activeSlide === 3 ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            {/* Left Description Card */}
            <div className="bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-5 sm:p-6 max-w-md">
              {/* Micro-Badge: 03 // SHOWROOM TRIỂN LÃM */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm text-[11px] font-medium tracking-[0.2em] text-[#FFF6ED]/80 uppercase mb-3 font-body">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                <span>03 // SHOWROOM TRIỂN LÃM</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-normal tracking-wider text-[#FFF6ED] mb-2">
                <span className="block bg-clip-text text-transparent bg-gradient-to-b from-[#FFF6ED] via-[#f7eee4] to-[#C8B8A6]">
                  Kiệt Tác Tiêu Biểu
                </span>
              </h2>

              <p className="font-body font-light text-xs sm:text-sm text-[#d1d5db] leading-relaxed">
                Các dự án đại diện cho năng lực tổng thầu quy mô lớn của Laztar. Nhấp vào từng thẻ để xem chi tiết ảnh và thông số kỹ thuật.
              </p>
            </div>

            {/* Right: 3 Tactile Showroom Cards */}
            <div className="bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-3 flex flex-wrap sm:flex-nowrap gap-3 w-full lg:max-w-2xl">
              {PROJECTS_DATA.map((proj, idx) => (
                <div
                  key={proj.id}
                  onClick={() => setActiveDetailProject(proj)}
                  className="w-full sm:w-1/3 p-3 rounded-xl border border-white/10 hover:border-[#C88A35]/80 bg-white/5 hover:bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] hover:shadow-[0_8px_20px_rgba(200,138,53,0.2)] transition-all cursor-pointer group -translate-y-0 hover:-translate-y-1"
                >
                  <div className="relative w-full h-24 rounded-lg overflow-hidden mb-2 bg-[#12100e]">
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-sm border border-white/10 text-[9px] font-mono text-[#FFF6ED] uppercase">
                      0{idx + 1}
                    </div>
                  </div>

                  <h3 className="font-heading text-xs font-normal text-white truncate group-hover:text-[#FFF6ED] transition-colors tracking-wide">
                    {proj.title}
                  </h3>

                  <div className="flex items-center gap-1 text-[10px] text-neutral-400 mt-1 font-body">
                    <MapPin className="w-2.5 h-2.5 text-[#C88A35] shrink-0" />
                    <span className="truncate">{proj.location}</span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-neutral-500 mt-0.5 font-body">
                    <Maximize2 className="w-2.5 h-2.5 text-neutral-500 shrink-0" />
                    <span className="truncate">{proj.scale}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================
            STAGE 4: LIÊN HỆ & DỰ TOÁN BÁO GIÁ
        ======================================================== */}
        <div 
          className={`absolute bottom-[11%] left-6 sm:left-12 lg:left-16 transition-all duration-700 pointer-events-auto ${
            activeSlide === 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <div className="bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)] p-6 sm:p-8 max-w-lg">
            {/* Micro-Badge: 04 // LIÊN HỆ & DỰ TOÁN */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-sm text-[11px] font-medium tracking-[0.2em] text-[#FFF6ED]/80 uppercase mb-3 font-body">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
              <span>04 // LIÊN HỆ &amp; DỰ TOÁN</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wider text-[#FFF6ED] mb-3">
              <span className="block bg-clip-text text-transparent bg-gradient-to-b from-[#FFF6ED] via-[#f7eee4] to-[#C8B8A6]">
                Khởi Tạo Biểu Tượng
              </span>
            </h2>

            <p className="font-body font-light text-sm text-[#d1d5db] leading-relaxed mb-6">
              Đồng hành cùng chủ đầu tư hiện thực hóa những công trình thế kỷ. Nhận ngay hồ sơ năng lực thi công và bảng dự toán chi tiết từ kỹ sư trưởng Laztar.
            </p>

            {/* Tactile Button: Nhận Báo Giá */}
            <button
              onClick={() => setIsContactOpen(true)}
              className="rounded-full px-6 py-2.5 bg-gradient-to-b from-[#FFF6ED] to-[#E2D5C5] text-black font-semibold shadow-[0_3px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,1)] hover:brightness-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2.5 text-xs uppercase tracking-wider"
            >
              <span>Nhận Báo Giá &amp; Bản Vẽ Kỹ Thuật</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* FOOTER METRICS & PROGRESS INDICATOR */}
        <footer className="w-full flex items-center justify-between text-[11px] text-white/50 tracking-wider pointer-events-auto pt-3">
          <div className="flex items-center gap-4 px-4 py-1.5 rounded-full bg-[#161412]/80 backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            <span>© 2026 LAZTAR GROUP</span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="hidden sm:inline text-[#FFF6ED]/80">NĂNG LỰC THI CÔNG HẠNG 1 QUỐC GIA</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#161412]/80 backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            <span className="text-[#C88A35] font-mono">0{activeSlide}</span>
            <div className="w-16 h-[2px] bg-white/15 rounded-full relative overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#C88A35] to-[#FFF6ED] transition-all duration-300"
                style={{ width: `${(activeSlide / 4) * 100}%` }}
              />
            </div>
            <span className="text-white/40 font-mono">04</span>
          </div>
        </footer>
      </div>

      {/* ========================================================
          PROJECT DETAIL INTERACTIVE MODAL (Click on Card)
      ======================================================== */}
      {activeDetailProject && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn pointer-events-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveDetailProject(null);
          }}
        >
          <div className="relative w-full max-w-3xl bg-[#161412]/95 backdrop-blur-2xl border border-white/15 rounded-3xl overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_24px_50px_rgba(0,0,0,0.9)] flex flex-col md:flex-row max-h-[90vh]">
            {/* Close Button */}
            <button 
              onClick={() => setActiveDetailProject(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#161412]/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-[#C88A35] transition-all cursor-pointer shadow-md"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left: Large Image Preview */}
            <div className="relative w-full md:w-1/2 h-60 md:h-auto min-h-[260px] bg-neutral-900">
              <Image 
                src={activeDetailProject.image}
                alt={activeDetailProject.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161412] via-transparent to-transparent md:hidden" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#161412]/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-[#FFF6ED] tracking-wider uppercase shadow-md">
                CHI TIẾT DỰ ÁN
              </div>
            </div>

            {/* Right: Technical Specifications */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#C88A35] uppercase">
                  {activeDetailProject.type}
                </span>

                <h3 className="font-heading text-xl sm:text-2xl font-normal tracking-wider text-[#FFF6ED] mt-1 mb-4">
                  {activeDetailProject.title}
                </h3>

                {/* Specs Grid */}
                <div className="space-y-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#C88A35] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Vị Trí Công Trình</div>
                      <div className="text-white font-medium">{activeDetailProject.location}</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] flex items-start gap-2.5">
                    <Maximize2 className="w-4 h-4 text-[#C88A35] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Quy Mô Xây Dựng</div>
                      <div className="text-white font-medium">{activeDetailProject.scale}</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] flex items-start gap-2.5">
                    <Layers className="w-4 h-4 text-[#C88A35] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Giải Pháp Kỹ Thuật</div>
                      <div className="text-neutral-300 leading-relaxed">{activeDetailProject.solution}</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Tổng Mức Đầu Tư</div>
                      <div className="text-[#FFF6ED] font-medium">{activeDetailProject.investment}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-neutral-400 uppercase tracking-wider text-right">Tiến Độ</div>
                      <div className="text-white font-mono text-right">{activeDetailProject.year}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tactile Button: Yêu Cầu Báo Giá */}
              <button
                onClick={() => {
                  setActiveDetailProject(null);
                  setIsContactOpen(true);
                }}
                className="mt-6 w-full rounded-full px-6 py-2.5 bg-gradient-to-b from-[#FFF6ED] to-[#E2D5C5] text-black font-semibold text-xs uppercase tracking-wider shadow-[0_3px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,1)] hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Yêu Cầu Báo Giá Dự Án Này</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          LUXURY SKEUOMORPHIC CONSULTATION MODAL (Unified Validation)
      ======================================================== */}
      <div 
        id="contact-modal" 
        className={`${isContactOpen ? 'open' : ''} pointer-events-auto`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsContactOpen(false);
        }}
      >
        <div className="bg-[#161412]/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 sm:p-10 max-w-lg w-[92%] relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_24px_50px_rgba(0,0,0,0.9)] transition-all">
          <button 
            onClick={() => setIsContactOpen(false)}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-[#C88A35] transition-colors cursor-pointer text-lg"
          >
            &times;
          </button>

          {contactSubmitted ? (
            <div className="text-center py-8 space-y-3 animate-fadeIn">
              <CheckCircle2 className="w-12 h-12 text-[#C88A35] mx-auto animate-bounce" />
              <h4 className="font-heading text-2xl text-white font-normal tracking-wide">
                Yêu Cầu Đã Gửi Thành Công
              </h4>
              <p className="font-body text-xs text-neutral-300 leading-relaxed font-light">
                Kỹ sư trưởng bộ phận đấu thầu của Laztar sẽ liên hệ với bạn trong vòng 10 phút.
              </p>
            </div>
          ) : (
            <>
              <h3 className="font-heading text-2xl sm:text-3xl text-[#FFF6ED] mb-1.5 font-normal tracking-wider">
                Tư Vấn &amp; Dự Toán Dự Án
              </h3>
              <p className="font-body text-xs text-[#d1d5db] mb-6 font-light leading-relaxed">
                Nhận hồ sơ năng lực, báo giá trọn gói và phương án kiến trúc 3D dành riêng cho công trình của bạn.
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-3.5">
                {/* Full Name Field */}
                <div>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder="HỌ VÀ TÊN CỦA BẠN *" 
                    required 
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white text-xs placeholder:text-neutral-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] focus:outline-none transition-colors ${
                      formErrors.fullName && touchedFields.fullName
                        ? 'border-red-400/50 focus:border-red-400'
                        : 'border-white/10 focus:border-amber-500/50'
                    }`}
                  />
                  {formErrors.fullName && touchedFields.fullName && (
                    <p className="text-xs text-red-400/90 mt-1 flex items-center gap-1 font-body">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{formErrors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Phone Number Field */}
                <div>
                  <input 
                    type="tel" 
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder="SỐ ĐIỆN THOẠI LIÊN HỆ (VD: 0912 345 678) *" 
                    required 
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white text-xs placeholder:text-neutral-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] focus:outline-none transition-colors ${
                      formErrors.phoneNumber && touchedFields.phoneNumber
                        ? 'border-red-400/50 focus:border-red-400'
                        : 'border-white/10 focus:border-amber-500/50'
                    }`}
                  />
                  {formErrors.phoneNumber && touchedFields.phoneNumber && (
                    <p className="text-xs text-red-400/90 mt-1 flex items-center gap-1 font-body">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{formErrors.phoneNumber}</span>
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    placeholder="ĐỊA CHỈ EMAIL (VD: contact@laztar.vn) *" 
                    required 
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white text-xs placeholder:text-neutral-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] focus:outline-none transition-colors ${
                      formErrors.email && touchedFields.email
                        ? 'border-red-400/50 focus:border-red-400'
                        : 'border-white/10 focus:border-amber-500/50'
                    }`}
                  />
                  {formErrors.email && touchedFields.email && (
                    <p className="text-xs text-red-400/90 mt-1 flex items-center gap-1 font-body">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{formErrors.email}</span>
                    </p>
                  )}
                </div>

                {/* Project Details / Message */}
                <div>
                  <textarea 
                    name="message"
                    rows={3} 
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="THÔNG TIN CÔNG TRÌNH (Địa điểm, diện tích, quy mô...)" 
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-neutral-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] focus:border-amber-500/50 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Tactile Button: Gửi Yêu Cầu */}
                <button
                  type="submit"
                  className="w-full rounded-full px-6 py-3 bg-gradient-to-b from-[#FFF6ED] to-[#E2D5C5] text-black font-semibold shadow-[0_3px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,1)] hover:brightness-105 active:scale-95 transition-all cursor-pointer uppercase tracking-widest text-xs mt-2"
                >
                  Gửi Yêu Cầu Tư Vấn
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
