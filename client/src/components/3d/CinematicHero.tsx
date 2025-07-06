import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Enhanced 3D geometric background with depth layering
function EnhancedGeometry({ mouseX, mouseY }: { mouseX: any, mouseY: any }) {
  const groupRef = useRef<THREE.Group>(null);
  const farLayerRef = useRef<THREE.Group>(null);
  const midLayerRef = useRef<THREE.Group>(null);
  const nearLayerRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      
      // Parallax effect based on mouse movement
      const mouseInfluence = 0.002;
      groupRef.current.position.x = mouseX * mouseInfluence;
      groupRef.current.position.y = -mouseY * mouseInfluence;
    }
    
    // Different rotation speeds for depth layers
    if (farLayerRef.current) {
      farLayerRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      farLayerRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
    
    if (midLayerRef.current) {
      midLayerRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      midLayerRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    
    if (nearLayerRef.current) {
      nearLayerRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      nearLayerRef.current.rotation.z = -state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Far layer - most transparent, slow movement */}
      <group ref={farLayerRef}>
        <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <mesh position={[8, 4, -12]}>
            <dodecahedronGeometry args={[1.5, 0]} />
            <meshStandardMaterial 
              color="#4f46e5" 
              transparent 
              opacity={0.03}
              wireframe
            />
          </mesh>
        </Float>
        
        <Float speed={0.6} rotationIntensity={0.2} floatIntensity={0.4}>
          <mesh position={[-8, -3, -15]}>
            <octahedronGeometry args={[2, 0]} />
            <meshStandardMaterial 
              color="#06b6d4" 
              transparent 
              opacity={0.02}
              wireframe
            />
          </mesh>
        </Float>
      </group>
      
      {/* Mid layer */}
      <group ref={midLayerRef}>
        <Float speed={1.0} rotationIntensity={0.3} floatIntensity={0.5}>
          <mesh position={[5, 2, -7]}>
            <icosahedronGeometry args={[1.2, 0]} />
            <meshStandardMaterial 
              color="#8b5cf6" 
              transparent 
              opacity={0.06}
              wireframe
            />
          </mesh>
        </Float>
        
        <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.6}>
          <mesh position={[-5, -1, -8]}>
            <tetrahedronGeometry args={[1.8, 0]} />
            <meshStandardMaterial 
              color="#ec4899" 
              transparent 
              opacity={0.05}
              wireframe
            />
          </mesh>
        </Float>
        
        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
          <mesh position={[0, 4, -9]}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial 
              color="#10b981" 
              transparent 
              opacity={0.04}
              wireframe
            />
          </mesh>
        </Float>
      </group>
      
      {/* Near layer - more visible, faster movement */}
      <group ref={nearLayerRef}>
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.7}>
          <mesh position={[3, 1, -3]}>
            <octahedronGeometry args={[0.8, 0]} />
            <meshStandardMaterial 
              color="#00ffff" 
              transparent 
              opacity={0.12}
              wireframe
            />
          </mesh>
        </Float>
        
        <Float speed={1.3} rotationIntensity={0.4} floatIntensity={0.8}>
          <mesh position={[-3, -2, -4]}>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial 
              color="#ff00ff" 
              transparent 
              opacity={0.1}
              wireframe
            />
          </mesh>
        </Float>
      </group>
    </group>
  );
}

