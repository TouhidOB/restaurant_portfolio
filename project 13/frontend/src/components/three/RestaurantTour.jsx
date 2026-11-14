import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useCMS } from '../../context/CMSContext';

// Dynamic camera mover using smooth lerping
function TourCameraController({ targetPos, targetLookAt }) {
  const currentPos = useRef(new THREE.Vector3(targetPos[0], targetPos[1], targetPos[2]));
  const currentLookAt = useRef(new THREE.Vector3(targetLookAt[0], targetLookAt[1], targetLookAt[2]));

  useFrame((state) => {
    const destPos = new THREE.Vector3(targetPos[0], targetPos[1], targetPos[2]);
    const destLookAt = new THREE.Vector3(targetLookAt[0], targetLookAt[1], targetLookAt[2]);

    currentPos.current.lerp(destPos, 0.04);
    currentLookAt.current.lerp(destLookAt, 0.04);

    state.camera.position.copy(currentPos.current);
    state.camera.lookAt(currentLookAt.current);
  });

  return null;
}

// 3D Hotspot Pin
function HotspotPin({ position, title, description }) {
  const [hovered, setHovered] = useState(false);
  const pinRef = useRef();

  useFrame((state) => {
    if (pinRef.current) {
      pinRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2.8) * 0.08;
    }
  });

  return (
    <group ref={pinRef} position={position}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial
          color={hovered ? '#FF2E88' : '#21D4E8'}
          emissive={hovered ? '#FF2E88' : '#21D4E8'}
          emissiveIntensity={hovered ? 1.5 : 0.8}
        />
      </mesh>
      <mesh position={[0, -0.16, 0]}>
        <coneGeometry args={[0.08, 0.22, 12]} />
        <meshStandardMaterial color="#FF2E88" />
      </mesh>

      {hovered && (
        <Html distanceFactor={10} position={[0, 0.45, 0]} center>
          <div style={{
            background: 'rgba(17, 19, 22, 0.95)',
            color: '#F6F4F0',
            padding: '8px 14px',
            borderRadius: '6px',
            boxShadow: '0 8px 24px rgba(255, 46, 136, 0.25)',
            border: '1px solid #FF2E88',
            whiteSpace: 'nowrap',
            fontSize: '12px',
            pointerEvents: 'none',
            textAlign: 'center',
            fontFamily: "'Space Grotesk', sans-serif"
          }}>
            <strong style={{ display: 'block', color: '#21D4E8', marginBottom: '2px' }}>{title}</strong>
            <span style={{ fontSize: '11px', opacity: 0.85 }}>{description}</span>
          </div>
        </Html>
      )}
    </group>
  );
}

// Interior & Exterior Scene geometry for the 5 viewpoints
function TourPochaScene({ activeIndex }) {
  return (
    <group>
      {/* Wet Road / Pocha Floor */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[18, 0.2, 16]} />
        <meshStandardMaterial color="#1B1D22" roughness={0.25} metalness={0.65} />
      </mesh>

      {/* Main Storefront & Counter Wall */}
      <mesh position={[0, 2.5, -4]}>
        <boxGeometry args={[16, 5, 0.6]} />
        <meshStandardMaterial color="#22252C" roughness={0.8} />
      </mesh>

      {/* Neon Wall Accents */}
      <mesh position={[0, 4.6, -3.6]}>
        <boxGeometry args={[6, 0.3, 0.1]} />
        <meshStandardMaterial color="#FF2E88" emissive="#FF2E88" emissiveIntensity={1.8} />
      </mesh>
      <mesh position={[0, 4.0, -3.6]}>
        <boxGeometry args={[4.2, 0.2, 0.1]} />
        <meshStandardMaterial color="#21D4E8" emissive="#21D4E8" emissiveIntensity={1.5} />
      </mesh>

      {/* Round Stainless Steel Pocha Tables with Colored Plastic Stools */}
      <group position={[-2.4, 0, 1.2]}>
        {/* Tabletop */}
        <mesh position={[0, 0.72, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 0.04, 24]} />
          <meshStandardMaterial color="#AAB5C9" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Table Leg */}
        <mesh position={[0, 0.36, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.7, 12]} />
          <meshStandardMaterial color="#111316" metalness={0.7} />
        </mesh>
        {/* Colorful Pocha Stool (Blue) */}
        <mesh position={[0.65, 0.25, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.5, 16]} />
          <meshStandardMaterial color="#21D4E8" roughness={0.5} />
        </mesh>
      </group>

      <group position={[2.4, 0, 1.2]}>
        <mesh position={[0, 0.72, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 0.04, 24]} />
          <meshStandardMaterial color="#AAB5C9" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.36, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.7, 12]} />
          <meshStandardMaterial color="#111316" metalness={0.7} />
        </mesh>
        {/* Colorful Pocha Stool (Red) */}
        <mesh position={[-0.65, 0.25, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.5, 16]} />
          <meshStandardMaterial color="#FF2E88" roughness={0.5} />
        </mesh>
      </group>

      {/* Food Counter with Wok Cauldrons */}
      <mesh position={[0, 0.7, -2.6]}>
        <boxGeometry args={[5.5, 1.4, 1.2]} />
        <meshStandardMaterial color="#2E333D" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[-1.2, 1.45, -2.6]}>
        <cylinderGeometry args={[0.45, 0.35, 0.25, 16]} />
        <meshStandardMaterial color="#C83E2D" roughness={0.5} />
      </mesh>
      <mesh position={[1.2, 1.45, -2.6]}>
        <cylinderGeometry args={[0.45, 0.35, 0.25, 16]} />
        <meshStandardMaterial color="#1A1C20" metalness={0.8} />
      </mesh>

      {/* Hotspots */}
      <HotspotPin
        position={[0, 2.8, -2.5]}
        title="Live Fire Wok Station"
        description="High-heat stir fries, spicy tteokbokki & sizzling pans"
      />
      <HotspotPin
        position={[-2.4, 1.2, 1.2]}
        title="Stainless Pocha Table"
        description="Round steel tables with cold soju and sizzling anju"
      />
      <HotspotPin
        position={[2.4, 1.2, 1.2]}
        title="Midnight Chimaek Table"
        description="Double-fried chicken towers and cold draft beer"
      />
    </group>
  );
}

