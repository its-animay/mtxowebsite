import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Upload, Database, Brain, MessageSquare, Play, ArrowRight, CheckCircle, Zap, TrendingUp, Shield, Link as LinkIcon } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import VoicePlayer from '../components/ui/VoicePlayer';
import SystemDiagram from '../components/3d/SystemDiagram';

const HowItWorks = () => {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const steps = [
    {
      id: 1,
      icon: Upload,
      title: 'Content Upload',
      description: 'Upload your educational content, documents, and curriculum materials',
      details: [
        'Support for multiple file formats (PDF, DOCX, PPT, etc.)',
        'Bulk upload capabilities for large content libraries',
        'Automatic content organization and categorization',
        'Version control and content management'
      ],
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 2,
      icon: Database,
      title: 'RAG Processing',
      description: 'Our Retrieval-Augmented Generation system processes and indexes your content',
      details: [
        'Advanced natural language processing',
        'Semantic understanding and knowledge extraction',
        'Content chunking and vector embeddings',
        'Real-time content updates and synchronization'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      icon: Brain,
      title: 'AI Agent Creation',
      description: 'Intelligent agents are created based on your specific content and requirements',
      details: [
        'Custom personality and teaching style configuration',
        'Subject matter expertise specialization',
        'Multi-language support and localization',
        'Adaptive learning algorithm integration'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      icon: MessageSquare,
      title: 'Voice & Chat Output',
      description: 'Students interact with AI tutors through natural voice and chat interfaces',
      details: [
        'Natural language conversation capabilities',
        'Voice synthesis in multiple languages',
        'Real-time response generation',
        'Context-aware dialogue management'
      ],
      color: 'from-green-500 to-teal-500'
    }
  ];

  const features = [
    {
      title: 'Real-time Processing',
      description: 'Content is processed and available immediately',
      icon: Zap
    },
    {
      title: 'Scalable Architecture',
      description: 'Handles from small schools to large enterprises',
      icon: TrendingUp
    },
    {
      title: 'Secure & Private',
      description: 'Enterprise-grade security for sensitive educational data',
      icon: Shield
    },
    {
      title: 'Easy Integration',
      description: 'Seamlessly integrates with existing learning management systems',
      icon: LinkIcon
    }
  ];

  const useCases = [
    {
      title: 'Educational Institutions',
      description: 'Transform textbooks and curriculum into interactive AI tutors',
      example: 'Upload math textbooks → AI tutor explains calculus concepts'
    },
    {
      title: 'Corporate Training',
      description: 'Convert training materials into engaging learning experiences',
      example: 'Upload policy documents → AI assistant answers compliance questions'
    },
    {
      title: 'Language Learning',
      description: 'Create conversational practice partners for language students',
      example: 'Upload language content → AI conversation partner for practice'
    },
    {
      title: 'Technical Documentation',
      description: 'Transform complex documentation into interactive help systems',
      example: 'Upload API docs → AI assistant helps developers with integration'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section with 3D System Diagram */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 12]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Suspense fallback={null}>
              <SystemDiagram />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
            <Environment preset="warehouse" />
          </Canvas>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 neon-text"
          >
            How It Works
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            Transform your content into intelligent AI tutors in four simple steps
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
            >
              See It In Action
              <Play className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              The Complete Process
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our AI platform transforms static content into dynamic, interactive learning experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setSelectedStep(step.id)}
                onHoverEnd={() => setSelectedStep(null)}
              >
                <GlassCard 
                  className={`text-center h-full cursor-pointer transition-all duration-300 ${
                    selectedStep === step.id ? 'ring-2 ring-blue-500 scale-105' : ''
                  }`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm text-blue-300 font-semibold mb-2">STEP {step.id}</div>
                  <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-300 mb-4">{step.description}</p>
                  
                  {selectedStep === step.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-white/20 pt-4"
                    >
                      <ul className="space-y-2 text-left">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-400 mt-0.5 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Technical Architecture
            </h2>
            <p className="text-xl text-gray-300">
              Built on cutting-edge AI and machine learning technologies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold text-white mb-6">Powered by Advanced AI</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Large Language Models</h4>
                    <p className="text-gray-300">State-of-the-art language models fine-tuned for educational content</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Vector Databases</h4>
                    <p className="text-gray-300">High-performance semantic search and content retrieval</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Real-time Processing</h4>
                    <p className="text-gray-300">Instant content processing and response generation</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard>
                <h3 className="text-xl font-semibold text-white mb-4">System Specifications</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Processing Speed</span>
                    <span className="text-white font-semibold">&lt; 200ms response time</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Supported Languages</span>
                    <span className="text-white font-semibold">50+ languages</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Concurrent Users</span>
                    <span className="text-white font-semibold">Unlimited scaling</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Content Formats</span>
                    <span className="text-white font-semibold">PDF, DOCX, HTML, TXT</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">API Integration</span>
                    <span className="text-white font-semibold">RESTful APIs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Security</span>
                    <span className="text-white font-semibold">SOC 2 Compliant</span>
                  </div>
                </div>
              </GlassCard>
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
            <h2 className="text-4xl font-bold text-white mb-6">
              Real-World Applications
            </h2>
            <p className="text-xl text-gray-300">
              See how different industries transform their content into intelligent AI assistants
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="h-full">
                  <h3 className="text-xl font-semibold text-white mb-4">{useCase.title}</h3>
                  <p className="text-gray-300 mb-4">{useCase.description}</p>
                  <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-500/30">
                    <p className="text-blue-200 text-sm">
                      <span className="font-semibold">Example:</span> {useCase.example}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-900/20 to-teal-900/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Experience the Technology
            </h2>
            <p className="text-xl text-gray-300">
              Listen to examples of our AI system in action
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <VoicePlayer
              title="Content Processing Demo"
              description="Hear how uploaded content becomes conversational knowledge"
              audioSrc="/sounds/success.mp3"
            />
            <VoicePlayer
              title="AI Tutor Response"
              description="Experience natural dialogue with context-aware responses"
              audioSrc="/sounds/hit.mp3"
            />
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Platform Features
            </h2>
            <p className="text-xl text-gray-300">
              Everything you need for intelligent content transformation
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
                  <feature.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Transform your content into intelligent AI tutors today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
              >
                Start Free Trial
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

export default HowItWorks;
