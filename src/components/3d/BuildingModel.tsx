'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { 
  useGLTF, 
  useProgress, 
  Center, 
  Bounds, 
  Html 
} from '@react-three/drei';

/* ========================================================
   1. HOLOGRAPHIC 3D SHIMMER LOADING FALLBACK
   Never leaves the screen empty or black
======================================================== */
export function ModelLoadingHologram() {
  const { progress } = useProgress();
  const wireframeRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y += delta * 0.7;
      wireframeRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.15;
    }
  });

  return (
    <group position={[0, 1.8, 0]}>
      {/* 3D Holographic Wireframe Cage */}
      <group ref={wireframeRef}>
        <mesh>
          <boxGeometry args={[3.6, 2.8, 3.6]} />
          <meshBasicMaterial 
            color="#D4AF37" 
            wireframe 
            transparent 
            opacity={0.35} 
          />
        </mesh>

        <mesh scale={0.75}>
          <octahedronGeometry args={[2, 0]} />
          <meshBasicMaterial 
            color="#ffe494" 
            wireframe 
            transparent 
            opacity={0.5} 
          />
        </mesh>
      </group>

      {/* Floating Progress Badge */}
      <Html center position={[0, -1.2, 0]}>
        <div className="flex flex-col items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-slate-950/90 backdrop-blur-xl border border-amber-500/30 shadow-2xl shadow-black/80 select-none min-w-[210px] text-center">
          <div className="flex items-center justify-between w-full text-[11px] font-mono tracking-widest uppercase text-amber-400">
            <span>Tải Mô Hình 3D</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden relative">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500 rounded-full transition-all duration-300 shadow-sm shadow-amber-400"
              style={{ width: `${Math.max(progress, 15)}%` }}
            />
          </div>
          <span className="text-[10px] tracking-wider text-slate-400 uppercase font-sans">
            Laztar Asset Pipeline
          </span>
        </div>
      </Html>
    </group>
  );
}

/* ========================================================
   2. STYLIZED HIGH-END ARCHITECTURAL MODEL
   - Dark Slate / Titanium Structure
   - Smoky Cyan Physical Glass
   - Selective Gold Accent Edges (GPU Safe)
======================================================== */
interface ModelProps {
  modelUrl?: string;
  modelMode?: 'building' | 'seakeep';
}

function ProcessedGLTFModel({ url, isBuilding }: { url: string; isBuilding: boolean }) {
  // Load GLB with automated Draco fallback
  const { scene } = useGLTF(url);

  // High-end Architectural Materials
  const { structuralMaterial, glassMaterial } = useMemo(() => {
    const structural = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#1a1e26'),
      roughness: 0.3,
      metalness: 0.8,
      reflectivity: 0.9,
      clearcoat: 0.3,
      clearcoatRoughness: 0.2,
      side: THREE.DoubleSide,
    });

    const glass = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#2c4656'),
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.65,
      transparent: true,
      opacity: 0.85,
      ior: 1.52,
      thickness: 1.2,
      side: THREE.DoubleSide,
    });

    return { structuralMaterial: structural, glassMaterial: glass };
  }, []);

  const clonedScene = useMemo(() => {
    const cloned = scene.clone(true);
    const edgeMaterial = new THREE.LineBasicMaterial({ 
      color: new THREE.Color('#D4AF37'), 
      transparent: true, 
      opacity: 0.8 
    });

    let edgeCount = 0;

    cloned.traverse((child: any) => {
      if (child.isMesh && child.geometry) {
        child.castShadow = true;
        child.receiveShadow = true;

        const nameLower = (child.name || '').toLowerCase();
        const matNameLower = (child.material?.name || '').toLowerCase();
        const isGlass = 
          nameLower.includes('glass') || 
          nameLower.includes('window') || 
          nameLower.includes('kinh') ||
          matNameLower.includes('glass') ||
          Boolean(child.material?.transparent && child.material?.opacity < 0.9);

        if (isGlass) {
          child.material = glassMaterial;
        } else {
          // If modern building, apply Dark Slate. If Sea Keep, enhance existing textures with DoubleSide
          if (isBuilding) {
            child.material = structuralMaterial;
          } else if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((m: any) => { m.side = THREE.DoubleSide; });
            } else {
              child.material.side = THREE.DoubleSide;
            }
          }

          // Safely add selective Gold Edges ONLY for small geometric slabs (< 500 vertices) to prevent GPU crash
          if (isBuilding && edgeCount < 12 && child.geometry.attributes.position && child.geometry.attributes.position.count < 500) {
            try {
              const edgeGeo = new THREE.EdgesGeometry(child.geometry, 20);
              const edgeLines = new THREE.LineSegments(edgeGeo, edgeMaterial);
              edgeLines.renderOrder = 10;
              child.add(edgeLines);
              edgeCount++;
            } catch (_) {}
          }
        }
      }
    });

    return cloned;
  }, [scene, isBuilding, structuralMaterial, glassMaterial]);

  return (
    <group position={[0, 0, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

/* ========================================================
   3. BUILDING MODEL EXPORT WITH AUTO-FIT & BOUNDS
======================================================== */
export default function BuildingModel({ 
  modelUrl = '/models/building.glb',
  modelMode = 'building'
}: ModelProps) {
  const isBuilding = modelMode === 'building';
  const activeUrl = isBuilding 
    ? modelUrl 
    : '/models/sea_keep_lonely_watcher.glb';

  return (
    <Bounds fit clip observe margin={1.25}>
      <Center top position={[0, 0, 0]}>
        <ProcessedGLTFModel url={activeUrl} isBuilding={isBuilding} />
      </Center>
    </Bounds>
  );
}

// Preload models
try {
  useGLTF.preload('/models/building.glb');
  useGLTF.preload('/models/sea_keep_lonely_watcher.glb');
} catch (_) {}
