import React, { useRef, useEffect } from "react";
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import gsap from "gsap";
import * as THREE from "three";
import Ring from "./components/Ring";
import ModelTransition from "./components/ModelTransition";
import { useRingConfigurator } from "../store/useRingConfigurator";

export default function Experience() {
  const controlsRef = useRef();
  const { step, config } = useRingConfigurator();
  const { pointer, camera } = useThree();

  // Handle cinematic camera path based on the current step
  useEffect(() => {
    if (!controlsRef.current) return;
    const ctrl = controlsRef.current;

    const pos = new THREE.Vector3();
    const target = new THREE.Vector3();

    switch (step) {
      case 1: // The Architecture (Wide/Hero)
        pos.set(0, 3, 9);
        target.set(0, 0, 0);
        break;
      case 2: // The Core (Pearl close up)
        pos.set(0, 5, 3);
        target.set(0, 1, 0);
        break;
      case 3: // The Band (Angle showcasing texture)
        pos.set(4, 2, 5);
        target.set(0, 0, 0);
        break;
      case 4: // The Mark (Inner ring engraving view)
        pos.set(0, 5, 3);
        target.set(0, 1, 0);
        break;
      default:
        pos.set(0, 2, 8);
        target.set(0, 0, 0);
        break;
    }

    // Animate the camera position
    gsap.to(camera.position, {
      x: pos.x, y: pos.y, z: pos.z,
      duration: 2.5, ease: "power4.inOut"
    });

    // Animate the controls target
    gsap.to(ctrl.target, {
      x: target.x, y: target.y, z: target.z,
      duration: 2.5, ease: "power4.inOut"
    });
  }, [step]);

  // Subtle Mouse-Follow Parallax
  useFrame(() => {
    // Left empty or handle camera position offset instead of overriding orbit angles
  });

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.5}
        enablePan={false}
        enableZoom={false}
      />

      {/* High-End Studio Lighting */}
      <Environment preset="studio" background={false} environmentIntensity={0.8} />

      <directionalLight
        position={[5, 10, 5]}
        intensity={2.5}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      <spotLight position={[-5, 5, -5]} intensity={1.5} color="#D4AF37" />

      {/* Dynamic Lighting for Pearl Core step */}
      <directionalLight
        position={[0, 8, 0]}
        intensity={step === 2 ? 4 : 0}
        color={config.pearlColor === 'pink' ? '#ffb6c1' : config.pearlColor === 'blue' ? '#add8e6' : '#ffffff'}
      />

      {/* The Jewelry */}
      <Ring />

      {/* Liquid-gold shader dissolve on model switch */}
      <ModelTransition />

      {/* Realistic Shadow Catcher */}
      <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={20} blur={2.5} far={4} />

      {/* Cinematic Post-Processing (Ensure fallback to disable crash) */}
      <EffectComposer multisampling={8} disableNormalPass>
        <Bloom
          luminanceThreshold={0.85}
          luminanceSmoothing={0.3}
          intensity={0.25}
          levels={5}
        />
        {/* <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.001, 0.001]}
        /> */}
        {/* <Noise opacity={0.02} /> */}
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  );
}