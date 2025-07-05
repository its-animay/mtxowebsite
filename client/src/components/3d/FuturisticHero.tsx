import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Box, Sphere, Float, Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface FuturisticHeroProps {
  scale?: number;
  intensity?: number;
  showOrb?: boolean;
}

const FuturisticHero: React.FC<FuturisticHeroProps> = ({ 
  scale = 1, 
  intensity = 1,
  showOrb = true 
}) => {
  const portalRef = useRef<THREE.Mesh>(null);
  const orbRef = useRef<THREE.Mesh>(null);
  const trailsRef = useRef<THREE.Group>(null);
  const glyphsRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  // Knowledge glyphs configuration
  const knowledgeGlyphs = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      position: [
        Math.cos((i / 8) * Math.PI * 2) * 4,
        Math.sin((i / 8) * Math.PI * 2) * 2 + Math.sin(i) * 0.5,
        Math.cos((i / 8) * Math.PI * 2) * 2 - 2
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ] as [number, number, number],
      color: `hsl(${200 + i * 20}, 70%, 60%)`,
      emissiveColor: `hsl(${200 + i * 20}, 70%, 30%)`,
      speed: 0.2 + Math.random() * 0.3
    }));
  }, []);

  // Light trails inside portal
  const lightTrails = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      startPosition: [
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        -1
      ] as [number, number, number],
      endPosition: [
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        1
      ] as [number, number, number],
      speed: 0.01 + Math.random() * 0.02,
      opacity: 0.3 + Math.random() * 0.4
    }));
  }, []);

  // Neural network inside orb
  const neuralNodes = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      position: [
        Math.cos((i / 12) * Math.PI * 2) * 0.6,
        Math.sin((i / 12) * Math.PI * 2) * 0.6,
        (Math.random() - 0.5) * 0.8
      ] as [number, number, number],
      connections: Array.from({ length: 2 + Math.floor(Math.random() * 3) }, () => 
        Math.floor(Math.random() * 12)
      ).filter(idx => idx !== i)
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Animate portal
    if (portalRef.current) {
      portalRef.current.rotation.y = time * 0.3;
      portalRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
      
      // Subtle scale breathing
      const breathe = Math.sin(time * 1.5) * 0.05 + 1;
      portalRef.current.scale.setScalar(breathe * scale);
    }

    // Animate orb
    if (orbRef.current && showOrb) {
      orbRef.current.rotation.y = time * 0.4;
      orbRef.current.rotation.z = Math.sin(time * 0.3) * 0.2;
      
      // Pulsing effect
      const pulse = Math.sin(time * 2) * 0.1 + 1;
      orbRef.current.scale.setScalar(pulse);
    }

    // Animate knowledge glyphs
    if (glyphsRef.current) {
      glyphsRef.current.children.forEach((glyph, index) => {
        const config = knowledgeGlyphs[index];
        glyph.rotation.x += config.speed * 0.01;
        glyph.rotation.y += config.speed * 0.015;
        glyph.rotation.z += config.speed * 0.008;
        
        // Floating motion
        const float = Math.sin(time * config.speed + index) * 0.3;
        glyph.position.y = config.position[1] + float;
      });
    }

    // Animate light trails
    if (trailsRef.current) {
      trailsRef.current.children.forEach((trail, index) => {
        const config = lightTrails[index];
        trail.position.z += config.speed;
        
        if (trail.position.z > 1) {
          trail.position.z = -1;
          trail.position.x = (Math.random() - 0.5) * 2;
          trail.position.y = (Math.random() - 0.5) * 2;
        }
      });
    }

    // Subtle camera float
    camera.position.y = Math.sin(time * 0.5) * 0.1;
    camera.position.x = Math.cos(time * 0.3) * 0.05;
  });

  return (
    <group>
      {/* Main Portal Window */}
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <Box ref={portalRef} args={[3, 3, 0.3]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#4c1d95"
            transparent
            opacity={0.3}
            emissive="#6366f1"
            emissiveIntensity={0.2 * intensity}
            roughness={0.1}
            metalness={0.8}
            envMapIntensity={1.5}
          />
        </Box>
      </Float>

      {/* Inner Portal Glow */}
      <Box args={[2.5, 2.5, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#8b5cf6"
          transparent
          opacity={0.4}
          emissive="#8b5cf6"
          emissiveIntensity={0.4 * intensity}
          side={THREE.DoubleSide}
        />
      </Box>

      {/* Light Trails */}
      <group ref={trailsRef}>
        {lightTrails.map((trail) => (
          <Sphere key={trail.id} args={[0.02, 8, 8]} position={trail.startPosition}>
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.8}
              transparent
              opacity={trail.opacity}
            />
          </Sphere>
        ))}
      </group>

      {/* Knowledge Glyphs */}
      <group ref={glyphsRef}>
        {knowledgeGlyphs.map((glyph) => (
          <Float key={glyph.id} speed={glyph.speed} rotationIntensity={0.2}>
            <Box args={[0.4, 0.4, 0.1]} position={glyph.position} rotation={glyph.rotation}>
              <meshStandardMaterial
                color={glyph.color}
                transparent
                opacity={0.7}
                emissive={glyph.emissiveColor}
                emissiveIntensity={0.3 * intensity}
                roughness={0.2}
                metalness={0.6}

              />
            </Box>
          </Float>
        ))}
      </group>

      {/* Central AI Orb */}
      {showOrb && (
        <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.3}>
          <Sphere ref={orbRef} args={[0.8, 32, 32]} position={[0, 2.5, 0]}>
            <meshStandardMaterial
              color="#06b6d4"
              transparent
              opacity={0.6}
              emissive="#06b6d4"
              emissiveIntensity={0.4 * intensity}
              roughness={0.1}
              metalness={0.9}
              envMapIntensity={2}
            />
          </Sphere>

          {/* Neural Network Inside */}
          {neuralNodes.map((node) => (
            <Sphere key={node.id} args={[0.03, 8, 8]} position={node.position}>
              <meshStandardMaterial
                color="#ffffff"
                emissive="#ffffff"
                emissiveIntensity={0.6}
                transparent
                opacity={0.8}
              />
            </Sphere>
          ))}
        </Float>
      )}

      {/* Volumetric Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.8} 
        color="#ffffff"
        castShadow
      />
      <pointLight 
        position={[0, 0, 2]} 
        intensity={1.5} 
        color="#8b5cf6" 
        distance={15}
        decay={2}
      />
      <pointLight 
        position={[3, 3, 3]} 
        intensity={0.8} 
        color="#06b6d4" 
        distance={10}
        decay={2}
      />
      <pointLight 
        position={[-3, -3, 3]} 
        intensity={0.6} 
        color="#f59e0b" 
        distance={8}
        decay={2}
      />

      {/* Particle Background */}
      <group>
        {Array.from({ length: 50 }, (_, i) => (
          <Sphere key={i} args={[0.01, 4, 4]} position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10 - 5
          ]}>
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.3}
              transparent
              opacity={0.4}
            />
          </Sphere>
        ))}
      </group>
    </group>
  );
};

export default FuturisticHero;