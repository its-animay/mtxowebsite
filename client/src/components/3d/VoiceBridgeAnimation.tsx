import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface VoiceBridgeAnimationProps {
  isActive?: boolean;
  onComplete?: () => void;
}

const VoiceBridgeAnimation: React.FC<VoiceBridgeAnimationProps> = ({ 
  isActive = true, 
  onComplete 
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showTagline, setShowTagline] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'opening' | 'morphing' | 'climax'>('opening');
  const [textOpacity, setTextOpacity] = useState(1);
  
  const groupRef = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Group>(null);
  
  const words = [
    { text: "Hello", color: "#667eea", font: "'Poppins', sans-serif" },
    { text: "Bonjour", color: "#764ba2", font: "'Poppins', sans-serif" },
    { text: "Hola", color: "#f093fb", font: "'Poppins', sans-serif" },
    { text: "नमस्ते", color: "#f5576c", font: "'Poppins', sans-serif" },
    { text: "你好", color: "#4facfe", font: "'Poppins', sans-serif" },
    { text: "こんにちは", color: "#43e97b", font: "'Poppins', sans-serif" },
    { text: "Привет", color: "#fa709a", font: "'Poppins', sans-serif" }
  ];

  // Animation timing
  useEffect(() => {
    if (!isActive) return;

    // Phase 1: Opening (0-2s) - Show first word
    setTimeout(() => {
      setAnimationPhase('morphing');
    }, 2000);

    // Phase 2: Morphing (2-8s) - Cycle through languages
    setTimeout(() => {
      let wordIndex = 0;
      const wordInterval = setInterval(() => {
        // Fade out
        setTextOpacity(0);
        
        setTimeout(() => {
          wordIndex++;
          if (wordIndex >= words.length) {
            clearInterval(wordInterval);
            // Phase 3: Climax (8-10s) - Show tagline
            setTimeout(() => {
              setAnimationPhase('climax');
              setShowTagline(true);
              onComplete?.();
            }, 500);
            return;
          }
          
          setCurrentWordIndex(wordIndex);
          // Fade in
          setTextOpacity(1);
        }, 200); // 200ms fade transition
        
      }, 800); // 800ms per word (including fade time)

      return () => clearInterval(wordInterval);
    }, 2000);
  }, [isActive, onComplete]);

  // Voice wave rings animation
  const VoiceWaveRings = () => {
    const ringsRef = useRef<THREE.Group>(null);
    
    useFrame((state) => {
      if (ringsRef.current && animationPhase === 'morphing') {
        const time = state.clock.elapsedTime;
        ringsRef.current.children.forEach((ring, index) => {
          const mesh = ring as THREE.Mesh;
          const scale = 1 + Math.sin(time * 2 + index * 0.5) * 0.3;
          mesh.scale.setScalar(scale);
          const material = mesh.material as THREE.MeshBasicMaterial;
          if (material && material.opacity !== undefined) {
            material.opacity = 0.3 + Math.sin(time * 3 + index * 0.8) * 0.2;
          }
        });
      }
    });

    return (
      <group ref={ringsRef} position={[0, 0, -1]}>
        {[...Array(3)].map((_, i) => (
          <mesh key={i} position={[0, 0, -i * 0.2]}>
            <ringGeometry args={[0.5 + i * 0.2, 0.7 + i * 0.2, 32]} />
            <meshBasicMaterial 
              color={words[currentWordIndex]?.color || "#667eea"} 
              transparent 
              opacity={0.15}
            />
          </mesh>
        ))}
      </group>
    );
  };

  // Particle system for morphing effects
  const MorphingParticles = () => {
    const particlesRef = useRef<THREE.Points>(null);
    
    useFrame((state) => {
      if (particlesRef.current) {
        const time = state.clock.elapsedTime;
        const positions = particlesRef.current.geometry.attributes.position;
        
        for (let i = 0; i < positions.count; i++) {
          const x = positions.getX(i);
          const y = positions.getY(i);
          const z = positions.getZ(i);
          
          positions.setY(i, y + Math.sin(time * 2 + i * 0.1) * 0.01);
          positions.setX(i, x + Math.cos(time * 1.5 + i * 0.2) * 0.005);
        }
        
        positions.needsUpdate = true;
        particlesRef.current.rotation.y = time * 0.1;
      }
    });

    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }

    return (
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color={words[currentWordIndex]?.color || "#667eea"}
          transparent
          opacity={animationPhase === 'morphing' ? 0.6 : 0.2}
        />
      </points>
    );
  };

  // Speech bubble background
  const SpeechBubble = () => {
    const bubbleRef = useRef<THREE.Mesh>(null);
    
    useFrame((state) => {
      if (bubbleRef.current) {
        const time = state.clock.elapsedTime;
        bubbleRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
      }
    });

    return (
      <mesh ref={bubbleRef} position={[0, 0, -3]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="white"
          transparent
          opacity={0.08}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
    );
  };

  return (
    <group ref={groupRef}>
      {/* Background elements */}
      <SpeechBubble />
      <VoiceWaveRings />
      <MorphingParticles />
      
      {/* Main word display */}
      {!showTagline && (
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
          <Text
            ref={textRef}
            position={[0, 0, 0]}
            fontSize={0.8}
            color={words[currentWordIndex]?.color || "#667eea"}
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
            maxWidth={4}
            fillOpacity={textOpacity}
          >
            {words[currentWordIndex]?.text || "Hello"}
          </Text>
        </Float>
      )}
      
      {/* Tagline reveal */}
      {showTagline && (
        <group>
          <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.2}>
            <Text
              position={[0, 0.5, 0]}
              fontSize={0.6}
              color="#667eea"
              anchorX="center"
              anchorY="middle"
              fontWeight="bold"
              maxWidth={6}
            >
              Speak. Learn. Grow.
            </Text>
          </Float>
          
          <Float speed={0.3} rotationIntensity={0.03} floatIntensity={0.1}>
            <Text
              position={[0, -0.2, 0]}
              fontSize={0.3}
              color="#764ba2"
              anchorX="center"
              anchorY="middle"
              maxWidth={8}
            >
              Voice-Based Language Learning Powered by AI
            </Text>
          </Float>
        </group>
      )}
      
      {/* Ambient lighting for the scene */}
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-5, -5, 2]} intensity={0.4} color="#667eea" />
    </group>
  );
};

export default VoiceBridgeAnimation;