// Enhanced dual-layer particle system
function EnhancedParticleField() {
  const starFieldRef = useRef<THREE.Points>(null);
  const gridFieldRef = useRef<THREE.Points>(null);
  const starCount = 1500;
  const gridCount = 800;
  
  useEffect(() => {
    // Star particle layer - large, slow, radial movement
    if (starFieldRef.current) {
      const starPositions = new Float32Array(starCount * 3);
      const starSizes = new Float32Array(starCount);
      
      for (let i = 0; i < starCount; i++) {
        const radius = Math.random() * 50 + 10;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        starPositions[i * 3 + 2] = radius * Math.cos(phi);
        starSizes[i] = Math.random() * 0.3 + 0.1;
      }
      
      starFieldRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      starFieldRef.current.geometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
    }
    
    // Grid particle layer - small, faster, z-axis movement
    if (gridFieldRef.current) {
      const gridPositions = new Float32Array(gridCount * 3);
      const gridOpacities = new Float32Array(gridCount);
      
      for (let i = 0; i < gridCount; i++) {
        gridPositions[i * 3] = (Math.random() - 0.5) * 30;
        gridPositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
        gridPositions[i * 3 + 2] = (Math.random() - 0.5) * 60;
        gridOpacities[i] = Math.random() * 0.8 + 0.2;
      }
      
      gridFieldRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(gridPositions, 3));
      gridFieldRef.current.geometry.setAttribute('opacity', new THREE.BufferAttribute(gridOpacities, 1));
    }
  }, []);

  useFrame((state) => {
    // Slow radial drift for stars
    if (starFieldRef.current) {
      starFieldRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      starFieldRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
    
    // Faster z-axis movement for grid particles
    if (gridFieldRef.current) {
      const positions = gridFieldRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < gridCount; i++) {
        positions[i * 3 + 2] += 0.05;
        
        // Reset particles that moved too far forward
        if (positions[i * 3 + 2] > 30) {
          positions[i * 3 + 2] = -30;
          positions[i * 3] = (Math.random() - 0.5) * 30;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
        }
      }
      
      gridFieldRef.current.geometry.attributes.position.needsUpdate = true;
      gridFieldRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <>
      {/* Star field layer */}
      <points ref={starFieldRef}>
        <bufferGeometry />
        <pointsMaterial
          color="#ffffff"
          size={0.2}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          sizeAttenuation={true}
        />
      </points>
      
      {/* Grid particle layer */}
      <points ref={gridFieldRef}>
        <bufferGeometry />
        <pointsMaterial
          color="#00ffff"
          size={0.05}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}

// Nebula fog effect with simpler implementation
function NebulaFog() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.01;
      const opacity = 0.08 + Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
      (meshRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -20]} scale={[25, 25, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        transparent
        opacity={0.08}
        color="#4f46e5"
        blending={THREE.AdditiveBlending}
      />
    </mesh>
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
  
  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(clientX - centerX);
      mouseY.set(clientY - centerY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

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
          
          <EnhancedGeometry mouseX={mouseX.get()} mouseY={mouseY.get()} />
          <EnhancedParticleField />
          <NebulaFog />
          <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
          
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
        <motion.div 
          className="flex items-center justify-center mb-8 space-x-2 md:space-x-4"
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.span
            animate={mControls}
            initial="hidden"
            variants={letterVariants}
            whileHover={{
              scale: 1.1,
              textShadow: "0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.6)",
              filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 1))"
            }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-white select-none cursor-pointer"
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
            whileHover={{
              scale: 1.1,
              textShadow: "0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.6)",
              filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 1))"
            }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-white select-none cursor-pointer"
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
            whileHover={{
              scale: 1.1,
              textShadow: "0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.6)",
              filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 1))"
            }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-white select-none cursor-pointer"
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
            whileHover={{
              scale: 1.1,
              textShadow: "0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.6)",
              filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 1))"
            }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-white select-none cursor-pointer"
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
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 25px rgba(255, 255, 255, 0.8), 0 0 50px rgba(0, 255, 255, 0.6)",
              filter: "drop-shadow(0 0 15px rgba(255, 255, 255, 0.8))"
            }}
            className="text-3xl md:text-4xl lg:text-5xl font-medium text-white/90 select-none cursor-pointer"
            style={{
              fontFamily: "'Space Grotesk', monospace",
              textShadow: "0 0 15px rgba(255, 255, 255, 0.6), 0 0 30px rgba(0, 255, 255, 0.4)",
              filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))"
            }}
          >
            labs
          </motion.span>
        </motion.div>

        {/* Tagline */}
        <motion.div
          animate={taglineControls}
          initial={{ opacity: 0, y: 20, letterSpacing: "0.5em" }}
          className="text-center"
        >
          <motion.p 
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 20px rgba(255, 255, 255, 0.6), 0 0 40px rgba(147, 51, 234, 0.8)",
              filter: "drop-shadow(0 0 15px rgba(255, 255, 255, 0.8))"
            }}
            animate={{
              textShadow: [
                "0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(147, 51, 234, 0.4)",
                "0 0 15px rgba(255, 255, 255, 0.5), 0 0 30px rgba(147, 51, 234, 0.6)",
                "0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(147, 51, 234, 0.4)"
              ]
            }}
            transition={{
              textShadow: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="text-xl md:text-2xl lg:text-3xl font-light text-white/80 italic select-none cursor-pointer"
            style={{
              fontFamily: "'Space Grotesk', monospace",
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(147, 51, 234, 0.8) 50%, rgba(59, 130, 246, 0.8) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            Beyond Imagination
          </motion.p>
        </motion.div>

        {/* Enhanced ambient glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Primary glow */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, rgba(147, 51, 234, 0.2) 30%, rgba(59, 130, 246, 0.1) 60%, transparent 100%)"
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Secondary rotating glow */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
            style={{
              background: "conic-gradient(from 0deg, rgba(0, 255, 255, 0.1), rgba(147, 51, 234, 0.15), rgba(255, 0, 255, 0.1), rgba(0, 255, 255, 0.1))"
            }}
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Pulse ring */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-cyan-400/20 rounded-full"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
        </div>
      </div>
    </div>
  );
}