"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  Component,
  Suspense,
  useMemo,
  useRef,
  type ReactNode,
} from "react";

const HERO_VIDEO = "3R1mMK7t36o"; // "attack of titans frag 20 sec" (Aroldo Jerez)

// ── Vapor (partículas ascendentes) ───────────────────────
function Steam({ count = 50 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = Math.random() * 6 - 0.5;
      pos[i * 3 + 2] = -3 + Math.random() * 4;
      spd[i] = 0.3 + Math.random() * 0.6;
    }
    return { positions: pos, speeds: spd };
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const attr = ref.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta;
      arr[i * 3] += Math.sin(Date.now() * 0.0004 + i) * 0.006;
      if (arr[i * 3 + 1] > 6.5) {
        arr[i * 3 + 1] = -0.5;
        arr[i * 3] = (Math.random() - 0.5) * 16;
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        color="#d6d3d1"
        transparent
        opacity={0.07}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ── Brasas (rojo ceniza) ─────────────────────────────────
function Embers({ count = 28 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = Math.random() * 10 - 3;
      pos[i * 3 + 2] = -4 + Math.random() * 6;
      spd[i] = 0.2 + Math.random() * 0.5;
    }
    return { positions: pos, speeds: spd };
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const attr = ref.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta;
      arr[i * 3] += Math.sin(Date.now() * 0.0006 + i * 0.7) * 0.012;
      if (arr[i * 3 + 1] > 8) {
        arr[i * 3 + 1] = -3;
        arr[i * 3] = (Math.random() - 0.5) * 16;
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        color="#f97316"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ── Parallax por mouse ───────────────────────────────────
function Rig({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const targetX = state.pointer.x * 0.2;
    const targetY = state.pointer.y * 0.15;
    group.current.rotation.y += (targetX - group.current.rotation.y) * 0.04;
    group.current.rotation.x += (targetY - group.current.rotation.x) * 0.04;
  });

  return <group ref={group}>{children}</group>;
}

// ── Fallback si WebGL no está disponible ─────────────────
class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-40 w-40">
            <div className="absolute inset-0 animate-pulse-glow rounded-full bg-gradient-to-br from-rose-900 via-red-800 to-amber-700 blur-xl" />
            <div className="orb absolute inset-6 animate-float" />
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 overflow-hidden w-full" aria-hidden>
      {/* Video de batalla tenue (sin sonido, sin controles, en bucle) */}
      <div className="absolute inset-0 opacity-35 mix-blend-screen w-full">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${HERO_VIDEO}?autoplay=1&mute=1&controls=0&loop=1&playlist=${HERO_VIDEO}&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&playsinline=1&modestbranding=1`}
          title="Batalla de Attack on Titan"
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
          tabIndex={-1}
          className="pointer-events-none h-full w-full scale-110 border-0"
          style={{
            filter: "saturate(0.7) brightness(0.9) contrast(1.05)",
            width: "100%",
            height: "100%",
          }}
        />
        {/* Velo oscuro para integración con el tema */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c10] via-[#0b0c10]/60 to-[#0b0c10]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-[#0b0c10]/70" />
      </div>

      {/* Cuadrícula + cuadros flotantes + líneas 3D por encima */}
      <SceneBoundary>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0.5, 8.5], fov: 55 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <Rig>
              <Steam />
              <Embers />
            </Rig>
          </Suspense>
        </Canvas>
      </SceneBoundary>

      {/* Glow decorativo */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-900/25 blur-[110px]" />
    </div>
  );
}
