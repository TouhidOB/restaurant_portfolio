import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Procedural 3D Riverine Bengal & Terracotta Courtyard Architecture
function BengaliCourtyardArchitecture() {
  const groupRef = useRef();
  const lanternLightRef = useRef();
  const waterRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.03;
      groupRef.current.position.y = Math.sin(t * 0.2) * 0.02;
    }
    if (lanternLightRef.current) {
      lanternLightRef.current.intensity = 2.4 + Math.sin(t * 6.0) * 0.35 + Math.cos(t * 10.0) * 0.15;
    }
    if (waterRef.current) {
      waterRef.current.position.z = Math.sin(t * 0.4) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* 1. Reflective Riverine Water Basin Foreground */}
      <mesh ref={waterRef} position={[0, -0.85, 2.8]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 6]} />
        <meshStandardMaterial
          color="#1D2A3A"
          roughness={0.25}
          metalness={0.7}
        />
      </mesh>

      {/* Traditional Wooden Boat / Dinghi Silhouette on River */}
      <group position={[-3.6, -0.7, 3.2]} rotation={[0, 0.4, 0]}>
        <mesh>
          <cylinderGeometry args={[0.25, 0.45, 2.4, 16]} />
          <meshStandardMaterial color="#2E1C14" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[0.35, 0.4, 0.8]} />
          <meshStandardMaterial color="#8C6F56" roughness={0.9} />
        </mesh>
      </group>

      {/* 2. Terracotta Courtyard Stone Foundation Plinth */}
      <mesh position={[0, -0.6, -0.8]} receiveShadow>
        <boxGeometry args={[10.5, 0.4, 6.5]} />
        <meshStandardMaterial color="#A6533B" roughness={0.85} metalness={0.05} />
      </mesh>

      {/* 3. Main Terracotta Brick Masonry Facade */}
      <mesh position={[0, 1.8, -1.8]} receiveShadow castShadow>
        <boxGeometry args={[9.8, 4.4, 0.6]} />
        <meshStandardMaterial color="#A6533B" roughness={0.9} metalness={0.05} />
      </mesh>

      {/* Decorative Terracotta Relief Frieze across header */}
      <mesh position={[0, 3.8, -1.45]} castShadow>
        <boxGeometry args={[10.0, 0.35, 0.2]} />
        <meshStandardMaterial color="#B18A54" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Curved Bengal 'Dochala' / Arch Roof Cornice */}
      <mesh position={[0, 4.15, -1.75]}>
        <boxGeometry args={[10.4, 0.25, 1.2]} />
        <meshStandardMaterial color="#26344A" roughness={0.6} />
      </mesh>

      {/* 4. Carved Teakwood Entrance Portal */}
      <group position={[0, 0.8, -1.45]}>
        {/* Arch Frame */}
        <mesh>
          <boxGeometry args={[2.4, 3.0, 0.2]} />
          <meshStandardMaterial color="#242321" roughness={0.5} metalness={0.7} />
        </mesh>
        {/* Warm Golden Glow Emanating from Interior Courtyard */}
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[1.9, 2.7]} />
          <meshStandardMaterial
            color="#FFD494"
            emissive="#E7A75B"
            emissiveIntensity={1.2}
            roughness={0.2}
          />
        </mesh>
        {/* Carved Floral Brass Mandala Rosette on Door Header */}
        <mesh position={[0, 1.2, 0.16]}>
          <cylinderGeometry args={[0.25, 0.25, 0.04, 24]} />
          <meshStandardMaterial color="#B18A54" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Brass Door Pull Rings */}
        {[-0.35, 0.35].map((x, bi) => (
          <mesh key={`ring-${bi}`} position={[x, 0, 0.16]}>
            <torusGeometry args={[0.07, 0.02, 12, 24]} />
            <meshStandardMaterial color="#B18A54" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
        {/* Interior Point Light */}
        <pointLight ref={lanternLightRef} position={[0, 0.6, 0.8]} color="#FF9A3C" distance={6} intensity={2.6} />
      </group>

      {/* 5. Traditional Carved Wooden Windows with Latticework */}
      {[-3.2, 3.2].map((wx, wi) => (
        <group key={`win-${wi}`} position={[wx, 1.6, -1.45]}>
          <mesh>
            <boxGeometry args={[1.8, 2.2, 0.15]} />
            <meshStandardMaterial color="#2A1E17" roughness={0.7} />
          </mesh>
          {/* Latticed Window Glow */}
          <mesh position={[0, 0, 0.04]}>
            <planeGeometry args={[1.5, 1.9]} />
            <meshStandardMaterial
              color="#FFE5B4"
              emissive="#B18A54"
              emissiveIntensity={0.85}
              roughness={0.3}
            />
          </mesh>
          {/* Brass Lintel Highlight */}
          <mesh position={[0, 1.15, 0.08]}>
            <boxGeometry args={[1.9, 0.08, 0.08]} />
            <meshStandardMaterial color="#B18A54" metalness={0.85} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* 6. Bell-Metal Hanging Brass Lanterns */}
      {[-1.6, 1.6].map((lx, li) => (
        <group key={`lantern-${li}`} position={[lx, 2.6, -1.0]}>
          {/* Chain */}
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.8, 8]} />
            <meshStandardMaterial color="#B18A54" metalness={0.9} />
          </mesh>
          {/* Lantern Body */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.16, 0.12, 0.35, 8]} />
            <meshStandardMaterial
              color="#FFE1A8"
              emissive="#E7A75B"
              emissiveIntensity={1.8}
            />
          </mesh>
          <pointLight position={[0, 0, 0]} color="#FFB85A" intensity={1.2} distance={3.5} />
        </group>
      ))}

      {/* 7. Distant Riverbank Palm & Banyan Silhouettes in Twilight */}
      <group position={[0, -1.5, -9.0]}>
        {[-8, -5, -2, 2, 5, 8].map((tx, ti) => {
          const height = 4.0 + Math.sin(ti * 2.0) * 1.5;
          return (
            <mesh key={`tree-${ti}`} position={[tx, height / 2, 0]}>
              <cylinderGeometry args={[0.3, 0.8, height, 8]} />
              <meshStandardMaterial color="#192433" roughness={0.9} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

// Atmospheric River Mist & Floating Firefly Particles
function RiverMistAtmosphere() {
  const particlesRef = useRef();
  const particleCount = 75;

  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 16;
      pos[i + 1] = Math.random() * 6 - 1;
      pos[i + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, [particleCount]);

  useFrame((state) => {
    if (particlesRef.current) {
      const t = state.clock.getElapsedTime();
      particlesRef.current.rotation.y = t * 0.015;
      particlesRef.current.position.y = Math.sin(t * 0.2) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        color="#F4EBDD"
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 2.2, 8.2], fov: 44 }}
      style={{
        width: '100%',
        height: '100%',
        background: 'radial-gradient(ellipse at 50% 35%, #2E3E56 0%, #192433 60%, #101620 100%)',
      }}
      shadows
    >
      <ambientLight intensity={0.6} color="#F4EBDD" />
      <directionalLight
        position={[6, 8, 6]}
        intensity={1.6}
        color="#E5B98A"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-6, 4, -4]} intensity={0.7} color="#AEBCC0" />

      <Float speed={1.1} rotationIntensity={0.06} floatIntensity={0.1}>
        <BengaliCourtyardArchitecture />
      </Float>

      <RiverMistAtmosphere />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2 - 0.08}
        minPolarAngle={Math.PI / 3}
        maxAzimuthAngle={Math.PI / 10}
        minAzimuthAngle={-Math.PI / 10}
      />
    </Canvas>
  );
}
