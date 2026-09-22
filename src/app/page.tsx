'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { 
  Building2, 
  MapPin, 
  Maximize2, 
  X, 
  CheckCircle2, 
  Send,
  Layers,
  ArrowRight,
  ShieldCheck,
  Calendar
} from 'lucide-react';

// Dynamic import with ssr: false
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

export default function HomePage() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSlide, setActiveSlide] = useState<number>(1);

  // Modal States
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);
  const [activeDetailProject, setActiveDetailProject] = useState<ProjectItem | null>(null);

  // Custom Cursor
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [outerPos, setOuterPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

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

  // Custom cursor trailing loop
  useEffect(() => {
    let animId: number;
    let targetX = -100;
    let targetY = -100;
    let currentOuterX = -100;
    let currentOuterY = -100;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setCursorPos({ x: targetX, y: targetY });
    };

    const updateOuterCursor = () => {
      currentOuterX += (targetX - currentOuterX) * 0.18;
      currentOuterY += (targetY - currentOuterY) * 0.18;
      setOuterPos({ x: currentOuterX, y: currentOuterY });
      animId = requestAnimationFrame(updateOuterCursor);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    animId = requestAnimationFrame(updateOuterCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setIsContactOpen(false);
      setContactSubmitted(false);
    }, 2500);
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
          CUSTOM LUXURY CURSOR
      ======================================================== */}
      <div 
        className="cursor-inner hidden md:block" 
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }} 
      />
      <div 
        className="cursor-outer hidden md:block"
        style={{ 
          left: `${outerPos.x}px`, 
          top: `${outerPos.y}px`,
          width: isHovered ? '58px' : '38px',
          height: isHovered ? '58px' : '38px',
          backgroundColor: isHovered ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
          borderColor: isHovered ? '#d4af37' : 'rgba(255, 255, 255, 0.65)'
        }} 
      />

      {/* ========================================================
          FIXED 3D WEBGL BACKGROUND (Canvas + Fluid Waves + 3D Building)
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
          CINEMATIC FIXED CONTAINER (Navbar + Glass-wrapped Stages)
      ======================================================== */}
      <div className="fixed inset-0 w-full h-full z-10 pointer-events-none flex flex-col justify-between px-6 sm:px-12 lg:px-16 py-5 box-border">
        
        {/* ========================================================
            CLEAN NAVBAR (Logo + 4 Scroll Anchors + CTA Button)
        ======================================================== */}
        <header className="w-full flex items-center justify-between pointer-events-auto z-20">
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => scrollToSlide(1)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-slate-900/90 border border-amber-500/30 p-1 flex items-center justify-center shadow-lg shadow-black/80 group-hover:border-amber-400 transition-all">
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
              <span className="text-[9px] tracking-[0.25em] text-amber-400/80 uppercase font-medium">
                CONSTRUCTION
              </span>
            </div>
          </div>

          {/* Clean 4 Scroll Links + CTA */}
          <div className="flex items-center gap-6 sm:gap-8">
            <nav className="hidden md:flex items-center gap-6 sm:gap-8 text-xs uppercase tracking-[2px]">
              {[
                { name: 'Kiến Trúc', slide: 1 },
                { name: 'Cảnh Quan', slide: 2 },
                { name: 'Showroom', slide: 3 },
                { name: 'Dự Án', slide: 4 },
              ].map((item) => (
                <button
                  key={item.slide}
                  onClick={() => scrollToSlide(item.slide)}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`transition-all cursor-pointer ${
                    activeSlide === item.slide 
                      ? 'text-amber-400 font-medium drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            <button
              onClick={() => setIsContactOpen(true)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-white text-black text-[11px] uppercase tracking-wider font-semibold hover:bg-amber-400 hover:scale-105 transition-all shadow-lg shadow-white/10 cursor-pointer"
            >
              <span>Liên Hệ</span>
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
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
          <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl max-w-lg">
            {/* Subtle Glass Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-amber-400 text-[10px] font-mono tracking-[0.2em] uppercase mb-3.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>[ 01 / SHOWCASE KIẾN TRÚC ]</span>
            </div>

            {/* Title with White-to-Metallic Gradient */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white mb-3">
              <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-500">
                Kiến Trúc &amp; Tầm Vóc
              </span>
            </h1>

            {/* Concise 3-Line Description */}
            <p className="text-neutral-300 text-sm leading-relaxed font-light">
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
          <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-amber-400 text-[10px] font-mono tracking-[0.2em] uppercase mb-3.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>[ 02 / KHÔNG GIAN NỘI KHU ]</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white mb-3">
              <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-500">
                Quy Hoạch &amp; Cảnh Quan
              </span>
            </h2>

            <p className="text-neutral-300 text-sm leading-relaxed font-light">
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
            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl max-w-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-amber-400 text-[10px] font-mono tracking-[0.2em] uppercase mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>[ 03 / SHOWROOM TRIỂN LÃM ]</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-white mb-2">
                <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-500">
                  Kiệt Tác Tiêu Biểu
                </span>
              </h2>

              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-light">
                Các dự án đại diện cho năng lực tổng thầu quy mô lớn của Laztar. Nhấp vào từng thẻ để xem chi tiết ảnh và thông số kỹ thuật.
              </p>
            </div>

            {/* Right: 3 Interactive Glass Cards with Click-to-Modal */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 p-2.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl w-full lg:max-w-2xl">
              {PROJECTS_DATA.map((proj, idx) => (
                <div
                  key={proj.id}
                  onClick={() => setActiveDetailProject(proj)}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="w-full sm:w-1/3 p-3 rounded-xl border border-white/10 hover:border-amber-400/80 bg-white/5 hover:bg-white/10 transition-all cursor-pointer group hover:shadow-lg hover:shadow-amber-500/10 -translate-y-0 hover:-translate-y-1"
                >
                  <div className="relative w-full h-24 rounded-lg overflow-hidden mb-2 bg-neutral-900">
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-sm text-[9px] font-mono text-amber-300 uppercase">
                      0{idx + 1}
                    </div>
                  </div>

                  <h3 className="text-xs font-medium text-white truncate group-hover:text-amber-300 transition-colors">
                    {proj.title}
                  </h3>

                  <div className="flex items-center gap-1 text-[10px] text-neutral-400 mt-1">
                    <MapPin className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                    <span className="truncate">{proj.location}</span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-neutral-500 mt-0.5">
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
          <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-amber-400 text-[10px] font-mono tracking-[0.2em] uppercase mb-3.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>[ 04 / LIÊN HỆ &amp; DỰ TOÁN ]</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white mb-3">
              <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-200 to-neutral-500">
                Khởi Tạo Biểu Tượng
              </span>
            </h2>

            <p className="text-neutral-300 text-sm leading-relaxed font-light mb-6">
              Đồng hành cùng chủ đầu tư hiện thực hóa những công trình thế kỷ. Nhận ngay hồ sơ năng lực thi công và bảng dự toán chi tiết từ kỹ sư trưởng Laztar.
            </p>

            <button
              onClick={() => setIsContactOpen(true)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-black font-semibold text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 hover:scale-105 transition-all cursor-pointer"
            >
              <span>Nhận Báo Giá &amp; Bản Vẽ Kỹ Thuật</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* FOOTER METRICS & PROGRESS INDICATOR */}
        <footer className="w-full flex items-center justify-between text-[11px] text-white/40 tracking-wider pointer-events-auto pt-3">
          <div className="flex items-center gap-6">
            <span>© 2026 LAZTAR GROUP</span>
            <span className="hidden sm:inline">• NĂNG LỰC THI CÔNG HẠNG 1 QUỐC GIA</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-mono">0{activeSlide}</span>
            <div className="w-16 h-[1px] bg-white/15 relative">
              <div 
                className="h-full bg-amber-400 transition-all duration-300"
                style={{ width: `${(activeSlide / 4) * 100}%` }}
              />
            </div>
            <span className="text-white/30 font-mono">04</span>
          </div>
        </footer>
      </div>

      {/* ========================================================
          PROJECT DETAIL INTERACTIVE MODAL (Click on Card)
      ======================================================== */}
      {activeDetailProject && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveDetailProject(null);
          }}
        >
          <div className="relative w-full max-w-3xl bg-neutral-950/95 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            {/* Close Button */}
            <button 
              onClick={() => setActiveDetailProject(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-amber-400 transition-all cursor-pointer"
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
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent md:hidden" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono text-amber-300 uppercase">
                CHI TIẾT DỰ ÁN
              </div>
            </div>

            {/* Right: Technical Specifications */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">
                  {activeDetailProject.type}
                </span>

                <h3 className="text-xl sm:text-2xl font-light text-white mt-1 mb-4 tracking-tight">
                  {activeDetailProject.title}
                </h3>

                {/* Specs Grid */}
                <div className="space-y-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Vị Trí Công Trình</div>
                      <div className="text-white font-medium">{activeDetailProject.location}</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                    <Maximize2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Quy Mô Xây Dựng</div>
                      <div className="text-white font-medium">{activeDetailProject.scale}</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                    <Layers className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Giải Pháp Kỹ Thuật</div>
                      <div className="text-neutral-300 leading-relaxed">{activeDetailProject.solution}</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Tổng Mức Đầu Tư</div>
                      <div className="text-amber-300 font-medium">{activeDetailProject.investment}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-neutral-400 uppercase tracking-wider text-right">Tiến Độ</div>
                      <div className="text-white font-mono text-right">{activeDetailProject.year}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => {
                  setActiveDetailProject(null);
                  setIsContactOpen(true);
                }}
                className="mt-6 w-full py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-semibold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:brightness-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Yêu Cầu Báo Giá Dự Án Này</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          LUXURY CONSULTATION MODAL
      ======================================================== */}
      <div 
        id="contact-modal" 
        className={isContactOpen ? 'open' : ''}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsContactOpen(false);
        }}
      >
        <div className="contact-card">
          <button 
            onClick={() => setIsContactOpen(false)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="absolute top-5 right-5 text-white/50 hover:text-white text-2xl transition-colors cursor-pointer"
          >
            &times;
          </button>

          {contactSubmitted ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-2xl text-white font-light tracking-tight">
                Yêu Cầu Đã Gửi Thành Công
              </h4>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Kỹ sư trưởng bộ phận đấu thầu của Laztar sẽ liên hệ với bạn trong vòng 10 phút.
              </p>
            </div>
          ) : (
            <>
              <h3 className="text-2xl sm:text-3xl text-white mb-1.5 font-light tracking-tight">
                Tư Vấn &amp; Dự Toán Dự Án
              </h3>
              <p className="text-xs text-white/60 mb-6 font-light leading-relaxed">
                Nhận hồ sơ năng lực, báo giá trọn gói và phương án kiến trúc 3D dành riêng cho công trình của bạn.
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-3.5">
                <input 
                  type="text" 
                  placeholder="HỌ VÀ TÊN CỦA BẠN" 
                  required 
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/30 focus:border-amber-400 focus:outline-none transition-colors"
                />
                <input 
                  type="tel" 
                  placeholder="SỐ ĐIỆN THOẠI LIÊN HỆ" 
                  required 
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/30 focus:border-amber-400 focus:outline-none transition-colors"
                />
                <input 
                  type="email" 
                  placeholder="ĐỊA CHỈ EMAIL" 
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/30 focus:border-amber-400 focus:outline-none transition-colors"
                />
                <textarea 
                  rows={3} 
                  placeholder="THÔNG TIN CÔNG TRÌNH (Địa điểm, diện tích, quy mô...)" 
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/30 focus:border-amber-400 focus:outline-none transition-colors resize-none"
                />

                <button
                  type="submit"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-semibold text-xs uppercase tracking-widest hover:brightness-105 hover:scale-[1.02] transition-all cursor-pointer shadow-lg mt-2"
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
