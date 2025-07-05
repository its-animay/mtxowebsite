import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingCubesProps {
  count?: number;
  spread?: number;
}

const FloatingCubes: React.FC<FloatingCubesProps> = ({ count = 20, spread = 15 }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Generate random cube positions and properties
  const cubes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ] as [number, number, number],
      scale: 0.5 + Math.random() * 0.5,
      speed: 0.5 + Math.random() * 0.5,
      color: `hsl(${200 + Math.random() * 60}, 70%, 60%)`
    }));
  }, [count, spread]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        const cube = cubes[index];
        if (child instanceof THREE.Mesh) {
          child.rotation.x += 0.01 * cube.speed;
          child.rotation.y += 0.01 * cube.speed;
          child.position.y += Math.sin(state.clock.elapsedTime * cube.speed) * 0.001;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube) => (
        <Box
          key={cube.id}
          position={cube.position}
          rotation={cube.rotation}
          scale={cube.scale}
          args={[1, 1, 1]}
        >
          <meshPhysicalMaterial
            color={cube.color}
            metalness={0.3}
            roughness={0.2}
            transparent
            opacity={0.8}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Box>
      ))}
    </group>
  );
};

export default FloatingCubes;
