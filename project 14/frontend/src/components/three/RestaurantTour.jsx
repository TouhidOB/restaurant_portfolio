import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { ChevronLeft, ChevronRight, Maximize2, Sparkles, Image as ImageIcon, Box } from 'lucide-react';

// Hotspot Pin with glowing pulse
function Hotspot({ position, label, onClick }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 1.5;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        cursor="pointer"
      >
        <octahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial
          color={hovered ? '#EDE5D8' : '#C4A878'}
          emissive="#94734F"
          emissiveIntensity={hovered ? 1.2 : 0.6}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
      <Html position={[0, 0.45, 0]} center distanceFactor={12}>
        <div style={{
          background: 'rgba(28, 27, 25, 0.88)',
          backdropFilter: 'blur(8px)',
          border: '1px solid #94734F',
          color: '#EDE5D8',
          padding: '4px 10px',
          borderRadius: '2px',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          boxShadow: '0 4px 14px rgba(0,0,0,0.6)'
        }}>
          {label}
        </div>
      </Html>
    </group>
  );
}

// 3D Tour Interior Architecture Model
function TourSceneInterior({ activeViewpointIndex, mood }) {
  const lightColor = mood === 'fire' ? '#FF7A33' : mood === 'vintage' ? '#C4A878' : '#D89A4B';

  return (
    <group>
      {/* Dark Basalt Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[32, 32]} />
        <meshStandardMaterial color="#121212" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Perimeter Walls */}
      <mesh position={[0, 4, -12]}>
        <boxGeometry args={[32, 8, 0.5]} />
        <meshStandardMaterial color="#1C1B19" roughness={0.7} />
      </mesh>
      <mesh position={[-16, 4, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[24, 8, 0.5]} />
        <meshStandardMaterial color="#1C1B19" roughness={0.7} />
      </mesh>
      <mesh position={[16, 4, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[24, 8, 0.5]} />
        <meshStandardMaterial color="#1C1B19" roughness={0.7} />
      </mesh>

      {/* VP1: Entrance Façade Portal */}
      <group position={[0, 2.5, 10]}>
        <mesh>
          <boxGeometry args={[6, 5, 0.4]} />
          <meshStandardMaterial color="#94734F" roughness={0.4} metalness={0.8} />
        </mesh>
      </group>

      {/* VP2: Grand Reception Counter */}
      <group position={[-3, 1.1, 4]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.5, 2.2, 1.4]} />
          <meshStandardMaterial color="#181818" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[0, 1.15, 0]}>
          <boxGeometry args={[4.7, 0.1, 1.6]} />
          <meshStandardMaterial color="#94734F" roughness={0.3} metalness={0.9} />
        </mesh>
      </group>

      {/* VP3: Main Dining Room Banquettes & Tables */}
      {[-4, 4].map((x, idx) => (
        <group key={idx} position={[x, 0, -2]}>
          {/* Dark Walnut Dining Table */}
          <mesh position={[0, 1.2, 0]} castShadow>
            <cylinderGeometry args={[1.5, 1.5, 0.1, 32]} />
            <meshStandardMaterial color="#49362B" roughness={0.4} metalness={0.2} />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 1.2, 16]} />
            <meshStandardMaterial color="#94734F" metalness={0.8} />
          </mesh>
          {/* Leather Chairs */}
          {[-1.6, 1.6].map((cx, i) => (
            <mesh key={i} position={[cx, 0.7, 0]}>
              <boxGeometry args={[0.7, 1.2, 0.7]} />
              <meshStandardMaterial color="#292724" roughness={0.6} />
            </mesh>
          ))}
          {/* Overhead Bronze Lamp */}
          <pointLight position={[0, 3.5, 0]} color={lightColor} intensity={1.8} distance={6} />
        </group>
      ))}

      {/* VP4: The Open Hearth Parrilla & Grill (Rear Center-Left) */}
      <group position={[6, 1.8, -9]}>
        <mesh castShadow>
          <boxGeometry args={[5, 3.6, 2.2]} />
          <meshStandardMaterial color="#1C1B19" roughness={0.8} />
        </mesh>
        {/* Glowing Fire Hearth */}
        <mesh position={[0, 0, 1.05]}>
          <planeGeometry args={[3.8, 1.8]} />
          <meshBasicMaterial color="#FF6622" />
        </mesh>
        <pointLight position={[0, 0, 1.5]} color="#FF6B2B" intensity={3.5} distance={10} />
      </group>

      {/* VP5: Wine Cellar Glass Tower (Rear Left) */}
      <group position={[-8, 3.5, -9]}>
        <mesh>
          <boxGeometry args={[6, 7, 2.5]} />
          <meshPhysicalMaterial
            color="#292724"
            transmission={0.8}
            roughness={0.1}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Golden Backlight for Wine Bottles */}
        <pointLight position={[0, 0, 0]} color="#C4A878" intensity={2.4} distance={8} />
      </group>

      {/* Interactive Hotspots */}
      <Hotspot position={[0, 2.5, 8.5]} label="Grand Entrance" />
      <Hotspot position={[-3, 2.2, 4]} label="Reception Concierge" />
      <Hotspot position={[0, 2.2, -2]} label="Main Dining Salon" />
      <Hotspot position={[6, 2.8, -7.5]} label="The Hearth Grill" />
      <Hotspot position={[-8, 3, -7.5]} label="Grand Reserve Vault" />
    </group>
  );
}

