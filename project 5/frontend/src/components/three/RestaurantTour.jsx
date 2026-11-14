import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useCMS } from '../../context/CMSContext';

function BotanicalSpaceMesh({ activeIndex }) {
  const meshGroup = useRef();

  useFrame((state, delta) => {
    if (meshGroup.current) {
      meshGroup.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <group ref={meshGroup}>
      {/* Stone / Timber Plinth Base */}
      <mesh position={[0, -1.8, 0]} receiveShadow>
        <boxGeometry args={[11, 0.4, 11]} />
        <meshStandardMaterial color="#243F32" roughness={0.9} />
      </mesh>

      {/* Tropical Timber Canopy Structure */}
      <mesh position={[0, 3.4, 0]}>
        <boxGeometry args={[11, 0.3, 11]} />
        <meshStandardMaterial color="#5E3F2B" roughness={0.8} />
      </mesh>

      {activeIndex === 0 && (
        /* Viewpoint 01: Exterior Architecture & Canopy */
        <group>
          {/* Main Teak Overhang */}
          <mesh position={[-2.5, 0.8, -1]} castShadow>
            <boxGeometry args={[3.6, 4.6, 0.8]} />
            <meshStandardMaterial color="#76533C" roughness={0.7} />
          </mesh>
          <mesh position={[2, 0.4, -2]} castShadow>
            <boxGeometry args={[4.2, 4.0, 0.8]} />
            <meshStandardMaterial color="#C8B99F" roughness={0.85} />
          </mesh>
          {/* Broad-leaf Palm Geometry */}
          <mesh position={[0, -0.6, 1.2]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.12, 2.4, 16]} />
            <meshStandardMaterial color="#52745A" roughness={0.6} />
          </mesh>
        </group>
      )}

      {activeIndex === 1 && (
        /* Viewpoint 02: Botanical Entrance & Reflection Pond */
        <group>
          {/* Honed Basalt Water Pond */}
          <mesh position={[0, -1.5, 0]}>
            <boxGeometry args={[6.5, 0.2, 4.5]} />
            <meshStandardMaterial color="#1E382B" roughness={0.1} metalness={0.8} />
          </mesh>
          {/* Stepping Stones Across Pond */}
          <mesh position={[-1.2, -1.35, 0]}>
            <boxGeometry args={[1.0, 0.2, 1.2]} />
            <meshStandardMaterial color="#C8B99F" roughness={0.8} />
          </mesh>
          <mesh position={[0.4, -1.35, 0.4]}>
            <boxGeometry args={[1.0, 0.2, 1.2]} />
            <meshStandardMaterial color="#C8B99F" roughness={0.8} />
          </mesh>
          {/* Flanking Bamboo Screen */}
          <mesh position={[-3.2, 0.6, 0]}>
            <boxGeometry args={[0.3, 4.4, 4.0]} />
            <meshStandardMaterial color="#71866A" roughness={0.6} />
          </mesh>
        </group>
      )}

      {activeIndex === 2 && (
        /* Viewpoint 03: Main Open-Air Dining Pavilion */
        <group>
          {/* Central Palm Trunk Column */}
          <mesh position={[-2.2, 0.6, -1.8]} castShadow>
            <cylinderGeometry args={[0.22, 0.26, 4.8, 16]} />
            <meshStandardMaterial color="#5E3F2B" roughness={0.8} />
          </mesh>
          <mesh position={[2.2, 0.6, -1.8]} castShadow>
            <cylinderGeometry args={[0.22, 0.26, 4.8, 16]} />
            <meshStandardMaterial color="#5E3F2B" roughness={0.8} />
          </mesh>
          {/* Dining Table with Teak Top */}
          <mesh position={[0, -0.9, 0]} castShadow>
            <boxGeometry args={[3.2, 0.16, 1.6]} />
            <meshStandardMaterial color="#8B6147" roughness={0.6} />
          </mesh>
          {/* Suspended Rattan Luminaire Above Table */}
          <mesh position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.35, 0.6, 0.7, 16]} />
            <meshStandardMaterial color="#D9B84E" roughness={0.9} />
          </mesh>
        </group>
      )}

      {activeIndex === 3 && (
        /* Viewpoint 04: Garden Terrace & Palm Oasis */
        <group>
          {/* Garden Planters */}
          <mesh position={[-3.0, -1.0, 0]} castShadow>
            <boxGeometry args={[1.4, 1.2, 5.5]} />
            <meshStandardMaterial color="#BC7153" roughness={0.85} />
          </mesh>
          {/* Lush Greenery Inside Planters */}
          <mesh position={[-3.0, 0.0, 0]}>
            <boxGeometry args={[1.2, 0.8, 5.2]} />
            <meshStandardMaterial color="#2E4E3F" roughness={0.6} />
          </mesh>
          {/* Outdoor Teak Dining Pod */}
          <mesh position={[1.2, -0.9, 0]}>
            <cylinderGeometry args={[1.2, 1.2, 0.15, 24]} />
            <meshStandardMaterial color="#76533C" roughness={0.65} />
          </mesh>
        </group>
      )}

      {activeIndex === 4 && (
        /* Viewpoint 05: Teak Wood Hearth & Botanical Bar */
        <group>
          {/* 32ft Curved Teak Bar Counter */}
          <mesh position={[0, -0.6, 0]} castShadow>
            <boxGeometry args={[6.8, 0.9, 1.5]} />
            <meshStandardMaterial color="#76533C" roughness={0.6} />
          </mesh>
          {/* Glazed Terracotta Back Bar */}
          <mesh position={[0, 1.2, -2.6]}>
            <boxGeometry args={[6.2, 3.4, 0.35]} />
            <meshStandardMaterial color="#BC7153" roughness={0.4} />
          </mesh>
          {/* Glowing Coconut Husk Hearth Embers */}
          <mesh position={[0, 0.2, -2.2]}>
            <boxGeometry args={[2.4, 0.15, 0.8]} />
            <meshBasicMaterial color="#FFB054" />
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
      <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '520px', background: '#162820', overflow: 'hidden' }}>
        <img
          src={currentVp.image_url}
          alt={currentVp.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '2rem',
          maxWidth: '460px',
          background: 'rgba(26, 47, 37, 0.94)',
          border: '1px solid var(--border-botanical)',
          padding: '1.5rem',
          backdropFilter: 'blur(8px)',
          borderRadius: '6px',
        }}>
          <div className="section-tag" style={{ marginBottom: '0.5rem' }}>
            VIEWPOINT 0{activeTourIndex + 1} // BOTANICAL ARCHIVE
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '0.4rem' }}>
            {currentVp.title}
          </h3>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--text-sand)', lineHeight: 1.5 }}>
            {currentVp.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '520px', background: '#1A2F25' }}>
      <Canvas
        shadows
        camera={{ position: [0, 2, 7.5], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 8, 4]} intensity={1.6} castShadow color="#FFF2D6" />
        <directionalLight position={[-5, 4, -4]} intensity={0.4} color="#7FA892" />
        
        {activeTourIndex === 4 && (
          <pointLight position={[0, 0.5, -1.8]} intensity={2.8} color="#FFB054" distance={6} />
        )}

        <BotanicalSpaceMesh activeIndex={activeTourIndex} />

        {/* Hotspot Marker in 3D Space */}
        {currentVp.hotspot_title && (
          <Html position={[0, 0.9, 0]} center>
            <div style={{
              background: 'rgba(26, 47, 37, 0.94)',
              border: '1px solid var(--accent-terracotta)',
              padding: '0.9rem 1.25rem',
              color: '#F6F2E9',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.78rem',
              width: '260px',
              pointerEvents: 'none',
              borderRadius: '4px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            }}>
              <div style={{ color: 'var(--accent-terracotta)', fontWeight: 700, marginBottom: '0.25rem' }}>
                &bull; {currentVp.hotspot_title}
              </div>
              <div style={{ color: '#E5D7C2', lineHeight: 1.4, fontFamily: 'var(--font-sans)' }}>
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
        background: 'rgba(26, 47, 37, 0.85)',
        border: '1px solid var(--border-botanical)',
        padding: '0.4rem 0.8rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        color: 'var(--text-muted)',
        pointerEvents: 'none',
        borderRadius: '3px',
      }}>
        DRAG TO EXPLORE &bull; SCROLL TO ZOOM
      </div>
    </div>
  );
}
