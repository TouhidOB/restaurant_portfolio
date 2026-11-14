import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useCMS } from '../../context/CMSContext';

function TourCameraController({ currentPos, currentTarget }) {
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

function VirtualGlasshouseInterior({ activeIndex }) {
  const plantsRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (plantsRef.current) {
      plantsRef.current.position.y = Math.sin(t * 0.7) * 0.02;
    }
  });

  return (
    <group>
      {/* Honed Stone Floor */}
      <mesh position={[0, -0.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[26, 26]} />
        <meshStandardMaterial color="#D8D2C5" roughness={0.7} metalness={0.05} />
      </mesh>

      {/* Glass & Steel Outer Enclosure */}
      {/* Back Wall */}
      <mesh position={[0, 3.2, -8]}>
        <boxGeometry args={[24, 6.4, 0.2]} />
        <meshPhysicalMaterial color="#E7EDE7" transparent opacity={0.3} transmission={0.8} roughness={0.1} />
      </mesh>
      {/* Left Wall with Vertical Living Plant Grid */}
      <mesh position={[-8, 3.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[24, 6.4, 0.3]} />
        <meshStandardMaterial color="#263F35" roughness={0.9} />
      </mesh>
      {/* Right Wall */}
      <mesh position={[8, 3.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[24, 6.4, 0.2]} />
        <meshPhysicalMaterial color="#E7EDE7" transparent opacity={0.35} transmission={0.8} roughness={0.1} />
      </mesh>

      {/* Ceiling Glass Ridge */}
      <mesh position={[0, 6.8, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[16, 0.2, 24]} />
        <meshPhysicalMaterial color="#E7EDE7" transparent opacity={0.3} transmission={0.85} roughness={0.15} />
      </mesh>

      {/* Interior Furniture and Zones depending on view */}
      {/* Travertine Bar Counter */}
      <mesh position={[-3.5, 0.55, 1]} castShadow>
        <boxGeometry args={[2.5, 1.1, 5]} />
        <meshStandardMaterial color="#D8D2C5" roughness={0.5} />
      </mesh>
      <mesh position={[-3.5, 1.15, 1]}>
        <boxGeometry args={[2.7, 0.1, 5.2]} />
        <meshStandardMaterial color="#A87958" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Central Dining Tables */}
      {[-1, 1].map((tx, idx) => (
        <group key={idx} position={[tx * 2.2, 0, -1]}>
          <mesh position={[0, 0.45, 0]} castShadow>
            <cylinderGeometry args={[1.1, 1.1, 0.08, 32]} />
            <meshStandardMaterial color="#B08F6B" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.22, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.45, 16]} />
            <meshStandardMaterial color="#1A2B24" roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* Foliage Canopy */}
      <group ref={plantsRef}>
        {[
          [-4, 0, -4], [4, 0, -4], [0, 0, -5],
          [-5, 0, 3], [5, 0, 3]
        ].map(([px, py, pz], k) => (
          <group key={k} position={[px, py, pz]}>
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.5, 0.35, 0.8, 16]} />
              <meshStandardMaterial color="#A87958" roughness={0.7} />
            </mesh>
            <mesh position={[0, 1.8, 0]} castShadow>
              <sphereGeometry args={[0.9, 12, 12]} />
              <meshStandardMaterial color={k % 2 === 0 ? "#263F35" : "#727C52"} roughness={0.7} />
            </mesh>
            <mesh position={[0, 2.6, 0]}>
              <sphereGeometry args={[0.7, 12, 12]} />
              <meshStandardMaterial color="#A6B5A0" roughness={0.7} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

export default function RestaurantTour({ viewpoints, activeIndex, onSelectViewpoint }) {
  const currentView = viewpoints[activeIndex] || viewpoints[0] || {};
  const currentPos = currentView.cameraPos || [0, 2.8, 9.5];
  const currentTarget = currentView.target || [0, 1.8, 0];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '560px',
        borderRadius: '4px',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        boxShadow: '0 20px 50px rgba(38, 63, 53, 0.15)',
      }}
    >
      <Canvas
        camera={{ position: currentPos, fov: 45 }}
        shadows
        style={{
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse at 50% 30%, #E7EDE7 0%, #D8D2C5 60%, #A6B5A0 100%)',
        }}
      >
        <ambientLight intensity={0.75} color="#FAF7F0" />
        <directionalLight position={[6, 8, 4]} intensity={1.6} color="#FFF2D6" castShadow />
        <directionalLight position={[-6, 4, -4]} intensity={0.5} color="#E7EDE7" />

        <TourCameraController currentPos={currentPos} currentTarget={currentTarget} />
        <VirtualGlasshouseInterior activeIndex={activeIndex} />
      </Canvas>

      {/* Top Left Info Badge Overlay */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          backgroundColor: 'rgba(26, 43, 36, 0.88)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(166, 181, 160, 0.4)',
          borderRadius: '3px',
          padding: '16px 20px',
          zIndex: 10,
          maxWidth: '380px',
          color: '#FAF7F0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ color: 'var(--color-sage)', fontWeight: '800', fontSize: '11px', letterSpacing: '0.12em' }}>
            VIEWPOINT {currentView.number}
          </span>
          <span style={{ fontSize: '11px', opacity: 0.6 }}>• GLASSHOUSE ATRIUM</span>
        </div>
        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', margin: '0 0 6px 0', color: '#FFFFFF' }}>
          {currentView.name}
        </h4>
        <p style={{ fontSize: '12.5px', color: 'rgba(250, 247, 240, 0.85)', lineHeight: 1.5, margin: 0 }}>
          {currentView.description}
        </p>
      </div>

      {/* Floating Viewpoint Navigation Controls (Bottom Center) */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          background: 'rgba(26, 43, 36, 0.92)',
          backdropFilter: 'blur(10px)',
          padding: '8px 12px',
          borderRadius: '30px',
          border: '1px solid rgba(166, 181, 160, 0.35)',
          zIndex: 10,
          maxWidth: '92%',
          overflowX: 'auto',
        }}
      >
        {viewpoints.map((vp, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={vp.id}
              onClick={() => onSelectViewpoint(index)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '20px',
                border: 'none',
                background: isActive ? 'var(--color-forest)' : 'transparent',
                color: isActive ? '#FAF7F0' : 'rgba(250, 247, 240, 0.75)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ color: isActive ? '#FFD2B8' : 'var(--color-sage)', fontWeight: '700' }}>
                {vp.number}
              </span>
              <span>{vp.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
