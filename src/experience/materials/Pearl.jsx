/** @format */

import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import { useRingConfigurator } from "../../store/useRingConfigurator";
import * as THREE from "three";
import { useMemo } from "react";


// Define material maps
const PearlMaterial = () => {
  const pearlType = useRingConfigurator((state) => state.config.pearlColor);

  const pearlMaterialMap = {
    white: {
      materialColor: "white", // Gold color
      metalness: 0.3,
      roughness: 0.2,
      reflectivity: 3,
    },
    blue: {
      materialColor: "lightblue", // Gold color
      metalness: 0.3,
      roughness: 0.2,
      reflectivity: 3,
    },
    pink: {
      materialColor: "pink", // Gold color
      metalness: 0.3,
      roughness: 0.2,
      reflectivity: 3,
    },
  };

  const material = useMemo(() => {
    const { materialColor, roughness, metalness, reflectivity } =
      pearlMaterialMap[pearlType];

    return new CustomShaderMaterial({
      baseMaterial: THREE.MeshPhysicalMaterial,
      vertexShader:"",
      fragmentShader:"",
      uniforms: {
        uTime: {
          value: 0,
        },
      },
      flatShading: false,
      color: new THREE.Color(materialColor),
      roughness,
      metalness,
      reflectivity,
    });
  }, [pearlType]);

  return material;
};

export default PearlMaterial;
