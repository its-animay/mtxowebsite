import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const RotatingGlobe = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const markersRef = useRef<THREE.Group>(null);

  // Generate random marker positions on sphere surface
  const markers = useMemo(() => {
    const markerPositions: [number, number, number][] = [];
    for (let i = 0; i < 20; i++) {
      const phi = Math.acos(-1 + (2 * i) / 20);
      const theta = Math.sqrt(20 * Math.PI) * phi;
      const radius = 2.1;
      
      markerPositions.push([
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      ]);
    }
    return markerPositions;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    if (markersRef.current) {
      markersRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group>
      {/* Globe */}
      <Sphere ref={meshRef} args={[2, 64, 64]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color="#1e40af"
          metalness={0.1}
          roughness={0.3}
          transparent
          opacity={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>

      {/* Wireframe overlay */}
      <Sphere args={[2.05, 16, 16]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#00ffff"
          wireframe
          transparent
          opacity={0.3}
        />
      </Sphere>

      {/* Impact markers */}
      <group ref={markersRef}>
        {markers.map((position, index) => (
          <group key={index} position={position}>
            <mesh>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshBasicMaterial color="#ff6b6b" />
            </mesh>
            {/* Pulsing ring effect */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.1, 0.15, 16]} />
              <meshBasicMaterial
                color="#ff6b6b"
                transparent
                opacity={0.6}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Orbiting particles */}
      {Array.from({ length: 50 }, (_, i) => {
        const angle = (i / 50) * Math.PI * 2;
        const radius = 3 + Math.sin(i * 0.1) * 0.5;
        return (
          <mesh
            key={`orbit-${i}`}
            position={[
              Math.cos(angle) * radius,
              Math.sin(i * 0.2) * 0.5,
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.02, 4, 4]} />
            <meshBasicMaterial color="#ffffff" opacity={0.7} transparent />
          </mesh>
        );
      })}
    </group>
  );
};

export default RotatingGlobe;
