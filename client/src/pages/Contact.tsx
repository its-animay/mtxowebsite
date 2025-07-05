import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Calendar, Mic, MicOff } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import BookingCalendar from '../components/ui/BookingCalendar';
import ChatBot from '../components/ui/ChatBot';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVoiceInput, setIsVoiceInput] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['123 Innovation Drive', 'San Francisco, CA 94105', 'United States'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+1 (555) 123-4567', '+1 (555) 123-4568', '24/7 Support Available'],
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['hello@ailearning.com', 'support@ailearning.com', 'press@ailearning.com'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Friday: 9AM - 6PM PST', 'Saturday: 10AM - 4PM PST', 'Sunday: Closed'],
      color: 'from-orange-500 to-red-500'
    }
  ];

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'demo', label: 'Request Demo' },
    { value: 'enterprise', label: 'Enterprise Solutions' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'support', label: 'Technical Support' },
    { value: 'media', label: 'Media/Press' }
  ];

  const offices = [
    {
      city: 'San Francisco',
      country: 'USA',
      address: '123 Innovation Drive, CA 94105',
      phone: '+1 (555) 123-4567',
      type: 'Headquarters'
    },
    {
      city: 'London',
      country: 'UK',
      address: '456 Tech Street, EC2A 4DP',
      phone: '+44 20 1234 5678',
      type: 'European Office'
    },
    {
      city: 'Singapore',
      country: 'Singapore',
      address: '789 Marina Bay, 018956',
      phone: '+65 1234 5678',
      type: 'Asia Pacific Office'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      subject: '',
      message: '',
      inquiryType: 'general'
    });
    setIsSubmitting(false);
    
    // Show success message (in a real app, you'd handle this properly)
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsVoiceInput(true);
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setFormData(prev => ({
          ...prev,
          message: prev.message + ' ' + transcript
        }));
      };
      
      recognition.onend = () => {
        setIsVoiceInput(false);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsVoiceInput(false);
      };
      
      recognition.start();
      setRecognition(recognition);
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  };

  const stopVoiceInput = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 neon-text"
          >
            Get In Touch
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Ready to transform education with AI? We'd love to hear from you. 
            Get in touch for demos, partnerships, or general inquiries.
          </motion.p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Contact Information</h2>
            <p className="text-xl text-gray-300">Multiple ways to reach us</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <GlassCard className="text-center h-full">
                  <div className={`w-16 h-16 bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <info.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{info.title}</h3>
                  <div className="space-y-2">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-300 text-sm">{detail}</p>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Booking */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <MessageSquare className="w-6 h-6 mr-2 text-blue-400" />
                  Send us a Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full bg-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your company"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full bg-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {inquiryTypes.map(type => (
                        <option key={type.value} value={type.value} className="bg-gray-800">
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full bg-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Brief subject line"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <div className="relative">
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full bg-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                        placeholder="Tell us about your needs..."
                      />
                      <button
                        type="button"
                        onClick={isVoiceInput ? stopVoiceInput : startVoiceInput}
                        className={`absolute right-3 top-3 p-2 rounded-lg transition-colors ${
                          isVoiceInput 
                            ? 'bg-red-500 text-white' 
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                      >
                        {isVoiceInput ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </button>
                    </div>
                    {isVoiceInput && (
                      <p className="text-blue-300 text-sm mt-2">🎤 Listening... Speak now</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </motion.button>
                </form>
              </GlassCard>
            </motion.div>

            {/* Demo Booking */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-purple-400" />
                  Book a Demo
                </h3>
                <p className="text-gray-300 mb-6">
                  Schedule a personalized demo to see our AI platform in action
                </p>
                
                <BookingCalendar 
                  onBooking={(booking) => {
                    console.log('Demo booked:', booking);
                    alert('Demo booked successfully! We\'ll send you a confirmation email.');
                  }}
                />
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Our Global Offices</h2>
            <p className="text-xl text-gray-300">We're here to support you worldwide</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <GlassCard className="h-full">
                  <div className="flex items-center mb-4">
                    <MapPin className="w-6 h-6 text-blue-400 mr-2" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{office.city}</h3>
                      <p className="text-blue-300 text-sm">{office.type}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-gray-300">
                    <p className="text-sm">{office.address}</p>
                    <p className="text-sm flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      {office.phone}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-900/20 to-teal-900/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">Quick answers to common questions</p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: 'How quickly can I get started with your AI platform?',
                answer: 'Most clients can be up and running within 2-4 weeks, depending on the complexity of their requirements and content volume.'
              },
              {
                question: 'Do you offer free trials or demos?',
                answer: 'Yes! We offer personalized demos and 30-day free trials for educational institutions. Contact us to schedule yours.'
              },
              {
                question: 'What types of content formats do you support?',
                answer: 'We support PDF, DOCX, PPT, HTML, TXT, and many other formats. Our AI can process both text and multimedia content.'
              },
              {
                question: 'Is my data secure with your platform?',
                answer: 'Absolutely. We\'re SOC 2 compliant and use enterprise-grade encryption. Your data never leaves our secure infrastructure.'
              },
              {
                question: 'Can you integrate with our existing LMS?',
                answer: 'Yes, we offer seamless integration with popular LMS platforms like Canvas, Blackboard, Moodle, and custom systems via APIs.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard>
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
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
              Join thousands of educators and organizations transforming learning with AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-200"
              >
                Schedule Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating ChatBot */}
      <ChatBot />
    </div>
  );
};

export default Contact;
