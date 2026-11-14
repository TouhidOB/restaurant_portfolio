import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useCMS } from '../../context/CMSContext';

function TourSpatialRig() {
  const { content, activeTourIndex } = useCMS();
  const viewpoints = content?.viewpoints || [];
  const currentVp = viewpoints[activeTourIndex] || viewpoints[0] || {};

  const targetPos = useRef(new THREE.Vector3(0, 2.2, 8.5));
  const targetLook = useRef(new THREE.Vector3(0, 1.2, 0));

  useFrame((state) => {
    if (currentVp.camera_position && Array.isArray(currentVp.camera_position)) {
      targetPos.current.set(
        currentVp.camera_position[0],
        currentVp.camera_position[1],
        currentVp.camera_position[2]
      );
    }
    if (currentVp.camera_target && Array.isArray(currentVp.camera_target)) {
      targetLook.current.set(
        currentVp.camera_target[0],
        currentVp.camera_target[1],
        currentVp.camera_target[2]
      );
    }

    state.camera.position.lerp(targetPos.current, 0.05);
    state.camera.lookAt(targetLook.current);
  });

  return (
    <group>
      {/* Floor / Ground Plane */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <cylinderGeometry args={[14, 14, 0.1, 48]} />
        <meshStandardMaterial color="#0B111D" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Main Diner Architecture Structure */}
      <group position={[0, 0, 0]}>
        {/* Core Stainless Steel Pavilion Walls */}
        <mesh position={[0, 1.8, 0]}>
          <boxGeometry args={[9.5, 3.6, 7.5]} />
          <meshStandardMaterial color="#182338" roughness={0.3} metalness={0.85} />
        </mesh>

        {/* Chrome Streamline Eaves */}
        <mesh position={[0, 3.7, 0]}>
          <boxGeometry args={[10.2, 0.45, 8.2]} />
          <meshStandardMaterial color="#BFC6CC" metalness={0.95} roughness={0.12} />
        </mesh>

        {/* Glowing Neon Roof Sign Frame */}
        <mesh position={[0, 4.4, 2.8]}>
          <boxGeometry args={[5.2, 0.9, 0.1]} />
          <meshStandardMaterial color="#111A2B" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 4.4, 2.88]}>
          <boxGeometry args={[4.8, 0.45, 0.05]} />
          <meshBasicMaterial color="#43D9E8" />
        </mesh>

        {/* Floor-to-Ceiling Front Glass Windows */}
        <mesh position={[0, 1.8, 3.78]}>
          <planeGeometry args={[8.8, 3.1]} />
          <meshPhysicalMaterial
            color="#43D9E8"
            transparent
            opacity={0.35}
            roughness={0.05}
            metalness={0.1}
            transmission={0.85}
          />
        </mesh>

        {/* Chrome Mullions */}
        {[-3.0, -1.5, 0, 1.5, 3.0].map((x) => (
          <mesh key={x} position={[x, 1.8, 3.79]}>
            <boxGeometry args={[0.08, 3.15, 0.08]} />
            <meshStandardMaterial color="#BFC6CC" metalness={0.95} roughness={0.1} />
          </mesh>
        ))}

        {/* Interior Curved Chrome Counter */}
        <mesh position={[0, 0.9, 0.5]}>
          <boxGeometry args={[6.5, 0.95, 1.2]} />
          <meshStandardMaterial color="#BFC6CC" metalness={0.92} roughness={0.18} />
        </mesh>

        {/* Red Vinyl Stools */}
        {[-2.2, -1.1, 0, 1.1, 2.2].map((x) => (
          <group key={x} position={[x, 0.6, 1.8]}>
            <mesh position={[0, -0.2, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.8, 12]} />
              <meshStandardMaterial color="#BFC6CC" metalness={0.95} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0.22, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 0.14, 16]} />
              <meshStandardMaterial color="#D83A45" roughness={0.35} />
            </mesh>
          </group>
        ))}

        {/* Booth Seating Enclosures Left & Right */}
        {[-3.6, 3.6].map((x) => (
          <group key={x} position={[x, 1.0, 0]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1.5, 1.4, 2.8]} />
              <meshStandardMaterial color="#D83A45" roughness={0.4} />
            </mesh>
            <mesh position={[x > 0 ? -0.8 : 0.8, -0.1, 0]}>
              <boxGeometry args={[0.8, 0.8, 2.2]} />
              <meshStandardMaterial color="#F6E9D5" roughness={0.3} metalness={0.2} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Pulsing Interactive Hotspot Annotation using strict single braces */}
      {currentVp.hotspot_title && (
        <group position={[0, 2.4, 1.5]}>
          <mesh>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshBasicMaterial color="#D83A45" />
          </mesh>
          <Html distanceFactor={10} position={[0, 0.3, 0]} center>
            <div
              style={{
                backgroundColor: 'rgba(17, 26, 43, 0.95)',
                border: '1px solid #43D9E8',
                borderRadius: '4px',
                padding: '0.65rem 0.9rem',
                color: '#FFF7E8',
                fontFamily: "'Space Grotesk', sans-serif",
                boxShadow: '0 0 16px rgba(67, 217, 232, 0.4)',
                minWidth: '220px',
                pointerEvents: 'none',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.65rem',
                  color: '#43D9E8',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '2px',
                }}
              >
                SPATIAL FOCUS
              </div>
              <strong style={{ fontSize: '0.9rem', display: 'block', color: '#FFFFFF' }}>
                {currentVp.hotspot_title}
              </strong>
              <span style={{ fontSize: '0.78rem', color: '#BFC6CC', display: 'block', marginTop: '2px', lineHeight: 1.4 }}>
                {currentVp.hotspot_detail}
              </span>
            </div>
          </Html>
        </group>
      )}

      {/* Interior & Exterior Lights */}
      <pointLight position={[0, 2.8, 1.0]} intensity={2.5} distance={9} color="#F2C94C" />
      <pointLight position={[0, 4.2, 3.5]} intensity={3.5} distance={10} color="#43D9E8" />
      <pointLight position={[-3.5, 2.2, 1.5]} intensity={1.8} distance={6} color="#D83A45" />
      <pointLight position={[3.5, 2.2, 1.5]} intensity={1.8} distance={6} color="#43D9E8" />
    </group>
  );
}

export default function RestaurantTour() {
  return (
    <Canvas
      camera={{ position: [0, 2.5, 9.0], fov: 46 }}
      gl={{ antialias: true, alpha: true }}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#090F1B',
      }}
    >
      <ambientLight intensity={0.7} color="#182338" />
      <directionalLight position={[5, 10, 6]} intensity={1.6} color="#43D9E8" />
      <directionalLight position={[-6, 6, 4]} intensity={1.2} color="#D83A45" />

      <TourSpatialRig />

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        maxDistance={12}
        minDistance={3.5}
        maxPolarAngle={Math.PI / 2 - 0.05}
        minPolarAngle={Math.PI / 3.5}
        rotateSpeed={0.5}
      />
    </Canvas>
  );
}
