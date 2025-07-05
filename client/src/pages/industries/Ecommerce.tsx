import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { 
  ShoppingCart, 
  Package, 
  Star, 
  Mic, 
  MessageCircle,
  Phone,
  Users,
  CreditCard,
  CheckCircle,
  ArrowRight,
  PlayCircle,
  ShoppingBag,
  Truck
} from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';

// 3D E-commerce Scene Component
function EcommerceScene() {
  return (
    <group>
      {/* Central Shopping Cart */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#4c1d95"
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.9}
          />
        </mesh>
        {/* Shopping Cart Icon */}
        <mesh position={[0, 0, 1.6]}>
          <boxGeometry args={[1.2, 0.8, 0.2]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.3} />
        </mesh>
      </Float>

      {/* Floating Product Boxes */}
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
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#0891b2"
              emissiveIntensity={0.2}
              metalness={0.7}
              roughness={0.3}
            />
            {/* Package Label */}
            <mesh position={[0, 0, 0.41]}>
              <planeGeometry args={[0.6, 0.2]} />
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.1} />
            </mesh>
          </mesh>
        </Float>
      ))}

      {/* Purchase Flow Lines */}
      {[...Array(8)].map((_, i) => (
        <mesh key={`line-${i}`} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 4, 8]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* Ambient Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#8b5cf6" />
    </group>
  );
}

export default function Ecommerce() {
  const [activeAgent, setActiveAgent] = useState<'concierge' | 'tracking' | 'recommendation' | null>(null);

  const agents = [
    {
      id: 'concierge',
      name: 'VIP Shopping Concierge',
      description: 'Personalized AI concierge for high-value customers with voice-guided shopping experience',
      icon: ShoppingBag,
      color: 'from-purple-400 to-pink-500',
      features: ['Personal Shopping', 'VIP Support', 'Exclusive Access', 'Custom Recommendations']
    },
    {
      id: 'tracking',
      name: 'Order Assistant',
      description: 'Voice-powered order tracking with proactive updates and delivery coordination',
      icon: Truck,
      color: 'from-blue-400 to-cyan-500',
      features: ['Real-time Tracking', 'Delivery Updates', 'Issue Resolution', 'Return Processing']
    },
    {
      id: 'recommendation',
      name: 'Smart Recommender',
      description: 'AI-powered product recommendations based on voice preferences and purchase history',
      icon: Star,
      color: 'from-green-400 to-blue-500',
      features: ['Personalized Suggestions', 'Voice Preferences', 'Trend Analysis', 'Cross-selling']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background 3D Scene */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
            <EcommerceScene />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            <Environment preset="night" />
          </Canvas>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-transparent to-purple-900/50 z-10" />

        {/* Hero Content */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              E-commerce Voice AI{' '}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Revolution
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto">
              Transform online shopping with intelligent voice agents for VIP concierge service, 
              order tracking, and personalized recommendations.
            </p>
            
            {/* Shopping Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-8">
              <ShoppingCart className="w-6 h-6 text-purple-400" />
              <div className="flex space-x-1">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-gradient-to-t from-purple-400 to-cyan-400 rounded-full"
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
              <span className="text-purple-400 text-sm">Shopping AI Active</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-600 text-white rounded-full font-bold text-lg shadow-2xl"
              >
                <PlayCircle className="mr-3 w-6 h-6" />
                Try Shopping Demo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 border-2 border-purple-400 text-purple-400 rounded-full font-bold text-lg hover:bg-purple-400 hover:text-slate-900 transition-all"
              >
                <CreditCard className="mr-3 w-6 h-6" />
                VIP Concierge Service
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
              Meet Your E-commerce AI Agents
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Specialized voice agents designed to enhance online shopping and customer satisfaction.
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
                          <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
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
              E-commerce Use Cases
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              See how voice AI transforms online shopping and customer service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "VIP Shopping Experience",
                description: "High-value customer browses luxury items. Voice AI provides personalized concierge service, exclusive recommendations, and priority support.",
                metrics: ["Personalized service", "Exclusive access", "Priority support"]
              },
              {
                title: "Voice Order Tracking",
                description: "Customer inquires about order status. AI provides real-time updates, delivery estimates, and proactive issue resolution.",
                metrics: ["Real-time updates", "Proactive alerts", "Issue resolution"]
              },
              {
                title: "Smart Recommendations",
                description: "Shopper looking for products. Voice AI analyzes preferences, suggests items, and provides detailed product information.",
                metrics: ["Smart suggestions", "Voice preferences", "Detailed info"]
              },
              {
                title: "Return Processing",
                description: "Customer wants to return item. AI guides through return process, generates labels, and schedules pickup.",
                metrics: ["Easy returns", "Auto labels", "Pickup scheduling"]
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
                        <Package className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-purple-300">{metric}</span>
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
              Ready to Transform E-commerce?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join online retailers already using voice AI to increase sales and enhance customer experience.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-purple-500 to-cyan-600 text-white rounded-full font-bold text-xl shadow-2xl"
            >
              Start Your E-commerce AI Journey
              <ArrowRight className="ml-3 w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}