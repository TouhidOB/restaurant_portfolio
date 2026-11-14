import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Floating Pollen and Sun Dust Particles
function BotanicalDustParticles({ count = 80 }) {
  const mesh = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 14;
      const y = Math.random() * 7 + 0.2;
      const z = (Math.random() - 0.5) * 12;
      const speed = 0.003 + Math.random() * 0.005;
      const factor = Math.random() * Math.PI * 2;
      temp.push({ x, y, z, speed, factor });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    particles.forEach((p, i) => {
      p.y -= p.speed;
      if (p.y < 0.2) p.y = 7.2;
      const swayX = Math.sin(time * 0.8 + p.factor) * 0.06;
      const swayZ = Math.cos(time * 0.8 + p.factor) * 0.06;
      dummy.position.set(p.x + swayX, p.y, p.z + swayZ);
      dummy.scale.setScalar(0.04 + Math.sin(time * 2 + i) * 0.012);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#FFF5DC" transparent opacity={0.7} />
    </instancedMesh>
  );
}

// Procedural Monstera Leaf Component
function MonsteraLeaf({ position, rotation, scale = 1, color = "#263F35" }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.015, 0.02, 0.8, 8]} />
        <meshStandardMaterial color="#4A654C" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.5, 0.1]} rotation={[0.4, 0, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.35, 12, 12]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.65, 0.15]} rotation={[0.2, 0, 0]} castShadow>
        <coneGeometry args={[0.32, 0.5, 8]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
    </group>
  );
}

