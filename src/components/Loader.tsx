import React, { useEffect } from 'react';
import { useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useRingConfigurator } from '../store/useRingConfigurator';

const Loader: React.FC = () => {
  const { progress } = useProgress();
  const { setLoaded, textureLoading } = useRingConfigurator();

  useEffect(() => {
    if (progress === 100 && !textureLoading) {
      const timer = setTimeout(() => {
        setLoaded(true);
      }, 1000); // Cinematic pause before reveal
      return () => clearTimeout(timer);
    }
  }, [progress, textureLoading, setLoaded]);

  return (
    <AnimatePresence>
      <motion.div 
        className="flex flex-col items-center justify-center w-full h-full bg-obsidian"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05, transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } }}
      >
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Outer glowing ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-[1px] border-gold/10"
          />
          {/* Inner fast ring */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full border-t-[2px] border-l-[1px] border-gold/40 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
          />
          
          {/* Progress text */}
          <div className="flex flex-col items-center text-gold font-serif">
            <span className="text-3xl tracking-widest font-light">
              {Math.round(progress)}
              <span className="text-sm opacity-50 ml-1">%</span>
            </span>
          </div>
        </div>
        
        <div className="mt-12 text-center flex flex-col items-center">
          <h2 className="font-serif text-2xl tracking-[0.4em] text-white/90 drop-shadow-lg">AURA</h2>
          <div className="h-[1px] w-12 bg-gold/50 my-3" />
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/40">Forging the Monolith</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader;