import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Olive Tree in Terracotta Urn
function OliveTree({ position = [0, 0, 0], scale = 1 }) {
  const foliageRef = useRef();

  useFrame((state) => {
    if (foliageRef.current) {
      foliageRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
      foliageRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.02;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Terracotta Urn */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.28, 1.2, 24]} />
        <meshStandardMaterial color="#B96F4F" roughness={0.82} metalness={0.05} />
      </mesh>
      {/* Urn Rim */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <torusGeometry args={[0.44, 0.06, 16, 24]} />
        <meshStandardMaterial color="#A86143" roughness={0.85} />
      </mesh>

      {/* Gnarled Olive Trunk */}
      <mesh position={[0, 1.7, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.14, 1.1, 12]} />
        <meshStandardMaterial color="#5C4D3C" roughness={0.92} />
      </mesh>
      <mesh position={[0.1, 2.2, 0]} rotation={[0, 0, 0.2]} castShadow>
        <cylinderGeometry args={[0.07, 0.1, 0.8, 10]} />
        <meshStandardMaterial color="#5C4D3C" roughness={0.92} />
      </mesh>

      {/* Olive Foliage Clusters */}
      <group ref={foliageRef} position={[0, 2.7, 0]}>
        <mesh position={[0, 0.2, 0]} castShadow>
          <sphereGeometry args={[0.65, 16, 16]} />
          <meshStandardMaterial color="#596448" roughness={0.88} />
        </mesh>
        <mesh position={[0.35, 0.45, 0.2]} scale={[0.8, 0.8, 0.8]} castShadow>
          <sphereGeometry args={[0.55, 14, 14]} />
          <meshStandardMaterial color="#6B7957" roughness={0.85} />
        </mesh>
        <mesh position={[-0.3, 0.4, -0.15]} scale={[0.75, 0.75, 0.75]} castShadow>
          <sphereGeometry args={[0.5, 14, 14]} />
          <meshStandardMaterial color="#4D583F" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

// Classical Limestone Arch Structure
function LimestoneArch({ position = [0, 0, 0], scale = [1, 1, 1] }) {
  return (
    <group position={position} scale={scale}>
      {/* Left Column */}
      <mesh position={[-1.6, 2.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.42, 4.4, 0.42]} />
        <meshStandardMaterial color="#E9DFCF" roughness={0.78} metalness={0.06} />
      </mesh>
      {/* Column Base */}
      <mesh position={[-1.6, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.58, 0.3, 0.58]} />
        <meshStandardMaterial color="#DECDB8" roughness={0.8} />
      </mesh>
      {/* Column Capital */}
      <mesh position={[-1.6, 4.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.54, 0.25, 0.54]} />
        <meshStandardMaterial color="#DECDB8" roughness={0.8} />
      </mesh>

      {/* Right Column */}
      <mesh position={[1.6, 2.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.42, 4.4, 0.42]} />
        <meshStandardMaterial color="#E9DFCF" roughness={0.78} metalness={0.06} />
      </mesh>
      {/* Base */}
      <mesh position={[1.6, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.58, 0.3, 0.58]} />
        <meshStandardMaterial color="#DECDB8" roughness={0.8} />
      </mesh>
      {/* Capital */}
      <mesh position={[1.6, 4.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.54, 0.25, 0.54]} />
        <meshStandardMaterial color="#DECDB8" roughness={0.8} />
      </mesh>

      {/* Curved Arch Vault */}
      <mesh position={[0, 4.5, 0]} rotation={[0, 0, 0]} castShadow>
        <torusGeometry args={[1.6, 0.22, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#E9DFCF" roughness={0.75} />
      </mesh>

      {/* Arch Keystone */}
      <mesh position={[0, 6.15, 0.05]} castShadow>
        <boxGeometry args={[0.38, 0.45, 0.35]} />
        <meshStandardMaterial color="#DECDB8" roughness={0.72} />
      </mesh>

      {/* Top Cornice Beam */}
      <mesh position={[0, 6.25, 0]} castShadow>
        <boxGeometry args={[4.2, 0.24, 0.5]} />
        <meshStandardMaterial color="#DECDB8" roughness={0.74} />
      </mesh>
    </group>
  );
}

// Ocean Horizon & Terracotta Floor
function ArchitecturalEnvironment() {
  const seaRef = useRef();

  useFrame((state) => {
    if (seaRef.current) {
      seaRef.current.position.y = -0.6 + Math.sin(state.clock.elapsedTime * 0.7) * 0.04;
    }
  });

  return (
    <group>
      {/* Terracotta Floor Terrace */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[16, 0.2, 12]} />
        <meshStandardMaterial color="#C57E61" roughness={0.75} metalness={0.04} />
      </mesh>

      {/* Stone Border Balustrade */}
      <mesh position={[0, 0.45, -4.5]} receiveShadow castShadow>
        <boxGeometry args={[15, 0.8, 0.35]} />
        <meshStandardMaterial color="#E9DFCF" roughness={0.8} />
      </mesh>

      {/* Mediterranean Sea Plane */}
      <mesh ref={seaRef} position={[0, -0.6, -16]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[80, 50]} />
        <meshStandardMaterial
          color="#1D4E6B"
          roughness={0.25}
          metalness={0.65}
        />
      </mesh>
    </group>
  );
}

// Floating Coastal Light Dust Particles
function CoastalParticles({ count = 65 }) {
  const points = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 16;
      coords[i * 3 + 1] = Math.random() * 7;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return coords;
  }, [count]);

  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#FDE8CD"
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

export default function RivieraHeroScene() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
      <Canvas
        shadows
        camera={{ position: [0, 2.2, 6.2], fov: 44 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Warm Golden Hour Lighting */}
        <ambientLight intensity={0.7} color="#FFF4E6" />
        <directionalLight
          position={[7, 9, 5]}
          intensity={1.8}
          color="#FFD6A5"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.0001}
        />
        <directionalLight position={[-6, 4, -4]} intensity={0.5} color="#89B4C8" />

        {/* Villa Architecture Elements */}
        <LimestoneArch position={[0, 0, -1.8]} scale={[1, 1, 1]} />
        <LimestoneArch position={[-3.8, 0, -2.4]} scale={[0.85, 0.85, 0.85]} />
        <LimestoneArch position={[3.8, 0, -2.4]} scale={[0.85, 0.85, 0.85]} />

        {/* Potted Olive Trees Framing the Portal */}
        <OliveTree position={[-2.4, 0, 0.6]} scale={0.9} />
        <OliveTree position={[2.4, 0, 0.6]} scale={0.9} />
        <OliveTree position={[-4.5, 0, 1.2]} scale={0.75} />
        <OliveTree position={[4.5, 0, 1.2]} scale={0.75} />

        {/* Terrace Floor & Horizon */}
        <ArchitecturalEnvironment />

        {/* Coastal Light Dust */}
        <CoastalParticles count={60} />

        {/* Smooth OrbitControls with constrained angle */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minPolarAngle={Math.PI / 3}
          maxAzimuthAngle={Math.PI / 6}
          minAzimuthAngle={-Math.PI / 6}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
