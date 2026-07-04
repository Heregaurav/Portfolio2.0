import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';

// Import the model using Vite's direct internal URL resolution matching your spaceship configuration
import astronautModelUrl from './astronaut.glb?url';

export default function Avatar({ 
  modelUrl,
  /* 💡 ADJUSTED: Changed X from -1.8 to -3.5 to push the astronaut further to the left */
  position = [-3.5, -0.65, 1.5], 
  scale = 1.4, 
  phase = 'idle', 
  currentAnimation = "" 
}) {
  const groupRef = useRef();
  
  // 1. Load the scene graph AND the embedded keyframe animations array from the GLB file
  const { scene, animations } = useGLTF(modelUrl || astronautModelUrl);

  // 2. Feed the animations array and the root group reference into Drei's animation mixer controller
  const { actions, names } = useAnimations(animations, groupRef);

  // Setup targets for programmatic lerping fallback (used if GLB has no skeleton animations)
  const fallbackTargets = useRef({ posX: position[0], posY: position[1], posZ: position[2], rotX: 0, rotY: -0.2, rotZ: 0 });

  /* ─────────────────────────────────────────────────────────────
     GSAP CINEMATIC BOARDING TRANSITION
  ───────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!groupRef.current) return;

    if (phase === 'boarding') {
      // Safely kill ambient floating routines before starting the path tween
      gsap.killTweensOf(groupRef.current.position);
      gsap.killTweensOf(groupRef.current.rotation);

      const tl = gsap.timeline();

      // Kinematically glide the avatar up, right, and inward to pass straight into the hull hatch
      tl.to(groupRef.current.position, {
        x: 0.6,          // Matches your Spaceship X coordinate
        y: 0.8,          // Raises up toward the crew door portal entry
        z: 0.0,          // Recedes backward along Z to clear the ship's bulkhead
        duration: 2.2,
        ease: 'power2.inOut',
      });

      // Shrink scale completely at the final stage of arrival to imply disappearing inside
      tl.to(groupRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.3,
        ease: 'power1.in'
      }, "-=0.3");

      // Rotate the model smoothly to face forward into the cabin as they ascend
      gsap.to(groupRef.current.rotation, {
        x: 0,
        y: Math.PI,    // 180-degree spin
        z: 0,
        duration: 1.8,
        ease: 'power2.out'
      });
    } else if (phase === 'idle') {
      // Re-establish setup parameters if resetting the game loop back to standby
      groupRef.current.position.set(...position);
      groupRef.current.scale.setScalar(scale);
      groupRef.current.rotation.set(0, -0.2, 0);
      
      fallbackTargets.current.posX = position[0];
      fallbackTargets.current.posY = position[1];
      fallbackTargets.current.posZ = position[2];
    }
  }, [phase, position, scale]);

  /* ─────────────────────────────────────────────────────────────
     SKELETON BONE ANIMATION HANDLING (If model contains animations)
  ───────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (names && names.length > 0) {
      const animationToPlay = names.includes(currentAnimation) ? currentAnimation : names[0];
      const action = actions[animationToPlay];
      if (action) {
        action.reset().fadeIn(0.5).play();
        return () => action.fadeOut(0.5);
      }
    }
  }, [actions, names, currentAnimation]);

  /* ─────────────────────────────────────────────────────────────
     PROGRAMMATIC FALLBACK CODE (If model has NO embedded animations)
  ───────────────────────────────────────────────────────────── */
  useFrame((state) => {
    // Escape processing completely if rigged tracking is operational or boarding begins
    if ((names && names.length > 0) || phase === 'boarding' || phase === 'launch') return;
    if (!groupRef.current) return;
    
    const t = state.clock.getElapsedTime();
    const alpha = 0.06; // Lerp smoothing factor

    // Create a weightless space-drift timeline calculation
    fallbackTargets.current.posY = position[1] + Math.sin(t * 0.55) * 0.12;
    fallbackTargets.current.rotZ = Math.sin(t * 0.3) * 0.05;
    fallbackTargets.current.rotY = -0.2 + Math.sin(t * 0.18) * 0.08;
    fallbackTargets.current.rotX = Math.sin(t * 0.2) * 0.03;

    // Apply smooth linear interpolations
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, fallbackTargets.current.posY, alpha);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, fallbackTargets.current.rotX, alpha);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, fallbackTargets.current.rotY, alpha);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, fallbackTargets.current.rotZ, alpha);
  });

  // Automatically parse nodes on render to hook up light matrices/shadows safely
  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.roughness = Math.max(child.material.roughness, 0.4);
        }
      }
    });
  }, [scene]);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {scene ? <primitive object={scene} /> : null}
    </group>
  );
}

// Pre-cache the model asset dynamically via your explicit local address path mapping
useGLTF.preload(astronautModelUrl);