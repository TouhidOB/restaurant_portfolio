import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Art Deco Restaurant Exterior 3D Model
function RestaurantFacade() {
  const groupRef = useRef();

  // Materials
  const materials = useMemo(() => {
    return {
      emeraldStone: new THREE.MeshStandardMaterial({
        color: '#123B35',
        roughness: 0.25,
        metalness: 0.1,
      }),
      obsidianGranite: new THREE.MeshStandardMaterial({
        color: '#17191A',
        roughness: 0.2,
        metalness: 0.2,
      }),
      champagneGold: new THREE.MeshStandardMaterial({
        color: '#D6B879',
        roughness: 0.35,
        metalness: 0.85,
      }),
      windowGlassWarm: new THREE.MeshStandardMaterial({
        color: '#F4DEB3',
        emissive: '#E6A74C',
        emissiveIntensity: 0.8,
        roughness: 0.1,
        transparent: true,
        opacity: 0.88,
      }),
      warmInteriorGlow: new THREE.MeshBasicMaterial({
        color: '#FFA834',
      }),
      wetPavement: new THREE.MeshStandardMaterial({
        color: '#0D0F10',
        roughness: 0.25,
        metalness: 0.3,
      }),
      canopyFabric: new THREE.MeshStandardMaterial({
        color: '#0B2521',
        roughness: 0.7,
      }),
    };
  }, []);

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      {/* Ground / Reflective Promenade */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} material={materials.wetPavement}>
        <planeGeometry args={[60, 60]} />
      </mesh>

      {/* Sidewalk curb and steps */}
      <mesh position={[0, 0.15, 2.5]} material={materials.obsidianGranite}>
        <boxGeometry args={[14, 0.3, 3]} />
      </mesh>
      <mesh position={[0, 0.35, 1.8]} material={materials.emeraldStone}>
        <boxGeometry args={[8, 0.2, 1.8]} />
      </mesh>

      {/* Main Building Base (Tier 1) */}
      <mesh position={[0, 4.5, -3]} material={materials.emeraldStone}>
        <boxGeometry args={[16, 9, 7]} />
      </mesh>

      {/* Stepped Art Deco Upper Tier (Tier 2) */}
      <mesh position={[0, 9.8, -3.2]} material={materials.emeraldStone}>
        <boxGeometry args={[12, 2.4, 6.2]} />
      </mesh>

      {/* Stepped Art Deco Spire / Crown (Tier 3) */}
      <mesh position={[0, 11.6, -3.4]} material={materials.obsidianGranite}>
        <boxGeometry args={[6, 1.6, 5.5]} />
      </mesh>
      {/* Central Spire Finial */}
      <mesh position={[0, 13.2, -3.4]} material={materials.champagneGold}>
        <coneGeometry args={[0.3, 2, 8]} />
      </mesh>

      {/* Vertical Art Deco Fluted Pilasters (Gold Ribs) */}
      {[-7, -4.5, -2, 2, 4.5, 7].map((x, i) => (
        <group key={`pilaster-${i}`} position={[x, 4.8, 0.55]}>
          <mesh material={materials.champagneGold}>
            <boxGeometry args={[0.35, 9.2, 0.3]} />
          </mesh>
          <mesh position={[0, 4.6, 0]} material={materials.champagneGold}>
            <boxGeometry args={[0.55, 0.4, 0.45]} />
          </mesh>
        </group>
      ))}

      {/* Grand Arch Windows (Left and Right Wings) */}
      {[-5.75, 5.75].map((x, i) => (
        <group key={`win-large-${i}`} position={[x, 3.8, 0.52]}>
          <mesh material={materials.windowGlassWarm}>
            <planeGeometry args={[2.5, 4.2]} />
          </mesh>
          {/* Gold window muntins / frame */}
          <mesh material={materials.champagneGold}>
            <boxGeometry args={[2.65, 4.35, 0.08]} />
          </mesh>
          {/* Inner muntin cross */}
          <mesh material={materials.champagneGold}>
            <boxGeometry args={[0.06, 4.2, 0.1]} />
          </mesh>
          <mesh material={materials.champagneGold}>
            <boxGeometry args={[2.5, 0.06, 0.1]} />
          </mesh>
        </group>
      ))}

      {/* Upper Floor Windows */}
      {[-4, -1.8, 1.8, 4].map((x, i) => (
        <mesh key={`up-win-${i}`} position={[x, 7.2, 0.52]} material={materials.windowGlassWarm}>
          <planeGeometry args={[1.4, 2.2]} />
        </mesh>
      ))}

      {/* Central Entrance Portal Frame */}
      <group position={[0, 2.4, 0.6]}>
        {/* Obsidian Door Surround */}
        <mesh position={[0, 0, 0]} material={materials.obsidianGranite}>
          <boxGeometry args={[3.8, 4.8, 0.4]} />
        </mesh>

        {/* Double Glass Doors with Warm Light */}
        <mesh position={[0, -0.4, 0.22]} material={materials.windowGlassWarm}>
          <planeGeometry args={[2.6, 3.2]} />
        </mesh>

        {/* Brass Door Trim & Geometric Grille */}
        <mesh position={[0, -0.4, 0.24]} material={materials.champagneGold}>
          <boxGeometry args={[0.08, 3.2, 0.05]} />
        </mesh>
        <mesh position={[0, 1.4, 0.23]} material={materials.champagneGold}>
          <ringGeometry args={[0.4, 0.48, 16]} />
        </mesh>

        {/* Grand Marquee / Entrance Canopy */}
        <group position={[0, 2.1, 1.6]}>
          {/* Canopy Top */}
          <mesh material={materials.canopyFabric} rotation={[-0.08, 0, 0]}>
            <boxGeometry args={[4.4, 0.25, 2.8]} />
          </mesh>
          {/* Gold Trim around canopy */}
          <mesh position={[0, -0.15, 1.4]} material={materials.champagneGold}>
            <boxGeometry args={[4.45, 0.35, 0.12]} />
          </mesh>

          {/* Marquee Glowing Signage */}
          <mesh position={[0, 0.45, 1.42]} material={materials.champagneGold}>
            <boxGeometry args={[3.2, 0.7, 0.1]} />
          </mesh>
          {/* Inner Light Panel for Sign */}
          <mesh position={[0, 0.45, 1.48]} material={materials.warmInteriorGlow}>
            <planeGeometry args={[2.9, 0.5]} />
          </mesh>

          {/* Brass hanging rods */}
          {[-1.9, 1.9].map((rx, idx) => (
            <mesh key={`rod-${idx}`} position={[rx, 1.2, 0.8]} material={materials.champagneGold} rotation={[0.4, 0, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 2.4]} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Exterior Art Deco Lantern Sconces */}
      {[-2.4, 2.4].map((lx, idx) => (
        <group key={`sconce-${idx}`} position={[lx, 3.2, 0.9]}>
          <mesh material={materials.champagneGold}>
            <cylinderGeometry args={[0.12, 0.08, 0.8, 6]} />
          </mesh>
          <mesh position={[0, 0, 0]} material={materials.warmInteriorGlow}>
            <cylinderGeometry args={[0.1, 0.1, 0.6, 6]} />
          </mesh>
          <pointLight color="#FFB049" intensity={2.2} distance={6} decay={2} position={[0, 0, 0.2]} />
        </group>
      ))}

      {/* Canopy Downlight Point Light */}
      <pointLight color="#FFCB77" intensity={3.5} distance={8} decay={2} position={[0, 4, 2]} />
    </group>
  );
}

// Cinematic Camera Controller with smooth slow motion
function CinematicCamera({ prefersReducedMotion }) {
  useFrame(({ camera, clock }) => {
    if (prefersReducedMotion) {
      camera.position.set(0, 1.5, 9);
      camera.lookAt(0, 1.2, 0);
      return;
    }

    const t = clock.getElapsedTime();
    // Gentle cinematic drift toward entrance with subtle breathing sway
    const x = Math.sin(t * 0.15) * 0.6;
    const y = 1.6 + Math.sin(t * 0.2) * 0.15;
    const z = 8.8 + Math.cos(t * 0.12) * 0.8;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, x, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, y, 0.04);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, z, 0.04);
    camera.lookAt(0, 1.4, 0);
  });

  return null;
}

