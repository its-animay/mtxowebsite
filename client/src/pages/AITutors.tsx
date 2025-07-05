import { useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Float, Text, Sphere, Box } from '@react-three/drei';
import { 
  Upload, 
  Brain, 
  Users, 
  MessageCircle, 
  BarChart3, 
  Mic, 
  BookOpen, 
  Settings, 
  Shield, 
  Clock,
  PhoneCall,
  Rocket,
  Volume2,
  GraduationCap,
  Target,
  TrendingUp
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import VoicePlayer from '../components/ui/VoicePlayer';
import ChatBot from '../components/ui/ChatBot';

// 3D AI Orb Component for Hero Section
const AIOrb = ({ intensity = 1 }: { intensity?: number }) => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <group>
        {/* Main AI Orb */}
        <Sphere args={[2, 64, 64]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#4f46e5" 
            transparent 
            opacity={0.7}
            emissive="#3b82f6"
            emissiveIntensity={intensity * 0.3}
            roughness={0.1}
            metalness={0.9}
          />
        </Sphere>
        
        {/* Outer Ring */}
        <group rotation={[0, 0, Math.PI / 4]}>
          <Sphere args={[2.5, 32, 32]} position={[0, 0, 0]}>
            <meshStandardMaterial 
              color="#06b6d4" 
              transparent 
              opacity={0.2}
              wireframe
            />
          </Sphere>
        </group>
        
        {/* Floating Books */}
        {[...Array(8)].map((_, i) => (
          <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.3}>
            <Box 
              args={[0.3, 0.4, 0.1]} 
              position={[
                Math.sin(i * Math.PI / 4) * 4,
                Math.cos(i * Math.PI / 4) * 2,
                Math.sin(i * Math.PI / 3) * 3
              ]}
            >
              <meshStandardMaterial color="#f59e0b" />
            </Box>
          </Float>
        ))}
        
        {/* School Text */}
        <Text
          position={[0, -3.5, 0]}
          fontSize={0.8}
          color="#1f2937"
          anchorX="center"
          anchorY="middle"
        >
          Your School
        </Text>
      </group>
    </Float>
  );
};

// Animated Step Component
const AnimatedStep = ({ step, title, description, icon: Icon, delay = 0 }: {
  step: number;
  title: string;
  description: string;
  icon: any;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="relative"
  >
    <GlassCard className="p-8 text-center hover:scale-105 transition-transform duration-300">
      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
        {step}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </GlassCard>
  </motion.div>
);

// Personalization Card Component
const PersonalizationCard = ({ title, description, icon: Icon, color }: {
  title: string;
  description: string;
  icon: any;
  color: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -5 }}
    className="relative group"
  >
    <GlassCard className="p-6 h-full">
      <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </GlassCard>
  </motion.div>
);

