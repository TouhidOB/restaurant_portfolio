import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useCMS } from '../../context/CMSContext';

// Dynamic camera mover using lerp
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
      pinRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2.5) * 0.08;
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
          color={hovered ? '#B96F4F' : '#E9DFCF'}
          emissive={hovered ? '#B96F4F' : '#302F2B'}
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[0, -0.16, 0]}>
        <coneGeometry args={[0.08, 0.22, 12]} />
        <meshStandardMaterial color="#B96F4F" />
      </mesh>

      {hovered && (
        <Html distanceFactor={10} position={[0, 0.4, 0]} center>
          <div style={{
            background: 'rgba(38, 58, 72, 0.95)',
            color: '#F7F3EA',
            padding: '8px 14px',
            borderRadius: '6px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            border: '1px solid #B96F4F',
            whiteSpace: 'nowrap',
            fontSize: '12px',
            pointerEvents: 'none',
            textAlign: 'center'
          }}>
            <strong style={{ display: 'block', color: '#FFD2B8', marginBottom: '2px' }}>{title}</strong>
            <span style={{ fontSize: '11px', opacity: 0.85 }}>{description}</span>
          </div>
        </Html>
      )}
    </group>
  );
}

// Architectural Model for the Tour Viewpoints
function TourArchitecturalScene({ activeIndex }) {
  return (
    <group>
      {/* Central Terrace Floor */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[18, 0.2, 16]} />
        <meshStandardMaterial color="#C88265" roughness={0.78} />
      </mesh>

      {/* Main Arch Wall */}
      <group position={[0, 0, -4]}>
        {/* Central Arch */}
        <mesh position={[-2.4, 2.5, 0]}>
          <boxGeometry args={[0.5, 5, 0.5]} />
          <meshStandardMaterial color="#E9DFCF" roughness={0.75} />
        </mesh>
        <mesh position={[2.4, 2.5, 0]}>
          <boxGeometry args={[0.5, 5, 0.5]} />
          <meshStandardMaterial color="#E9DFCF" roughness={0.75} />
        </mesh>
        <mesh position={[0, 5, 0]}>
          <torusGeometry args={[2.4, 0.25, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#E9DFCF" roughness={0.75} />
        </mesh>
      </group>

      {/* Outdoor Dining Tables with Linen */}
      <group position={[-2.2, 0, 1.5]}>
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.65, 0.65, 0.9, 24]} />
          <meshStandardMaterial color="#F7F3EA" roughness={0.6} />
        </mesh>
        {/* Tabletop plate and glassware */}
        <mesh position={[0, 0.92, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.04, 16]} />
          <meshStandardMaterial color="#B96F4F" roughness={0.7} />
        </mesh>
      </group>

      <group position={[2.2, 0, 1.5]}>
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.65, 0.65, 0.9, 24]} />
          <meshStandardMaterial color="#F7F3EA" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.92, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.04, 16]} />
          <meshStandardMaterial color="#B96F4F" roughness={0.7} />
        </mesh>
      </group>

      {/* Wine Cellar Vault Simulation (viewpoint 5) */}
      <group position={[0, 0, -6]}>
        <mesh position={[-4, 1.8, 0]}>
          <boxGeometry args={[0.8, 3.6, 1.8]} />
          <meshStandardMaterial color="#4A3828" roughness={0.9} />
        </mesh>
        <mesh position={[4, 1.8, 0]}>
          <boxGeometry args={[0.8, 3.6, 1.8]} />
          <meshStandardMaterial color="#4A3828" roughness={0.9} />
        </mesh>
      </group>

      {/* Hotspots for each scene */}
      <HotspotPin
        position={[0, 2.5, -3.8]}
        title="Limestone Colonnade"
        description="Hand-chiseled 1928 Provençal limestone arches"
      />
      <HotspotPin
        position={[-2.2, 1.4, 1.5]}
        title="Lombardy Linen Table"
        description="Crafted artisanal cutlery and sea glass centerpieces"
      />
      <HotspotPin
        position={[2.2, 1.4, 1.5]}
        title="Cliffside Overlook"
        description="Panoramic Mediterranean Sea horizon"
      />
    </group>
  );
}

