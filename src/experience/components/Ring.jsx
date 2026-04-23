
import { useGLTF } from "@react-three/drei";
import  GoldMaterial  from "../materials/Gold"; // Custom hook
import CreateDecal from "./Decal";
import { useRingConfigurator } from "../../store/useRingConfigurator";
import { Stage } from "@react-three/drei";
import  PearlMaterial  from "../materials/Pearl"; // Regular function
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState,useMemo } from "react";
import createTextTexture from "../materials/Text";
import * as THREE from "three";


export default function Ring() {
  const { config} = useRingConfigurator();
  const ringMeshRef = useRef();
  const pearlMeshRef = useRef();
 const [decalMesh, setDecalMesh] = useState(null);
  const text = useMemo(() => {
    return createTextTexture(
      config.textConfig.text,
      300,
      300,
      config.textConfig.fontFamily
    );
  }, [config.textConfig.text, config.textConfig.fontFamily]);

  

  const { scene } = useGLTF(
    config.model === "withPearl"
      ? "/assets/pearl_ring.glb"
      : "/assets/plain_ring.glb"
  );

  const goldMaterial = GoldMaterial(); // Custom hook
  const pearlMaterial = PearlMaterial(); // Regular function

  useEffect(() => {
    let ringMesh;
    let pearlMesh;

    scene.traverse((child) => {
      if (child.isMesh && child.name === "Ring") ringMesh = child;
      if (child.isMesh && child.name === "Pearl") pearlMesh = child;
    });

    if (ringMesh) {
      ringMesh.material = goldMaterial;
      // Remove previous decal before creating a new one
      setDecalMesh(null);
      // Create the decal
      if (text) {
        const decal = CreateDecal(ringMesh, text);

        setDecalMesh(decal);
      }
    }

    if (pearlMesh) pearlMesh.material = pearlMaterial;

    
   
  }, [text, goldMaterial, pearlMaterial,scene]);

  useFrame((state, delta) => {
    const elapsedTime = state.clock.elapsedTime;
    if (goldMaterial) {
      goldMaterial.uniforms.uTime.value = elapsedTime;
    }

  });



  return (
    <>
      <Stage
        castShadow={false}
        preset={"soft"}
        intensity={2}
        adjustCamera={2}
        shadows="contact"
        environment={"city"}>
        <primitive
          scale={[1, 1, 1]}
          position={[0, 0, 0]}
          rotation={[0, 0.5, 0]}
          object={scene}
        />
        {decalMesh && (
          <primitive
            
            renderOrder={1}
            scale={[1, 1, 1]}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            object={decalMesh}
          />
        )}{" "}
      </Stage>
    </>
  );
}

useGLTF.preload("/assets/pearl_ring.glb");
useGLTF.preload("/assets/plain_ring.glb");