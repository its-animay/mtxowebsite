import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { 
  CreditCard, 
  Shield, 
  TrendingUp, 
  Mic, 
  MessageCircle,
  Phone,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  PlayCircle
} from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';

// 3D Fintech Scene Component
function FintechScene() {
  return (
    <group>
      {/* Central AI Core */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial
            color="#00ff88"
            emissive="#004422"
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.9}
          />
        </mesh>
      </Float>

      {/* Floating Credit Cards */}
      {[...Array(6)].map((_, i) => (
        <Float key={i} speed={2 + i * 0.3} rotationIntensity={0.1}>
          <mesh
            position={[
              Math.cos(i * Math.PI * 2 / 6) * 4,
              Math.sin(i * 0.5) * 2,
              Math.sin(i * Math.PI * 2 / 6) * 4
            ]}
            rotation={[0, i * 0.5, 0]}
          >
            <boxGeometry args={[1.2, 0.8, 0.05]} />
            <meshStandardMaterial
              color="#1e293b"
              emissive="#0f172a"
              emissiveIntensity={0.2}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </Float>
      ))}

      {/* Connecting Lines */}
      {[...Array(6)].map((_, i) => (
        <mesh key={`line-${i}`} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 4, 8]} />
          <meshStandardMaterial
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* Ambient Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#00ff88" />
    </group>
  );
}

export default function Fintech() {
  const [activeAgent, setActiveAgent] = useState<'credit' | 'fraud' | 'kyc' | null>(null);

  const agents = [
    {
      id: 'credit',
      name: 'Credit Assistant',
      description: 'Helps customers with credit card limits, EMI plans, and payment schedules',
      icon: CreditCard,
      color: 'from-green-400 to-blue-500',
      features: ['Credit Limit Inquiries', 'EMI Calculations', 'Payment Scheduling', 'Balance Transfers']
    },
    {
      id: 'fraud',
      name: 'Fraud Detection',
      description: 'Instant fraud reporting and security alerts with voice verification',
      icon: Shield,
      color: 'from-red-400 to-orange-500',
      features: ['Real-time Fraud Alerts', 'Voice Verification', 'Transaction Monitoring', 'Security Assistance']
    },
    {
      id: 'kyc',
      name: 'KYC Onboarding',
      description: 'Auto-KYC voice onboarding for seamless customer verification',
      icon: Users,
      color: 'from-purple-400 to-pink-500',
      features: ['Voice Identity Verification', 'Document Processing', 'Compliance Checks', 'Instant Approvals']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background 3D Scene */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
            <FintechScene />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            <Environment preset="night" />
          </Canvas>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-transparent to-blue-900/70 z-10" />

        {/* Hero Content */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Fintech Voice AI{' '}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Revolution
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto">
              Transform financial services with intelligent voice agents that handle credit inquiries, 
              fraud detection, and seamless KYC onboarding.
            </p>
            
            {/* Voice Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-8">
              <Mic className="w-6 h-6 text-green-400" />
              <div className="flex space-x-1">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-gradient-to-t from-green-400 to-blue-400 rounded-full"
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
              <span className="text-green-400 text-sm">Voice AI Active</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full font-bold text-lg shadow-2xl"
              >
                <PlayCircle className="mr-3 w-6 h-6" />
                Try Fintech Demo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 border-2 border-green-400 text-green-400 rounded-full font-bold text-lg hover:bg-green-400 hover:text-slate-900 transition-all"
              >
                <Phone className="mr-3 w-6 h-6" />
                Schedule Integration Call
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
              Meet Your Fintech AI Agents
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Specialized voice agents trained specifically for financial services, compliance, and customer success.
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
                          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
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
              Real Fintech Use Cases
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              See how voice AI transforms customer interactions across financial services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Credit Card Support",
                description: "Customer calls about credit limit increase. Voice AI verifies identity, checks eligibility, and processes request in real-time.",
                metrics: ["95% faster resolution", "24/7 availability", "Zero wait time"]
              },
              {
                title: "Fraud Alert Response",
                description: "Suspicious transaction detected. AI calls customer immediately, verifies with voice biometrics, and takes protective action.",
                metrics: ["Instant fraud detection", "Voice verification", "Automatic card blocking"]
              },
              {
                title: "KYC Onboarding",
                description: "New customer signup through voice. AI guides through verification process, validates documents, and completes onboarding.",
                metrics: ["5-minute onboarding", "90% completion rate", "Regulatory compliant"]
              },
              {
                title: "EMI Planning",
                description: "Customer wants to convert purchase to EMI. AI calculates options, explains terms, and processes conversion instantly.",
                metrics: ["Instant calculations", "Multiple options", "Transparent pricing"]
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
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-sm text-green-300">{metric}</span>
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
              Ready to Transform Your Fintech?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join leading financial institutions already using voice AI to enhance customer experience.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full font-bold text-xl shadow-2xl"
            >
              Start Your Fintech AI Journey
              <ArrowRight className="ml-3 w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}