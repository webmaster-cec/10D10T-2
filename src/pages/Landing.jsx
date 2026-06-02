import { useState, useEffect } from 'react';
import { useLeaderboardData } from '../hooks/useLeaderboardData';
import LeaderboardSection from '../components/LeaderboardSection';
import Hero from '../components/Landing/Hero';
import HeroMobile from '../components/Landing/HeroMobile';
import Countdown from '../components/Landing/Countdown';
import About from '../components/Landing/About';
import TasksPreview from '../components/Landing/TasksPreview';
import Rules from '../components/Landing/Rules';
import Organizers from '../components/Landing/Organizers';
import starsImage from '../assets/images/Hero.webp';


const Landing = () => {
  const { data: lbData, loading: lbLoading, error: lbError, refresh: lbRefresh } = useLeaderboardData();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-white/20 bg-black">
      {/* Global Hero Sticky Background - Hidden on Mobile to allow section-specific bg */}
      <div className="hidden md:block fixed inset-0 z-0 pointer-events-none">
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
                backgroundImage: `url(${starsImage})`,
                filter: 'brightness(0.7) blur(1px)',
                opacity: 0.8,
            }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black" />
      </div>


      <div className="relative z-10 w-full">
        <div id="home">
          {isMobile ? (
            <div key="mobile"><HeroMobile /></div>
          ) : (
            <div key="desktop"><Hero /></div>
          )}
        </div>
        
        <Countdown />

        <div id="about"><About /></div>
        <div id="tasks"><TasksPreview /></div>
        <div id="rules" className="bg-black"><Rules /></div>

        {/* 5. LEADERBOARD */}
        <section id="leaderboard" className="relative z-10 bg-black">
          <div className="w-full">
            <LeaderboardSection isLanding={true} data={lbData} loading={lbLoading} error={lbError} refresh={lbRefresh} />
          </div>
        </section>

        <div id="organizers"><Organizers /></div>
      </div>
    </div>
  );
};

export default Landing;


