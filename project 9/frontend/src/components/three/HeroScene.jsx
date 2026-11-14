import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Procedural 3D Skyline Rooftop & High-Rise Crown Architecture
function SkylinePenthouse() {
  const groupRef = useRef();
  const fireLightRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.12) * 0.035;
      groupRef.current.position.y = Math.sin(t * 0.2) * 0.025;
    }
    if (fireLightRef.current) {
      fireLightRef.current.intensity = 2.5 + Math.sin(t * 8.0) * 0.4 + Math.cos(t * 12.0) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* Skyscraper Penthouse Level Base / Tower Core */}
      <mesh position={[0, -1.2, -1.0]} receiveShadow>
        <boxGeometry args={[11.0, 2.0, 8.0]} />
        <meshStandardMaterial color="#0E1724" roughness={0.6} metalness={0.7} />
      </mesh>

      {/* Cantilevered Teak Decking (Open-Air Dining Terrace) */}
      <mesh position={[0, -0.15, 1.2]} receiveShadow>
        <boxGeometry args={[9.6, 0.25, 4.8]} />
        <meshStandardMaterial color="#2E241E" roughness={0.8} />
      </mesh>

      {/* Cantilevered Glass Floor Strip (Overhang beyond the building edge) */}
      <mesh position={[0, -0.15, 3.7]}>
        <boxGeometry args={[8.0, 0.18, 0.8]} />
        <meshStandardMaterial
          color="#A8D5E5"
          transparent
          opacity={0.5}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Perimeter Frameless Glass Balustrade / Windbreaks */}
      {/* Front Glass Railing */}
      <mesh position={[0, 0.55, 3.65]}>
        <boxGeometry args={[9.4, 1.2, 0.06]} />
        <meshStandardMaterial
          color="#CBE5EE"
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      {/* Champagne Bronze Handrail Cap */}
      <mesh position={[0, 1.15, 3.65]}>
        <boxGeometry args={[9.5, 0.05, 0.1]} />
        <meshStandardMaterial color="#D8C3A0" metalness={0.9} roughness={0.25} />
      </mesh>

      {/* Left Glass Railing */}
      <mesh position={[-4.75, 0.55, 1.25]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[4.8, 1.2, 0.06]} />
        <meshStandardMaterial
          color="#CBE5EE"
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      {/* Right Glass Railing */}
      <mesh position={[4.75, 0.55, 1.25]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[4.8, 1.2, 0.06]} />
        <meshStandardMaterial
          color="#CBE5EE"
          transparent
          opacity={0.4}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Linear Sunset Bronze Fire Pits (Center of Terrace) */}
      <group position={[0, 0.1, 2.0]}>
        {/* Bronze Fire Basin */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <boxGeometry args={[3.2, 0.3, 0.55]} />
          <meshStandardMaterial color="#C47A56" metalness={0.85} roughness={0.3} />
        </mesh>
        {/* Burning Embers Core */}
        <mesh position={[0, 0.32, 0]}>
          <boxGeometry args={[2.8, 0.06, 0.3]} />
          <meshStandardMaterial
            color="#FF934F"
            emissive="#E7A75B"
            emissiveIntensity={1.8}
            roughness={0.2}
          />
        </mesh>
        {/* Flickering Fire Point Light */}
        <pointLight ref={fireLightRef} position={[0, 0.7, 0]} color="#FF9A42" distance={6.0} intensity={2.8} />
      </group>

      {/* Terrace Dining Tables with Illuminated Amber Candles */}
      {[-2.8, 2.8].map((x, idx) => (
        <group key={`table-${idx}`} position={[x, 0, 1.2]}>
          {/* Table Pedestal */}
          <mesh position={[0, 0.38, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.22, 0.76, 16]} />
            <meshStandardMaterial color="#171C22" metalness={0.9} roughness={0.3} />
          </mesh>
          {/* Champagne Onyx Table Top */}
          <mesh position={[0, 0.76, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.7, 0.7, 0.05, 32]} />
            <meshStandardMaterial color="#D8C3A0" roughness={0.4} metalness={0.3} />
          </mesh>
          {/* Small Amber Candle Luminary */}
          <mesh position={[0, 0.86, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.14, 16]} />
            <meshStandardMaterial
              color="#FFE1A8"
              emissive="#E7A75B"
              emissiveIntensity={1.5}
            />
          </mesh>
          <pointLight position={[0, 0.95, 0]} color="#FFB85A" intensity={1.2} distance={2.5} />
        </group>
      ))}

      {/* Indoor Glasshouse Sky Lounge (Back Pavilion) */}
      <group position={[0, 1.6, -1.8]}>
        {/* Back Wall (Deep Midnight Blue with Gold Accent Panels) */}
        <mesh position={[0, 0, -1.8]}>
          <boxGeometry args={[9.6, 3.2, 0.3]} />
          <meshStandardMaterial color="#101C2C" roughness={0.7} />
        </mesh>

        {/* Champagne Bronze Architectural Columns */}
        {[-4.6, -2.3, 0, 2.3, 4.6].map((x, ci) => (
          <mesh key={`col-${ci}`} position={[x, 0, 0.8]} castShadow>
            <boxGeometry args={[0.18, 3.2, 0.18]} />
            <meshStandardMaterial color="#D8C3A0" metalness={0.85} roughness={0.25} />
          </mesh>
        ))}

        {/* Low-Iron Double Glazed Glass Facade */}
        <mesh position={[0, 0, 0.75]}>
          <planeGeometry args={[9.4, 3.1]} />
          <meshStandardMaterial
            color="#DDF2F8"
            transparent
            opacity={0.3}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Cantilevered Glass Roof / Canopy */}
        <mesh position={[0, 1.65, 0.4]} rotation={[0.04, 0, 0]}>
          <boxGeometry args={[9.8, 0.15, 3.4]} />
          <meshStandardMaterial color="#162438" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Warm Golden Interior Ambient Glow (Interior Dining Chandelier) */}
        <pointLight position={[0, 1.0, -0.6]} color="#E7A75B" intensity={3.5} distance={7.0} />
      </group>

      {/* Distant City Skyline Skyscrapers Below */}
      <group position={[0, -5.5, -8.0]}>
        {[-8, -5.5, -3, 0, 3, 5.5, 8].map((bx, bi) => {
          const height = 4.5 + Math.sin(bi * 1.5) * 1.8;
          return (
            <mesh key={`bldg-${bi}`} position={[bx, height / 2, 0]}>
              <boxGeometry args={[1.8, height, 1.8]} />
              <meshStandardMaterial
                color="#0A121D"
                roughness={0.8}
                metalness={0.5}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

// Floating Twilight Dust & Star Particles
function TwilightAtmosphere() {
  const particlesRef = useRef();
  const particleCount = 80;

  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 18;
      pos[i + 1] = Math.random() * 8 - 1;
      pos[i + 2] = (Math.random() - 0.5) * 14;
    }
    return pos;
  }, [particleCount]);

  useFrame((state) => {
    if (particlesRef.current) {
      const t = state.clock.getElapsedTime();
      particlesRef.current.rotation.y = t * 0.02;
      particlesRef.current.position.y = Math.sin(t * 0.25) * 0.15;
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
        size={0.06}
        color="#D8C3A0"
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
      camera={{ position: [0, 2.6, 7.8], fov: 42 }}
      style={{
        width: '100%',
        height: '100%',
        background: 'radial-gradient(ellipse at 50% 30%, #1D2E45 0%, #101C2C 55%, #0A121D 100%)',
      }}
      shadows
    >
      {/* Twilight & Sunset Lighting Environment */}
      <ambientLight intensity={0.65} color="#64788A" />

      {/* Warm Golden Sunset Key Light */}
      <directionalLight
        position={[-6, 5, 4]}
        intensity={1.8}
        color="#E7A75B"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Deep Twilight Blue Rim Light */}
      <directionalLight
        position={[6, 3, -4]}
        intensity={0.9}
        color="#263F5A"
      />

      {/* Penthouse Architecture */}
      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.12}>
        <SkylinePenthouse />
      </Float>

      {/* Atmospheric Starlight Particles */}
      <TwilightAtmosphere />

      {/* Subtle Interactive Camera Orbit */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2 - 0.08}
        minPolarAngle={Math.PI / 3}
        maxAzimuthAngle={Math.PI / 8}
        minAzimuthAngle={-Math.PI / 8}
      />
    </Canvas>
  );
}
