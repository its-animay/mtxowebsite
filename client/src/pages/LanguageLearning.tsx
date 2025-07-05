import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Volume2, Mic, Play, Star, Users, Clock, ArrowRight, MessageCircle } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import VoicePlayer from '../components/ui/VoicePlayer';
import AnimatedPanda from '../components/3d/AnimatedPanda';
import MagicalElements from '../components/3d/MagicalElements';
import SoundWave from '../components/3d/SoundWave';
import * as THREE from 'three';

// 3D Animated Teaching Character
const TeachingCharacter = () => {
  const groupRef = React.useRef<THREE.Group>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (groupRef.current) {
        groupRef.current.rotation.y = Math.sin(Date.now() * 0.001) * 0.3;
        groupRef.current.position.y = Math.sin(Date.now() * 0.002) * 0.2;
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <group ref={groupRef}>
      {/* Panda/Robot Character Body */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.3}
        />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.3, 0.3, 0.8]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[0.3, 0.3, 0.8]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Ears */}
      <mesh position={[-0.5, 0.8, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshPhysicalMaterial color="#000000" />
      </mesh>
      <mesh position={[0.5, 0.8, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshPhysicalMaterial color="#000000" />
      </mesh>

      {/* Nose */}
      <mesh position={[0, 0, 0.9]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Arms */}
      <mesh position={[-1.2, -0.5, 0]} rotation={[0, 0, 0.3]}>
        <capsuleGeometry args={[0.2, 0.8, 4, 8]} />
        <meshPhysicalMaterial color="#ffffff" />
      </mesh>
      <mesh position={[1.2, -0.5, 0]} rotation={[0, 0, -0.3]}>
        <capsuleGeometry args={[0.2, 0.8, 4, 8]} />
        <meshPhysicalMaterial color="#ffffff" />
      </mesh>

      {/* Speech Bubble */}
      <group position={[2, 1.5, 0]}>
        <mesh>
          <boxGeometry args={[1.5, 0.8, 0.1]} />
          <meshPhysicalMaterial
            color="#00ffff"
            transparent
            opacity={0.8}
          />
        </mesh>
        <mesh position={[-0.5, -0.5, 0]}>
          <coneGeometry args={[0.2, 0.3, 3]} />
          <meshPhysicalMaterial
            color="#00ffff"
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>

      {/* Floating learning elements */}
      {['A', 'B', 'C', '1', '2', '3'].map((char, index) => (
        <mesh
          key={char}
          position={[
            Math.cos((index / 6) * Math.PI * 2) * 3,
            Math.sin((index / 6) * Math.PI * 2) * 3,
            Math.sin(Date.now() * 0.001 + index) * 0.5
          ]}
        >
          <boxGeometry args={[0.3, 0.3, 0.1]} />
          <meshPhysicalMaterial
            color={`hsl(${index * 60}, 70%, 60%)`}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}

      {/* Microphone icon */}
      <group position={[0, -2, 1]}>
        <mesh>
          <capsuleGeometry args={[0.15, 0.4, 4, 8]} />
          <meshBasicMaterial color="#333333" />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.3, 8]} />
          <meshBasicMaterial color="#666666" />
        </mesh>
      </group>
    </group>
  );
};

const LanguageLearning = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const languages = [
    { code: 'english', name: 'English', flag: '🇺🇸', students: '50K+' },
    { code: 'spanish', name: 'Spanish', flag: '🇪🇸', students: '35K+' },
    { code: 'french', name: 'French', flag: '🇫🇷', students: '28K+' },
    { code: 'german', name: 'German', flag: '🇩🇪', students: '22K+' },
    { code: 'chinese', name: 'Chinese', flag: '🇨🇳', students: '18K+' },
    { code: 'japanese', name: 'Japanese', flag: '🇯🇵', students: '15K+' }
  ];

  const features = [
    {
      icon: Volume2,
      title: 'Interactive Voice Learning',
      description: 'Kids learn through natural conversation with AI characters'
    },
    {
      icon: Mic,
      title: 'Pronunciation Practice',
      description: 'Real-time feedback on pronunciation and speaking skills'
    },
    {
      icon: Play,
      title: 'Gamified Lessons',
      description: 'Fun games and activities that make learning engaging'
    },
    {
      icon: Star,
      title: 'Progress Tracking',
      description: 'Monitor your child\'s learning journey and achievements'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Magical Hero Section for Kids */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
        <div className="absolute inset-0 z-0">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <Suspense fallback={null}>
              <AnimatedPanda position={[0, -1, 0]} scale={1.2} isHovered={isPlaying} />
              <MagicalElements count={15} spread={12} />
              <SoundWave isPlaying={isPlaying} intensity={1.5} color="#ff69b4" />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.1} />
            <Environment preset="sunset" />
          </Canvas>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Glass backdrop container */}
          <div 
            className="bg-black/20 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
            style={{
              backdropFilter: "blur(14px)",
              background: "rgba(255, 255, 255, 0.1)"
            }}
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ 
                duration: 1.2, 
                ease: "easeOut",
                delay: 0.5
              }}
              className="text-5xl md:text-6xl font-bold mb-6"
              style={{
                fontFamily: "'Comic Neue', 'Baloo 2', 'Poppins', cursive",
                color: "#2d3748",
                textShadow: "0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.4)"
              }}
            >
              🎈 Voice Learning for Kids 🌟
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 1.0, 
                ease: "easeOut",
                delay: 0.8
              }}
              className="text-xl mb-8"
              style={{
                fontFamily: "'Baloo 2', 'Comic Neue', cursive",
                color: "#4a5568",
                textShadow: "0 0 8px rgba(255, 255, 255, 0.3)"
              }}
            >
              🐼 Meet your friendly AI panda teacher! Learn languages through fun conversations, songs, and magical stories! ✨
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 1.0, 
                ease: "backOut",
                delay: 1.1
              }}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -2, 2, 0],
                  boxShadow: "0 0 25px rgba(255, 105, 180, 0.6)"
                }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  y: [0, -5, 0],
                  boxShadow: [
                    "0 5px 15px rgba(255, 105, 180, 0.4)",
                    "0 10px 25px rgba(255, 105, 180, 0.6)",
                    "0 5px 15px rgba(255, 105, 180, 0.4)"
                  ]
                }}
                transition={{
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className="inline-block"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 text-white rounded-full font-bold text-lg transition-all duration-300 shadow-2xl"
                  style={{
                    fontFamily: "'Baloo 2', 'Comic Neue', cursive",
                    background: "linear-gradient(45deg, #ff69b4, #ff1493, #ff6347)",
                    border: "3px solid rgba(255, 255, 255, 0.3)"
                  }}
                >
                  🎤 Try Voice Chat! 🌟
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Language Selection */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Choose Your Language Adventure
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our AI characters speak multiple languages and adapt to your child's learning pace
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {languages.map((language, index) => (
              <motion.div
                key={language.code}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <button
                  onClick={() => setSelectedLanguage(language.code)}
                  className={`w-full glass-card p-6 rounded-2xl text-center transition-all duration-300 ${
                    selectedLanguage === language.code
                      ? 'ring-2 ring-purple-500 bg-purple-500/20'
                      : 'hover:bg-white/20'
                  }`}
                >
                  <div className="text-4xl mb-3">{language.flag}</div>
                  <h3 className="text-white font-semibold mb-2">{language.name}</h3>
                  <p className="text-gray-300 text-sm">{language.students}</p>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              How Voice Learning Works
            </h2>
            <p className="text-xl text-gray-300">
              Advanced AI technology designed specifically for children's learning needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Voice Demo Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Listen to Our AI Characters
            </h2>
            <p className="text-xl text-gray-300">
              Experience how our AI characters interact with children in a natural, engaging way
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <VoicePlayer
              title="Panda Teacher - English"
              description="Meet Panda, teaching basic English vocabulary"
              audioSrc="/sounds/success.mp3"
              onPlayStateChange={setIsPlaying}
            />
            <VoicePlayer
              title="Robot Buddy - Spanish"
              description="Robot Buddy helps with Spanish pronunciation"
              audioSrc="/sounds/hit.mp3"
              onPlayStateChange={setIsPlaying}
            />
          </div>
        </div>
      </section>

      {/* Age Groups */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Perfect for Every Age
            </h2>
            <p className="text-xl text-gray-300">
              Age-appropriate content and characters designed for different learning stages
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                age: '3-5 Years',
                title: 'Early Learners',
                description: 'Simple words, songs, and playful interactions',
                character: '🐼',
                features: ['Basic Vocabulary', 'Color Recognition', 'Simple Phrases']
              },
              {
                age: '6-8 Years',
                title: 'Young Explorers',
                description: 'Story-based learning with interactive conversations',
                character: '🤖',
                features: ['Sentence Building', 'Grammar Basics', 'Story Reading']
              },
              {
                age: '9-12 Years',
                title: 'Advanced Learners',
                description: 'Complex conversations and cultural learning',
                character: '🦊',
                features: ['Fluent Conversations', 'Cultural Context', 'Advanced Grammar']
              }
            ].map((group, index) => (
              <motion.div
                key={group.age}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <GlassCard className="text-center h-full">
                  <div className="text-6xl mb-4">{group.character}</div>
                  <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm mb-2">
                    {group.age}
                  </span>
                  <h3 className="text-xl font-semibold text-white mb-3">{group.title}</h3>
                  <p className="text-gray-300 mb-4">{group.description}</p>
                  <ul className="text-left space-y-2">
                    {group.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Dashboard */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Parent Dashboard
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Monitor your child's progress with detailed insights and recommendations
              </p>
              <ul className="space-y-4">
                {[
                  'Real-time learning progress tracking',
                  'Vocabulary and pronunciation assessments',
                  'Weekly progress reports and achievements',
                  'Personalized learning recommendations',
                  'Safe, child-friendly environment'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard>
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white mb-2">Emma's Progress</h3>
                    <p className="text-gray-300">Learning Spanish for 3 weeks</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-300 mb-1">
                        <span>Vocabulary</span>
                        <span>85%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm text-gray-300 mb-1">
                        <span>Pronunciation</span>
                        <span>72%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm text-gray-300 mb-1">
                        <span>Conversation</span>
                        <span>68%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <span className="text-2xl">🏆</span>
                    <p className="text-white font-semibold">5 Achievements Unlocked!</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
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
            <h2 className="text-4xl font-bold text-white mb-6">
              Start Your Child's Language Adventure
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of families who trust our AI characters to teach their children
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-lg"
              >
                Try Free Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200"
              >
                Schedule Call
                <MessageCircle className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LanguageLearning;
