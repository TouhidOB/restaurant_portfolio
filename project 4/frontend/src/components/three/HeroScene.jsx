import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function MonolithArchitecturalStructure() {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Subtle breathing float and micro-rotation anchored on right side
    groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.12 - 0.15;
    groupRef.current.rotation.x = Math.cos(t * 0.12) * 0.03 + 0.04;
  });

  return (
    /* Shifted rightwards (x = 2.4) so text on left has unobstructed solid space */
    <group ref={groupRef} position={[2.4, -0.2, 0]} scale={0.92}>
      {/* Central Monolithic Column */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 5.2, 1.4]} />
        <meshStandardMaterial 
          color="#8E8B82" 
          roughness={0.9} 
          metalness={0.12} 
        />
      </mesh>

      {/* Horizontal Cantilevered Concrete Slab */}
      <mesh position={[-0.4, 1.2, 0.6]} castShadow receiveShadow>
        <boxGeometry args={[3.8, 0.6, 1.9]} />
        <meshStandardMaterial 
          color="#A8A59D" 
          roughness={0.85} 
          metalness={0.08} 
        />
      </mesh>

      {/* Lower Basalt Plinth */}
      <mesh position={[0.5, -1.8, 0.3]} castShadow receiveShadow>
        <boxGeometry args={[3.0, 1.2, 2.4]} />
        <meshStandardMaterial 
          color="#282926" 
          roughness={0.94} 
          metalness={0.2} 
        />
      </mesh>

      {/* Vertical Blackened Steel Blade */}
      <mesh position={[-1.3, -0.1, 0.8]} castShadow>
        <boxGeometry args={[0.08, 4.0, 1.5]} />
        <meshStandardMaterial 
          color="#1C1D1B" 
          roughness={0.35} 
          metalness={0.88} 
        />
      </mesh>

      {/* Strategic Signal Orange Glowing Core / Recessed Accent */}
      <mesh position={[0.1, 0.8, 0.72]}>
        <boxGeometry args={[0.45, 0.09, 0.85]} />
        <meshBasicMaterial color="#F05A28" />
      </mesh>

      {/* Secondary Concrete Blade */}
      <mesh position={[1.6, -0.6, -0.4]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 3.8, 1.1]} />
        <meshStandardMaterial 
          color="#75736C" 
          roughness={0.88} 
          metalness={0.1} 
        />
      </mesh>

      {/* Structural Wireframe Edges */}
      <lineSegments position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(2.21, 5.21, 1.41)]} />
        <lineBasicMaterial color="#2B2C2A" linewidth={1} />
      </lineSegments>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <Canvas
        shadows
        camera={{ position: [0.6, 0.4, 7.8], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['transparent']} />
        
        {/* Directional Key Lighting with Dramatic Shadows */}
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[7, 8, 5]}
          intensity={1.7}
          castShadow
          shadow-mapSize={[1024, 1024]}
          color="#FFF8EE"
        />
        <directionalLight
          position={[-6, -4, -3]}
          intensity={0.3}
          color="#6C7A87"
        />
        {/* Orange Ember Core Light */}
        <pointLight position={[2.5, 0.7, 1.0]} intensity={1.2} color="#F05A28" distance={4} />

        <MonolithArchitecturalStructure />
      </Canvas>
    </div>
  );
}
