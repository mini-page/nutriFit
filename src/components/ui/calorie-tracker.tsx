
import React, { useState } from 'react';
import { Flame, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface CalorieTrackerProps {
  className?: string;
}

const CalorieTracker: React.FC<CalorieTrackerProps> = ({ className }) => {
  const [calories, setCalories] = useState(1200);
  const [showAdd, setShowAdd] = useState(false);
  const [newCalories, setNewCalories] = useState('');
  
  const goal = 2000; // Daily calorie goal
  const progress = Math.min((calories / goal) * 100, 100);

  const addCalories = () => {
    if (newCalories.trim() !== '') {
      const value = parseInt(newCalories);
      if (!isNaN(value) && value > 0) {
        setCalories(prev => prev + value);
        setNewCalories('');
        setShowAdd(false);
      }
    }
  };

  return (
    <div className={cn("glass-card p-5 bg-[#0a1622] text-white", className)}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Flame className="h-6 w-6 text-orange-400" />
          <h3 className="text-xl font-medium">Calorie Intake</h3>
        </div>
        <span className="px-3 py-1 rounded-full text-sm bg-[#3a2a1e] flex items-center gap-1">
          <Flame className="h-3.5 w-3.5 text-orange-400" />
          <span className="font-medium">Nutrition</span>
        </span>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-6xl font-bold text-orange-500">{calories}</span>
            <span className="text-gray-400 ml-2">/ {goal}</span>
          </div>
          <button 
            onClick={() => setShowAdd(!showAdd)}
            className="w-12 h-12 rounded-full bg-[#3a2a1e] text-orange-400 flex items-center justify-center hover:bg-orange-700 transition-colors"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
        
        <Progress 
          value={progress} 
          className="h-2 bg-[#3a2a1e]" 
          indicatorClassName="bg-orange-500"
        />
        
        {showAdd && (
          <div className="mt-4 animate-fade-in">
            <div className="flex gap-2">
              <input
                type="number"
                value={newCalories}
                onChange={(e) => setNewCalories(e.target.value)}
                placeholder="Add calories"
                className="flex h-10 w-full rounded-md border border-[#3a2a1e] bg-[#1a1a1a] px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button 
                onClick={addCalories}
                className="rounded-md px-3 bg-orange-500 text-white hover:bg-orange-600 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalorieTracker;
