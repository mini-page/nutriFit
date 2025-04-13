
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { NotificationDisplay } from '@/components/ui/notification-display';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: string;
};

interface NotificationButtonProps {
  notifications: Notification[];
  onMenuClose?: () => void;
}

export const NotificationButton: React.FC<NotificationButtonProps> = ({ 
  notifications,
  onMenuClose
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;
  const isMobile = useIsMobile();

  const toggleNotifications = () => {
    // If we're on mobile and there's an onMenuClose handler, close the menu
    if (isMobile && onMenuClose) {
      onMenuClose();
    }
    setShowNotifications(!showNotifications);
  };

  const closeNotifications = () => {
    setShowNotifications(false);
  };

  return (
    <>
      <button 
        className={cn(
          "p-2 rounded-full transition-colors relative",
          unreadCount > 0 
            ? "text-foreground hover:bg-secondary/70" 
            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
        )}
        onClick={toggleNotifications}
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[1.2rem] h-[1.2rem] text-[0.65rem] font-medium bg-primary text-primary-foreground rounded-full px-1 leading-none">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <NotificationDisplay 
          notifications={notifications} 
          onClose={closeNotifications}
          isMobile={isMobile}
        />
      )}
    </>
  );
};
