
import React from 'react';
import Header from '@/components/ui/header';
import { Settings } from 'lucide-react';

interface SettingsLayoutProps {
  userName: string;
  children: React.ReactNode;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ 
  userName, 
  children 
}) => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Settings className="h-6 w-6 text-primary" />
          Settings
        </h2>
        <p className="text-muted-foreground">Customize your Trackify experience</p>
      </div>
      
      <div className="mb-6 p-4 rounded-lg bg-secondary flex items-center">
        <div className="flex-1">
          <p className="font-medium text-foreground">Welcome, {userName}</p>
          <p className="text-sm text-muted-foreground">Premium Plan</p>
        </div>
      </div>
      
      {children}
    </div>
  );
};

export default SettingsLayout;
