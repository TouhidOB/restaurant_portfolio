import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useCMS } from '../../context/CMSContext';

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

// 3D Procedural Bengali Dining Environment
function HeritageInterior({ activeIndex }) {
  const interiorRef = useRef();

  return (
    <group ref={interiorRef}>
      {/* 1. Terracotta Tile & Reclaimed Teakwood Floor */}
      <mesh position={[0, -0.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#8C3F2B" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Center Courtyard Inlay / Floral Alpana Ring */}
      <mesh position={[0, -0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 2.4, 32]} />
        <meshStandardMaterial color="#F4EBDD" roughness={0.5} />
      </mesh>

      {/* 2. Perimeter Walls with Relief Terracotta Murals */}
      {/* Back Wall */}
      <mesh position={[0, 2.5, -6]}>
        <boxGeometry args={[22, 5.2, 0.4]} />
        <meshStandardMaterial color="#A6533B" roughness={0.85} />
      </mesh>
      {/* Left Wall */}
      <mesh position={[-9, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[22, 5.2, 0.4]} />
        <meshStandardMaterial color="#26344A" roughness={0.7} />
      </mesh>
      {/* Right Wall with Jamdani Textile Panels */}
      <mesh position={[9, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[22, 5.2, 0.4]} />
        <meshStandardMaterial color="#C8B18D" roughness={0.9} />
      </mesh>

      {/* Ceiling with Exposed Wooden Beams */}
      <mesh position={[0, 5.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial color="#1E1611" roughness={0.9} />
      </mesh>

      {/* Heavy Teak Ceiling Rafters */}
      {[-6, -2, 2, 6].map((z, zi) => (
        <mesh key={`beam-${zi}`} position={[0, 4.7, z]}>
          <boxGeometry args={[18, 0.25, 0.35]} />
          <meshStandardMaterial color="#2B1A12" roughness={0.7} />
        </mesh>
      ))}

      {/* 3. Reception & Brass Vestibule (Left Section) */}
      <group position={[-5.5, 0, 1.0]}>
        {/* Antique Brass Host Desk */}
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 1.2, 1.0]} />
          <meshStandardMaterial color="#B18A54" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Antique Bell-Metal Brass Urn */}
        <mesh position={[1.2, 0.6, -0.8]} castShadow>
          <cylinderGeometry args={[0.25, 0.38, 1.1, 16]} />
          <meshStandardMaterial color="#B18A54" metalness={0.9} roughness={0.25} />
        </mesh>
        <pointLight position={[0, 1.8, 0]} intensity={2.5} color="#FF9A3C" distance={6} />
      </group>

      {/* 4. Central Dining Tables with Bell-Metal Kansa Plates */}
      {[-2.2, 2.2].map((x, ti) => (
        <group key={`dining-table-${ti}`} position={[x, 0, -1.0]}>
          {/* Burma Teak Table Top */}
          <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.6, 0.1, 3.6]} />
            <meshStandardMaterial color="#3E271D" roughness={0.6} />
          </mesh>
          {/* Wooden Table Legs */}
          {[-0.65, 0.65].map((lx, li) => (
            <mesh key={li} position={[lx, 0.38, 0]}>
              <boxGeometry args={[0.1, 0.76, 3.2]} />
              <meshStandardMaterial color="#22150F" roughness={0.7} />
            </mesh>
          ))}
          {/* Bell-Metal Thali Settings */}
          {[-1.2, 0, 1.2].map((z, pi) => (
            <mesh key={`thali-${pi}`} position={[0, 0.86, z]} castShadow>
              <cylinderGeometry args={[0.3, 0.28, 0.02, 24]} />
              <meshStandardMaterial color="#B18A54" metalness={0.9} roughness={0.2} />
            </mesh>
          ))}
          <pointLight position={[0, 2.2, 0]} intensity={1.8} color="#FFE1A8" distance={4.5} />
        </group>
      ))}

      {/* 5. Zamindar Private Dining Salon (Right Wing) */}
      <group position={[5.8, 0, -1.5]}>
        {/* Carved Wooden Partition Screen / Jali */}
        <mesh position={[-1.6, 1.8, 0]}>
          <boxGeometry args={[0.1, 3.6, 4.8]} />
          <meshStandardMaterial color="#241912" roughness={0.6} />
        </mesh>
        {/* Royal Zamindar Oval Table */}
        <mesh position={[0.6, 0.8, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.3, 1.3, 0.1, 32]} />
          <meshStandardMaterial color="#4A2F22" roughness={0.5} />
        </mesh>
        {/* Central Brass Floral Centerpiece */}
        <mesh position={[0.6, 0.95, 0]}>
          <cylinderGeometry args={[0.2, 0.15, 0.25, 16]} />
          <meshStandardMaterial color="#B18A54" metalness={0.85} />
        </mesh>
        <pointLight position={[0.6, 2.5, 0]} intensity={2.8} color="#E7A75B" distance={5.5} />
      </group>

      {/* 6. Open Kitchen & Spice Hearth (Back Center) */}
      <group position={[-1.5, 0, -5.2]}>
        {/* Terracotta Counter with Earthen Dum Pots */}
        <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.8, 1.1, 1.2]} />
          <meshStandardMaterial color="#A6533B" roughness={0.8} />
        </mesh>
        {/* 3 Earthen Clay Dum Handis */}
        {[-1.6, 0, 1.6].map((hx, hi) => (
          <mesh key={`handi-${hi}`} position={[hx, 1.45, 0]} castShadow>
            <sphereGeometry args={[0.32, 16, 16]} />
            <meshStandardMaterial color="#6B2D1B" roughness={0.9} />
          </mesh>
        ))}
        {/* Live Flame Hearth Glow */}
        <pointLight position={[0, 1.6, 0]} intensity={3.5} color="#FF7B25" distance={7} />
      </group>
    </group>
  );
}

