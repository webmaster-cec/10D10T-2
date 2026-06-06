import React from 'react';
import { motion } from 'framer-motion';

const ComingSoon = ({ title, id }) => {
  return (
    <section id={id} className="relative min-h-[40vh] md:min-h-[60vh] w-full flex flex-col bg-black items-center justify-center font-body py-10 md:py-20 overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 text-center px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-title font-light text-white uppercase tracking-[0.1em] leading-none mb-6">
                {title} <br className="hidden md:block" /> Coming Soon
            </h2>
            <div className="h-px w-24 md:w-48 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mt-8 md:mt-12" />
        </motion.div>
      </div>
    </section>
  );
};

export default ComingSoon;
