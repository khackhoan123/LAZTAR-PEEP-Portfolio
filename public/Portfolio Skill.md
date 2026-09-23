# SYSTEM SKILL: UNIFIED LUXURY DARK DESIGN SYSTEM & ENGINE RULES

## 1. CORE VISUAL IDENTITY & TOKENS (ÁP DỤNG TOÀN DỰ ÁN)
- Primary Background: #000000 (Pure Black)
- Metallic Bronze (Chủ đạo): #161412 đến #191613, điểm sáng kem #FFF6ED
- Accent Amber / Gold: #C88A35 (Hổ phách đồng), #D4AF37 (Kim loại vàng)
- Typography System (Hỗ trợ 100% tiếng Việt):
  - Headings: Cormorant Garamond hoặc Playfair Display (font serif sang trọng, tracking-wide)
  - Body/UI: Plus Jakarta Sans (font sans-serif tối giản, nét mỏng tinh tế)
- Interactive Cursor:
  - Bắt buộc kích hoạt component GlowCursor (OGL WebGL Shader) trên toàn bộ các trang:
    color="#C88A35", secondaryColor="#FFF6ED", blendMode="screen".

## 2. BACKGROUND & ENGINE RULES THEO TỪNG TRANG
- Trang Landing Page (`/`):
  - Kích hoạt Molten Bronze Liquid Shader + Hạt Forge Sparks + Mô hình toà nhà 3D (`building.glb`).
  - Điều khiển camera theo 4 chặng cuộn trang (Scroll-driven).
- Trang Personal Portfolio (`/portfolio`):
  - BẢO TỒN: Shader nền dải sóng kim loại và hạt bụi sáng Forge Sparks làm hình nền tĩnh/cuộn nhẹ.
  - VÔ HIỆU HÓA: Không nạp mô hình toà nhà `building.glb` để nhường toàn bộ không gian cho kiến trúc thông tin CV cá nhân.

## 3. UI ARCHITECTURE (EDITORIAL TACTILE SKEUOMORPHISM)
- Cấu trúc Thẻ (Cards / Containers):
  - `bg-[#161412]/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_12px_32px_rgba(0,0,0,0.85)]`
- Nút bấm chính (CTA Buttons):
  - Bo tròn dạng viên thuốc: `rounded-full px-6 py-2.5 bg-gradient-to-b from-[#FFF6ED] to-[#E2D5C5] text-black font-semibold shadow-[0_3px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,1)] hover:brightness-105 active:scale-95 transition-all`
- Nút phụ / Tag kỹ thuật (Pills / Badges):
  - `rounded-full px-3 py-1 bg-white/5 border border-white/10 text-[11px] text-[#FFF6ED]/80 backdrop-blur-sm`