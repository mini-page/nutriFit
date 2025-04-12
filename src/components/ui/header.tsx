
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Bell, Menu } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserProfileMenu } from '@/components/ui/user-profile-menu';
import { NotificationButton } from '@/components/ui/notification-button';
import { Notification } from '@/components/ui/notification-display';

interface HeaderProps {
  userName?: string;
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  userName = 'Guest', 
  onMenuClick 
}) => {
  const isMobile = useIsMobile();
  const initials = userName.charAt(0).toUpperCase();
  
  // Sample notifications - in a real app, these would come from a state manager or API
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New Feature",
      message: "Check out our new journal feature!",
      time: "Just now",
      unread: true,
      type: "info"
    },
    {
      id: 2,
      title: "Reminder",
      message: "Don't forget to log your activity today",
      time: "2 hours ago",
      unread: false,
      type: "reminder"
    }
  ]);

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        {/* Mobile menu button */}
        {onMenuClick && (
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="mr-2">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        )}

        <div className="flex-1">
          <h2 className="text-xl font-semibold">
            Welcome, {userName}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <NotificationButton notifications={notifications} />
          <UserProfileMenu userName={userName} notifications={notifications} />
        </div>
      </div>
    </header>
  );
};

export default Header;
