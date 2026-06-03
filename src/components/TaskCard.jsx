import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TaskCard = ({ task, compact = false }) => {
  const isLocked = task['Current Status'] === 'Locked';
  const isActive = task['Current Status'] === 'Active';

  if (compact) {
    return (
      <motion.div
        whileHover={{ translateY: -2, backgroundColor: "rgba(255,255,255,0.05)" }}
        className="min-w-32 p-6 bg-transparent border border-white/20 rounded-none flex flex-col gap-4 shrink-0 cursor-pointer transition-all duration-300 relative group"
      >
        <span className="font-mono text-xs text-white/60 uppercase tracking-widest">{task.Day}</span>
        <div className="w-1 h-1 rounded-full bg-white opacity-40 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    );
  }

  return (
    <div className={`w-full p-8 md:p-12 bg-zinc-900/40 backdrop-blur-sm border border-white/20 flex flex-col gap-8 group transition-all duration-500 hover:border-white/40 relative ${isLocked ? 'opacity-40 grayscale' : ''}`}>
      <div className="flex justify-between items-start border-b border-white/10 pb-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl md:text-4xl font-title text-white uppercase tracking-wide leading-tight">
            {isLocked ? 'Locked Objective' : (task.Title || 'Untitled Task')}
          </h3>
          <span className="text-[12px] font-mono text-white/80 uppercase tracking-[0.5em] pl-1">
            {task.Day}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] block mb-1">Points</span>
          <span className="text-xl font-body text-white">{task.Points || '00'} Pts</span>
        </div>
      </div>

      <div className="max-w-2xl">
        <p className="text-sm md:text-base text-white font-light leading-relaxed font-body tracking-wider">
          {isLocked
            ? "Access Restricted. Operational data encrypted."
            : task.Description}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-white/40'}`} />
            <span className={`text-[10px] font-mono uppercase tracking-[0.2em] ${isActive ? 'text-white' : 'text-white/60'}`}>
              {task['Current Status']}
            </span>
          </div>
          <span className="text-[12px] font-sans text-white/80 uppercase tracking-[0.2em]">
            {task['Target Date']}
          </span>
        </div>

        {!isLocked && isActive && (
          <a
            href={task['Submission Link']}
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-8 py-3 group/btn cursor-pointer overflow-hidden transition-all duration-300 block"
          >
            {/* Background Hover Effect */}
            <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />

            {/* Border */}
            <div className="absolute inset-0 border border-white/30 group-hover/btn:border-white transition-colors" />

            {/* Text */}
            <span className="relative z-10 text-[9px] font-mono text-white/90 uppercase tracking-[0.4em] group-hover/btn:text-black transition-colors duration-300">
              Submit_Task
            </span>
          </a>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
