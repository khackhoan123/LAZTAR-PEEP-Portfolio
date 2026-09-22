'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { 
  Building, 
  Castle, 
  PhoneCall, 
  X, 
  CheckCircle2, 
  Clock, 
  Send,
  Layers,
  Sparkles
} from 'lucide-react';

// Dynamic import with ssr: false to prevent WebGL SSR issues
const LaztarScene = dynamic(
  () => import('@/components/3d/LaztarScene'),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 bg-[#000000] flex flex-col items-center justify-center z-50">
        <div className="w-16 h-16 rounded-full border-2 border-amber-500/20 border-t-amber-400 animate-spin" />
        <span className="mt-4 font-serif text-lg tracking-[0.3em] text-white uppercase">
          LAZTAR
        </span>
        <span className="text-[10px] tracking-widest text-amber-400/80 uppercase mt-1">
          Khởi tạo không gian 3D...
        </span>
      </div>
    ),
  }
);

export default function HomePage() {
  const [modelMode, setModelMode] = useState<'building' | 'seakeep'>('building');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);

  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [outerPos, setOuterPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const [activeSlide, setActiveSlide] = useState<number>(1);

  // Smooth scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
        setScrollProgress(progress);

        // Slide active state triggers matching reference intervals
        if (progress < 0.22) {
          setActiveSlide(1);
        } else if (progress >= 0.22 && progress < 0.50) {
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

  // Custom cursor smooth mouse tracking
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

  // Navigation scroll jump
  const scrollToSlide = (slideIndex: number) => {
    const targetScrolls = [0.0, 0.32, 0.62, 0.94];
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

  // Compute story progress fills
  const getDashFill = (index: number) => {
    const start = (index - 1) * 0.25;
    const end = index * 0.25;
    const p = Math.max(0, Math.min(1, (scrollProgress - start) / (end - start)));
    return `${p * 100}%`;
  };

  return (
    <div className="relative w-full min-h-[500vh] bg-black select-none">
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
          width: isHovered ? '60px' : '40px',
          height: isHovered ? '60px' : '40px',
          backgroundColor: isHovered ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
          borderColor: isHovered ? '#d4af37' : 'rgba(255, 255, 255, 0.7)'
        }} 
      />

      {/* ========================================================
          FIXED 3D WEBGL STAGE (Canvas + Fluid Waves Shader)
      ======================================================== */}
      <div className="fixed inset-0 w-full h-full z-1 pointer-events-auto">
        <LaztarScene 
          modelMode={modelMode}
          scrollProgress={scrollProgress}
        />
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
          
          {/* Vertical Story Progress Dashes */}
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
          SLIDE 2 EDITORIAL CONCEPT MASK IMAGE
      ======================================================== */}
      <div 
        id="slide-2-img" 
        className={activeSlide === 2 ? 'active' : ''}
      >
        <Image 
          src="/images/projects/villa.jpg" 
          alt="Biệt Thự Đồi Sapphire - Quy Hoạch Kiến Trúc"
          width={600}
          height={600}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* ========================================================
          CINEMATIC FIXED CONTAINER (Header + Editorial Slides)
      ======================================================== */}
      <div className="fixed inset-0 w-full h-full z-10 pointer-events-none flex flex-col justify-between px-6 sm:px-12 lg:px-16 py-5 box-border">
        
        {/* HEADER */}
        <header className="w-full flex items-center justify-between pointer-events-auto z-20">
          {/* Brand Logo & Name */}
          <div 
            onClick={() => scrollToSlide(1)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-900/90 border border-amber-500/40 p-1 flex items-center justify-center shadow-lg shadow-black/80 group-hover:border-amber-400 transition-all">
              <Image 
                src="/images/logo.png" 
                alt="Laztar Logo" 
                width={38} 
                height={38} 
                className="w-full h-full object-contain"
                priority 
              />
            </div>
            <div>
              <span className="font-serif text-lg tracking-[0.22em] text-white block leading-none group-hover:text-amber-300 transition-colors">
                LAZTAR
              </span>
              <span className="text-[9px] tracking-[0.25em] text-amber-400/90 uppercase font-medium">
                CONSTRUCTION
              </span>
            </div>
          </div>

          {/* Navigation & Model Switcher */}
          <div className="flex items-center gap-4 sm:gap-6">
            <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-[2px]">
              {[
                { name: 'Kiến Trúc', slide: 1 },
                { name: 'Cảnh Quan', slide: 2 },
                { name: 'Showroom', slide: 3 },
                { name: 'Biểu Tượng', slide: 4 },
              ].map((item) => (
                <button
                  key={item.slide}
                  onClick={() => scrollToSlide(item.slide)}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`transition-colors cursor-pointer ${
                    activeSlide === item.slide 
                      ? 'text-amber-400 font-semibold drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Model Toggle Switcher */}
            <div className="flex items-center p-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/30 text-xs">
              <button
                onClick={() => setModelMode('building')}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                  modelMode === 'building'
                    ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                    : 'text-white/70 hover:text-white'
                }`}
                title="Tổ hợp Trụ sở Hiện đại"
              >
                <Building className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Trụ Sở</span>
              </button>
              <button
                onClick={() => setModelMode('seakeep')}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                  modelMode === 'seakeep'
                    ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                    : 'text-white/70 hover:text-white'
                }`}
                title="Biểu tượng Sea Keep Landmark"
              >
                <Castle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sea Keep</span>
              </button>
            </div>

            {/* Contact Inquiry Button */}
            <button
              onClick={() => setIsContactOpen(true)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-[11px] uppercase tracking-wider font-semibold hover:bg-amber-400 hover:scale-105 transition-all shadow-lg shadow-white/10 cursor-pointer"
            >
              <span>Liên Hệ</span>
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
            </button>
          </div>
        </header>

        {/* SLIDE 1: KIẾN TRÚC VÀ TẦM VÓC */}
        <div id="slide-1" className={`slide ${activeSlide === 1 ? 'active' : ''}`}>
          <h2 className="slide-title">
            Kiến Trúc <br />Và Tầm Vóc
          </h2>
          <div className="desc-row">
            <p className="slide-desc col-1">
              Khởi sinh từ tinh hoa quy hoạch chuẩn mực và kỹ nghệ thi công tinh xảo của Laztar. Mỗi hình khối kiến trúc là một tuyên ngôn kiêu hãnh về độ bền và nghệ thuật không gian vượt thời gian.
            </p>
            <p className="slide-desc col-2">
              Kết tinh giữa vật liệu đỉnh cao và giải pháp kết cấu tiên tiến. Nơi nguồn năng lượng hiện đại hòa nhịp cùng cảnh quan sinh thái, kiến tạo chuẩn sống thượng lưu bền vững.
            </p>
          </div>
        </div>

        {/* SLIDE 2: QUY HOẠCH CẢNH QUAN */}
        <div id="slide-2" className={`slide ${activeSlide === 2 ? 'active' : ''}`}>
          <h2 className="slide-title">
            Quy Hoạch <br />Cảnh Quan
          </h2>
          <p className="slide-desc">
            Sự giao thoa hoàn mỹ giữa đường nét công trình hiện đại và thiên nhiên sinh thái. Chúng tôi kiến tạo không gian sống mở, nơi từng góc ban công, thềm đá và mặt nước đều chạm vào cảm xúc.
          </p>
        </div>

        {/* SLIDE 3: SHOWROOM KIỆT TÁC */}
        <div id="slide-3" className={`slide ${activeSlide === 3 ? 'active' : ''}`}>
          <h2 className="slide-title">
            Showroom Kiệt Tác
          </h2>
          <p className="slide-desc">
            Không gian triển lãm 3D tương tác tái hiện năng lực tổng thầu quy mô lớn của Laztar: Biệt thự đồi Sapphire, Laztar Innovation Tower và Quần thể đô thị sinh thái Eco-Haven.
          </p>
        </div>

        {/* SLIDE 4: KHỞI TẠO BIỂU TƯỢNG */}
        <div id="slide-4" className={`slide ${activeSlide === 4 ? 'active' : ''}`}>
          <h2 className="slide-title">
            Khởi Tạo <br />Biểu Tượng
          </h2>
          <p className="slide-desc mb-6">
            Đồng hành cùng chủ đầu tư hiện thực hóa những công trình thế kỷ. Nhận bản vẽ thiết kế sơ bộ và dự toán chi tiết từ đội ngũ kiến trúc sư trưởng Laztar ngay hôm nay.
          </p>
          <div className="pointer-events-auto">
            <button
              onClick={() => setIsContactOpen(true)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 hover:scale-105 transition-all cursor-pointer"
            >
              <span>Nhận Dự Toán &amp; Bản Vẽ Kỹ Thuật</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* FOOTER METRICS & PROGRESS FOOTPRINT */}
        <footer className="w-full flex items-center justify-between text-[11px] text-white/50 tracking-wider pointer-events-auto pt-4">
          <div className="flex items-center gap-6">
            <span>© 2026 LAZTAR GROUP</span>
            <span className="hidden sm:inline">• NĂNG LỰC THI CÔNG HẠNG 1 QUỐC GIA</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-mono">0{activeSlide}</span>
            <div className="w-16 h-[1px] bg-white/20 relative">
              <div 
                className="h-full bg-amber-400 transition-all duration-300"
                style={{ width: `${(activeSlide / 4) * 100}%` }}
              />
            </div>
            <span className="text-white/40 font-mono">04</span>
          </div>
        </footer>
      </div>

      {/* ========================================================
          LUXURY CONTACT MODAL
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
              <h4 className="text-2xl text-white font-serif" style={{ fontFamily: "'Playfair Display', serif" }}>
                Yêu Cầu Đã Gửi
              </h4>
              <p className="text-xs text-white/70">
                Chuyên gia tư vấn trưởng của Laztar sẽ liên hệ với bạn trong vòng 10 phút.
              </p>
            </div>
          ) : (
            <>
              <h3 className="text-3xl text-[#fff6ed] mb-1 font-serif font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
                Tư Vấn Dự Án
              </h3>
              <p className="text-xs text-white/60 mb-6 font-light leading-relaxed">
                Nhận hồ sơ năng lực, báo giá trọn gói và phương án kiến trúc 3D dành riêng cho công trình của bạn.
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-3.5">
                <input 
                  type="text" 
                  placeholder="HỌ VÀ TÊN CỦA BẠN" 
                  required 
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/30 focus:border-amber-400 focus:outline-none transition-colors"
                />
                <input 
                  type="tel" 
                  placeholder="SỐ ĐIỆN THOẠI LIÊN HỆ" 
                  required 
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/30 focus:border-amber-400 focus:outline-none transition-colors"
                />
                <input 
                  type="email" 
                  placeholder="ĐỊA CHỈ EMAIL" 
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/30 focus:border-amber-400 focus:outline-none transition-colors"
                />
                <textarea 
                  rows={3} 
                  placeholder="THÔNG TIN CÔNG TRÌNH (Địa điểm, diện tích, quy mô...)" 
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/30 focus:border-amber-400 focus:outline-none transition-colors resize-none"
                />

                <button
                  type="submit"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="w-full py-3.5 rounded-full bg-[#fff6ed] text-black font-semibold text-xs uppercase tracking-widest hover:bg-amber-400 hover:scale-[1.02] transition-all cursor-pointer shadow-lg mt-2"
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
