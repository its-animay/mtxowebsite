import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const CallCenterCube = () => {
  const groupRef = useRef<THREE.Group>(null);
  const voiceWavesRef = useRef<THREE.Group>(null);

  // Generate agent positions
  const agents = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      position: [
        (i % 4) * 1.5 - 2.25,
        Math.floor(i / 4) * 1.5 - 0.75,
        0
      ] as [number, number, number],
      isActive: Math.random() > 0.3,
      voiceIntensity: Math.random()
    }));
  }, []);

  // Generate voice wave paths
  const voiceWaves = useMemo(() => {
    return agents
      .filter(agent => agent.isActive)
      .map((agent, index) => ({
        startPos: agent.position,
        endPos: [0, 0, 2] as [number, number, number], // Central hub
        delay: index * 0.5
      }));
  }, [agents]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
    
    if (voiceWavesRef.current) {
      voiceWavesRef.current.children.forEach((wave, index) => {
        if (wave instanceof THREE.Mesh) {
          const time = state.clock.elapsedTime + voiceWaves[index]?.delay || 0;
          wave.scale.setScalar(1 + Math.sin(time * 3) * 0.3);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main cube structure */}
      <Box position={[0, 0, 0]} args={[6, 3, 0.2]}>
        <meshPhysicalMaterial
          color="#1a1a2e"
          metalness={0.3}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </Box>

      {/* Agent workstations */}
      {agents.map((agent) => (
        <group key={agent.id} position={agent.position}>
          {/* Workstation */}
          <Box args={[0.8, 0.6, 0.1]}>
            <meshPhysicalMaterial
              color={agent.isActive ? "#4F46E5" : "#374151"}
              metalness={0.2}
              roughness={0.3}
            />
          </Box>
          
          {/* Agent avatar */}
          <Sphere position={[0, 0, 0.3]} args={[0.15, 16, 16]}>
            <meshBasicMaterial color={agent.isActive ? "#00ffff" : "#666666"} />
          </Sphere>
          
          {/* Activity indicator */}
          {agent.isActive && (
            <Sphere position={[0, 0, 0.5]} args={[0.05, 8, 8]}>
              <meshBasicMaterial color="#00ff00" />
            </Sphere>
          )}
        </group>
      ))}

      {/* Central AI hub */}
      <group position={[0, 0, 2]}>
        <Sphere args={[0.3, 32, 32]}>
          <meshPhysicalMaterial
            color="#667eea"
            metalness={0.3}
            roughness={0.1}
            transparent
            opacity={0.9}
          />
        </Sphere>
        
        {/* Hub glow effect */}
        <Sphere args={[0.4, 16, 16]}>
          <meshBasicMaterial
            color="#667eea"
            transparent
            opacity={0.3}
          />
        </Sphere>
      </group>

      {/* Voice wave connections */}
      <group ref={voiceWavesRef}>
        {voiceWaves.map((wave, index) => (
          <group key={index}>
            {/* Connection line */}
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attachObject={['attributes', 'position']}
                  count={2}
                  array={new Float32Array([
                    ...wave.startPos,
                    ...wave.endPos
                  ])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#00ffff" opacity={0.6} transparent />
            </line>
            
            {/* Traveling voice wave */}
            <Sphere
              position={[
                wave.startPos[0] + (wave.endPos[0] - wave.startPos[0]) * 0.5,
                wave.startPos[1] + (wave.endPos[1] - wave.startPos[1]) * 0.5,
                wave.startPos[2] + (wave.endPos[2] - wave.startPos[2]) * 0.5
              ]}
              args={[0.08, 16, 16]}
            >
              <meshBasicMaterial color="#ffff00" />
            </Sphere>
          </group>
        ))}
      </group>

      {/* Call scenarios floating around */}
      {['Sales', 'Support', 'Training', 'Knowledge'].map((scenario, index) => (
        <group
          key={scenario}
          position={[
            Math.cos((index / 4) * Math.PI * 2) * 4,
            Math.sin((index / 4) * Math.PI * 2) * 4,
            1
          ]}
        >
          <Box args={[1, 0.5, 0.1]}>
            <meshPhysicalMaterial
              color={`hsl(${index * 90}, 70%, 50%)`}
              metalness={0.2}
              roughness={0.3}
            />
          </Box>
          
          {/* Scenario indicator */}
          <Sphere position={[0, 0, 0.2]} args={[0.1, 16, 16]}>
            <meshBasicMaterial color="#ffffff" />
          </Sphere>
        </group>
      ))}

      {/* Data flow particles */}
      {Array.from({ length: 20 }, (_, i) => (
        <Sphere
          key={`particle-${i}`}
          position={[
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 3
          ]}
          args={[0.03, 8, 8]}
        >
          <meshBasicMaterial color="#ffffff" opacity={0.6} transparent />
        </Sphere>
      ))}
    </group>
  );
};

export default CallCenterCube;
