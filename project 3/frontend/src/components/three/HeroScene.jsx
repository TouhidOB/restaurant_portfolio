import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Mediterranean Coastal Villa Architectural Model
function MediterraneanVilla() {
  const waterRef = useRef();
  const seaWaves = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (seaWaves.current) {
      seaWaves.current.position.y = -1.2 + Math.sin(t * 0.8) * 0.05;
      seaWaves.current.rotation.z = Math.sin(t * 0.2) * 0.02;
    }
  });

  return (
    <group position={[0, -0.6, 0]}>
      {/* Ocean Water Plane */}
      <mesh ref={seaWaves} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, -5]}>
        <planeGeometry args={[60, 60, 32, 32]} />
        <meshStandardMaterial
          color="#1B627F"
          roughness={0.15}
          metalness={0.4}
          flatShading={false}
        />
      </mesh>

      {/* Main Cliffside Limestone Base / Foundation */}
      <mesh position={[0, -0.4, 0]} receiveShadow>
        <boxGeometry args={[12, 1.4, 8]} />
        <meshStandardMaterial color="#E4DCD0" roughness={0.9} />
      </mesh>

      {/* Travertine Stone Terrace Flooring */}
      <mesh position={[0, 0.35, 0]} receiveShadow>
        <boxGeometry args={[11.6, 0.1, 7.6]} />
        <meshStandardMaterial color="#EFE9DE" roughness={0.7} />
      </mesh>

      {/* Whitewashed Colonnade Arch 1 (Left) */}
      <group position={[-3.2, 1.8, 0]}>
        {/* Left Column */}
        <mesh position={[-1.1, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.22, 0.26, 2.8, 16]} />
          <meshStandardMaterial color="#FAF8F2" roughness={0.5} />
        </mesh>
        {/* Right Column */}
        <mesh position={[1.1, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.22, 0.26, 2.8, 16]} />
          <meshStandardMaterial color="#FAF8F2" roughness={0.5} />
        </mesh>
        {/* Arch Top */}
        <mesh position={[0, 1.4, 0]} rotation={[0, 0, 0]} castShadow>
          <torusGeometry args={[1.1, 0.22, 12, 24, Math.PI]} />
          <meshStandardMaterial color="#FAF8F2" roughness={0.5} />
        </mesh>
        {/* Arch Lintel Header */}
        <mesh position={[0, 1.85, 0]} castShadow>
          <boxGeometry args={[3, 0.35, 0.7]} />
          <meshStandardMaterial color="#F5EFE4" roughness={0.6} />
        </mesh>
      </group>

      {/* Whitewashed Colonnade Arch 2 (Center - Monumental) */}
      <group position={[0, 2.2, 0]}>
        <mesh position={[-1.5, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.28, 0.32, 3.4, 16]} />
          <meshStandardMaterial color="#FAF8F2" roughness={0.5} />
        </mesh>
        <mesh position={[1.5, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.28, 0.32, 3.4, 16]} />
          <meshStandardMaterial color="#FAF8F2" roughness={0.5} />
        </mesh>
        <mesh position={[0, 1.7, 0]} castShadow>
          <torusGeometry args={[1.5, 0.28, 12, 24, Math.PI]} />
          <meshStandardMaterial color="#FAF8F2" roughness={0.5} />
        </mesh>
        <mesh position={[0, 2.2, 0]} castShadow>
          <boxGeometry args={[3.8, 0.45, 0.8]} />
          <meshStandardMaterial color="#F5EFE4" roughness={0.6} />
        </mesh>
      </group>

      {/* Whitewashed Colonnade Arch 3 (Right) */}
      <group position={[3.2, 1.8, 0]}>
        <mesh position={[-1.1, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.22, 0.26, 2.8, 16]} />
          <meshStandardMaterial color="#FAF8F2" roughness={0.5} />
        </mesh>
        <mesh position={[1.1, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.22, 0.26, 2.8, 16]} />
          <meshStandardMaterial color="#FAF8F2" roughness={0.5} />
        </mesh>
        <mesh position={[0, 1.4, 0]} castShadow>
          <torusGeometry args={[1.1, 0.22, 12, 24, Math.PI]} />
          <meshStandardMaterial color="#FAF8F2" roughness={0.5} />
        </mesh>
        <mesh position={[0, 1.85, 0]} castShadow>
          <boxGeometry args={[3, 0.35, 0.7]} />
          <meshStandardMaterial color="#F5EFE4" roughness={0.6} />
        </mesh>
      </group>

      {/* Pergola Wooden Beams (Overhead) */}
      <group position={[0, 4.0, 1.2]}>
        {[-3.6, -1.8, 0, 1.8, 3.6].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]} castShadow>
            <boxGeometry args={[0.15, 0.25, 4.2]} />
            <meshStandardMaterial color="#5C4533" roughness={0.8} />
          </mesh>
        ))}
        {[-1.5, 0, 1.5].map((z, j) => (
          <mesh key={`cross-${j}`} position={[0, 0.15, z]} castShadow>
            <boxGeometry args={[9.5, 0.15, 0.15]} />
            <meshStandardMaterial color="#6B513C" roughness={0.8} />
          </mesh>
        ))}
      </group>

      {/* Terracotta Urns & Olive Trees on Terrace */}
      <group position={[-4.5, 0.4, 2.2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.35, 0.22, 0.8, 16]} />
          <meshStandardMaterial color="#B86E50" roughness={0.9} />
        </mesh>
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
          <mesh position={[0, 0.9, 0]} castShadow>
            <dodecahedronGeometry args={[0.65, 1]} />
            <meshStandardMaterial color="#68765A" roughness={0.7} />
          </mesh>
        </Float>
      </group>

      <group position={[4.5, 0.4, 2.2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.35, 0.22, 0.8, 16]} />
          <meshStandardMaterial color="#B86E50" roughness={0.9} />
        </mesh>
        <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.2}>
          <mesh position={[0, 0.9, 0]} castShadow>
            <dodecahedronGeometry args={[0.65, 1]} />
            <meshStandardMaterial color="#68765A" roughness={0.7} />
          </mesh>
        </Float>
      </group>

      {/* Minimalist Dining Table & Chairs on Terrace */}
      <group position={[0, 0.4, 2.4]}>
        {/* Table Top */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.75, 0.75, 0.05, 32]} />
          <meshStandardMaterial color="#FAF9F5" roughness={0.5} />
        </mesh>
        {/* Table Pedestal */}
        <mesh position={[0, 0.18, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.14, 0.4, 16]} />
          <meshStandardMaterial color="#D6A854" roughness={0.4} metalness={0.6} />
        </mesh>
        {/* Chairs */}
        {[-0.85, 0.85].map((x, k) => (
          <group key={k} position={[x, 0, 0]} rotation={[0, x > 0 ? -Math.PI / 2 : Math.PI / 2, 0]}>
            <mesh position={[0, 0.25, 0]} castShadow>
              <boxGeometry args={[0.4, 0.04, 0.4]} />
              <meshStandardMaterial color="#E8D9C2" roughness={0.6} />
            </mesh>
            <mesh position={[0, 0.48, -0.18]} castShadow>
              <boxGeometry args={[0.4, 0.45, 0.04]} />
              <meshStandardMaterial color="#C8B69B" roughness={0.7} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 2.5, 9.5], fov: 42 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Mediterranean Ambient & Sun Lighting */}
          <ambientLight intensity={0.85} color="#F2F8FA" />
          
          {/* Warm Sun Key Light */}
          <directionalLight
            position={[8, 12, 6]}
            intensity={1.8}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            color="#FFF4DE"
          />
          
          {/* Coastal Azure Sky Fill */}
          <directionalLight
            position={[-8, 6, -4]}
            intensity={0.6}
            color="#8ACCE0"
          />

          <pointLight position={[0, 1.5, 2.5]} intensity={0.4} color="#FFDCA8" />

          {/* Interactive Villa Model */}
          <MediterraneanVilla />

          {/* Damped Controls restricted to dignified angles */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 3.2}
            maxPolarAngle={Math.PI / 2.05}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
