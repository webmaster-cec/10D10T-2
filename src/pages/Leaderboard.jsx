import React from 'react';
import { useLeaderboardData } from '../hooks/useLeaderboardData';
import LeaderboardSection from '../components/LeaderboardSection';
import starsImage from '../assets/images/Hero.webp';


const Leaderboard = () => {
  const { data, loading, error, refresh, lastUpdated } = useLeaderboardData();



  return (
    <div className="min-h-screen bg-black relative overflow-hidden selection:bg-white/20">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ 
                backgroundImage: `url(${starsImage})`,
                filter: 'brightness(0.2) blur(4px)',
            }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 pt-20 md:pt-24">
        <LeaderboardSection data={data} loading={loading} error={error} refresh={refresh} lastUpdated={lastUpdated} />
      </div>
    </div>
  );
};

export default Leaderboard;

