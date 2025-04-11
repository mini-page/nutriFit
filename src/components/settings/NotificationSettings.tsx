
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { useIsMobile } from '@/hooks/use-mobile';
import Reminder from '@/components/ui/Reminder';

const NotificationSettings: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="glass-card p-4 md:p-6">
        <h3 className="text-md md:text-lg font-medium mb-3 md:mb-4">Notification Preferences</h3>
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className={`${isMobile ? 'max-w-[70%]' : ''}`}>
              <p className="font-medium text-sm md:text-base">Daily Reminders</p>
              <p className="text-xs md:text-sm text-muted-foreground">Receive daily reminders to log your activities</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Reminder />
          
          <div className="flex items-center justify-between gap-2">
            <div className={`${isMobile ? 'max-w-[70%]' : ''}`}>
              <p className="font-medium text-sm md:text-base">Weekly Reports</p>
              <p className="text-xs md:text-sm text-muted-foreground">Receive weekly summary of your progress</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between gap-2">
            <div className={`${isMobile ? 'max-w-[70%]' : ''}`}>
              <p className="font-medium text-sm md:text-base">Goal Alerts</p>
              <p className="text-xs md:text-sm text-muted-foreground">Get notified when you're close to achieving a goal</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between gap-2">
            <div className={`${isMobile ? 'max-w-[70%]' : ''}`}>
              <p className="font-medium text-sm md:text-base">Hydration Reminders</p>
              <p className="text-xs md:text-sm text-muted-foreground">Periodic reminders to drink water</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>
      
      <div className="glass-card p-4 md:p-6">
        <h3 className="text-md md:text-lg font-medium mb-3 md:mb-4">Email Notifications</h3>
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className={`${isMobile ? 'max-w-[70%]' : ''}`}>
              <p className="font-medium text-sm md:text-base">Marketing Emails</p>
              <p className="text-xs md:text-sm text-muted-foreground">Receive emails about new features and promotions</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between gap-2">
            <div className={`${isMobile ? 'max-w-[70%]' : ''}`}>
              <p className="font-medium text-sm md:text-base">Health Tips</p>
              <p className="text-xs md:text-sm text-muted-foreground">Weekly health and fitness tips</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
