import { useState, useEffect } from 'react';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2026-06-13T10:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formatNumber = (num) => num.toString().padStart(2, '0');

  return (
    <section className="relative w-full py-16 md:py-24 bg-black flex flex-col justify-center items-center overflow-hidden border-y border-white/5">

      {/* Top Decorative Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center">

        {/* Terminal Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[1px] w-8 md:w-16 bg-white/20" />
          <h2 className="text-white/60 font-body text-xs md:text-sm tracking-[0.5em] uppercase font-light">
            Launch Sequence
          </h2>
          <div className="h-[1px] w-8 md:w-16 bg-white/20" />
        </div>

        {/* The Dotted Number Pill (Refined with glowing borders and inner shadow) */}
        <div className="relative z-10 bg-black rounded-[2rem] md:rounded-[4rem] px-5 sm:px-8 md:px-14 py-6 md:py-10 flex items-center justify-center overflow-hidden hover:border-white/20 transition-all duration-700 ease-out w-full max-w-[100vw] sm:w-auto group/pill">

          <div
            className="relative flex items-center gap-2 sm:gap-6 md:gap-8 lg:gap-10 text-white text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] xl:text-[9rem] font-normal leading-none drop-shadow-[0_0_25px_rgba(255,255,255,0.9)] group-hover/pill:drop-shadow-[0_0_45px_rgba(255,255,255,1)] transition-all duration-700"
            style={{ fontFamily: "'Codystar', sans-serif" }}
          >
            <div className="flex tracking-[0.05em] md:tracking-[0.1em]">
              {formatNumber(timeLeft.days).split('').map((digit, i) => (
                <span key={`d-${i}`}>{digit}</span>
              ))}
            </div>
            <span className="opacity-60 -translate-y-1 sm:-translate-y-2">:</span>
            <div className="flex tracking-[0.05em] md:tracking-[0.1em]">
              {formatNumber(timeLeft.hours).split('').map((digit, i) => (
                <span key={`h-${i}`}>{digit}</span>
              ))}
            </div>
            <span className="opacity-60 -translate-y-1 sm:-translate-y-2">:</span>
            <div className="flex tracking-[0.05em] md:tracking-[0.1em]">
              {formatNumber(timeLeft.minutes).split('').map((digit, i) => (
                <span key={`m-${i}`}>{digit}</span>
              ))}
            </div>
            <span className="opacity-60 -translate-y-1 sm:-translate-y-2">:</span>
            <div className="flex tracking-[0.05em] md:tracking-[0.1em]">
              {formatNumber(timeLeft.seconds).split('').map((digit, i) => (
                <span key={`s-${i}`}>{digit}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Data Labels */}
        <div className="grid grid-cols-4 w-full max-w-sm md:max-w-xl mx-auto mt-6 md:mt-8 px-4">
          <div className="flex flex-col items-center gap-1 border-r border-white/10">
            <span className="text-[9px] md:text-xs font-mono uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/40">Days</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-r border-white/10">
            <span className="text-[9px] md:text-xs font-mono uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/40">Hours</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-r border-white/10">
            <span className="text-[9px] md:text-xs font-mono uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/40">Mins</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[9px] md:text-xs font-mono uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/40">Secs</span>
          </div>
        </div>

      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

    </section>
  );
};

export default Countdown;
