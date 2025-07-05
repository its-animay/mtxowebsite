import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building, Users, Headphones, TrendingUp, Shield, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import VoicePlayer from '../components/ui/VoicePlayer';
import CallCenterCube from '../components/3d/CallCenterCube';

const Enterprise = () => {
  const solutions = [
    {
      icon: Headphones,
      title: 'AI Customer Support',
      description: 'Intelligent voice and chat agents that understand your business context',
      features: ['24/7 availability', 'Multi-language support', 'Contextual responses', 'Escalation protocols']
    },
    {
      icon: Users,
      title: 'Employee Training',
      description: 'AI-powered onboarding and continuous learning systems',
      features: ['Personalized training', 'Interactive scenarios', 'Progress tracking', 'Skills assessment']
    },
    {
      icon: Building,
      title: 'Internal Knowledge Base',
      description: 'Voice-activated access to company information and procedures',
      features: ['Natural language queries', 'Document search', 'Policy explanations', 'Instant updates']
    },
    {
      icon: TrendingUp,
      title: 'Sales Assistance',
      description: 'AI agents that support sales teams with product knowledge',
      features: ['Product recommendations', 'Price calculations', 'Competitive analysis', 'Lead qualification']
    }
  ];

  const industries = [
    {
      name: 'Healthcare',
      icon: '🏥',
      description: 'Patient support, appointment scheduling, and medical information assistance',
      useCases: ['Patient inquiries', 'Appointment booking', 'Medication reminders', 'Insurance support']
    },
    {
      name: 'Finance',
      icon: '🏦',
      description: 'Financial advisory, account management, and fraud detection support',
      useCases: ['Account inquiries', 'Transaction support', 'Investment guidance', 'Fraud alerts']
    },
    {
      name: 'Retail',
      icon: '🛍️',
      description: 'Product recommendations, order tracking, and customer service automation',
      useCases: ['Product search', 'Order status', 'Returns processing', 'Size recommendations']
    },
    {
      name: 'Manufacturing',
      icon: '🏭',
      description: 'Equipment monitoring, maintenance scheduling, and quality control',
      useCases: ['Equipment status', 'Maintenance alerts', 'Quality reports', 'Safety protocols']
    },
    {
      name: 'Technology',
      icon: '💻',
      description: 'Technical support, documentation access, and developer assistance',
      useCases: ['Bug reports', 'Code reviews', 'API documentation', 'System monitoring']
    },
    {
      name: 'Education',
      icon: '🎓',
      description: 'Student support, administrative tasks, and academic guidance',
      useCases: ['Course information', 'Registration help', 'Academic advising', 'Campus services']
    }
  ];

  const benefits = [
    {
      metric: '70%',
      label: 'Reduction in support costs',
      description: 'Automated responses handle routine inquiries'
    },
    {
      metric: '24/7',
      label: 'Continuous availability',
      description: 'AI agents work around the clock'
    },
    {
      metric: '40%',
      label: 'Faster response times',
      description: 'Instant responses to customer queries'
    },
    {
      metric: '95%',
      label: 'Accuracy rate',
      description: 'High-quality responses with context understanding'
    }
  ];

  const testimonials = [
    {
      company: 'TechCorp Inc.',
      industry: 'Technology',
      quote: 'Our AI agents handle 80% of customer inquiries, freeing our team for complex issues.',
      name: 'Sarah Johnson',
      role: 'VP of Customer Success',
      logo: '🔧'
    },
    {
      company: 'HealthPlus',
      industry: 'Healthcare',
      quote: 'Patient satisfaction improved by 45% since implementing voice-enabled appointment booking.',
      name: 'Dr. Michael Chen',
      role: 'Chief Medical Officer',
      logo: '⚕️'
    },
    {
      company: 'GlobalBank',
      industry: 'Finance',
      quote: 'Our AI handles complex financial queries with accuracy that rivals human agents.',
      name: 'Emma Rodriguez',
      role: 'Director of Digital Services',
      logo: '💰'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section with 3D Call Center */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 2, 12]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Suspense fallback={null}>
              <CallCenterCube />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
            <Environment preset="city" />
          </Canvas>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 neon-text"
          >
            Enterprise AI Agents
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            Voice and chat AI agents that understand your business and serve your customers
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
            >
              Talk to Our Team for Custom Solutions
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Enterprise AI Solutions
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive AI agent solutions designed for modern businesses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="h-full">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <solution.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">{solution.title}</h3>
                      <p className="text-gray-300 mb-4">{solution.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {solution.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
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

      {/* Industries Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Industry Solutions
            </h2>
            <p className="text-xl text-gray-300">
              Tailored AI agents for specific industry needs and challenges
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="h-full">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{industry.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-2">{industry.name}</h3>
                    <p className="text-gray-300 text-sm">{industry.description}</p>
                  </div>
                  <div className="border-t border-white/20 pt-4">
                    <h4 className="text-sm font-semibold text-white mb-2">Common Use Cases:</h4>
                    <ul className="space-y-1">
                      {industry.useCases.map((useCase, idx) => (
                        <li key={idx} className="text-sm text-gray-300 flex items-center">
                          <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                          {useCase}
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
              Experience Enterprise AI
            </h2>
            <p className="text-xl text-gray-300">
              Listen to how our AI agents handle real business scenarios
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <VoicePlayer
              title="Customer Support Agent"
              description="Hear how our AI handles complex customer inquiries"
              audioSrc="/sounds/success.mp3"
            />
            <VoicePlayer
              title="Sales Assistant"
              description="Experience AI-powered sales support and product recommendations"
              audioSrc="/sounds/hit.mp3"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/20 to-indigo-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Business Impact
            </h2>
            <p className="text-xl text-gray-300">
              Measurable results that drive business growth and efficiency
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

      {/* Security & Compliance */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Enterprise-Grade Security
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Built with security and compliance at the core for enterprise deployments
              </p>
              <ul className="space-y-4">
                {[
                  'SOC 2 Type II certified infrastructure',
                  'GDPR and HIPAA compliance options',
                  'End-to-end encryption for all communications',
                  'Role-based access controls',
                  'Audit logs and monitoring',
                  'On-premise deployment options'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <Shield className="w-6 h-6 mr-3 text-green-400" />
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
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, title: 'Security First', desc: 'Enterprise-grade security protocols' },
                  { icon: Clock, title: '99.9% Uptime', desc: 'Reliable and always available' },
                  { icon: Users, title: 'Scalable', desc: 'From hundreds to millions of users' },
                  { icon: TrendingUp, title: 'Analytics', desc: 'Deep insights and reporting' }
                ].map((item, index) => (
                  <GlassCard key={index} className="text-center">
                    <item.icon className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-300 text-sm">{item.desc}</p>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-300">
              Enterprise leaders trust our AI agents to transform their operations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <GlassCard className="h-full">
                  <div className="flex items-center mb-4">
                    <div className="text-2xl mr-3">{testimonial.logo}</div>
                    <div>
                      <h3 className="text-white font-semibold">{testimonial.company}</h3>
                      <p className="text-gray-400 text-sm">{testimonial.industry}</p>
                    </div>
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

      {/* Implementation Process */}
      <section className="py-20 px-4">
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
              From consultation to deployment in 4-6 weeks
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Discovery',
                description: 'Understand your business needs and use cases',
                duration: '1 week'
              },
              {
                step: 2,
                title: 'Design',
                description: 'Create custom AI agents for your specific requirements',
                duration: '2 weeks'
              },
              {
                step: 3,
                title: 'Integration',
                description: 'Connect with your existing systems and workflows',
                duration: '1-2 weeks'
              },
              {
                step: 4,
                title: 'Launch',
                description: 'Deploy and train your team on the new AI agents',
                duration: '1 week'
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="text-center h-full">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-300 mb-3">{step.description}</p>
                  <span className="text-sm text-indigo-300">{step.duration}</span>
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
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join hundreds of enterprises already using our AI agents to enhance customer experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
              >
                Get Custom Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200"
              >
                Schedule Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Enterprise;
