import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function TropicalPavilionStructure() {
  const groupRef = useRef();
  const foliageRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle camera parallax / structure breathing
      groupRef.current.rotation.y = Math.sin(t * 0.12) * 0.08 - 0.1;
      groupRef.current.rotation.x = Math.cos(t * 0.08) * 0.02 + 0.03;
    }
    if (foliageRef.current) {
      // Subtle organic sway representing ocean breeze
      foliageRef.current.children.forEach((child, i) => {
        child.rotation.z = Math.sin(t * 0.8 + i) * 0.06;
      });
    }
  });

  return (
    /* Anchored on right side (x = 2.4) so text on left has unobstructed contrast */
    <group ref={groupRef} position={[2.4, -0.3, 0]} scale={0.92}>
      {/* Limestone Plinth Foundation */}
      <mesh position={[0, -1.8, 0]} receiveShadow>
        <boxGeometry args={[5.2, 0.6, 4.2]} />
        <meshStandardMaterial color="#C8B99F" roughness={0.88} />
      </mesh>

      {/* Main Teak Timber Rafters & Columns */}
      <mesh position={[-1.8, 0.4, -1.2]} castShadow>
        <boxGeometry args={[0.25, 4.0, 0.25]} />
        <meshStandardMaterial color="#76533C" roughness={0.7} />
      </mesh>
      <mesh position={[1.8, 0.4, -1.2]} castShadow>
        <boxGeometry args={[0.25, 4.0, 0.25]} />
        <meshStandardMaterial color="#76533C" roughness={0.7} />
      </mesh>
      <mesh position={[-1.8, 0.4, 1.2]} castShadow>
        <boxGeometry args={[0.25, 4.0, 0.25]} />
        <meshStandardMaterial color="#76533C" roughness={0.7} />
      </mesh>
      <mesh position={[1.8, 0.4, 1.2]} castShadow>
        <boxGeometry args={[0.25, 4.0, 0.25]} />
        <meshStandardMaterial color="#76533C" roughness={0.7} />
      </mesh>

      {/* Overhanging Timber Roof Eaves (Sloped Tropical Modernist Canopy) */}
      <mesh position={[0, 2.5, 0]} rotation={[0, 0, -0.05]} castShadow>
        <boxGeometry args={[5.8, 0.35, 4.8]} />
        <meshStandardMaterial color="#5E3F2B" roughness={0.75} />
      </mesh>
      {/* Secondary Upper Louver Layer */}
      <mesh position={[0, 2.8, 0]} rotation={[0, 0, -0.05]}>
        <boxGeometry args={[4.4, 0.18, 3.8]} />
        <meshStandardMaterial color="#76533C" roughness={0.75} />
      </mesh>

      {/* Floor-to-Ceiling Fluted Glass Panels */}
      <mesh position={[0, 0.4, -1.18]}>
        <boxGeometry args={[3.2, 3.6, 0.08]} />
        <meshStandardMaterial color="#AAB9A0" transparent opacity={0.35} roughness={0.1} />
      </mesh>

      {/* Interior Warm Lantern / Dining Table */}
      <mesh position={[0, -1.0, 0]} castShadow>
        <boxGeometry args={[2.2, 0.15, 1.2]} />
        <meshStandardMaterial color="#8B6147" roughness={0.65} />
      </mesh>
      {/* Table Plinth */}
      <mesh position={[0, -1.35, 0]}>
        <boxGeometry args={[0.4, 0.6, 0.8]} />
        <meshStandardMaterial color="#C8B99F" roughness={0.9} />
      </mesh>
      {/* Warm Glow Lantern on Table */}
      <mesh position={[0, -0.75, 0]}>
        <cylinderGeometry args={[0.1, 0.14, 0.3, 16]} />
        <meshBasicMaterial color="#FFD18A" />
      </mesh>

      {/* Organic Botanical Foliage & Broad Leaves */}
      <group ref={foliageRef}>
        {/* Palm Frond Left */}
        <mesh position={[-2.4, -0.6, 1.4]} rotation={[0.4, 0.6, -0.3]}>
          <boxGeometry args={[1.6, 0.05, 0.6]} />
          <meshStandardMaterial color="#52745A" roughness={0.6} />
        </mesh>
        {/* Monstera Leaf Right Foreground */}
        <mesh position={[2.2, -0.8, 1.6]} rotation={[-0.3, -0.5, 0.4]}>
          <boxGeometry args={[1.4, 0.05, 0.7]} />
          <meshStandardMaterial color="#2E4E3F" roughness={0.5} />
        </mesh>
        {/* Tall Bamboo Stem Back */}
        <mesh position={[-2.2, 0.8, -1.8]}>
          <cylinderGeometry args={[0.06, 0.06, 4.2, 12]} />
          <meshStandardMaterial color="#71866A" roughness={0.6} />
        </mesh>
        <mesh position={[2.3, 0.6, -1.6]}>
          <cylinderGeometry args={[0.06, 0.06, 3.8, 12]} />
          <meshStandardMaterial color="#71866A" roughness={0.6} />
        </mesh>
        {/* Upper Hanging Greenery from Timber Eaves */}
        <mesh position={[-0.8, 2.2, 1.8]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[1.2, 0.05, 0.4]} />
          <meshStandardMaterial color="#71866A" roughness={0.6} />
        </mesh>
      </group>

      {/* Terracotta Decorative Jar */}
      <mesh position={[-1.6, -1.3, 1.6]} castShadow>
        <cylinderGeometry args={[0.25, 0.18, 0.6, 16]} />
        <meshStandardMaterial color="#BC7153" roughness={0.8} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <Canvas
        shadows
        camera={{ position: [0.6, 0.3, 7.8], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['transparent']} />

        {/* Tropical Afternoon Sun Key Light */}
        <ambientLight intensity={0.45} />
        <directionalLight
          position={[7, 9, 5]}
          intensity={1.8}
          castShadow
          shadow-mapSize={[1024, 1024]}
          color="#FFF2D6"
        />
        <directionalLight
          position={[-6, -3, -4]}
          intensity={0.3}
          color="#7FA892"
        />
        {/* Warm Candle/Lantern Point Light */}
        <pointLight position={[2.4, -0.6, 0]} intensity={1.5} color="#FFD18A" distance={4.5} />

        <TropicalPavilionStructure />
      </Canvas>
    </div>
  );
}
