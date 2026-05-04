/** @format */

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import React from "react";
import Experience from "./Eperience";

export default function ThreeCanvas() {
  return (
    <Canvas
      dpr={[1, Math.min(window.devicePixelRatio, 2)]}
      gl={{
        preserveDrawingBuffer: true,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      camera={{
        fov: 40,
        near: 0.1,
        far: 200,
        position: [5, 5, 5],
      }}
    >
      <React.Suspense fallback={null}>
        <Experience />
      </React.Suspense>
    </Canvas>
  );
}