// 3D Glasshouse Conservatory Pavilion
function ConservatoryEnvironment() {
  const plantsGroup = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (plantsGroup.current) {
      plantsGroup.current.rotation.z = Math.sin(t * 0.6) * 0.012;
      plantsGroup.current.position.y = Math.sin(t * 0.4) * 0.01;
    }
  });

  return (
    <group position={[0, -1.0, 0]}>
      {/* 1. Honed Travertine Stone Floor with Defined Pattern */}
      <mesh position={[0, -0.02, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#D2CAB9" roughness={0.6} metalness={0.08} />
      </mesh>

      {/* Warm Oak Central Walkway */}
      <mesh position={[0, 0.01, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.2, 20]} />
        <meshStandardMaterial color="#8F6B4C" roughness={0.5} metalness={0.05} />
      </mesh>

      {/* 2. Glasshouse Steel Columns & Cathedral Pitched Trusses */}
      {/* Dark Forest Green Architectural Columns */}
      {[-4.2, 4.2].map((x, i) => (
        <group key={i}>
          {[-4.5, -1.5, 1.5, 4.5].map((z, j) => (
            <group key={j} position={[x, 2.8, z]}>
              <mesh castShadow receiveShadow>
                <boxGeometry args={[0.24, 5.6, 0.24]} />
                <meshStandardMaterial color="#16241D" roughness={0.35} metalness={0.6} />
              </mesh>
              {/* Decorative Copper Collar */}
              <mesh position={[0, 1.8, 0]}>
                <boxGeometry args={[0.28, 0.1, 0.28]} />
                <meshStandardMaterial color="#A87958" metalness={0.8} roughness={0.3} />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* Cross Beams */}
      {[-4.5, -1.5, 1.5, 4.5].map((z, j) => (
        <mesh key={j} position={[0, 5.6, z]} castShadow>
          <boxGeometry args={[8.6, 0.2, 0.2]} />
          <meshStandardMaterial color="#16241D" roughness={0.4} metalness={0.6} />
        </mesh>
      ))}

      {/* Pitched Cathedral Roof Trusses */}
      <group position={[0, 6.6, 0]}>
        {/* Left Pitched Glass Roof Panel */}
        <mesh position={[-2.2, 0, 0]} rotation={[0, 0, -Math.PI / 5.5]}>
          <boxGeometry args={[4.8, 0.06, 15]} />
          <meshPhysicalMaterial
            color="#D8E8D8"
            transparent
            opacity={0.48}
            roughness={0.1}
            transmission={0.88}
            thickness={0.6}
            reflectivity={0.7}
          />
        </mesh>
        {/* Right Pitched Glass Roof Panel */}
        <mesh position={[2.2, 0, 0]} rotation={[0, 0, Math.PI / 5.5]}>
          <boxGeometry args={[4.8, 0.06, 15]} />
          <meshPhysicalMaterial
            color="#D8E8D8"
            transparent
            opacity={0.48}
            roughness={0.1}
            transmission={0.88}
            thickness={0.6}
            reflectivity={0.7}
          />
        </mesh>

        {/* Central Ridge Beam */}
        <mesh position={[0, 1.45, 0]}>
          <boxGeometry args={[0.28, 0.28, 15.2]} />
          <meshStandardMaterial color="#16241D" roughness={0.4} metalness={0.7} />
        </mesh>
      </group>

      {/* 3. Central Natural Oak Communal Table Setup */}
      <group position={[0, 0.45, 0.8]}>
        {/* Solid White Oak Tabletop */}
        <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.1, 3.6]} />
          <meshStandardMaterial color="#BCA182" roughness={0.45} metalness={0.05} />
        </mesh>
        {/* Matte Black Steel Table Base */}
        {[-0.8, 0.8].map((lx, i) => (
          [-1.5, 1.5].map((lz, j) => (
            <mesh key={`${i}-${j}`} position={[lx, 0.2, lz]} castShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.42, 16]} />
              <meshStandardMaterial color="#16241D" roughness={0.4} />
            </mesh>
          ))
        ))}

        {/* Ceramic Pour-Over & Coffee Ritual */}
        <group position={[0.3, 0.52, 0.2]}>
          {/* Ceramic Carafe */}
          <mesh position={[0, 0.1, 0]} castShadow>
            <cylinderGeometry args={[0.1, 0.08, 0.2, 16]} />
            <meshStandardMaterial color="#FAF7F0" roughness={0.25} />
          </mesh>
          {/* Copper Pour-Over Dripper */}
          <mesh position={[0, 0.24, 0]}>
            <coneGeometry args={[0.12, 0.14, 16]} />
            <meshStandardMaterial color="#A87958" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Ceramic Cup */}
          <mesh position={[-0.32, 0.07, 0.15]} castShadow>
            <cylinderGeometry args={[0.07, 0.05, 0.12, 16]} />
            <meshStandardMaterial color="#FAF7F0" roughness={0.3} />
          </mesh>
          {/* Small Potted Table Succulent */}
          <mesh position={[0.2, 0.06, -0.4]}>
            <cylinderGeometry args={[0.08, 0.06, 0.1, 12]} />
            <meshStandardMaterial color="#D8D2C5" roughness={0.6} />
          </mesh>
          <mesh position={[0.2, 0.13, -0.4]}>
            <sphereGeometry args={[0.07, 10, 10]} />
            <meshStandardMaterial color="#4A654C" roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* 4. Lush Foliage, Potted Palms & Vertical Greens */}
      <group ref={plantsGroup}>
        {/* Left Lush Palm & Monstera Cluster */}
        <group position={[-2.8, 0, 0.2]}>
          {/* Terracotta Urn */}
          <mesh position={[0, 0.45, 0]} castShadow>
            <cylinderGeometry args={[0.55, 0.38, 0.9, 16]} />
            <meshStandardMaterial color="#A87958" roughness={0.65} />
          </mesh>
          {/* Mature Palm Trunk */}
          <mesh position={[0, 1.8, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.12, 2.2, 12]} />
            <meshStandardMaterial color="#5C4837" roughness={0.8} />
          </mesh>
          {/* Layered Tropical Fronds */}
          <mesh position={[0, 2.8, 0]} castShadow>
            <coneGeometry args={[1.5, 0.9, 8]} />
            <meshStandardMaterial color="#1E382B" roughness={0.55} />
          </mesh>
          <mesh position={[0, 3.4, 0]} castShadow>
            <coneGeometry args={[1.1, 0.7, 8]} />
            <meshStandardMaterial color="#2E5339" roughness={0.55} />
          </mesh>
          {/* Monstera Leaves Surrounding Pot Base */}
          <MonsteraLeaf position={[0.3, 0.6, 0.3]} rotation={[0.4, 0.5, -0.2]} scale={1.1} color="#263F35" />
          <MonsteraLeaf position={[-0.3, 0.5, 0.2]} rotation={[0.3, -0.6, 0.3]} scale={0.9} color="#355642" />
        </group>

        {/* Right Lush Palm & Ficus Cluster */}
        <group position={[2.8, 0, -0.4]}>
          {/* Fluted Stone Planter */}
          <mesh position={[0, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.58, 0.45, 1.0, 16]} />
            <meshStandardMaterial color="#D8D2C5" roughness={0.6} />
          </mesh>
          {/* Trunk */}
          <mesh position={[0, 2.0, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.13, 2.4, 12]} />
            <meshStandardMaterial color="#5C4837" roughness={0.8} />
          </mesh>
          {/* Foliage Canopy */}
          <mesh position={[0, 3.1, 0]} castShadow>
            <sphereGeometry args={[1.15, 16, 16]} />
            <meshStandardMaterial color="#263F35" roughness={0.6} />
          </mesh>
          <mesh position={[0, 4.0, 0]} castShadow>
            <sphereGeometry args={[0.85, 14, 14]} />
            <meshStandardMaterial color="#4A654C" roughness={0.6} />
          </mesh>
          <MonsteraLeaf position={[-0.4, 0.7, 0.2]} rotation={[0.4, -0.4, 0.3]} scale={1.2} color="#1E382B" />
        </group>

        {/* Background Tropical Canopy Trees */}
        {[-2.2, 0, 2.2].map((bx, k) => (
          <group key={k} position={[bx, 0, -4.8]}>
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.4, 0.3, 0.8, 14]} />
              <meshStandardMaterial color="#16241D" roughness={0.7} />
            </mesh>
            <mesh position={[0, 2.5, 0]} castShadow>
              <cylinderGeometry args={[0.08, 0.12, 3.8, 12]} />
              <meshStandardMaterial color="#5C4837" roughness={0.8} />
            </mesh>
            <mesh position={[0, 4.2, 0]} castShadow>
              <coneGeometry args={[1.8, 1.4, 8]} />
              <meshStandardMaterial color={k === 1 ? "#1E382B" : "#2E5339"} roughness={0.6} />
            </mesh>
          </group>
        ))}

        {/* Hanging Terrariums / Brass Pendants */}
        {[-1.8, 1.8].map((hx, idx) => (
          <group key={idx} position={[hx, 4.8, 0]}>
            <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.01, 0.01, 1.0, 8]} />
              <meshStandardMaterial color="#A87958" metalness={0.8} />
            </mesh>
            {/* Glass Globe */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshPhysicalMaterial color="#FAF7F0" transparent opacity={0.6} transmission={0.9} roughness={0.1} />
            </mesh>
            {/* Warm Glowing Bulb Inside */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshBasicMaterial color="#FFE8B5" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      <Canvas
        camera={{ position: [0, 1.7, 5.8], fov: 44 }}
        shadows
        style={{
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse at 50% 20%, #E2ECE2 0%, #D8D2C5 55%, #FAF7F0 100%)',
        }}
      >
        {/* Soft Ambient Light */}
        <ambientLight intensity={0.65} color="#FAF7F0" />

        {/* Direct Radiant Sun Rays through Glass Roof */}
        <directionalLight
          position={[6, 9, 3]}
          intensity={2.2}
          color="#FFE9BA"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={25}
          shadow-camera-left={-8}
          shadow-camera-right={8}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
        />

        {/* Diffused Sky Blue Light */}
        <directionalLight position={[-6, 7, -3]} intensity={0.85} color="#D7E8DA" />

        {/* Warm Low Light for Depth */}
        <pointLight position={[0, 4.2, 0.5]} intensity={1.2} color="#FFDF9E" distance={12} />

        <ConservatoryEnvironment />
        <BotanicalDustParticles count={75} />

        {/* Orbit Controls with controlled angles so scrolling remains smooth */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minPolarAngle={Math.PI / 3.5}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          rotateSpeed={0.6}
        />
      </Canvas>

      {/* Floating 3D Interaction Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '28px',
          zIndex: 5,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 14px',
          backgroundColor: 'rgba(26, 43, 36, 0.82)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(166, 181, 160, 0.35)',
          borderRadius: '30px',
          color: '#FAF7F0',
          fontSize: '11px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontWeight: 600,
          pointerEvents: 'none',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
        }}
      >
        <span style={{ fontSize: '13px' }}>🌿</span>
        <span>Interactive 3D Glasshouse • Drag to explore</span>
      </div>
    </div>
  );
}
