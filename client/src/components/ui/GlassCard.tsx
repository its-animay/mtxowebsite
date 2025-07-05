import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className, 
  hover = true, 
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={hover ? { scale: 1.02, y: -5 } : undefined}
      className={cn(
        'glass-card rounded-2xl p-6 backdrop-blur-md bg-white/10 border border-white/20 shadow-xl',
        'hover:shadow-2xl transition-all duration-300',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
