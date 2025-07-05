import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { 
  ArrowRight, 
  MessageCircle, 
  Users, 
  Award, 
  Play, 
  Pause,
  Volume2,
  Mic,
  Globe,
  Star,
  Heart,
  Sparkles,
  Ear,
  RotateCcw,
  BookOpen,
  TrendingUp,
  Headphones,
  Zap
} from 'lucide-react';
import AnimatedPanda from '../components/3d/AnimatedPanda';
import MagicalElements from '../components/3d/MagicalElements';
import SoundWave from '../components/3d/SoundWave';
import VoiceBridgeAnimation from '../components/3d/VoiceBridgeAnimation';
import VoicePlayer from '../components/ui/VoicePlayer';
import GlassCard from '../components/ui/GlassCard';

const VoiceWaveBackground = () => {
  return (
    <div className="absolute inset-0 opacity-20">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${20 + Math.random() * 60}px`,
            height: `${20 + Math.random() * 60}px`,
            background: `radial-gradient(circle, rgba(79, 172, 254, 0.3) 0%, rgba(0, 242, 254, 0.1) 100%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

const FloatingChatBubbles = () => {
  const bubbles = [
    { text: "Hello!", color: "from-blue-400 to-purple-400" },
    { text: "¡Hola!", color: "from-orange-400 to-red-400" },
    { text: "你好!", color: "from-green-400 to-teal-400" },
    { text: "Bonjour!", color: "from-pink-400 to-purple-400" },
    { text: "Привет!", color: "from-cyan-400 to-blue-400" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {bubbles.map((bubble, index) => (
        <motion.div
          key={index}
          className={`absolute px-4 py-2 rounded-2xl bg-gradient-to-r ${bubble.color} text-white text-sm font-medium shadow-lg`}
          style={{
            left: `${15 + (index * 15)}%`,
            top: `${20 + Math.sin(index) * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            delay: index * 0.8,
          }}
        >
          {bubble.text}
        </motion.div>
      ))}
    </div>
  );
};

const StepCard = ({ step, title, description, icon: Icon, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="relative"
  >
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
          {step}
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  </motion.div>
);

const UseCaseCard = ({ title, description, character, bgColor, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.05 }}
    className={`relative overflow-hidden rounded-2xl p-6 ${bgColor} shadow-xl`}
  >
    <div className="relative z-10">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl">{character}</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/90">{description}</p>
    </div>
  </motion.div>
);

const TestimonialCard = ({ quote, author, accent }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl"
  >
    <div className="flex items-start mb-4">
      <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mr-4">
        <Volume2 className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1">
        <p className="text-white italic mb-2">"{quote}"</p>
        <p className="text-gray-300 font-medium">{author}</p>
      </div>
    </div>
    <div className="flex items-center">
      <div className="w-full h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-50">
        <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full w-3/4 animate-pulse"></div>
      </div>
    </div>
  </motion.div>
);

export default function LanguageLearning() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Say Hello 👋",
      description: "Start a conversation in your target language",
      icon: MessageCircle
    },
    {
      title: "AI Listens & Responds",
      description: "Your AI tutor understands and speaks back naturally",
      icon: Ear
    },
    {
      title: "Practice & Correct",
      description: "Repeat, respond, and get instant feedback",
      icon: RotateCcw
    },
    {
      title: "Track Progress",
      description: "Monitor pronunciation, fluency, and vocabulary growth",
      icon: TrendingUp
    }
  ];

  const useCases = [
    {
      title: "Children Learning",
      description: "Playful conversations with AI pandas and characters",
      character: "🐼",
      bgColor: "bg-gradient-to-br from-pink-500 to-purple-600",
      icon: Heart
    },
    {
      title: "Students Practicing",
      description: "Exam prep with focused conversation practice",
      character: "🎓",
      bgColor: "bg-gradient-to-br from-blue-500 to-cyan-600",
      icon: BookOpen
    },
    {
      title: "Active Seniors",
      description: "Keep your mind sharp with language games",
      character: "🧓",
      bgColor: "bg-gradient-to-br from-green-500 to-teal-600",
      icon: Zap
    },
    {
      title: "Family Learning",
      description: "Track everyone's progress on one dashboard",
      character: "👨‍👩‍👧",
      bgColor: "bg-gradient-to-br from-orange-500 to-red-600",
      icon: Users
    }
  ];

  const testimonials = [
    {
      quote: "I learned 15 new words just by talking!",
      author: "Sarah, Age 10"
    },
    {
      quote: "Feels like a real teacher... but fun!",
      author: "Mike, Student"
    },
    {
      quote: "My child speaks more confidently now.",
      author: "Emma, Parent"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background */}
      <VoiceWaveBackground />
      <FloatingChatBubbles />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        
        {/* Immersive 3D Voice Bridge Animation */}
        <div className="absolute inset-0 z-0">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 6]} />
            <OrbitControls enableZoom={false} enablePan={false} />
            
            <VoiceBridgeAnimation 
              isActive={true} 
              onComplete={() => console.log('Animation complete')} 
            />
            
            <Environment preset="sunset" />
          </Canvas>
        </div>

        {/* Hero Content - Positioned to work with 3D animation */}
        <div className="relative z-10 text-center max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 8 }} // Delayed to show after 3D animation
            className="mt-12"
          >
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 8.5 }}
              className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl"
            >
              Practice real conversations, get corrections, and build fluency — all through interactive voice with your personal AI tutor.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 9 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(79, 172, 254, 0.5)",
                    "0 0 30px rgba(79, 172, 254, 0.8)",
                    "0 0 20px rgba(79, 172, 254, 0.5)"
                  ]
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity }
                }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-bold text-lg shadow-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <Mic className="mr-3 w-6 h-6" />
                  🎤 Try a Voice Demo
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works - Voice-First Flow */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              How Voice Learning Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the most natural way to learn languages through conversation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                step={index + 1}
                title={step.title}
                description={step.description}
                icon={step.icon}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Personal AI Language Tutor */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 relative">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Your Personal AI Language Tutor
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
              Intelligent feedback, memory of your progress, and voice adaptation — like having a real tutor who never gets tired
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
            >
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Feedback</h3>
              <p className="text-white/90">"You're struggling with R sounds. Let's practice rolling your Rs together!"</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
            >
              <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mb-6 mx-auto">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Memory of Progress</h3>
              <p className="text-white/90">Your AI tutor remembers every lesson and adapts to your learning style</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
            >
              <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Volume2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Voice Adaptation</h3>
              <p className="text-white/90">Matches your pace, accent, and learning preferences automatically</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Perfect for Everyone
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From children to seniors, our voice-first approach makes language learning accessible and fun
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <UseCaseCard
                key={index}
                title={useCase.title}
                description={useCase.description}
                character={useCase.character}
                bgColor={useCase.bgColor}
                icon={useCase.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Real Voices, Real Results
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Hear what our learners are saying about their voice-first experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                accent={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Footer */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              No Keyboard. No Typing.
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8">
              Just Talk and Learn.
            </h3>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              The most natural way to learn languages is through conversation. Start speaking a new language today.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-bold text-xl shadow-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                <Headphones className="mr-4 w-8 h-8" />
                Start Talking in a New Language
                <ArrowRight className="ml-4 w-8 h-8" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}