export default function RestaurantTour() {
  const { content, activeTourIndex, setActiveTourIndex } = useCMS();
  const viewpoints = content.tour_viewpoints || [];

  // Parse camera coords safely
  const activeVp = viewpoints[activeTourIndex] || viewpoints[0] || {};
  
  const parsePos = (posStr, defaultVal) => {
    try {
      if (typeof posStr === 'string' && posStr.startsWith('[')) {
        return JSON.parse(posStr);
      }
    } catch (e) {}
    return defaultVal;
  };

  const camPos = parsePos(activeVp.camera_position, [0, 2.5, 7.0]);
  const camTarget = parsePos(activeVp.camera_target, [0, 1.2, 0]);

  // Lighting modes
  const [ambiance, setAmbiance] = useState('golden'); // 'golden', 'sunset', 'twilight'

  const lightConfigs = {
    golden: { ambient: '#FFF5E8', dir: '#FFD79E', bg: '#EDF2F7', intensity: 1.6 },
    sunset: { ambient: '#FFE0CC', dir: '#FF9E66', bg: '#2B232E', intensity: 1.4 },
    twilight: { ambient: '#A5C4D4', dir: '#6A92AB', bg: '#17232E', intensity: 1.0 },
  };

  const currLight = lightConfigs[ambiance];

  return (
    <div style={{ position: 'relative', width: '100%', height: '620px', borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--c-border)' }}>
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
        <div style={{ background: 'rgba(38, 58, 72, 0.85)', backdropFilter: 'blur(8px)', padding: '8px 16px', borderRadius: '999px', border: '1px solid rgba(233, 223, 207, 0.3)' }}>
          <span style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FFD2B8', fontWeight: 700 }}>
            Active Viewpoint: {activeTourIndex + 1} of {viewpoints.length}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px', background: 'rgba(38, 58, 72, 0.85)', backdropFilter: 'blur(8px)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(233, 223, 207, 0.2)' }}>
          {['golden', 'sunset', 'twilight'].map((mode) => (
            <button
              key={mode}
              onClick={() => setAmbiance(mode)}
              style={{
                background: ambiance === mode ? 'var(--c-terracotta)' : 'transparent',
                color: '#fff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {mode === 'golden' ? '☀️ Golden' : mode === 'sunset' ? '🌅 Sunset' : '🌙 Twilight'}
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
        <ambientLight intensity={0.7} color={currLight.ambient} />
        <directionalLight
          position={[6, 8, 4]}
          intensity={currLight.intensity}
          color={currLight.dir}
          castShadow
        />

        <TourCameraController targetPos={camPos} targetLookAt={camTarget} />
        <TourArchitecturalScene activeIndex={activeTourIndex} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>

      {/* Bottom Scene Navigation Bar */}
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
                background: isSelected ? 'rgba(185, 111, 79, 0.95)' : 'rgba(38, 58, 72, 0.88)',
                backdropFilter: 'blur(10px)',
                border: isSelected ? '1px solid #FFD2B8' : '1px solid rgba(233, 223, 207, 0.25)',
                color: '#FFFFFF',
                padding: '10px 14px',
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? '0 6px 20px rgba(185, 111, 79, 0.4)' : 'none'
              }}
            >
              <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: isSelected ? '#FFE4D6' : '#A9BDB5', fontWeight: 700 }}>
                Scene 0{index + 1}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {{ exterior: 'Riviera Exterior', courtyard: 'Courtyard & Urns', salon: 'Main Salon', terrace: 'Cliffside Terrace', cellar: 'Wine Cellar' }[vp.slug] || vp.title}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
