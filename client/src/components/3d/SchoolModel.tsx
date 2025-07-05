import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const SchoolModel = () => {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Group>(null);

  // Generate classroom positions
  const classrooms = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      position: [
        (i % 3) * 2.5 - 2.5,
        Math.floor(i / 3) * 1.5 - 0.75,
        0
      ] as [number, number, number],
      hasAI: Math.random() > 0.3
    }));
  }, []);

  // Generate AI nodes
  const aiNodes = useMemo(() => {
    return classrooms
      .filter(room => room.hasAI)
      .map(room => ({
        position: [room.position[0], room.position[1] + 0.5, room.position[2] + 0.5] as [number, number, number],
        pulseOffset: Math.random() * Math.PI * 2
      }));
  }, [classrooms]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    
    if (nodesRef.current) {
      nodesRef.current.children.forEach((node, index) => {
        const aiNode = aiNodes[index];
        if (node instanceof THREE.Mesh && aiNode) {
          const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + aiNode.pulseOffset) * 0.3;
          node.scale.setScalar(scale);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* School building base */}
      <Box position={[0, -0.5, 0]} args={[8, 1, 4]}>
        <meshPhysicalMaterial
          color="#8B7355"
          metalness={0.1}
          roughness={0.8}
        />
      </Box>

      {/* Classrooms */}
      {classrooms.map((classroom) => (
        <group key={classroom.id} position={classroom.position}>
          <Box args={[1.8, 1.2, 1.8]}>
            <meshPhysicalMaterial
              color={classroom.hasAI ? "#4F46E5" : "#6B7280"}
              metalness={0.2}
              roughness={0.3}
              transparent
              opacity={0.8}
            />
          </Box>
          
          {/* Windows */}
          <Box position={[0, 0, 0.91]} args={[1.2, 0.8, 0.05]}>
            <meshPhysicalMaterial
              color="#87CEEB"
              metalness={0.1}
              roughness={0.1}
              transparent
              opacity={0.6}
            />
          </Box>
        </group>
      ))}

      {/* AI nodes */}
      <group ref={nodesRef}>
        {aiNodes.map((node, index) => (
          <Sphere key={index} position={node.position} args={[0.15, 16, 16]}>
            <meshBasicMaterial color="#00ffff" />
          </Sphere>
        ))}
      </group>

      {/* Connection lines between AI nodes */}
      {aiNodes.map((startNode, index) => {
        if (index < aiNodes.length - 1) {
          const endNode = aiNodes[index + 1];
          return (
            <line key={`connection-${index}`}>
              <bufferGeometry>
                <bufferAttribute
                  attachObject={['attributes', 'position']}
                  count={2}
                  array={new Float32Array([
                    ...startNode.position,
                    ...endNode.position
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#00ffff" opacity={0.7} transparent />
            </line>
          );
        }
        return null;
      })}

      {/* School sign */}
      <group position={[0, 2, 2]}>
        <Box args={[3, 0.5, 0.1]}>
          <meshPhysicalMaterial color="#2D3748" />
        </Box>
        {/* Sign text representation */}
        <Box position={[0, 0, 0.06]} args={[2.5, 0.3, 0.02]}>
          <meshBasicMaterial color="#00ffff" />
        </Box>
      </group>

      {/* Flagpole */}
      <group position={[3, 0, 2]}>
        <Box args={[0.05, 3, 0.05]}>
          <meshPhysicalMaterial color="#8B4513" />
        </Box>
        <Box position={[0.3, 1, 0]} args={[0.6, 0.4, 0.02]}>
          <meshPhysicalMaterial color="#FF0000" />
        </Box>
      </group>
    </group>
  );
};

export default SchoolModel;
