import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Box, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface MagicalElementsProps {
  count?: number;
  spread?: number;
}

const MagicalElements: React.FC<MagicalElementsProps> = ({ count = 12, spread = 8 }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create magical floating elements
  const elements = useMemo(() => {
    const elementTypes = ['star', 'cloud', 'balloon', 'block', 'heart', 'sparkle'];
    const letters = ['A', 'B', 'C', '1', '2', '3', '🌟', '☁️', '💫'];
    
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      type: elementTypes[i % elementTypes.length],
      letter: letters[i % letters.length],
      position: [
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread * 0.8,
        (Math.random() - 0.5) * spread * 0.6
      ] as [number, number, number],
      color: `hsl(${Math.random() * 360}, 70%, ${60 + Math.random() * 20}%)`,
      speed: 0.5 + Math.random() * 1,
      scale: 0.3 + Math.random() * 0.4,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
    }));
  }, [count, spread]);

  // Sparkle particles
  const sparkles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * spread * 1.5,
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread
      ] as [number, number, number],
      speed: 0.01 + Math.random() * 0.02,
      opacity: 0.3 + Math.random() * 0.4,
    }));
  }, [spread]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Animate main group
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
      groupRef.current.children.forEach((child, index) => {
        if (index < elements.length) {
          const element = elements[index];
          
          // Floating motion
          child.position.y = element.position[1] + Math.sin(time * element.speed + index) * 0.3;
          child.position.x = element.position[0] + Math.cos(time * element.speed * 0.5 + index) * 0.2;
          
          // Rotation
          child.rotation.x += element.rotationSpeed;
          child.rotation.y += element.rotationSpeed * 0.7;
          child.rotation.z += element.rotationSpeed * 0.5;
        }
      });
    }
  });

  const renderElement = (element: any, index: number) => {
    const commonProps = {
      key: element.id,
      position: element.position,
      scale: element.scale,
    };

    const material = (
      <meshStandardMaterial
        color={element.color}
        emissive={element.color}
        emissiveIntensity={0.2}
        roughness={0.3}
        metalness={0.1}
        transparent
        opacity={0.8}
      />
    );

    switch (element.type) {
      case 'star':
        return (
          <Float key={element.id} speed={element.speed} rotationIntensity={0.2}>
            <group {...commonProps}>
              {/* Star shape using multiple triangles */}
              <Box args={[0.6, 0.15, 0.1]} rotation={[0, 0, 0]}>
                {material}
              </Box>
              <Box args={[0.15, 0.6, 0.1]} rotation={[0, 0, 0]}>
                {material}
              </Box>
              <Box args={[0.4, 0.15, 0.1]} rotation={[0, 0, Math.PI / 4]}>
                {material}
              </Box>
              <Box args={[0.4, 0.15, 0.1]} rotation={[0, 0, -Math.PI / 4]}>
                {material}
              </Box>
            </group>
          </Float>
        );
        
      case 'cloud':
        return (
          <Float key={element.id} speed={element.speed} rotationIntensity={0.1}>
            <group {...commonProps}>
              <Sphere args={[0.3, 16, 16]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#ffffff" opacity={0.7} transparent />
              </Sphere>
              <Sphere args={[0.25, 16, 16]} position={[-0.2, 0.1, 0]}>
                <meshStandardMaterial color="#ffffff" opacity={0.7} transparent />
              </Sphere>
              <Sphere args={[0.2, 16, 16]} position={[0.2, 0.1, 0]}>
                <meshStandardMaterial color="#ffffff" opacity={0.7} transparent />
              </Sphere>
            </group>
          </Float>
        );
        
      case 'balloon':
        return (
          <Float key={element.id} speed={element.speed} rotationIntensity={0.1}>
            <group {...commonProps}>
              <Sphere args={[0.3, 16, 16]} position={[0, 0.2, 0]}>
                {material}
              </Sphere>
              <Box args={[0.02, 0.8, 0.02]} position={[0, -0.4, 0]}>
                <meshStandardMaterial color="#8B4513" />
              </Box>
            </group>
          </Float>
        );
        
      case 'block':
        return (
          <Float key={element.id} speed={element.speed} rotationIntensity={0.3}>
            <Box {...commonProps} args={[0.4, 0.4, 0.4]}>
              {material}
              <Text
                position={[0, 0, 0.21]}
                fontSize={0.2}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
              >
                {element.letter}
              </Text>
            </Box>
          </Float>
        );
        
      case 'heart':
        return (
          <Float key={element.id} speed={element.speed} rotationIntensity={0.2}>
            <group {...commonProps}>
              <Sphere args={[0.15, 16, 16]} position={[-0.1, 0.1, 0]}>
                <meshStandardMaterial color="#ff69b4" emissive="#ff69b4" emissiveIntensity={0.3} />
              </Sphere>
              <Sphere args={[0.15, 16, 16]} position={[0.1, 0.1, 0]}>
                <meshStandardMaterial color="#ff69b4" emissive="#ff69b4" emissiveIntensity={0.3} />
              </Sphere>
              <Box args={[0.2, 0.2, 0.1]} position={[0, -0.05, 0]} rotation={[0, 0, Math.PI / 4]}>
                <meshStandardMaterial color="#ff69b4" emissive="#ff69b4" emissiveIntensity={0.3} />
              </Box>
            </group>
          </Float>
        );
        
      default:
        return (
          <Float key={element.id} speed={element.speed} rotationIntensity={0.2}>
            <Sphere {...commonProps} args={[0.2, 16, 16]}>
              {material}
            </Sphere>
          </Float>
        );
    }
  };

  return (
    <group ref={groupRef}>
      {/* Main magical elements */}
      {elements.map((element, index) => renderElement(element, index))}
      
      {/* Sparkle particles */}
      {sparkles.map((sparkle) => (
        <Float key={`sparkle-${sparkle.id}`} speed={2} rotationIntensity={0.5}>
          <Sphere args={[0.03, 8, 8]} position={sparkle.position}>
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.8}
              transparent
              opacity={sparkle.opacity}
            />
          </Sphere>
        </Float>
      ))}
      
      {/* Ambient lighting for magical feel */}
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffb3e6" />
      <pointLight position={[-5, 5, 5]} intensity={0.6} color="#b3d9ff" />
      <pointLight position={[0, -5, 5]} intensity={0.4} color="#ffffb3" />
    </group>
  );
};

export default MagicalElements;