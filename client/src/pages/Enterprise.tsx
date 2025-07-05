import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Sphere, 
  Box, 
  Torus, 
  Text, 
  Float, 
  OrbitControls, 
  Environment,
  MeshDistortMaterial,
  Plane
} from '@react-three/drei';
import * as THREE from 'three';
import { 
  Mic, 
  Phone, 
  BarChart3, 
  Users, 
  TrendingUp, 
  MessageSquare,
  Zap,
  Shield,
  Clock,
  Target,
  Headphones,
  Bot,
  PlayCircle,
  Calendar,
  ArrowRight,
  CheckCircle,
  Star,
  Globe
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';

// 3D Holographic AI Assistant Component
const HolographicAssistant = ({ intensity = 1 }: { intensity?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <group>
        {/* Main AI Core */}
        <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial 
            color="#00d4ff" 
            transparent 
            opacity={0.6}
            distort={0.3}
            speed={2}
            roughness={0.1}
            metalness={0.9}
          />
        </Sphere>
        
        {/* Inner Energy Core */}
        <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#4f46e5" 
            transparent 
            opacity={0.4}
            emissive="#4f46e5"
            emissiveIntensity={intensity * 0.6}
          />
        </Sphere>
        
        {/* Rotating Rings */}
        <group ref={ringRef}>
          <Torus args={[2.5, 0.1, 16, 32]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial 
              color="#00ff88" 
              transparent 
              opacity={0.7}
              emissive="#00ff88"
              emissiveIntensity={0.3}
            />
          </Torus>
          <Torus args={[3, 0.08, 16, 32]} position={[0, 0, 0]} rotation={[0, Math.PI / 3, 0]}>
            <meshStandardMaterial 
              color="#ff6b6b" 
              transparent 
              opacity={0.5}
              emissive="#ff6b6b"
              emissiveIntensity={0.2}
            />
          </Torus>
        </group>
        
        {/* Voice Wave Visualizers */}
        {[...Array(8)].map((_, i) => (
          <Float key={i} speed={1.5 + i * 0.2} rotationIntensity={0.1}>
            <Box 
              args={[0.2, 0.8 + Math.sin(i) * 0.5, 0.2]} 
              position={[
                Math.sin(i * Math.PI / 4) * 4,
                Math.cos(i * Math.PI / 4) * 0.5,
                Math.sin(i * Math.PI / 6) * 2
              ]}
            >
              <meshStandardMaterial 
                color="#a78bfa" 
                transparent 
                opacity={0.8}
                emissive="#a78bfa"
                emissiveIntensity={0.3}
              />
            </Box>
          </Float>
        ))}
        
        {/* Data Particles */}
        {[...Array(12)].map((_, i) => (
          <Float key={`particle-${i}`} speed={0.8 + i * 0.1} rotationIntensity={0.2}>
            <Sphere 
              args={[0.1, 8, 8]} 
              position={[
                Math.sin(i * Math.PI / 6) * 5,
                Math.cos(i * Math.PI / 6) * 3,
                Math.sin(i * Math.PI / 4) * 3
              ]}
            >
              <meshStandardMaterial 
                color="#fbbf24" 
                transparent 
                opacity={0.6}
                emissive="#fbbf24"
                emissiveIntensity={0.4}
              />
            </Sphere>
          </Float>
        ))}
        
        {/* Enterprise Text */}
        <Text
          position={[0, -4, 0]}
          fontSize={0.8}
          color="#1f2937"
          anchorX="center"
          anchorY="middle"
        >
          Enterprise AI
        </Text>
      </group>
    </Float>
  );
};

// Animated Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: {
  icon: any;
  title: string;
  description: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ scale: 1.05 }}
  >
    <GlassCard className="p-6 text-center h-full">
      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </GlassCard>
  </motion.div>
);

// Stats Component
const StatCard = ({ value, label, delay = 0 }: {
  value: string;
  label: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay }}
    className="text-center"
  >
    <div className="text-4xl md:text-5xl font-bold text-white mb-2">{value}</div>
    <div className="text-blue-100 text-lg">{label}</div>
  </motion.div>
);

export default function Enterprise() {
  const [activeDemo, setActiveDemo] = useState<'voice' | 'chat' | null>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const features = [
    {
      icon: Headphones,
      title: "24/7 Voice Support",
      description: "Intelligent AI agents handle customer inquiries round-the-clock with natural conversation flows."
    },
    {
      icon: Bot,
      title: "Sales Automation",
      description: "Autonomous agents qualify leads, schedule meetings, and guide prospects through your sales funnel."
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track conversation metrics, sentiment analysis, and performance insights in real-time dashboards."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption, compliance-ready infrastructure, and secure data handling protocols."
    },
    {
      icon: Zap,
      title: "Instant Deployment",
      description: "Deploy AI agents in minutes with pre-built templates and seamless integrations."
    },
    {
      icon: Globe,
      title: "Multi-language Support",
      description: "Serve global customers with AI agents fluent in 40+ languages and cultural contexts."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background Elements */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/30 to-slate-900/50" />
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>

        {/* Background 3D Scene */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <pointLight position={[-10, -10, -5]} intensity={0.8} color="#00d4ff" />
            <HolographicAssistant intensity={1} />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
            <Environment preset="city" />
          </Canvas>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Redefining Customer Interactions
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                with Enterprise Voice AI
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-blue-100 mb-4 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Empower your support and sales teams with autonomous, intelligent agents that talk, learn, and close.
            </motion.p>
            
            <motion.p 
              className="text-lg text-blue-200 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Transform your customer experience with AI agents that understand context, emotion, and intent.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <PlayCircle className="mr-3 w-6 h-6" />
                Try Live Demo
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-10 py-5 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                <Calendar className="mr-3 w-6 h-6" />
                Book a Consultation
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-800 to-purple-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <StatCard value="99.5%" label="Uptime Guarantee" delay={0} />
            <StatCard value="2.3x" label="Faster Resolution" delay={0.1} />
            <StatCard value="40+" label="Languages Supported" delay={0.2} />
            <StatCard value="24/7" label="Customer Support" delay={0.3} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Enterprise-Grade AI Capabilities
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Powerful features designed to scale with your business and exceed customer expectations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-slate-800 to-blue-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Proven Results Across Industries
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              From customer support to sales automation, our AI agents deliver measurable impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard className="p-8 h-full">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                    <Headphones className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Customer Support</h3>
                </div>
                <ul className="space-y-3 text-blue-100">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    Resolve 80% of queries without human intervention
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    Reduce average response time by 60%
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    Maintain consistent service quality 24/7
                  </li>
                </ul>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard className="p-8 h-full">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Sales Automation</h3>
                </div>
                <ul className="space-y-3 text-blue-100">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    Qualify leads automatically with intelligent screening
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    Schedule meetings and follow-ups seamlessly
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    Increase conversion rates by 35% on average
                  </li>
                </ul>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of companies already using AI agents to revolutionize their customer experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-10 py-5 bg-white text-gray-800 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <PlayCircle className="mr-3 w-6 h-6" />
                Start Your Free Trial
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-10 py-5 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-gray-800 transition-all duration-300"
              >
                <ArrowRight className="mr-3 w-6 h-6" />
                Schedule Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}