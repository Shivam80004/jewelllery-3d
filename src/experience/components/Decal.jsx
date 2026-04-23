/** @format */

import { DecalGeometry } from "three/examples/jsm/geometries/DecalGeometry";
import * as THREE from "three";

// const CreateDecal = (mesh, texture) => {
//   if (!mesh) return null; // Ensure the mesh exists

//   const position = new THREE.Vector3(-0.05, -1.0, 0); // Move downward to inner bottom
//   const rotation = new THREE.Euler(Math.PI * 1.5, 0, Math.PI * 1.17); // Rotate 180° to face inward
//   const size = new THREE.Vector3(2, 2, 2); // Scale of the decal

//   const decalGeometry = new DecalGeometry(mesh, position, rotation, size);

//   const decalMaterial = new THREE.MeshBasicMaterial({
//     map: texture,
//     transparent: false,
//     opacity: 1,
//     depthTest: true,
//     depthWrite: false,
//     polygonOffset: true,
//     polygonOffsetFactor: -1, // Prevents z-fighting
//   });

//   const decalMesh = new THREE.Mesh(decalGeometry, decalMaterial);
//   decalMesh.name = "Decal";

//   return decalMesh;
// };

// export default CreateDecal;


const CreateDecal = (mesh, texture) => {
  if (!mesh) return null; // Ensure the mesh exists

  // // Get world position & rotation
  const position = mesh.geometry.boundingBox
    ? mesh.geometry.boundingBox.getCenter(new THREE.Vector3())
    : new THREE.Vector3();

  mesh.updateMatrixWorld();
  mesh.getWorldPosition(position); // Get the world position
  mesh.getWorldQuaternion(new THREE.Quaternion()); // Get the world rotation
  
  position.x =0.0 
  position.y -=1.0
  position.z = 0.01

  const rotation = new THREE.Euler(Math.PI * 1.5, 0, Math.PI * 2.17);
  const size = new THREE.Vector3(2, 2, 2); // Scale of the decal

  const decalGeometry = new DecalGeometry(mesh, position, rotation, size);

  const decalMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 1,
    depthTest: true,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -1, // Prevents z-fighting
  });

  const decalMesh = new THREE.Mesh(decalGeometry, decalMaterial);
  decalMesh.name = "Decal";

  return decalMesh;
};


export default CreateDecal;