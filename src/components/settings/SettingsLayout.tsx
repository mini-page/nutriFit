
import React from 'react';
import Header from '@/components/ui/header';
import SidebarNav from '@/components/nav/sidebar-nav';
import { useIsMobile } from '@/hooks/use-mobile';
import { Settings } from 'lucide-react';

interface SettingsLayoutProps {
  userName: string;
  children: React.ReactNode;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ 
  userName, 
  children 
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex">
      {!isMobile && <SidebarNav />}
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Settings className="h-6 w-6 text-primary" />
              Settings
            </h2>
            <p className="text-muted-foreground">Customize your NutriFit experience</p>
          </div>
          
          <div className="mb-6 p-4 rounded-lg bg-secondary flex items-center">
            <div className="flex-1">
              <p className="font-medium text-foreground">Welcome, {userName}</p>
              <p className="text-sm text-muted-foreground">Premium Plan</p>
            </div>
          </div>
          
          {children}
        </main>
      </div>
    </div>
  );
};

export default SettingsLayout;
