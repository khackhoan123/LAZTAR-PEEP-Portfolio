'use client';

import React, { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform, Polyline, Color, Vec2, Vec3 } from 'ogl';

interface GlowCursorProps {
  color?: string;
  secondaryColor?: string;
  trailWidth?: number;
  trailLength?: number;
  glowIntensity?: number;
  blendMode?: 'screen' | 'add' | 'normal';
  idleFade?: boolean;
}

export default function GlowCursor({
  color = '#C88A35',
  secondaryColor = '#FFF6ED',
  trailWidth = 6,
  trailLength = 36,
  glowIntensity = 1.8,
  idleFade = true,
}: GlowCursorProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only run on non-touch devices or when mouse is available
    if (typeof window === 'undefined') return;

    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let isMounted = true;

    // 1. OGL Renderer with transparent canvas
    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
      premultipliedAlpha: false,
      powerPreference: 'high-performance',
    });

    const gl = renderer.gl;
    const canvas = gl.canvas;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.pointerEvents = 'none';
    container.appendChild(canvas);

    // Screen-space blending mode (additive/screen glow)
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE); // Screen / Additive Glow

    // 2. Scene & 2D Orthographic Camera
    const scene = new Transform();
    const camera = new Camera(gl);

    const updateCamera = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.orthographic({
        left: 0,
        right: window.innerWidth,
        bottom: window.innerHeight,
        top: 0,
        near: -100,
        far: 100,
      });
    };
    updateCamera();

    // 3. Trail Points initialization
    const count = Math.max(8, trailLength);
    const mouse = { x: -200, y: -200, moved: false };
    const lastPos = { x: -200, y: -200 };

    const points: Vec3[] = [];
    for (let i = 0; i < count; i++) {
      points.push(new Vec3(-200, -200, 0));
    }

    // 4. Custom Tapered & Glowing Shader
    const customVertex = /* glsl */ `
      precision highp float;

      attribute vec3 position;
      attribute vec3 next;
      attribute vec3 prev;
      attribute vec2 uv;
      attribute float side;

      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      uniform vec2 uResolution;
      uniform float uDPR;
      uniform float uThickness;
      uniform float uMiter;

      varying vec2 vUv;

      vec4 getPosition() {
        mat4 mvp = projectionMatrix * modelViewMatrix;
        vec4 current = mvp * vec4(position, 1.0);
        vec4 nextPos = mvp * vec4(next, 1.0);
        vec4 prevPos = mvp * vec4(prev, 1.0);

        vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);    
        vec2 currentScreen = current.xy / current.w * aspect;
        vec2 nextScreen = nextPos.xy / nextPos.w * aspect;
        vec2 prevScreen = prevPos.xy / prevPos.w * aspect;

        vec2 dir1 = normalize(currentScreen - prevScreen);
        vec2 dir2 = normalize(nextScreen - currentScreen);
        vec2 dir = normalize(dir1 + dir2);

        vec2 normal = vec2(-dir.y, dir.x);
        normal /= mix(1.0, max(0.3, dot(normal, vec2(-dir1.y, dir1.x))), uMiter);
        normal /= aspect;

        float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
        float pixelWidth = current.w * pixelWidthRatio;
        
        // uv.y in OGL Polyline: 0.0 at Head (newest point), 1.0 at Tail (oldest point)
        float progress = uv.y;
        float factor = clamp(1.0 - progress, 0.0, 1.0); // 1.0 at Head, 0.0 at Tail

        // Taper ribbon: widest at Head (factor = 1.0), narrowing to a fine tip at Tail (factor = 0.0)
        float taper = 0.12 + 0.88 * pow(factor, 0.8);
        normal *= pixelWidth * uThickness * taper;
        current.xy -= normal * side;

        return current;
      }

      void main() {
        vUv = uv;
        gl_Position = getPosition();
      }
    `;

    const customFragment = /* glsl */ `
      precision highp float;

      uniform vec3 uColor;
      uniform vec3 uSecondaryColor;
      uniform float uGlowIntensity;
      uniform float uAlpha;

      varying vec2 vUv;

      void main() {
        // vUv.y: 0.0 at Head (cursor tip), 1.0 at Tail (oldest point)
        float progress = vUv.y;
        float factor = clamp(1.0 - progress, 0.0, 1.0); // 1.0 at Head, 0.0 at Tail

        // Color transition: White-Cream at Head to Metallic Amber/Bronze at Tail
        vec3 col = mix(uColor, uSecondaryColor, smoothstep(0.15, 0.85, factor));

        // Hotspot core: pure brilliant white highlight right at the mouse tip
        vec3 whiteCore = vec3(1.0, 1.0, 1.0);
        float coreFactor = smoothstep(0.65, 1.0, factor);
        col = mix(col, whiteCore, coreFactor * 0.85);

        // Soft radial/falloff edge across ribbon width
        float centerDist = abs(vUv.x - 0.5) * 2.0;
        float edge = clamp(1.0 - centerDist, 0.0, 1.0);
        edge = pow(edge, 1.35);

        // Hotspot center boost
        float hotspotCenter = pow(edge, 2.2) * coreFactor * 0.6;

        // Brightness & Alpha: Maximum at Head, fading out smoothly towards Tail
        float alpha = (pow(factor, 1.25) * edge + hotspotCenter) * uGlowIntensity * uAlpha;

        gl_FragColor = vec4(col * alpha, alpha);
      }
    `;

    // 5. Polyline Setup
    const uniforms = {
      uColor: { value: new Color(color) },
      uSecondaryColor: { value: new Color(secondaryColor) },
      uThickness: { value: trailWidth },
      uGlowIntensity: { value: glowIntensity },
      uAlpha: { value: 1.0 },
      uResolution: { value: new Vec2(window.innerWidth, window.innerHeight) },
      uDPR: { value: Math.min(window.devicePixelRatio, 2) },
    };

    const polyline = new Polyline(gl, {
      points,
      vertex: customVertex,
      fragment: customFragment,
      uniforms,
    });

    polyline.mesh.setParent(scene);

    // 6. Mouse Tracking & Idle Fade Logic
    let lastMoveTime = performance.now();
    let currentAlpha = 0.0;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.moved = true;
      lastMoveTime = performance.now();
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onResize = () => {
      updateCamera();
      polyline.resize();
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
      uniforms.uDPR.value = Math.min(window.devicePixelRatio, 2);
    };
    window.addEventListener('resize', onResize);

    // 7. Animation Loop
    let lastTime = performance.now();

    const animate = (time: number) => {
      if (!isMounted) return;
      animId = requestAnimationFrame(animate);

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Handle idle fade out
      const idleElapsed = time - lastMoveTime;
      if (idleFade) {
        if (!mouse.moved) {
          currentAlpha = 0.0;
        } else if (idleElapsed > 200) {
          // Slowly fade out after 200ms idle
          currentAlpha = Math.max(0.0, currentAlpha - delta * 3.0);
        } else {
          // Instantly visible on move
          currentAlpha = Math.min(1.0, currentAlpha + delta * 8.0);
        }
      } else {
        currentAlpha = mouse.moved ? 1.0 : 0.0;
      }
      uniforms.uAlpha.value = currentAlpha;

      // If moved, lerp the points chain
      if (mouse.moved) {
        // Head point anchors directly to cursor position for zero lag
        points[0].x = mouse.x;
        points[0].y = mouse.y;

        // Subsequent points chase their predecessor
        for (let i = 1; i < count; i++) {
          points[i].x += (points[i - 1].x - points[i].x) * 0.45;
          points[i].y += (points[i - 1].y - points[i].y) * 0.45;
        }

        polyline.updateGeometry();
      }

      renderer.render({ scene, camera });
    };

    animId = requestAnimationFrame(animate);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [color, secondaryColor, trailWidth, trailLength, glowIntensity, idleFade]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    />
  );
}
