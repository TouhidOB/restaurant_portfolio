import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// 3D Japanese Zen Architectural Facade
function ZenArchitecturalFacade() {
  const groupRef = useRef();

  // PBR Materials based on PRD Section 4.2
  const materials = useMemo(() => {
    return {
      cedarWood: new THREE.MeshStandardMaterial({
        color: '#4A3B32',
        roughness: 0.7,
        metalness: 0.05,
      }),
      darkWalnut: new THREE.MeshStandardMaterial({
        color: '#2B2623',
        roughness: 0.65,
        metalness: 0.05,
      }),
      texturedPlaster: new THREE.MeshStandardMaterial({
        color: '#E8E4DA',
        roughness: 0.85,
        metalness: 0.0,
      }),
      naturalStone: new THREE.MeshStandardMaterial({
        color: '#4B4D4B',
        roughness: 0.9,
        metalness: 0.1,
      }),
      gravelGarden: new THREE.MeshStandardMaterial({
        color: '#CBC7BC',
        roughness: 0.95,
      }),
      shojiPaper: new THREE.MeshStandardMaterial({
        color: '#FFF8E7',
        emissive: '#FFB85C',
        emissiveIntensity: 0.75,
        roughness: 0.4,
        transparent: true,
        opacity: 0.92,
      }),
      bambooStems: new THREE.MeshStandardMaterial({
        color: '#7A845C',
        roughness: 0.5,
      }),
      darkBronze: new THREE.MeshStandardMaterial({
        color: '#2E2B28',
        metalness: 0.65,
        roughness: 0.35,
      }),
    };
  }, []);

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      {/* Ground Raked Stone Gravel (Karesansui) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} material={materials.gravelGarden}>
        <planeGeometry args={[50, 50]} />
      </mesh>

      {/* Central Stone Stepping Pathway (Tobishi) */}
      {[-5, -3.5, -2, -0.5, 1, 2.5, 4].map((z, idx) => (
        <mesh key={idx} position={[0, 0.08, z]} rotation={[-Math.PI / 2, 0, (idx % 2) * 0.1]} material={materials.naturalStone}>
          <circleGeometry args={[0.9, 16]} />
        </mesh>
      ))}

      {/* Main Pavilion Base (Engawa Veranda) */}
      <mesh position={[0, 0.25, -4]} material={materials.cedarWood}>
        <boxGeometry args={[16, 0.5, 6]} />
      </mesh>

      {/* Textured Plaster Building Core */}
      <mesh position={[0, 2.8, -6]} material={materials.texturedPlaster}>
        <boxGeometry args={[14, 4.6, 4]} />
      </mesh>

      {/* Traditional Overhanging Hip-and-Gable Cedar Roof */}
      <mesh position={[0, 5.2, -4]} rotation={[0.08, 0, 0]} material={materials.darkWalnut}>
        <boxGeometry args={[18, 0.35, 8]} />
      </mesh>

      {/* Vertical Cedar Structural Pillars */}
      {[-6.5, -3.5, 0, 3.5, 6.5].map((x, idx) => (
        <mesh key={idx} position={[x, 2.5, -1.2]} material={materials.cedarWood}>
          <cylinderGeometry args={[0.18, 0.18, 4.5, 16]} />
        </mesh>
      ))}

      {/* Luminous Shoji Sliding Screens (Warm Interior Light) */}
      {[-4.5, -1.8, 1.8, 4.5].map((x, idx) => (
        <group key={idx} position={[x, 2.3, -3.9]}>
          <mesh material={materials.shojiPaper}>
            <planeGeometry args={[2.4, 3.4]} />
          </mesh>
          {/* Wooden Shoji Grids */}
          <mesh position={[0, 0, 0.02]} material={materials.darkWalnut}>
            <boxGeometry args={[2.42, 0.04, 0.02]} />
          </mesh>
          <mesh position={[0, 0.6, 0.02]} material={materials.darkWalnut}>
            <boxGeometry args={[2.42, 0.04, 0.02]} />
          </mesh>
          <mesh position={[0, -0.6, 0.02]} material={materials.darkWalnut}>
            <boxGeometry args={[2.42, 0.04, 0.02]} />
          </mesh>
        </group>
      ))}

      {/* Entrance Noren Curtain & Dark Cedar Portal */}
      <mesh position={[0, 3.4, -3.8]} material={materials.darkBronze}>
        <boxGeometry args={[2.2, 0.08, 0.1]} />
      </mesh>

      {/* Natural Bamboo Garden Accents (Left & Right) */}
      {[-6.8, -7.2, -7.6, 6.8, 7.2, 7.6].map((x, idx) => (
        <mesh key={idx} position={[x, 2, -2 + (idx % 3) * 0.5]} material={materials.bambooStems}>
          <cylinderGeometry args={[0.08, 0.08, 4 + (idx % 2), 12]} />
        </mesh>
      ))}

      {/* Stone Water Basin (Tsukubai) */}
      <mesh position={[-3, 0.4, 1]} material={materials.naturalStone}>
        <cylinderGeometry args={[0.6, 0.5, 0.8, 16]} />
      </mesh>
    </group>
  );
}

// Camera controller with smooth lerp damping
function CameraRig({ prefersReducedMotion }) {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  useFrame((state) => {
    if (prefersReducedMotion) return;
    const targetX = mouseRef.current.x * 0.8;
    const targetY = 2.2 - mouseRef.current.y * 0.4;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.035);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.035);
    state.camera.lookAt(0, 1.5, 0);
  });

  return null;
}

export default function HeroScene({ fallbackImage }) {
  const prefersReducedMotion = useReducedMotion();
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${fallbackImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.75)',
        }}
      />
    );
  }

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 2.2, 12], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* PRD Specified Lighting Rig */}
        <ambientLight color="#E8E1D4" intensity={0.65} />
        <directionalLight color="#FFF1D9" intensity={1.3} position={[8, 12, 10]} />
        <pointLight color="#E9B982" intensity={2.4} position={[0, 2.5, -3.5]} distance={10} />
        <pointLight color="#A8B69A" intensity={0.5} position={[-5, 1, 0]} distance={8} />

        <ZenArchitecturalFacade />
        <CameraRig prefersReducedMotion={prefersReducedMotion} />
      </Canvas>
    </div>
  );
}
