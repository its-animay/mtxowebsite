import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface HolographicPortalProps {
  position?: [number, number, number];
  scale?: number;
  intensity?: number;
}

const HolographicPortal: React.FC<HolographicPortalProps> = ({ 
  position = [0, 0, 0], 
  scale = 1,
  intensity = 1
}) => {
  const portalRef = useRef<THREE.Group>(null);
  const innerCubeRef = useRef<THREE.Mesh>(null);
  const neuralOrbRef = useRef<THREE.Mesh>(null);
  const lightTrailsRef = useRef<THREE.Group>(null);
  
  // Generate knowledge glyphs
  const knowledgeGlyphs = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      position: [
        Math.cos((i / 8) * Math.PI * 2) * 4,
        Math.sin((i / 8) * Math.PI * 2) * 2,
        Math.sin((i / 8) * Math.PI * 4) * 3
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ] as [number, number, number],
      color: `hsl(${180 + i * 22.5}, 80%, 60%)`, // Cool color palette
      speed: 0.5 + Math.random() * 0.3
    }));
  }, []);

  // Light trails inside the portal
  const lightTrails = useMemo(() => {
    const trails = [];
    for (let i = 0; i < 20; i++) {
      trails.push({
        id: i,
        position: [
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ] as [number, number, number],
        speed: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2
      });
    }
    return trails;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Rotate entire portal group
    if (portalRef.current) {
      portalRef.current.rotation.y = time * 0.2;
      portalRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    }
    
    // Inner cube pulsing
    if (innerCubeRef.current) {
      const pulse = Math.sin(time * 3) * 0.1 + 1;
      innerCubeRef.current.scale.setScalar(pulse);
      innerCubeRef.current.rotation.x = time * 0.8;
      innerCubeRef.current.rotation.y = time * 0.6;
    }
    
    // Neural orb floating and glowing
    if (neuralOrbRef.current) {
      neuralOrbRef.current.position.y = Math.sin(time * 2) * 0.3;
      const material = neuralOrbRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = (Math.sin(time * 4) * 0.3 + 0.7) * intensity;
    }
    
    // Animate light trails
    if (lightTrailsRef.current) {
      lightTrailsRef.current.children.forEach((trail, index) => {
        const trailData = lightTrails[index];
        if (trailData) {
          trail.position.x = Math.sin(time * trailData.speed + trailData.phase) * 1.5;
          trail.position.z = Math.cos(time * trailData.speed + trailData.phase) * 1.5;
          trail.rotation.y = time * 2;
        }
      });
    }
  });

  return (
    <group ref={portalRef} position={position} scale={scale}>
      {/* Outer Portal Frame */}
      <Box args={[3, 3, 0.2]}>
        <meshStandardMaterial
          color="#001133"
          transparent
          opacity={0.3}
          emissive="#003366"
          emissiveIntensity={0.2 * intensity}
          roughness={0.1}
          metalness={0.9}
        />
      </Box>
      
      {/* Semi-hollow inner cube */}
      <Box ref={innerCubeRef} args={[2, 2, 2]}>
        <meshStandardMaterial
          color="#00ffff"
          transparent
          opacity={0.15}
          emissive="#00ffff"
          emissiveIntensity={0.4 * intensity}
          roughness={0.1}
          metalness={0.8}
          wireframe={true}
        />
      </Box>
      
      {/* Central Neural Orb */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <Sphere ref={neuralOrbRef} args={[0.3, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.9}
            emissive="#00ffff"
            emissiveIntensity={0.6 * intensity}
            roughness={0.2}
            metalness={0.7}
          />
        </Sphere>
      </Float>
      
      {/* Light Trails Inside Portal */}
      <group ref={lightTrailsRef}>
        {lightTrails.map((trail) => (
          <Sphere key={trail.id} args={[0.02, 8, 8]} position={trail.position}>
            <meshStandardMaterial
              color="#ffffff"
              emissive="#00ffff"
              emissiveIntensity={0.8 * intensity}
              transparent
              opacity={0.8}
            />
          </Sphere>
        ))}
      </group>
      
      {/* Floating Knowledge Glyphs */}
      {knowledgeGlyphs.map((glyph) => (
        <Float key={glyph.id} speed={glyph.speed} rotationIntensity={0.2} floatIntensity={0.3}>
          <Box 
            args={[0.4, 0.4, 0.1]} 
            position={glyph.position}
            rotation={glyph.rotation}
          >
            <meshStandardMaterial
              color={glyph.color}
              transparent
              opacity={0.7}
              emissive={glyph.color}
              emissiveIntensity={0.3 * intensity}
              roughness={0.3}
              metalness={0.6}
            />
          </Box>
        </Float>
      ))}
      
      {/* Volumetric Light Effects */}
      <pointLight position={[0, 0, 0]} intensity={2 * intensity} color="#00ffff" />
      <pointLight position={[2, 2, 2]} intensity={0.5 * intensity} color="#ffffff" />
      <pointLight position={[-2, -2, -2]} intensity={0.5 * intensity} color="#ff00ff" />
    </group>
  );
};

export default HolographicPortal;