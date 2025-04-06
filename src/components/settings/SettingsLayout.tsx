
import React from 'react';
import Header from '@/components/ui/header';
import { Settings } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
    <div className="flex-1 flex flex-col">
      <div className="mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2 flex items-center gap-2">
          <Settings className="h-5 w-5 md:h-6 md:w-6 text-primary" />
          Settings
        </h2>
        <p className="text-sm md:text-base text-muted-foreground">Customize your Trackify experience</p>
      </div>
      
      <div className="mb-4 md:mb-6 p-3 md:p-4 rounded-lg bg-secondary flex items-center">
        <div className="flex-1">
          <p className="font-medium text-foreground text-sm md:text-base">Welcome, {userName}</p>
          <p className="text-xs md:text-sm text-muted-foreground">Premium Plan</p>
        </div>
      </div>
      
      {children}
    </div>
  );
};

export default SettingsLayout;
