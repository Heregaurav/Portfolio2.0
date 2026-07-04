import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function StarField({ count = 8000, warpSpeed = 0 }) {
  const meshRef = useRef();
  const trailRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const starColors = [
      [0.7, 0.8, 1.0],   // cool white-blue
      [1.0, 0.9, 0.7],   // warm yellow
      [0.6, 0.7, 1.0],   // blue
      [1.0, 0.7, 0.7],   // red dwarf
      [0.5, 1.0, 0.9],   // cyan
    ];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 50 + Math.random() * 950;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const c = starColors[Math.floor(Math.random() * starColors.length)];
      const brightness = 0.5 + Math.random() * 0.5;
      col[i * 3] = c[0] * brightness;
      col[i * 3 + 1] = c[1] * brightness;
      col[i * 3 + 2] = c[2] * brightness;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.003 * (1 + warpSpeed * 2);
      meshRef.current.rotation.x += delta * 0.0006;

      if (warpSpeed > 0) {
        meshRef.current.material.size = 0.65 + warpSpeed * 1.4;
      } else {
        meshRef.current.material.size = 0.45;
      }
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.8}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