export default function RestaurantTour({ viewpoints, activeIndex, onSelectViewpoint }) {
  const { t } = useCMS();
  const currentView = viewpoints[activeIndex] || viewpoints[0];

  return (
    <div style={{ position: 'relative', width: '100%', height: '560px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: currentView.cameraPos, fov: 45 }}
        style={{ width: '100%', height: '100%', background: 'radial-gradient(ellipse at 50% 30%, #2E3E56 0%, #192433 60%, #101620 100%)' }}
        shadows
      >
        <ambientLight intensity={0.65} color="#F4EBDD" />
        <directionalLight position={[-6, 6, 4]} intensity={1.5} color="#E5B98A" castShadow />
        <directionalLight position={[6, 4, -4]} intensity={0.8} color="#AEBCC0" />

        <CameraController
          currentPos={currentView.cameraPos}
          currentTarget={currentView.target}
        />

        <HeritageInterior activeIndex={activeIndex} />
      </Canvas>

      {/* Floating Viewpoint Navigation Controls Overlay */}
      <div style={{
        position: 'absolute',
        bottom: '1.25rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '0.5rem',
        background: 'rgba(25, 36, 51, 0.92)',
        backdropFilter: 'blur(10px)',
        padding: '0.45rem 0.65rem',
        borderRadius: '30px',
        border: '1px solid var(--color-border)',
        zIndex: 10,
        maxWidth: '94%',
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
                background: isActive ? 'var(--color-terracotta)' : 'transparent',
                color: isActive ? 'var(--color-ivory-light)' : 'var(--color-ivory)',
                fontSize: '0.78rem',
                fontWeight: '700',
                letterSpacing: '0.04em',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                fontFamily: 'var(--font-body-en)'
              }}
            >
              <span style={{
                color: isActive ? '#fff' : 'var(--color-brass)',
                fontWeight: '800'
              }}>
                {vp.number}
              </span>
              <span>{t(vp.name).split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Viewpoint Info Badge Overlay (Top Left) */}
      <div style={{
        position: 'absolute',
        top: '1.25rem',
        left: '1.25rem',
        background: 'rgba(25, 36, 51, 0.88)',
        backdropFilter: 'blur(8px)',
        border: '1px solid var(--color-border)',
        borderRadius: '3px',
        padding: '0.85rem 1.25rem',
        zIndex: 10,
        maxWidth: '380px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
          <span style={{ color: 'var(--color-brass)', fontWeight: '800', fontFamily: 'var(--font-body-en)', fontSize: '0.82rem' }}>
            VIEWPOINT {currentView.number}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-ivory)' }}>&bull; HERITAGE ENCLAVE</span>
        </div>
        <h4 style={{ fontSize: '1.2rem', color: 'var(--color-ivory)', fontFamily: 'var(--font-display-en)', marginBottom: '0.35rem' }}>
          {t(currentView.name)}
        </h4>
        <p style={{ fontSize: '0.82rem', color: 'var(--color-jute)', lineHeight: 1.5 }}>
          {t(currentView.description)}
        </p>
      </div>
    </div>
  );
}
