import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Text } from '@react-three/drei';
import * as THREE from 'three';

const SystemDiagram = () => {
  const groupRef = useRef<THREE.Group>(null);
  const dataFlowRef = useRef<THREE.Group>(null);

  // System components
  const components = useMemo(() => [
    {
      id: 'upload',
      name: 'Content Upload',
      position: [-4, 0, 0] as [number, number, number],
      color: '#FF6B6B',
      icon: '📦'
    },
    {
      id: 'rag',
      name: 'RAG System',
      position: [-1.5, 0, 0] as [number, number, number],
      color: '#4ECDC4',
      icon: '🔄'
    },
    {
      id: 'ai',
      name: 'AI Agent',
      position: [1, 0, 0] as [number, number, number],
      color: '#45B7D1',
      icon: '🧠'
    },
    {
      id: 'output',
      name: 'Voice/Chat Output',
      position: [4, 0, 0] as [number, number, number],
      color: '#F9CA24',
      icon: '🗣️'
    }
  ], []);

  // Data flow particles
  const dataParticles = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      position: [-4 + (i / 9) * 8, 0, 0.5] as [number, number, number],
      delay: i * 0.2
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
    
    if (dataFlowRef.current) {
      dataFlowRef.current.children.forEach((particle, index) => {
        if (particle instanceof THREE.Mesh) {
          const time = state.clock.elapsedTime + dataParticles[index]?.delay || 0;
          particle.position.x = -4 + ((Math.sin(time * 2) + 1) / 2) * 8;
          particle.scale.setScalar(1 + Math.sin(time * 5) * 0.2);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* System components */}
      {components.map((component, index) => (
        <group key={component.id} position={component.position}>
          {/* Component container */}
          <Box args={[1.5, 1.2, 0.3]}>
            <meshPhysicalMaterial
              color={component.color}
              metalness={0.3}
              roughness={0.2}
              transparent
              opacity={0.8}
            />
          </Box>
          
          {/* Component glow */}
          <Box args={[1.6, 1.3, 0.4]}>
            <meshBasicMaterial
              color={component.color}
              transparent
              opacity={0.2}
            />
          </Box>
          
          {/* Component icon sphere */}
          <Sphere position={[0, 0, 0.4]} args={[0.2, 16, 16]}>
            <meshBasicMaterial color="#ffffff" />
          </Sphere>
          
          {/* Component label */}
          <Text
            position={[0, -0.8, 0]}
            fontSize={0.2}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {component.name}
          </Text>
        </group>
      ))}

      {/* Connection arrows */}
      {components.slice(0, -1).map((component, index) => {
        const nextComponent = components[index + 1];
        const distance = nextComponent.position[0] - component.position[0];
        const midPoint = component.position[0] + distance / 2;
        
        return (
          <group key={`arrow-${index}`}>
            {/* Arrow shaft */}
            <Box position={[midPoint, 0, 0]} args={[distance - 1, 0.1, 0.1]}>
              <meshBasicMaterial color="#00ffff" />
            </Box>
            
            {/* Arrow head */}
            <mesh position={[nextComponent.position[0] - 0.4, 0, 0]}>
              <coneGeometry args={[0.15, 0.3, 3]} />
              <meshBasicMaterial color="#00ffff" />
            </mesh>
          </group>
        );
      })}

      {/* Data flow particles */}
      <group ref={dataFlowRef}>
        {dataParticles.map((particle) => (
          <Sphere
            key={particle.id}
            position={particle.position}
            args={[0.05, 8, 8]}
          >
            <meshBasicMaterial color="#ffffff" />
          </Sphere>
        ))}
      </group>

      {/* Processing indicators */}
      {components.map((component, index) => (
        <group key={`indicator-${component.id}`} position={component.position}>
          {/* Rotating processing ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.8, 0.85, 32]} />
            <meshBasicMaterial
              color={component.color}
              transparent
              opacity={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
          
          {/* Status lights */}
          {Array.from({ length: 4 }, (_, i) => (
            <Sphere
              key={i}
              position={[
                Math.cos((i / 4) * Math.PI * 2) * 1,
                Math.sin((i / 4) * Math.PI * 2) * 1,
                0
              ]}
              args={[0.05, 8, 8]}
            >
              <meshBasicMaterial color="#00ff00" />
            </Sphere>
          ))}
        </group>
      ))}

      {/* Interactive hotspots */}
      {components.map((component, index) => (
        <Sphere
          key={`hotspot-${component.id}`}
          position={[component.position[0], component.position[1], 0.8]}
          args={[0.1, 16, 16]}
        >
          <meshBasicMaterial
            color="#ffff00"
            transparent
            opacity={0.7}
          />
        </Sphere>
      ))}

      {/* Background grid */}
      <group position={[0, 0, -1]}>
        {Array.from({ length: 21 }, (_, i) => (
          <line key={`grid-h-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attachObject={['attributes', 'position']}
                count={2}
                array={new Float32Array([
                  -5, -2.5 + (i * 0.25), 0,
                  5, -2.5 + (i * 0.25), 0
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#333333" opacity={0.3} transparent />
          </line>
        ))}
        {Array.from({ length: 21 }, (_, i) => (
          <line key={`grid-v-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attachObject={['attributes', 'position']}
                count={2}
                array={new Float32Array([
                  -5 + (i * 0.25), -2.5, 0,
                  -5 + (i * 0.25), 2.5, 0
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#333333" opacity={0.3} transparent />
          </line>
        ))}
      </group>
    </group>
  );
};

export default SystemDiagram;
