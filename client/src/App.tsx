import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Homepage from './pages/Homepage';
import Courses from './pages/Courses';
import LanguageLearning from './pages/LanguageLearning';
import AITutors from './pages/AITutors';
import TestEngine from './pages/TestEngine';
import Enterprise from './pages/Enterprise';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import Contact from './pages/Contact';
import Fintech from './pages/industries/Fintech';
import Healthcare from './pages/industries/Healthcare';
import RealEstate from './pages/industries/RealEstate';
import Ecommerce from './pages/industries/Ecommerce';
import EdTech from './pages/industries/EdTech';
import "@fontsource/inter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          <Header />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/language-learning" element={<LanguageLearning />} />
              <Route path="/ai-tutors" element={<AITutors />} />
              <Route path="/test-engine" element={<TestEngine />} />
              <Route path="/enterprise" element={<Enterprise />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/industries/fintech" element={<Fintech />} />
              <Route path="/industries/healthcare" element={<Healthcare />} />
              <Route path="/industries/real-estate" element={<RealEstate />} />
              <Route path="/industries/ecommerce" element={<Ecommerce />} />
              <Route path="/industries/edtech" element={<EdTech />} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
