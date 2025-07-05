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

// Industry Use Case Panel Component
const IndustryPanel = ({ 
  position, 
  rotation = [0, 0, 0], 
  industry, 
  color = "#00d4ff" 
}: { 
  position: [number, number, number]; 
  rotation?: [number, number, number];
  industry: string;
  color?: string;
}) => {
  const panelRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (panelRef.current) {
      panelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position} rotation={rotation}>
        {/* Panel Background */}
        <Box ref={panelRef} args={[2, 1.2, 0.1]}>
          <meshStandardMaterial 
            color={color} 
            transparent 
            opacity={0.8}
            emissive={color}
            emissiveIntensity={0.2}
            roughness={0.1}
            metalness={0.8}
          />
        </Box>
        
        {/* Panel Glow */}
        <Box args={[2.2, 1.4, 0.05]} position={[0, 0, -0.1]}>
          <meshStandardMaterial 
            color={color} 
            transparent 
            opacity={0.3}
            emissive={color}
            emissiveIntensity={0.4}
          />
        </Box>
        
        {/* Industry Label */}
        <Text
          position={[0, -0.8, 0.1]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {industry}
        </Text>
      </group>
    </Float>
  );
};

// Central AI Avatar Component
const CentralAIAvatar = ({ intensity = 1 }: { intensity?: number }) => {
  const avatarRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (avatarRef.current) {
      avatarRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      coreRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group>
      {/* Central AI Core */}
      <Sphere ref={avatarRef} args={[1.2, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial 
          color="#00d4ff" 
          transparent 
          opacity={0.7}
          distort={0.4}
          speed={3}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
      
      {/* Inner Pulsing Core */}
      <Sphere ref={coreRef} args={[0.8, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#4f46e5" 
          transparent 
          opacity={0.5}
          emissive="#4f46e5"
          emissiveIntensity={intensity * 0.8}
        />
      </Sphere>
      
      {/* Voice Rings */}
      {[...Array(3)].map((_, i) => (
        <Torus 
          key={i}
          args={[2 + i * 0.5, 0.05, 16, 32]} 
          position={[0, 0, 0]} 
          rotation={[Math.PI / 2, 0, i * Math.PI / 3]}
        >
          <meshStandardMaterial 
            color="#00ff88" 
            transparent 
            opacity={0.6 - i * 0.1}
            emissive="#00ff88"
            emissiveIntensity={0.4}
          />
        </Torus>
      ))}
    </group>
  );
};

// Complete Enterprise AI Scene
const EnterpriseAIScene = ({ intensity = 1 }: { intensity?: number }) => {
  const sceneRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (sceneRef.current) {
      sceneRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const industries = [
    { name: "Fintech", position: [4, 2, 1], color: "#10b981" },
    { name: "EdTech", position: [-4, 1, 2], color: "#8b5cf6" },
    { name: "Healthcare", position: [3, -2, -1], color: "#ef4444" },
    { name: "Real Estate", position: [-3, -1, -2], color: "#f59e0b" },
    { name: "E-commerce", position: [0, 3, 3], color: "#06b6d4" },
  ];

  return (
    <group ref={sceneRef}>
      {/* Central AI Avatar */}
      <CentralAIAvatar intensity={intensity} />
      
      {/* Industry Panels */}
      {industries.map((industry, index) => (
        <IndustryPanel
          key={industry.name}
          position={industry.position as [number, number, number]}
          rotation={[0, index * Math.PI / 3, 0]}
          industry={industry.name}
          color={industry.color}
        />
      ))}
      
      {/* Connecting Energy Lines */}
      {industries.map((_, index) => (
        <Float key={`line-${index}`} speed={1} rotationIntensity={0.1}>
          <Box 
            args={[0.02, 3, 0.02]} 
            position={[
              Math.sin(index * Math.PI / 3) * 2,
              0,
              Math.cos(index * Math.PI / 3) * 2
            ]}
            rotation={[0, index * Math.PI / 3, 0]}
          >
            <meshStandardMaterial 
              color="#00d4ff" 
              transparent 
              opacity={0.6}
              emissive="#00d4ff"
              emissiveIntensity={0.5}
            />
          </Box>
        </Float>
      ))}
      
      {/* Ambient Particles */}
      {[...Array(20)].map((_, i) => (
        <Float key={`ambient-${i}`} speed={0.5 + i * 0.1} rotationIntensity={0.1}>
          <Sphere 
            args={[0.05, 8, 8]} 
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 6,
              (Math.random() - 0.5) * 8
            ]}
          >
            <meshStandardMaterial 
              color="#ffffff" 
              transparent 
              opacity={0.4}
              emissive="#ffffff"
              emissiveIntensity={0.3}
            />
          </Sphere>
        </Float>
      ))}
    </group>
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

  const industryFeatures = [
    {
      icon: Shield,
      title: "Fintech Solutions",
      description: "Voice agents assist with credit card limits, EMI plans, fraud reporting, and auto-KYC voice onboarding for seamless financial services."
    },
    {
      icon: Bot,
      title: "EdTech Integration", 
      description: "Voice tutors guide students through MCQs, explain complex concepts, and provide conversational doubt resolution during lectures."
    },
    {
      icon: Headphones,
      title: "Healthcare Support",
      description: "HIPAA-compliant voice agents schedule appointments, pre-diagnose symptoms, and handle lab report queries with medical precision."
    },
    {
      icon: Globe,
      title: "Real Estate Automation",
      description: "Voice agents provide property walkthroughs, investment options, and auto-capture buyer interest via voice chat on listings."
    },
    {
      icon: BarChart3,
      title: "E-commerce Intelligence",
      description: "AI concierge for high-value shoppers with voice order tracking, return processing, and intelligent product recommendations."
    },
    {
      icon: Zap,
      title: "Enterprise Integration",
      description: "Seamless CRM, ERP, and support stack integration with voice-powered AI that speaks fluently and understands business nuance."
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
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-purple-900/80" />
          
          {/* Text Background for better readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent" />
          
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
        <div className="absolute inset-0 z-0 opacity-60">
          <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <pointLight position={[-10, -10, -5]} intensity={0.8} color="#00d4ff" />
            <EnterpriseAIScene intensity={0.8} />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
            <Environment preset="city" />
          </Canvas>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center max-w-6xl mx-auto px-6 py-12">
          {/* Content Background */}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm rounded-3xl border border-white/10 -mx-4 -my-4" />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="relative z-30"
          >
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Let Your AI Agents Do the{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Talking — And Selling
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-blue-100 mb-4 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Deploy voice-driven AI agents tailored for fintech, edtech, healthcare, and more — automating support, driving sales.
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
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(6, 182, 212, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <PlayCircle className="mr-3 w-6 h-6" />
                Try a Voice Demo
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-10 py-5 border-2 border-cyan-400 text-cyan-400 rounded-full font-bold text-lg hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300"
              >
                <Target className="mr-3 w-6 h-6" />
                See Industry Use Cases
              </motion.button>
            </motion.div>

            {/* Voice Waveform Indicator */}
            <motion.div 
              className="flex items-center justify-center space-x-2 py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <Mic className="w-6 h-6 text-cyan-400" />
              <div className="flex space-x-1">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-gradient-to-t from-blue-400 to-cyan-400 rounded-full"
                    style={{ height: `${12 + Math.sin(i * 0.5) * 8}px` }}
                    animate={{
                      height: [
                        `${12 + Math.sin(i * 0.5) * 8}px`,
                        `${20 + Math.sin(i * 0.8) * 12}px`,
                        `${12 + Math.sin(i * 0.5) * 8}px`
                      ]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </div>
              <span className="text-cyan-400 text-sm">Voice AI Active</span>
            </motion.div>

            {/* Industry Marquee */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="pt-6"
            >
              <p className="text-blue-200 text-sm mb-4 text-center">Trusted across industries:</p>
              <div className="flex flex-wrap gap-4 justify-center">
                {['Fintech', 'EdTech', 'Healthcare', 'Real Estate', 'E-commerce'].map((industry, index) => (
                  <motion.span
                    key={industry}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white border border-white/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                  >
                    {industry}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Industry Cards Section */}
      <section className="py-16 px-6 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Industry-Specific AI Solutions
            </h2>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">
              Each industry gets tailored AI agents that understand specific needs and deliver measurable results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Fintech",
                description: "Credit card limits, EMI plans, fraud reporting, and auto-KYC voice onboarding",
                icon: "💳",
                color: "from-green-400 to-blue-500"
              },
              {
                title: "EdTech", 
                description: "Voice tutors for MCQs, concept explanations, and conversational doubt resolution",
                icon: "🎓",
                color: "from-purple-400 to-pink-500"
              },
              {
                title: "Healthcare",
                description: "HIPAA-compliant appointment booking, symptom diagnosis, and lab report queries",
                icon: "🏥",
                color: "from-red-400 to-orange-500"
              },
              {
                title: "Real Estate",
                description: "Property walkthroughs, investment options, and voice-powered buyer interest capture",
                icon: "🏡",
                color: "from-yellow-400 to-green-500"
              },
              {
                title: "E-commerce",
                description: "Voice order tracking, AI concierge for VIP shoppers, and intelligent recommendations",
                icon: "🛒",
                color: "from-cyan-400 to-blue-500"
              },
              {
                title: "Enterprise",
                description: "CRM integration, voice-powered support, and business process automation",
                icon: "🏢",
                color: "from-indigo-400 to-purple-500"
              }
            ].map((industry, index) => (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative"
              >
                <div className="relative p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{industry.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{industry.title}</h3>
                    <p className="text-blue-100 text-sm leading-relaxed">{industry.description}</p>
                  </div>
                  
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
              Industry-Specific Voice AI Solutions
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Tailored AI agents that understand your industry's unique needs and deliver measurable business impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industryFeatures.map((feature, index) => (
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