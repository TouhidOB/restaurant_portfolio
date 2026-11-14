import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useCMS } from '../../context/CMSContext';

function ArchitecturalSpaceMesh({ activeIndex }) {
  const meshGroup = useRef();

  useFrame((state, delta) => {
    if (meshGroup.current) {
      meshGroup.current.rotation.y += delta * 0.05;
    }
  });

  // Structural composition dynamically adapted for each viewpoint
  return (
    <group ref={meshGroup}>
      {/* Flooring Plinth */}
      <mesh position={[0, -1.8, 0]} receiveShadow>
        <boxGeometry args={[10, 0.4, 10]} />
        <meshStandardMaterial color="#2B2C2A" roughness={0.9} />
      </mesh>

      {/* Ceiling Beam */}
      <mesh position={[0, 3.2, 0]}>
        <boxGeometry args={[10, 0.4, 10]} />
        <meshStandardMaterial color="#353632" roughness={0.85} />
      </mesh>

      {activeIndex === 0 && (
        /* Exterior Concrete Facade */
        <group>
          <mesh position={[-2.5, 0.8, -1]} castShadow>
            <boxGeometry args={[3.2, 4.8, 0.8]} />
            <meshStandardMaterial color="#B8B5AD" roughness={0.8} />
          </mesh>
          <mesh position={[2, 0.4, -2]} castShadow>
            <boxGeometry args={[4.5, 4.0, 0.8]} />
            <meshStandardMaterial color="#9C9990" roughness={0.85} />
          </mesh>
          <mesh position={[0, -0.6, 1]}>
            <boxGeometry args={[1.8, 1.8, 1.8]} />
            <meshStandardMaterial color="#353632" roughness={0.9} />
          </mesh>
        </group>
      )}

      {activeIndex === 1 && (
        /* Entrance Portal */
        <group>
          <mesh position={[-1.8, 0.6, 0]}>
            <boxGeometry args={[1.2, 4.4, 3.5]} />
            <meshStandardMaterial color="#252624" roughness={0.95} />
          </mesh>
          <mesh position={[1.8, 0.6, 0]}>
            <boxGeometry args={[1.2, 4.4, 3.5]} />
            <meshStandardMaterial color="#252624" roughness={0.95} />
          </mesh>
          {/* Blackened Steel Pivot Door */}
          <mesh position={[0, 0.6, -1.2]} rotation={[0, 0.5, 0]}>
            <boxGeometry args={[1.8, 4.2, 0.12]} />
            <meshStandardMaterial color="#1B1C1A" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      )}

      {activeIndex === 2 && (
        /* Main Dining Hall */
        <group>
          <mesh position={[-2.5, 0.6, -2]} castShadow>
            <cylinderGeometry args={[0.5, 0.5, 4.8, 16]} />
            <meshStandardMaterial color="#9C9990" roughness={0.8} />
          </mesh>
          <mesh position={[2.5, 0.6, -2]} castShadow>
            <cylinderGeometry args={[0.5, 0.5, 4.8, 16]} />
            <meshStandardMaterial color="#9C9990" roughness={0.8} />
          </mesh>
          {/* Basalt Monolith Table */}
          <mesh position={[0, -0.9, 0]} castShadow>
            <boxGeometry args={[3.2, 0.35, 1.6]} />
            <meshStandardMaterial color="#20211F" roughness={0.7} metalness={0.2} />
          </mesh>
          {/* Table Legs */}
          <mesh position={[-1.2, -1.35, 0]}>
            <boxGeometry args={[0.4, 0.8, 1.2]} />
            <meshStandardMaterial color="#2B2C2A" roughness={0.9} />
          </mesh>
          <mesh position={[1.2, -1.35, 0]}>
            <boxGeometry args={[0.4, 0.8, 1.2]} />
            <meshStandardMaterial color="#2B2C2A" roughness={0.9} />
          </mesh>
        </group>
      )}

      {activeIndex === 3 && (
        /* Industrial Steel Bar */
        <group>
          {/* 40ft Steel Bar Counter */}
          <mesh position={[0, -0.6, 0]} castShadow>
            <boxGeometry args={[6.5, 0.9, 1.4]} />
            <meshStandardMaterial color="#2B2C2A" metalness={0.75} roughness={0.35} />
          </mesh>
          {/* Back Bar Shelving */}
          <mesh position={[0, 1.2, -2.5]}>
            <boxGeometry args={[6.0, 3.2, 0.3]} />
            <meshStandardMaterial color="#1A1B19" metalness={0.6} roughness={0.4} />
          </mesh>
          {/* Brass Footrail */}
          <mesh position={[0, -1.4, 0.8]}>
            <cylinderGeometry args={[0.04, 0.04, 6.2, 16]} rotation={[0, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#C59B27" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      )}

      {activeIndex === 4 && (
        /* Open Fire Hearth Kitchen */
        <group>
          {/* Firebrick Hearth Base */}
          <mesh position={[0, -0.6, -1.5]} castShadow>
            <boxGeometry args={[4.8, 1.2, 2.0]} />
            <meshStandardMaterial color="#3E3835" roughness={0.95} />
          </mesh>
          {/* Glowing Coals Core */}
          <mesh position={[0, 0.05, -1.5]}>
            <boxGeometry args={[3.8, 0.15, 1.4]} />
            <meshBasicMaterial color="#F05A28" />
          </mesh>
          {/* Elevation Rig Steel Uprights */}
          <mesh position={[-1.8, 1.2, -1.5]}>
            <boxGeometry args={[0.1, 2.4, 0.1]} />
            <meshStandardMaterial color="#1B1C1A" metalness={0.8} />
          </mesh>
          <mesh position={[1.8, 1.2, -1.5]}>
            <boxGeometry args={[0.1, 2.4, 0.1]} />
            <meshStandardMaterial color="#1B1C1A" metalness={0.8} />
          </mesh>
        </group>
      )}
    </group>
  );
}

function CameraRig({ viewpoint }) {
  const controlsRef = useRef();

  useEffect(() => {
    if (controlsRef.current && viewpoint?.camera_position) {
      const [px, py, pz] = viewpoint.camera_position;
      controlsRef.current.object.position.set(px, py, pz);
      if (viewpoint.camera_target) {
        const [tx, ty, tz] = viewpoint.camera_target;
        controlsRef.current.target.set(tx, ty, tz);
      }
      controlsRef.current.update();
    }
  }, [viewpoint]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      maxPolarAngle={Math.PI / 2 - 0.05}
      minDistance={2.5}
      maxDistance={12}
      dampingFactor={0.08}
    />
  );
}

export default function RestaurantTour() {
  const { content, activeTourIndex, tourMode } = useCMS();
  const viewpoints = content.viewpoints || [];
  const currentVp = viewpoints[activeTourIndex] || viewpoints[0] || {};

  if (tourMode === 'photo') {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '520px', background: '#181917', overflow: 'hidden' }}>
        <img
          src={currentVp.image_url}
          alt={currentVp.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '2rem',
          maxWidth: '440px',
          background: 'rgba(32, 33, 31, 0.92)',
          border: '1px solid var(--border-steel)',
          padding: '1.5rem',
          backdropFilter: 'blur(8px)',
        }}>
          <div className="section-tag" style={{ marginBottom: '0.5rem' }}>
            VIEWPOINT 0{activeTourIndex + 1} // SPATIAL ARCHIVE
          </div>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>{currentVp.title}</h3>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {currentVp.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '520px', background: '#1A1B19' }}>
      <Canvas
        shadows
        camera={{ position: [0, 2, 7], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 4]} intensity={1.5} castShadow />
        <directionalLight position={[-4, 4, -4]} intensity={0.6} color="#777A76" />
        
        {activeTourIndex === 4 && (
          <pointLight position={[0, 0.5, -1.2]} intensity={2.5} color="#F05A28" distance={6} />
        )}

        <ArchitecturalSpaceMesh activeIndex={activeTourIndex} />

        {/* Hotspot Marker in 3D Space */}
        {currentVp.hotspot_title && (
          <Html position={[0, 0.8, 0]} center>
            <div style={{
              background: 'rgba(32, 33, 31, 0.94)',
              border: '1px solid var(--accent-orange)',
              padding: '0.85rem 1.25rem',
              color: '#F1F0EA',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              width: '240px',
              pointerEvents: 'none',
              boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
            }}>
              <div style={{ color: 'var(--accent-orange)', fontWeight: 700, marginBottom: '0.2rem' }}>
                &bull; {currentVp.hotspot_title}
              </div>
              <div style={{ color: '#B8B5AD', lineHeight: 1.4 }}>
                {currentVp.hotspot_detail}
              </div>
            </div>
          </Html>
        )}

        <CameraRig viewpoint={currentVp} />
      </Canvas>

      {/* Floating 3D Navigation Hint */}
      <div style={{
        position: 'absolute',
        bottom: '1.25rem',
        right: '1.25rem',
        background: 'rgba(32, 33, 31, 0.8)',
        border: '1px solid var(--border-steel)',
        padding: '0.4rem 0.8rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        color: 'var(--text-muted)',
        pointerEvents: 'none',
      }}>
        DRAG TO ROTATE &bull; SCROLL TO ZOOM
      </div>
    </div>
  );
}
