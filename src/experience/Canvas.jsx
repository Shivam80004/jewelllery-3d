/** @format */

import { Canvas } from "@react-three/fiber";
import React from "react";
import Experience from "./Eperience";
export default function ThreeCanvas({

}) {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [5, 5, 5],
      }}>
      <Experience />
    </Canvas>
  );
}
