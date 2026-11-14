import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

// Fire Embers rising from the kitchen grill
function HearthEmbers({ count = 40 }) {
  const meshRef = useRef();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 3,
        y: Math.random() * 4,
        z: -2 + (Math.random() - 0.5) * 2,
        speed: 0.015 + Math.random() * 0.02,
        scale: 0.03 + Math.random() * 0.04,
        flicker: Math.random() * Math.PI,
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      p.y += p.speed;
      p.flicker += 0.05;
      if (p.y > 4.5) {
        p.y = 0.2;
        p.x = (Math.random() - 0.5) * 3;
      }
      dummy.position.set(p.x, p.y, p.z);
      const s = p.scale * (0.8 + Math.sin(p.flicker) * 0.3);
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#FF7A33" transparent opacity={0.85} />
    </instancedMesh>
  );
}

// 3D Architectural Steakhouse Façade & Entrance
function SteakhouseArchitecture() {
  const hearthGlowRef = useRef();

  useFrame((state) => {
    if (hearthGlowRef.current) {
      hearthGlowRef.current.intensity = 2.2 + Math.sin(state.clock.elapsedTime * 4) * 0.6;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Dark Basalt Stone Ground Plane with Wet Specular Reflections */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 40]} />
        <meshStandardMaterial
          color="#121212"
          roughness={0.25}
          metalness={0.65}
        />
      </mesh>

      {/* Main Building Monolithic Façade */}
      <mesh position={[0, 6, -5]} receiveShadow>
        <boxGeometry args={[26, 12, 4]} />
        <meshStandardMaterial
          color="#1C1B19"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      {/* Architectural Fluted Dark Walnut Pillars */}
      {[-7, -3.5, 3.5, 7].map((x, i) => (
        <group key={i} position={[x, 5, -2.8]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.45, 0.5, 10, 16]} />
            <meshStandardMaterial
              color="#292724"
              roughness={0.5}
              metalness={0.4}
            />
          </mesh>
          {/* Bronze Pillar Rings */}
          <mesh position={[0, 4.6, 0]}>
            <cylinderGeometry args={[0.52, 0.52, 0.2, 16]} />
            <meshStandardMaterial color="#94734F" roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh position={[0, -4.6, 0]}>
            <cylinderGeometry args={[0.52, 0.52, 0.2, 16]} />
            <meshStandardMaterial color="#94734F" roughness={0.3} metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Grand Entrance Smoked Glass Portal */}
      <group position={[0, 2.8, -2.8]}>
        {/* Bronze Architrave Portal Frame */}
        <mesh position={[0, 0, -0.1]}>
          <boxGeometry args={[4.8, 5.8, 0.3]} />
          <meshStandardMaterial color="#94734F" roughness={0.35} metalness={0.85} />
        </mesh>
        {/* Smoked Translucent Glass Doors */}
        <mesh position={[0, 0, 0.05]}>
          <boxGeometry args={[4.4, 5.4, 0.1]} />
          <meshPhysicalMaterial
            color="#1C1B19"
            roughness={0.1}
            transmission={0.7}
            thickness={0.8}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Vertical Brushed Bronze Door Pull Handles */}
        <mesh position={[-0.3, 0, 0.2]}>
          <cylinderGeometry args={[0.04, 0.04, 2.2, 12]} />
          <meshStandardMaterial color="#C4A878" roughness={0.25} metalness={0.9} />
        </mesh>
        <mesh position={[0.3, 0, 0.2]}>
          <cylinderGeometry args={[0.04, 0.04, 2.2, 12]} />
          <meshStandardMaterial color="#C4A878" roughness={0.25} metalness={0.9} />
        </mesh>
      </group>

      {/* Interior Warm Dining Illumination shining through glass */}
      <pointLight
        position={[0, 3, -4.5]}
        color="#D89A4B"
        intensity={3.2}
        distance={14}
        decay={2}
      />

      {/* Open Hearth Grill Window Glow (Left side) */}
      <group position={[-5.2, 2.5, -2.8]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.8, 3.8, 0.1]} />
          <meshPhysicalMaterial color="#301A10" transmission={0.65} roughness={0.2} transparent opacity={0.7} />
        </mesh>
        <pointLight
          ref={hearthGlowRef}
          position={[0, 0.5, -1.2]}
          color="#FF6B2B"
          intensity={2.8}
          distance={10}
        />
        <HearthEmbers count={35} />
      </group>

      {/* Sommelier Wine Vault Window (Right side) */}
      <group position={[5.2, 2.5, -2.8]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.8, 3.8, 0.1]} />
          <meshPhysicalMaterial color="#1a1c24" transmission={0.7} roughness={0.15} transparent opacity={0.8} />
        </mesh>
        {/* Champagne Gold Warm Backlight */}
        <pointLight position={[0, 1, -1.2]} color="#C4A878" intensity={1.8} distance={8} />
      </group>

      {/* Architectural Entrance Cornice & Canopy */}
      <mesh position={[0, 6.2, -2]} castShadow>
        <boxGeometry args={[18, 0.4, 3.2]} />
        <meshStandardMaterial color="#292724" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Bronze Exterior Signboard Panel */}
      <group position={[0, 6.8, -2.2]}>
        <mesh castShadow>
          <boxGeometry args={[9.5, 1.2, 0.15]} />
          <meshStandardMaterial color="#1C1B19" roughness={0.4} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[9.7, 1.35, 0.05]} />
          <meshStandardMaterial color="#94734F" roughness={0.3} metalness={0.85} />
        </mesh>
        {/* Restaurant Name in 3D Typography */}
        <Text
          position={[0, 0, 0.14]}
          fontSize={0.52}
          color="#EDE5D8"
          font="https://fonts.gstatic.com/s/cormorantgaramond/v16/0FlUPGDAcGxY4-DUPl5bHs2x-g.woff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.18}
        >
          CHARRED & PRIME
        </Text>
      </group>

      {/* Downward Architectural Spotlights illuminating Entrance */}
      <spotLight
        position={[0, 6, -1]}
        target-position={[0, 0, -2]}
        angle={0.6}
        penumbra={0.8}
        intensity={2.5}
        color="#D89A4B"
        castShadow
      />
      <spotLight
        position={[-4.5, 6, -1]}
        target-position={[-4.5, 1, -2]}
        angle={0.5}
        penumbra={0.8}
        intensity={1.5}
        color="#C4A878"
      />
      <spotLight
        position={[4.5, 6, -1]}
        target-position={[4.5, 1, -2]}
        angle={0.5}
        penumbra={0.8}
        intensity={1.5}
        color="#C4A878"
      />
    </group>
  );
}

// Camera Rig with soft Parallax lerp
function CameraRig() {
  useFrame((state) => {
    const { x, y } = state.pointer;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x * 1.5, 0.03);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 4.2 + y * 0.8, 0.03);
    state.camera.lookAt(0, 2.4, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 4.2, 15], fov: 42 }}
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#101010']} />
        
        {/* Ambient base lighting */}
        <ambientLight intensity={0.7} color="#282522" />
        
        {/* Soft directional exterior moonlight */}
        <directionalLight
          position={[8, 16, 12]}
          intensity={0.9}
          color="#C5B9A6"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        {/* 3D Steakhouse Architecture */}
        <SteakhouseArchitecture />
        
        {/* Subtle camera drift */}
        <CameraRig />

        {/* Orbit controls with strict constraints to preserve architectural composition */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.02}
          minPolarAngle={Math.PI / 3}
          maxAzimuthAngle={Math.PI / 8}
          minAzimuthAngle={-Math.PI / 8}
          rotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
}
