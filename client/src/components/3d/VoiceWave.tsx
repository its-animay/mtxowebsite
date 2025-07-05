import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface VoiceWaveProps {
  amplitude?: number;
  frequency?: number;
  isPlaying?: boolean;
}

const VoiceWave: React.FC<VoiceWaveProps> = ({ 
  amplitude = 1, 
  frequency = 2, 
  isPlaying = false 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Shader material for wave effect
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        amplitude: { value: amplitude },
        frequency: { value: frequency },
        isPlaying: { value: isPlaying ? 1.0 : 0.0 }
      },
      vertexShader: `
        uniform float time;
        uniform float amplitude;
        uniform float frequency;
        uniform float isPlaying;
        
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          vUv = uv;
          
          float elevation = sin(position.x * frequency + time * 2.0) * amplitude * 0.1 * isPlaying;
          elevation += sin(position.x * frequency * 2.0 + time * 3.0) * amplitude * 0.05 * isPlaying;
          
          vElevation = elevation;
          
          vec3 newPosition = position;
          newPosition.y += elevation;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float isPlaying;
        
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          float alpha = 0.3 + abs(vElevation) * 5.0;
          vec3 color = vec3(0.0, 0.8, 1.0);
          
          if (isPlaying > 0.5) {
            color = mix(color, vec3(0.0, 1.0, 0.8), sin(time * 10.0) * 0.5 + 0.5);
          }
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });
  }, [amplitude, frequency, isPlaying]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
      materialRef.current.uniforms.isPlaying.value = isPlaying ? 1.0 : 0.0;
    }
  });

  return (
    <group>
      {/* Main wave plane */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[10, 2, 64, 16]} />
        <primitive object={shaderMaterial} ref={materialRef} />
      </mesh>

      {/* Voice wave rings */}
      {Array.from({ length: 5 }, (_, i) => (
        <mesh
          key={i}
          position={[0, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <ringGeometry args={[0.5 + i * 0.3, 0.6 + i * 0.3, 32]} />
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={isPlaying ? 0.3 - i * 0.05 : 0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Microphone icon */}
      <group position={[0, 0, 1]}>
        <mesh position={[0, 0.3, 0]}>
          <capsuleGeometry args={[0.1, 0.3, 4, 8]} />
          <meshBasicMaterial color={isPlaying ? "#00ff00" : "#666666"} />
        </mesh>
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
          <meshBasicMaterial color="#888888" />
        </mesh>
      </group>
    </group>
  );
};

export default VoiceWave;
