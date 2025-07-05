import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Brain, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { 
      name: 'Use Cases', 
      href: '#',
      submenu: [
        { name: 'Self-paced Courses', href: '/courses' },
        { name: 'Language Learning', href: '/language-learning' },
        { name: 'AI Tutors', href: '/ai-tutors' },
        { name: 'Test Engine', href: '/test-engine' },
        { name: 'Enterprise', href: '/enterprise' },
      ]
    },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold text-white">AI Learning</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <div className="relative">
                    <button className="flex items-center space-x-1 text-white hover:text-blue-400 transition-colors">
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-48 bg-black/90 backdrop-blur-md rounded-lg border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block px-4 py-2 text-sm text-white hover:text-blue-400 hover:bg-white/10 first:rounded-t-lg last:rounded-b-lg transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`text-white hover:text-blue-400 transition-colors ${
                      location.pathname === item.href ? 'text-blue-400' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block"
          >
            <Link
              to="/contact"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
            >
              Book Demo
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0, 
          height: isMenuOpen ? 'auto' : 0 
        }}
        className="md:hidden overflow-hidden bg-black/90 backdrop-blur-md"
      >
        <div className="px-4 py-2 space-y-1">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.submenu ? (
                <div className="space-y-1">
                  <div className="text-white font-medium py-2">{item.name}</div>
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.href}
                      className="block text-gray-300 hover:text-white pl-4 py-2 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  to={item.href}
                  className="block text-white hover:text-blue-400 py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
          <Link
            to="/contact"
            className="block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full font-semibold text-center mt-4"
            onClick={() => setIsMenuOpen(false)}
          >
            Book Demo
          </Link>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
