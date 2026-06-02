import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSheetData } from '../../hooks/useSheetData';
import { ArrowUpRight, Lock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css';

gsap.registerPlugin(ScrollTrigger);

const TasksPreview = () => {
  const { tasks, loading: tasksLoading } = useSheetData();
  const sectionRef = useRef(null);

  const getDisplayTasks = () => {
    if (!tasks || tasks.length === 0) return [];

    const activeIndex = tasks.findIndex(task => task['Current Status'] === 'Active');

    if (activeIndex === -1) {
      const firstLockedIndex = tasks.findIndex(t => t['Current Status'] === 'Locked');
      if (firstLockedIndex !== -1) {
        if (firstLockedIndex === 0) return tasks.slice(0, 3);
        const start = Math.max(0, firstLockedIndex - 1);
        return tasks.slice(start, start + 3);
      }
      return tasks.slice(-3);
    }

    const start = Math.max(0, Math.min(activeIndex - 1, tasks.length - 3));
    return tasks.slice(start, start + 3);
  };

  const displayTasks = getDisplayTasks().filter(Boolean);
  const completedCount = tasks ? (() => {
    const activeIndex = tasks.findIndex(t => t['Current Status'] === 'Active');
    if (activeIndex !== -1) return activeIndex + 1;
    const firstLockedIndex = tasks.findIndex(t => t['Current Status'] === 'Locked');
    if (firstLockedIndex !== -1) return firstLockedIndex;
    if (tasks.some(t => t['Current Status'] === 'Expired')) return tasks.length;
    return 0;
  })() : 0;
  const totalTasks = tasks && tasks.length > 0 ? tasks.length : 10;

  // GSAP Animation for Progress Dots
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    if (tasksLoading) return;

    let ctx = gsap.context(() => {
      // Force initial hidden state instantly
      gsap.set('.progress-dot', {
        backgroundColor: 'transparent',
        borderColor: '#3f3f46',
        boxShadow: 'none'
      });

      // Animate completed dots sequentially when section is scrolled into view
      gsap.to('.progress-dot.is-completed', {
        backgroundColor: '#ffffff',
        borderColor: '#ffffff',
        boxShadow: '0 0 8px rgba(255,255,255,0.6)',
        duration: 1,
        stagger: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [tasksLoading, completedCount]);

  return (
    <section ref={sectionRef} className="relative h-[100vh] w-full flex flex-col bg-black items-center justify-between font-body py-10 md:py-16 overflow-hidden">
      {/* Top blending gradient */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black via-black/80 to-transparent z-30 pointer-events-none" />

      <div className="relative z-20 w-full max-w-7xl px-6 md:px-12 flex flex-col h-full justify-between">

        {/* Header - Horizontal and Compact */}
        <header className="flex items-end justify-between border-b border-white/20 pb-4 shrink-0">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.4em] mb-2">Operations</span>
            <h2 className="text-4xl md:text-[100px] font-title font-light text-white uppercase tracking-[0.1em] leading-none">
              Tasks
            </h2>
          </div>

          {/* Minimalist Sequential Dot Progress */}
          <div className="flex flex-col items-end justify-end">
            <div className="flex justify-end w-full mb-1 md:mb-2">
              <span className="text-[9px] font-body text-white/80 uppercase tracking-widest">Progress</span>
            </div>

            <div className="flex gap-1.5 md:gap-2 items-center">
              {[...Array(totalTasks)].map((_, i) => {
                const isCompleted = i < completedCount;
                return (
                  <div
                    key={i}
                    className={`progress-dot w-2 h-2 md:w-2.5 md:h-2.5 rounded-full border-[1.5px] ${isCompleted ? 'is-completed' : ''}`}
                    style={{ backgroundColor: 'transparent', borderColor: '#3f3f46' }}
                  />
                );
              })}
            </div>

            <span className="text-[9px] md:text-[10px] font-sans text-white tracking-widest mt-1.5 md:mt-2">
              {completedCount.toString().padStart(2, '0')} / {totalTasks.toString().padStart(2, '0')}
            </span>
          </div>
        </header>

        {/* Flexible List Display */}
        <div className="flex flex-col gap-4 w-full flex-grow my-6 md:my-10 relative z-10 min-h-0 max-w-5xl mx-auto">
          {tasksLoading ? (
            [...Array(3)].map((_, idx) => (
              <div key={idx} className={`w-full h-24 bg-zinc-900/20 animate-pulse border border-white/10 ${idx === 2 ? 'hidden md:block' : 'block'}`} />
            ))
          ) : (
            displayTasks.map((task, idx) => {
              const globalActiveIndex = tasks.findIndex(t => t['Current Status'] === 'Active');
              const taskIndex = tasks.indexOf(task);

              const isLive = task['Current Status'] === 'Active';
              const isLocked = globalActiveIndex !== -1 ? taskIndex > globalActiveIndex : task['Current Status'] === 'Locked';
              const isExpired = globalActiveIndex !== -1 ? taskIndex < globalActiveIndex : task['Current Status'] === 'Expired';

              const textColor = isLive ? 'text-[#00ff9d] group-hover:text-black' : isLocked ? 'text-white/50' : 'text-white group-hover:text-black';
              const subTextColor = isLive ? 'text-[#00ff9d]/70 group-hover:text-black/70' : isLocked ? 'text-zinc-600' : 'text-zinc-400 group-hover:text-zinc-700';

              return (
                <Link
                  key={task.Day}
                  to="/tasks"
                  data-aos="fade-up"
                  data-aos-delay={idx * 150}
                  className={`group relative flex flex-col md:flex-row md:items-center justify-between p-6 border rounded-xl transition-all duration-300 overflow-hidden ${idx === 2 ? 'hidden md:flex' : 'flex'} ${isLocked
                    ? 'border-white/5 bg-transparent cursor-not-allowed opacity-40'
                    : isLive
                      ? 'border-[#00ff9d]/70 bg-black hover:bg-[#00ff9d] cursor-pointer'
                      : 'border-white/40 bg-black hover:bg-white cursor-pointer'
                    }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 w-full transition-colors duration-300">

                    {/* Left: Day & Status */}
                    <div className="flex items-center justify-between md:justify-start gap-6 md:w-1/4 shrink-0">
                      <span className={`font-body text-md md:text-2xl tracking-widest uppercase font-semibold ${textColor}`}>
                        {task.Day}
                      </span>
                      {isLive && (
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-sans uppercase font-bold tracking-widest ${textColor}`}>Active</span>
                          <motion.div
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className={`w-2 h-2 rounded-full bg-[#00ff9d] group-hover:bg-black`}
                          />
                        </div>
                      )}
                      {isExpired && (
                        <div className="flex items-center gap-2 opacity-60">
                          <span className={`text-[10px] font-mono uppercase font-bold tracking-widest ${textColor}`}>Expired</span>
                          <div className={`w-2 h-2 rounded-full bg-white group-hover:bg-black`} />
                        </div>
                      )}
                      {isLocked && (
                        <div className="flex items-center gap-1.5 opacity-50">
                          <span className={`text-[10px] font-mono uppercase font-bold tracking-widest ${textColor}`}>Locked</span>
                          <Lock className={`w-3 h-3 ${textColor}`} strokeWidth={2} />
                        </div>
                      )}
                    </div>

                    {/* Middle: Title & Desc */}
                    <div className="flex-grow flex flex-col justify-center">
                      <h3 className={`text-2xl md:text-3xl font-title font-light uppercase tracking-wide mb-1 ${textColor} line-clamp-1`}>
                        {isLocked ? 'Restricted' : task.Title}
                      </h3>
                      {!isLocked && (
                        <p className={`text-[11px] md:text-lg font-light line-clamp-1 font-body ${subTextColor}`}>
                          {task.Description}
                        </p>
                      )}
                    </div>

                    {/* Right: Points */}
                    {!isLocked && (
                      <div className="flex items-center gap-4 md:gap-8 justify-between md:justify-end shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/10 md:border-transparent group-hover:border-black/10">
                        <div className="flex flex-col md:items-end">
                          <span className={`font-mono text-[9px] tracking-[0.2em] uppercase mb-1 ${subTextColor}`}>Points</span>
                          <span className={`font-title text-xl md:text-2xl uppercase font-light tracking-wider ${textColor}`}>
                            {task.Points}
                          </span>
                        </div>
                        <ArrowUpRight className={`w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${textColor}`} strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* View All CTA - Pushed to bottom */}
        <div className="flex justify-center shrink-0 relative z-10">
          <Link
            to="/tasks"
            className="group flex items-center gap-3 px-8 py-3 bg-white border border-white text-black transition-colors duration-300 hover:bg-black hover:text-white"
          >
            <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase">
              Explore Timeline
            </span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2} />
          </Link>
        </div>

      </div>

      {/* Bottom blending gradient */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black via-black/80 to-transparent z-30 pointer-events-none" />
    </section>
  );
};

export default TasksPreview;



