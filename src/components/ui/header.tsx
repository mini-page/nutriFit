
import React, { useState } from 'react';
import { User, Menu, Bell, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const today = new Date();
  const formattedDate = format(today, 'E dd MMM yyyy');
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const closeNotifications = () => {
    setShowNotifications(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleNotificationClick = (id: number) => {
    toast.success(`Notification ${id} marked as read`);
    // In a real app, would mark notification as read in state/database
  };

  // Notification data
  const notifications = [
    { 
      id: 1, 
      title: "Water goal reached", 
      message: "Congratulations! You've reached your daily water intake goal.", 
      time: "10 minutes ago", 
      unread: true,
      type: "achievement" 
    },
    { 
      id: 2, 
      title: "Exercise reminder", 
      message: "Don't forget your strength training session today!", 
      time: "1 hour ago", 
      unread: true,
      type: "reminder" 
    },
    { 
      id: 3, 
      title: "Weekly progress summary", 
      message: "Your weekly health report is now available.", 
      time: "Yesterday", 
      unread: false,
      type: "info" 
    },
    { 
      id: 4, 
      title: "New feature available", 
      message: "Check out the new sleep tracking feature on your dashboard.", 
      time: "2 days ago", 
      unread: false,
      type: "system" 
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className={cn("py-6 px-8 flex items-center justify-between", className)}>
      <div className="flex items-center">
        <button className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors mr-6 sm:hidden">
          <Menu className="h-5 w-5" />
        </button>
        <div>
          {/* App name only shows on mobile when sidebar is hidden */}
          <h1 className="text-2xl font-bold sm:hidden">NutriFit</h1>
          <p 
            className="text-muted-foreground text-sm cursor-pointer hover:text-foreground transition-colors"
            onClick={() => handleNavigation('/calendar')}
          >
            {formattedDate}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors relative"
          onClick={toggleNotifications}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full" />
          )}
        </button>
        <button 
          className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-secondary transition-colors"
          onClick={() => handleNavigation('/settings')}
        >
          <div className="bg-primary text-primary-foreground rounded-full p-1">
            <User className="h-4 w-4" />
          </div>
          <span className="font-medium hidden sm:inline-block">My Profile</span>
        </button>
      </div>

      {/* Notification Popup */}
      {showNotifications && (
        <div className="notification-overlay" onClick={closeNotifications}>
          <div 
            className="notification-popup glass-card p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Notifications</h3>
              <button 
                className="p-1.5 rounded-full hover:bg-secondary transition-colors"
                onClick={closeNotifications}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={cn(
                      "p-3 rounded-lg cursor-pointer transition-colors",
                      notification.unread 
                        ? "bg-secondary/70" 
                        : "bg-secondary/30 hover:bg-secondary/40"
                    )}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium">{notification.title}</h4>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No notifications yet</p>
                </div>
              )}
            </div>
            
            {notifications.length > 0 && (
              <div className="mt-4 pt-2 border-t">
                <button 
                  className="w-full text-sm text-center text-primary hover:underline"
                  onClick={() => {
                    toast.success('All notifications marked as read');
                    closeNotifications();
                  }}
                >
                  Mark all as read
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
