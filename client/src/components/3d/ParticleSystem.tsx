import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
  radius?: number;
  speed?: number;
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ 
  count = 5000, 
  radius = 50, 
  speed = 0.5 
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random particle positions
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Random sphere distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = Math.random() * radius;
      
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      // Color gradient from blue to purple
      const hue = 240 + Math.random() * 60; // 240-300 degrees
      const color = new THREE.Color(`hsl(${hue}, 70%, 60%)`);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return [positions, colors];
  }, [count, radius]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * speed * 0.1;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.05) * 0.1;
    }
  });

  return (
    <Points ref={pointsRef} limit={count}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        vertexColors
        size={0.5}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

export default ParticleSystem;
