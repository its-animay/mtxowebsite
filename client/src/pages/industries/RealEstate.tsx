import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { 
  Home, 
  MapPin, 
  TrendingUp, 
  Mic, 
  MessageCircle,
  Phone,
  Users,
  Camera,
  CheckCircle,
  ArrowRight,
  PlayCircle,
  Building,
  DollarSign
} from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';

// 3D Real Estate Scene Component
function RealEstateScene() {
  return (
    <group>
      {/* Central Building */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 3, 6]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#f59e0b"
            emissiveIntensity={0.2}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.9}
          />
        </mesh>
        {/* Building Details */}
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[Math.cos(i * Math.PI / 3) * 1.3, 0.5 + i * 0.3, Math.sin(i * Math.PI / 3) * 1.3]}>
            <boxGeometry args={[0.3, 0.3, 0.1]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.3} />
          </mesh>
        ))}
      </Float>

      {/* Floating Property Icons */}
      {[...Array(8)].map((_, i) => (
        <Float key={i} speed={2 + i * 0.3} rotationIntensity={0.1}>
          <mesh
            position={[
              Math.cos(i * Math.PI * 2 / 8) * 4,
              Math.sin(i * 0.5) * 2,
              Math.sin(i * Math.PI * 2 / 8) * 4
            ]}
            rotation={[0, i * 0.5, 0]}
          >
            <boxGeometry args={[0.8, 1.2, 0.8]} />
            <meshStandardMaterial
              color="#1e40af"
              emissive="#1e3a8a"
              emissiveIntensity={0.2}
              metalness={0.7}
              roughness={0.3}
            />
            {/* Roof */}
            <mesh position={[0, 0.8, 0]}>
              <coneGeometry args={[0.6, 0.5, 4]} />
              <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.2} />
            </mesh>
          </mesh>
        </Float>
      ))}

      {/* Connection Network */}
      {[...Array(8)].map((_, i) => (
        <mesh key={`line-${i}`} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 4, 8]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#f59e0b"
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* Ambient Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#f59e0b" />
    </group>
  );
}

export default function RealEstate() {
  const [activeAgent, setActiveAgent] = useState<'walkthrough' | 'investment' | 'capture' | null>(null);

  const agents = [
    {
      id: 'walkthrough',
      name: 'Virtual Tour Guide',
      description: 'AI-powered property walkthroughs with detailed descriptions and feature highlights',
      icon: Camera,
      color: 'from-amber-400 to-orange-500',
      features: ['Virtual Property Tours', 'Feature Descriptions', 'Interactive Q&A', 'Scheduling Visits']
    },
    {
      id: 'investment',
      name: 'Investment Advisor',
      description: 'Voice-guided investment analysis with market insights and ROI calculations',
      icon: TrendingUp,
      color: 'from-green-400 to-blue-500',
      features: ['ROI Analysis', 'Market Trends', 'Investment Options', 'Risk Assessment']
    },
    {
      id: 'capture',
      name: 'Lead Capture Bot',
      description: 'Auto-capture buyer interest through voice conversations on property listings',
      icon: Users,
      color: 'from-purple-400 to-pink-500',
      features: ['Interest Capture', 'Lead Qualification', 'Follow-up Scheduling', 'CRM Integration']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-amber-900/20 to-slate-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background 3D Scene */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
            <RealEstateScene />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            <Environment preset="sunset" />
          </Canvas>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-transparent to-amber-900/50 z-10" />

        {/* Hero Content */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Real Estate Voice AI{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Revolution
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto">
              Transform property sales with intelligent voice agents for virtual tours, 
              investment guidance, and automated lead capture.
            </p>
            
            {/* Property Value Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-8">
              <Building className="w-6 h-6 text-amber-400" />
              <div className="flex space-x-1">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-gradient-to-t from-amber-400 to-orange-400 rounded-full"
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
              <span className="text-amber-400 text-sm">Property AI Active</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold text-lg shadow-2xl"
              >
                <PlayCircle className="mr-3 w-6 h-6" />
                Try Property Demo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 border-2 border-amber-400 text-amber-400 rounded-full font-bold text-lg hover:bg-amber-400 hover:text-slate-900 transition-all"
              >
                <DollarSign className="mr-3 w-6 h-6" />
                Investment Calculator
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Meet Your Real Estate AI Agents
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Specialized voice agents designed to enhance property sales and customer engagement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                onMouseEnter={() => setActiveAgent(agent.id as any)}
                onMouseLeave={() => setActiveAgent(null)}
              >
                <GlassCard 
                  className={`relative p-8 h-full transition-all duration-300 ${
                    activeAgent === agent.id ? 'scale-105 shadow-2xl' : ''
                  }`}
                  hover
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${agent.color} opacity-0 ${
                    activeAgent === agent.id ? 'opacity-10' : ''
                  } rounded-2xl transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center w-16 h-16 bg-slate-800 rounded-full mb-6">
                      <agent.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4">{agent.name}</h3>
                    <p className="text-blue-100 mb-6 leading-relaxed">{agent.description}</p>
                    
                    <div className="space-y-3">
                      {agent.features.map((feature, i) => (
                        <div key={i} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                          <span className="text-sm text-blue-100">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <button className="w-full mt-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition-colors">
                      Learn More
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Real Estate Use Cases
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              See how voice AI transforms property sales and customer experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Virtual Property Tours",
                description: "Prospect browsing online listing. Voice AI provides interactive walkthrough, highlights features, and answers questions in real-time.",
                metrics: ["360° voice guidance", "Interactive Q&A", "Feature highlights"]
              },
              {
                title: "Investment Analysis",
                description: "Investor seeking opportunities. AI analyzes market data, calculates ROI, and provides personalized investment recommendations.",
                metrics: ["Market analysis", "ROI calculations", "Risk assessment"]
              },
              {
                title: "Lead Qualification",
                description: "Website visitor shows interest. Voice AI engages, qualifies budget and timeline, and schedules viewing appointments.",
                metrics: ["Auto qualification", "Budget assessment", "Appointment booking"]
              },
              {
                title: "Property Comparisons",
                description: "Buyer comparing options. AI provides detailed comparisons, market insights, and personalized recommendations based on preferences.",
                metrics: ["Side-by-side analysis", "Market insights", "Personalized advice"]
              }
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <GlassCard className="p-8 h-full">
                  <h3 className="text-2xl font-bold text-white mb-4">{useCase.title}</h3>
                  <p className="text-blue-100 mb-6 leading-relaxed">{useCase.description}</p>
                  
                  <div className="space-y-2">
                    {useCase.metrics.map((metric, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Home className="w-4 h-4 text-amber-400" />
                        <span className="text-sm text-amber-300">{metric}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Real Estate?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join real estate professionals already using voice AI to increase sales and improve customer experience.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold text-xl shadow-2xl"
            >
              Start Your Real Estate AI Journey
              <ArrowRight className="ml-3 w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}