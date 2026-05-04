/**
 * ModelTransition.jsx
 *
 * Renders a fullscreen dissolve overlay whenever `config.model` changes.
 * The model swap is deferred to the midpoint of the animation (progress = 0.5)
 * so the viewer never sees a hard pop.
 */

import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRingConfigurator } from "../../store/useRingConfigurator";
import transitionVertex   from "../shaders/transition/vertex.glsl";
import transitionFragment from "../shaders/transition/fragment.glsl";

const DURATION = 1.4; // seconds for the full sweep

export default function ModelTransition() {
  const { config, setConfig } = useRingConfigurator();
  const meshRef    = useRef();
  const matRef     = useRef();
  const progressRef = useRef(1.0);   // 1 = fully transparent (idle)
  const directionRef = useRef(1);    // +1 = animating forward
  const pendingRef  = useRef(null);  // the next model value waiting to be applied
  const swappedRef  = useRef(false); // did we swap at midpoint this run?
  const prevModelRef = useRef(config.model);

  const { size } = useThree();

  // Build the fullscreen shader material once
  const material = useRef(
    new THREE.ShaderMaterial({
      vertexShader:   transitionVertex,
      fragmentShader: transitionFragment,
      uniforms: {
        uProgress: { value: 1.0 },
        uTime:     { value: 0.0 },
      },
      transparent: true,
      depthTest:  false,
      depthWrite: false,
      blending:   THREE.NormalBlending,
    })
  ).current;

  // Fullscreen geometry (NDC triangle trick)
  const geometry = useRef((() => {
    const geo = new THREE.BufferGeometry();
    // Two triangles covering the full clip-space quad
    const verts = new Float32Array([
      -1, -1, 0,  1, -1, 0,  1,  1, 0,
      -1, -1, 0,  1,  1, 0, -1,  1, 0,
    ]);
    const uvs = new Float32Array([
      0, 0,  1, 0,  1, 1,
      0, 0,  1, 1,  0, 1,
    ]);
    geo.setAttribute("position", new THREE.BufferAttribute(verts, 3));
    geo.setAttribute("uv",       new THREE.BufferAttribute(uvs,   2));
    return geo;
  })()).current;

  // Watch for model changes and kick off the transition
  useEffect(() => {
    if (config.model === prevModelRef.current) return;

    // Queue the new value; we apply it at the midpoint
    pendingRef.current = config.model;

    // Revert the store instantly so Ring keeps the OLD model until midpoint
    setConfig({ model: prevModelRef.current });

    // Reset animation
    progressRef.current  = 0.0;
    directionRef.current = 1;
    swappedRef.current   = false;

    if (matRef.current) matRef.current.uniforms.uProgress.value = 0.0;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.model]);

  useFrame((state, delta) => {
    if (!matRef.current) return;

    const mat = matRef.current;
    mat.uniforms.uTime.value = state.clock.elapsedTime;

    // If we're animating forward (0 → 1)
    if (directionRef.current === 1 && progressRef.current < 1.0) {
      progressRef.current = Math.min(progressRef.current + delta / DURATION, 1.0);

      // Midpoint swap: apply the new model exactly once
      if (!swappedRef.current && progressRef.current >= 0.5 && pendingRef.current) {
        prevModelRef.current = pendingRef.current;
        setConfig({ model: pendingRef.current });
        pendingRef.current  = null;
        swappedRef.current  = true;
      }

      mat.uniforms.uProgress.value = progressRef.current;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      matRef={matRef}
      renderOrder={999}
      frustumCulled={false}
    >
      {/* attach the ref to the material node for uniform updates */}
      <primitive object={material} ref={matRef} attach="material" />
    </mesh>
  );
}
