import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, Torus, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// High-Gloss Contemporary Art Pop Burger
function ContemporaryPopBurger(props) {
  const burgerRef = useRef();

  useFrame((state) => {
    if (burgerRef.current) {
      burgerRef.current.rotation.y = state.clock.getElapsedTime() * 0.35;
    }
  });

  return (
    <group ref={burgerRef} {...props}>
      {/* Top Glossy Brioche Bun */}
      <mesh position={[0, 0.72, 0]}>
        <sphereGeometry args={[1.25, 36, 18, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
        <meshPhysicalMaterial
          color="#D97A29"
          roughness={0.22}
          metalness={0.05}
          clearcoat={0.9}
          clearcoatRoughness={0.12}
        />
      </mesh>

      {/* Golden Sesame Seeds */}
      {[
        [-0.4, 1.25, 0.3], [0.35, 1.28, 0.22], [-0.15, 1.34, -0.38],
        [0.48, 1.22, -0.28], [-0.48, 1.16, -0.25], [0.18, 1.31, 0.48],
        [-0.2, 1.35, 0.1], [0.55, 1.05, 0.35], [-0.6, 1.02, 0.2]
      ].map((pos, i) => (
        <mesh key={i} position={pos} rotation={[0.2, i * 0.6, 0]}>
          <coneGeometry args={[0.035, 0.08, 6]} />
          <meshStandardMaterial color="#FFF8DC" roughness={0.3} />
        </mesh>
      ))}

      {/* Dripping Melted Cheddar */}
      <mesh position={[0, 0.52, 0]} rotation={[0, 0.35, 0]}>
        <boxGeometry args={[1.95, 0.09, 1.95]} />
        <meshPhysicalMaterial
          color="#FFB800"
          roughness={0.15}
          metalness={0.08}
          clearcoat={1.0}
        />
      </mesh>

      {/* Sizzling Dry-Aged Beef Patty */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[1.28, 1.28, 0.34, 36]} />
        <meshStandardMaterial color="#351C12" roughness={0.85} metalness={0.1} />
      </mesh>

      {/* Crisp Emerald Wavy Lettuce */}
      <mesh position={[0, 0.12, 0]} rotation={[0, 0.8, 0]}>
        <cylinderGeometry args={[1.36, 1.36, 0.08, 20]} />
        <meshPhysicalMaterial
          color="#00E676"
          roughness={0.3}
          clearcoat={0.5}
        />
      </mesh>

      {/* Rich Tomato Slice */}
      <mesh position={[0, -0.04, 0]}>
        <cylinderGeometry args={[1.22, 1.22, 0.14, 36]} />
        <meshPhysicalMaterial
          color="#FF2A4B"
          roughness={0.18}
          clearcoat={0.9}
        />
      </mesh>

      {/* Bottom Brioche Bun */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[1.22, 1.16, 0.3, 36]} />
        <meshPhysicalMaterial
          color="#D97A29"
          roughness={0.3}
          metalness={0.05}
          clearcoat={0.7}
        />
      </mesh>
    </group>
  );
}

// Sculptural Chrome & Neon Orbit Rings
function SculpturalChromeAccents() {
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      ringRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={ringRef}>
      {/* Outer Polished Chrome Ring */}
      <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.5, 0.04, 24, 64]} />
        <meshPhysicalMaterial
          color="#E5E7EB"
          metalness={0.95}
          roughness={0.08}
          clearcoat={1.0}
        />
      </mesh>

      {/* Inner Neon Coral Ring */}
      <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.2, 0.025, 24, 64]} />
        <meshStandardMaterial
          color="#FF3366"
          emissive="#FF3366"
          emissiveIntensity={1.8}
        />
      </mesh>
    </group>
  );
}

// Floating Fashion Pop Objects
function FloatingArtObjects() {
  return (
    <>
      {/* Iridescent Chrome Sphere */}
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.4}>
        <mesh position={[-2.4, 1.5, -0.6]}>
          <sphereGeometry args={[0.38, 32, 32]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1.0}
          />
        </mesh>
      </Float>

      {/* Neon Cyber Lime Octahedron */}
      <Float speed={2.4} rotationIntensity={1.2} floatIntensity={1.8}>
        <mesh position={[2.4, -1.2, 0.4]}>
          <octahedronGeometry args={[0.35]} />
          <meshStandardMaterial
            color="#CCFF00"
            emissive="#CCFF00"
            emissiveIntensity={1.2}
          />
        </mesh>
      </Float>

      {/* Glossy Strawberry Pop Donut */}
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1.2}>
        <group position={[2.5, 1.2, -0.4]} scale={0.75}>
          <mesh>
            <torusGeometry args={[0.7, 0.32, 16, 32]} />
            <meshPhysicalMaterial color="#F59E0B" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <torusGeometry args={[0.7, 0.3, 16, 32]} />
            <meshPhysicalMaterial
              color="#FF007A"
              roughness={0.1}
              metalness={0.1}
              clearcoat={1.0}
            />
          </mesh>
        </group>
      </Float>

      {/* Translucent Frosted Soda Tumbler */}
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1}>
        <group position={[-2.4, -1.1, 0.5]} scale={0.7}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.55, 0.4, 1.3, 32]} />
            <meshPhysicalMaterial
              color="#0066FF"
              transmission={0.6}
              opacity={0.85}
              transparent
              roughness={0.15}
              clearcoat={1.0}
            />
          </mesh>
          <mesh position={[0.15, 0.9, 0]} rotation={[0, 0, -0.2]}>
            <cylinderGeometry args={[0.04, 0.04, 1.1, 16]} />
            <meshStandardMaterial color="#CCFF00" emissive="#CCFF00" emissiveIntensity={0.6} />
          </mesh>
        </group>
      </Float>
    </>
  );
}

export default function HeroScene() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 1.2, 5.8], fov: 42 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Studio Fashion Lighting */}
          <ambientLight intensity={0.7} />
          <directionalLight position={[6, 8, 6]} intensity={1.8} color="#FFFFFF" />
          
          {/* Vivid Rim Lighting */}
          <pointLight position={[-4, 3, 2]} intensity={2.8} color="#FF3366" />
          <pointLight position={[4, -2, 2]} intensity={2.4} color="#CCFF00" />
          <pointLight position={[0, 4, -4]} intensity={2.2} color="#0066FF" />

          {/* Centerpiece 3D Pop Burger */}
          <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.6}>
            <ContemporaryPopBurger position={[0, 0, 0]} scale={1.22} />
          </Float>

          {/* Polished Chrome Orbit Accent */}
          <SculpturalChromeAccents />

          {/* Surrounding Floating Pop Art */}
          <FloatingArtObjects />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.6}
            maxPolarAngle={Math.PI / 1.75}
            minPolarAngle={Math.PI / 2.3}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
