import { useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import { DirectionalLight, Mesh, TextureLoader } from "three";
import mainColor from "../../../public/images/lava/Lava_006_basecolor.jpg";
import mainImage from "../../../public/images/lava/Lava_006_basecolor.jpg";
import { useTexture } from "@react-three/drei";
interface model {
  color: string;
  position: [number, number, number];
}

const Cube = ({ color, position }: model) => {
  const [hovered, setHovered] = useState(false);
  const modelRef = useRef<Mesh>(null);
  const directionalLightRef = useRef<DirectionalLight | null>(null);

  const { map, height, ao, emissive, roughness, normal } = useTexture({
    map: "/images/lava/mainColor.jpeg",
    height: "/images/lava/height.png",
    normal: "/images/lava/normal.jpg",
    ao: "/images/lava/ao.jpg",
    roughness: "/images/lava/roughness.jpg",
    emissive: "/images/lava/emissive.jpg",
  });

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta;
      // modelRef.current.rotation.x += delta;
    }
  });

  return (
    <>
      {/* <directionalLight
        intensity={5}
        position={[0, 0, 2]}
        ref={directionalLightRef}
      /> */}
      <mesh
        position={position}
        ref={modelRef}
        onPointerEnter={(e) => setHovered(true)}
        onPointerLeave={(e) => setHovered(false)}
      >
        <sphereGeometry args={[2]} />
        <meshStandardMaterial
          color={color}
          map={map}
          displacementMap={height}
          displacementScale={1}
          normalMap={normal}
          aoMap={ao}
          aoMapIntensity={0}
          roughnessMap={roughness}
          roughness={0.6}
          emissiveMap={emissive}
          emissive={0x0000ff}
        />
      </mesh>
    </>
  );
};

export default Cube;
