import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Award, Target, Heart, Linkedin, Twitter, Mail, ArrowRight } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import RotatingGlobe from '../components/3d/RotatingGlobe';

const About = () => {
  const stats = [
    { number: '2019', label: 'Founded' },
    { number: '500K+', label: 'Students Served' },
    { number: '50+', label: 'Countries' },
    { number: '1000+', label: 'Institutions' }
  ];

  const values = [
    {
      icon: Users,
      title: 'Education for All',
      description: 'Making quality education accessible to everyone, everywhere, regardless of background or location.'
    },
    {
      icon: Award,
      title: 'Innovation First',
      description: 'Pushing the boundaries of educational technology with cutting-edge AI and machine learning.'
    },
    {
      icon: Target,
      title: 'Personalized Learning',
      description: 'Every learner is unique. Our AI adapts to individual learning styles and paces.'
    },
    {
      icon: Heart,
      title: 'Human-Centered',
      description: 'Technology should enhance human connection, not replace it. We build AI that empowers educators.'
    }
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'CEO & Co-Founder',
      bio: 'Former Stanford AI researcher with 15 years in educational technology',
      image: '👩‍💼',
      social: { linkedin: '#', twitter: '#', email: 'sarah@ailearning.com' }
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO & Co-Founder',
      bio: 'Ex-Google engineer specialized in large-scale AI systems and voice technology',
      image: '👨‍💻',
      social: { linkedin: '#', twitter: '#', email: 'marcus@ailearning.com' }
    },
    {
      name: 'Dr. Amelia Foster',
      role: 'Head of AI Research',
      bio: 'MIT PhD in Machine Learning, published 50+ papers on educational AI',
      image: '👩‍🔬',
      social: { linkedin: '#', twitter: '#', email: 'amelia@ailearning.com' }
    },
    {
      name: 'David Kim',
      role: 'VP of Product',
      bio: 'Former Apple product manager with expertise in user experience design',
      image: '👨‍🎨',
      social: { linkedin: '#', twitter: '#', email: 'david@ailearning.com' }
    },
    {
      name: 'Prof. Elena Volkov',
      role: 'Chief Education Officer',
      bio: '20 years as educator and curriculum designer at top universities',
      image: '👩‍🏫',
      social: { linkedin: '#', twitter: '#', email: 'elena@ailearning.com' }
    },
    {
      name: 'Alex Thompson',
      role: 'Head of Enterprise',
      bio: 'Former McKinsey consultant specializing in digital transformation',
      image: '👨‍💼',
      social: { linkedin: '#', twitter: '#', email: 'alex@ailearning.com' }
    }
  ];

  const timeline = [
    {
      year: '2019',
      title: 'Company Founded',
      description: 'Started with a vision to democratize education through AI technology'
    },
    {
      year: '2020',
      title: 'First AI Tutor',
      description: 'Launched our first AI tutoring system for mathematics education'
    },
    {
      year: '2021',
      title: 'Voice Technology',
      description: 'Introduced voice-based learning for children and language learners'
    },
    {
      year: '2022',
      title: 'Enterprise Launch',
      description: 'Expanded to serve enterprise clients with custom AI solutions'
    },
    {
      year: '2023',
      title: 'Global Expansion',
      description: 'Reached 50 countries with multi-language support'
    },
    {
      year: '2024',
      title: 'Advanced Testing',
      description: 'Launched adaptive testing engine with gray area detection'
    }
  ];

  const achievements = [
    'UNESCO Global Education Innovation Award',
    'EdTech Breakthrough Award for AI Innovation',
    'Forbes 30 Under 30 in Education (CEO)',
    'MIT Technology Review Innovators',
    'GSMA Global Mobile Award for Education',
    'World Economic Forum Technology Pioneer'
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section with 3D Globe */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Suspense fallback={null}>
              <RotatingGlobe />
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
            About Our Mission
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            We're building the future of education with AI that understands, adapts, and empowers 
            every learner to reach their full potential.
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
              Join Our Mission
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="text-center">
                  <div className="text-4xl font-bold text-white mb-2 neon-text">
                    {stat.number}
                  </div>
                  <div className="text-gray-300">{stat.label}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-6 text-gray-300">
                <p>
                  Founded in 2019 by a team of AI researchers and educators, we saw the enormous 
                  potential for artificial intelligence to transform how people learn. Traditional 
                  education often follows a one-size-fits-all approach, but we knew AI could 
                  personalize learning at scale.
                </p>
                <p>
                  Starting with our first AI tutor for mathematics, we've grown into a comprehensive 
                  platform serving hundreds of thousands of learners worldwide. Our technology 
                  powers everything from voice-based language learning for children to sophisticated 
                  enterprise training systems.
                </p>
                <p>
                  Today, we're proud to be at the forefront of educational AI, with our solutions 
                  used in over 50 countries and 1000+ institutions. But we're just getting started 
                  on our mission to make quality education accessible to everyone.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard>
                <h3 className="text-2xl font-bold text-white mb-6">Company Timeline</h3>
                <div className="space-y-4">
                  {timeline.map((event, index) => (
                    <div key={event.year} className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {event.year}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-1">{event.title}</h4>
                        <p className="text-gray-300 text-sm">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Our Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Meet Our Team</h2>
            <p className="text-xl text-gray-300">
              World-class experts in AI, education, and technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  rotateY: 10,
                  rotateX: 5,
                  scale: 1.02
                }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <GlassCard className="text-center h-full">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-300 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-300 text-sm mb-6">{member.bio}</p>
                  <div className="flex justify-center space-x-4">
                    <a href={member.social.linkedin} className="text-gray-400 hover:text-white transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={member.social.twitter} className="text-gray-400 hover:text-white transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href={`mailto:${member.social.email}`} className="text-gray-400 hover:text-white transition-colors">
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Awards & Recognition</h2>
            <p className="text-xl text-gray-300">
              Recognized by leading organizations for innovation in educational technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="text-center">
                  <div className="text-3xl mb-3">🏆</div>
                  <p className="text-white font-medium">{achievement}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Impact */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-900/20 to-teal-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Global Impact</h2>
              <p className="text-xl text-gray-300 mb-8">
                Making a difference in education worldwide through AI innovation
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-white mb-2">50+</div>
                  <div className="text-gray-300">Countries Served</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">25</div>
                  <div className="text-gray-300">Languages Supported</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">500K+</div>
                  <div className="text-gray-300">Active Learners</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">1000+</div>
                  <div className="text-gray-300">Partner Institutions</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard>
                <h3 className="text-xl font-semibold text-white mb-6">Our Impact Stories</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="text-white font-medium mb-2">Rural Education Initiative</h4>
                    <p className="text-gray-300 text-sm">
                      Brought AI tutors to 200+ remote schools in Africa, 
                      improving literacy rates by 40% in underserved communities.
                    </p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="text-white font-medium mb-2">Accessibility Program</h4>
                    <p className="text-gray-300 text-sm">
                      Developed voice-first learning for visually impaired students, 
                      now used by 10,000+ learners with disabilities.
                    </p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="text-white font-medium mb-2">Pandemic Response</h4>
                    <p className="text-gray-300 text-sm">
                      Provided free AI tutoring during COVID-19 to 50,000+ students 
                      when schools were closed worldwide.
                    </p>
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
              Join Us in Transforming Education
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Whether you're an educator, student, or organization, 
              there's a place for you in the future of learning
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/careers"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200"
              >
                View Careers
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
