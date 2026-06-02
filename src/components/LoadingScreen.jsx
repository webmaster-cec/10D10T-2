import React, { useEffect, useState } from 'react';
import LoaderHelix from './LoaderHelix';

const LoadingScreen = ({ onComplete }) => {
  const [isFading, setIsFading] = useState(false);
  const [takingOff, setTakingOff] = useState(false);

  useEffect(() => {
    // Start takeoff animation just before fading
    const takeoffTimer = setTimeout(() => {
      setTakingOff(true);
    }, 2400);

    // Show the loading screen for a minimum duration
    const timer = setTimeout(() => {
      setIsFading(true);
      // Wait for fade out animation to complete before unmounting
      setTimeout(() => {
        onComplete();
      }, 600); 
    }, 3500);

    return () => {
      clearTimeout(takeoffTimer);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-primary transition-opacity duration-500 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center justify-center h-full w-full overflow-hidden">

        {/* Glowing aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
        
        {/* Loader Component */}
        <div 
          className={`relative z-10 transition-all duration-[800ms] ease-in ${
            takingOff ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          <LoaderHelix variant="dna" speed={2} className="scale-125" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
