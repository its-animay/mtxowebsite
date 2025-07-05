import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedBrain = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Generate random node positions
  const nodes = useMemo(() => {
    const nodePositions: [number, number, number][] = [];
    for (let i = 0; i < 30; i++) {
      const phi = Math.acos(-1 + (2 * i) / 30);
      const theta = Math.sqrt(30 * Math.PI) * phi;
      const radius = 2;
      
      nodePositions.push([
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      ]);
    }
    return nodePositions;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main brain sphere */}
      <Sphere ref={meshRef} args={[2, 32, 32]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#667eea"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0}
          metalness={0.1}
          transparent
          opacity={0.8}
        />
      </Sphere>

      {/* Neural network nodes */}
      {nodes.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#00ffff" />
        </mesh>
      ))}

      {/* Connecting lines */}
      {nodes.map((startPos, index) => {
        if (index < nodes.length - 1) {
          const endPos = nodes[index + 1];
          const distance = Math.sqrt(
            Math.pow(endPos[0] - startPos[0], 2) +
            Math.pow(endPos[1] - startPos[1], 2) +
            Math.pow(endPos[2] - startPos[2], 2)
          );
          
          if (distance < 1.5) {
            return (
              <line key={`line-${index}`}>
                <bufferGeometry>
                  <bufferAttribute
                    attachObject={['attributes', 'position']}
                    count={2}
                    array={new Float32Array([...startPos, ...endPos])}
                    itemSize={3}
                  />
                </bufferGeometry>
                <lineBasicMaterial color="#00ffff" opacity={0.6} transparent />
              </line>
            );
          }
        }
        return null;
      })}

      {/* Ambient particles */}
      {Array.from({ length: 100 }, (_, i) => (
        <mesh
          key={`particle-${i}`}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          ]}
        >
          <sphereGeometry args={[0.02, 4, 4]} />
          <meshBasicMaterial color="#ffffff" opacity={0.3} transparent />
        </mesh>
      ))}
    </group>
  );
};

export default AnimatedBrain;
