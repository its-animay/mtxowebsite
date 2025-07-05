import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere, Box, Float, useTexture } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';
import * as THREE from 'three';
// Removed framer-motion-3d import as it's not available

interface CinematicIntroProps {
  isActive: boolean;
  onComplete: () => void;
}

const CinematicIntro: React.FC<CinematicIntroProps> = ({ isActive, onComplete }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const particleGroupRef = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Mesh>(null);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [startTime, setStartTime] = useState(0);

  // Neural network particles
  const particles = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    position: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20
    ] as [number, number, number],
    speed: Math.random() * 0.02 + 0.01,
    phase: Math.random() * Math.PI * 2,
  }));

  // Knowledge symbols floating around
  const knowledgeElements = [
    { type: 'book', position: [3, 2, 1] },
    { type: 'brain', position: [-3, 1, 2] },
    { type: 'speech', position: [2, -2, -1] },
    { type: 'test', position: [-2, 2, -2] },
    { type: 'enterprise', position: [1, -3, 1] },
  ];

  useEffect(() => {
    if (isActive && startTime === 0) {
      setStartTime(Date.now());
    }
  }, [isActive, startTime]);

  useFrame((state) => {
    if (!isActive) return;

    const elapsed = (Date.now() - startTime) / 1000;
    
    // Animation phases over 8 seconds
    if (elapsed < 2) {
      // Phase 1: Dark void with initial pulse
      setAnimationPhase(1);
      if (coreRef.current) {
        const pulse = Math.sin(elapsed * 8) * 0.3 + 0.7;
        coreRef.current.scale.setScalar(pulse);
      }
    } else if (elapsed < 4) {
      // Phase 2: Neural particles converging
      setAnimationPhase(2);
      if (particleGroupRef.current) {
        particleGroupRef.current.children.forEach((child, index) => {
          const particle = particles[index];
          if (particle) {
            const convergence = (elapsed - 2) / 2;
            child.position.lerp(
              new THREE.Vector3(0, 0, 0),
              convergence * 0.1
            );
          }
        });
      }
    } else if (elapsed < 6) {
      // Phase 3: AI core formation
      setAnimationPhase(3);
      if (coreRef.current) {
        const formation = (elapsed - 4) / 2;
        const material = coreRef.current.material as THREE.MeshStandardMaterial;
        material.opacity = formation;
        coreRef.current.scale.setScalar(formation * 2);
      }
    } else if (elapsed < 8) {
      // Phase 4: Knowledge elements orbit
      setAnimationPhase(4);
      if (groupRef.current) {
        groupRef.current.rotation.y = (elapsed - 6) * 0.5;
      }
    } else {
      // Phase 5: Text reveal and completion
      setAnimationPhase(5);
      if (textRef.current) {
        const material = textRef.current.material as THREE.MeshStandardMaterial;
        material.opacity = Math.min(1, (elapsed - 8) / 1);
      }
      if (elapsed > 9) {
        onComplete();
      }
    }

    // Continuous core glow animation
    if (coreRef.current) {
      const glow = Math.sin(state.clock.elapsedTime * 2) * 0.2 + 0.8;
      const material = coreRef.current.material as THREE.MeshStandardMaterial;
      material.emissive.setHex(0x00ffff);
      material.emissiveIntensity = glow;
    }
  });

  if (!isActive) return null;

  return (
    <group ref={groupRef}>
      {/* Central AI Core */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        <Sphere ref={coreRef} args={[1, 64, 64]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#00ffff"
            transparent
            opacity={0}
            emissive="#00ffff"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.9}
          />
        </Sphere>
      </Float>

      {/* Neural Network Particles */}
      <group ref={particleGroupRef}>
        {particles.map((particle) => (
          <Float key={particle.id} speed={particle.speed} rotationIntensity={0.1}>
            <Sphere args={[0.02, 8, 8]} position={particle.position}>
              <meshStandardMaterial
                color="#ffffff"
                emissive="#ffffff"
                emissiveIntensity={0.3}
                transparent
                opacity={0.8}
              />
            </Sphere>
          </Float>
        ))}
      </group>

      {/* Knowledge Elements */}
      {knowledgeElements.map((element, index) => (
        <Float key={element.type} speed={1 + index * 0.2} rotationIntensity={0.2}>
          <Box args={[0.3, 0.3, 0.3]} position={element.position as [number, number, number]}>
            <meshStandardMaterial
              color={`hsl(${index * 60}, 70%, 60%)`}
              emissive={`hsl(${index * 60}, 70%, 30%)`}
              emissiveIntensity={0.2}
              transparent
              opacity={0.7}
            />
          </Box>
        </Float>
      ))}

      {/* Holographic Text */}
      {animationPhase >= 5 && (
        <Text
          ref={textRef}
          position={[0, -3, 0]}
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
        >
          Meet Ally – Your Smartest Companion
          <meshStandardMaterial
            transparent
            opacity={0}
            emissive="#ffffff"
            emissiveIntensity={0.5}
          />
        </Text>
      )}

      {/* Ambient Lighting for the Scene */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#00ffff" />
      <pointLight position={[0, 0, 0]} intensity={1} color="#ffffff" />
    </group>
  );
};

export default CinematicIntro;