import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Twitter, Linkedin, Github, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/50 backdrop-blur-md border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold text-white">mtxo labs</span>
            </Link>
            <p className="text-gray-300 text-sm">
              Revolutionizing education and enterprise with AI-powered learning platforms, 
              voice agents, and intelligent automation solutions.
            </p>
            <div className="flex space-x-4">
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Github className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Mail className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="text-white font-semibold mb-4">Use Cases</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/courses" className="text-gray-300 hover:text-white transition-colors">Self-paced Courses</Link></li>
              <li><Link to="/language-learning" className="text-gray-300 hover:text-white transition-colors">Language Learning</Link></li>
              <li><Link to="/ai-tutors" className="text-gray-300 hover:text-white transition-colors">AI Tutors</Link></li>
              <li><Link to="/test-engine" className="text-gray-300 hover:text-white transition-colors">Test Engine</Link></li>
              <li><Link to="/enterprise" className="text-gray-300 hover:text-white transition-colors">Enterprise</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>hello@mtxolabs.com</p>
              <p>+1 (555) 123-4567</p>
              <p>123 Innovation Drive<br />San Francisco, CA 94105</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} mtxo labs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
