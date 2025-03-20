
import React from 'react';
import { Droplet } from 'lucide-react';
import WaterTracker from '@/components/ui/water-tracker';
import Header from '@/components/ui/header';
import SidebarNav from '@/components/nav/sidebar-nav';
import { useIsMobile } from '@/hooks/use-mobile';

const WaterPage = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex">
      {!isMobile && <SidebarNav />}
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Droplet className="h-6 w-6 text-water" />
              Water Tracker
            </h2>
            <p className="text-muted-foreground">Monitor your daily water intake to stay hydrated.</p>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <WaterTracker className="h-auto" />
            
            <div className="glass-card p-5">
              <h3 className="text-lg font-medium mb-4">Daily Water Consumption History</h3>
              <div className="bg-secondary/50 rounded-xl p-4">
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 7 }).map((_, i) => {
                    const dayValue = Math.floor(Math.random() * 100);
                    const height = 20 + dayValue;
                    return (
                      <div key={i} className="flex flex-col items-center">
                        <div className="flex-1 w-full flex items-end justify-center">
                          <div 
                            className="w-6 bg-water/60 rounded-t-md" 
                            style={{ height: `${height}px` }}
                          />
                        </div>
                        <span className="text-xs mt-2">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="glass-card p-5">
              <h3 className="text-lg font-medium mb-4">Water Intake Tips</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Droplet className="h-5 w-5 text-water shrink-0 mt-0.5" />
                  <span>Drink a glass of water as soon as you wake up to boost metabolism</span>
                </li>
                <li className="flex items-start gap-2">
                  <Droplet className="h-5 w-5 text-water shrink-0 mt-0.5" />
                  <span>Carry a reusable water bottle with you throughout the day</span>
                </li>
                <li className="flex items-start gap-2">
                  <Droplet className="h-5 w-5 text-water shrink-0 mt-0.5" />
                  <span>Set reminders to drink water every hour</span>
                </li>
                <li className="flex items-start gap-2">
                  <Droplet className="h-5 w-5 text-water shrink-0 mt-0.5" />
                  <span>Drink a glass of water before each meal to help with digestion</span>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WaterPage;
