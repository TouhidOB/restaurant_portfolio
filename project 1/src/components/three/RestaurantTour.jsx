import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ChevronLeft, ChevronRight, Compass, Eye, Sparkles } from 'lucide-react';

// 3D Architectural Scene for each viewpoint
function Tour3DEnvironment({ activeViewpoint, prefersReducedMotion }) {
  const groupRef = useRef();

  // Create texture loader for spherical / architectural projections
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(activeViewpoint.image);
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, [activeViewpoint.image]);

  return (
    <group ref={groupRef}>
      {/* Curved Architectural Panoramic Screen */}
      <mesh position={[0, 0, -2]}>
        <cylinderGeometry args={[14, 14, 11, 48, 1, true, -Math.PI * 0.7, Math.PI * 1.4]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>

      {/* Atmospheric Interior / Exterior Lighting according to scene mood */}
      {activeViewpoint.id === 'exterior' && (
        <>
          <pointLight position={[0, 3, 2]} color="#FFA534" intensity={2.5} distance={15} />
          <pointLight position={[-4, 1, 0]} color="#42788D" intensity={1.5} distance={12} />
        </>
      )}

      {activeViewpoint.id === 'entrance' && (
        <>
          <pointLight position={[0, 4, 0]} color="#FFD580" intensity={3} distance={12} />
          <pointLight position={[-3, 1, -1]} color="#D6B879" intensity={2} distance={8} />
        </>
      )}

      {activeViewpoint.id === 'dining' && (
        <>
          <pointLight position={[0, 3.5, 0]} color="#FFE8A3" intensity={3.5} distance={14} />
          <pointLight position={[3, 2, -2]} color="#123B35" intensity={1} distance={10} />
        </>
      )}

      {activeViewpoint.id === 'reception' && (
        <>
          <pointLight position={[2, 2.5, 1]} color="#FFC766" intensity={3} distance={10} />
          <pointLight position={[-2, 1, 0]} color="#D6B879" intensity={1.8} distance={8} />
        </>
      )}

      {activeViewpoint.id === 'kitchen' && (
        <>
          <pointLight position={[-2, 3, -1]} color="#FF7A29" intensity={3.2} distance={12} />
          <pointLight position={[2, 2, 0]} color="#FFF0D4" intensity={2.5} distance={10} />
        </>
      )}

      {/* Floating Art Deco ambient dust/light particles */}
      <TourParticles mood={activeViewpoint.sceneMood} />
    </group>
  );
}

// Subtle golden particle embers / chandelier sparkle
function TourParticles({ mood }) {
  const count = 60;
  const meshRef = useRef();

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = Math.random() * 6 - 1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return [pos];
  }, [count]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.04;
    }
  });

  const particleColor = mood === 'kitchen' ? '#FFA040' : '#D6B879';

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={particleColor}
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Smooth camera motion controller to interpolate between target viewpoints
function TourCameraController({ targetPos, targetLookAt, prefersReducedMotion }) {
  useFrame(({ camera }) => {
    const lerpFactor = prefersReducedMotion ? 1 : 0.05;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetPos[0], lerpFactor);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetPos[1], lerpFactor);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetPos[2], lerpFactor);

    // Camera target interpolation
    camera.lookAt(targetLookAt[0], targetLookAt[1], targetLookAt[2]);
  });

  return null;
}

