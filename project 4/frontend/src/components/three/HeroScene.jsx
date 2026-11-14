import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

function MonolithArchitecturalStructure() {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Subtle breathing float and micro-rotation
    groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.12 - 0.2;
    groupRef.current.rotation.x = Math.cos(t * 0.12) * 0.04 + 0.05;
  });

  return (
    <group ref={groupRef} position={[1.2, -0.4, 0]} scale={0.95}>
      {/* Central Monolithic Column */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 5.2, 1.4]} />
        <meshStandardMaterial 
          color="#9C9990" 
          roughness={0.88} 
          metalness={0.12} 
        />
      </mesh>

      {/* Horizontal Cantilevered Concrete Slab */}
      <mesh position={[-0.8, 1.2, 0.6]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 0.6, 2.0]} />
        <meshStandardMaterial 
          color="#B8B5AD" 
          roughness={0.82} 
          metalness={0.08} 
        />
      </mesh>

      {/* Lower Basalt Plinth */}
      <mesh position={[0.6, -1.8, 0.3]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 1.2, 2.6]} />
        <meshStandardMaterial 
          color="#353632" 
          roughness={0.92} 
          metalness={0.18} 
        />
      </mesh>

      {/* Vertical Blackened Steel Blade */}
      <mesh position={[-1.6, -0.2, 0.8]} castShadow>
        <boxGeometry args={[0.08, 4.0, 1.6]} />
        <meshStandardMaterial 
          color="#20211F" 
          roughness={0.4} 
          metalness={0.85} 
        />
      </mesh>

      {/* Strategic Signal Orange Glowing Core / Recessed Accent */}
      <mesh position={[0.2, 0.8, 0.72]}>
        <boxGeometry args={[0.4, 0.08, 0.8]} />
        <meshBasicMaterial color="#F05A28" />
      </mesh>

      {/* Secondary Concrete Blade */}
      <mesh position={[1.8, -0.6, -0.4]} castShadow receiveShadow>
        <boxGeometry args={[1.0, 3.8, 1.2]} />
        <meshStandardMaterial 
          color="#85837B" 
          roughness={0.85} 
          metalness={0.1} 
        />
      </mesh>

      {/* Deep Shadow Reveal Frame */}
      <lineSegments position={[0, 0, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(2.21, 5.21, 1.41)]} />
        <lineBasicMaterial color="#353632" linewidth={1} />
      </lineSegments>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <Canvas
        shadows
        camera={{ position: [0, 0.5, 7.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['transparent']} />
        
        {/* Architectural Directional Lighting */}
        <ambientLight intensity={0.45} />
        <directionalLight
          position={[6, 8, 5]}
          intensity={1.8}
          castShadow
          shadow-mapSize={[1024, 1024]}
          color="#FFF8EE"
        />
        <directionalLight
          position={[-6, -4, -3]}
          intensity={0.4}
          color="#8BA0B2"
        />
        {/* Subtle Orange Glow from Below */}
        <pointLight position={[0.2, 0.6, 1.2]} intensity={0.8} color="#F05A28" distance={4} />

        <MonolithArchitecturalStructure />
      </Canvas>
    </div>
  );
}
