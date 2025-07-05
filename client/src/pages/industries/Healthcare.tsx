import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { 
  Heart, 
  Shield, 
  Calendar, 
  Mic, 
  MessageCircle,
  Phone,
  Users,
  FileText,
  CheckCircle,
  ArrowRight,
  PlayCircle,
  Activity,
  Stethoscope
} from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';

// 3D Healthcare Scene Component
function HealthcareScene() {
  return (
    <group>
      {/* Central Medical Cross */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial
            color="#ff4444"
            emissive="#441111"
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.9}
          />
        </mesh>
        {/* Medical Cross */}
        <mesh position={[0, 0, 1.6]}>
          <boxGeometry args={[0.8, 2.4, 0.2]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[0, 0, 1.6]}>
          <boxGeometry args={[2.4, 0.8, 0.2]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
        </mesh>
      </Float>

      {/* Floating Medical Icons */}
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
            <cylinderGeometry args={[0.3, 0.3, 1.5, 16]} />
            <meshStandardMaterial
              color="#1e40af"
              emissive="#1e3a8a"
              emissiveIntensity={0.2}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        </Float>
      ))}

      {/* Pulse Rings */}
      {[...Array(3)].map((_, i) => (
        <mesh key={`ring-${i}`} position={[0, 0, 0]} rotation={[Math.PI/2, 0, 0]}>
          <torusGeometry args={[3 + i * 2, 0.1, 16, 100]} />
          <meshStandardMaterial
            color="#ff4444"
            emissive="#ff4444"
            emissiveIntensity={0.5}
            transparent
            opacity={0.3 - i * 0.1}
          />
        </mesh>
      ))}

      {/* Ambient Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#ff4444" />
    </group>
  );
}

export default function Healthcare() {
  const [activeAgent, setActiveAgent] = useState<'appointment' | 'diagnosis' | 'lab' | null>(null);

  const agents = [
    {
      id: 'appointment',
      name: 'Appointment Assistant',
      description: 'HIPAA-compliant scheduling with intelligent calendar management and patient reminders',
      icon: Calendar,
      color: 'from-blue-400 to-cyan-500',
      features: ['Smart Scheduling', 'Automated Reminders', 'Insurance Verification', 'HIPAA Compliant']
    },
    {
      id: 'diagnosis',
      name: 'Symptom Analyzer',
      description: 'Pre-diagnosis support with medical-grade voice recognition and triage assistance',
      icon: Stethoscope,
      color: 'from-red-400 to-pink-500',
      features: ['Symptom Assessment', 'Triage Support', 'Medical History', 'Emergency Detection']
    },
    {
      id: 'lab',
      name: 'Lab Report Helper',
      description: 'Voice-powered lab result explanations and follow-up care coordination',
      icon: FileText,
      color: 'from-green-400 to-blue-500',
      features: ['Result Explanations', 'Follow-up Scheduling', 'Treatment Plans', 'Doctor Consultation']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background 3D Scene */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
            <HealthcareScene />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            <Environment preset="night" />
          </Canvas>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-transparent to-red-900/50 z-10" />

        {/* Hero Content */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Healthcare Voice AI{' '}
              <span className="bg-gradient-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">
                Revolution
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto">
              Transform patient care with HIPAA-compliant voice agents for scheduling, 
              symptom analysis, and lab report assistance.
            </p>
            
            {/* Medical Pulse Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-8">
              <Activity className="w-6 h-6 text-red-400" />
              <div className="flex space-x-1">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-gradient-to-t from-red-400 to-blue-400 rounded-full"
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
              <span className="text-red-400 text-sm">Medical AI Active</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-500 to-blue-600 text-white rounded-full font-bold text-lg shadow-2xl"
              >
                <PlayCircle className="mr-3 w-6 h-6" />
                Try Healthcare Demo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 border-2 border-red-400 text-red-400 rounded-full font-bold text-lg hover:bg-red-400 hover:text-slate-900 transition-all"
              >
                <Shield className="mr-3 w-6 h-6" />
                HIPAA Compliance Info
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
              Meet Your Healthcare AI Agents
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              HIPAA-compliant voice agents designed specifically for healthcare providers and patient care.
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
                          <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
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
              Real Healthcare Use Cases
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              See how voice AI transforms patient care and healthcare operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Appointment Scheduling",
                description: "Patient calls to book appointment. Voice AI checks availability, verifies insurance, and confirms booking with automated reminders.",
                metrics: ["90% faster booking", "HIPAA compliant", "24/7 availability"]
              },
              {
                title: "Symptom Triage",
                description: "Patient describes symptoms via voice. AI performs initial assessment, determines urgency, and routes to appropriate care level.",
                metrics: ["Instant triage", "Medical accuracy", "Emergency detection"]
              },
              {
                title: "Lab Result Delivery",
                description: "AI calls patients with lab results, explains findings in simple terms, and schedules follow-up consultations when needed.",
                metrics: ["Clear explanations", "Timely delivery", "Follow-up coordination"]
              },
              {
                title: "Medication Reminders",
                description: "Voice AI provides personalized medication reminders, tracks adherence, and alerts healthcare providers of missed doses.",
                metrics: ["Better adherence", "Automated tracking", "Provider alerts"]
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
                        <Heart className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-red-300">{metric}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HIPAA Compliance Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              HIPAA-Compliant by Design
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Built with healthcare security and compliance at its core.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: "Data Encryption", desc: "End-to-end encryption for all patient data" },
              { icon: FileText, title: "Audit Trails", desc: "Complete logging of all interactions" },
              { icon: Users, title: "Access Controls", desc: "Role-based permissions and authentication" },
              { icon: CheckCircle, title: "Compliance", desc: "Full HIPAA and HITECH compliance" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="p-6 text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-red-500/20 rounded-full mb-4 mx-auto">
                    <feature.icon className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-blue-100">{feature.desc}</p>
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
              Ready to Transform Healthcare?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join healthcare providers already using voice AI to improve patient care and operational efficiency.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-red-500 to-blue-600 text-white rounded-full font-bold text-xl shadow-2xl"
            >
              Start Your Healthcare AI Journey
              <ArrowRight className="ml-3 w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}