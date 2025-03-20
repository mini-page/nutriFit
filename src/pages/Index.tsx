import React, { useEffect } from 'react';
import Header from '@/components/ui/header';
import WaterTracker from '@/components/ui/water-tracker';
import CalorieTracker from '@/components/ui/calorie-tracker';
import ExerciseTracker from '@/components/ui/exercise-tracker';
import MoodTracker from '@/components/ui/mood-tracker';
import DailyGoal from '@/components/ui/daily-goal';
import SidebarNav from '@/components/nav/sidebar-nav';
import { useIsMobile } from '@/hooks/use-mobile';
import { Activity, ChevronDown, TrendingUp, Droplet } from 'lucide-react';

const Index = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Add animation classes to elements when they mount
    const sections = document.querySelectorAll('.animate-on-mount');
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.add('animate-enter');
      }, 100 * index);
    });
  }, []);

  return (
    <div className="min-h-screen flex">
      {!isMobile && <SidebarNav />}
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
          <div className="mb-6 animate-on-mount opacity-0">
            <h2 className="text-2xl font-bold mb-2">Hello, John! 👋</h2>
            <p className="text-muted-foreground">Track your fitness journey and stay on top of your health goals.</p>
          </div>
          
          <div className="glass-card p-4 mb-8 animate-on-mount opacity-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Weekly Progress</span>
              </h3>
              <button className="text-sm text-muted-foreground hover:text-foreground flex items-center">
                This Week <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-secondary/50 rounded-xl p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-water/10 flex items-center justify-center mr-4">
                  <Droplet className="h-6 w-6 text-water" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Water Intake</p>
                  <p className="text-xl font-bold">87%</p>
                </div>
              </div>
              
              <div className="bg-secondary/50 rounded-xl p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-calories/10 flex items-center justify-center mr-4">
                  <Activity className="h-6 w-6 text-calories" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Exercise Goal</p>
                  <p className="text-xl font-bold">63%</p>
                </div>
              </div>
              
              <div className="bg-secondary/50 rounded-xl p-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <Activity className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Daily Steps</p>
                  <p className="text-xl font-bold">8,423</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WaterTracker className="animate-on-mount opacity-0" />
            <CalorieTracker className="animate-on-mount opacity-0" />
            <ExerciseTracker className="animate-on-mount opacity-0" />
            <MoodTracker className="animate-on-mount opacity-0" />
            <DailyGoal className="animate-on-mount opacity-0" />
            
            <div className="glass-card p-5 animate-on-mount opacity-0">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <span>Quick Actions</span>
                </h3>
                <span className="category-pill bg-secondary text-muted-foreground">
                  <Activity className="h-3.5 w-3.5" />
                  Tools
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button className="p-3 bg-secondary rounded-xl hover:bg-secondary/70 transition-colors flex flex-col items-center justify-center">
                  <Activity className="h-5 w-5 mb-2 text-primary" />
                  <span className="text-sm">Log Exercise</span>
                </button>
                <button className="p-3 bg-secondary rounded-xl hover:bg-secondary/70 transition-colors flex flex-col items-center justify-center">
                  <Droplet className="h-5 w-5 mb-2 text-water" />
                  <span className="text-sm">Add Water</span>
                </button>
                <button className="p-3 bg-secondary rounded-xl hover:bg-secondary/70 transition-colors flex flex-col items-center justify-center">
                  <TrendingUp className="h-5 w-5 mb-2 text-goal" />
                  <span className="text-sm">Set Goal</span>
                </button>
                <button className="p-3 bg-secondary rounded-xl hover:bg-secondary/70 transition-colors flex flex-col items-center justify-center">
                  <Activity className="h-5 w-5 mb-2 text-calories" />
                  <span className="text-sm">Log Meal</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
