import React, { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useCMS } from '../../context/CMSContext';

// Dynamic Camera Controller that smoothly lerps to viewpoint coordinates
function CameraRig({ targetPos, targetLookAt }) {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 1.5, 0));

  useFrame(() => {
    // Lerp Camera Position
    camera.position.lerp(
      new THREE.Vector3(targetPos[0], targetPos[1], targetPos[2]),
      0.045
    );
    // Lerp Camera Target
    currentLookAt.current.lerp(
      new THREE.Vector3(targetLookAt[0], targetLookAt[1], targetLookAt[2]),
      0.045
    );
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

// 3D Pulsing Hotspot Marker
function SpatialHotspot({ position, title, detail }) {
  const [open, setOpen] = React.useState(true);
  const ringRef = useRef();

  useFrame(({ clock }) => {
    if (ringRef.current) {
      const s = 1 + Math.sin(clock.getElapsedTime() * 3) * 0.15;
      ringRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={position}>
      <mesh ref={ringRef}>
        <ringGeometry args={[0.2, 0.28, 32]} />
        <meshBasicMaterial color="#D6A854" side={THREE.DoubleSide} transparent opacity={0.8} />
      </mesh>
      <mesh onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }}>
        <circleGeometry args={[0.18, 32]} />
        <meshBasicMaterial color="#174A63" side={THREE.DoubleSide} />
      </mesh>

      <Html position={[0.3, 0.3, 0]} distanceFactor={10} zIndexRange={[100, 0]}>
        <div style={{
          background: 'rgba(23, 74, 99, 0.92)',
          backdropFilter: 'blur(8px)',
          color: '#FAF9F5',
          border: '1px solid rgba(201, 221, 224, 0.3)',
          borderRadius: '8px',
          padding: '8px 12px',
          minWidth: '180px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          pointerEvents: 'none',
        }}>
          <div style={{ fontSize: '11px', fontFamily: 'JetBrains Mono', color: '#D6A854', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            SPATIAL HOTSPOT
          </div>
          <div style={{ fontSize: '13px', fontWeight: 600, fontFamily: 'Cormorant Garamond', marginTop: '2px' }}>
            {title}
          </div>
          <div style={{ fontSize: '11px', color: '#C9DDE0', marginTop: '2px', lineHeight: 1.3 }}>
            {detail}
          </div>
        </div>
      </Html>
    </group>
  );
}

// Spatial 3D Interior and Exterior Geometry
function TourSceneEnvironment({ activeSlug }) {
  return (
    <group>
      {/* Ocean Ground Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, -10]}>
        <planeGeometry args={[70, 70]} />
        <meshStandardMaterial color="#1E5C77" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Main Floor Plinth */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[16, 0.4, 16]} />
        <meshStandardMaterial color="#EDE5D8" roughness={0.8} />
      </mesh>

      {/* Travertine Flagstone Tiles */}
      <mesh position={[0, 0.12, 0]} receiveShadow>
        <boxGeometry args={[15.6, 0.05, 15.6]} />
        <meshStandardMaterial color="#F7F2EA" roughness={0.6} />
      </mesh>

      {/* Back Wall with Coastal Arches */}
      <group position={[0, 2.5, -6]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[16, 5, 0.6]} />
          <meshStandardMaterial color="#FAF9F5" roughness={0.5} />
        </mesh>
        {/* Cutout illusion arches */}
        {[-4, 0, 4].map((x, i) => (
          <group key={i} position={[x, -0.5, 0.32]}>
            <mesh>
              <planeGeometry args={[2.2, 3.4]} />
              <meshBasicMaterial color="#88C2D8" />
            </mesh>
            <mesh position={[0, 1.7, 0]}>
              <ringGeometry args={[0, 1.1, 32, 1, 0, Math.PI]} />
              <meshBasicMaterial color="#88C2D8" />
            </mesh>
          </group>
        ))}
      </group>

      {/* Side Limestone Walls */}
      <mesh position={[-7.8, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[16, 5, 0.6]} />
        <meshStandardMaterial color="#FAF9F5" roughness={0.5} />
      </mesh>
      <mesh position={[7.8, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[16, 5, 0.6]} />
        <meshStandardMaterial color="#FAF9F5" roughness={0.5} />
      </mesh>

      {/* Central Fine Dining Table & Setting (Main Dining Viewpoint) */}
      <group position={[0, 0.15, -1]}>
        {/* Tabletop */}
        <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.2, 1.2, 0.06, 32]} />
          <meshStandardMaterial color="#FAF9F5" roughness={0.4} />
        </mesh>
        {/* Walnut Pedestal */}
        <mesh position={[0, 0.36, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.35, 0.7, 16]} />
          <meshStandardMaterial color="#4A3B32" roughness={0.7} />
        </mesh>
        {/* Linen Napkins & Artisanal Plates */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, idx) => (
          <group key={idx} rotation={[0, angle, 0]} position={[0, 0.76, 0]}>
            <mesh position={[0.75, 0, 0]} castShadow>
              <cylinderGeometry args={[0.16, 0.16, 0.015, 24]} />
              <meshStandardMaterial color="#D8CCB8" roughness={0.3} />
            </mesh>
            <mesh position={[0.75, 0.02, 0]}>
              <cylinderGeometry args={[0.11, 0.11, 0.015, 24]} />
              <meshStandardMaterial color="#174A63" roughness={0.3} />
            </mesh>
            <mesh position={[1.4, -0.3, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow>
              <boxGeometry args={[0.45, 0.5, 0.45]} />
              <meshStandardMaterial color="#E8D9C2" roughness={0.8} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Hearth & Wood Fire Grill (Hearth-Bar Viewpoint) */}
      <group position={[-5.5, 1.2, -4.5]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.5, 2.2, 1.4]} />
          <meshStandardMaterial color="#383838" roughness={0.9} />
        </mesh>
        {/* Fire Chamber Glow */}
        <mesh position={[0, 0, 0.71]}>
          <planeGeometry args={[1.4, 0.8]} />
          <meshBasicMaterial color="#FF7B25" />
        </mesh>
        <pointLight position={[0, 0, 0.9]} intensity={1.5} color="#FFA24A" distance={4} />
      </group>

      {/* Olive Tree in Terracotta Planter */}
      <group position={[5.2, 0.15, -2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.55, 0.35, 0.9, 16]} />
          <meshStandardMaterial color="#B86E50" roughness={0.9} />
        </mesh>
        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.1}>
          <mesh position={[0, 1.4, 0]} castShadow>
            <dodecahedronGeometry args={[0.9, 1]} />
            <meshStandardMaterial color="#68765A" roughness={0.7} />
          </mesh>
        </Float>
      </group>
    </group>
  );
}

export default function RestaurantTour() {
  const { currentViewpoint, tourLightingMode, tourDisplayMode } = useCMS();

  if (tourDisplayMode === 'photo') {
    return (
      <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
        <img
          src={currentViewpoint?.image_url || 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80'}
          alt={currentViewpoint?.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.6s ease' }}
        />
        <div style={{
          position: 'absolute',
          bottom: 24,
          left: 24,
          background: 'rgba(23, 74, 99, 0.85)',
          backdropFilter: 'blur(8px)',
          color: '#FAF9F5',
          padding: '12px 20px',
          borderRadius: '8px',
          maxWidth: '380px',
        }}>
          <h4 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.25rem', color: '#FAF9F5' }}>
            {currentViewpoint?.title}
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#C9DDE0', marginTop: '4px' }}>
            {currentViewpoint?.description}
          </p>
        </div>
      </div>
    );
  }

  // Camera coordinates fallback
  const camPos = currentViewpoint?.camera_position || [0, 2.8, 8.5];
  const camTarget = currentViewpoint?.camera_target || [0, 1.4, 0];

  // Dynamic Lighting Setup based on mode
  let ambientColor = "#F0F7F9";
  let sunColor = "#FFF8EA";
  let sunIntensity = 1.6;
  let skyFillColor = "#92D5EB";

  if (tourLightingMode === 'golden') {
    ambientColor = "#FFF1DE";
    sunColor = "#FFB668";
    sunIntensity = 2.1;
    skyFillColor = "#E69C67";
  } else if (tourLightingMode === 'dusk') {
    ambientColor = "#8BB2C9";
    sunColor = "#D97B4E";
    sunIntensity = 0.9;
    skyFillColor = "#2A4B63";
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: camPos, fov: 48 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} color={ambientColor} />
          <directionalLight
            position={[10, 14, 8]}
            intensity={sunIntensity}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            color={sunColor}
          />
          <directionalLight
            position={[-8, 6, -6]}
            intensity={0.6}
            color={skyFillColor}
          />

          <CameraRig targetPos={camPos} targetLookAt={camTarget} />
          <TourSceneEnvironment activeSlug={currentViewpoint?.slug} />

          {/* Hotspot marker */}
          <SpatialHotspot
            position={[camTarget[0] + 0.5, camTarget[1] + 0.3, camTarget[2] + 0.2]}
            title={currentViewpoint?.hotspot_title || "Architectural Detail"}
            detail={currentViewpoint?.hotspot_description || "Handcrafted coastal materials."}
          />

          <OrbitControls
            enableZoom={true}
            maxDistance={14}
            minDistance={3}
            maxPolarAngle={Math.PI / 2.05}
            minPolarAngle={Math.PI / 4}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
