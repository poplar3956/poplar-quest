
import React from 'react';

interface SynchroGaugeProps {
  value: number;
}

const SynchroGauge: React.FC<SynchroGaugeProps> = ({ value }) => {
  const displayValue = Math.min(Math.max(value, 0), 100);
  
  return (
    <div className="w-full bg-slate-200 rounded-full h-8 relative overflow-hidden shadow-inner border-4 border-white">
      <div 
        className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-purple-600 transition-all duration-700 ease-out flex items-center justify-end px-3"
        style={{ width: `${displayValue}%` }}
      >
        <span className="text-white text-xs font-black drop-shadow-md whitespace-nowrap">
          SYNC {displayValue}%
        </span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[10px] font-bold text-slate-400 tracking-widest opacity-30">
          SATSUKI SYNC GAUGE
        </span>
      </div>
    </div>
  );
};

export default SynchroGauge;
