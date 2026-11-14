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

// 3D Industrial Warehouse Interior Model
function WarehouseInterior({ activeIndex }) {
  const interiorRef = useRef();

  return (
    <group ref={interiorRef}>
      {/* Polished Concrete Floor */}
      <mesh position={[0, -0.05, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial color="#2B2D30" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* High-Clearance Ceiling with Exposed Black Steel Roof Trusses */}
      <mesh position={[0, 4.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial color="#181A1C" roughness={0.9} />
      </mesh>

      {/* Structural Steel Trusses */}
      {[-6, -2, 2, 6].map((z, ti) => (
        <group key={`truss-${ti}`} position={[0, 4.4, z]}>
          <mesh>
            <boxGeometry args={[18, 0.25, 0.25]} />
            <meshStandardMaterial color="#111314" roughness={0.6} metalness={0.8} />
          </mesh>
          {/* Diagonal steel struts */}
          {[-5, -2, 2, 5].map((x, si) => (
            <mesh key={si} position={[x, -0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[0.8, 0.1, 0.1]} />
              <meshStandardMaterial color="#111314" roughness={0.6} metalness={0.8} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Back Exposed Red Brick Wall */}
      <mesh position={[0, 2.4, -6]}>
        <boxGeometry args={[20, 5.0, 0.35]} />
        <meshStandardMaterial color="#914D37" roughness={0.9} />
      </mesh>

      {/* Open Hearth & Kitchen Station (Back Wall Center) */}
      <group position={[0, 0, -5.2]}>
        {/* Monolithic Brick Wood Fire Pit Counter */}
        <mesh position={[0, 0.85, 0]} castShadow>
          <boxGeometry args={[5.2, 1.1, 1.4]} />
          <meshStandardMaterial color="#181A1C" roughness={0.8} metalness={0.4} />
        </mesh>
        {/* Fire Hearth Grill Cavity */}
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[3.2, 0.3, 0.9]} />
          <meshBasicMaterial color="#FF7B25" />
        </mesh>
        {/* Stainless Steel Chef Prep Line */}
        <mesh position={[0, 0.85, 1.3]}>
          <boxGeometry args={[5.6, 0.9, 0.7]} />
          <meshStandardMaterial color="#A4A8AB" roughness={0.2} metalness={0.95} />
        </mesh>
        {/* Roaring Flame Amber Light */}
        <pointLight position={[0, 1.5, 0]} intensity={3.5} color="#FF8C2B" distance={8} />
      </group>

      {/* Central Dining Area (Heavy Oak Tables + Black Steel Frames) */}
      {[-2.4, 2.4].map((x, i) => (
        <group key={`comm-table-${i}`} position={[x, 0, -0.5]}>
          {/* Thick Oak Slab Table Top */}
          <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.5, 0.12, 3.4]} />
            <meshStandardMaterial color="#5E4334" roughness={0.7} />
          </mesh>
          {/* Black Steel Legs */}
          {[-0.6, 0.6].map((lx, li) => (
            <mesh key={li} position={[lx, 0.38, 0]}>
              <boxGeometry args={[0.08, 0.76, 3.2]} />
              <meshStandardMaterial color="#111314" roughness={0.5} metalness={0.85} />
            </mesh>
          ))}
          {/* Hanging Edison Filament Pendants over table */}
          {[-1.0, 1.0].map((pz, pi) => (
            <group key={pi} position={[0, 3.2, pz]}>
              <mesh position={[0, 0.6, 0]}>
                <cylinderGeometry args={[0.015, 0.015, 1.2, 6]} />
                <meshStandardMaterial color="#111314" />
              </mesh>
              <mesh position={[0, -0.05, 0]}>
                <sphereGeometry args={[0.08, 12, 12]} />
                <meshBasicMaterial color="#FFCA7A" />
              </mesh>
              <pointLight position={[0, -0.1, 0]} intensity={1.5} color="#FFB042" distance={3.8} />
            </group>
          ))}
        </group>
      ))}

      {/* Copper Bar & Lounge (Left Wall) */}
      <group position={[-5.8, 0, 0]}>
        {/* Hand-Hammered Copper Bar Counter */}
        <mesh position={[0, 0.95, 0]} castShadow>
          <boxGeometry args={[1.3, 1.1, 5.8]} />
          <meshStandardMaterial color="#B87345" roughness={0.3} metalness={0.9} />
        </mesh>
        {/* Footrest Steel Tube */}
        <mesh position={[0.75, 0.25, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 5.8, 12]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#111314" metalness={0.9} />
        </mesh>
        {/* Back Wall Spirit Shelving */}
        <mesh position={[-1.4, 2.2, 0]}>
          <boxGeometry args={[0.3, 2.8, 5.4]} />
          <meshStandardMaterial color="#1C1E20" roughness={0.7} />
        </mesh>
        <pointLight position={[0, 1.8, 0]} intensity={2.0} color="#E9A24B" distance={5} />
      </group>

      {/* Entrance & Reception (Right Wall) */}
      <group position={[5.8, 0, 0]}>
        {/* Poured Concrete Reception Counter */}
        <mesh position={[0, 0.9, 0]} castShadow>
          <boxGeometry args={[1.4, 1.0, 3.2]} />
          <meshStandardMaterial color="#8E9094" roughness={0.8} />
        </mesh>
        <pointLight position={[0, 1.6, 0]} intensity={1.5} color="#E9A24B" distance={4} />
      </group>
    </group>
  );
}

export default function RestaurantTour({ viewpoints, activeIndex, onChangeViewpoint }) {
  const currentView = viewpoints[activeIndex] || viewpoints[0];

  return (
    <div style={{ position: 'relative', width: '100%', height: '560px', borderRadius: '4px', overflow: 'hidden', background: '#0F1012', border: '1px solid var(--color-border)' }}>
      <Canvas
        camera={{ position: currentView.cameraPos, fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <CameraController currentPos={currentView.cameraPos} currentTarget={currentView.target} />
        <ambientLight intensity={0.45} color="#252729" />
        <directionalLight position={[4, 8, 4]} intensity={1.1} color="#FFF2DA" />

        <WarehouseInterior activeIndex={activeIndex} />
      </Canvas>

      {/* Floating Info Overlay for Active Space */}
      <div style={{
        position: 'absolute',
        top: '1.5rem',
        left: '1.5rem',
        background: 'rgba(24, 26, 28, 0.92)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--color-border)',
        borderRadius: '2px',
        padding: '1.25rem 1.5rem',
        maxWidth: '380px',
        zIndex: 10,
        boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          color: 'var(--color-copper)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.78rem',
          fontWeight: 800,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '0.35rem'
        }}>
          <span>SPACE {currentView.number}</span>
          <span>✦</span>
          <span>3D WAREHOUSE</span>
        </div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4rem',
          color: 'var(--color-offwhite)',
          marginBottom: '0.5rem',
          textTransform: 'uppercase'
        }}>
          {{ ...currentView }.name}
        </h3>
        <p style={{
          color: 'var(--color-concrete)',
          fontSize: '0.88rem',
          lineHeight: '1.55',
          marginBottom: '0.85rem'
        }}>
          {currentView.description}
        </p>

        {currentView.details && (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {currentView.details.map((item, idx) => (
              <li key={idx} style={{
                fontSize: '0.8rem',
                color: 'var(--color-offwhite)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontWeight: 600
              }}>
                <span style={{ color: 'var(--color-copper)', fontSize: '0.85rem' }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Bottom Space Switcher Controls */}
      <div style={{
        position: 'absolute',
        bottom: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '0.5rem',
        background: 'rgba(17, 19, 20, 0.94)',
        backdropFilter: 'blur(10px)',
        padding: '0.4rem',
        borderRadius: '2px',
        border: '1px solid var(--color-border)',
        zIndex: 10,
        maxWidth: '94%',
        overflowX: 'auto'
      }}>
        {viewpoints.map((vp, idx) => (
          <button
            key={vp.id || idx}
            onClick={() => onChangeViewpoint(idx)}
            style={{
              background: activeIndex === idx ? 'var(--color-copper)' : 'transparent',
              color: activeIndex === idx ? 'var(--color-black)' : 'var(--color-concrete)',
              border: 'none',
              borderRadius: '2px',
              padding: '0.5rem 1rem',
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              fontWeight: '800',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease'
            }}
          >
            {vp.number}. {vp.name}
          </button>
        ))}
      </div>
    </div>
  );
}
