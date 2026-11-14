import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Procedural Urban Industrial Converted Warehouse Model
function IndustrialWarehouse() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.04;
      groupRef.current.position.y = Math.sin(t * 0.25) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* Main Exposed Brick Warehouse Facade */}
      <mesh position={[0, 2.0, -1]} receiveShadow castShadow>
        <boxGeometry args={[8.4, 5.6, 0.6]} />
        <meshStandardMaterial
          color="#914D37"
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>

      {/* Heavy Black Steel I-Beams (Vertical Columns) */}
      {[-4.1, -1.8, 1.8, 4.1].map((x, idx) => (
        <group key={`col-${idx}`} position={[x, 2.0, -0.6]}>
          <mesh castShadow>
            <boxGeometry args={[0.22, 5.8, 0.35]} />
            <meshStandardMaterial color="#1C1E20" roughness={0.6} metalness={0.8} />
          </mesh>
          {/* Rivet details */}
          {[-2.0, 0, 2.0].map((y, ri) => (
            <mesh key={ri} position={[0, y, 0.18]}>
              <boxGeometry args={[0.26, 0.06, 0.04]} />
              <meshStandardMaterial color="#B87345" metalness={0.9} roughness={0.3} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Horizontal Steel Header Beam (Span across facade) */}
      <mesh position={[0, 4.8, -0.6]} castShadow>
        <boxGeometry args={[8.6, 0.35, 0.4]} />
        <meshStandardMaterial color="#181A1C" roughness={0.5} metalness={0.85} />
      </mesh>
      <mesh position={[0, 2.4, -0.6]} castShadow>
        <boxGeometry args={[8.6, 0.25, 0.38]} />
        <meshStandardMaterial color="#181A1C" roughness={0.5} metalness={0.85} />
      </mesh>

      {/* Poured Concrete Lintels & Parapet Cap */}
      <mesh position={[0, 4.95, -0.95]}>
        <boxGeometry args={[8.8, 0.2, 0.8]} />
        <meshStandardMaterial color="#B7B4AC" roughness={0.85} />
      </mesh>
      <mesh position={[0, -0.65, 0.8]} receiveShadow>
        <boxGeometry args={[9.0, 0.4, 3.8]} />
        <meshStandardMaterial color="#353739" roughness={0.9} />
      </mesh>

      {/* Converted Warehouse Entrance: Heavy Steel & Glass Pivot Door */}
      <group position={[0, 0.8, -0.6]}>
        {/* Door Frame */}
        <mesh>
          <boxGeometry args={[2.0, 2.8, 0.15]} />
          <meshStandardMaterial color="#111314" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Door Glass with Warm Amber Hearth Glow */}
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[1.7, 2.5]} />
          <meshStandardMaterial
            color="#FFD494"
            emissive="#E9A24B"
            emissiveIntensity={0.85}
            roughness={0.2}
          />
        </mesh>
        {/* Copper Industrial Pull Handle */}
        <mesh position={[0.65, 0, 0.12]}>
          <cylinderGeometry args={[0.035, 0.035, 1.2, 12]} />
          <meshStandardMaterial color="#B87345" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Warm Point Light escaping the door */}
        <pointLight position={[0, 0, 0.6]} intensity={3.0} color="#FF9A3C" distance={4.5} />
      </group>

      {/* Large Multi-Pane Factory Windows (Ground Floor) */}
      {[-2.95, 2.95].map((x, i) => (
        <group key={`win-gf-${i}`} position={[x, 0.9, -0.65]}>
          {/* Glass Pane */}
          <mesh>
            <planeGeometry args={[1.9, 2.3]} />
            <meshStandardMaterial
              color="#FFE8B0"
              emissive="#E9A24B"
              emissiveIntensity={0.65}
              roughness={0.15}
            />
          </mesh>
          {/* Window Steel Grid Mullions */}
          <mesh position={[0, 0, 0.04]}>
            <boxGeometry args={[2.0, 2.4, 0.05]} />
            <meshStandardMaterial color="#111314" roughness={0.5} metalness={0.8} wireframe />
          </mesh>
        </group>
      ))}

      {/* Upper Floor Industrial Casement Windows */}
      {[-2.95, 0, 2.95].map((x, i) => (
        <group key={`win-uf-${i}`} position={[x, 3.6, -0.65]}>
          <mesh>
            <planeGeometry args={[1.9, 1.8]} />
            <meshStandardMaterial
              color="#FFDF99"
              emissive="#E9A24B"
              emissiveIntensity={0.5}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[0, 0, 0.04]}>
            <boxGeometry args={[2.0, 1.9, 0.05]} />
            <meshStandardMaterial color="#111314" roughness={0.5} metalness={0.8} wireframe />
          </mesh>
        </group>
      ))}

      {/* Illuminated Copper Marquee Signage "URBAN TABLE" */}
      <group position={[0, 2.7, -0.3]}>
        {/* Backing Steel Plate */}
        <mesh castShadow>
          <boxGeometry args={[3.2, 0.55, 0.12]} />
          <meshStandardMaterial color="#181A1C" roughness={0.6} metalness={0.8} />
        </mesh>
        {/* Copper Trim Border */}
        <mesh position={[0, 0, 0.06]}>
          <boxGeometry args={[3.26, 0.6, 0.04]} />
          <meshStandardMaterial color="#B87345" metalness={0.9} roughness={0.25} />
        </mesh>
        {/* Neon Amber Glow Tube */}
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[2.8, 0.22, 0.02]} />
          <meshBasicMaterial color="#FFB852" />
        </mesh>
        <pointLight position={[0, 0, 0.4]} intensity={2.4} color="#E9A24B" distance={3.5} />
      </group>

      {/* Industrial Gooseneck Lamps */}
      {[-1.2, 1.2].map((x, i) => (
        <group key={`lamp-${i}`} position={[x, 2.45, -0.2]}>
          {/* Curved Bracket */}
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.35, 8]} />
            <meshStandardMaterial color="#111314" metalness={0.9} />
          </mesh>
          {/* Lamp Shade (Black enamel) */}
          <mesh position={[0, 0.25, 0.15]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.16, 0.08, 0.12, 12]} />
            <meshStandardMaterial color="#181A1C" metalness={0.7} />
          </mesh>
          {/* Amber Filament Glow */}
          <mesh position={[0, 0.2, 0.15]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshBasicMaterial color="#FFCA7A" />
          </mesh>
          <pointLight position={[0, 0.15, 0.25]} intensity={2.0} color="#FFB042" distance={3.0} />
        </group>
      ))}
    </group>
  );
}

// Drifting Woodsmoke Embers / Sparks
function HearthEmbers({ count = 55 }) {
  const pointsRef = useRef();
  const particles = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 1] = Math.random() * 6 - 1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 + 1;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        // Drifting upward like wood fire embers
        positions[i * 3 + 1] += 0.006;
        positions[i * 3] += Math.sin(state.clock.getElapsedTime() + i) * 0.002;
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
        size={0.075}
        color="#E9A24B"
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 1.5, 6.2], fov: 48 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Urban Dusk Industrial Lighting */}
        <ambientLight intensity={0.5} color="#252729" />
        <directionalLight
          position={[5, 7, 4]}
          intensity={1.2}
          color="#FFF0D4"
          castShadow
        />
        <directionalLight
          position={[-6, 4, 3]}
          intensity={0.6}
          color="#914D37"
        />

        <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.18}>
          <IndustrialWarehouse />
        </Float>

        <HearthEmbers />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.05}
          minPolarAngle={Math.PI / 2 - 0.25}
          maxAzimuthAngle={Math.PI / 8}
          minAzimuthAngle={-Math.PI / 8}
          rotateSpeed={0.35}
        />
      </Canvas>
    </div>
  );
}
