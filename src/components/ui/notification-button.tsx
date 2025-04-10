
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { NotificationDisplay } from '@/components/ui/notification-display';
import { useIsMobile } from '@/hooks/use-mobile';

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
        className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors relative"
        onClick={toggleNotifications}
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full" />
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
