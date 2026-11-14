import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function BotanicalPollenParticles({ count = 65 }) {
  const mesh = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 16;
      const y = Math.random() * 8 + 0.5;
      const z = (Math.random() - 0.5) * 14;
      const speed = 0.002 + Math.random() * 0.004;
      const factor = Math.random() * Math.PI;
      temp.push({ x, y, z, speed, factor });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    particles.forEach((p, i) => {
      p.y -= p.speed;
      if (p.y < 0.2) p.y = 8;
      const swayX = Math.sin(time + p.factor) * 0.08;
      const swayZ = Math.cos(time + p.factor) * 0.08;
      dummy.position.set(p.x + swayX, p.y, p.z + swayZ);
      dummy.scale.setScalar(0.045 + Math.sin(time * 2 + i) * 0.015);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#EBF4E5" transparent opacity={0.65} />
    </instancedMesh>
  );
}

// 3D Procedural Glasshouse Pavilion
function GlasshouseStructure() {
  const plantsGroup = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (plantsGroup.current) {
      plantsGroup.current.rotation.z = Math.sin(t * 0.8) * 0.015;
    }
  });

  return (
    <group position={[0, -1.2, 0]}>
      {/* 1. Honed Travertine Stone Floor */}
      <mesh position={[0, 0, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial color="#D8D2C5" roughness={0.75} metalness={0.05} />
      </mesh>

      {/* Center Wood Inlay Walkway */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.6, 22]} />
        <meshStandardMaterial color="#947458" roughness={0.6} />
      </mesh>

      {/* 2. Steel Trusses & Vaulted Glass Roof */}
      {/* Perimeter Steel Columns */}
      {[-5, 5].map((x, i) => (
        <group key={i}>
          {[-6, -2, 2, 6].map((z, j) => (
            <mesh key={j} position={[x, 3.2, z]} castShadow>
              <boxGeometry args={[0.22, 6.4, 0.22]} />
              <meshStandardMaterial color="#1A2B24" roughness={0.4} metalness={0.7} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Pitched Roof Glass Panels (Left & Right) */}
      <mesh position={[-2.8, 6.2, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[6.2, 0.05, 18]} />
        <meshPhysicalMaterial
          color="#E7EDE7"
          transparent
          opacity={0.35}
          roughness={0.15}
          transmission={0.85}
          thickness={0.5}
        />
      </mesh>
      <mesh position={[2.8, 6.2, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[6.2, 0.05, 18]} />
        <meshPhysicalMaterial
          color="#E7EDE7"
          transparent
          opacity={0.35}
          roughness={0.15}
          transmission={0.85}
          thickness={0.5}
        />
      </mesh>

      {/* Ridge Beam */}
      <mesh position={[0, 7.7, 0]}>
        <boxGeometry args={[0.3, 0.3, 18.2]} />
        <meshStandardMaterial color="#1A2B24" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* 3. Central Oak Communal Table */}
      <group position={[0, 0.5, 0]}>
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.1, 4.2]} />
          <meshStandardMaterial color="#B08F6B" roughness={0.5} />
        </mesh>
        {/* Table Legs */}
        {[-0.9, 0.9].map((lx, i) => (
          [-1.8, 1.8].map((lz, j) => (
            <mesh key={`${i}-${j}`} position={[lx, 0.2, lz]}>
              <cylinderGeometry args={[0.06, 0.06, 0.45, 16]} />
              <meshStandardMaterial color="#1A2B24" roughness={0.5} />
            </mesh>
          ))
        ))}

        {/* Ceramic Pour-Over & Coffee Cup on Table */}
        <mesh position={[0.4, 0.55, 0.3]} castShadow>
          <cylinderGeometry args={[0.08, 0.06, 0.14, 16]} />
          <meshStandardMaterial color="#FAF7F0" roughness={0.3} />
        </mesh>
        <mesh position={[0.4, 0.65, 0.3]}>
          <coneGeometry args={[0.1, 0.12, 16]} />
          <meshStandardMaterial color="#C59370" roughness={0.4} />
        </mesh>
      </group>

      {/* 4. Lush Foliage & Potted Plants Group */}
      <group ref={plantsGroup}>
        {/* Large Fiddle-Leaf Fig / Monsteras */}
        {[-3.2, 3.2].map((px, i) => (
          <group key={i} position={[px, 0, -1.5]}>
            {/* Terracotta Urn */}
            <mesh position={[0, 0.45, 0]} castShadow>
              <cylinderGeometry args={[0.55, 0.4, 0.9, 16]} />
              <meshStandardMaterial color="#A87958" roughness={0.7} />
            </mesh>
            {/* Foliage Canopy */}
            <mesh position={[0, 1.8, 0]} castShadow>
              <sphereGeometry args={[1.1, 16, 16]} />
              <meshStandardMaterial color={i === 0 ? "#263F35" : "#325245"} roughness={0.65} />
            </mesh>
            <mesh position={[0, 2.7, 0]} castShadow>
              <sphereGeometry args={[0.85, 16, 16]} />
              <meshStandardMaterial color="#727C52" roughness={0.65} />
            </mesh>
          </group>
        ))}

        {/* Back Palm Trees */}
        {[-2.5, 0, 2.5].map((bx, k) => (
          <group key={k} position={[bx, 0, -4.5]}>
            <mesh position={[0, 0.35, 0]}>
              <cylinderGeometry args={[0.4, 0.3, 0.7, 16]} />
              <meshStandardMaterial color="#292D29" roughness={0.8} />
            </mesh>
            <mesh position={[0, 2.2, 0]} castShadow>
              <cylinderGeometry args={[0.08, 0.12, 3.2, 12]} />
              <meshStandardMaterial color="#6B5643" roughness={0.8} />
            </mesh>
            {/* Palm Fronds */}
            <mesh position={[0, 3.8, 0]}>
              <coneGeometry args={[1.6, 0.8, 8]} />
              <meshStandardMaterial color="#263F35" roughness={0.6} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

function SceneCameraParallax() {
  useFrame(({ camera, pointer }) => {
    const targetX = pointer.x * 0.7;
    const targetY = 2.2 + pointer.y * 0.35;
    camera.position.x += (targetX - camera.position.x) * 0.035;
    camera.position.y += (targetY - camera.position.y) * 0.035;
    camera.lookAt(0, 1.4, -0.5);
  });
  return null;
}

export default function HeroScene() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <Canvas
        camera={{ position: [0, 2.2, 7.8], fov: 42 }}
        shadows
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.85} color="#FAF7F0" />
        
        {/* Morning Sun Rays entering through Glass Roof */}
        <directionalLight
          position={[6, 9, 4]}
          intensity={1.8}
          color="#FFF2D6"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* Soft Cool Sky Reflection */}
        <directionalLight position={[-6, 6, -4]} intensity={0.6} color="#E7EDE7" />

        <GlasshouseStructure />
        <BotanicalPollenParticles count={60} />
        <SceneCameraParallax />
      </Canvas>
    </div>
  );
}
