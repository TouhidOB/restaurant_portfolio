import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Steam Particles rising from the street food counter
function RisingSteamParticles({ count = 40, position = [0, 1.2, 0] }) {
  const points = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 1.6;
      coords[i * 3 + 1] = Math.random() * 2.2;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
    }
    return coords;
  }, [count]);

  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      const positions = ref.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        // move upward
        positions[i * 3 + 1] += 0.015;
        // slight drift
        positions[i * 3] += Math.sin(state.clock.elapsedTime + i) * 0.003;
        if (positions[i * 3 + 1] > 2.8) {
          positions[i * 3 + 1] = 0;
        }
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={position}>
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
          size={0.18}
          color="#FFE9D6"
          transparent
          opacity={0.35}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// Glowing Neon Sign Mesh
function NeonSignboard({ position = [0, 4.5, -2], text = "SEOUL STREET" }) {
  const signRef = useRef();

  useFrame((state) => {
    if (signRef.current) {
      // Subtle organic neon tube hum/flicker
      const flicker = 0.95 + Math.sin(state.clock.elapsedTime * 8) * 0.05;
      signRef.current.material.emissiveIntensity = flicker * 1.8;
    }
  });

  return (
    <group position={position}>
      {/* Backplate */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[4.8, 1.1, 0.15]} />
        <meshStandardMaterial color="#1B1D22" roughness={0.8} />
      </mesh>
      {/* Outer Neon Border */}
      <mesh ref={signRef} position={[0, 0, 0.1]}>
        <boxGeometry args={[4.6, 0.9, 0.05]} />
        <meshStandardMaterial
          color="#FF2E88"
          emissive="#FF2E88"
          emissiveIntensity={1.8}
          roughness={0.2}
        />
      </mesh>
      {/* Secondary Cyan Sub-sign */}
      <mesh position={[0, -0.9, 0.05]}>
        <boxGeometry args={[2.8, 0.45, 0.08]} />
        <meshStandardMaterial
          color="#21D4E8"
          emissive="#21D4E8"
          emissiveIntensity={1.5}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

// Street Food Storefront & Pocha Awning
function SeoulStorefront() {
  return (
    <group position={[0, 0, -3]}>
      {/* Main Concrete Building Facade */}
      <mesh position={[0, 3.5, -0.5]} receiveShadow>
        <boxGeometry args={[16, 7, 1]} />
        <meshStandardMaterial color="#22252C" roughness={0.9} />
      </mesh>

      {/* Warm Glowing Storefront Windows */}
      <mesh position={[-2.4, 2.0, 0.05]}>
        <boxGeometry args={[3.4, 2.4, 0.1]} />
        <meshStandardMaterial
          color="#FFB347"
          emissive="#FFB347"
          emissiveIntensity={0.65}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[2.4, 2.0, 0.05]}>
        <boxGeometry args={[3.4, 2.4, 0.1]} />
        <meshStandardMaterial
          color="#FFB347"
          emissive="#FFB347"
          emissiveIntensity={0.65}
          roughness={0.3}
        />
      </mesh>

      {/* Red & White Pocha Awning Canopy */}
      <mesh position={[0, 3.3, 0.8]} rotation={[0.35, 0, 0]} castShadow>
        <boxGeometry args={[8.8, 0.1, 1.8]} />
        <meshStandardMaterial color="#FF2E88" roughness={0.7} />
      </mesh>

      {/* Street Food Counter Bar */}
      <mesh position={[0, 0.65, 0.7]} receiveShadow castShadow>
        <boxGeometry args={[6.5, 1.3, 1.2]} />
        <meshStandardMaterial color="#2E333D" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Large Sizzling Cauldrons / Woks */}
      <mesh position={[-1.4, 1.35, 0.7]} castShadow>
        <cylinderGeometry args={[0.55, 0.45, 0.35, 20]} />
        <meshStandardMaterial color="#1A1C20" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.35, 0.7]} castShadow>
        <cylinderGeometry args={[0.65, 0.5, 0.35, 20]} />
        <meshStandardMaterial color="#C83E2D" roughness={0.5} />
      </mesh>
      <mesh position={[1.4, 1.35, 0.7]} castShadow>
        <cylinderGeometry args={[0.55, 0.45, 0.35, 20]} />
        <meshStandardMaterial color="#1A1C20" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Steaming Tteokbokki Pot */}
      <RisingSteamParticles count={35} position={[-1.4, 1.5, 0.7]} />
      <RisingSteamParticles count={45} position={[0, 1.5, 0.7]} />
      <RisingSteamParticles count={35} position={[1.4, 1.5, 0.7]} />
    </group>
  );
}

// Wet Asphalt Street Ground with Specular Neon Reflections
function WetAsphaltPavement() {
  return (
    <group>
      {/* Wet Road Plane */}
      <mesh position={[0, -0.05, 1]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial
          color="#111316"
          roughness={0.18}
          metalness={0.75}
        />
      </mesh>

      {/* Sidewalk Curb */}
      <mesh position={[0, 0.08, -1.8]} receiveShadow>
        <boxGeometry args={[26, 0.16, 1.8]} />
        <meshStandardMaterial color="#4A4E57" roughness={0.85} />
      </mesh>
    </group>
  );
}

// Urban Neon Light Dust / Night Mist
function UrbanNeonDust({ count = 50 }) {
  const points = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 16;
      coords[i * 3 + 1] = Math.random() * 6;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return coords;
  }, [count]);

  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
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
        color="#21D4E8"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
      <Canvas
        shadows
        camera={{ position: [0, 3.2, 8.8], fov: 44 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Night Environmental & Neon Lighting */}
        <ambientLight intensity={0.4} color="#1C212B" />

        {/* Primary Neon Magenta Light */}
        <pointLight
          position={[0, 4.2, -1.2]}
          intensity={2.8}
          color="#FF2E88"
          distance={14}
          decay={2}
          castShadow
        />

        {/* Secondary Electric Cyan Light */}
        <pointLight
          position={[-3.5, 3.5, 0.5]}
          intensity={2.2}
          color="#21D4E8"
          distance={12}
          decay={2}
        />

        {/* Warm Amber Kitchen Light */}
        <pointLight
          position={[0, 1.8, -1.8]}
          intensity={3.2}
          color="#FFB347"
          distance={10}
          decay={2}
          castShadow
        />

        {/* Soft Directional Moon/Street Illumination */}
        <directionalLight position={[6, 8, 4]} intensity={0.5} color="#AAB5C9" />

        {/* Storefront & Canopy Architecture */}
        <SeoulStorefront />

        {/* Neon Signboard */}
        <NeonSignboard position={[0, 4.8, -2.2]} />

        {/* Wet Reflective Road Ground */}
        <WetAsphaltPavement />

        {/* Urban Neon Atmosphere Particles */}
        <UrbanNeonDust count={55} />

        {/* Constrained OrbitControls for smooth interactive exploration */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minPolarAngle={Math.PI / 3}
          maxAzimuthAngle={Math.PI / 8}
          minAzimuthAngle={-Math.PI / 8}
          rotateSpeed={0.4}
        />
      </Canvas>
    </div>
  );
}
