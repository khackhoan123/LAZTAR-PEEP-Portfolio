# SYSTEM SKILL: LAZTAR ARCHITECTURAL DESIGN SYSTEM & ENGINE RULES

## 1. BRAND IDENTITY & COLOR TOKENS
- Primary Background: #000000 (Pure Black)
- Metallic Bronze (Chủ đạo): #191613 đến #3a2212, điểm sáng kem #fff6ed
- Accent Gold / Amber: #D4AF37 (Kim loại vàng), #C88A35 (Hổ phách đồng)
- Accent Blue (Chặng chuyển giao): Sapphire #102a45
- Logo: Sử dụng hình ảnh cục bộ `/images/logo.png`, hiển thị chiều cao chuẩn h-8 đến h-9, kèm chữ thương hiệu 'LAZTAR' uppercase tracking-[4px].

## 2. SHADER BACKGROUND & PARTICLES GUARANTEE
- BẢO TỒN TUYỆT ĐỐI: Shader nền dải sóng kim loại (Molten Bronze Liquid Shader) và hệ thống hạt phát sáng bay bổng (Forge Spark Particles).
- Quy chuẩn bố cục 3D:
  - Tấm nền Background Shader luôn nằm ở Layer nền sâu nhất (Depth test: false, renderOrder: -10).
  - Tòa nhà 3D (`/models/building.glb`) PHẢI được tính toán Bounding Box tự động (Center & Scale chuẩn) để luôn nằm nổi phía trước dải sóng nền, đón ánh sáng SpotLight (#ffffff) và RimLight (#e3f2ff).

## 3. UI ARCHITECTURE (EDITORIAL LUXURY SKEUOMORPHISM)
- Kiểu chữ:
  - Heading: Ưu tiên 'Italiana' hoặc Sans-serif thanh lịch, tracking rộng, hiệu ứng mờ dần (char blur-in).
  - Body: 'Outfit' hoặc Sans-serif tối giản, màu #d1d5db, dẫn dòng leading-relaxed.
- Cấu trúc Thẻ & Modal:
  - Card/Modal: Nền kính đen đồng mờ `bg-[#191613]/80 backdrop-blur-xl border border-[#fff6ed]/15 rounded-2xl shadow-2xl`.
  - Nút bấm (CTA): Bo viên thuốc `rounded-full`, màu nền kem sáng `#fff6ed` chữ đen hoặc viền kim loại sáng, hover scale 1.05.
- Con trỏ chuột:
  - Sử dụng vệt sáng GlowCursor WebGL shader theo tông màu vàng đồng (#C88A35, #fff6ed), loại bỏ chấm tròn SVG thô cứng.