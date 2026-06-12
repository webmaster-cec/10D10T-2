import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TableSkeleton } from '../components/LoadingSpinner';
import AOS from 'aos';
import 'aos/dist/aos.css';

const LandingLeaderboardBento = ({ data }) => {
  if (!data || data.length === 0) return null;
  const [first, second, third, fourth, fifth] = data;
  const rest = data.slice(5);

  return (
    <div className="grid grid-cols-2 gap-2 md:gap-6 p-1 md:p-6">
      {/* 1st Place */}
      <motion.div
        data-aos="fade-up"
        data-aos-delay="100"
        whileHover={{ scale: 1.01 }}
        className="group relative col-span-1 row-span-2 rounded-[24px] md:rounded-xl p-4 md:p-12 overflow-hidden flex flex-col justify-end min-h-[140px] md:min-h-[500px] border border-yellow-400 bg-yellow-400 md:bg-zinc-950 md:border-yellow-500/20 transition-all duration-500 md:hover:bg-yellow-400 md:hover:border-yellow-400"
      >
        <div className="absolute inset-0 opacity-0 md:opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-500/40 via-transparent to-transparent transition-opacity duration-500 md:group-hover:opacity-0"></div>
        <div className="absolute top-4 right-4 md:top-8 md:right-10 text-[80px] md:text-[200px] font-title leading-none opacity-10 text-black md:text-yellow-500 md:opacity-5 select-none transition-colors duration-500 md:group-hover:text-black md:group-hover:opacity-10">
          1
        </div>
        <div className="relative z-10">
          <div className="text-white md:text-yellow-500 font-bold tracking-[0.2em] md:tracking-[0.3em] text-[8px] md:text-xs uppercase mb-2 md:mb-6 flex items-center gap-1 md:gap-3 transition-colors duration-500 md:group-hover:text-black">
            Current Leader
          </div>
          <h3 className="text-2xl md:text-7xl font-title uppercase text-white  md:text-white mb-1 md:mb-2 break-words leading-tight transition-colors duration-500 md:group-hover:text-black">{first?.Name}</h3>
          <div className="mt-2 md:mt-6 flex flex-row items-baseline gap-1.5 md:gap-3">
            <span className="text-3xl md:text-8xl font-title text-white drop-shadow-none md:text-yellow-400 transition-all duration-500 md:group-hover:text-black ">{first?.Score}</span>
            <span className="text-[10px] md:text-xl font-bold text-white/60 md:text-yellow-500/80 transition-colors duration-500 md:group-hover:text-black/60 tracking-[0.2em]">PTS</span>
          </div>
        </div>
      </motion.div>

      {/* 2nd Place */}
      <motion.div
        data-aos="fade-up"
        data-aos-delay="200"
        whileHover={{ scale: 1.02 }}
        className="group relative col-span-1 rounded-[20px] md:rounded-xl p-3 md:p-8 overflow-hidden flex flex-col justify-center min-h-[70px] md:min-h-[240px] border border-gray-300 bg-gray-400 md:bg-zinc-950 md:border-gray-400/20 transition-all duration-500 md:hover:bg-gray-300 md:hover:border-gray-300"
      >
        <div className="absolute inset-0 opacity-0 md:opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-400/30 via-transparent to-transparent transition-opacity duration-500 md:group-hover:opacity-0"></div>
        <div className="absolute top-2 right-4 md:top-4 md:right-8 text-[60px] md:text-[120px] font-title leading-none opacity-10 text-black md:text-gray-300 md:opacity-5 select-none transition-colors duration-500 md:group-hover:text-black md:group-hover:opacity-10">
          2
        </div>
        <div className="relative z-10">
          <div className="text-white/60 md:text-gray-400 font-bold tracking-[0.1em] md:tracking-[0.2em] text-[7px] md:text-[10px] uppercase mb-1 md:mb-4 transition-colors duration-500 md:group-hover:text-black/60">Silver Rank</div>
          <h3 className="text-base md:text-5xl font-title uppercase text-white md:text-white mb-0.5 md:mb-1 break-words leading-tight transition-colors duration-500 md:group-hover:text-black">{second?.Name}</h3>
          <div className="mt-1 md:mt-4 flex flex-row items-baseline gap-1 md:gap-2">
            <span className="text-xl md:text-6xl font-title text-white drop-shadow-none md:text-gray-300 transition-all duration-500 md:group-hover:text-black">{second?.Score}</span>
            <span className="text-[8px] md:text-base font-bold text-white/60 md:text-gray-400/80 transition-colors duration-500 md:group-hover:text-black/60 tracking-[0.2em]">PTS</span>
          </div>
        </div>
      </motion.div>

      {/* 3rd Place */}
      <motion.div
        data-aos="fade-up"
        data-aos-delay="300"
        whileHover={{ scale: 1.02 }}
        className="group relative col-span-1 rounded-[20px] md:rounded-xl p-3 md:p-8 overflow-hidden flex flex-col justify-center min-h-[70px] md:min-h-[240px] border border-amber-500 bg-amber-500 md:bg-zinc-950 md:border-amber-600/20 transition-all duration-500 md:hover:bg-amber-500 md:hover:border-amber-500"
      >
        <div className="absolute inset-0 opacity-0 md:opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-600/30 via-transparent to-transparent transition-opacity duration-500 md:group-hover:opacity-0"></div>
        <div className="absolute top-2 right-4 md:top-4 md:right-8 text-[60px] md:text-[120px] font-title leading-none opacity-10 text-black md:text-amber-600 md:opacity-5 select-none transition-colors duration-500 md:group-hover:text-black md:group-hover:opacity-10">
          3
        </div>
        <div className="relative z-10">
          <div className="text-black/60 md:text-amber-600 font-bold tracking-[0.1em] md:tracking-[0.2em] text-[7px] md:text-[10px] uppercase mb-1 md:mb-4 transition-colors duration-500 md:group-hover:text-black/60">Bronze Rank</div>
          <h3 className="text-base md:text-5xl font-title uppercase text-white md:text-white mb-0.5 md:mb-1 break-words leading-tight transition-colors duration-500 md:group-hover:text-black">{third?.Name}</h3>
          <div className="mt-1 md:mt-4 flex flex-row items-baseline gap-1 md:gap-2">
            <span className="text-xl md:text-6xl font-title text-white drop-shadow-none md:text-amber-500 transition-all duration-500 md:group-hover:text-black">{third?.Score}</span>
            <span className="text-[8px] md:text-base font-bold text-white/60 md:text-amber-600/80 transition-colors duration-500 md:group-hover:text-black/60 tracking-[0.2em]">PTS</span>
          </div>
        </div>
      </motion.div>

      {/* 4th Place */}
      {fourth && (
        <motion.div
          data-aos="fade-up"
          data-aos-delay="400"
          whileHover={{ scale: 1.02 }}
          className="group relative col-span-2 md:col-span-1 rounded-[16px] md:rounded-xl p-4 md:p-6 overflow-hidden flex flex-col justify-center min-h-[70px] md:min-h-[160px] border border-white bg-white md:bg-zinc-950 md:border-white/20 transition-all duration-500 md:hover:bg-white md:hover:border-white"
        >
          <div className="absolute inset-0 opacity-0 md:opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent transition-opacity duration-500 md:group-hover:opacity-0"></div>
          <div className="absolute top-0 md:top-2 right-4 md:right-8 text-[32px] md:text-[80px] font-title leading-none opacity-[0.4] text-black md:text-white md:opacity-5 select-none transition-colors duration-500 md:group-hover:text-black md:group-hover:opacity-[0.4]">
            4
          </div>
          <div className="relative z-10 flex md:flex-col items-center md:items-start justify-between md:justify-start">
            <div className="flex flex-col md:block flex-1 min-w-0 pr-2 md:pr-0">
              <div className="text-black/50 md:text-white/40 font-bold tracking-[0.2em] text-[8px] md:text-[9px] uppercase mb-0.5 md:mb-2 transition-colors duration-500 md:group-hover:text-black/50">Runner Up</div>
              <h3 className="text-xl md:text-3xl font-title uppercase text-black md:text-white break-words leading-tight transition-colors duration-500 md:group-hover:text-black">{fourth?.Name}</h3>
            </div>
            <div className="mt-5 md:mt-2 flex items-baseline gap-1 md:gap-1.5 shrink-0">
              <span className="text-2xl md:text-4xl font-title text-black drop-shadow-none md:text-white transition-all duration-500 md:group-hover:text-black">{fourth?.Score}</span>
              <span className="text-[10px] md:text-xs font-bold text-black/50 md:text-white/60 transition-colors duration-500 md:group-hover:text-black/50 tracking-[0.2em]">PTS</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* 5th Place */}
      {fifth && (
        <motion.div
          data-aos="fade-up"
          data-aos-delay="500"
          whileHover={{ scale: 1.02 }}
          className="group relative col-span-2 md:col-span-1 rounded-[16px] md:rounded-xl p-4 md:p-6 overflow-hidden flex flex-col justify-center min-h-[70px] md:min-h-[160px] border border-white bg-white md:bg-zinc-950 md:border-white/20 transition-all duration-500 md:hover:bg-white md:hover:border-white"
        >
          <div className="absolute inset-0 opacity-0 md:opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent transition-opacity duration-500 md:group-hover:opacity-0"></div>
          <div className="absolute top-0 md:top-2 right-4 md:right-8 text-[32px] md:text-[80px] font-title leading-none opacity-[0.4] text-black md:text-white md:opacity-5 select-none transition-colors duration-500 md:group-hover:text-black md:group-hover:opacity-[0.4]">
            5
          </div>
          <div className="relative z-10 flex md:flex-col items-center md:items-start justify-between md:justify-start">
            <div className="flex flex-col md:block flex-1 min-w-0 pr-2 md:pr-0">
              <div className="text-black/50 md:text-white/40 font-bold tracking-[0.2em] text-[8px] md:text-[9px] uppercase mb-0.5 md:mb-2 transition-colors duration-500 md:group-hover:text-black/50">Runner Up</div>
              <h3 className="text-xl md:text-3xl font-title uppercase text-black md:text-white break-words leading-tight transition-colors duration-500 md:group-hover:text-black">{fifth?.Name}</h3>
            </div>
            <div className="mt-5 md:mt-2 flex items-baseline gap-1 md:gap-1.5 shrink-0">
              <span className="text-2xl md:text-4xl font-title text-black drop-shadow-none md:text-white transition-all duration-500 md:group-hover:text-black">{fifth?.Score}</span>
              <span className="text-[10px] md:text-xs font-bold text-black/50 md:text-white/60 transition-colors duration-500 md:group-hover:text-black/50 tracking-[0.2em]">PTS</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Ranks 6+ */}
      {rest.map((player, idx) => (
        <motion.div
          data-aos="fade-up"
          data-aos-delay={(idx % 10) * 50}
          key={player.Name}
          whileHover={{ scale: 1.02 }}
          className="group relative col-span-2 md:col-span-1 rounded-[16px] md:rounded-xl p-4 md:p-6 overflow-hidden flex flex-col justify-center min-h-[70px] md:min-h-[160px] border border-white bg-white md:bg-zinc-950 md:border-white/20 transition-all duration-500 md:hover:bg-white md:hover:border-white"
        >
          <div className="absolute inset-0 opacity-0 md:opacity-[0.03] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent transition-opacity duration-500 md:group-hover:opacity-0"></div>
          <div className="absolute top-1 md:top-2 right-4 md:right-8 text-[32px] md:text-[80px] font-title leading-none opacity-[0.4] text-black md:text-white md:opacity-5 select-none transition-colors duration-500 md:group-hover:text-black md:group-hover:opacity-[0.4]">
            {player.Rank}
          </div>
          <div className="relative z-10 flex md:flex-col items-center md:items-start justify-between md:justify-start">
            <div className="flex flex-col md:block flex-1 min-w-0 pr-2 md:pr-0">
              <div className="text-black/50 md:text-white/30 font-bold tracking-[0.2em] text-[7px] md:text-[9px] uppercase mb-0.5 md:mb-2 transition-colors duration-500 md:group-hover:text-black/50">Rank {player.Rank < 10 ? `0${player.Rank}` : player.Rank}</div>
              <h3 className="text-2xl md:text-3xl font-title uppercase text-black md:text-white break-words leading-tight transition-colors duration-500 md:group-hover:text-black">{player.Name}</h3>
            </div>
            <div className="mt-2 md:mt-2 flex items-baseline gap-1 md:gap-1.5 shrink-0">
              <span className="text-2xl md:text-4xl font-title text-black drop-shadow-none md:text-white md:drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-all duration-500 md:group-hover:text-black md:group-hover:drop-shadow-none">{player.Score}</span>
              <span className="text-[10px] md:text-xs font-bold text-black/90 md:text-white/60 transition-colors duration-500 md:group-hover:text-black/50 tracking-[0.2em]">PTS</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
const LeaderboardSection = ({ data, loading, error, refresh, lastUpdated, isLanding = false }) => {
  // Use original order: [Rank 1, Rank 2, Rank 3]
  const podium = data.slice(0, 3);
  const tableData = data.slice(0, 30);

  React.useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className={`w-full bg-black pt-2 text-white ${isLanding ? 'mt-20 md:mt-0 py-12 md:py-20' : 'mt-2 pb-16 md:pt-0 md:pb-24'} px-1 md:px-4 min-h-screen`}>
      <div className="w-full max-w-[1400px] mx-auto">

        {/* Minimalist Header */}
        <header className="relative w-full mb-10 md:mb-16 flex flex-col items-center text-center">
          <h2 className="text-5xl sm:text-7xl md:text-[100px] font-title tracking-wider uppercase leading-none bg-gradient-to-b from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent drop-shadow-sm mb-8 md:mb-10">
            Rankings
          </h2>

          {!isLanding && (
            <>
              <blockquote className="text-xl md:text-3xl font-body font-light italic text-zinc-300 text-center leading-relaxed max-w-3xl">
                "Excellence is not a singular act, but a <strong className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 not-italic">habit</strong>."
              </blockquote>

              <div className="w-8 h-px bg-white/20 my-6 md:my-8 mx-auto"></div>

              <p className="text-xs md:text-lg text-zinc-400 font-body max-w-80 md:max-w-[70vw] md:px-4 mx-auto">
                Welcome to the official leaderboard. Below are the <strong className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Top 30</strong> elite participants. Keep completing challenges to climb the ranks and secure your legacy.
              </p>
            </>
          )}
        </header>

        {/* Toolbar immediately above the list */}
        <div className="w-full flex justify-between items-end mb-4 px-2 md:px-6">
          <div className="flex-1">
            {lastUpdated && (
              <div className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
                Live: {lastUpdated}
              </div>
            )}
          </div>

          {!isLanding && (
            <button
              onClick={refresh}
              disabled={loading}
              className="group flex items-center gap-2 px-4 py-2 border border-white/10 bg-zinc-950/50 hover:bg-white hover:text-black rounded-full text-zinc-400 hover:border-white transition-all duration-300 disabled:opacity-50 backdrop-blur-sm"
            >
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] pt-0.5">Refresh</span>
              <RefreshCw className={`w-3 h-3 md:w-4 md:h-4 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'}`} />
            </button>
          )}
        </div>

        {error ? (
          <div className="py-20 text-center border border-white/10">
            <p className="text-white/20 text-xs uppercase tracking-[0.5em]">{error}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 md:gap-12 w-full">
            <div className="bg-black border-none md:border-solid md:border border-white/10 md:rounded-xl overflow-hidden md:backdrop-blur-md w-full">
              {loading ? (
                <div className="p-20"><TableSkeleton /></div>
              ) : data && data.length > 0 ? (
                <LandingLeaderboardBento data={isLanding ? data.slice(0, 5) : tableData} />
              ) : (
                <div className="relative w-full py-24 md:py-40 flex flex-col items-center justify-center overflow-hidden bg-zinc-950/30 rounded-xl md:rounded-3xl border border-white/5">
                  {/* Background pulses */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.15, 0.05] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-yellow-500/10 blur-3xl"
                    />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 flex flex-col items-center text-center px-6"
                  >
                    {/* Animated Icon */}
                    <div className="relative mb-8">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-dashed border-yellow-500/30 rounded-full scale-125"
                      />
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-white/10 rounded-full scale-[1.4]"
                      />
                      <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-black border border-yellow-500/20 shadow-[0_0_30px_rgba(234,179,8,0.1)] flex items-center justify-center overflow-hidden">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                          className="text-4xl md:text-5xl"
                        >
                          🛰️
                        </motion.div>
                      </div>
                    </div>

                    <h3 className="text-3xl md:text-5xl font-title uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-yellow-100 to-yellow-600 mb-4 tracking-wider drop-shadow-sm">
                      Awaiting Data
                    </h3>
                    
                    <div className="w-12 h-px bg-yellow-500/50 mb-6"></div>

                    <p className="text-sm md:text-base text-zinc-400 font-body max-w-lg mx-auto leading-relaxed">
                      The mainframe is currently processing the latest scores. Stay tuned as we compile the definitive rankings for this mission.
                    </p>

                    {/* Progress / Loading bar mockup */}
                    <div className="mt-10 w-full max-w-[200px] mx-auto">
                      <div className="flex justify-between text-[9px] text-zinc-500 font-bold tracking-[0.2em] mb-3 uppercase">
                        <span>Syncing</span>
                        <span className="animate-pulse text-yellow-500">Processing</span>
                      </div>
                      <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent w-[50%]"
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {isLanding && (
                <div className="p-8 md:p-12 flex justify-center bg-black/60 border-t border-white/5">
                  <Link
                    to="/leaderboard"
                    className="group relative flex items-center justify-center gap-3 md:gap-4 px-8 md:px-12 py-4 md:py-5 bg-white text-black font-body font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all duration-500 overflow-hidden rounded-full w-full sm:w-auto"
                  >
                    <span className="relative z-10">View Full Rankings</span>
                    <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardSection;







