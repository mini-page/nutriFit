
import React, { useState } from 'react';
import { Droplet, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WaterTrackerProps {
  className?: string;
}

const WaterTracker: React.FC<WaterTrackerProps> = ({ className }) => {
  const [waterIntake, setWaterIntake] = useState(0);
  const goal = 8; // 8 glasses of water

  const increaseWater = () => {
    setWaterIntake(prev => Math.min(prev + 1, goal));
  };

  const decreaseWater = () => {
    setWaterIntake(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className={cn("glass-card p-5 bg-[#0a1622] text-white", className)}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Droplet className="h-6 w-6 text-blue-400" />
          <h3 className="text-xl font-medium">Water Intake</h3>
        </div>
        <span className="px-3 py-1 rounded-full text-sm bg-[#1e3a5a] flex items-center gap-1">
          <Droplet className="h-3.5 w-3.5 text-blue-400" />
          <span className="font-medium">Hydration</span>
        </span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="text-center">
          <div className="text-6xl font-bold text-blue-400 mb-1">{waterIntake}</div>
          <div className="text-gray-400">of {goal} glasses</div>
        </div>
        
        <div className="flex gap-6 mt-8">
          <button 
            onClick={decreaseWater}
            className="w-12 h-12 rounded-full bg-[#1e3a5a] text-blue-400 flex items-center justify-center hover:bg-blue-700 transition-colors"
            disabled={waterIntake <= 0}
          >
            <Minus className="h-6 w-6" />
          </button>
          <button 
            onClick={increaseWater}
            className="w-12 h-12 rounded-full bg-[#1e3a5a] text-blue-400 flex items-center justify-center hover:bg-blue-700 transition-colors"
            disabled={waterIntake >= goal}
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaterTracker;
