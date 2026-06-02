import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Rocket } from 'lucide-react';

const ScrollIndicator = () => {
  const { scrollYProgress } = useScroll();
  
  // Smooth out the scroll progress slightly for a better feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate the vertical position of the rocket
  const yPos = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="fixed right-4 top-1/4 bottom-1/4 w-8 flex flex-col items-center justify-between z-50 pointer-events-none hidden md:flex">
      {/* Background track line */}
      <div className="absolute top-0 bottom-0 w-[2px] bg-white/10 rounded-full" />
      
      {/* Filled progress line */}
      <motion.div 
        className="absolute top-0 w-[2px] bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] origin-top"
        style={{ height: yPos }}
      />
      
      {/* Rocket icon tracking the progress */}
      <motion.div 
        className="absolute w-8 h-8 flex items-center justify-center text-white"
        style={{ 
          top: yPos, 
          y: '-50%' // Center the rocket on the tip of the line
        }}
      >
        <div className="relative">
          {/* Exhaust glow effect */}
          <motion.div 
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-6 bg-orange-500/40 rounded-full blur-md"
            style={{
              opacity: useTransform(smoothProgress, [0, 0.1, 1], [0, 1, 1])
            }}
          />
          <Rocket size={20} className="rotate-135 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
        </div>
      </motion.div>
    </div>
  );
};

export default ScrollIndicator;
