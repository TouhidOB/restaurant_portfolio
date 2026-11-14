import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, Cylinder, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

// 3D Pop Art Burger
function PopBurger(props) {
  const burgerRef = useRef();

  useFrame((state) => {
    if (burgerRef.current) {
      burgerRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <group ref={burgerRef} {...props}>
      {/* Top Bun */}
      <mesh position={[0, 0.75, 0]}>
        <sphereGeometry args={[1.2, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#E89746" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Sesame Seeds */}
      {[
        [-0.4, 1.25, 0.3], [0.3, 1.28, 0.2], [-0.1, 1.32, -0.4],
        [0.5, 1.22, -0.3], [-0.5, 1.15, -0.2], [0.2, 1.29, 0.5]
      ].map((pos, i) => (
        <mesh key={i} position={pos} rotation={[0.2, i * 0.5, 0]}>
          <coneGeometry args={[0.04, 0.08, 5]} />
          <meshStandardMaterial color="#FFF5E6" />
        </mesh>
      ))}

      {/* Melted Cheese (drips over sides) */}
      <mesh position={[0, 0.55, 0]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[1.9, 0.08, 1.9]} />
        <meshStandardMaterial color="#FFD928" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Patty */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.32, 32]} />
        <meshStandardMaterial color="#4A2613" roughness={0.8} />
      </mesh>

      {/* Wavy Lettuce */}
      <mesh position={[0, 0.15, 0]} rotation={[0, 0.7, 0]}>
        <cylinderGeometry args={[1.3, 1.3, 0.08, 16]} />
        <meshStandardMaterial color="#00C389" roughness={0.4} />
      </mesh>

      {/* Tomato Slice */}
      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[1.15, 1.15, 0.12, 32]} />
        <meshStandardMaterial color="#F04438" roughness={0.3} />
      </mesh>

      {/* Bottom Bun */}
      <mesh position={[0, -0.22, 0]}>
        <cylinderGeometry args={[1.15, 1.1, 0.28, 32]} />
        <meshStandardMaterial color="#E89746" roughness={0.4} />
      </mesh>
    </group>
  );
}

// 3D Pop Art Donut with Sprinkles
function PopDonut(props) {
  const donutRef = useRef();

  useFrame((state) => {
    if (donutRef.current) {
      donutRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
      donutRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group ref={donutRef} {...props}>
      {/* Dough */}
      <mesh>
        <torusGeometry args={[0.7, 0.35, 16, 32]} />
        <meshStandardMaterial color="#F2A65A" roughness={0.4} />
      </mesh>
      {/* Pink Icing */}
      <mesh position={[0, 0.08, 0]} scale={[1.02, 1.05, 1.02]}>
        <torusGeometry args={[0.7, 0.32, 16, 32, Math.PI * 1.8]} />
        <meshStandardMaterial color="#FF4D8D" roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Multi-colored Sprinkles */}
      {[
        [-0.4, 0.38, 0.3], [0.4, 0.38, -0.2], [-0.2, 0.39, -0.5],
        [0.3, 0.39, 0.4], [-0.5, 0.37, -0.1], [0.6, 0.36, 0.1]
      ].map((pos, i) => (
        <mesh key={i} position={pos} rotation={[0.4, i, 0]}>
          <boxGeometry args={[0.06, 0.03, 0.12]} />
          <meshStandardMaterial color={['#FFD928', '#2455D6', '#00C389', '#FFFFFF'][i % 4]} />
        </mesh>
      ))}
    </group>
  );
}

// 3D Milkshake Cup with Striped Straw
function PopShake(props) {
  const shakeRef = useRef();

  useFrame((state) => {
    if (shakeRef.current) {
      shakeRef.current.rotation.y = -state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={shakeRef} {...props}>
      {/* Cup Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.55, 0.38, 1.4, 32]} />
        <meshStandardMaterial color="#2455D6" roughness={0.3} />
      </mesh>
      {/* White Whipped Cream */}
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.6} />
      </mesh>
      {/* Red Cherry On Top */}
      <mesh position={[0, 1.4, 0]}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color="#F04438" roughness={0.1} metalness={0.2} />
      </mesh>
      {/* Straw */}
      <mesh position={[0.2, 1.2, 0]} rotation={[0, 0, -0.25]}>
        <cylinderGeometry args={[0.04, 0.04, 1.2, 16]} />
        <meshStandardMaterial color="#FFD928" />
      </mesh>
    </group>
  );
}

// Floating Comic Geometry Elements (halftone balls, cubes, stars)
function FloatingElements() {
  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[-2.8, 1.6, -1]}>
          <boxGeometry args={[0.45, 0.45, 0.45]} />
          <meshStandardMaterial color="#FFD928" />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[2.9, -0.8, -0.5]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial color="#F04438" />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[-2.2, -1.5, 1]}>
          <torusGeometry args={[0.35, 0.1, 16, 32]} />
          <meshStandardMaterial color="#2455D6" />
        </mesh>
      </Float>

      <Float speed={2.2} rotationIntensity={1.2} floatIntensity={1.8}>
        <mesh position={[2.4, 1.8, 0.8]}>
          <octahedronGeometry args={[0.38]} />
          <meshStandardMaterial color="#00C389" />
        </mesh>
      </Float>
    </>
  );
}

export default function HeroScene() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 1, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          {/* Studio Lights */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} color="#FFFFFF" />
          <pointLight position={[-4, 3, 2]} intensity={2.5} color="#FFD928" />
          <pointLight position={[4, -2, 2]} intensity={2.0} color="#F04438" />
          <pointLight position={[0, 4, -4]} intensity={1.8} color="#2455D6" />

          {/* Centerpiece Pop Burger */}
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
            <PopBurger position={[0, -0.2, 0]} scale={1.2} />
          </Float>

          {/* Side Floating Donut */}
          <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
            <PopDonut position={[-2.4, 0.2, 0.2]} scale={1.1} />
          </Float>

          {/* Side Floating Shake */}
          <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1}>
            <PopShake position={[2.4, 0.1, -0.2]} scale={1.1} />
          </Float>

          <FloatingElements />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.8}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 2.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
