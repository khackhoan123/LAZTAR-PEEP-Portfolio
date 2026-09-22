'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface LaztarCanvasProps {
  scrollProgress?: number;
  onLoaded?: () => void;
}

// Exponential inertia damping helper using THREE.MathUtils.damp
function dampVector3(current: THREE.Vector3, target: THREE.Vector3, lambda: number, delta: number) {
  current.x = THREE.MathUtils.damp(current.x, target.x, lambda, delta);
  current.y = THREE.MathUtils.damp(current.y, target.y, lambda, delta);
  current.z = THREE.MathUtils.damp(current.z, target.z, lambda, delta);
}

export default function LaztarCanvas({
  scrollProgress = 0,
  onLoaded,
}: LaztarCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const scrollRef = useRef<number>(scrollProgress);
  scrollRef.current = scrollProgress;

  const onLoadedRef = useRef(onLoaded);
  onLoadedRef.current = onLoaded;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId: number;
    let isMounted = true;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    scene.fog = new THREE.FogExp2('#000000', 0.012);

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const camera = new THREE.PerspectiveCamera(
      45,
      sizes.width / sizes.height,
      0.5,
      500
    );
    camera.position.set(2.5, 1.8, 4.8);
    scene.add(camera);

    // 2. Full-Screen Liquid Metallic Waves Background Shader (PRESERVED)
    const shaderUniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(sizes.width, sizes.height) },
      uScroll: { value: 0 },
    };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform float uScroll;

      float hash(float n) { return fract(sin(n) * 43758.5453123); }
      float noise(in vec3 x) {
        vec3 p = floor(x);
        vec3 f = fract(x);
        f = f * f * (3.0 - 2.0 * f);
        float n = p.x + p.y * 57.0 + 113.0 * p.z;
        return mix(mix(mix(hash(n + 0.0), hash(n + 1.0), f.x),
                       mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y),
                   mix(mix(hash(n + 113.0), hash(n + 114.0), f.x),
                       mix(hash(n + 170.0), hash(n + 171.0), f.x), f.y), f.z);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
        
        float time = uTime * 0.08;
        float scroll = uScroll;
        
        float angle1 = 0.6;
        float angle2 = -0.7;
        float angle3 = 1.2;
        
        float freq1 = 2.4;
        float freq2 = 3.2;
        float freq3 = 4.0;
        
        vec2 warpedUv = uv;
        float scrollDeform = scroll * 5.0;
        
        warpedUv.x += sin(uv.y * 2.5 + time * 0.2 + scrollDeform) * 0.35;
        warpedUv.y += cos(uv.x * 2.5 - time * 0.15 - scrollDeform * 0.8) * 0.35;
        
        warpedUv.x += sin(uv.y * 1.2 - time * 0.1 - scrollDeform * 1.5) * 0.25;
        warpedUv.y += cos(uv.x * 1.2 + time * 0.18 + scrollDeform * 1.2) * 0.25;
        
        vec2 scrollDrift = vec2(scroll * 0.04, -scroll * 0.02);
        warpedUv += scrollDrift;
        
        vec2 dir1 = vec2(cos(angle1), sin(angle1));
        vec2 dir2 = vec2(cos(angle2), sin(angle2));
        vec2 dir3 = vec2(cos(angle3), sin(angle3));
        
        float w1 = sin(dot(warpedUv, dir1) * freq1 + time * 1.0);
        float w2 = cos(dot(warpedUv, dir2) * freq2 - time * 1.4 + w1 * 0.4);
        float w3 = sin(dot(warpedUv, dir3) * freq3 + time * 1.8 + w2 * 0.5);
        
        float waveField = w1 * 0.50 + w2 * 0.35 + w3 * 0.15;
        
        float wideSheen = pow(max(0.0, 1.0 - abs(waveField - 0.1)), 2.5);
        float crispSpecular = pow(max(0.0, 1.0 - abs(waveField - 0.15)), 8.0);
        float crest = wideSheen * 0.5 + crispSpecular * 0.9;
        
        // Molten Gold to Sapphire Blue
        vec3 c0_shadow = vec3(0.0012, 0.0008, 0.0005);
        vec3 c0_wave1  = vec3(0.095, 0.050, 0.018);
        vec3 c0_wave2  = vec3(0.055, 0.028, 0.010);
        vec3 c0_crest  = vec3(0.50, 0.35, 0.20);
        
        vec3 c1_shadow = vec3(0.0004, 0.0007, 0.0014);
        vec3 c1_wave1  = vec3(0.018, 0.042, 0.075);
        vec3 c1_wave2  = vec3(0.010, 0.024, 0.052);
        vec3 c1_crest  = vec3(0.20, 0.40, 0.65);
        
        float t = smoothstep(0.0, 1.0, scroll);
        vec3 colShadow = mix(c0_shadow, c1_shadow, t);
        vec3 colWave1  = mix(c0_wave1, c1_wave1, t);
        vec3 colWave2  = mix(c0_wave2, c1_wave2, t);
        vec3 colCrest  = mix(c0_crest, c1_crest, t);
        
        vec3 color = colShadow;
        color = mix(color, colWave2, smoothstep(-0.6, 0.2, waveField));
        color = mix(color, colWave1, smoothstep(0.0, 0.8, waveField));
        color += colCrest * crest * 1.45;
        
        float vignette = 1.0 - dot(uv, uv) * 0.14;
        color *= vignette;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const bgMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: shaderUniforms,
      depthWrite: false,
      depthTest: false,
    });

    const bgGeometry = new THREE.PlaneGeometry(32, 32);
    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
    bgMesh.position.set(0.0, 0.0, -8.0);
    bgMesh.renderOrder = -10;
    camera.add(bgMesh);

    // 3. WebGL Renderer - High Performance 60FPS Optimization
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
      logarithmicDepthBuffer: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2)); // DPR capped at 1.2
    renderer.shadowMap.enabled = false; // Shadows disabled for 60FPS
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.8;

    // 4. Warm Architectural Studio Lighting (PRESERVED)
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight('#fff5e0', 4.2);
    sunLight.position.set(8, 14, 8);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight('#8ec5fc', 6.0);
    rimLight.position.set(-8, 6, -6);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight('#fff3e6', 1.8);
    fillLight.position.set(-3, -2, 4);
    scene.add(fillLight);

    // 5. Atmospheric Forge Sparks (PRESERVED)
    function createSparkTexture(): THREE.CanvasTexture {
      const canvasElement = document.createElement('canvas');
      canvasElement.width = 16;
      canvasElement.height = 16;
      const ctx = canvasElement.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.25, 'rgba(255, 240, 200, 0.85)');
        gradient.addColorStop(0.6, 'rgba(212, 175, 55, 0.35)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);
      }
      return new THREE.CanvasTexture(canvasElement);
    }

    const sparkCount = 280;
    const sparkPositions = new Float32Array(sparkCount * 3);
    const sparkColors = new Float32Array(sparkCount * 3);
    const sparkData: Array<{
      speedX: number;
      speedY: number;
      speedZ: number;
      swaySpeed: number;
      swayRadius: number;
      phase: number;
    }> = [];

    for (let i = 0; i < sparkCount; i++) {
      sparkPositions[i * 3] = (Math.random() - 0.5) * 8.0;
      sparkPositions[i * 3 + 1] = (Math.random() - 0.5) * 6.0;
      sparkPositions[i * 3 + 2] = (Math.random() - 0.5) * 8.0;

      if (Math.random() < 0.65) {
        sparkColors[i * 3] = 1.0;
        sparkColors[i * 3 + 1] = 0.55 + Math.random() * 0.25;
        sparkColors[i * 3 + 2] = 0.1;
      } else {
        sparkColors[i * 3] = 0.55 + Math.random() * 0.2;
        sparkColors[i * 3 + 1] = 0.85;
        sparkColors[i * 3 + 2] = 1.0;
      }

      sparkData.push({
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: 0.15 + Math.random() * 0.35,
        speedZ: (Math.random() - 0.5) * 0.3,
        swaySpeed: 0.6 + Math.random() * 1.6,
        swayRadius: 0.05 + Math.random() * 0.15,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const sparkGeometry = new THREE.BufferGeometry();
    sparkGeometry.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
    sparkGeometry.setAttribute('color', new THREE.BufferAttribute(sparkColors, 3));

    const sparkMaterial = new THREE.PointsMaterial({
      size: 0.032,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: createSparkTexture(),
    });

    const sparkParticles = new THREE.Points(sparkGeometry, sparkMaterial);
    scene.add(sparkParticles);

    // 6. Model Root Pivot & Interior Showroom Anchor
    const modelPivot = new THREE.Group();
    scene.add(modelPivot);

    const showroomAnchor = new THREE.Vector3(0, -0.95, -0.15);

    // Interior Showroom Spotlight (illuminates the frosted glass display wall from ceiling)
    const showroomSpot = new THREE.SpotLight(0xfff1de, 6.5);
    showroomSpot.angle = Math.PI / 4;
    showroomSpot.penumbra = 0.75;
    scene.add(showroomSpot);
    scene.add(showroomSpot.target);

    // Texture Loader for 3 Project Canvases
    const textureLoader = new THREE.TextureLoader();
    const textures = {
      canvas1: textureLoader.load('/images/projects/villa.jpg', (t) => { t.colorSpace = THREE.SRGBColorSpace; }),
      canvas2: textureLoader.load('/images/projects/tower.jpg', (t) => { t.colorSpace = THREE.SRGBColorSpace; }),
      canvas3: textureLoader.load('/images/projects/eco.jpg', (t) => { t.colorSpace = THREE.SRGBColorSpace; }),
    };

    // Load building.glb
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      '/models/building.glb',
      (gltf) => {
        if (!isMounted) return;
        const model = gltf.scene;
        modelPivot.add(model);

        // Auto-center & Scale
        const boxInitial = new THREE.Box3().setFromObject(model);
        const sizeInitial = boxInitial.getSize(new THREE.Vector3());
        const maxDim = Math.max(sizeInitial.x, sizeInitial.y, sizeInitial.z);
        const targetScale = 3.6 / (maxDim > 0.0001 ? maxDim : 1);
        model.scale.setScalar(targetScale);

        model.updateMatrixWorld(true);

        const boxScaled = new THREE.Box3().setFromObject(model);
        const centerScaled = boxScaled.getCenter(new THREE.Vector3());

        model.position.sub(centerScaled);
        modelPivot.position.y = -0.2;
        modelPivot.updateMatrixWorld(true);

        // Traverse & Apply Project Textures & PBR Materials
        model.traverse((child: any) => {
          if (child.isMesh) {
            const name = child.name || '';

            // Showroom Ceiling & Slab: Apply polygonOffset to prevent z-fighting and flickering
            const isCeilingOrSlab = 
              name === 'Stone_MidFloorSlab' ||
              name.toLowerCase().includes('midfloor') ||
              name.toLowerCase().includes('ceiling') ||
              name.toLowerCase().includes('roof') ||
              name.toLowerCase().includes('slab') ||
              name.toLowerCase().includes('lobbyfloor');

            if (isCeilingOrSlab) {
              const applyPolygonOffset = (mat: any) => {
                if (!mat) return;
                mat.polygonOffset = true;
                mat.polygonOffsetFactor = -1.0;
                mat.polygonOffsetUnits = -4.0;
                mat.needsUpdate = true;
              };
              if (Array.isArray(child.material)) {
                child.material.forEach(applyPolygonOffset);
              } else {
                applyPolygonOffset(child.material);
              }
              child.castShadow = false;
              child.receiveShadow = false;
            }

            // 1. Assign project textures to the 3 interior canvases
            if (name === 'Showroom_Canvas_1') {
              child.material = new THREE.MeshBasicMaterial({ map: textures.canvas1 });
            } else if (name === 'Showroom_Canvas_2') {
              child.material = new THREE.MeshBasicMaterial({ map: textures.canvas2 });
              // Obtain world position of center canvas for showroom anchor
              child.getWorldPosition(showroomAnchor);
              showroomSpot.position.set(showroomAnchor.x, showroomAnchor.y + 1.2, showroomAnchor.z + 1.2);
              showroomSpot.target.position.copy(showroomAnchor);
              showroomSpot.target.updateMatrixWorld();
            } else if (name === 'Showroom_Canvas_3') {
              child.material = new THREE.MeshBasicMaterial({ map: textures.canvas3 });
            }

            // 2. Architectural Glass Materials (Transparent so showroom is visible through windows)
            if (name.toLowerCase().includes('glass_lobby') || name.toLowerCase().includes('glass_')) {
              child.material = new THREE.MeshPhysicalMaterial({
                color: new THREE.Color('#94d0ea'),
                roughness: 0.04,
                metalness: 0.1,
                transmission: 0.88,
                transparent: true,
                opacity: 0.7,
                ior: 1.5,
                side: THREE.DoubleSide,
                depthWrite: false,
              });
            } else if (name === 'Frosted_ShowroomWall') {
              // Frosted Dark Glass Partition Wall
              child.material = new THREE.MeshPhysicalMaterial({
                color: new THREE.Color('#101319'),
                roughness: 0.28,
                metalness: 0.35,
                transmission: 0.6,
                transparent: true,
                opacity: 0.92,
                side: THREE.DoubleSide,
              });
            } else if (name.toLowerCase().includes('gold')) {
              child.material = new THREE.MeshStandardMaterial({
                color: new THREE.Color('#d4af37'),
                roughness: 0.22,
                metalness: 0.95,
              });
            } else if (name.toLowerCase().includes('core')) {
              child.material = new THREE.MeshStandardMaterial({
                color: new THREE.Color('#ffe29e'),
                emissive: new THREE.Color('#ffa826'),
                emissiveIntensity: 0.75,
                roughness: 0.3,
              });
            }
          }
        });

        if (onLoadedRef.current) {
          onLoadedRef.current();
        }
      },
      undefined,
      (err) => {
        console.error('Error loading building model:', err);
        if (onLoadedRef.current) onLoadedRef.current();
      }
    );

    // 7. Resize Listener (No mouse tracking - 100% scroll driven for performance)
    const onResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
      shaderUniforms.uResolution.value.set(sizes.width, sizes.height);
    };
    window.addEventListener('resize', onResize);

    // 8. Main Render Loop with THREE.MathUtils.damp (Inertia & Smooth)
    const targetCameraPos = new THREE.Vector3(2.5, 1.8, 4.8);
    const targetLookAt = new THREE.Vector3(-0.3, 0.2, 0.0);
    const currentLookAt = new THREE.Vector3(-0.3, 0.2, 0.0);

    const clock = new THREE.Clock();

    const animate = () => {
      if (!isMounted) return;
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsedTime = clock.getElapsedTime();
      const p = Math.min(Math.max(scrollRef.current, 0), 1);

      // Animate forge sparks (Scroll driven speedup)
      const posArray = sparkParticles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < sparkCount; i++) {
        const idx = i * 3;
        const data = sparkData[i];
        posArray[idx] += data.speedX * delta;
        posArray[idx + 1] += data.speedY * delta;
        posArray[idx + 2] += data.speedZ * delta;

        if (posArray[idx + 1] > 3.2 || Math.abs(posArray[idx]) > 3.8 || Math.abs(posArray[idx + 2]) > 3.8) {
          posArray[idx + 1] = -2.5;
          posArray[idx] = (Math.random() - 0.5) * 3.5;
          posArray[idx + 2] = (Math.random() - 0.5) * 3.5;
        }
      }
      sparkParticles.geometry.attributes.position.needsUpdate = true;

      // ========================================================
      // 4-STAGE CAMERA TRAJECTORY TIMELINE (100% Inside Enclosed Showroom)
      // Chặng 1 (0.00 -> 0.25): Toàn cảnh ngoại thất tòa nhà
      // Chặng 2 (0.25 -> 0.50): Lướt xuyên kính tiến vào phòng showroom
      // Chặng 3 (0.50 -> 0.78): Đứng trong phòng đối diện 3 khung tranh trên vách kính mờ
      // Chặng 4 (0.78 -> 1.00): Rút nhẹ góc cao nghệ thuật hoàng hôn cho mục dự toán
      // ========================================================
      const sX = showroomAnchor.x;
      const sY = showroomAnchor.y;
      const sZ = showroomAnchor.z;

      if (p <= 0.25) {
        // Stage 1: Exterior 3/4 Panorama
        const t = p / 0.25;
        targetCameraPos.set(
          sX + 2.5 - t * 0.8,
          sY + 2.0 - t * 0.6,
          sZ + 4.8 - t * 1.5
        );
        targetLookAt.set(sX - 0.3 + t * 0.2, sY + 0.8 - t * 0.4, sZ);
      } else if (p <= 0.50) {
        // Stage 2: Gliding directly INTO the showroom room through the glass facade
        const t = (p - 0.25) / 0.25;
        targetCameraPos.set(
          sX + 1.7 * (1 - t),
          sY + 1.4 - t * 1.35,
          sZ + 3.3 - t * 1.6
        );
        targetLookAt.set(sX - 0.1 * (1 - t), sY + 0.4 - t * 0.35, sZ);
      } else if (p <= 0.78) {
        // Stage 3: Inside Showroom Room facing the 3 project frames
        const t = (p - 0.50) / 0.28;
        targetCameraPos.set(
          sX + Math.sin(t * Math.PI) * 0.12,
          sY + 0.05,
          sZ + 1.7 - t * 0.08
        );
        targetLookAt.set(sX, sY + 0.05, sZ);
      } else {
        // Stage 4: Elevated Twilight Perspective for Consultation
        const t = (p - 0.78) / 0.22;
        targetCameraPos.set(
          sX - 2.6 * t,
          sY + 0.05 + t * 2.2,
          sZ + 1.62 + t * 2.8
        );
        targetLookAt.set(sX, sY + 0.6 * t, sZ);
      }

      // Smooth Inertia Damping (dampVector3 via THREE.MathUtils.damp)
      dampVector3(camera.position, targetCameraPos, 3.8, delta);
      dampVector3(currentLookAt, targetLookAt, 4.2, delta);
      camera.lookAt(currentLookAt);

      // Shader uniforms sync
      shaderUniforms.uTime.value = elapsedTime;
      shaderUniforms.uScroll.value = p;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div id="webgl-canvas-container" className="fixed inset-0 w-full h-full pointer-events-auto">
      <canvas ref={canvasRef} className="w-full h-full block outline-none" />
    </div>
  );
}
