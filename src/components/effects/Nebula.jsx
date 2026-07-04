import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function NebulaCloud({ position, color, size, opacity }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.0003;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.BackSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function Nebula() {
  const clouds = useMemo(() => [
    { position: [-80, 30, -200], color: '#1a0a3d', size: 120, opacity: 0.15 },
    { position: [100, -20, -300], color: '#0a1a3d', size: 150, opacity: 0.12 },
    { position: [-60, -60, -250], color: '#1a0a2d', size: 100, opacity: 0.18 },
    { position: [50, 80, -180], color: '#001a2d', size: 90, opacity: 0.14 },
    { position: [0, 0, -400], color: '#0d0a2a', size: 200, opacity: 0.08 },
  ], []);

  return (
    <group>
      {clouds.map((cloud, i) => (
        <NebulaCloud key={i} {...cloud} />
      ))}
    </group>
  );
}
