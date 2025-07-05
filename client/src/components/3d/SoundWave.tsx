import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface SoundWaveProps {
  isPlaying?: boolean;
  intensity?: number;
  color?: string;
}

const SoundWave: React.FC<SoundWaveProps> = ({ 
  isPlaying = true, 
  intensity = 1,
  color = "#ff69b4"
}) => {
  const waveRef = useRef<THREE.Group>(null);
  
  // Create sound wave rings
  const waveRings = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      radius: 0.5 + i * 0.4,
      opacity: 0.8 - (i * 0.12),
      delay: i * 0.3,
    }));
  }, []);

  // Create pulsing particles
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      angle: (i / 20) * Math.PI * 2,
      baseRadius: 1.5 + Math.random() * 1,
      speed: 0.5 + Math.random() * 0.5,
      size: 0.02 + Math.random() * 0.03,
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (waveRef.current && isPlaying) {
      // Animate sound wave rings
      waveRef.current.children.forEach((child, index) => {
        if (index < waveRings.length) {
          const ring = waveRings[index];
          const waveTime = time - ring.delay;
          
          if (waveTime > 0) {
            // Pulsing effect
            const pulse = Math.sin(waveTime * 3) * 0.2 + 1;
            child.scale.setScalar(pulse * intensity);
            
            // Fade effect
            const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
            if (material) {
              material.opacity = ring.opacity * Math.max(0, Math.sin(waveTime * 2));
            }
          }
        }
      });
    }
  });

  return (
    <group ref={waveRef}>
      {/* Sound wave rings */}
      {waveRings.map((ring) => (
        <mesh key={ring.id} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[ring.radius, ring.radius + 0.1, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            transparent
            opacity={ring.opacity}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      
      {/* Pulsing particles */}
      {particles.map((particle) => (
        <Sphere 
          key={particle.id} 
          args={[particle.size, 8, 8]} 
          position={[
            Math.cos(particle.angle) * particle.baseRadius,
            Math.sin(particle.angle) * particle.baseRadius,
            0
          ]}
        >
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </Sphere>
      ))}
    </group>
  );
};

export default SoundWave;