import {
  Environment,
  EnvironmentCube,
  OrbitControls,
  PerspectiveCamera,
  PointerLockControls,
  Stats,
  useCubeTexture,
  useEnvironment,
  useGLTF,
  useHelper,
} from "@react-three/drei";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { Mesh, PerspectiveCamera as camera } from "three";
import Cube from "./Cube";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const EnviromentMap = () => {
  const { viewport, gl, camera } = useThree();
  // useEffect(() => {
  //   window.addEventListener("resize", () => {
  //     gl.setSize(window.innerWidth, window.innerHeight);
  //     camera.aspect = window.innerWidth / window.innerHeight;
  //     camera.updateProjectionMatrix();
  //     gl.setPixelRatio(Math.min(window.devicePixelRatio, 5));
  //   });

  //   return () => {
  //     window.removeEventListener;
  //   };
  // }, []);

  const envMap = useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
    { path: "/images/Standard-Cube-Map/" }
  );

  return <Environment background map={envMap} />;
};

const Model3d = () => {
  const modelRef = useRef<Mesh>(null);
  const cameraRef = useRef<camera>(null);
  const { scene } = useGLTF("/eye_textured/scene.gltf");

  const envMap = useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
    { path: "/images/Standard-Cube-Map/" }
  );
  useEffect(() => {
    if (cameraRef.current && modelRef.current) {
      cameraRef.current.lookAt(modelRef.current.position);
    }
  }, [cameraRef, modelRef]);

  return (
    <div className="h-screen m-1 bg-black">
      <Canvas camera={{ position: [0, 2, 5] }}>
        {/* <ambientLight intensity={0.1} /> */}
        <OrbitControls />
        <Cube color="red" position={[0, 0, 0]} />
        {/* <Cube color="green" position={[0, 0, 0]} />
        <Cube color="yellow" position={[3, 0, 0]} /> */}
        <primitive object={scene} position={[-5, 0, 0]} rotation={[0, 0, 0]} />
        <Stats />
        <Environment background map={envMap} />
      </Canvas>
    </div>
  );
};

export default Model3d;
