import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// 3D Retro-Futuristic Diner Pavilion
function DinerPavilionModel() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      // Subtle organic hover / gentle atomic breathing
      groupRef.current.position.y = -0.5 + Math.sin(t * 0.8) * 0.04;
      groupRef.current.rotation.y = -0.28 + Math.sin(t * 0.4) * 0.03;
    }
  });

  return (
    // Anchored to the right side (x = 2.4) to guarantee zero obstruction with hero text
    <group ref={groupRef} position={[2.4, -0.5, -0.2]} scale={[1.1, 1.1, 1.1]}>
      {/* Foundation & Checkerboard Ground Plinth */}
      <mesh position={[0, -0.15, 0]} receiveShadow>
        <boxGeometry args={[7.2, 0.3, 5.2]} />
        <meshStandardMaterial
          color="#0B111D"
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>

      {/* Chrome Plinth Edging */}
      <mesh position={[0, -0.05, 2.62]}>
        <boxGeometry args={[7.25, 0.1, 0.06]} />
        <meshStandardMaterial color="#BFC6CC" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Main Diner Stainless Steel Structure */}
      <mesh position={[0, 1.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[6.2, 2.6, 4.2]} />
        <meshStandardMaterial
          color="#182338"
          roughness={0.3}
          metalness={0.85}
        />
      </mesh>

      {/* Aerodynamic Curved Eaves / Streamline Modern Roof */}
      <mesh position={[0, 2.65, 0]} castShadow>
        <boxGeometry args={[6.8, 0.35, 4.8]} />
        <meshStandardMaterial
          color="#BFC6CC"
          metalness={0.95}
          roughness={0.12}
        />
      </mesh>

      {/* Top Secondary Dome / Atomic Roof Crest */}
      <mesh position={[0, 2.9, 0]}>
        <boxGeometry args={[5.2, 0.25, 3.4]} />
        <meshStandardMaterial color="#D83A45" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Illuminated Roof Neon Sign Bar */}
      <mesh position={[0, 3.3, 1.8]}>
        <boxGeometry args={[3.8, 0.55, 0.08]} />
        <meshStandardMaterial
          color="#111A2B"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Neon Sign Lettering Bar (Glowing Red & Cyan) */}
      <mesh position={[0, 3.3, 1.86]}>
        <boxGeometry args={[3.5, 0.25, 0.04]} />
        <meshBasicMaterial color="#43D9E8" />
      </mesh>

      {/* Neon Red Accent Strip Under Roof Eaves */}
      <mesh position={[0, 2.45, 2.42]}>
        <boxGeometry args={[6.7, 0.06, 0.06]} />
        <meshBasicMaterial color="#D83A45" />
      </mesh>

      {/* Floor-to-Ceiling Front Glass Windows */}
      <mesh position={[0, 1.25, 2.12]}>
        <planeGeometry args={[5.8, 2.1]} />
        <meshPhysicalMaterial
          color="#43D9E8"
          transparent
          opacity={0.32}
          roughness={0.05}
          metalness={0.2}
          transmission={0.85}
          ior={1.5}
        />
      </mesh>

      {/* Chrome Vertical Window Mullions */}
      {[-2.0, -1.0, 0, 1.0, 2.0].map((xPos) => (
        <mesh key={xPos} position={[xPos, 1.25, 2.13]}>
          <boxGeometry args={[0.06, 2.15, 0.06]} />
          <meshStandardMaterial color="#BFC6CC" metalness={0.95} roughness={0.1} />
        </mesh>
      ))}

      {/* Interior Warm Diner Counter Glow */}
      <mesh position={[0, 0.8, 0.8]}>
        <boxGeometry args={[4.5, 0.85, 0.8]} />
        <meshStandardMaterial color="#BFC6CC" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Red Vinyl Stools along Counter */}
      {[-1.6, -0.8, 0, 0.8, 1.6].map((xPos) => (
        <group key={xPos} position={[xPos, 0.55, 1.5]}>
          {/* Chrome Stool Pole */}
          <mesh position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.6, 12]} />
            <meshStandardMaterial color="#BFC6CC" metalness={0.95} roughness={0.1} />
          </mesh>
          {/* Red Stool Cushion */}
          <mesh position={[0, 0.18, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.12, 16]} />
            <meshStandardMaterial color="#D83A45" roughness={0.35} />
          </mesh>
        </group>
      ))}

      {/* Warm Interior Lighting Point */}
      <pointLight position={[0, 2.1, 0.5]} intensity={2.4} distance={6} color="#F2C94C" />
      {/* Cyan Exterior Neon Point Light */}
      <pointLight position={[0, 3.4, 2.5]} intensity={3.5} distance={7} color="#43D9E8" />
      {/* Red Sign Neon Glow */}
      <pointLight position={[0, 2.4, 2.8]} intensity={2.0} distance={5} color="#D83A45" />

      {/* Floating Retro-Futuristic Orbit Rings */}
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.5}>
        <mesh position={[-2.8, 3.6, 0]} rotation={[0.4, 0.2, 0.6]}>
          <torusGeometry args={[0.7, 0.03, 16, 64]} />
          <meshBasicMaterial color="#43D9E8" />
        </mesh>
        <mesh position={[-2.8, 3.6, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#D83A45" metalness={0.5} roughness={0.2} />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.8, 7.8], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      {/* Atmospheric Lighting */}
      <ambientLight intensity={0.65} color="#182338" />
      
      {/* Key Directional Neon Lamp */}
      <directionalLight position={[6, 8, 5]} intensity={1.8} color="#43D9E8" />
      <directionalLight position={[-4, 4, 3]} intensity={0.9} color="#D83A45" />
      
      {/* 3D Model Group */}
      <DinerPavilionModel />

      {/* Controlled Parallax */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2 - 0.05}
        minPolarAngle={Math.PI / 2.8}
        maxAzimuthAngle={0.25}
        minAzimuthAngle={-0.25}
        rotateSpeed={0.35}
      />
    </Canvas>
  );
}