export default function HeroScene({ fallbackImage }) {
  const prefersReducedMotion = useReducedMotion();
  const [webglError, setWebglError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglError(true);
      } else {
        setIsLoaded(true);
      }
    } catch (e) {
      setWebglError(true);
    }
  }, []);

  if (webglError) {
    return (
      <div 
        className="hero-fallback-visual"
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: `linear-gradient(180deg, rgba(23, 25, 26, 0.4) 0%, rgba(18, 59, 53, 0.7) 100%), url(${fallbackImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 2.2, 11], fov: 46 }}
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={() => setIsLoaded(true)}
      >
        {/* Atmospheric Blue Hour / Dusk Environment */}
        <color attach="background" args={['#0E1617']} />
        <fog attach="fog" args={['#0E1617', 12, 35]} />

        {/* Ambient Evening Skylight */}
        <ambientLight color="#324B54" intensity={0.8} />

        {/* Golden Warm Key Light */}
        <directionalLight
          position={[5, 10, 8]}
          color="#FFD18C"
          intensity={1.8}
        />

        {/* Cool Rim Light from dusk horizon */}
        <directionalLight
          position={[-8, 6, -5]}
          color="#42788D"
          intensity={1.2}
        />

        {/* Restaurant 3D Facade */}
        <RestaurantFacade />

        {/* Camera Motion */}
        <CinematicCamera prefersReducedMotion={prefersReducedMotion} />
      </Canvas>
    </div>
  );
}
