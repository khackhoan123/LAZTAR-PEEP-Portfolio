'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Leaf, 
  ShieldCheck, 
  Award, 
  PhoneCall, 
  Send, 
  ChevronRight, 
  Layers, 
  Sparkles,
  CheckCircle2,
  Compass,
  ArrowDown
} from 'lucide-react';

interface OverlayContentProps {
  onScrollToStage?: (pageIndex: number) => void;
}

export default function OverlayContent({ onScrollToStage }: OverlayContentProps) {
  // CTA Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    projectType: 'Biệt thự & Villa cao cấp',
    service: 'Tổng thầu thi công trọn gói',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="w-full text-white pointer-events-none select-none font-sans">
      {/* ========================================================
          CHẶNG 1: 0.0 - 0.25 | TOÀN CẢNH KIẾN TRÚC
      ======================================================== */}
      <section className="h-screen w-full flex flex-col justify-between px-6 sm:px-12 lg:px-20 py-24 relative">
        <div className="max-w-3xl pointer-events-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs tracking-wider uppercase mb-5 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Showcase Năng Lực Thi Công 3D</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none mb-4">
            <span className="block text-slate-100">LAZTAR</span>
            <span className="gold-text-gradient block mt-1">CONSTRUCTION</span>
          </h1>

          <p className="text-lg sm:text-2xl text-slate-300 font-light max-w-2xl leading-relaxed">
            Giải pháp kiến trúc & thi công chuẩn mực — Hiện thực hóa những công trình biểu tượng bền vững theo thời gian.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <button 
              onClick={() => onScrollToStage?.(3)}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-black font-semibold text-sm tracking-wide shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <span>Nhận Dự Toán Nhanh</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onScrollToStage?.(2)}
              className="px-6 py-3.5 rounded-xl glass-card text-slate-200 text-sm font-medium hover:text-amber-300 border border-slate-700/60 hover:border-amber-500/40 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Dự Án Tiêu Biểu</span>
              <Building2 className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Metrics Bar */}
        <div className="pointer-events-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl">
          <div className="glass-card p-4 rounded-xl">
            <div className="text-2xl sm:text-3xl font-bold text-amber-400">15+</div>
            <div className="text-xs text-slate-400 mt-1">Năm kinh nghiệm xây dựng</div>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <div className="text-2xl sm:text-3xl font-bold text-amber-400">350+</div>
            <div className="text-xs text-slate-400 mt-1">Công trình quy mô lớn</div>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <div className="text-2xl sm:text-3xl font-bold text-amber-400">Cấp 1</div>
            <div className="text-xs text-slate-400 mt-1">Năng lực thi công Quốc gia</div>
          </div>
          <div className="glass-card p-4 rounded-xl">
            <div className="text-2xl sm:text-3xl font-bold text-amber-400">100%</div>
            <div className="text-xs text-slate-400 mt-1">Chuẩn tiến độ & An toàn</div>
          </div>
        </div>

        {/* Scroll down prompt */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-xs tracking-widest text-slate-400 uppercase">
          <span>Cuộn để khám phá không gian</span>
          <ArrowDown className="w-4 h-4 text-amber-400 animate-bounce" />
        </div>
      </section>

      {/* ========================================================
          CHẶNG 2: 0.25 - 0.55 | CẢNH QUAN & HẠ TẦNG
      ======================================================== */}
      <section className="h-screen w-full flex items-center px-6 sm:px-12 lg:px-20 py-24">
        <div className="max-w-2xl pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs tracking-wider uppercase mb-4 backdrop-blur-md">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>Kỹ Thuật Hạ Tầng Xanh</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 mb-4 leading-tight">
            Quy hoạch cảnh quan &amp; <br />
            <span className="gold-text-gradient">Không gian xanh bền vững</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-8">
            Laztar tiên phong ứng dụng công nghệ vi khí hậu, vật liệu sinh thái giảm 35% phát thải nhiệt và hệ thống tuần hoàn nước tự nhiên cho toàn bộ khuôn viên công trình.
          </p>

          <div className="space-y-3 sm:space-y-4">
            <div className="glass-card p-4 rounded-xl flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-100 text-sm sm:text-base">Mặt nước &amp; Vi khí hậu điều hòa</h4>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Hồ gương phản chiếu giảm bức xạ nhiệt công trình, tích hợp bơm lọc ngầm tuần hoàn vi sinh.
                </p>
              </div>
            </div>

            <div className="glass-card p-4 rounded-xl flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-100 text-sm sm:text-base">Lối đi lát đá tự nhiên &amp; Thảm cỏ đa tầng</h4>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Đá granite tự nhiên chống trơn trượt cùng hệ thống thoát nước ngầm rãnh sỏi hiện đại.
                </p>
              </div>
            </div>

            <div className="glass-card p-4 rounded-xl flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-100 text-sm sm:text-base">Hệ kết cấu móng &amp; Đất đắp kiên cố</h4>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Xử lý chống sụt lún, phân tầng cốt nền đảm bảo an toàn tuyệt đối trước mọi biến đổi thời tiết.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CHẶNG 3: 0.55 - 0.85 | TIẾN VÀO SẢNH & DỰ ÁN TIÊU BIỂU
      ======================================================== */}
      <section className="h-screen w-full flex flex-col justify-center items-start lg:items-end px-6 sm:px-12 lg:px-20 py-24">
        <div className="max-w-xl pointer-events-auto lg:text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs tracking-wider uppercase mb-4 backdrop-blur-md">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Phòng Triển Lãm Năng Lực 3D</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 mb-3 leading-tight">
            Dấu ấn công trình <br />
            <span className="gold-text-gradient">tiêu biểu của Laztar</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-6">
            Camera đang hướng trực diện vào vách trưng bày 3D trong sảnh. 3 khung tranh đại diện cho các phân khúc tổng thầu thi công trọng điểm:
          </p>

          <div className="space-y-3 text-left">
            <div className="glass-card p-4 rounded-xl border-l-4 border-l-amber-500">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">01 • Dinh Thự / Villa</span>
                <span className="text-xs text-slate-400">Đà Lạt</span>
              </div>
              <h4 className="font-bold text-slate-100 text-base mt-1">Biệt Thự Đồi Sapphire</h4>
              <p className="text-xs text-slate-400 mt-1">
                Quy mô 1.200m², kết cấu bê tông trần vượt nhịp 18m, kính Low-E tràn viền và hồ bơi vô cực sườn dốc.
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl border-l-4 border-l-amber-400">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">02 • Thương Mại / Cao Tầng</span>
                <span className="text-xs text-slate-400">TP. Hồ Chí Minh</span>
              </div>
              <h4 className="font-bold text-slate-100 text-base mt-1">Laztar Innovation Tower</h4>
              <p className="text-xs text-slate-400 mt-1">
                Tòa tháp 38 tầng, hệ mặt dựng Parametric thép không gỉ uốn cong hữu cơ, tiêu chuẩn xanh LEED Platinum.
              </p>
            </div>

            <div className="glass-card p-4 rounded-xl border-l-4 border-l-emerald-500">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">03 • Đô Thị / Cảnh Quan</span>
                <span className="text-xs text-slate-400">Đồng Nai</span>
              </div>
              <h4 className="font-bold text-slate-100 text-base mt-1">Đại Đô Thị Sinh Thái Eco-Haven</h4>
              <p className="text-xs text-slate-400 mt-1">
                Quy hoạch 45ha ven sông, kênh đào tuần hoàn, 100% công trình kết hợp gỗ kỹ thuật và mái xanh sinh thái.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CHẶNG 4: 0.85 - 1.0 | CALL TO ACTION (CTA) & DỰ TOÁN
      ======================================================== */}
      <section className="h-screen w-full flex items-center justify-center px-6 sm:px-12 py-20 relative">
        <div className="w-full max-w-2xl pointer-events-auto">
          <div className="glass-card p-6 sm:p-10 rounded-2xl relative overflow-hidden border border-amber-500/30 glow-gold">
            {/* Ambient Background Blur Accent */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs tracking-wider uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Khởi Đầu Công Trình Chuẩn Mực</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
                Đăng Ký Tư Vấn &amp; <span className="gold-text-gradient">Dự Toán Chi Phí</span>
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-300 mb-6 font-light">
                Đội ngũ kỹ sư trưởng &amp; kiến trúc sư Laztar sẽ phân tích hồ sơ, lập bảng bóc tách khối lượng và gửi bảng dự toán chi tiết trong 24 giờ.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-bold text-white">Tiếp Nhận Thông Tin Thành Công!</h3>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Cảm ơn <strong className="text-amber-300">{formData.fullName}</strong>. Chuyên viên tư vấn kỹ thuật Laztar sẽ liên hệ qua số điện thoại <strong className="text-amber-300">{formData.phone}</strong> trong ít phút.
                  </p>
                  <button 
                    onClick={() => { setSubmitted(false); setFormData({ fullName: '', phone: '', projectType: 'Biệt thự & Villa cao cấp', service: 'Tổng thầu thi công trọn gói', notes: '' }); }}
                    className="mt-3 text-xs text-amber-400 underline cursor-pointer hover:text-amber-300"
                  >
                    Gửi yêu cầu công trình khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-400 font-medium mb-1.5">
                        Họ và tên <span className="text-amber-400">*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Ví dụ: Nguyễn Văn An"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-400 font-medium mb-1.5">
                        Số điện thoại <span className="text-amber-400">*</span>
                      </label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Ví dụ: 0988 123 456"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-400 font-medium mb-1.5">
                        Loại công trình
                      </label>
                      <select 
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors"
                      >
                        <option value="Biệt thự & Villa cao cấp">Biệt thự &amp; Villa cao cấp</option>
                        <option value="Tòa nhà văn phòng / Khách sạn">Tòa nhà văn phòng / Khách sạn</option>
                        <option value="Quy hoạch đại đô thị & Cảnh quan">Quy hoạch đại đô thị &amp; Cảnh quan</option>
                        <option value="Nhà xưởng & Hạ tầng công nghiệp">Nhà xưởng &amp; Hạ tầng công nghiệp</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-400 font-medium mb-1.5">
                        Dịch vụ quan tâm
                      </label>
                      <select 
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors"
                      >
                        <option value="Tổng thầu thi công trọn gói">Tổng thầu thi công trọn gói</option>
                        <option value="Thiết kế kiến trúc & Kết cấu">Thiết kế kiến trúc &amp; Kết cấu</option>
                        <option value="Thi công cảnh quan & Hạ tầng">Thi công cảnh quan &amp; Hạ tầng</option>
                        <option value="Tư vấn thẩm tra & Quản lý dự án">Tư vấn thẩm tra &amp; Quản lý dự án</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 font-medium mb-1.5">
                      Ghi chú thêm về quy mô / địa điểm
                    </label>
                    <textarea 
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Ví dụ: Diện tích 800m2 tại Đà Nẵng, dự kiến khởi công quý 3..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors placeholder:text-slate-500 resize-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-black font-bold text-sm tracking-wider uppercase shadow-lg shadow-amber-500/25 hover:shadow-amber-500/50 hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>Đang xử lý dữ liệu...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Nhận Dự Toán Thi Công Miễn Phí</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 text-slate-400 text-xs mt-2">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Bảo mật thông tin 100%
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <PhoneCall className="w-3.5 h-3.5 text-amber-400" /> Hotline 24/7: 0988.234.567
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
