'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface LaztarCanvasProps {
  modelMode?: 'building' | 'seakeep';
  scrollProgress?: number;
  onLoaded?: () => void;
}

export default function LaztarCanvas({
  modelMode = 'building',
  scrollProgress = 0,
  onLoaded,
}: LaztarCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const scrollRef = useRef<number>(scrollProgress);
  scrollRef.current = scrollProgress;

  const modeRef = useRef<'building' | 'seakeep'>(modelMode);
  modeRef.current = modelMode;

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
    scene.fog = new THREE.FogExp2('#000000', 0.01);

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const camera = new THREE.PerspectiveCamera(
      48,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.set(0, 0.5, 4.0);
    scene.add(camera);

    // 2. Full-Screen Liquid Metallic Waves Background Shader
    const shaderUniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(sizes.width, sizes.height) },
      uMouse: { value: new THREE.Vector2(0, 0) },
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
      uniform vec2 uMouse;
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
        float aspect = uResolution.x / uResolution.y;
        
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
        vec2 mouseShift = vec2(uMouse.x * aspect * 0.05, uMouse.y * 0.05);
        warpedUv += scrollDrift + mouseShift;
        
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

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.8;

    // 4. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.8);
    scene.add(ambientLight);

    // Key Light: High-angle architectural sun
    const keyLight = new THREE.DirectionalLight('#ffffff', 4.0);
    keyLight.position.set(8, 14, 8);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 1.0;
    keyLight.shadow.camera.far = 30;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Key Spotlight for Dramatic Lustre
    const spotLight = new THREE.SpotLight('#ffe8c2', 12.0);
    spotLight.position.set(6, 12, 5);
    spotLight.angle = Math.PI / 3;
    spotLight.penumbra = 0.8;
    scene.add(spotLight);

    // Rim Light: Cool Sapphire Blue edge light
    const rimLight = new THREE.DirectionalLight('#8ec5fc', 6.0);
    rimLight.position.set(-8, 6, -6);
    scene.add(rimLight);

    // Fill Light: Warm cream
    const fillLight = new THREE.DirectionalLight('#fff3e6', 1.5);
    fillLight.position.set(-3, -2, 4);
    scene.add(fillLight);

    // 5. Forge Sparks Particle System
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

    const sparkCount = 350;
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
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: createSparkTexture(),
    });

    const sparkParticles = new THREE.Points(sparkGeometry, sparkMaterial);
    scene.add(sparkParticles);

    // 6. 3D Model Loader with Mathematical Box3 Auto-Scale & Pivot
    const modelPivot = new THREE.Group();
    scene.add(modelPivot);

    let activeModel: THREE.Object3D | null = null;
    const gltfLoader = new GLTFLoader();

    function loadModel(mode: 'building' | 'seakeep') {
      const modelUrl =
        mode === 'seakeep'
          ? '/models/sea_keep_lonely_watcher.glb'
          : '/models/building.glb';

      if (activeModel) {
        modelPivot.remove(activeModel);
        activeModel = null;
      }

      gltfLoader.load(
        modelUrl,
        (gltf) => {
          if (!isMounted) return;
          const model = gltf.scene;
          activeModel = model;
          modelPivot.add(model);

          model.traverse((child: any) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;

              if (mode === 'seakeep') {
                // Hide sky dome if present so island is visible
                const nameLower = (child.name || '').toLowerCase();
                if (nameLower.includes('sky')) {
                  child.visible = false;
                }

                if (child.material) {
                  if (Array.isArray(child.material)) {
                    child.material.forEach((m: any) => {
                      m.side = THREE.DoubleSide;
                      m.roughness = 0.55;
                      m.metalness = 0.2;
                    });
                  } else {
                    child.material.side = THREE.DoubleSide;
                    child.material.roughness = 0.55;
                    child.material.metalness = 0.2;
                  }
                }
              } else {
                // Building model with PBR enhancements
                const name = (child.name || '').toLowerCase();
                if (name.includes('glass')) {
                  child.material = new THREE.MeshPhysicalMaterial({
                    color: new THREE.Color('#98d4ee'),
                    roughness: 0.05,
                    metalness: 0.15,
                    transmission: 0.8,
                    transparent: true,
                    opacity: 0.85,
                    ior: 1.52,
                    side: THREE.DoubleSide,
                  });
                } else if (name.includes('core')) {
                  child.material = new THREE.MeshStandardMaterial({
                    color: new THREE.Color('#ffe29e'),
                    emissive: new THREE.Color('#ffa826'),
                    emissiveIntensity: 0.8,
                    roughness: 0.3,
                  });
                } else if (name.includes('gold')) {
                  child.material = new THREE.MeshStandardMaterial({
                    color: new THREE.Color('#d4af37'),
                    roughness: 0.25,
                    metalness: 0.95,
                  });
                } else if (name.includes('titanium') || name.includes('column')) {
                  child.material = new THREE.MeshStandardMaterial({
                    color: new THREE.Color('#383e49'),
                    roughness: 0.35,
                    metalness: 0.85,
                  });
                } else {
                  // Travertine stone facade
                  child.material = new THREE.MeshStandardMaterial({
                    color: new THREE.Color('#8a919d'),
                    roughness: 0.45,
                    metalness: 0.2,
                  });
                }
              }
            }
          });

          // Exact mathematical Bounding Box scaling & center calculation
          const boxInitial = new THREE.Box3().setFromObject(model);
          const sizeInitial = boxInitial.getSize(new THREE.Vector3());
          const maxDim = Math.max(sizeInitial.x, sizeInitial.y, sizeInitial.z);
          const targetScale = (mode === 'seakeep' ? 4.2 : 3.6) / (maxDim > 0.0001 ? maxDim : 1);
          model.scale.setScalar(targetScale);

          model.updateMatrixWorld(true);

          const boxScaled = new THREE.Box3().setFromObject(model);
          const centerScaled = boxScaled.getCenter(new THREE.Vector3());

          model.position.sub(centerScaled);
          modelPivot.position.y = -0.25;

          if (onLoadedRef.current) {
            onLoadedRef.current();
          }
        },
        undefined,
        (err) => {
          console.error('Error loading GLTF model:', err);
          if (onLoadedRef.current) onLoadedRef.current();
        }
      );
    }

    let currentLoadedMode = modeRef.current;
    loadModel(currentLoadedMode);

    // 7. Mouse and Resize Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      shaderUniforms.uResolution.value.set(sizes.width, sizes.height);
    };
    window.addEventListener('resize', onResize);

    // 8. Main Render & Smooth Lerp Animation Loop
    let currentScroll = scrollRef.current;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isMounted) return;
      animationFrameId = requestAnimationFrame(animate);

      const deltaTime = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (modeRef.current !== currentLoadedMode) {
        currentLoadedMode = modeRef.current;
        loadModel(currentLoadedMode);
      }

      const targetScroll = scrollRef.current;
      currentScroll += (targetScroll - currentScroll) * 0.04;

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      modelPivot.rotation.y = mouseX * 0.22;
      modelPivot.rotation.x = mouseY * 0.12;

      // Swirling Forge Sparks physics
      const posArray = sparkParticles.geometry.attributes.position.array as Float32Array;
      const scrollVelocity = Math.abs(targetScroll - currentScroll);
      const speedMultiplier = 1.0 + scrollVelocity * 8.0;
      const turbulence = scrollVelocity * 0.8;

      for (let i = 0; i < sparkCount; i++) {
        const idx = i * 3;
        const data = sparkData[i];
        posArray[idx] += data.speedX * deltaTime * speedMultiplier;
        posArray[idx + 1] += data.speedY * deltaTime * speedMultiplier;
        posArray[idx + 2] += data.speedZ * deltaTime * speedMultiplier;

        const currentSway = data.swayRadius * (1.0 + turbulence * 4.0);
        posArray[idx] += Math.sin(elapsedTime * data.swaySpeed + data.phase) * currentSway * deltaTime;
        posArray[idx + 2] += Math.cos(elapsedTime * data.swaySpeed + data.phase) * currentSway * deltaTime;

        if (posArray[idx + 1] > 3.2 || Math.abs(posArray[idx]) > 3.8 || Math.abs(posArray[idx + 2]) > 3.8) {
          posArray[idx + 1] = -2.5;
          posArray[idx] = (Math.random() - 0.5) * 3.5;
          posArray[idx + 2] = (Math.random() - 0.5) * 3.5;
        }
      }
      sparkParticles.geometry.attributes.position.needsUpdate = true;

      // Camera 360 orbits the 3D model based on scroll depth (from reference)
      const phi = currentScroll * Math.PI * 2.0;
      const y = 0.45 + Math.sin(currentScroll * Math.PI) * 0.75;
      const radius = 4.2 - Math.sin(currentScroll * Math.PI) * 0.5;
      const x = radius * Math.sin(phi);
      const z = radius * Math.cos(phi);

      const transitionProgress = Math.min(1.0, currentScroll / 0.28);
      const easeFactor = (Math.cos(transitionProgress * Math.PI) + 1.0) * 0.5;
      const lookAtXOffset = -0.75 * easeFactor;

      const targetLookAt = new THREE.Vector3(lookAtXOffset, 0.1, 0);
      const targetPos = new THREE.Vector3(x, y, z);
      camera.position.lerp(targetPos, 0.04);
      camera.lookAt(targetLookAt);

      // Synchronize backshader uniforms
      shaderUniforms.uTime.value = elapsedTime;
      shaderUniforms.uMouse.value.set(mouseX, -mouseY);
      shaderUniforms.uScroll.value = currentScroll;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div id="webgl-canvas-container">
      <canvas ref={canvasRef} className="w-full h-full block outline-none" />
    </div>
  );
}
