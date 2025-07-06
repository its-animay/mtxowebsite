import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

// Animated background geometric shapes
function AnimatedGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current && groupRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef} position={[0, 0, -5]}>
          <octahedronGeometry args={[2, 0]} />
          <meshStandardMaterial 
            color="#00ffff" 
            transparent 
            opacity={0.1}
            wireframe
          />
        </mesh>
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.7}>
        <mesh position={[4, 2, -3]}>
          <tetrahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color="#ff00ff" 
            transparent 
            opacity={0.08}
            wireframe
          />
        </mesh>
      </Float>
      
      <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[-4, -2, -4]}>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshStandardMaterial 
            color="#ffff00" 
            transparent 
            opacity={0.06}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  );
}

// Particle system for aurora effect
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 2000;
  
  useEffect(() => {
    if (pointsRef.current) {
      const positions = new Float32Array(particleCount * 3);
      
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 40;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      }
      
      pointsRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial
        color="#00ffff"
        size={0.1}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface CinematicHeroProps {
  onAnimationComplete?: () => void;
}

export default function CinematicHero({ onAnimationComplete }: CinematicHeroProps) {
  const [animationStarted, setAnimationStarted] = useState(false);
  const mControls = useAnimation();
  const tControls = useAnimation();
  const xControls = useAnimation();
  const oControls = useAnimation();
  const labsControls = useAnimation();
  const taglineControls = useAnimation();
  const auroraControls = useAnimation();

  useEffect(() => {
    const runAnimation = async () => {
      if (animationStarted) return;
      setAnimationStarted(true);

      // Aurora background pulse
      auroraControls.start({
        opacity: [0, 0.3, 0.1],
        scale: [1, 1.5, 1.2],
        transition: {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }
      });

      // Sequential letter reveals - M
      await mControls.start({
        opacity: [0, 1],
        scale: [0.3, 1.1, 1],
        rotateY: [90, 0],
        transition: {
          duration: 0.8,
          ease: "easeOut"
        }
      });

      await new Promise(resolve => setTimeout(resolve, 100));

      // T
      await tControls.start({
        opacity: [0, 1],
        scale: [0.3, 1.1, 1],
        rotateY: [90, 0],
        transition: {
          duration: 0.8,
          ease: "easeOut"
        }
      });

      await new Promise(resolve => setTimeout(resolve, 100));

      // X
      await xControls.start({
        opacity: [0, 1],
        scale: [0.3, 1.1, 1],
        rotateY: [90, 0],
        transition: {
          duration: 0.8,
          ease: "easeOut"
        }
      });

      await new Promise(resolve => setTimeout(resolve, 100));

      // O
      await oControls.start({
        opacity: [0, 1],
        scale: [0.3, 1.1, 1],
        rotateY: [90, 0],
        transition: {
          duration: 0.8,
          ease: "easeOut"
        }
      });

      await new Promise(resolve => setTimeout(resolve, 800));

      // Labs slide in
      await labsControls.start({
        opacity: [0, 1],
        x: [50, 0],
        filter: ["blur(10px)", "blur(0px)"],
        transition: {
          duration: 1,
          ease: "easeOut"
        }
      });

      await new Promise(resolve => setTimeout(resolve, 1400));

      // Tagline appear
      await taglineControls.start({
        opacity: [0, 1],
        y: [20, 0],
        letterSpacing: ["0.5em", "0.2em"],
        transition: {
          duration: 1.2,
          ease: "easeOut"
        }
      });

      if (onAnimationComplete) {
        onAnimationComplete();
      }
    };

    runAnimation();
  }, [animationStarted, mControls, tControls, xControls, oControls, labsControls, taglineControls, auroraControls, onAnimationComplete]);

  const letterVariants = {
    hidden: { opacity: 0, scale: 0.3, rotateY: 90 },
    visible: { opacity: 1, scale: 1, rotateY: 0 }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={0.5} />
          <pointLight position={[0, 0, 0]} intensity={0.8} color="#00ffff" />
          
          <AnimatedGeometry />
          <ParticleField />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.3}
            enableDamping
            dampingFactor={0.05}
          />
          <Environment preset="night" />
        </Canvas>
      </div>

      {/* Aurora Background Effect */}
      <motion.div
        animate={auroraControls}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, 
            rgba(0, 255, 255, 0.1) 0%, 
            rgba(255, 0, 255, 0.05) 30%, 
            rgba(0, 0, 255, 0.02) 60%, 
            transparent 100%)`
        }}
      />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4">
        {/* Main Title */}
        <div className="flex items-center justify-center mb-8 space-x-2 md:space-x-4">
          <motion.span
            animate={mControls}
            initial="hidden"
            variants={letterVariants}
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-white select-none"
            style={{
              fontFamily: "'Space Grotesk', monospace",
              textShadow: "0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)",
              filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))"
            }}
          >
            M
          </motion.span>
          
          <motion.span
            animate={tControls}
            initial="hidden"
            variants={letterVariants}
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-white select-none"
            style={{
              fontFamily: "'Space Grotesk', monospace",
              textShadow: "0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)",
              filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))"
            }}
          >
            T
          </motion.span>
          
          <motion.span
            animate={xControls}
            initial="hidden"
            variants={letterVariants}
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-white select-none"
            style={{
              fontFamily: "'Space Grotesk', monospace",
              textShadow: "0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)",
              filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))"
            }}
          >
            X
          </motion.span>
          
          <motion.span
            animate={oControls}
            initial="hidden"
            variants={letterVariants}
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-white select-none"
            style={{
              fontFamily: "'Space Grotesk', monospace",
              textShadow: "0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)",
              filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))"
            }}
          >
            O
          </motion.span>
          
          <motion.span
            animate={labsControls}
            initial={{ opacity: 0, x: 50 }}
            className="text-3xl md:text-4xl lg:text-5xl font-medium text-white/90 select-none"
            style={{
              fontFamily: "'Space Grotesk', monospace",
              textShadow: "0 0 15px rgba(255, 255, 255, 0.6), 0 0 30px rgba(0, 255, 255, 0.4)",
              filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))"
            }}
          >
            labs
          </motion.span>
        </div>

        {/* Tagline */}
        <motion.div
          animate={taglineControls}
          initial={{ opacity: 0, y: 20, letterSpacing: "0.5em" }}
          className="text-center"
        >
          <p 
            className="text-xl md:text-2xl lg:text-3xl font-light text-white/80 italic select-none"
            style={{
              fontFamily: "'Space Grotesk', monospace",
              textShadow: "0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(147, 51, 234, 0.4)",
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(147, 51, 234, 0.8) 50%, rgba(59, 130, 246, 0.8) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))"
            }}
          >
            Beyond Imagination
          </p>
        </motion.div>

        {/* Subtle glow effect behind text */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-cyan-400/20 via-purple-400/10 to-transparent rounded-full blur-3xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}