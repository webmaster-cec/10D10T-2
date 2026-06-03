import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Rocket } from 'lucide-react';

const NavLink = ({ name, path, active, hovered, onMouseEnter, onMouseLeave, onClick }) => {
  return (
    <Link
      to={path}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className="relative px-5 py-2 group transition-all duration-500"
    >
      <AnimatePresence>
        {(active || hovered) && (
          <motion.div
            layoutId="navGlow"
            className="absolute inset-0 bg-white rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
          />
        )}
      </AnimatePresence>
      <span className={`relative z-10 text-[9px] font-semibold uppercase tracking-[0.2em] transition-colors duration-500 ${active || hovered ? 'text-black' : 'text-white/70 group-hover:text-white'
        }`}>
        {name}
      </span>
    </Link>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const sectionIds = ['home', 'about', 'tasks', 'rules', 'leaderboard', 'organizers', 'footer'];
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    let checkInterval;
    const tryObserve = () => {
      const homeEl = document.getElementById('home');
      if (homeEl) {
        sectionIds.forEach(id => {
          const element = document.getElementById(id);
          if (element) observer.observe(element);
        });
        clearInterval(checkInterval);
      }
    };

    tryObserve();
    checkInterval = setInterval(tryObserve, 200);

    return () => {
      clearInterval(checkInterval);
      observer.disconnect();
    };
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = (e, path) => {
    if (path === '/' && location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path.includes('#')) {
      const id = path.split('#')[1];
      const element = document.getElementById(id);
      if (element && location.pathname === '/') {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Tasks', path: '/#tasks' },
    { name: 'Rules', path: '/#rules' },
    { name: 'Leaderboard', path: '/#leaderboard' },
    { name: 'Organizers', path: '/#organizers' },
    { name: 'Contact', path: '/#footer' },
  ];

  const isActive = (path) => {
    // If on a subpage, highlight the corresponding nav link
    if (location.pathname === '/tasks' && path.includes('tasks')) return true;
    if (location.pathname === '/leaderboard' && path.includes('leaderboard')) return true;

    // Logic for landing page sections
    if (location.pathname === '/') {
      // Home link active when at top
      if (path === '/') return activeSection === 'home' || activeSection === '';

      // Hash links for all sections
      if (path.includes('#')) {
        const id = path.split('#')[1];
        return activeSection === id;
      }
    }

    return false;
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[110] transition-all duration-700 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className={`absolute inset-0 transition-opacity duration-700 ${scrolled && !isOpen ? 'bg-black/50 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none' : 'opacity-0'}`} />

      <div className="max-w-[1600px] mx-auto px-10 flex justify-between items-center relative z-20">

        {/* Branding Hub */}
        <div className="flex items-center gap-8">
          <Link to="/" onClick={(e) => handleNavClick(e, '/')} className="flex items-center gap-2 md:gap-3 font-title text-3xl md:text-4xl font-bold uppercase tracking-wider text-white">
            <span className="flex">10D</span>
            <span className="flex">10T</span>
            <div className="flex gap-1 items-baseline">
                <span className="inline-block" style={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 0 100%, 0 15%)', background: 'linear-gradient(to bottom, #ffffff, #cfcfcf, #7a7a7a)', width: '0.18em', height: '0.73em' }}></span>
                <span className="inline-block" style={{ clipPath: 'polygon(0 0, 0% 0, 100% 15%, 100% 100%, 0 100%)', background: 'linear-gradient(to bottom, #ffffff, #cfcfcf, #7a7a7a)', width: '0.18em', height: '0.73em' }}></span>
            </div>
          </Link>
        </div>

        {/* Navigation Core (Desktop) */}
        <div className="hidden lg:flex items-center backdrop-blur-lg bg-black/30 border rounded-xl border-white/5 p-1">
          <div className="flex items-center gap-1" onMouseLeave={() => setHoveredPath(null)}>
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                {...link}
                active={isActive(link.path)}
                hovered={hoveredPath === link.path}
                onMouseEnter={() => setHoveredPath(link.path)}
                onClick={(e) => handleNavClick(e, link.path)}
              />
            ))}
          </div>
        </div>

        {/* Action / Terminal */}
        <div className="flex items-center gap-4">
          {/* <Link
            to="/tasks"
            className="group hidden sm:flex items-center gap-3 px-6 py-2 text-white border border-white/70 hover:bg-white hover:text-black transition-all duration-500 rounded-sm"
          >
            <span className="text-xs py-2 font-black font-title uppercase tracking-[0.3em]">Register Now</span>
            <ArrowUpRight size={12} className="opacity-40 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link> */}
          <a
            href="https://forms.gle/zYd65ByWERiwBByY9"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="group hidden sm:flex items-center gap-3 px-6 py-2 text-white border border-white/70 hover:bg-white hover:text-black transition-all duration-500 rounded-sm"
          >
            <span className="text-xs py-2 font-black font-title uppercase tracking-[0.3em]">Register Now</span>
            <ArrowUpRight size={12} className="opacity-40 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-end text-white hover:text-white transition-colors outline-none z-[120]"
          >
            {/* Morphing Hamburger to X */}
            <div className="flex flex-col justify-center items-end w-6 h-5 relative">
              <motion.span
                animate={isOpen ? { rotate: -45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute top-0 block w-6 h-0.5 bg-white rounded-full origin-center"
              />
              <motion.span
                animate={isOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute top-2 block w-4 h-0.5 bg-white rounded-full right-0"
              />
              <motion.span
                animate={isOpen ? { rotate: 45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute top-4 block w-6 h-0.5 bg-white rounded-full origin-center"
              />
            </div>
          </button>
        </div>
      </div>

      {/* White Wipe Layer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="whiteWipe"
            initial={{ clipPath: "inset(0% 0% 0% 100%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
            exit={{ clipPath: "inset(0% 0% 0% 100%)", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.45 } }}
            className="fixed top-0 left-0 w-full h-[80vh] bg-white z-[8] rounded-b-[2rem]"
          />
        )}
      </AnimatePresence>

      {/* Black Menu Layer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobileOverlay"
            initial={{ clipPath: "inset(0% 0% 0% 100%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.15 } }}
            exit={{ clipPath: "inset(0% 0% 0% 100%)", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 } }}
            className="fixed top-0 left-0 w-full h-[80vh] bg-[#050505] z-10 flex flex-col pt-24 px-8 touch-none overflow-hidden rounded-b-[2rem] border-b border-white/10 shadow-2xl"
          >
            {/* Navigation Links */}
            <div className="flex flex-col gap-3 w-full relative z-20 mt-4">
              {navLinks.map((link, i) => {
                // Calculate distance from the middle link (where the rocket flies)
                const distanceToCenter = Math.abs(i - Math.floor(navLinks.length / 2));
                
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.8 + distanceToCenter * 0.15, duration: 0.5, ease: "easeOut" } }}
                    exit={{ opacity: 0, x: -20, transition: { delay: distanceToCenter * 0.08, duration: 0.3, ease: "easeIn" } }}
                  >
                    <Link
                      to={link.path}
                      onClick={(e) => handleNavClick(e, link.path)}
                      className="group flex items-center justify-between relative py-3 w-full border-b border-white/5"
                    >
                      <span className={`text-sm md:text-base font-body font-medium tracking-wider transition-all duration-300 ${isActive(link.path) ? 'text-white' : 'text-white/40 group-hover:text-white'
                        }`}>
                        {link.name}
                      </span>
                      <div className="w-6 flex justify-end">
                        {isActive(link.path) && (
                          <motion.div
                            layoutId="activeSmallIndicator"
                            className="text-white"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                          >
                             <Rocket size={16} className="rotate-225 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                          </motion.div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Register CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 1.4, duration: 0.5, ease: "easeOut" } }}
              exit={{ opacity: 0, y: 20, transition: { delay: 0, duration: 0.3 } }}
              className="mt-auto mb-8 w-full relative z-20"
            >
              {/* <Link
                to="/tasks"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-3 w-full bg-white text-black py-4 rounded-xl hover:scale-[1.02] transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                <span className="text-xs font-bold font-body tracking-[0.3em] uppercase">Register Now</span>
                <ArrowUpRight size={16} />
              </Link> */}
              <a
                href="https://forms.gle/zYd65ByWERiwBByY9"
                className="flex items-center justify-center gap-3 w-full bg-white text-black py-4 rounded-xl hover:scale-[1.02] transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                <span className="text-xs font-bold font-body tracking-[0.3em] uppercase">Register Now</span>
                <ArrowUpRight size={16} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flying Rocket Layer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="flyingRocket"
            initial={{ left: "100vw", top: "45%", scaleX: 1 }}
            animate={{ left: "-120vw", top: "45%", scaleX: 1, transition: { duration: 1.5, ease: "easeOut", delay: 0.5 } }}
            exit={{ left: "100vw", top: "45%", scaleX: -1, transition: { duration: 0.7, ease: "easeInOut", delay: 0, scaleX: { duration: 0 } } }}
            className="fixed z-[15] pointer-events-none flex items-center -translate-y-1/2"
          >
            <Rocket size={48} className="-rotate-[135deg] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10 flex-shrink-0" />
            
            {/* Circular Smokes */}
            <div className="relative flex items-center -ml-2 z-0">
              <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.4, 0.8] }} transition={{ duration: 0.2, repeat: Infinity }} className="w-5 h-5 bg-white rounded-full blur-[2px] absolute -left-2" />
              <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.3, 0.6] }} transition={{ duration: 0.3, repeat: Infinity, delay: 0.1 }} className="w-8 h-8 bg-white/80 rounded-full blur-sm absolute left-1" />
              <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.2, 0.4] }} transition={{ duration: 0.4, repeat: Infinity, delay: 0.2 }} className="w-12 h-12 bg-white/60 rounded-full blur-md absolute left-4" />
              <div className="w-20 h-20 bg-white/30 rounded-full blur-lg absolute left-10 -translate-y-1/2 top-1/2" />
              <div className="w-32 h-32 bg-white/10 rounded-full blur-xl absolute left-16 -translate-y-1/2 top-1/2" />
            </div>

            <div className="w-[100vw] h-[2px] bg-gradient-to-r from-white/80 via-white/20 to-transparent ml-8 flex-shrink-0" />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;


