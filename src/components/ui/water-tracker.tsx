
import React, { useState, useEffect } from 'react';
import { Droplet, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WaterTrackerProps {
  className?: string;
}

const WaterTracker: React.FC<WaterTrackerProps> = ({ className }) => {
  const [waterIntake, setWaterIntake] = useState(0);
  const goal = 8; // 8 glasses of water
  const progress = Math.min((waterIntake / goal) * 100, 100);

  const increaseWater = () => {
    setWaterIntake(prev => Math.min(prev + 1, goal));
  };

  const decreaseWater = () => {
    setWaterIntake(prev => Math.max(prev - 1, 0));
  };

  return (
    <div className={cn("glass-card p-5", className)}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Droplet className="h-5 w-5 text-water" />
          <span>Water Intake</span>
        </h3>
        <span className="category-pill bg-water-light text-water-dark">
          <Droplet className="h-3.5 w-3.5" />
          Hydration
        </span>
      </div>
      
      <div className="flex flex-col items-center justify-center mt-2">
        <div className="w-32 h-32 relative mb-3 animate-pulse-gentle">
          <div 
            className="absolute bottom-0 left-0 right-0 bg-water transition-all duration-700 ease-out rounded-b-full"
            style={{ 
              height: `${progress}%`,
              opacity: 0.7,
              borderTopLeftRadius: progress > 95 ? '50%' : '0',
              borderTopRightRadius: progress > 95 ? '50%' : '0',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-3xl font-bold text-water-dark">{waterIntake}</span>
            <span className="text-sm text-gray-500">of {goal} glasses</span>
          </div>
        </div>
        
        <div className="flex gap-4 mt-2">
          <button 
            onClick={decreaseWater}
            className="p-2 rounded-full bg-water-light text-water-dark hover:bg-water hover:text-white transition-colors"
            disabled={waterIntake <= 0}
          >
            <Minus className="h-5 w-5" />
          </button>
          <button 
            onClick={increaseWater}
            className="p-2 rounded-full bg-water-light text-water-dark hover:bg-water hover:text-white transition-colors"
            disabled={waterIntake >= goal}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaterTracker;
