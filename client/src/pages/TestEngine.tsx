import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, TrendingUp, Brain, Zap, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import VoicePlayer from '../components/ui/VoicePlayer';
import TestRadar from '../components/3d/TestRadar';

const TestEngine = () => {
  const features = [
    {
      icon: Target,
      title: 'Gray Area Detection',
      description: 'Identifies knowledge gaps that traditional tests miss',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: Brain,
      title: 'Adaptive Questioning',
      description: 'Adjusts question difficulty based on student responses',
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: TrendingUp,
      title: 'Real-time Analytics',
      description: 'Instant insights into student performance and progress',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Zap,
      title: 'Instant Remediation',
      description: 'Provides immediate learning resources for weak areas',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const testTypes = [
    {
      name: 'Diagnostic Assessment',
      description: 'Comprehensive evaluation of student knowledge and skills',
      duration: '45-60 minutes',
      subjects: ['Math', 'Science', 'Language Arts', 'Social Studies'],
      features: ['Adaptive questioning', 'Gray area detection', 'Detailed reports']
    },
    {
      name: 'Quick Check',
      description: 'Rapid assessment for specific topics or concepts',
      duration: '10-15 minutes',
      subjects: ['Any subject area'],
      features: ['Focused evaluation', 'Immediate feedback', 'Progress tracking']
    },
    {
      name: 'Placement Test',
      description: 'Determines appropriate learning level for new students',
      duration: '30-45 minutes',
      subjects: ['Core subjects'],
      features: ['Level recommendation', 'Skill mapping', 'Learning path suggestion']
    }
  ];

  const benefits = [
    {
      metric: '85%',
      label: 'More accurate than traditional testing',
      description: 'Our AI identifies knowledge gaps with 85% higher accuracy'
    },
    {
      metric: '60%',
      label: 'Reduction in testing time',
      description: 'Adaptive questioning reduces test time while maintaining accuracy'
    },
    {
      metric: '92%',
      label: 'Teacher satisfaction rate',
      description: 'Educators love the detailed insights and recommendations'
    },
    {
      metric: '40%',
      label: 'Improvement in learning outcomes',
      description: 'Students show significant improvement with targeted remediation'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section with 3D Radar */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Suspense fallback={null}>
              <TestRadar />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            <Environment preset="night" />
          </Canvas>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 neon-text"
          >
            Adaptive Test Engine
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            AI-powered testing that detects gray areas and provides targeted remediation
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-lg"
            >
              Start a Diagnostic Test
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
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
            <h2 className="text-4xl font-bold text-white mb-6">
              Advanced Testing Technology
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our AI-powered test engine goes beyond traditional assessment to identify and address knowledge gaps
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
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
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

      {/* How It Works */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-900/20 to-red-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              How Gray Area Detection Works
            </h2>
            <p className="text-xl text-gray-300">
              Our AI identifies knowledge gaps that traditional tests miss
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: 'Adaptive Questioning',
                description: 'AI adjusts question difficulty based on student responses to probe deeper into understanding',
                icon: '🎯'
              },
              {
                step: 2,
                title: 'Pattern Recognition',
                description: 'Machine learning identifies subtle patterns in responses that indicate partial understanding',
                icon: '🧠'
              },
              {
                step: 3,
                title: 'Gray Area Mapping',
                description: 'System maps areas where students show uncertainty or inconsistent knowledge',
                icon: '📊'
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <GlassCard className="text-center h-full">
                  <div className="text-6xl mb-4">{step.icon}</div>
                  <div className="text-sm text-orange-300 font-semibold mb-2">STEP {step.step}</div>
                  <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Test Types */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Test Types
            </h2>
            <p className="text-xl text-gray-300">
              Choose from various assessment types tailored to your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testTypes.map((test, index) => (
              <motion.div
                key={test.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <GlassCard className="h-full">
                  <h3 className="text-xl font-semibold text-white mb-3">{test.name}</h3>
                  <p className="text-gray-300 mb-4">{test.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-300">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Duration: {test.duration}
                    </div>
                    <div className="flex items-start text-sm text-gray-300">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2 mt-1"></span>
                      <div>
                        Subjects: {test.subjects.join(', ')}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-4">
                    <h4 className="text-sm font-semibold text-white mb-2">Features:</h4>
                    <ul className="space-y-1">
                      {test.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Experience Adaptive Testing
            </h2>
            <p className="text-xl text-gray-300">
              Listen to how our AI adapts questioning based on student responses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <VoicePlayer
              title="Adaptive Math Assessment"
              description="Hear how questions adapt to student understanding"
              audioSrc="/sounds/success.mp3"
            />
            <VoicePlayer
              title="Gray Area Detection"
              description="Experience targeted questioning for knowledge gaps"
              audioSrc="/sounds/hit.mp3"
            />
          </div>
        </div>
      </section>

      {/* Sample Results */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Sample Assessment Results
            </h2>
            <p className="text-xl text-gray-300">
              See how our detailed reports help educators understand student needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard>
                <h3 className="text-xl font-semibold text-white mb-4">Student Performance Map</h3>
                <div className="space-y-4">
                  {[
                    { subject: 'Algebra', score: 85, status: 'strong' },
                    { subject: 'Geometry', score: 92, status: 'strong' },
                    { subject: 'Statistics', score: 68, status: 'moderate' },
                    { subject: 'Calculus', score: 45, status: 'weak' },
                    { subject: 'Trigonometry', score: 38, status: 'gray' }
                  ].map((item, index) => (
                    <div key={item.subject} className="flex items-center justify-between">
                      <span className="text-gray-300">{item.subject}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              item.status === 'strong' ? 'bg-green-500' :
                              item.status === 'moderate' ? 'bg-yellow-500' :
                              item.status === 'weak' ? 'bg-red-500' : 'bg-orange-500'
                            }`}
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                        <span className="text-white text-sm w-8">{item.score}%</span>
                        {item.status === 'gray' && (
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard>
                <h3 className="text-xl font-semibold text-white mb-4">Recommended Actions</h3>
                <div className="space-y-4">
                  {[
                    {
                      area: 'Trigonometry',
                      action: 'Review basic trigonometric identities',
                      priority: 'high',
                      time: '2-3 weeks'
                    },
                    {
                      area: 'Calculus',
                      action: 'Strengthen algebra fundamentals first',
                      priority: 'high',
                      time: '3-4 weeks'
                    },
                    {
                      area: 'Statistics',
                      action: 'Practice probability concepts',
                      priority: 'medium',
                      time: '1-2 weeks'
                    }
                  ].map((rec, index) => (
                    <div key={index} className="border border-white/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{rec.area}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          rec.priority === 'high' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {rec.priority} priority
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{rec.action}</p>
                      <p className="text-gray-400 text-xs">Estimated time: {rec.time}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-900/20 to-teal-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Proven Results
            </h2>
            <p className="text-xl text-gray-300">
              Our adaptive testing delivers measurable improvements in assessment accuracy
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.metric}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="text-center h-full">
                  <div className="text-4xl font-bold text-white mb-2 neon-text">
                    {benefit.metric}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{benefit.label}</h3>
                  <p className="text-gray-300 text-sm">{benefit.description}</p>
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
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Assessment?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Discover knowledge gaps that traditional testing misses with our AI-powered engine
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-lg"
              >
                Try Free Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200"
              >
                Schedule Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TestEngine;
