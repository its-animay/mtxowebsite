import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Box, Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Play, Clock, Users, Star, ArrowRight, CheckCircle } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import VoicePlayer from '../components/ui/VoicePlayer';
import FuturisticHero from '../components/3d/FuturisticHero';
import * as THREE from 'three';

// 3D Course Dashboard Component
const CourseDashboard = () => {
  const groupRef = React.useRef<THREE.Group>(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (groupRef.current) {
        groupRef.current.rotation.y += 0.01;
      }
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <group ref={groupRef}>
      {/* Main book/dashboard */}
      <Box position={[0, 0, 0]} args={[4, 3, 0.3]}>
        <meshPhysicalMaterial
          color="#2563eb"
          metalness={0.3}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </Box>

      {/* Open pages */}
      <Box position={[-0.5, 0, 0.2]} args={[1.8, 2.5, 0.05]} rotation={[0, -0.3, 0]}>
        <meshPhysicalMaterial color="#ffffff" />
      </Box>
      <Box position={[0.5, 0, 0.2]} args={[1.8, 2.5, 0.05]} rotation={[0, 0.3, 0]}>
        <meshPhysicalMaterial color="#ffffff" />
      </Box>

      {/* Course modules floating around */}
      {['Math', 'Science', 'History', 'Art'].map((subject, index) => (
        <group
          key={subject}
          position={[
            Math.cos((index / 4) * Math.PI * 2) * 3,
            Math.sin((index / 4) * Math.PI * 2) * 3,
            1
          ]}
        >
          <Box args={[0.8, 0.6, 0.2]}>
            <meshPhysicalMaterial
              color={`hsl(${index * 90}, 70%, 50%)`}
              metalness={0.2}
              roughness={0.3}
            />
          </Box>
          <Text
            position={[0, 0, 0.15]}
            fontSize={0.15}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {subject}
          </Text>
        </group>
      ))}

      {/* Progress indicators */}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 2
          ]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#00ff00" />
        </mesh>
      ))}
    </group>
  );
};

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const courses = [
    {
      id: 'ai-fundamentals',
      title: 'AI Fundamentals',
      description: 'Learn the basics of artificial intelligence and machine learning',
      duration: '8 weeks',
      students: '12,450',
      rating: 4.8,
      level: 'Beginner',
      features: ['Interactive AI Tutor', 'Voice Explanations', 'Adaptive Learning']
    },
    {
      id: 'data-science',
      title: 'Data Science Mastery',
      description: 'Complete guide to data analysis, visualization, and machine learning',
      duration: '12 weeks',
      students: '8,320',
      rating: 4.9,
      level: 'Intermediate',
      features: ['Real-world Projects', 'AI-Powered Assessment', 'Personal Mentor']
    },
    {
      id: 'web-development',
      title: 'Modern Web Development',
      description: 'Build responsive websites and web applications with latest technologies',
      duration: '10 weeks',
      students: '15,780',
      rating: 4.7,
      level: 'Beginner',
      features: ['Hands-on Coding', 'AI Code Review', 'Portfolio Building']
    },
    {
      id: 'mobile-app',
      title: 'Mobile App Development',
      description: 'Create native and cross-platform mobile applications',
      duration: '14 weeks',
      students: '6,890',
      rating: 4.8,
      level: 'Advanced',
      features: ['Cross-platform Focus', 'AI Debugging', 'App Store Deployment']
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Futuristic Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900">
        <div className="absolute inset-0 z-0">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 12]} />
            <Suspense fallback={null}>
              <FuturisticHero scale={1} intensity={1.2} showOrb={true} />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
            <Environment preset="night" />
          </Canvas>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ 
              duration: 1.2, 
              ease: "easeOut",
              delay: 0.5
            }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            style={{
              textShadow: "0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.4), 0 0 80px rgba(139, 92, 246, 0.2)",
              filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))"
            }}
          >
            Self-Paced Courses
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1.0, 
              ease: "easeOut",
              delay: 0.8
            }}
            className="text-xl text-gray-300 mb-8"
            style={{
              textShadow: "0 0 10px rgba(255, 255, 255, 0.2)"
            }}
          >
            Learn at your own pace with AI-powered personalized learning paths
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1.0, 
              ease: "easeOut",
              delay: 1.1
            }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(139, 92, 246, 0.6), 0 0 60px rgba(139, 92, 246, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(139, 92, 246, 0.4)",
                  "0 0 40px rgba(139, 92, 246, 0.6)",
                  "0 0 20px rgba(139, 92, 246, 0.4)"
                ]
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-full font-semibold hover:from-violet-600 hover:to-purple-700 transition-all duration-300 shadow-lg backdrop-blur-sm border border-violet-400/30"
                style={{
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.9) 0%, rgba(147, 51, 234, 0.9) 100%)",
                  backdropFilter: "blur(10px)"
                }}
              >
                Start Learning with AI Tutor
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Course Features */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Why Choose AI-Powered Learning?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of education with personalized AI tutors and adaptive learning technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: 'Personalized Learning Paths',
                description: 'AI analyzes your learning style and creates customized course sequences'
              },
              {
                icon: Play,
                title: 'Interactive AI Tutors',
                description: 'Get instant help and explanations from intelligent virtual tutors'
              },
              {
                icon: Clock,
                title: 'Adaptive Pacing',
                description: 'Learn at your optimal speed with AI-adjusted content difficulty'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <GlassCard className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
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

      {/* Popular Courses */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Popular Courses</h2>
            <p className="text-xl text-gray-300">
              Join thousands of learners in our most popular AI-enhanced courses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
                      <p className="text-gray-300 text-sm mb-4">{course.description}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                      {course.level}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-300">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course.students}
                      </span>
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400" />
                        {course.rating}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-white mb-2">Features:</h4>
                    <ul className="space-y-1">
                      {course.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setSelectedCourse(course.id)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                  >
                    Enroll Now
                  </button>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tutor Demo */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Experience AI Tutoring
            </h2>
            <p className="text-xl text-gray-300">
              Listen to how our AI tutors explain complex concepts in simple terms
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <VoicePlayer
              title="AI Explains Machine Learning"
              description="Listen to our AI tutor break down complex ML concepts"
              audioSrc="/sounds/success.mp3"
            />
            <VoicePlayer
              title="Interactive Problem Solving"
              description="Experience step-by-step guidance through coding challenges"
              audioSrc="/sounds/hit.mp3"
            />
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
              Ready to Start Your AI-Powered Learning Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of learners who have transformed their careers with our courses
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
            >
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
