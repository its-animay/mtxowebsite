import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Float, Icosahedron, Text } from '@react-three/drei';
import * as THREE from 'three';

interface CrystallineCoreProps {
  scale?: number;
  intensity?: number;
  showText?: boolean;
}

const CrystallineCore: React.FC<CrystallineCoreProps> = ({ 
  scale = 1, 
  intensity = 1,
  showText = false 
}) => {
  const coreRef = useRef<THREE.Mesh>(null);
  const shardsRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  // Create crystalline shards around the core
  const shards = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      position: [
        Math.cos((i / 12) * Math.PI * 2) * 3,
        Math.sin((i / 12) * Math.PI * 2) * 3,
        (Math.random() - 0.5) * 4
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ] as [number, number, number],
      scale: 0.3 + Math.random() * 0.4
    }));
  }, []);

  // Create particle system for magical effect
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(500 * 3);
    const colors = new Float32Array(500 * 3);
    
    for (let i = 0; i < 500; i++) {
      const i3 = i * 3;
      
      // Spherical distribution
      const radius = 5 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Rainbow colors
      const hue = Math.random();
      const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Animate core
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.5;
      coreRef.current.rotation.x = time * 0.2;
      
      // Breathing effect
      const breathe = Math.sin(time * 2) * 0.1 + 1;
      coreRef.current.scale.setScalar(breathe * scale);
    }
    
    // Animate shards
    if (shardsRef.current) {
      shardsRef.current.children.forEach((shard, index) => {
        shard.rotation.x += 0.01 * (index + 1);
        shard.rotation.y += 0.005 * (index + 1);
        
        // Floating motion
        const float = Math.sin(time * 2 + index) * 0.2;
        shard.position.y = shards[index].position[1] + float;
      });
    }
    
    // Animate particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.1;
      particlesRef.current.rotation.x = time * 0.05;
      
      // Update particle positions for swirling effect
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];
        
        // Create swirling motion
        const angle = Math.atan2(y, x) + time * 0.01;
        const radius = Math.sqrt(x * x + y * y);
        
        positions[i] = Math.cos(angle) * radius;
        positions[i + 1] = Math.sin(angle) * radius;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Central Crystal Core */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        <Icosahedron ref={coreRef} args={[1, 0]}>
          <meshStandardMaterial
            color="#00ffff"
            transparent
            opacity={0.7}
            emissive="#00ffff"
            emissiveIntensity={0.4 * intensity}
            roughness={0.05}
            metalness={1.0}
            envMapIntensity={2}

          />
        </Icosahedron>
      </Float>

      {/* Crystalline Shards */}
      <group ref={shardsRef}>
        {shards.map((shard) => (
          <Float key={shard.id} speed={0.5 + shard.id * 0.1} rotationIntensity={0.1}>
            <Icosahedron 
              args={[0.2, 0]} 
              position={shard.position}
              rotation={shard.rotation}
              scale={shard.scale}
            >
              <meshStandardMaterial
                color={new THREE.Color().setHSL(shard.id / 12, 0.8, 0.6)}
                transparent
                opacity={0.6}
                emissive={new THREE.Color().setHSL(shard.id / 12, 0.8, 0.3)}
                emissiveIntensity={0.2 * intensity}
                roughness={0.2}
                metalness={0.8}
              />
            </Icosahedron>
          </Float>
        ))}
      </group>

      {/* Particle System */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={500}
            array={particlePositions.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={500}
            array={particlePositions.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.6 * intensity}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Holographic Text */}
      {showText && (
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <Text
            position={[0, -4, 0]}
            fontSize={0.6}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter-Bold.woff"
          >
            AI Learning Platform
            <meshStandardMaterial
              transparent
              opacity={0.8}
              emissive="#ffffff"
              emissiveIntensity={0.3}
            />
          </Text>
        </Float>
      )}

      {/* Enhanced Volumetric Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[0, 0, 0]} intensity={2} color="#00ffff" />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#ff00ff" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ffff00" />
    </group>
  );
};

export default CrystallineCore;