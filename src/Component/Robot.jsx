import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function RobotModel(props) {
  const ref = useRef();
  const { scene } = useGLTF("/models/robot.glb"); // put robot.glb in public/models
  const [hovered, setHovered] = useState(false);
  const targetScale = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    if (!ref.current) return;

    // slow rotation
    ref.current.rotation.y += delta * 0.35;

    // smooth hover scale
    const scale = hovered ? 1.08 : 1.0;
    targetScale.current.set(scale, scale, scale);
    ref.current.scale.lerp(targetScale.current, 0.08);
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      dispose={null}
      castShadow
      receiveShadow
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
      {...props}
    />
  );
}

useGLTF.preload("/models/robot.glb");