export default function RestaurantTour() {
  const { content, activeTourIndex, setActiveTourIndex } = useCMS();
  const viewpoints = content.tour_viewpoints || [];

  const activeVp = viewpoints[activeTourIndex] || viewpoints[0] || {};

  const parsePos = (posStr, defaultVal) => {
    try {
      if (typeof posStr === 'string' && posStr.startsWith('[')) {
        return JSON.parse(posStr);
      }
    } catch (e) {}
    return defaultVal;
  };

  const camPos = parsePos(activeVp.camera_position, [0, 3.2, 8.5]);
  const camTarget = parsePos(activeVp.camera_target, [0, 1.8, 0]);

  // Lighting modes
  const [ambiance, setAmbiance] = useState('neon'); // 'neon', 'amber', 'rain'

  const lightConfigs = {
    neon: { ambient: '#1C212B', point: '#FF2E88', sub: '#21D4E8', bg: '#0D0F12', intensity: 2.5 },
    amber: { ambient: '#2B221A', point: '#FFB347', sub: '#FF594D', bg: '#141210', intensity: 2.2 },
    rain: { ambient: '#111822', point: '#21D4E8', sub: '#777B83', bg: '#0A0C10', intensity: 1.8 },
  };

  const currLight = lightConfigs[ambiance];

  return (
    <div style={{ position: 'relative', width: '100%', height: '600px', borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--color-border)', backgroundColor: '#0D0F12' }}>
      
      {/* Top Header & Ambiance Toggle */}
      <div style={{
        position: 'absolute',
        top: 18,
        left: 20,
        right: 20,
        zIndex: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ background: 'rgba(17, 19, 22, 0.88)', backdropFilter: 'blur(10px)', padding: '8px 16px', borderRadius: '999px', border: '1px solid rgba(255, 46, 136, 0.4)' }}>
          <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-magenta)', fontWeight: 700 }}>
            Active Viewpoint: 0{activeTourIndex + 1} / 0{viewpoints.length}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px', background: 'rgba(17, 19, 22, 0.88)', backdropFilter: 'blur(10px)', padding: '4px', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
          {['neon', 'amber', 'rain'].map((mode) => (
            <button
              key={mode}
              onClick={() => setAmbiance(mode)}
              style={{
                background: ambiance === mode ? 'var(--color-magenta)' : 'transparent',
                color: '#fff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                fontFamily: 'var(--font-condensed)',
                transition: 'all 0.2s ease'
              }}
            >
              {mode === 'neon' ? '🚨 Midnight Neon' : mode === 'amber' ? '🏮 Pocha Amber' : '🌧️ Rain Mist'}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: camPos, fov: 46 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={[currLight.bg]} />
        <ambientLight intensity={0.4} color={currLight.ambient} />
        <pointLight position={[0, 4, -1]} intensity={currLight.intensity} color={currLight.point} />
        <pointLight position={[-3, 2, 2]} intensity={1.5} color={currLight.sub} />

        <TourCameraController targetPos={camPos} targetLookAt={camTarget} />
        <TourPochaScene activeIndex={activeTourIndex} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>

      {/* Bottom Viewpoints Selector Bar */}
      <div style={{
        position: 'absolute',
        bottom: 18,
        left: 20,
        right: 20,
        zIndex: 10,
        display: 'flex',
        gap: '10px',
        overflowX: 'auto',
        paddingBottom: '4px'
      }}>
        {viewpoints.map((vp, index) => {
          const isSelected = activeTourIndex === index;
          return (
            <button
              key={vp.id || index}
              onClick={() => setActiveTourIndex(index)}
              style={{
                flex: '1 0 160px',
                background: isSelected ? 'rgba(255, 46, 136, 0.95)' : 'rgba(27, 29, 34, 0.88)',
                backdropFilter: 'blur(10px)',
                border: isSelected ? '1px solid #FFFFFF' : '1px solid var(--color-border)',
                color: '#FFFFFF',
                padding: '10px 14px',
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? '0 6px 20px rgba(255, 46, 136, 0.4)' : 'none'
              }}
            >
              <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: isSelected ? '#FFFFFF' : 'var(--color-cyan)', fontWeight: 700 }}>
                Scene 0{index + 1}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: 'var(--font-display)' }}>
                {vp.title}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
