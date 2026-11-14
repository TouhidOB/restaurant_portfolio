import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Camera controller that smoothly transitions to current viewpoint
function CameraController({ currentPos, currentTarget }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(...currentPos));
  const lookTarget = useRef(new THREE.Vector3(...currentTarget));

  useEffect(() => {
    targetPos.current.set(...currentPos);
    lookTarget.current.set(...currentTarget);
  }, [currentPos, currentTarget]);

  useFrame(() => {
    camera.position.lerp(targetPos.current, 0.045);
    camera.lookAt(lookTarget.current);
  });

  return null;
}

// 3D Procedural Skyline Rooftop Tour Environment
function RooftopArchitecture({ activeIndex }) {
  const archRef = useRef();

  return (
    <group ref={archRef}>
      {/* 1. Main Deck Floor: Teak Wood Terrace & Polished Stone */}
      <mesh position={[0, -0.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[26, 26]} />
        <meshStandardMaterial color="#1E2835" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Cantilevered Glass Edge Strip (Extends toward front) */}
      <mesh position={[0, -0.04, 8.5]}>
        <boxGeometry args={[18, 0.1, 3.5]} />
        <meshStandardMaterial
          color="#95C8DB"
          transparent
          opacity={0.45}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Perimeter Frameless Glass Balustrade & Windbreaks */}
      <mesh position={[0, 0.75, 10.2]}>
        <boxGeometry args={[18, 1.5, 0.08]} />
        <meshStandardMaterial
          color="#C2E2EC"
          transparent
          opacity={0.35}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      <mesh position={[0, 1.5, 10.2]}>
        <boxGeometry args={[18.1, 0.06, 0.12]} />
        <meshStandardMaterial color="#D8C3A0" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Left Terrace Parapet */}
      <mesh position={[-9.0, 0.75, 2.0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[16.5, 1.5, 0.08]} />
        <meshStandardMaterial color="#C2E2EC" transparent opacity={0.35} roughness={0.1} />
      </mesh>
      {/* Right Terrace Parapet */}
      <mesh position={[9.0, 0.75, 2.0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[16.5, 1.5, 0.08]} />
        <meshStandardMaterial color="#C2E2EC" transparent opacity={0.35} roughness={0.1} />
      </mesh>

      {/* 2. Arrival Elevator Vestibule (Left Section) */}
      <group position={[-5.5, 0, -2.5]}>
        {/* Backlit Champagne Onyx Portal Wall */}
        <mesh position={[0, 2.2, -1.8]} receiveShadow>
          <boxGeometry args={[4.8, 4.4, 0.25]} />
          <meshStandardMaterial
            color="#EFE6D8"
            emissive="#D8C3A0"
            emissiveIntensity={0.6}
            roughness={0.3}
          />
        </mesh>

        {/* High-Speed Elevator Doors (Bronze Brushed Stainless) */}
        <mesh position={[0, 1.4, -1.6]}>
          <boxGeometry args={[2.2, 2.8, 0.1]} />
          <meshStandardMaterial color="#C47A56" metalness={0.95} roughness={0.25} />
        </mesh>
        <mesh position={[0, 1.4, -1.54]}>
          <boxGeometry args={[0.04, 2.8, 0.05]} />
          <meshStandardMaterial color="#101C2C" />
        </mesh>

        {/* Host Concierge Counter */}
        <mesh position={[0, 0.6, 0.2]} castShadow receiveShadow>
          <boxGeometry args={[2.4, 1.15, 0.9]} />
          <meshStandardMaterial color="#162438" metalness={0.7} roughness={0.3} />
        </mesh>
        <pointLight position={[0, 2.2, 0]} intensity={2.5} color="#E7A75B" distance={5} />
      </group>

      {/* 3. Open-Air Sunset Dining Terrace (Center Front) */}
      <group position={[0, 0, 2.5]}>
        {/* Glowing Linear Sunset Fire Pit */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[4.2, 0.35, 0.8]} />
          <meshStandardMaterial color="#C47A56" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.38, 0]}>
          <boxGeometry args={[3.8, 0.08, 0.4]} />
          <meshStandardMaterial
            color="#FF934F"
            emissive="#E7A75B"
            emissiveIntensity={2.0}
            roughness={0.2}
          />
        </mesh>
        <pointLight position={[0, 0.8, 0]} intensity={3.5} color="#FF9A42" distance={7.5} />

        {/* Terrace Dining Tables & Chairs */}
        {[-2.8, 2.8].map((x, ti) => (
          <group key={`terr-table-${ti}`} position={[x, 0, -0.5]}>
            <mesh position={[0, 0.42, 0]} castShadow>
              <cylinderGeometry args={[0.06, 0.25, 0.84, 16]} />
              <meshStandardMaterial color="#171C22" metalness={0.8} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.84, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.75, 0.75, 0.05, 32]} />
              <meshStandardMaterial color="#D8C3A0" roughness={0.4} metalness={0.3} />
            </mesh>
            <pointLight position={[0, 1.0, 0]} intensity={0.9} color="#FFE1A8" distance={2.5} />
          </group>
        ))}
      </group>

      {/* 4. Indoor Glasshouse Dining Lounge (Right Section) */}
      <group position={[5.2, 0, -1.5]}>
        {/* Double-Height Glass Ceiling & Slanted Pergola */}
        <mesh position={[0, 4.4, 0]} rotation={[0.08, 0, 0]}>
          <boxGeometry args={[6.4, 0.12, 7.5]} />
          <meshStandardMaterial color="#162438" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Champagne Bronze Framing Beams */}
        {[-2.8, 0, 2.8].map((x, bi) => (
          <mesh key={`framing-${bi}`} position={[x, 2.2, 0]} castShadow>
            <boxGeometry args={[0.18, 4.4, 0.18]} />
            <meshStandardMaterial color="#D8C3A0" metalness={0.85} roughness={0.25} />
          </mesh>
        ))}

        {/* Low-Iron Outer Glass Walls */}
        <mesh position={[0, 2.2, 3.6]}>
          <planeGeometry args={[6.2, 4.2]} />
          <meshStandardMaterial color="#DDF2F8" transparent opacity={0.3} roughness={0.1} />
        </mesh>

        {/* Curved Velvet Booth Dining Banquette */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.6, 0.9, 1.4]} />
          <meshStandardMaterial color="#101C2C" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.85, 0]}>
          <boxGeometry args={[2.8, 0.06, 1.0]} />
          <meshStandardMaterial color="#D8C3A0" roughness={0.3} />
        </mesh>
        <pointLight position={[0, 2.8, 0]} intensity={3.0} color="#E7A75B" distance={6.5} />
      </group>

      {/* 5. Horizon Onyx Bar & Sunset Alcove (Back Left) */}
      <group position={[-5.2, 0, 2.8]}>
        {/* 12-Meter Backlit Golden Onyx Bar Counter */}
        <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.2, 1.25, 1.2]} />
          <meshStandardMaterial
            color="#FFDF9E"
            emissive="#E7A75B"
            emissiveIntensity={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* High-Top Bar Stools */}
        {[-1.8, -0.6, 0.6, 1.8].map((x, si) => (
          <group key={`stool-${si}`} position={[x, 0, 1.1]}>
            <mesh position={[0, 0.42, 0]} castShadow>
              <cylinderGeometry args={[0.04, 0.16, 0.84, 16]} />
              <meshStandardMaterial color="#171C22" metalness={0.8} />
            </mesh>
            <mesh position={[0, 0.85, 0]} castShadow>
              <cylinderGeometry args={[0.26, 0.26, 0.08, 16]} />
              <meshStandardMaterial color="#C47A56" roughness={0.6} />
            </mesh>
          </group>
        ))}

        {/* Shelving for Rare Vintage Cellar Spirits Behind Bar */}
        <mesh position={[0, 2.0, -1.2]}>
          <boxGeometry args={[4.8, 2.4, 0.25]} />
          <meshStandardMaterial color="#162438" roughness={0.4} />
        </mesh>
        <pointLight position={[0, 2.0, 0]} intensity={2.8} color="#FFB85A" distance={6} />
      </group>

      {/* Distant Panoramic Skyline Towers in the Horizon */}
      <group position={[0, -4.5, -12.0]}>
        {[-12, -8, -4, 0, 4, 8, 12].map((x, idx) => {
          const height = 6.0 + Math.sin(idx * 1.8) * 2.5;
          return (
            <mesh key={`tower-${idx}`} position={[x, height / 2, 0]}>
              <boxGeometry args={[2.5, height, 2.5]} />
              <meshStandardMaterial color="#0A121D" roughness={0.7} metalness={0.5} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

export default function RestaurantTour({ viewpoints, activeIndex, onSelectViewpoint }) {
  const currentView = viewpoints[activeIndex] || viewpoints[0];

  return (
    <div style={{ position: 'relative', width: '100%', height: '560px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: currentView.cameraPos, fov: 45 }}
        style={{ width: '100%', height: '100%', background: 'radial-gradient(ellipse at 50% 30%, #1D2E45 0%, #101C2C 55%, #0A121D 100%)' }}
        shadows
      >
        <ambientLight intensity={0.65} color="#64788A" />
        <directionalLight position={[-8, 6, 4]} intensity={1.5} color="#E7A75B" castShadow />
        <directionalLight position={[8, 4, -4]} intensity={0.8} color="#263F5A" />

        <CameraController
          currentPos={currentView.cameraPos}
          currentTarget={currentView.target}
        />

        <RooftopArchitecture activeIndex={activeIndex} />
      </Canvas>

      {/* Floating Viewpoint Navigation Controls Overlay */}
      <div style={{
        position: 'absolute',
        bottom: '1.25rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '0.5rem',
        background: 'rgba(16, 28, 44, 0.88)',
        backdropFilter: 'blur(10px)',
        padding: '0.45rem 0.65rem',
        borderRadius: '30px',
        border: '1px solid var(--color-border)',
        zIndex: 10,
        maxWidth: '92%',
        overflowX: 'auto'
      }}>
        {viewpoints.map((vp, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={vp.id}
              onClick={() => onSelectViewpoint(index)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.95rem',
                borderRadius: '20px',
                border: 'none',
                background: isActive ? 'var(--color-champagne)' : 'transparent',
                color: isActive ? 'var(--color-midnight-dark)' : 'var(--color-cloud-ivory)',
                fontSize: '0.78rem',
                fontWeight: '700',
                letterSpacing: '0.04em',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                fontFamily: 'var(--font-accent)'
              }}
            >
              <span style={{
                color: isActive ? 'var(--color-midnight)' : 'var(--color-champagne)',
                fontWeight: '800'
              }}>
                {vp.number}
              </span>
              <span>{vp.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Viewpoint Info Badge Overlay (Top Left) */}
      <div style={{
        position: 'absolute',
        top: '1.25rem',
        left: '1.25rem',
        background: 'rgba(16, 28, 44, 0.85)',
        backdropFilter: 'blur(8px)',
        border: '1px solid var(--color-border)',
        borderRadius: '3px',
        padding: '0.85rem 1.25rem',
        zIndex: 10,
        maxWidth: '380px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
          <span style={{ color: 'var(--color-sunset-copper)', fontWeight: '800', fontFamily: 'var(--font-accent)', fontSize: '0.85rem' }}>
            VIEWPOINT {currentView.number}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-champagne)' }}>&bull; 220M ELEVATION</span>
        </div>
        <h4 style={{ fontSize: '1.15rem', color: 'var(--color-cloud-ivory)', fontFamily: 'var(--font-display)', marginBottom: '0.35rem' }}>
          {currentView.name}
        </h4>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-twilight-slate)', lineHeight: 1.5 }}>
          {currentView.description}
        </p>
      </div>
    </div>
  );
}
