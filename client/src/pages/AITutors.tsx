import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, Users, BookOpen, TrendingUp, Upload, Brain, ArrowRight, CheckCircle } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import VoicePlayer from '../components/ui/VoicePlayer';
import SchoolModel from '../components/3d/SchoolModel';

const AITutors = () => {
  const benefits = [
    {
      icon: GraduationCap,
      title: '24/7 Personalized Support',
      description: 'AI tutors available round the clock to help every student'
    },
    {
      icon: Users,
      title: 'Scalable for Any Institution',
      description: 'From small schools to large universities, our AI scales with you'
    },
    {
      icon: BookOpen,
      title: 'Curriculum Integration',
      description: 'Seamlessly integrates with existing educational content'
    },
    {
      icon: TrendingUp,
      title: 'Improved Learning Outcomes',
      description: 'Data-driven insights help improve student performance'
    }
  ];

  const implementation = [
    {
      step: 1,
      title: 'Content Upload',
      description: 'Upload your curriculum, textbooks, and teaching materials',
      icon: Upload
    },
    {
      step: 2,
      title: 'AI Training',
      description: 'Our AI learns your specific curriculum and teaching style',
      icon: Brain
    },
    {
      step: 3,
      title: 'Tutor Deployment',
      description: 'Deploy personalized AI tutors across your institution',
      icon: Users
    },
    {
      step: 4,
      title: 'Monitor & Optimize',
      description: 'Track performance and continuously improve the system',
      icon: TrendingUp
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Dean of Education, Springfield University',
      quote: 'Our AI tutors have transformed how students learn. 24/7 support has increased engagement by 300%.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'IT Director, Lincoln High School',
      quote: 'Implementation was seamless. Teachers love having AI assistants that understand our curriculum.',
      rating: 5
    },
    {
      name: 'Prof. Emily Rodriguez',
      role: 'Computer Science, Tech Institute',
      quote: 'The AI tutors adapt to each student\'s learning pace. We\'ve seen remarkable improvement in outcomes.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section with 3D School */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 2, 12]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Suspense fallback={null}>
              <SchoolModel />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
            <Environment preset="sunset" />
          </Canvas>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 neon-text"
          >
            AI Tutors for Schools
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            Intelligent tutoring systems that understand your curriculum and adapt to every student
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-full font-semibold hover:from-green-600 hover:to-teal-700 transition-all duration-200 shadow-lg"
            >
              Create a Custom AI Tutor
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Transform Your Institution
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our AI tutors integrate seamlessly with your existing curriculum to provide personalized learning experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-900/20 to-teal-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Implementation Process
            </h2>
            <p className="text-xl text-gray-300">
              From upload to deployment in just 4 simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {implementation.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <GlassCard className="text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm text-blue-300 font-semibold mb-2">STEP {step.step}</div>
                  <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
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
              Listen to how our AI tutors explain concepts and interact with students
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <VoicePlayer
              title="Mathematics AI Tutor"
              description="Hear how our AI explains complex math concepts"
              audioSrc="/sounds/success.mp3"
            />
            <VoicePlayer
              title="Science AI Tutor"
              description="Experience interactive science explanations"
              audioSrc="/sounds/hit.mp3"
            />
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Perfect for Every Institution
            </h2>
            <p className="text-xl text-gray-300">
              From K-12 schools to universities, our AI tutors adapt to any educational environment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'K-12 Schools',
                description: 'Support teachers with AI assistants that help students with homework and concept understanding',
                features: ['Homework Help', 'Concept Explanation', 'Progress Tracking', 'Parent Reports']
              },
              {
                title: 'Universities',
                description: 'Provide 24/7 support for complex subjects and research guidance',
                features: ['Research Assistance', 'Advanced Concepts', 'Thesis Support', 'Lab Guidance']
              },
              {
                title: 'Training Centers',
                description: 'Enhance professional development with specialized AI tutors',
                features: ['Skill Development', 'Certification Prep', 'Career Guidance', 'Industry Updates']
              }
            ].map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <GlassCard className="h-full">
                  <h3 className="text-2xl font-semibold text-white mb-4">{useCase.title}</h3>
                  <p className="text-gray-300 mb-6">{useCase.description}</p>
                  <ul className="space-y-2">
                    {useCase.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <CheckCircle className="w-5 h-5 mr-3 text-green-400" />
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

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              What Educators Say
            </h2>
            <p className="text-xl text-gray-300">
              Hear from institutions already using our AI tutors
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <GlassCard className="h-full">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="border-t border-white/20 pt-4">
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-900/20 to-teal-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Proven Results
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Our AI tutors deliver measurable improvements in student outcomes
              </p>
              <ul className="space-y-4">
                {[
                  '40% improvement in student engagement',
                  '60% reduction in teacher workload',
                  '25% increase in test scores',
                  '80% student satisfaction rate',
                  '50% faster curriculum coverage'
                ].map((stat, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    {stat}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid grid-cols-2 gap-6">
                {[
                  { metric: '10,000+', label: 'Students Helped' },
                  { metric: '500+', label: 'Institutions' },
                  { metric: '95%', label: 'Satisfaction Rate' },
                  { metric: '24/7', label: 'Availability' }
                ].map((stat, index) => (
                  <GlassCard key={index} className="text-center">
                    <div className="text-3xl font-bold text-white mb-2 neon-text">
                      {stat.metric}
                    </div>
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                  </GlassCard>
                ))}
              </div>
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
              Ready to Transform Your Institution?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join hundreds of educational institutions already using our AI tutors
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-full font-semibold hover:from-green-600 hover:to-teal-700 transition-all duration-200 shadow-lg"
              >
                Get Started Today
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

export default AITutors;
