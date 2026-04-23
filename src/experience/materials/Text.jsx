/** @format */
import * as THREE from 'three'
const createTextTexture = (text="custom text", width = 300, height =300, fontFamily='cursive') => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;

  // Background (optional, transparent by default)
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Text styling
  ctx.fillStyle = "rgba(0, 0, 0, 0.35)"; // Adjust color
  ctx.font = `bold 15px ${fontFamily}`; // Customize font
  ctx.textAlign = "center";
  ctx.textBaseline = "center";

  // Draw text
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  // Convert canvas to THREE.Texture
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.flipY = true

   
  return texture;
};



export default createTextTexture