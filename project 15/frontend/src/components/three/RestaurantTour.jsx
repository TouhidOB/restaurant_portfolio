import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useCMS } from '../../context/CMSContext';
import { Sparkles, Sun, Moon, Zap, Eye, Box, Info } from 'lucide-react';

// Camera Rig that lerps smoothly to target viewpoint position
function CameraRig({ targetPos, targetLookAt }) {
  const currentPos = useRef(new THREE.Vector3(...targetPos));
  const currentLookAt = useRef(new THREE.Vector3(...targetLookAt));

  useFrame(({ camera }) => {
    // Lerp position
    currentPos.current.lerp(new THREE.Vector3(...targetPos), 0.05);
    camera.position.copy(currentPos.current);

    // Lerp lookAt
    currentLookAt.current.lerp(new THREE.Vector3(...targetLookAt), 0.05);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

// 3D Interactive Hotspot Marker
function HotspotMarker({ position, title, description, onSelect, isSelected }) {
  const markerRef = useRef();

  useFrame((state) => {
    if (markerRef.current) {
      markerRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 3) * 0.1;
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
          color={isSelected ? '#FFD928' : '#F04438'}
          emissive={isSelected ? '#FFD928' : '#F04438'}
          emissiveIntensity={0.6}
          roughness={0.2}
        />
      </mesh>

      {/* Floating 3D HTML Tooltip Badge */}
      <Html distanceFactor={8} position={[0, 0.4, 0]} center>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect({ title, description });
          }}
          style={{
            backgroundColor: isSelected ? '#FFD928' : '#171717',
            color: isSelected ? '#171717' : '#FFF5E6',
            border: '2px solid #171717',
            borderRadius: '6px',
            padding: '3px 8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 800,
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            boxShadow: '2px 2px 0 #171717',
            pointerEvents: 'auto',
            transform: 'scale(1)',
            transition: 'all 0.15s ease'
          }}
        >
          {title}
        </div>
      </Html>
    </group>
  );
}

// Architectural Studio Environment 3D Geometry
function StudioArchitecture({ activeIndex, mood }) {
  // Colors based on mood
  const wallColor = mood === 'midnight' ? '#111424' : mood === 'day' ? '#FFF9F0' : '#22283A';
  const neonLightColor = mood === 'midnight' ? '#FFD928' : mood === 'day' ? '#F04438' : '#2455D6';

  return (
    <group>
      {/* Studio Floor (Checkerboard Pattern) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#2B2D42" roughness={0.4} />
      </mesh>

      {/* Studio Back & Side Walls */}
      <mesh position={[0, 4, -8]}>
        <planeGeometry args={[30, 8]} />
        <meshStandardMaterial color={wallColor} roughness={0.6} />
      </mesh>
      <mesh position={[-10, 4, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[30, 8]} />
        <meshStandardMaterial color={wallColor} roughness={0.6} />
      </mesh>
      <mesh position={[10, 4, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[30, 8]} />
        <meshStandardMaterial color={wallColor} roughness={0.6} />
      </mesh>

      {/* Neon Ceiling Light Bars */}
      {[-4, 0, 4].map((z, i) => (
        <mesh key={i} position={[0, 7.5, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 14, 16]} />
          <meshStandardMaterial
            color={neonLightColor}
            emissive={neonLightColor}
            emissiveIntensity={mood === 'midnight' ? 2.5 : 1.2}
          />
        </mesh>
      ))}

      {/* Viewpoint 1: The Neon Entry Archway */}
      <group position={[0, 0, 4]}>
        <mesh position={[0, 3.2, 0]}>
          <boxGeometry args={[4.5, 0.4, 0.4]} />
          <meshStandardMaterial color="#FFD928" emissive="#FFD928" emissiveIntensity={1} />
        </mesh>
        <mesh position={[-2.1, 1.6, 0]}>
          <boxGeometry args={[0.4, 3.2, 0.4]} />
          <meshStandardMaterial color="#F04438" />
        </mesh>
        <mesh position={[2.1, 1.6, 0]}>
          <boxGeometry args={[0.4, 3.2, 0.4]} />
          <meshStandardMaterial color="#F04438" />
        </mesh>
      </group>

      {/* Viewpoint 2: Circular Comic Dining Booths */}
      <group position={[3.5, 0, 1]}>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[1.6, 1.6, 0.9, 16, 1, false, 0, Math.PI * 1.4]} />
          <meshStandardMaterial color="#F04438" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 0.9, 16]} />
          <meshStandardMaterial color="#FFD928" />
        </mesh>
      </group>

      {/* Viewpoint 3: The Open Kitchen & Pass Counter */}
      <group position={[-3.5, 0, -2]}>
        {/* Pass Counter */}
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[5, 1.2, 1.2]} />
          <meshStandardMaterial color="#E0E0E0" metalness={0.7} roughness={0.2} />
        </mesh>
        {/* Warm Heat Lamps */}
        {[-1.5, 0, 1.5].map((x, idx) => (
          <mesh key={idx} position={[x, 2.2, 0]}>
            <coneGeometry args={[0.3, 0.5, 16]} />
            <meshStandardMaterial color="#FFD928" emissive="#F04438" emissiveIntensity={1.2} />
          </mesh>
        ))}
      </group>

      {/* Viewpoint 4: The Cocktail Lab & Fizz Bar */}
      <group position={[2.5, 0, -4]}>
        <mesh position={[0, 0.65, 0]}>
          <boxGeometry args={[4.2, 1.3, 1.4]} />
          <meshStandardMaterial color="#2455D6" roughness={0.1} metalness={0.4} />
        </mesh>
        {/* Stools */}
        {[-1.2, 0, 1.2].map((x, idx) => (
          <mesh key={idx} position={[x, 0.4, 1.2]}>
            <cylinderGeometry args={[0.25, 0.25, 0.8, 16]} />
            <meshStandardMaterial color="#FFD928" />
          </mesh>
        ))}
      </group>

      {/* Viewpoint 5: VIP Pop Studio Lounge */}
      <group position={[0, 0, -5.5]}>
        {/* Plush Velvet Sofa */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[3.2, 0.7, 1.2]} />
          <meshStandardMaterial color="#F04438" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.9, -0.45]}>
          <boxGeometry args={[3.2, 0.9, 0.3]} />
          <meshStandardMaterial color="#F04438" roughness={0.8} />
        </mesh>
        {/* Low Coffee Table */}
        <mesh position={[0, 0.25, 1.2]}>
          <boxGeometry args={[1.8, 0.4, 0.8]} />
          <meshStandardMaterial color="#FFD928" />
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
    camera_y: 2.5,
    camera_z: 7.5,
    target_x: 0,
    target_y: 1.2,
    target_z: 0,
    description: 'Explore the playful pop art dining studio.',
    hotspots: []
  };

  const cameraPos = [
    currentViewpoint.camera_x ?? 0,
    currentViewpoint.camera_y ?? 2.5,
    currentViewpoint.camera_z ?? 7.5
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
        height: '650px',
        borderRadius: '24px',
        border: '4px solid #171717',
        backgroundColor: '#171717',
        boxShadow: '10px 10px 0px #FFD928',
        overflow: 'hidden'
      }}
    >
      {/* Top HUD Controls Bar */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          right: '16px',
          zIndex: 20,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        {/* Left: Viewpoint Title Badge */}
        <div
          style={{
            backgroundColor: '#FFD928',
            border: '2px solid #171717',
            borderRadius: '10px',
            padding: '8px 16px',
            boxShadow: '3px 3px 0 #171717',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span
            style={{
              backgroundColor: '#F04438',
              color: '#FFF',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '2px 6px',
              borderRadius: '4px'
            }}
          >
            VP 0{activeViewpointIndex + 1}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              color: '#171717'
            }}
          >
            {currentViewpoint.name}
          </span>
        </div>

        {/* Right: Mode & Mood Switchers */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* 3D vs Photo toggle */}
          <div
            style={{
              backgroundColor: '#FFF5E6',
              border: '2px solid #171717',
              borderRadius: '8px',
              display: 'flex',
              padding: '2px',
              boxShadow: '2px 2px 0 #171717'
            }}
          >
            <button
              onClick={() => setViewMode('3d')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 10px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: viewMode === '3d' ? '#2455D6' : 'transparent',
                color: viewMode === '3d' ? '#FFF' : '#171717',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Box size={14} /> 3D SCENE
            </button>
            <button
              onClick={() => setViewMode('photo')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 10px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: viewMode === 'photo' ? '#2455D6' : 'transparent',
                color: viewMode === 'photo' ? '#FFF' : '#171717',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Eye size={14} /> PHOTO
            </button>
          </div>

          {/* Mood Selector (Day / Neon / Midnight) */}
          <div
            style={{
              backgroundColor: '#FFF5E6',
              border: '2px solid #171717',
              borderRadius: '8px',
              display: 'flex',
              padding: '2px',
              boxShadow: '2px 2px 0 #171717'
            }}
          >
            {[
              { id: 'day', label: 'Day', icon: Sun },
              { id: 'neon', label: 'Neon', icon: Zap },
              { id: 'midnight', label: 'Night', icon: Moon }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTourMood(id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: tourMood === id ? '#F04438' : 'transparent',
                  color: tourMood === id ? '#FFF' : '#171717',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Icon size={13} /> {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Tour Canvas or Photo Layer */}
      {viewMode === '3d' ? (
        <Canvas
          camera={{ position: [0, 2.5, 7.5], fov: 50 }}
          gl={{ antialias: true }}
          style={{ width: '100%', height: '100%' }}
        >
          <Suspense fallback={null}>
            <CameraRig targetPos={cameraPos} targetLookAt={targetLookAt} />

            {/* Dynamic Mood Lighting */}
            {tourMood === 'day' && (
              <>
                <ambientLight intensity={1.2} />
                <directionalLight position={[10, 15, 10]} intensity={1.8} />
              </>
            )}
            {tourMood === 'neon' && (
              <>
                <ambientLight intensity={0.5} />
                <pointLight position={[0, 4, 0]} intensity={3.5} color="#2455D6" />
                <pointLight position={[4, 2, -2]} intensity={2.5} color="#FFD928" />
                <pointLight position={[-4, 2, 2]} intensity={2.5} color="#F04438" />
              </>
            )}
            {tourMood === 'midnight' && (
              <>
                <ambientLight intensity={0.25} />
                <pointLight position={[0, 3, 0]} intensity={4.0} color="#FFD928" />
                <pointLight position={[-3, 2, -3]} intensity={3.0} color="#00C389" />
              </>
            )}

            <StudioArchitecture activeIndex={activeViewpointIndex} mood={tourMood} />

            {/* Render 3D Hotspots */}
            {currentViewpoint.hotspots &&
              currentViewpoint.hotspots.map((hs, idx) => (
                <HotspotMarker
                  key={idx}
                  position={[hs.x || 0, hs.y || 1.5, hs.z || 0]}
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
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <img
            src={currentViewpoint.image_url}
            alt={currentViewpoint.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: tourMood === 'midnight' ? 'brightness(0.7) contrast(1.2)' : 'none'
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(23,23,23,0.8) 0%, transparent 50%)'
            }}
          />
        </div>
      )}

      {/* Selected Hotspot Detail Popup Overlay */}
      {selectedHotspot && (
        <div
          style={{
            position: 'absolute',
            bottom: '90px',
            right: '20px',
            backgroundColor: '#FFF5E6',
            border: '3px solid #171717',
            borderRadius: '16px',
            padding: '16px 20px',
            maxWidth: '340px',
            boxShadow: '6px 6px 0px #171717',
            zIndex: 30
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                backgroundColor: '#FFD928',
                padding: '2px 8px',
                borderRadius: '4px',
                fontWeight: 800,
                border: '1px solid #171717'
              }}
            >
              HOTSPOT FEATURE
            </span>
            <button
              onClick={() => setSelectedHotspot(null)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontWeight: 900
              }}
            >
              ✕
            </button>
          </div>
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.2rem',
              color: '#171717',
              margin: '0 0 6px 0'
            }}
          >
            {selectedHotspot.title}
          </h4>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              lineHeight: 1.5,
              color: '#444',
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
          bottom: '16px',
          left: '16px',
          right: '16px',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
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
                backgroundColor: isActive ? '#F04438' : '#FFF5E6',
                color: isActive ? '#FFF' : '#171717',
                border: '2px solid #171717',
                borderRadius: '8px',
                padding: '8px 14px',
                fontFamily: 'var(--font-display)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: isActive ? '3px 3px 0 #FFD928' : '2px 2px 0 #171717',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>0{index + 1}.</span>
              <span>{vp.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
