import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box, Float } from '@react-three/drei';
import * as THREE from 'three';

interface AnimatedPandaProps {
  position?: [number, number, number];
  scale?: number;
  isHovered?: boolean;
}

const AnimatedPanda: React.FC<AnimatedPandaProps> = ({ 
  position = [0, 0, 0], 
  scale = 1,
  isHovered = false 
}) => {
  const pandaRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const leftEarRef = useRef<THREE.Mesh>(null);
  const rightEarRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);

  const [blinkTimer, setBlinkTimer] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [nextBlink, setNextBlink] = useState(3 + Math.random() * 4);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Gentle floating animation
    if (pandaRef.current) {
      pandaRef.current.position.y = position[1] + Math.sin(time * 1.5) * 0.1;
      pandaRef.current.rotation.y = Math.sin(time * 0.8) * 0.1;
    }

    // Head tilt animation
    if (headRef.current) {
      headRef.current.rotation.z = Math.sin(time * 0.6) * 0.05;
      
      // Bounce when hovered
      if (isHovered) {
        headRef.current.rotation.x = Math.sin(time * 8) * 0.1;
      }
    }

    // Arm waving animation when hovered
    if (leftArmRef.current && rightArmRef.current) {
      if (isHovered) {
        leftArmRef.current.rotation.z = Math.sin(time * 4) * 0.3 + 0.2;
        rightArmRef.current.rotation.z = Math.sin(time * 4 + Math.PI) * 0.3 - 0.2;
      } else {
        leftArmRef.current.rotation.z = Math.sin(time * 0.5) * 0.05 + 0.1;
        rightArmRef.current.rotation.z = Math.sin(time * 0.5) * 0.05 - 0.1;
      }
    }

    // Ear wiggle
    if (leftEarRef.current && rightEarRef.current) {
      leftEarRef.current.rotation.z = Math.sin(time * 2) * 0.1;
      rightEarRef.current.rotation.z = Math.sin(time * 2 + Math.PI) * 0.1;
    }

    // Blinking animation
    setBlinkTimer(prev => prev + 0.016);
    
    if (blinkTimer >= nextBlink && !isBlinking) {
      setIsBlinking(true);
      setBlinkTimer(0);
      setNextBlink(2 + Math.random() * 6);
    }

    if (isBlinking) {
      const blinkProgress = (blinkTimer / 0.3);
      if (blinkProgress >= 1) {
        setIsBlinking(false);
        setBlinkTimer(0);
      }
      
      const scaleY = blinkProgress < 0.5 
        ? 1 - (blinkProgress * 2) * 0.8 
        : 0.2 + ((blinkProgress - 0.5) * 2) * 0.8;
        
      if (leftEyeRef.current && rightEyeRef.current) {
        leftEyeRef.current.scale.y = scaleY;
        rightEyeRef.current.scale.y = scaleY;
      }
    } else {
      if (leftEyeRef.current && rightEyeRef.current) {
        leftEyeRef.current.scale.y = 1;
        rightEyeRef.current.scale.y = 1;
      }
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={pandaRef} position={position} scale={scale}>
        {/* Body */}
        <Sphere args={[1, 32, 32]} position={[0, -1.2, 0]}>
          <meshStandardMaterial
            color="#f8f9fa"
            roughness={0.3}
            metalness={0.1}
          />
        </Sphere>

        {/* Head */}
        <Sphere ref={headRef} args={[0.8, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#f8f9fa"
            roughness={0.3}
            metalness={0.1}
          />
        </Sphere>

        {/* Ears */}
        <Sphere ref={leftEarRef} args={[0.25, 16, 16]} position={[-0.4, 0.5, 0.1]}>
          <meshStandardMaterial color="#2d3748" />
        </Sphere>
        <Sphere ref={rightEarRef} args={[0.25, 16, 16]} position={[0.4, 0.5, 0.1]}>
          <meshStandardMaterial color="#2d3748" />
        </Sphere>

        {/* Eyes */}
        <Sphere ref={leftEyeRef} args={[0.12, 16, 16]} position={[-0.2, 0.1, 0.7]}>
          <meshStandardMaterial color="#2d3748" />
        </Sphere>
        <Sphere ref={rightEyeRef} args={[0.12, 16, 16]} position={[0.2, 0.1, 0.7]}>
          <meshStandardMaterial color="#2d3748" />
        </Sphere>

        {/* Eye highlights */}
        <Sphere args={[0.04, 8, 8]} position={[-0.18, 0.15, 0.75]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
        </Sphere>
        <Sphere args={[0.04, 8, 8]} position={[0.22, 0.15, 0.75]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
        </Sphere>

        {/* Nose */}
        <Sphere args={[0.06, 8, 8]} position={[0, -0.1, 0.75]}>
          <meshStandardMaterial color="#2d3748" />
        </Sphere>

        {/* Arms */}
        <Sphere ref={leftArmRef} args={[0.3, 16, 16]} position={[-0.9, -0.5, 0]}>
          <meshStandardMaterial color="#f8f9fa" />
        </Sphere>
        <Sphere ref={rightArmRef} args={[0.3, 16, 16]} position={[0.9, -0.5, 0]}>
          <meshStandardMaterial color="#f8f9fa" />
        </Sphere>

        {/* Paws */}
        <Sphere args={[0.2, 12, 12]} position={[-1.1, -0.8, 0]}>
          <meshStandardMaterial color="#2d3748" />
        </Sphere>
        <Sphere args={[0.2, 12, 12]} position={[1.1, -0.8, 0]}>
          <meshStandardMaterial color="#2d3748" />
        </Sphere>

        {/* Legs */}
        <Sphere args={[0.35, 16, 16]} position={[-0.4, -1.8, 0]}>
          <meshStandardMaterial color="#f8f9fa" />
        </Sphere>
        <Sphere args={[0.35, 16, 16]} position={[0.4, -1.8, 0]}>
          <meshStandardMaterial color="#f8f9fa" />
        </Sphere>

        {/* Feet */}
        <Sphere args={[0.25, 12, 12]} position={[-0.4, -2.2, 0.2]}>
          <meshStandardMaterial color="#2d3748" />
        </Sphere>
        <Sphere args={[0.25, 12, 12]} position={[0.4, -2.2, 0.2]}>
          <meshStandardMaterial color="#2d3748" />
        </Sphere>
      </group>
    </Float>
  );
};

export default AnimatedPanda;