// Value Proposition Card
const ValueCard = ({ icon: Icon, title, description }: {
  icon: any;
  title: string;
  description: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="group"
  >
    <GlassCard className="p-6 text-center">
      <motion.div
        animate={{ 
          boxShadow: [
            "0 0 20px rgba(59, 130, 246, 0.3)",
            "0 0 30px rgba(59, 130, 246, 0.6)",
            "0 0 20px rgba(59, 130, 246, 0.3)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <Icon className="w-8 h-8 text-white" />
      </motion.div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </GlassCard>
  </motion.div>
);

export default function AITutors() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeDemo, setActiveDemo] = useState('voice');

  const steps = [
    {
      step: 1,
      title: "Upload Your Content",
      description: "Upload PDFs, documents, syllabi, and teaching materials. Our AI processes and understands your curriculum.",
      icon: Upload
    },
    {
      step: 2,
      title: "AI Auto-Learning",
      description: "Advanced AI automatically learns and organizes topics, creating structured knowledge bases for your subjects.",
      icon: Brain
    },
    {
      step: 3,
      title: "Choose Tutor Personality",
      description: "Select the perfect teaching style, tone, and personality that matches your school's culture and values.",
      icon: Users
    },
    {
      step: 4,
      title: "Voice & Chat Ready",
      description: "Students can ask questions through voice or chat. AI responds instantly with personalized explanations.",
      icon: MessageCircle
    },
    {
      step: 5,
      title: "Analytics & Insights",
      description: "Get detailed insights on student performance, common questions, and areas that need attention.",
      icon: BarChart3
    }
  ];

  const personalizationFeatures = [
    {
      title: "Custom AI Persona",
      description: "Create branded tutors like 'Mrs. Nair - Class 10 History Tutor' with unique personalities.",
      icon: GraduationCap,
      color: "bg-gradient-to-r from-pink-500 to-rose-600"
    },
    {
      title: "Voice & Accent",
      description: "Choose from multiple voice tones, accents, and speaking styles to match your region.",
      icon: Volume2,
      color: "bg-gradient-to-r from-blue-500 to-cyan-600"
    },
    {
      title: "Curriculum Tagging",
      description: "Support for CBSE, ICSE, IB, and custom curriculum frameworks with proper tagging.",
      icon: BookOpen,
      color: "bg-gradient-to-r from-green-500 to-emerald-600"
    },
    {
      title: "School Branding",
      description: "Integrate your school's logo, colors, and brand voice into the AI tutor experience.",
      icon: Settings,
      color: "bg-gradient-to-r from-purple-500 to-indigo-600"
    }
  ];

  const valuePropositions = [
    {
      icon: Clock,
      title: "24/7 AI Support",
      description: "Always available tutoring that never sleeps, helping students learn at their own pace."
    },
    {
      icon: Volume2,
      title: "Voice-First Learning",
      description: "Natural conversation-based learning with emotion-aware responses and interactive dialogue."
    },
    {
      icon: Target,
      title: "LMS Integration",
      description: "Seamlessly integrates with Google Classroom, Moodle, Canvas, and other learning management systems."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Institution-specific data sandbox with enterprise-grade security and privacy protection."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background 3D Scene */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <AIOrb intensity={1} />
            <OrbitControls enableZoom={false} enablePan={false} />
            <Environment preset="city" />
          </Canvas>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Tutors
              </span>
              <br />
              Built for Your Students
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto">
              Train your own voice assistant with your content, style, and voice.
            </p>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Empower your classrooms with 24/7 personalized, voice-based AI tutors that know your syllabus.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <Upload className="mr-3 w-6 h-6" />
                📥 Upload Your Curriculum
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setChatOpen(true)}
                className="inline-flex items-center px-8 py-4 bg-white text-gray-800 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300"
              >
                <Mic className="mr-3 w-6 h-6" />
                🎤 Talk to Your First AI Tutor
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From curriculum upload to student interaction - see how easy it is to deploy AI tutors in your school.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <AnimatedStep
                key={index}
                step={step.step}
                title={step.title}
                description={step.description}
                icon={step.icon}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Personalization Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Make It Your Own
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Customize every aspect of your AI tutors to match your school's unique identity and teaching style.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalizationFeatures.map((feature, index) => (
              <PersonalizationCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                color={feature.color}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Student Experience Simulation */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Experience the Future
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how students will interact with your AI tutors through voice and chat.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Voice Demo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Voice Interaction</h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveDemo('voice')}
                    className={`p-3 rounded-full ${activeDemo === 'voice' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                  >
                    <Volume2 className="w-5 h-5" />
                  </motion.button>
                </div>
                <VoicePlayer 
                  title="Mrs. Nair - History Tutor"
                  description="Ask me about the French Revolution or any topic from your curriculum."
                  onPlayStateChange={setIsPlaying}
                />
              </GlassCard>
            </motion.div>

            {/* Chat Demo */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Chat Interaction</h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveDemo('chat')}
                    className={`p-3 rounded-full ${activeDemo === 'chat' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                  >
                    <MessageCircle className="w-5 h-5" />
                  </motion.button>
                </div>
                <ChatBot />
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Schools Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by educational institutions worldwide for reliable, secure, and effective AI tutoring solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valuePropositions.map((value, index) => (
              <ValueCard
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              School Admin Dashboard
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get complete visibility into student learning patterns and AI tutor performance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Usage Analytics</h3>
                  <p className="text-gray-600">Track student engagement and learning hours</p>
                </div>
                <div className="text-center">
                  <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Most-Asked Topics</h3>
                  <p className="text-gray-600">Identify areas where students need more help</p>
                </div>
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Progress Heatmap</h3>
                  <p className="text-gray-600">Visualize student performance across subjects</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The Future of Teaching Is Here
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              You Lead, AI Supports. Transform your school's learning experience today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-white text-gray-800 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Rocket className="mr-3 w-6 h-6" />
                🚀 Launch AI Tutor Demo
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-gray-800 transition-all duration-300"
              >
                <PhoneCall className="mr-3 w-6 h-6" />
                📞 Book a Discovery Call
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chat Demo Modal */}
      {chatOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setChatOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">AI Tutor Demo</h3>
              <button
                onClick={() => setChatOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                ×
              </button>
            </div>
            <ChatBot />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}