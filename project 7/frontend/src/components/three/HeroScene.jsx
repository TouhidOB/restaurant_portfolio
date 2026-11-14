import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Parisian Townhouse Facade Model
function ParisianFacade() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle ambient floating / sway
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.05;
      groupRef.current.position.y = Math.sin(t * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Main Facade Body - Parisian Limestone */}
      <mesh position={[0, 1.8, -1]} receiveShadow castShadow>
        <boxGeometry args={[7.2, 5.5, 0.6]} />
        <meshStandardMaterial
          color="#DFD5C6"
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      {/* Mansard Roof Section (Zinc & Slate) */}
      <mesh position={[0, 4.9, -1.2]} rotation={[-0.35, 0, 0]} castShadow>
        <boxGeometry args={[7.4, 1.8, 0.4]} />
        <meshStandardMaterial color="#4A525A" roughness={0.7} metalness={0.4} />
      </mesh>

      {/* Neoclassical Cornice & Molding */}
      <mesh position={[0, 4.4, -0.7]}>
        <boxGeometry args={[7.6, 0.25, 0.8]} />
        <meshStandardMaterial color="#D3C7B5" roughness={0.8} />
      </mesh>
      <mesh position={[0, 2.5, -0.7]}>
        <boxGeometry args={[7.4, 0.18, 0.4]} />
        <meshStandardMaterial color="#D3C7B5" roughness={0.8} />
      </mesh>

      {/* Classical Portico / Entrance Arch */}
      <group position={[0, 0, -0.6]}>
        {/* Main Double Doors (Deep Burgundy & Wood) */}
        <mesh position={[0, 0.7, 0.05]}>
          <boxGeometry args={[1.6, 2.4, 0.1]} />
          <meshStandardMaterial color="#37171E" roughness={0.4} metalness={0.2} />
        </mesh>
        {/* Gold Door Knocker & Handles */}
        <mesh position={[-0.3, 0.7, 0.12]}>
          <cylinderGeometry args={[0.04, 0.04, 0.25, 16]} />
          <meshStandardMaterial color="#C5A46D" roughness={0.2} metalness={0.85} />
        </mesh>
        <mesh position={[0.3, 0.7, 0.12]}>
          <cylinderGeometry args={[0.04, 0.04, 0.25, 16]} />
          <meshStandardMaterial color="#C5A46D" roughness={0.2} metalness={0.85} />
        </mesh>

        {/* Portal Arch & Moldings */}
        <mesh position={[-0.95, 0.7, 0.1]}>
          <boxGeometry args={[0.25, 2.5, 0.3]} />
          <meshStandardMaterial color="#D3C7B5" roughness={0.8} />
        </mesh>
        <mesh position={[0.95, 0.7, 0.1]}>
          <boxGeometry args={[0.25, 2.5, 0.3]} />
          <meshStandardMaterial color="#D3C7B5" roughness={0.8} />
        </mesh>
        <mesh position={[0, 2.0, 0.1]}>
          <boxGeometry args={[2.2, 0.3, 0.35]} />
          <meshStandardMaterial color="#D3C7B5" roughness={0.8} />
        </mesh>

        {/* Pediment triangle on top of door */}
        <mesh position={[0, 2.25, 0.1]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.6, 0.6, 0.25]} />
          <meshStandardMaterial color="#D3C7B5" roughness={0.8} />
        </mesh>

        {/* Interior Warm Golden Glow leaking out */}
        <pointLight position={[0, 0.8, 0.5]} intensity={2.5} color="#FFD182" distance={4} />
      </group>

      {/* French Windows (First Floor Salons) */}
      {[-2.2, 2.2].map((x, i) => (
        <group key={`win-ground-${i}`} position={[x, 0.8, -0.65]}>
          {/* Glass Pane with Golden Interior Radiance */}
          <mesh>
            <planeGeometry args={[1.1, 2.1]} />
            <meshStandardMaterial
              color="#FFE8B0"
              emissive="#FFB84D"
              emissiveIntensity={0.65}
              roughness={0.2}
            />
          </mesh>
          {/* Wrought Iron Parisian Balconette Guard */}
          <mesh position={[0, -0.5, 0.12]}>
            <boxGeometry args={[1.2, 0.7, 0.05]} />
            <meshStandardMaterial color="#1E1E22" roughness={0.5} metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Upper Floor French Balconies (Grand Salons) */}
      {[-2.2, 0, 2.2].map((x, i) => (
        <group key={`win-upper-${i}`} position={[x, 3.2, -0.65]}>
          {/* Window Glass with Interior Chandelier Glow */}
          <mesh>
            <planeGeometry args={[1.2, 1.8]} />
            <meshStandardMaterial
              color="#FFE6A3"
              emissive="#FFAA33"
              emissiveIntensity={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* Balcony Base Stone */}
          <mesh position={[0, -0.95, 0.2]}>
            <boxGeometry args={[1.5, 0.15, 0.5]} />
            <meshStandardMaterial color="#D3C7B5" roughness={0.8} />
          </mesh>
          {/* Balustrade Railing (Gold Accents + Black Wrought Iron) */}
          <mesh position={[0, -0.55, 0.4]}>
            <boxGeometry args={[1.4, 0.65, 0.06]} />
            <meshStandardMaterial color="#222" roughness={0.4} metalness={0.8} />
          </mesh>
          <mesh position={[0, -0.25, 0.4]}>
            <boxGeometry args={[1.45, 0.05, 0.08]} />
            <meshStandardMaterial color="#C5A46D" roughness={0.2} metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Parisian Street Lanterns (Gold & Bronze) */}
      {[-1.5, 1.5].map((x, i) => (
        <group key={`lantern-${i}`} position={[x, 1.4, -0.3]}>
          {/* Bracket */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
            <meshStandardMaterial color="#1E1E22" metalness={0.9} />
          </mesh>
          {/* Lantern Head */}
          <mesh position={[0, -0.15, 0.1]}>
            <cylinderGeometry args={[0.1, 0.06, 0.25, 6]} />
            <meshStandardMaterial color="#2B261D" metalness={0.8} />
          </mesh>
          {/* Glowing Glass Bulb */}
          <mesh position={[0, -0.15, 0.1]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color="#FFE099" />
          </mesh>
          <pointLight position={[0, -0.15, 0.25]} intensity={2.2} color="#FFCB6B" distance={3.5} />
        </group>
      ))}

      {/* Pavement & Entrance Steps */}
      <mesh position={[0, -0.65, 0.5]} receiveShadow>
        <boxGeometry args={[7.8, 0.3, 3.2]} />
        <meshStandardMaterial color="#55514E" roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.4, 0.8]} receiveShadow>
        <boxGeometry args={[2.4, 0.2, 1.2]} />
        <meshStandardMaterial color="#706B65" roughness={0.9} />
      </mesh>
    </group>
  );
}

// Drifting Champagne Motes / Sparkles
function ChampagneSparkles({ count = 45 }) {
  const pointsRef = useRef();
  const particles = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = Math.random() * 6 - 1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 + 1;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        // Slow rising motion like champagne bubbles
        positions[i * 3 + 1] += 0.004;
        if (positions[i * 3 + 1] > 5) {
          positions[i * 3 + 1] = -1;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#EAD29B"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 1.2, 5.8], fov: 46 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Sophisticated Parisian Evening Lighting */}
        <ambientLight intensity={0.45} color="#453842" />
        <directionalLight
          position={[4, 6, 5]}
          intensity={1.2}
          color="#FFF2D6"
          castShadow
        />
        <directionalLight
          position={[-5, 3, 2]}
          intensity={0.6}
          color="#8B606D"
        />

        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
          <ParisianFacade />
        </Float>

        <ChampagneSparkles />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.05}
          minPolarAngle={Math.PI / 2 - 0.25}
          maxAzimuthAngle={Math.PI / 8}
          minAzimuthAngle={-Math.PI / 8}
          rotateSpeed={0.4}
        />
      </Canvas>
    </div>
  );
}