export default function RestaurantTour({ viewpoints }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [webglError, setWebglError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const currentView = viewpoints[currentIndex] || viewpoints[0];

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglError(true);
    } catch (e) {
      setWebglError(true);
    }
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % viewpoints.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + viewpoints.length) % viewpoints.length);
  };

  return (
    <div className="tour-wrapper" style={{ position: 'relative', width: '100%', minHeight: '680px', height: '78vh', backgroundColor: '#0B2521', overflow: 'hidden' }}>
      {/* 3D Canvas / WebGL or Fallback Image */}
      {!webglError ? (
        <Canvas
          camera={{ position: [0, 2, 8], fov: 52 }}
          dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        >
          <color attach="background" args={['#081715']} />
          <ambientLight intensity={0.9} color="#B8D5C8" />
          <Tour3DEnvironment activeViewpoint={currentView} prefersReducedMotion={prefersReducedMotion} />
          <TourCameraController
            targetPos={currentView.cameraPos}
            targetLookAt={currentView.cameraTarget}
            prefersReducedMotion={prefersReducedMotion}
          />
        </Canvas>
      ) : (
        <div
          className="tour-fallback-image"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(circle at center, rgba(18, 59, 53, 0.4) 0%, rgba(23, 25, 26, 0.9) 100%), url(${currentView.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'background-image 0.8s ease-in-out',
          }}
        />
      )}

      {/* Subtle Vignette & Gradient Overlays */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(23, 25, 26, 0.7) 0%, rgba(23, 25, 26, 0.1) 40%, rgba(23, 25, 26, 0.85) 100%)',
        }}
      />

      {/* Top Header Badge */}
      <div
        style={{
          position: 'absolute',
          top: '32px',
          left: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 18px',
          background: 'rgba(23, 25, 26, 0.75)',
          backdropFilter: 'blur(8px)',
          border: '1px solid var(--color-border-gold)',
          borderRadius: 'var(--radius-sm)',
          zIndex: 10,
        }}
      >
        <Compass size={16} color="var(--color-gold)" />
        <span style={{ fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 600 }}>
          3D VIRTUAL IMMERSION • {currentView.number} OF {String(viewpoints.length).padStart(2, '0')}
        </span>
      </div>

      {/* Floating Info Panel (Bottom Left on Desktop, Bottom Center on Mobile) */}
      <div
        className="tour-info-card"
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '32px',
          maxWidth: '480px',
          background: 'rgba(23, 25, 26, 0.88)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--color-border-gold)',
          padding: '28px 32px',
          borderRadius: 'var(--radius-sm)',
          zIndex: 10,
          boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--color-gold)' }}>
            {currentView.number}
          </span>
          <span style={{ width: '24px', height: '1px', background: 'var(--color-gold)' }} />
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--color-jade)' }}>
            {currentView.name}
          </span>
        </div>
        
        <h3 style={{ fontSize: '28px', color: 'var(--color-pearl)', marginBottom: '12px', fontFamily: 'var(--font-display)' }}>
          {currentView.caption}
        </h3>

        <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--color-pearl-muted)', marginBottom: '20px' }}>
          {currentView.description}
        </p>

        {/* Viewpoint Navigation Arrows */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border-gold-subtle)', paddingTop: '16px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handlePrev}
              aria-label="Previous Viewpoint"
              style={{
                width: '40px',
                height: '40px',
                background: 'rgba(214, 184, 121, 0.1)',
                border: '1px solid var(--color-gold)',
                color: 'var(--color-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-gold)'; e.currentTarget.style.color = '#17191A'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(214, 184, 121, 0.1)'; e.currentTarget.style.color = 'var(--color-gold)'; }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Viewpoint"
              style={{
                width: '40px',
                height: '40px',
                background: 'rgba(214, 184, 121, 0.1)',
                border: '1px solid var(--color-gold)',
                color: 'var(--color-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-gold)'; e.currentTarget.style.color = '#17191A'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(214, 184, 121, 0.1)'; e.currentTarget.style.color = 'var(--color-gold)'; }}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {viewpoints.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to Viewpoint ${idx + 1}`}
                style={{
                  width: idx === currentIndex ? '24px' : '8px',
                  height: '4px',
                  borderRadius: '2px',
                  background: idx === currentIndex ? 'var(--color-gold)' : 'rgba(214, 184, 121, 0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Viewpoint Quick Selection Pills (Right / Bottom) */}
      <div
        className="tour-pills-bar"
        style={{
          position: 'absolute',
          bottom: '36px',
          right: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          zIndex: 10,
        }}
      >
        {viewpoints.map((vp, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={vp.id}
              onClick={() => setCurrentIndex(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 18px',
                background: isActive ? 'var(--color-gold)' : 'rgba(23, 25, 26, 0.78)',
                color: isActive ? 'var(--color-obsidian)' : 'var(--color-pearl)',
                border: `1px solid ${isActive ? 'var(--color-gold)' : 'var(--color-border-gold-subtle)'}`,
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                backdropFilter: 'blur(8px)',
                textAlign: 'left',
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em' }}>
                {vp.number}
              </span>
              <span style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.05em' }}>
                {vp.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
