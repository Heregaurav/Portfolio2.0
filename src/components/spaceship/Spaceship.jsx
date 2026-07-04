import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Import the model directly (Bypasses all public folder routing issues entirely)
import spaceshipModelUrl from './spaceship.glb?url';

/* ─────────────────────────────────────────────
   ENGINE EXHAUST VFX
───────────────────────────────────────────── */
function EngineFire({ position, scale = 1, launching = false }) {
  const coreRef   = useRef();
  const midRef    = useRef();
  const outerRef  = useRef();
  const glowRef   = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const flicker  = 0.85 + Math.sin(t * 30 + Math.random() * 0.5) * 0.15;
    const breathe  = 0.9  + Math.sin(t * 3) * 0.1;
    const launchMult = launching ? 2.2 : 1;

    if (coreRef.current)  coreRef.current.scale.setScalar(flicker * scale * launchMult);
    if (midRef.current)   midRef.current.scale.setScalar(breathe * scale * launchMult * 0.95);
    if (outerRef.current) outerRef.current.scale.setScalar(breathe * scale * launchMult * 0.88);
    if (glowRef.current) {
      glowRef.current.material.opacity = (0.12 + Math.sin(t * 8) * 0.06) * (launching ? 1.4 : 1);
    }
  });

  return (
    <group position={position}>
      <mesh ref={coreRef}>
        <coneGeometry args={[0.05, 0.35, 10]} />
        <meshBasicMaterial color="#aaeeff" transparent opacity={1} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={midRef}>
        <coneGeometry args={[0.09, 0.55, 10]} />
        <meshBasicMaterial color="#0088ff" transparent opacity={0.7} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={outerRef}>
        <coneGeometry args={[0.16, 0.8, 10]} />
        <meshBasicMaterial color="#2200cc" transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={glowRef} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshBasicMaterial color="#0044ff" transparent opacity={0.14} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────
   RCS THRUSTER VFX
───────────────────────────────────────────── */
function RCSThruster({ position, rotation }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.opacity = 0.3 + Math.abs(Math.sin(clock.elapsedTime * 12)) * 0.4;
    }
  });
  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <coneGeometry args={[0.025, 0.12, 6]} />
      <meshBasicMaterial color="#88ccff" transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

/* ─────────────────────────────────────────────
   INTEGRATED BLENDER SPACESHIP COMPONENT
───────────────────────────────────────────── */
export default function Spaceship({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  launching = false,
  scale = 1,
}) {
  const shipRef = useRef();

  // Load the asset using Vite's directly resolved internal asset URL
  const { nodes, materials, scene } = useGLTF(spaceshipModelUrl);

  const motion = useMemo(() => ({
    baseY: position[1],
    driftPhase: Math.random() * Math.PI * 2,
    rollPhase:  Math.random() * Math.PI * 2,
  }), [position]);

  useFrame((state) => {
    if (!shipRef.current) return;
    const t = state.clock.elapsedTime;

    if (!launching) {
      shipRef.current.position.x = position[0] + Math.cos(t * 0.18 + motion.driftPhase) * 0.16;
      shipRef.current.position.y = motion.baseY + Math.sin(t * 0.22 + motion.driftPhase) * 0.12;
      shipRef.current.position.z = position[2] + Math.sin(t * 0.14 + motion.driftPhase) * 0.1;

      shipRef.current.rotation.x = rotation[0] + Math.sin(t * 0.18) * 0.012;
      shipRef.current.rotation.y = rotation[1] + Math.cos(t * 0.19) * 0.012;
      shipRef.current.rotation.z = Math.sin(t * 0.36 + motion.rollPhase) * 0.02;
    } else {
      const accel = Math.pow(Math.min(t * 0.4, 1), 2);
      shipRef.current.position.y = motion.baseY + accel * 8;
      shipRef.current.position.x = position[0] + Math.sin(t * 3) * 0.03 * (1 - accel);

      shipRef.current.rotation.x = rotation[0] - accel * 0.08;
      shipRef.current.rotation.y = rotation[1];
      shipRef.current.rotation.z = Math.sin(t * 4) * 0.01 * (1 - accel);
    }
  });

  return (
    <group ref={shipRef} position={position} rotation={rotation} scale={scale * 0.2}>
      
      {/* ── 1. BLENDER MESHES WITH AUTOMATIC FAILSAFE ── */}
      {nodes.ShipBodyMesh ? (
        <mesh 
          geometry={nodes.ShipBodyMesh.geometry} 
          material={materials.ShipMaterial || nodes.ShipBodyMesh.material} 
          castShadow 
          receiveShadow 
        />
      ) : (
        <primitive object={scene} />
      )}

      {/* ── 2. ORIGINAL VFX ATTACHED TO THE BLENDER MODEL ── */}
      <group position={[-0.11, -0.62, 0]}>
        <EngineFire position={[0, -0.19, 0]} scale={launching ? 2.4 : 1} launching={launching} />
      </group>

      <group position={[0.11, -0.62, 0]}>
        <EngineFire position={[0, -0.19, 0]} scale={launching ? 2.4 : 1} launching={launching} />
      </group>

      {/* ── nose/facing indicator ── */}
      <mesh position={[0, 0.1, -0.95]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.06, 0.25, 12]} />
        <meshStandardMaterial emissive='#56aaff' metalness={0.2} roughness={0.3} transparent opacity={0.95} />
      </mesh>

      <RCSThruster position={[0.2,  0.35,  0.18]} rotation={[0,  0.5, 1.57]} />
      <RCSThruster position={[-0.2, 0.35,  0.18]} rotation={[0, -0.5, -1.57]} />

      <pointLight position={[0, 0.8, 0.15]} color="#ddf6ff" intensity={1.8} distance={4} castShadow />
      <pointLight position={[0, -0.75, 0]} color="#0055ff" intensity={launching ? 5 : 1.5} distance={3} />

    </group>
  );
}

useGLTF.preload(spaceshipModelUrl);