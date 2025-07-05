import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { 
  BookOpen, 
  Brain, 
  MessageSquare, 
  Mic, 
  MessageCircle,
  Phone,
  Users,
  CheckSquare,
  CheckCircle,
  ArrowRight,
  PlayCircle,
  GraduationCap,
  Target
} from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';

// 3D EdTech Scene Component
function EdTechScene() {
  return (
    <group>
      {/* Central Brain/Book Hybrid */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#1e40af"
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.9}
          />
        </mesh>
        {/* Book Pages */}
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[0, 0, 1.6]} rotation={[0, i * Math.PI / 3, 0]}>
            <planeGeometry args={[1.5, 2]} />
            <meshStandardMaterial 
              color="#ffffff" 
              emissive="#ffffff" 
              emissiveIntensity={0.1}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </Float>

      {/* Floating Educational Elements */}
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
            <octahedronGeometry args={[0.6]} />
            <meshStandardMaterial
              color="#8b5cf6"
              emissive="#7c3aed"
              emissiveIntensity={0.2}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        </Float>
      ))}

      {/* Knowledge Flow Lines */}
      {[...Array(8)].map((_, i) => (
        <mesh key={`line-${i}`} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 4, 8]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={0.5}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}

      {/* Ambient Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#3b82f6" />
    </group>
  );
}

export default function EdTech() {
  const [activeAgent, setActiveAgent] = useState<'tutor' | 'mcq' | 'doubt' | null>(null);

  const agents = [
    {
      id: 'tutor',
      name: 'Voice Tutor',
      description: 'Interactive AI tutor that guides students through lessons with voice explanations',
      icon: GraduationCap,
      color: 'from-blue-400 to-purple-500',
      features: ['Personalized Lessons', 'Voice Explanations', 'Progress Tracking', 'Adaptive Learning']
    },
    {
      id: 'mcq',
      name: 'MCQ Assistant',
      description: 'Voice-guided multiple choice questions with instant feedback and explanations',
      icon: CheckSquare,
      color: 'from-purple-400 to-pink-500',
      features: ['Voice Questions', 'Instant Feedback', 'Explanation Mode', 'Performance Analytics']
    },
    {
      id: 'doubt',
      name: 'Doubt Resolver',
      description: 'Conversational AI for real-time doubt resolution during lectures and study sessions',
      icon: MessageSquare,
      color: 'from-green-400 to-blue-500',
      features: ['Real-time Q&A', 'Concept Clarification', 'Live Support', 'Study Assistance']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background 3D Scene */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
            <EdTechScene />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            <Environment preset="night" />
          </Canvas>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-transparent to-blue-900/50 z-10" />

        {/* Hero Content */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              EdTech Voice AI{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Revolution
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto">
              Transform education with intelligent voice tutors for interactive lessons, 
              MCQ guidance, and real-time doubt resolution.
            </p>
            
            {/* Learning Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-8">
              <Brain className="w-6 h-6 text-blue-400" />
              <div className="flex space-x-1">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-gradient-to-t from-blue-400 to-purple-400 rounded-full"
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
              <span className="text-blue-400 text-sm">Learning AI Active</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-bold text-lg shadow-2xl"
              >
                <PlayCircle className="mr-3 w-6 h-6" />
                Try EdTech Demo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 border-2 border-blue-400 text-blue-400 rounded-full font-bold text-lg hover:bg-blue-400 hover:text-slate-900 transition-all"
              >
                <Target className="mr-3 w-6 h-6" />
                Curriculum Integration
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
              Meet Your EdTech AI Agents
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Specialized voice agents designed to enhance learning and educational outcomes.
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
                          <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
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
              EdTech Use Cases
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              See how voice AI transforms learning and educational delivery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Interactive Voice Lessons",
                description: "Student begins lesson. Voice AI provides step-by-step guidance, asks comprehension questions, and adapts to learning pace.",
                metrics: ["Adaptive pacing", "Voice interaction", "Real-time feedback"]
              },
              {
                title: "MCQ Practice Sessions",
                description: "Voice AI reads questions aloud, accepts verbal answers, provides instant feedback, and explains correct solutions.",
                metrics: ["Voice questions", "Verbal answers", "Instant explanations"]
              },
              {
                title: "Live Doubt Resolution",
                description: "During lecture, student asks question via voice. AI provides immediate clarification without disrupting class flow.",
                metrics: ["Real-time support", "Non-disruptive", "Instant clarification"]
              },
              {
                title: "Personalized Study Plans",
                description: "AI analyzes student performance, creates voice-guided study schedules, and provides motivational coaching.",
                metrics: ["Personalized plans", "Voice coaching", "Progress tracking"]
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
                        <BookOpen className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-300">{metric}</span>
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
              Ready to Transform Education?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join educational institutions already using voice AI to enhance learning outcomes and student engagement.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-bold text-xl shadow-2xl"
            >
              Start Your EdTech AI Journey
              <ArrowRight className="ml-3 w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}