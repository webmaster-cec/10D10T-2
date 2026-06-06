import { useState, useEffect, useRef } from 'react';
import { useSheetData } from '../hooks/useSheetData';
import { TaskSkeleton } from '../components/LoadingSpinner';
import { motion, AnimatePresence, animate } from 'framer-motion';
import SpaceBackground from '../components/Backgrounds/SpaceBackground';
import { Box, List, LayoutGrid, Send } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ComingSoon from '../components/ComingSoon';
import { isEventStarted } from '../constants';

const AnimatedCounter = ({ value, className }) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (node) {
      const controls = animate(0, value, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = Math.round(value);
        }
      });
      return () => controls.stop();
    }
  }, [value]);

  return <span ref={nodeRef} className={className}>{value}</span>;
};


const Tasks = () => {
  const { tasks, loading, error } = useSheetData();
  const [activeDay, setActiveDay] = useState(0);
  const [layout, setLayout] = useState('minimal'); // 'minimal' or 'grid'
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    
    // Disable AOS animations after initial load (e.g., when toggling grid/list)
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1500);

    if (tasks && tasks.length > 0) {
      const activeIdx = tasks.findIndex(t => t['Current Status'] === 'Active');
      if (activeIdx !== -1) {
        setActiveDay(activeIdx);
      }
    }
    
    return () => clearTimeout(timer);
  }, [tasks]);

  if (!isEventStarted()) {
    return (
      <div className="min-h-screen bg-black pt-32">
        <ComingSoon id="tasks" title="Tasks" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col pt-24 px-6 md:px-20 relative">
        <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
          <SpaceBackground />
        </div>
        <div className="max-w-3xl mx-auto w-full space-y-4 relative z-10">
          {[1, 2, 3, 4, 5].map(i => <TaskSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="border border-red-500/20 p-12 bg-red-500/5 backdrop-blur-xl text-center">
          <h2 className="text-4xl font-title text-red-500 mb-2 italic">LINK_FAILURE</h2>
          <p className="text-white/30 font-mono text-xs tracking-widest">{error}</p>
        </div>
      </div>
    );
  }

  const currentActiveIdx = tasks?.findIndex(t => t['Current Status'] === 'Active') ?? -1;
  const activeCount = currentActiveIdx > -1 ? 1 : 0;
  const expiredCount = currentActiveIdx > -1 ? currentActiveIdx : (tasks?.length || 0);
  const leftCount = tasks ? tasks.length - expiredCount - activeCount : 0;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black flex flex-col pt-32 md:pt-48 font-body">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <SpaceBackground />
      </div>

      {/* Minimalist Header */}
      <header className="relative w-full z-30 mb-6 md:mb-10 flex flex-col items-center text-center px-4">
         <h1 className="text-5xl sm:text-7xl md:text-[100px] font-title uppercase leading-none bg-gradient-to-b from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent drop-shadow-sm mb-4 md:mb-6">
           Tasks
         </h1>
         
         <blockquote className="text-xl md:text-3xl font-body font-light italic text-zinc-300 text-center leading-relaxed max-w-3xl">
           "Action is the foundational key to all <strong className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 not-italic">success</strong>."
         </blockquote>
         
         <div className="w-8 h-px bg-white/20 my-4 md:my-6"></div>
         <p className="text-xs md:text-xl text-zinc-400 font-body max-w-2xl px-4">
           Your daily directives. Complete the active mission before the deadline to earn points.
         </p>
         
         {/* Stats Bar (Redesigned) */}
         <div className="flex items-center justify-center gap-6 md:gap-12 mt-8 md:mt-10 w-full max-w-2xl px-4">
           <div className="flex flex-col items-center gap-1">
             <AnimatedCounter value={activeCount} className="text-3xl md:text-4xl font-title text-green-500" />
             <span className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-bold">Active</span>
           </div>
           <div className="w-px h-10 bg-white/10"></div>
           <div className="flex flex-col items-center gap-1">
             <AnimatedCounter value={leftCount} className="text-3xl md:text-4xl font-title text-white" />
             <span className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-bold">Locked</span>
           </div>
           <div className="w-px h-10 bg-white/10"></div>
           <div className="flex flex-col items-center gap-1">
             <AnimatedCounter value={expiredCount} className="text-3xl md:text-4xl font-title text-zinc-600" />
             <span className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-bold">Expired</span>
           </div>
         </div>
      </header>

      {/* Toolbar immediately above the list */}
      <div className="w-full max-w-[1400px] mx-auto flex justify-center md:justify-end items-end mb-6 px-6 md:px-20 relative z-30">
        <div className="relative flex bg-zinc-950/80 p-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-xl w-48">
          {/* Animated Background Pill */}
          <div 
             className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0" 
             style={{ left: layout === 'minimal' ? '6px' : '50%' }}
          />
          <button
            onClick={() => setLayout('minimal')}
            className={`flex-1 relative flex justify-center items-center gap-2 py-2 rounded-full transition-colors duration-500 z-10 ${layout === 'minimal' ? 'text-black' : 'text-zinc-400 hover:text-white'}`}
          >
            <List size={14} className={layout === 'minimal' ? 'stroke-[3px]' : 'stroke-2'} />
            <span className={`text-[10px] uppercase tracking-widest pt-0.5 ${layout === 'minimal' ? 'font-black' : 'font-bold'}`}>List</span>
          </button>
          <button
            onClick={() => setLayout('grid')}
            className={`flex-1 relative flex justify-center items-center gap-2 py-2 rounded-full transition-colors duration-500 z-10 ${layout === 'grid' ? 'text-black' : 'text-zinc-400 hover:text-white'}`}
          >
            <LayoutGrid size={14} className={layout === 'grid' ? 'stroke-[3px]' : 'stroke-2'} />
            <span className={`text-[10px] uppercase tracking-widest pt-0.5 ${layout === 'grid' ? 'font-black' : 'font-bold'}`}>Grid</span>
          </button>
        </div>
      </div>

      <div className="flex-1 relative z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          {layout === 'minimal' ? (
              <motion.div
              key="minimal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-y-auto overflow-x-hidden custom-scrollbar px-6 md:px-20 pb-20"
            >
              <div className="max-w-4xl mx-auto space-y-6">
                {tasks?.map((task, idx) => {
                  const isFuture = idx > currentActiveIdx;
                  const isActive = idx === activeDay;
                  const isLive = task['Current Status'] === 'Active';

                  return (
                    <motion.div
                      key={idx}
                      {...(isInitialLoad ? { 'data-aos': 'fade-up', 'data-aos-delay': (idx % 10) * 50 } : {})}
                      className={`group relative mb-4 transition-all rounded-2xl duration-500 border overflow-hidden ${isFuture
                        ? 'border-white/5 opacity-40 grayscale'
                        : isLive
                          ? 'border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.05)] hover:bg-white hover:border-white'
                          : isActive
                            ? 'border-white/20 bg-white/[0.02] hover:bg-white hover:border-white'
                            : 'border-white/10 hover:border-white hover:bg-white'
                        }`}
                    >
                      <button
                        onClick={() => !isFuture && setActiveDay(idx)}
                        disabled={isFuture}
                        className={`w-full text-left p-4 md:p-8 flex items-center gap-3 md:gap-8 transition-all duration-500 ${isFuture ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        {/* Numbering */}
                        <span className={`font-body text-xs md:text-sm tracking-tighter transition-colors duration-300 ${isFuture ? 'text-white/50' : isActive ? 'text-white group-hover:text-black' : 'text-white group-hover:text-black'}`}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>

                        {/* Title Main */}
                        <div className="flex-1 flex flex-row items-center justify-between gap-3 md:gap-6 min-w-0">
                          <div className="relative pl-4 md:pl-6 flex-1 min-w-0 flex items-center gap-4">
                            <h3 className={`text-xl sm:text-lg md:text-3xl font-title font-bold transition-all duration-300 break-words ${isFuture ? 'blur-md select-none' : isActive ? 'text-white group-hover:text-black' : 'text-white/40 group-hover:text-black'
                              }`}>
                              {isFuture ? 'DATA_PROTECTED' : (task.Title || 'NULL_SET')}
                            </h3>
                            {isActive && !isFuture && (
                              <motion.div
                                layoutId="activeArrow"
                                className="absolute left-0 top-1/2 -translate-y-1/2 text-white group-hover:text-black transition-colors duration-300 text-xs font-bold"
                              >
                                →
                              </motion.div>
                            )}
                          </div>

                          <div className="flex items-center gap-3 md:gap-8 pr-1 md:pr-4 shrink-0">
                            {!isFuture && (
                              <div className="hidden md:flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse' : 'bg-zinc-500'}`} />
                                <span className={`text-[9px] uppercase tracking-widest font-bold ${isLive ? 'text-green-500 group-hover:text-black' : 'text-zinc-500 group-hover:text-black'} transition-colors duration-300`}>
                                  {isLive ? 'Active' : 'Expired'}
                                </span>
                              </div>
                            )}
                            {!isFuture && (
                              <>
                                <div className="flex flex-col items-end">
                                  <span className="font-mono text-[8px] md:text-[8px] text-white uppercase tracking-[0.2em] transition-colors duration-300 group-hover:text-zinc-600">Points</span>
                                  <span className={`font-body text-sm md:text-xl transition-colors duration-300 ${isActive ? 'text-white font-bold group-hover:text-black' : 'text-white/70 group-hover:text-black'}`}>{task.Points}</span>
                                </div>
                                <div className={`md:hidden w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${isLive ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,1)]' : 'bg-white/5'}`} />
                              </>
                            )}
                            {isFuture && <Box size={14} className="text-white/10" />}
                          </div>
                        </div>
                      </button>

                      {/* Detail Expansion */}
                      <AnimatePresence>
                        {isActive && !isFuture && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-white/[0.01]"
                          >
                            <div className="px-6 md:px-8 pb-8 md:pb-10 pl-10 md:pl-28 max-w-4xl">
                              <p className="text-sm md:text-xl text-white group-hover:text-zinc-800 transition-colors duration-500 font-body leading-relaxed mb-8 md:mb-10 selection:bg-white selection:text-black break-words">
                                {task.Description}
                              </p>

                              <div className="flex flex-wrap items-center gap-x-6 md:gap-x-12 gap-y-4 text-[8px] md:text-[11px] font-body text-white/20 uppercase tracking-[0.2em] md:tracking-[0.3em]">
                                <div className="flex items-center gap-2">
                                  <span className="text-white group-hover:text-zinc-600 transition-colors duration-500">Window:</span>
                                  <span className="text-white group-hover:text-black transition-colors duration-500">{task['Target Date']}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-white group-hover:text-zinc-600 transition-colors duration-500">Status:</span>
                                  <span className={`tracking-widest transition-colors duration-500 ${isLive ? 'text-green-500/60 group-hover:text-green-600' : 'text-white/40 group-hover:text-zinc-500'}`}>{task['Current Status']}</span>
                                </div>

                                {isLive && (
                                  <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => task['Submission Link'] && window.open(task['Submission Link'], '_blank')}
                                    className="mt-4 md:mt-0 md:ml-auto w-full md:w-auto px-8 py-3 bg-white hover:bg-black hover:text-white border border-black hover:border-white text-black font-black uppercase tracking-[0.2em] text-[10px] shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-transform flex items-center justify-center gap-3"
                                  >
                                    Submit
                                    <Send size={12} className="stroke-[3px]" />
                                  </motion.button>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Locked Overlay for Future Tasks */}
                      {isFuture && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] z-20">
                          <div className="flex flex-col items-center gap-3">
                            <Box size={20} className="text-white" />
                            <span className="font-mono text-[10px] text-white tracking-[.5em] uppercase whitespace-nowrap">Locked</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full overflow-y-auto overflow-x-hidden px-6 md:px-20 pb-20 custom-scrollbar"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {tasks?.map((task, idx) => {
                  const isFuture = idx > currentActiveIdx;
                  const isLive = task['Current Status'] === 'Active';

                  return (
                    <motion.div
                      key={idx}
                      {...(isInitialLoad ? { 'data-aos': 'fade-up', 'data-aos-delay': (idx % 10) * 100 } : {})}
                      onClick={() => !isFuture && (setActiveDay(idx), setLayout('minimal'))}
                      className={`relative group p-6 md:p-8 rounded-[32px] border overflow-hidden transition-all duration-500 ${isFuture
                        ? 'border-white/5 bg-transparent'
                        : isLive
                          ? 'border-green-500/30 bg-zinc-900/60 shadow-[0_10px_40px_rgba(234,179,8,0.1)] cursor-pointer hover:bg-white hover:border-white'
                          : 'border-white/10 bg-zinc-900/40 hover:bg-white hover:border-white cursor-pointer'
                        }`}
                    >
                      {/* Optional hover gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                      <div className={`relative z-10 flex flex-col h-full transition-all duration-700 ${isFuture ? 'blur-md opacity-20' : ''}`}>
                        
                        <div className="flex justify-between items-start mb-8">
                          <div className="flex flex-col">
                            <span className="font-mono text-xs md:text-sm text-white group-hover:text-black tracking-[0.2em] uppercase font-bold transition-colors duration-300">{task.Day}</span>
                          </div>
                          {!isFuture && (
                            <div className="flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse' : 'bg-zinc-500 group-hover:bg-zinc-400 transition-colors duration-300'}`} />
                              <span className={`text-[9px] uppercase tracking-widest font-bold ${isLive ? 'text-green-500' : 'text-zinc-500 group-hover:text-black'} transition-colors duration-300`}>
                                {isLive ? 'Active' : 'Expired'}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-3xl md:text-4xl font-title uppercase leading-[1.1] mb-4 text-white group-hover:text-black transition-colors duration-300">
                            {isFuture ? 'PROTECTED' : task.Title}
                          </h3>
                          <p className="text-xs md:text-sm text-zinc-400 group-hover:text-zinc-600 font-body leading-relaxed line-clamp-3 transition-colors duration-300">
                            {isFuture ? 'Unauthorized access attempt detected. Data stream severed.' : task.Description}
                          </p>
                        </div>

                        {!isFuture && (
                          <div className="flex flex-col gap-4 mt-8">
                            <div className="flex items-center justify-between pt-4 border-t border-white/10 group-hover:border-black/10 transition-colors duration-300">
                              <span className="font-body text-[9px] md:text-[10px] text-zinc-500 group-hover:text-zinc-500 tracking-[0.2em] uppercase transition-colors duration-300">Reward</span>
                              <span className="font-title text-2xl md:text-4xl text-white group-hover:text-black uppercase tracking-wider transition-colors duration-300">{task.Points} <span className="text-[10px] text-zinc-500 group-hover:text-zinc-500 ml-1 transition-colors duration-300">PTS</span></span>
                            </div>

                            {isLive && (
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (task['Submission Link']) window.open(task['Submission Link'], '_blank');
                                }}
                                className="w-full py-3 bg-white hover:bg-black text-black hover:text-white border border-black font-title text-sm font-bold uppercase tracking-widest shadow-lg transition-colors flex items-center justify-center gap-3 rounded-[16px]"
                              >
                                Submit Task
                                <Send size={14} className="stroke-[3px]" />
                              </motion.button>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Locked Overlay for Future Tasks */}
                      {isFuture && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                          <div className="flex flex-col items-center gap-3 bg-black/80 px-6 py-4 rounded-2xl border border-white/5">
                            <Box size={24} className="text-zinc-500" />
                            <span className="font-mono text-[10px] text-zinc-400 tracking-[0.5em] uppercase whitespace-nowrap">Locked</span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};

export default Tasks;
