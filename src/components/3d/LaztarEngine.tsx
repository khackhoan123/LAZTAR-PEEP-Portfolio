'use client';

import React, { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  ContactShadows, 
  useTexture,
  Sparkles,
  Environment 
} from '@react-three/drei';
import BuildingModel, { ModelLoadingHologram } from './BuildingModel';

/* ========================================================
   1. CINEMATIC CAMERA RIG (Apple-grade Inertia & Keyframes)
======================================================== */
interface CameraRigProps {
  scrollProgress: number;
}

function CinematicCameraRig({ scrollProgress }: CameraRigProps) {
  const { camera } = useThree();

  const desiredPos = useMemo(() => new THREE.Vector3(), []);
  const desiredTarget = useMemo(() => new THREE.Vector3(), []);
  const currentTarget = useMemo(() => new THREE.Vector3(0, 2, 0), []);

  const keyframes = useMemo(() => [
    { pos: new THREE.Vector3(15, 12, 20), target: new THREE.Vector3(0, 2, 0) },
    { pos: new THREE.Vector3(8, 3, 10),   target: new THREE.Vector3(0, 1.5, 0) },
    { pos: new THREE.Vector3(0, 2, 5),    target: new THREE.Vector3(0, 2, 0) },
    { pos: new THREE.Vector3(-5, 4, 12),  target: new THREE.Vector3(0, 2, 0) },
  ], []);

  useFrame((_, delta) => {
    const p = Math.min(Math.max(scrollProgress, 0), 1);

    if (p <= 0.25) {
      const t = p / 0.25;
      desiredPos.lerpVectors(keyframes[0].pos, keyframes[1].pos, t);
      desiredTarget.lerpVectors(keyframes[0].target, keyframes[1].target, t);
    } else if (p <= 0.55) {
      const t = (p - 0.25) / 0.30;
      desiredPos.lerpVectors(keyframes[1].pos, keyframes[2].pos, t);
      desiredTarget.lerpVectors(keyframes[1].target, keyframes[2].target, t);
    } else if (p <= 0.85) {
      const t = (p - 0.55) / 0.30;
      desiredPos.lerpVectors(keyframes[2].pos, keyframes[3].pos, t);
      desiredTarget.lerpVectors(keyframes[2].target, keyframes[3].target, t);
    } else {
      const t = (p - 0.85) / 0.15;
      desiredPos.set(
        THREE.MathUtils.lerp(keyframes[3].pos.x, -6, t),
        THREE.MathUtils.lerp(keyframes[3].pos.y, 4.5, t),
        THREE.MathUtils.lerp(keyframes[3].pos.z, 13, t)
      );
      desiredTarget.copy(keyframes[3].target);
    }

    // Cinematic Inertia
    const dampFactor = 1 - Math.exp(-4.5 * delta);
    camera.position.lerp(desiredPos, dampFactor);
    currentTarget.lerp(desiredTarget, dampFactor);
    camera.lookAt(currentTarget);
  });

  return null;
}

/* ========================================================
   2. FLOATING 3D GLASS CARDS FOR STAGE 3 (GALLERY)
======================================================== */
function FloatingGalleryPlane({
  position,
  textureUrl,
  title,
  subtitle,
}: {
  position: [number, number, number];
  textureUrl: string;
  title: string;
  subtitle: string;
}) {
  const texture = useTexture(textureUrl);
  const cardRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cardRef.current) {
      const t = state.clock.getElapsedTime();
      cardRef.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.04;
    }
  });

  return (
    <group ref={cardRef} position={position}>
      {/* Frosted Acrylic Panel */}
      <mesh position={[0, 0, -0.015]}>
        <boxGeometry args={[2.4, 1.5, 0.03]} />
        <meshStandardMaterial
          color="#12161f"
          roughness={0.2}
          metalness={0.5}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Gold Rim */}
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[2.44, 1.54, 0.01]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Project Image */}
      <mesh position={[0, 0.06, 0.015]}>
        <planeGeometry args={[2.25, 1.22]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* Small Brass Label Tag */}
      <mesh position={[0, -0.62, 0.02]}>
        <boxGeometry args={[1.8, 0.14, 0.01]} />
        <meshStandardMaterial color="#c59b27" metalness={0.95} roughness={0.2} />
      </mesh>
    </group>
  );
}

function ExhibitionStageGroup() {
  return (
    <group position={[0, 0, 1.5]}>
      <Suspense fallback={null}>
        <FloatingGalleryPlane
          position={[-2.8, 1.8, 0]}
          textureUrl="/images/projects/villa.jpg"
          title="Biệt Thự Đồi Sapphire"
          subtitle="Đà Lạt • 1.200m²"
        />
        <FloatingGalleryPlane
          position={[0, 1.9, -0.3]}
          textureUrl="/images/projects/tower.jpg"
          title="Laztar Innovation Tower"
          subtitle="TP.HCM • 38 Tầng"
        />
        <FloatingGalleryPlane
          position={[2.8, 1.8, 0]}
          textureUrl="/images/projects/eco.jpg"
          title="Đại Đô Thị Eco-Haven"
          subtitle="Đồng Nai • 45 Héc-ta"
        />
      </Suspense>
    </group>
  );
}

/* ========================================================
   3. ARCHITECTURAL STUDIO ENVIRONMENT & FLOOR
======================================================== */
function StudioGround() {
  return (
    <group position={[0, 0, 0]}>
      {/* Soft Contact Shadow beneath the building foundation */}
      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.75}
        scale={35}
        blur={2.5}
        far={10}
        color="#000000"
      />

      {/* Dark Architectural Floor */}
      <mesh position={[0, -0.03, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial
          color="#08090b"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

/* ========================================================
   4. LAZTAR ENGINE COMPONENT (Core WebGL Canvas)
======================================================== */
export interface LaztarEngineProps {
  modelMode?: 'building' | 'seakeep';
  scrollProgress?: number;
}

export default function LaztarEngine({
  modelMode = 'building',
  scrollProgress = 0,
}: LaztarEngineProps) {
  return (
    <div className="w-full h-full relative bg-[#08090b]">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [15, 12, 20], fov: 45, near: 0.1, far: 2000 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor('#08090b', 1);
          scene.background = new THREE.Color('#08090b');
        }}
      >
        {/* Explicit Dark Viewport Background Color */}
        <color attach="background" args={['#08090b']} />

        {/* Apple-grade Camera Interpolation Rig */}
        <CinematicCameraRig scrollProgress={scrollProgress} />

        {/* Studio Lighting Setup */}
        <Environment preset="city" />
        <ambientLight intensity={1.4} color="#ffffff" />
        <directionalLight
          position={[20, 30, 20]}
          intensity={2.8}
          color="#fff8eb"
          castShadow
        />
        <directionalLight
          position={[-15, 18, -15]}
          intensity={0.9}
          color="#90b8ff"
        />

        {/* Ambient Atmospheric Gold Sparkles */}
        <Sparkles
          count={70}
          scale={[25, 12, 25]}
          size={2.0}
          speed={0.25}
          color="#f3cb69"
          opacity={0.45}
        />

        {/* Contact Shadows & Ground */}
        <StudioGround />

        {/* Robust Model Loader with Hologram Fallback */}
        <Suspense fallback={<ModelLoadingHologram />}>
          <BuildingModel modelMode={modelMode} />
        </Suspense>

        {/* Stage 3 Showcase Exhibition Planes */}
        <ExhibitionStageGroup />
      </Canvas>
    </div>
  );
}
