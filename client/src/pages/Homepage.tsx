import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, BookOpen, MessageSquare, Users, Zap, Globe } from 'lucide-react';
import AnimatedBrain from '../components/3d/AnimatedBrain';
import FloatingCubes from '../components/3d/FloatingCubes';
import ParticleSystem from '../components/3d/ParticleSystem';
import CrystallineCore from '../components/3d/CrystallineCore';
import HolographicPortal from '../components/3d/HolographicPortal';
import GlassCard from '../components/ui/GlassCard';
import VoicePlayer from '../components/ui/VoicePlayer';
import ChatBot from '../components/ui/ChatBot';

const Homepage = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Self-paced Courses',
      description: 'Personalized learning paths with AI-powered content adaptation',
      link: '/courses',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: MessageSquare,
      title: 'Voice Learning for Kids',
      description: 'Interactive voice-based learning experiences for children',
      link: '/language-learning',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'AI Tutors',
      description: 'Intelligent tutoring systems for schools and institutions',
      link: '/ai-tutors',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Zap,
      title: 'Adaptive Testing',
      description: 'Smart test engine with gray area detection and remediation',
      link: '/test-engine',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Globe,
      title: 'Enterprise Solutions',
      description: 'Voice and chat AI agents for business applications',
      link: '/enterprise',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: `
            linear-gradient(135deg, 
              #0f0f23 0%, 
              #1a1a2e 25%, 
              #16213e 50%, 
              #1a1a2e 75%, 
              #0f0f23 100%
            ),
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)
          `
        }}
      >
        {/* Enhanced 3D Background with Depth */}
        <div className="absolute inset-0 z-0" style={{ filter: 'blur(0.5px)' }}>
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 12]} />
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
            <Suspense fallback={null}>
              <HolographicPortal position={[0, 0, 0]} scale={1.2} intensity={1.1} />
              <CrystallineCore scale={0.8} intensity={0.7} showText={false} />
              <FloatingCubes count={12} spread={25} />
              <ParticleSystem count={2000} radius={35} />
            </Suspense>
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              autoRotate 
              autoRotateSpeed={0.3}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
            <Environment preset="night" />
          </Canvas>
        </div>

        {/* Hero Content with Glassmorphism */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)', // Safari support
              borderRadius: '20px',
              padding: '2rem 1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
            className="backdrop-blur-sm" // Fallback for older browsers
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              style={{
                textShadow: '0 0 12px rgba(255, 255, 255, 0.6), 0 0 24px rgba(0, 255, 255, 0.4)',
                background: 'linear-gradient(135deg, #ffffff 0%, #00ffff 50%, #ff00ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              AI-Powered Learning
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-200 mb-8"
              style={{
                textShadow: '0 0 8px rgba(255, 255, 255, 0.3)'
              }}
            >
              Voice Agents. Intelligent Tutors. Self-Paced Courses.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div 
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }} 
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
                  style={{
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                  }}
                >
                  Explore Platform
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }} 
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white/60 text-white rounded-full font-semibold hover:bg-white/20 hover:border-white transition-all duration-200"
                  style={{
                    backdropFilter: 'blur(8px)',
                    background: 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  Book Demo
                  <Play className="ml-2 w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Revolutionize Learning
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our comprehensive AI-powered learning ecosystem designed for 
              students, educators, and enterprises.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={feature.link} className="block h-full">
                  <GlassCard hover delay={index * 0.1} className="h-full">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                      <span className="text-sm font-medium">Learn More</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Voice Demo Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Experience AI Voice Technology
            </h2>
            <p className="text-xl text-gray-300">
              Listen to our advanced AI voice synthesis and natural language processing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <VoicePlayer
              title="AI Tutor Demo"
              description="Listen to an AI tutor explaining complex concepts"
              audioSrc="/sounds/success.mp3"
            />
            <VoicePlayer
              title="Language Learning"
              description="Experience voice-based language instruction"
              audioSrc="/sounds/hit.mp3"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '1M+', label: 'Students Served' },
              { number: '500+', label: 'Educational Institutions' },
              { number: '50+', label: 'Languages Supported' },
              { number: '99.9%', label: 'Platform Uptime' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="text-center">
                  <div className="text-3xl font-bold text-white mb-2 neon-text">
                    {stat.number}
                  </div>
                  <div className="text-gray-300">{stat.label}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Education?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of educators and students already using our AI-powered platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating ChatBot */}
      <ChatBot />
    </div>
  );
};

export default Homepage;
