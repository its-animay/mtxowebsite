import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SkillArea {
  name: string;
  level: number;
  position: [number, number, number];
  color: string;
}

const TestRadar = () => {
  const groupRef = useRef<THREE.Group>(null);
  const radarRef = useRef<THREE.Mesh>(null);
  const sweepRef = useRef<THREE.Mesh>(null);

  // Skill areas data
  const skillAreas: SkillArea[] = useMemo(() => [
    { name: "Mathematics", level: 0.8, position: [2, 0, 0], color: "#FF6B6B" },
    { name: "Science", level: 0.6, position: [1.4, 1.4, 0], color: "#4ECDC4" },
    { name: "English", level: 0.9, position: [0, 2, 0], color: "#45B7D1" },
    { name: "History", level: 0.4, position: [-1.4, 1.4, 0], color: "#F9CA24" },
    { name: "Geography", level: 0.7, position: [-2, 0, 0], color: "#F0932B" },
    { name: "Art", level: 0.5, position: [-1.4, -1.4, 0], color: "#EB4D4B" },
    { name: "Music", level: 0.3, position: [0, -2, 0], color: "#6F1E51" },
    { name: "PE", level: 0.8, position: [1.4, -1.4, 0], color: "#A55EEA" }
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
    
    if (sweepRef.current) {
      sweepRef.current.rotation.z = state.clock.elapsedTime * 2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Radar background circles */}
      {[0.5, 1, 1.5, 2, 2.5].map((radius, index) => (
        <mesh key={index} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.02, radius, 64]} />
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Radar grid lines */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <line key={`grid-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attachObject={['attributes', 'position']}
                count={2}
                array={new Float32Array([
                  0, 0, 0,
                  Math.cos(angle) * 2.5, Math.sin(angle) * 2.5, 0
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#00ffff" opacity={0.3} transparent />
          </line>
        );
      })}

      {/* Skill area indicators */}
      {skillAreas.map((skill, index) => (
        <group key={index} position={[
          skill.position[0] * skill.level,
          skill.position[1] * skill.level,
          skill.position[2]
        ]}>
          {/* Skill point */}
          <mesh>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial color={skill.color} />
          </mesh>
          
          {/* Skill level bar */}
          <mesh position={[0, 0, 0.2]}>
            <boxGeometry args={[0.05, skill.level * 0.5, 0.05]} />
            <meshBasicMaterial color={skill.color} />
          </mesh>
          
          {/* Pulsing ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.15, 0.2, 16]} />
            <meshBasicMaterial
              color={skill.color}
              transparent
              opacity={0.5}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}

      {/* Radar sweep */}
      <mesh ref={sweepRef} position={[0, 0, 0.01]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 2.5, 64, 1, 0, Math.PI / 3]} />
        <meshBasicMaterial
          color="#00ff00"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Center hub */}
      <mesh>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Weakness indicators */}
      {skillAreas
        .filter(skill => skill.level < 0.5)
        .map((skill, index) => (
          <group key={`weakness-${index}`} position={skill.position}>
            <mesh>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshBasicMaterial color="#ff0000" />
            </mesh>
            {/* Warning pulse */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.3, 0.35, 16]} />
              <meshBasicMaterial
                color="#ff0000"
                transparent
                opacity={0.6}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        ))}
    </group>
  );
};

export default TestRadar;
