import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useCMS } from '../../context/CMSContext';
import { Sun, Moon, Zap, Eye, Box, X } from 'lucide-react';

// Smooth Camera Lerper
function CameraRig({ targetPos, targetLookAt }) {
  const currentPos = useRef(new THREE.Vector3(...targetPos));
  const currentLookAt = useRef(new THREE.Vector3(...targetLookAt));

  useFrame(({ camera }) => {
    currentPos.current.lerp(new THREE.Vector3(...targetPos), 0.05);
    camera.position.copy(currentPos.current);

    currentLookAt.current.lerp(new THREE.Vector3(...targetLookAt), 0.05);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

// 3D Glowing Hotspot Marker
function GlowingHotspot({ position, title, description, onSelect, isSelected }) {
  const markerRef = useRef();

  useFrame((state) => {
    if (markerRef.current) {
      markerRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 3) * 0.08;
      markerRef.current.rotation.y = state.clock.getElapsedTime() * 1.5;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={markerRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect({ title, description });
        }}
        cursor="pointer"
      >
        <octahedronGeometry args={[0.22]} />
        <meshStandardMaterial
          color={isSelected ? '#CCFF00' : '#FF3366'}
          emissive={isSelected ? '#CCFF00' : '#FF3366'}
          emissiveIntensity={2.0}
          roughness={0.2}
        />
      </mesh>

      <Html distanceFactor={8} position={[0, 0.4, 0]} center>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect({ title, description });
          }}
          style={{
            backgroundColor: isSelected ? '#CCFF00' : 'rgba(15, 17, 24, 0.9)',
            backdropFilter: 'blur(12px)',
            color: isSelected ? '#0A0B0E' : '#FFFFFF',
            border: isSelected ? '1px solid #CCFF00' : '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '999px',
            padding: '5px 12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            boxShadow: isSelected ? '0 0 20px rgba(204, 255, 0, 0.5)' : '0 4px 14px rgba(0, 0, 0, 0.6)',
            pointerEvents: 'auto',
            transition: 'all 0.15s ease'
          }}
        >
          {title}
        </div>
      </Html>
    </group>
  );
}

// Rich Architectural Studio Environment
function StudioArchitecture({ mood }) {
  const neonColor = mood === 'midnight' ? '#CCFF00' : mood === 'day' ? '#FF6B8B' : '#00F0FF';

  return (
    <group>
      {/* Reflective Dark Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[34, 34]} />
        <meshPhysicalMaterial
          color="#151722"
          roughness={0.2}
          metalness={0.3}
          clearcoat={0.6}
        />
      </mesh>

      {/* Warm Ambient Architectural Walls */}
      <mesh position={[0, 4.5, -9]}>
        <planeGeometry args={[34, 9]} />
        <meshStandardMaterial color="#1C1F2D" roughness={0.6} />
      </mesh>
      <mesh position={[-11, 4.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[34, 9]} />
        <meshStandardMaterial color="#191C28" roughness={0.6} />
      </mesh>
      <mesh position={[11, 4.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[34, 9]} />
        <meshStandardMaterial color="#191C28" roughness={0.6} />
      </mesh>

      {/* Illuminated Ceiling Neon Beams */}
      {[-4, 0, 4].map((z, i) => (
        <mesh key={i} position={[0, 7.5, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 16, 16]} />
          <meshStandardMaterial
            color={neonColor}
            emissive={neonColor}
            emissiveIntensity={2.5}
          />
        </mesh>
      ))}

      {/* Spatial 1: Entry Archway & Glowing Welcome Sign */}
      <group position={[0, 0, 3.8]}>
        <mesh position={[0, 3.2, 0]}>
          <boxGeometry args={[4.8, 0.3, 0.3]} />
          <meshStandardMaterial color="#FF3366" emissive="#FF3366" emissiveIntensity={2.0} />
        </mesh>
        <mesh position={[-2.3, 1.6, 0]}>
          <boxGeometry args={[0.3, 3.2, 0.3]} />
          <meshStandardMaterial color="#FF3366" />
        </mesh>
        <mesh position={[2.3, 1.6, 0]}>
          <boxGeometry args={[0.3, 3.2, 0.3]} />
          <meshStandardMaterial color="#FF3366" />
        </mesh>
      </group>

      {/* Spatial 2: Crimson Velvet Circular Dining Booth */}
      <group position={[3.6, 0, 0.8]}>
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[1.8, 1.8, 1.0, 32, 1, false, 0, Math.PI * 1.4]} />
          <meshPhysicalMaterial color="#FF3366" roughness={0.35} clearcoat={0.4} />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.95, 24]} />
          <meshPhysicalMaterial color="#CCFF00" roughness={0.2} metalness={0.1} />
        </mesh>
      </group>

      {/* Spatial 3: Stainless Open Kitchen Pass & Warm Heat Lamps */}
      <group position={[-3.6, 0, -1.8]}>
        <mesh position={[0, 0.7, 0]}>
          <boxGeometry args={[5.2, 1.4, 1.3]} />
          <meshPhysicalMaterial color="#E5E7EB" metalness={0.9} roughness={0.12} clearcoat={0.8} />
        </mesh>
        {[-1.6, 0, 1.6].map((x, idx) => (
          <mesh key={idx} position={[x, 2.4, 0]}>
            <coneGeometry args={[0.26, 0.48, 16]} />
            <meshStandardMaterial color="#FFB800" emissive="#FF8A00" emissiveIntensity={2.0} />
          </mesh>
        ))}
      </group>

      {/* Spatial 4: Electric Blue Quartz Fizz Bar */}
      <group position={[3.2, 0, -4.2]}>
        <mesh position={[0, 0.7, 0]}>
          <boxGeometry args={[4.6, 1.4, 1.4]} />
          <meshPhysicalMaterial color="#0066FF" roughness={0.1} metalness={0.2} transmission={0.4} />
        </mesh>
        {[-1.2, 0, 1.2].map((x, idx) => (
          <mesh key={idx} position={[x, 0.45, 1.2]}>
            <cylinderGeometry args={[0.26, 0.26, 0.9, 16]} />
            <meshStandardMaterial color="#CCFF00" />
          </mesh>
        ))}
      </group>

      {/* Spatial 5: Velvet VIP Lounge Salon */}
      <group position={[0, 0, -5.8]}>
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[3.6, 0.75, 1.3]} />
          <meshPhysicalMaterial color="#8B5CF6" roughness={0.6} />
        </mesh>
        <mesh position={[0, 1.0, -0.5]}>
          <boxGeometry args={[3.6, 0.95, 0.3]} />
          <meshPhysicalMaterial color="#8B5CF6" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

export default function RestaurantTour() {
  const { data, activeViewpointIndex, setActiveViewpointIndex, tourMood, setTourMood, viewMode, setViewMode } = useCMS();
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  const viewpoints = data.viewpoints || [];
  const currentViewpoint = viewpoints[activeViewpointIndex] || viewpoints[0] || {
    name: 'The Neon Entry & Merch Wall',
    camera_x: 0,
    camera_y: 2.2,
    camera_z: 6.8,
    target_x: 0,
    target_y: 1.2,
    target_z: 0,
    description: 'Explore the culinary studio spaces.',
    hotspots: []
  };

  const cameraPos = [
    currentViewpoint.camera_x ?? 0,
    currentViewpoint.camera_y ?? 2.2,
    currentViewpoint.camera_z ?? 6.8
  ];

  const targetLookAt = [
    currentViewpoint.target_x ?? 0,
    currentViewpoint.target_y ?? 1.2,
    currentViewpoint.target_z ?? 0
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '660px',
        borderRadius: '28px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        backgroundColor: '#090A0E',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)',
        overflow: 'hidden'
      }}
    >
      {/* Top Glass HUD Controls Bar */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          right: '20px',
          zIndex: 20,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        {/* Active Viewpoint Badge */}
        <div
          style={{
            backgroundColor: 'rgba(15, 17, 24, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '999px',
            padding: '7px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
          }}
        >
          <span
            style={{
              backgroundColor: '#FF3366',
              color: '#FFF',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 800,
              padding: '2px 7px',
              borderRadius: '999px'
            }}
          >
            VP 0{activeViewpointIndex + 1}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '13.5px',
              fontWeight: 700,
              color: '#FFF'
            }}
          >
            {currentViewpoint.name}
          </span>
        </div>

        {/* Right: Mode & Mood Switchers */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              backgroundColor: 'rgba(15, 17, 24, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '999px',
              display: 'flex',
              padding: '3px'
            }}
          >
            <button
              onClick={() => setViewMode('3d')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 14px',
                borderRadius: '999px',
                border: 'none',
                backgroundColor: viewMode === '3d' ? '#CCFF00' : 'transparent',
                color: viewMode === '3d' ? '#0A0B0E' : '#9FA5B7',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Box size={13} /> 3D SCENE
            </button>
            <button
              onClick={() => setViewMode('photo')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 14px',
                borderRadius: '999px',
                border: 'none',
                backgroundColor: viewMode === 'photo' ? '#CCFF00' : 'transparent',
                color: viewMode === 'photo' ? '#0A0B0E' : '#9FA5B7',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Eye size={13} /> PHOTO
            </button>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(15, 17, 24, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '999px',
              display: 'flex',
              padding: '3px'
            }}
          >
            {[
              { id: 'day', label: 'Day', icon: Sun },
              { id: 'neon', label: 'Neon', icon: Zap },
              { id: 'midnight', label: 'Cyber', icon: Moon }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTourMood(id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 12px',
                  borderRadius: '999px',
                  border: 'none',
                  backgroundColor: tourMood === id ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  color: tourMood === id ? '#FFF' : '#646A7E',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Icon size={12} /> {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Tour Canvas or Photo Layer */}
      {viewMode === '3d' ? (
        <Canvas
          camera={{ position: [0, 2.2, 6.8], fov: 48 }}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
          style={{ width: '100%', height: '100%' }}
        >
          <Suspense fallback={null}>
            <CameraRig targetPos={cameraPos} targetLookAt={targetLookAt} />

            {/* Bright Studio Lighting */}
            <ambientLight intensity={1.2} />
            <directionalLight position={[10, 20, 15]} intensity={2.2} color="#FFFFFF" />
            <pointLight position={[0, 6, 0]} intensity={4.5} color="#00F0FF" />
            <pointLight position={[5, 4, -2]} intensity={3.5} color="#CCFF00" />
            <pointLight position={[-5, 4, 2]} intensity={3.5} color="#FF3366" />

            <StudioArchitecture mood={tourMood} />

            {/* Hotspots */}
            {currentViewpoint.hotspots &&
              currentViewpoint.hotspots.map((hs, idx) => (
                <GlowingHotspot
                  key={idx}
                  position={[hs.x || 0, hs.y || 1.4, hs.z || 0]}
                  title={hs.title}
                  description={hs.description}
                  isSelected={selectedHotspot?.title === hs.title}
                  onSelect={(spot) => setSelectedHotspot(spot)}
                />
              ))}

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 1.8}
              minPolarAngle={Math.PI / 3}
            />
          </Suspense>
        </Canvas>
      ) : (
        <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
          <img
            src={currentViewpoint.image_url}
            alt={currentViewpoint.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: tourMood === 'midnight' ? 'brightness(0.75) contrast(1.15)' : 'none'
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(9,10,14,0.9) 0%, transparent 50%)'
            }}
          />
        </div>
      )}

      {/* Selected Hotspot Detail Popup */}
      {selectedHotspot && (
        <div
          style={{
            position: 'absolute',
            bottom: '85px',
            right: '24px',
            backgroundColor: 'rgba(18, 20, 29, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '20px',
            padding: '20px 24px',
            maxWidth: '340px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
            zIndex: 30
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                backgroundColor: 'rgba(204, 255, 0, 0.12)',
                color: '#CCFF00',
                padding: '3px 8px',
                borderRadius: '999px',
                fontWeight: 700,
                border: '1px solid rgba(204, 255, 0, 0.3)'
              }}
            >
              SPACE HIGHLIGHT
            </span>
            <button
              onClick={() => setSelectedHotspot(null)}
              style={{
                color: '#9FA5B7',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={16} />
            </button>
          </div>
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '16px',
              fontWeight: 700,
              color: '#FFF',
              margin: '0 0 8px 0'
            }}
          >
            {selectedHotspot.title}
          </h4>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              lineHeight: 1.6,
              color: '#9FA5B7',
              margin: 0
            }}
          >
            {selectedHotspot.description}
          </p>
        </div>
      )}

      {/* Bottom Viewpoints Navigation Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: '18px',
          left: '20px',
          right: '20px',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px'
        }}
      >
        {viewpoints.map((vp, index) => {
          const isActive = index === activeViewpointIndex;
          return (
            <button
              key={vp.id || index}
              onClick={() => {
                setActiveViewpointIndex(index);
                setSelectedHotspot(null);
              }}
              style={{
                flexShrink: 0,
                backgroundColor: isActive ? '#CCFF00' : 'rgba(15, 17, 24, 0.85)',
                color: isActive ? '#0A0B0E' : '#9FA5B7',
                backdropFilter: 'blur(20px)',
                border: isActive ? '1px solid #CCFF00' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '999px',
                padding: '8px 16px',
                fontFamily: 'var(--font-display)',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: isActive ? '0 0 20px rgba(204, 255, 0, 0.35)' : 'none',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px' }}>0{index + 1}.</span>
              <span>{vp.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
