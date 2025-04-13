
import React from 'react';
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
  
  return <div className="flex-1 flex flex-col space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="h-6 w-6 text-primary" />
          Settings
        </h2>
        <p className="text-muted-foreground">
          Customize your Trackify experience
        </p>
      </div>
      
      <div className="p-4 rounded-lg bg-secondary/50 flex items-center">
        <div className="flex-1">
          <p className="font-medium text-foreground">{userName}</p>
          <p className="text-sm text-muted-foreground">Personal account</p>
        </div>
      </div>
      
      {children}
    </div>;
};

export default SettingsLayout;