// Camera Lerp Controller for Active Viewpoint
function CameraTourController({ targetPos, targetLookAt }) {
  useFrame((state) => {
    state.camera.position.lerp(new THREE.Vector3(...targetPos), 0.04);
  });
  return null;
}

export default function RestaurantTour({ viewpoints = [] }) {
  const [activeIndex, setActiveIndex] = useState(2); // Default to Main Dining Room
  const [mood, setMood] = useState('classic'); // classic, fire, vintage
  const [viewMode, setViewMode] = useState('3d'); // '3d' or 'photo'
  const containerRef = useRef();

  const currentVp = viewpoints[activeIndex] || viewpoints[0] || {
    title: "Main Dining Room",
    subtitle: "Bespoke Leather Banquettes & Sculptural Chandelier",
    description: "Intimate dining partitions crafted from dark smoked oak, supple saddle leather banquettes, and hand-blown smoked crystal chandeliers.",
    camera_position: [0, 2.5, 7],
    camera_target: [0, 1.8, -2],
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80"
  };

  const cameraPos = currentVp.camera_position?.length === 3 ? currentVp.camera_position : [0, 2.5, 7];
  const cameraTarget = currentVp.camera_target?.length === 3 ? currentVp.camera_target : [0, 1.8, -2];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % viewpoints.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + viewpoints.length) % viewpoints.length);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '680px',
        position: 'relative',
        background: '#101010',
        border: '1px solid var(--border-subtle)',
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: '0 24px 60px rgba(0,0,0,0.85)'
      }}
    >
      {/* 3D WebGL Canvas Mode */}
      {viewMode === '3d' ? (
        <Canvas
          camera={{ position: cameraPos, fov: 50 }}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={[mood === 'fire' ? '#18120e' : mood === 'vintage' ? '#141217' : '#101010']} />
          <ambientLight intensity={0.65} color="#282522" />
          <directionalLight position={[6, 12, 8]} intensity={0.8} color="#EDE5D8" />

          <TourSceneInterior activeViewpointIndex={activeIndex} mood={mood} />
          <CameraTourController targetPos={cameraPos} targetLookAt={cameraTarget} />

          <OrbitControls
            enablePan={false}
            maxPolarAngle={Math.PI / 2 - 0.05}
            minDistance={3}
            maxDistance={14}
            rotateSpeed={0.5}
          />
        </Canvas>
      ) : (
        /* Photographic Fallback / High-Res Imagery Mode */
        <div style={{
          width: '100%',
          height: '100%',
          backgroundImage: `url(${currentVp.image || currentVp.image_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 0.5s ease-in-out',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(16,16,16,0.88) 0%, rgba(16,16,16,0.3) 50%, rgba(16,16,16,0.7) 100%)'
          }} />
        </div>
      )}

      {/* Top Floating Control Bar */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        right: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
        pointerEvents: 'none'
      }}>
        {/* Viewpoint Number Indicator */}
        <div style={{
          background: 'rgba(28, 27, 25, 0.85)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--border-subtle)',
          padding: '8px 16px',
          borderRadius: '2px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          pointerEvents: 'auto'
        }}>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '1.5px',
            color: 'var(--color-champagne)'
          }}>
            VIEWPOINT 0{activeIndex + 1} OF 0{viewpoints.length}
          </span>
          <span style={{ color: 'var(--border-subtle)' }}>|</span>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '16px',
            color: 'var(--color-ivory)',
            fontWeight: 600
          }}>
            {currentVp.title}
          </span>
        </div>

        {/* Viewport Tools: 3D vs Photo, Ambiance, Fullscreen */}
        <div style={{ display: 'flex', gap: '8px', pointerEvents: 'auto' }}>
          {/* Mode Switcher */}
          <button
            onClick={() => setViewMode(viewMode === '3d' ? 'photo' : '3d')}
            style={{
              background: 'rgba(28, 27, 25, 0.85)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--color-champagne)',
              padding: '8px 12px',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}
          >
            {viewMode === '3d' ? <ImageIcon size={14} /> : <Box size={14} />}
            {viewMode === '3d' ? 'View Photo' : 'Interactive 3D'}
          </button>

          {/* Ambiance Mood Switcher (Active in 3D Mode) */}
          {viewMode === '3d' && (
            <div style={{
              background: 'rgba(28, 27, 25, 0.85)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '2px',
              display: 'flex',
              padding: '2px'
            }}>
              <button
                onClick={() => setMood('classic')}
                style={{
                  background: mood === 'classic' ? 'var(--color-bronze)' : 'transparent',
                  color: mood === 'classic' ? 'var(--color-obsidian)' : 'var(--color-taupe)',
                  border: 'none',
                  padding: '6px 10px',
                  fontSize: '10px',
                  fontWeight: 600,
                  borderRadius: '2px',
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase'
                }}
              >
                Classic
              </button>
              <button
                onClick={() => setMood('fire')}
                style={{
                  background: mood === 'fire' ? 'var(--color-amber)' : 'transparent',
                  color: mood === 'fire' ? 'var(--color-obsidian)' : 'var(--color-taupe)',
                  border: 'none',
                  padding: '6px 10px',
                  fontSize: '10px',
                  fontWeight: 600,
                  borderRadius: '2px',
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase'
                }}
              >
                Hearth
              </button>
              <button
                onClick={() => setMood('vintage')}
                style={{
                  background: mood === 'vintage' ? 'var(--color-champagne)' : 'transparent',
                  color: mood === 'vintage' ? 'var(--color-obsidian)' : 'var(--color-taupe)',
                  border: 'none',
                  padding: '6px 10px',
                  fontSize: '10px',
                  fontWeight: 600,
                  borderRadius: '2px',
                  letterSpacing: '0.8px',
                  textTransform: 'uppercase'
                }}
              >
                Cellar
              </button>
            </div>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            style={{
              background: 'rgba(28, 27, 25, 0.85)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--color-ivory)',
              padding: '8px 12px',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Toggle Fullscreen"
          >
            <Maximize2 size={14} />
          </button>
        </div>
      </div>

      {/* Viewpoint Description Bottom Card */}
      <div style={{
        position: 'absolute',
        bottom: '100px',
        left: '24px',
        maxWidth: '440px',
        background: 'rgba(28, 27, 25, 0.88)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--border-subtle)',
        borderLeft: '3px solid var(--color-champagne)',
        padding: '20px 24px',
        borderRadius: '2px',
        zIndex: 10,
        boxShadow: '0 16px 36px rgba(0,0,0,0.75)'
      }}>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          color: 'var(--color-champagne)',
          marginBottom: '4px'
        }}>
          {currentVp.subtitle}
        </div>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '24px',
          color: 'var(--color-ivory)',
          marginBottom: '8px'
        }}>
          {currentVp.title}
        </h3>
        <p style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: '13px',
          color: 'var(--color-taupe)',
          lineHeight: '1.6'
        }}>
          {currentVp.description}
        </p>
      </div>

      {/* Bottom Horizontal Thumbnails Bar & Navigation Controls */}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: '20px',
        right: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10
      }}>
        {/* Prev / Next Arrows */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handlePrev}
            style={{
              width: '38px',
              height: '38px',
              background: 'rgba(28, 27, 25, 0.9)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--color-ivory)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '2px',
              cursor: 'pointer'
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={handleNext}
            style={{
              width: '38px',
              height: '38px',
              background: 'rgba(28, 27, 25, 0.9)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--color-ivory)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '2px',
              cursor: 'pointer'
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* 5 Viewpoint Thumbnail Buttons */}
        <div style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          padding: '4px'
        }}>
          {viewpoints.map((vp, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={vp.id || index}
                onClick={() => setActiveIndex(index)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '6px 14px',
                  background: isActive ? 'rgba(148, 115, 79, 0.25)' : 'rgba(28, 27, 25, 0.85)',
                  border: isActive ? '1px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                  borderRadius: '2px',
                  color: isActive ? 'var(--color-ivory)' : 'var(--color-taupe)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: isActive ? 'var(--color-champagne)' : 'var(--border-subtle)'
                }} />
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '12px',
                  fontWeight: isActive ? 600 : 400
                }}>
                  0{index + 1}. {vp.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
