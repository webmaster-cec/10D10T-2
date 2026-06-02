import React from 'react';

const StatusBadge = ({ status }) => {
  const styles = {
    Active: 'bg-white text-black border-white',
    Expired: 'bg-transparent text-white/40 border-white/20',
    Locked: 'bg-transparent text-white/20 border-white/10',
  };

  const currentStyle = styles[status] || styles.Locked;

  return (
    <span className={`px-4 py-2 rounded-none text-[11px] uppercase font-black tracking-[0.3em] border ${currentStyle} flex items-center gap-3 transition-all duration-300 shadow-sm`}>
      {status === 'Active' && (
        <span className="w-2 h-2 rounded-full bg-black shadow-[0_0_12px_white] animate-pulse" />
      )}
      {status}
    </span>
  );
};

export default StatusBadge;
