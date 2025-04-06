
import React from 'react';
import { Activity, Droplet, Moon } from 'lucide-react';

interface WeeklyStatsProps {
  waterProgress: string;
  exerciseProgress: string;
  sleepQuality: string;
}

const WeeklyProgressStats: React.FC<WeeklyStatsProps> = ({
  waterProgress,
  exerciseProgress,
  sleepQuality
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <div className="bg-secondary/50 dark:bg-secondary/20 rounded-xl p-4 flex items-center no-hover">
        <div className="h-12 w-12 rounded-full bg-water/10 flex items-center justify-center mr-4">
          <Droplet className="h-6 w-6 text-water" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Water Intake</p>
          <p className="text-xl font-bold">{waterProgress}</p>
        </div>
      </div>
      
      <div className="bg-secondary/50 dark:bg-secondary/20 rounded-xl p-4 flex items-center no-hover">
        <div className="h-12 w-12 rounded-full bg-calories/10 flex items-center justify-center mr-4">
          <Activity className="h-6 w-6 text-calories" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Exercise Goal</p>
          <p className="text-xl font-bold">{exerciseProgress}</p>
        </div>
      </div>
      
      <div className="bg-secondary/50 dark:bg-secondary/20 rounded-xl p-4 flex items-center no-hover">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
          <Moon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Sleep Quality</p>
          <p className="text-xl font-bold">{sleepQuality}</p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyProgressStats;
