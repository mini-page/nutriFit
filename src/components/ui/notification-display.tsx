
import React from 'react';
import { X, Bell, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: string;
}

interface NotificationDisplayProps {
  notifications: Notification[];
  onClose: () => void;
  isMobile?: boolean;
}

export const NotificationDisplay: React.FC<NotificationDisplayProps> & {
  handleNotificationClick: (id: number) => void;
} = ({ notifications, onClose, isMobile = false }) => {
  
  const getIconForType = (type: string) => {
    switch(type) {
      case 'achievement': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'reminder': return <Bell className="h-4 w-4 text-orange-500" />;
      case 'info': return <Info className="h-4 w-4 text-blue-500" />;
      case 'system':
      default: return <Info className="h-4 w-4 text-primary" />;
    }
  };
  
  return (
    <div 
      className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-black/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className={cn(
          "absolute bg-card border border-border rounded-lg shadow-lg z-51 animate-fade-in",
          isMobile 
            ? "left-4 top-[60px] w-[calc(100vw-32px)]" 
            : "right-4 top-[60px] w-[350px] max-w-[calc(100vw-40px)]"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </h3>
          <button 
            className="p-1.5 rounded-full hover:bg-secondary transition-colors"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto py-2">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div 
                key={notification.id}
                className={cn(
                  "p-3 m-2 rounded-lg cursor-pointer transition-colors flex items-start gap-3",
                  notification.unread 
                    ? "bg-secondary/70" 
                    : "bg-secondary/30 hover:bg-secondary/40"
                )}
                onClick={() => NotificationDisplay.handleNotificationClick(notification.id)}
              >
                <div className="mt-0.5">
                  {getIconForType(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium">{notification.title}</h4>
                    <span className="text-xs text-muted-foreground ml-2">{notification.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No notifications yet</p>
            </div>
          )}
        </div>
        
        {notifications.length > 0 && (
          <div className="border-t p-3 flex justify-center">
            <button 
              className="text-sm text-primary hover:underline"
              onClick={() => {
                toast.success('All notifications marked as read');
                onClose();
              }}
            >
              Mark all as read
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Static method to handle notification clicks
NotificationDisplay.handleNotificationClick = (id: number) => {
  toast.success(`Notification ${id} marked as read`);
  // In a real app, would mark notification as read in state/database
};
