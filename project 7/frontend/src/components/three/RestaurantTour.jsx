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
    camera.position.lerp(targetPos.current, 0.04);
    camera.lookAt(lookTarget.current);
  });

  return null;
}

// 3D Architectural Salons Model
function ParisianMansionSalons({ activeIndex }) {
  const roomsRef = useRef();

  return (
    <group ref={roomsRef}>
      {/* Floor - Polished Herringbone Parquet & Marble */}
      <mesh position={[0, -0.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#4A3B32" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Ceiling with Decorative Moldings */}
      <mesh position={[0, 4.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#EAE3D5" roughness={0.9} />
      </mesh>

      {/* Back Architectural Wall with Tall Arched French Doors */}
      <mesh position={[0, 2.1, -5]}>
        <boxGeometry args={[18, 4.2, 0.3]} />
        <meshStandardMaterial color="#302E33" roughness={0.8} />
      </mesh>

      {/* Central Salon Crystal Chandelier */}
      <group position={[0, 3.4, 0]}>
        <mesh>
          <cylinderGeometry args={[0.03, 0.03, 0.8, 8]} />
          <meshStandardMaterial color="#C5A46D" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.9, 0.5, 0.3, 16]} />
          <meshStandardMaterial color="#FFECC2" roughness={0.1} metalness={0.3} transparent opacity={0.85} />
        </mesh>
        {/* Crystal drops */}
        {[-0.6, 0, 0.6].map((x, idx) => (
          <mesh key={idx} position={[x, -0.65, 0]}>
            <octahedronGeometry args={[0.08]} />
            <meshStandardMaterial color="#FFF" roughness={0.05} metalness={0.9} />
          </mesh>
        ))}
        <pointLight intensity={3.0} color="#FFD58C" distance={8} />
      </group>

      {/* Grand Salon Tables (White Linen + Burgundy Chairs) */}
      {[-2.2, 2.2].map((x, i) => (
        <group key={`table-${i}`} position={[x, 0, -0.5]}>
          {/* Table with Draped White Cloth */}
          <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.9, 0.95, 0.75, 24]} />
            <meshStandardMaterial color="#F7F3EB" roughness={0.7} />
          </mesh>
          {/* Champagne Flutes & Gilded Centerpiece */}
          <mesh position={[0, 1.15, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.12, 16]} />
            <meshStandardMaterial color="#C5A46D" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Velvet Burgundy Chairs */}
          {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((ang, ci) => (
            <group
              key={ci}
              position={[Math.cos(ang) * 1.35, 0, Math.sin(ang) * 1.35]}
              rotation={[0, -ang + Math.PI / 2, 0]}
            >
              <mesh position={[0, 0.45, 0]}>
                <boxGeometry args={[0.48, 0.1, 0.48]} />
                <meshStandardMaterial color="#54252F" roughness={0.6} />
              </mesh>
              <mesh position={[0, 0.85, -0.2]}>
                <boxGeometry args={[0.48, 0.7, 0.08]} />
                <meshStandardMaterial color="#54252F" roughness={0.6} />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* Bar à Champagne & Verrière (Right Wing) */}
      <group position={[5.5, 0, 0]}>
        {/* Monolith Emperador Marble Counter */}
        <mesh position={[0, 0.9, 0]} castShadow>
          <boxGeometry args={[1.2, 1.0, 4.5]} />
          <meshStandardMaterial color="#1E1C1B" roughness={0.2} metalness={0.3} />
        </mesh>
        {/* Brass Footrest & Counter Top Trim */}
        <mesh position={[0.65, 0.2, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 4.5, 12]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#C5A46D" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Back Bar Gilded Shelving */}
        <mesh position={[-1.2, 2.0, 0]}>
          <boxGeometry args={[0.3, 2.8, 4.2]} />
          <meshStandardMaterial color="#2B2729" roughness={0.6} />
        </mesh>
        <pointLight position={[0, 1.8, 0]} intensity={1.8} color="#FFCB6B" distance={5} />
      </group>

      {/* Cave Historique des Grands Crus (Left Wing Vaults) */}
      <group position={[-5.5, 0, 0]}>
        {/* Ancient Stone Wall & Racks */}
        <mesh position={[0, 1.8, 0]}>
          <boxGeometry args={[0.5, 3.6, 5.0]} />
          <meshStandardMaterial color="#3E3834" roughness={0.9} />
        </mesh>
        {/* Wine Bottles Racks */}
        {[-1.5, 0, 1.5].map((z, bi) => (
          <mesh key={bi} position={[0.4, 1.2, z]}>
            <cylinderGeometry args={[0.3, 0.35, 1.0, 16]} rotation={[0, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#211C18" roughness={0.8} />
          </mesh>
        ))}
        <pointLight position={[0.5, 1.4, 0]} intensity={1.2} color="#E89F53" distance={4} />
      </group>
    </group>
  );
}

export default function RestaurantTour({ viewpoints, activeIndex, onChangeViewpoint }) {
  const currentView = viewpoints[activeIndex] || viewpoints[0];

  return (
    <div style={{ position: 'relative', width: '100%', height: '560px', borderRadius: '12px', overflow: 'hidden', background: '#141517' }}>
      <Canvas
        camera={{ position: currentView.cameraPos, fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <CameraController currentPos={currentView.cameraPos} currentTarget={currentView.target} />
        <ambientLight intensity={0.4} color="#382C31" />
        <directionalLight position={[5, 8, 4]} intensity={1.0} color="#FFEACC" />

        <ParisianMansionSalons activeIndex={activeIndex} />
      </Canvas>

      {/* Floating Info Overlay for Active Viewpoint */}
      <div style={{
        position: 'absolute',
        top: '1.5rem',
        left: '1.5rem',
        background: 'rgba(32, 33, 36, 0.88)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(197, 164, 109, 0.35)',
        borderRadius: '8px',
        padding: '1.25rem 1.5rem',
        maxWidth: '380px',
        zIndex: 10,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          color: 'var(--color-gold)',
          fontFamily: 'var(--font-editorial)',
          fontSize: '0.85rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '0.35rem'
        }}>
          <span>POINT DE VUE {currentView.number}</span>
          <span>✦</span>
          <span>SALON 3D</span>
        </div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.35rem',
          color: 'var(--color-ivory)',
          marginBottom: '0.5rem'
        }}>
          {{ ...currentView }.name}
        </h3>
        <p style={{
          color: 'var(--color-taupe)',
          fontSize: '0.88rem',
          lineHeight: '1.5',
          marginBottom: '0.85rem'
        }}>
          {currentView.description}
        </p>

        {currentView.details && (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {currentView.details.map((item, idx) => (
              <li key={idx} style={{
                fontSize: '0.8rem',
                color: 'var(--color-ivory-dim)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                <span style={{ color: 'var(--color-gold)', fontSize: '0.75rem' }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bottom Switcher Controls */}
      <div style={{
        position: 'absolute',
        bottom: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '0.6rem',
        background: 'rgba(26, 27, 29, 0.9)',
        backdropFilter: 'blur(10px)',
        padding: '0.45rem',
        borderRadius: '30px',
        border: '1px solid rgba(197, 164, 109, 0.3)',
        zIndex: 10,
        maxWidth: '92%',
        overflowX: 'auto'
      }}>
        {viewpoints.map((vp, idx) => (
          <button
            key={vp.id || idx}
            onClick={() => onChangeViewpoint(idx)}
            style={{
              background: activeIndex === idx ? 'linear-gradient(135deg, var(--color-gold) 0%, #A9864E 100%)' : 'transparent',
              color: activeIndex === idx ? '#18120B' : 'var(--color-taupe)',
              border: 'none',
              borderRadius: '20px',
              padding: '0.45rem 1rem',
              fontSize: '0.82rem',
              fontWeight: activeIndex === idx ? '600' : '500',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.25s ease'
            }}
          >
            {vp.number}. {vp.name}
          </button>
        ))}
      </div>
    </div>
  );
}
