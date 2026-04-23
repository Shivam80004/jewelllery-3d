import Ring from "./components/Ring"
import {  OrbitControls } from "@react-three/drei"
export default function Experience(){


return (
  <>
    <OrbitControls
      minPolarAngle={-Math.PI / 5} // Restrict vertical rotation
      maxPolarAngle={Math.PI / 2.5}
      minAzimuthAngle={-Math.PI / 6} // Restrict horizontal rotation
      maxAzimuthAngle={Math.PI / 2.5}
      minDistance={4}
      maxDistance={8}
    />
    <directionalLight position={[0, 3, 0]} intensity={5.5} />
   
    <Ring />
  </>
);




}