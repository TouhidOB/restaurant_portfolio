import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Luxury Mediterranean Coastal Architectural Pavilion
function MediterraneanCoastalPavilion() {
  const waterRef = useRef();
  const flameRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (waterRef.current) {
      waterRef.current.position.y = -1.4 + Math.sin(t * 0.9) * 0.04;
      waterRef.current.rotation.z = Math.sin(t * 0.3) * 0.015;
    }
    if (flameRef.current) {
      flameRef.current.intensity = 0.8 + Math.sin(t * 12) * 0.2;
    }
  });

  return (
    <group position={[0, -0.5, 0]}>
      {/* 1. Shimmering Mediterranean Ocean Horizon */}
      <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.4, -6]}>
        <planeGeometry args={[70, 70, 48, 48]} />
        <meshStandardMaterial
          color="#15536E"
          roughness={0.12}
          metalness={0.5}
          flatShading={false}
        />
      </mesh>

      {/* 2. Sea Horizon Backdrop Tint */}
      <mesh position={[0, 4, -20]}>
        <planeGeometry args={[80, 24]} />
        <meshBasicMaterial color="#91C4D4" />
      </mesh>

      {/* 3. Rugged Coastal Cliff Foundation */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[13, 1.6, 9]} />
        <meshStandardMaterial color="#D6CCC0" roughness={0.9} />
      </mesh>

      {/* 4. Fine Travertine Polished Flooring */}
      <mesh position={[0, 0.36, 0]} receiveShadow>
        <boxGeometry args={[12.6, 0.12, 8.6]} />
        <meshStandardMaterial color="#F4EFE6" roughness={0.5} metalness={0.05} />
      </mesh>

      {/* 5. Gilded Perimeter Brass Inset Line on Floor */}
      <mesh position={[0, 0.43, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.2, 4.24, 64]} />
        <meshStandardMaterial color="#C5A059" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* 6. Monumental Architectural Colonnade & Arches */}
      {/* Center Grand Arch */}
      <group position={[0, 2.3, -1.2]}>
        {/* Left Column with Base & Capital */}
        <group position={[-1.6, 0, 0]}>
          <mesh position={[0, -1.5, 0]} castShadow>
            <boxGeometry args={[0.6, 0.2, 0.6]} />
            <meshStandardMaterial color="#ECE4D8" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.26, 0.3, 3.2, 24]} />
            <meshStandardMaterial color="#FAF8F3" roughness={0.4} />
          </mesh>
          <mesh position={[0, 1.5, 0]} castShadow>
            <boxGeometry args={[0.55, 0.25, 0.55]} />
            <meshStandardMaterial color="#ECE4D8" roughness={0.6} />
          </mesh>
        </group>

        {/* Right Column with Base & Capital */}
        <group position={[1.6, 0, 0]}>
          <mesh position={[0, -1.5, 0]} castShadow>
            <boxGeometry args={[0.6, 0.2, 0.6]} />
            <meshStandardMaterial color="#ECE4D8" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.26, 0.3, 3.2, 24]} />
            <meshStandardMaterial color="#FAF8F3" roughness={0.4} />
          </mesh>
          <mesh position={[0, 1.5, 0]} castShadow>
            <boxGeometry args={[0.55, 0.25, 0.55]} />
            <meshStandardMaterial color="#ECE4D8" roughness={0.6} />
          </mesh>
        </group>

        {/* Grand Semicircular Arch Curve */}
        <mesh position={[0, 1.6, 0]} castShadow>
          <torusGeometry args={[1.6, 0.26, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#FAF8F3" roughness={0.4} />
        </mesh>

        {/* Crown Arch Lintel Header */}
        <mesh position={[0, 2.15, 0]} castShadow>
          <boxGeometry args={[4.2, 0.4, 0.8]} />
          <meshStandardMaterial color="#F2EDE4" roughness={0.5} />
        </mesh>
      </group>

      {/* Flanking Side Arch (Left) */}
      <group position={[-3.6, 1.9, -1.2]}>
        <mesh position={[-1.2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.26, 2.8, 16]} />
          <meshStandardMaterial color="#FAF8F3" roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.4, 0]} castShadow>
          <torusGeometry args={[1.2, 0.22, 14, 28, Math.PI]} />
          <meshStandardMaterial color="#FAF8F3" roughness={0.4} />
        </mesh>
      </group>

      {/* Flanking Side Arch (Right) */}
      <group position={[3.6, 1.9, -1.2]}>
        <mesh position={[1.2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.26, 2.8, 16]} />
          <meshStandardMaterial color="#FAF8F3" roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.4, 0]} castShadow>
          <torusGeometry args={[1.2, 0.22, 14, 28, Math.PI]} />
          <meshStandardMaterial color="#FAF8F3" roughness={0.4} />
        </mesh>
      </group>

      {/* 7. Natural Chestnut Pergola Beams Overhead */}
      <group position={[0, 4.2, 0.8]}>
        {[-3.8, -1.9, 0, 1.9, 3.8].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]} castShadow>
            <boxGeometry args={[0.16, 0.26, 4.6]} />
            <meshStandardMaterial color="#4A3B2C" roughness={0.8} />
          </mesh>
        ))}
        {[-1.6, 0, 1.6].map((z, j) => (
          <mesh key={`cross-${j}`} position={[0, 0.16, z]} castShadow>
            <boxGeometry args={[10.2, 0.14, 0.14]} />
            <meshStandardMaterial color="#5C4B3A" roughness={0.8} />
          </mesh>
        ))}
      </group>

      {/* 8. Terracotta Planters & Olive Trees */}
      <group position={[-4.8, 0.42, 1.8]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.42, 0.28, 0.9, 16]} />
          <meshStandardMaterial color="#B65A3D" roughness={0.85} />
        </mesh>
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.15}>
          <mesh position={[0, 1.1, 0]} castShadow>
            <dodecahedronGeometry args={[0.75, 1]} />
            <meshStandardMaterial color="#4B5D43" roughness={0.7} />
          </mesh>
          <mesh position={[0.2, 1.4, 0.1]} castShadow>
            <dodecahedronGeometry args={[0.5, 1]} />
            <meshStandardMaterial color="#5B6B4C" roughness={0.65} />
          </mesh>
        </Float>
      </group>

      <group position={[4.8, 0.42, 1.8]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.42, 0.28, 0.9, 16]} />
          <meshStandardMaterial color="#B65A3D" roughness={0.85} />
        </mesh>
        <Float speed={1.4} rotationIntensity={0.18} floatIntensity={0.15}>
          <mesh position={[0, 1.1, 0]} castShadow>
            <dodecahedronGeometry args={[0.75, 1]} />
            <meshStandardMaterial color="#4B5D43" roughness={0.7} />
          </mesh>
          <mesh position={[-0.2, 1.4, 0.1]} castShadow>
            <dodecahedronGeometry args={[0.5, 1]} />
            <meshStandardMaterial color="#5B6B4C" roughness={0.65} />
          </mesh>
        </Float>
      </group>

      {/* 9. Central Fine Dining Table & Setting */}
      <group position={[0, 0.42, 1.8]}>
        {/* Travertine Table Top */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.85, 0.85, 0.05, 32]} />
          <meshStandardMaterial color="#FCFBF8" roughness={0.3} />
        </mesh>
        {/* Brass Pedestal */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.09, 0.18, 0.45, 16]} />
          <meshStandardMaterial color="#C5A059" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Bronze Candle Lantern */}
        <mesh position={[0, 0.52, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.08, 0.12, 16]} />
          <meshStandardMaterial color="#C5A059" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Warm Candle Light Point */}
        <pointLight ref={flameRef} position={[0, 0.65, 0]} color="#FFBA6B" intensity={1.2} distance={3} />

        {/* Wine Glasses */}
        {[-0.25, 0.25].map((x, idx) => (
          <group key={idx} position={[x, 0.51, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.05, 0.03, 0.1, 12]} />
              <meshStandardMaterial color="#FFFFFF" transparent opacity={0.6} roughness={0.1} />
            </mesh>
          </group>
        ))}

        {/* Walnut Terrace Chairs */}
        {[-0.95, 0.95].map((x, k) => (
          <group key={k} position={[x, 0, 0]} rotation={[0, x > 0 ? -Math.PI / 2 : Math.PI / 2, 0]}>
            <mesh position={[0, 0.28, 0]} castShadow>
              <boxGeometry args={[0.42, 0.04, 0.42]} />
              <meshStandardMaterial color="#EAE3D6" roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.52, -0.2]} castShadow>
              <boxGeometry args={[0.42, 0.48, 0.04]} />
              <meshStandardMaterial color="#C5A059" roughness={0.5} metalness={0.5} />
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
        camera={{ position: [0, 2.6, 9.2], fov: 40 }}
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          {/* Mediterranean Ambient Fill */}
          <ambientLight intensity={0.9} color="#F2F8FA" />

          {/* Golden Hour Sun Key Light */}
          <directionalLight
            position={[9, 14, 7]}
            intensity={2.2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            color="#FFF2D6"
          />

          {/* Aegean Sky Fill Light */}
          <directionalLight
            position={[-9, 7, -5]}
            intensity={0.8}
            color="#8ED2E8"
          />

          {/* Shimmering Golden Sparkles / Sun Motes */}
          <Sparkles
            count={45}
            scale={12}
            size={2.5}
            speed={0.4}
            color="#DFBA73"
            opacity={0.6}
          />

          {/* Architectural Model */}
          <MediterraneanCoastalPavilion />

          {/* Damped Dignified Orbit Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.4}
            minPolarAngle={Math.PI / 3.4}
            maxPolarAngle={Math.PI / 2.08}
            minAzimuthAngle={-Math.PI / 4.5}
            maxAzimuthAngle={Math.PI / 4.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
