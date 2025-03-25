
import React, { useState } from 'react';
import { Activity, MoreVertical, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { MobileMenu } from '@/components/ui/mobile-menu';
import { UserProfileMenu } from '@/components/ui/user-profile-menu';
import { NotificationButton, Notification } from '@/components/ui/notification-button';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  className?: string;
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ className, userName = "Umang" }) => {
  const today = new Date();
  const formattedDate = format(today, 'MMM dd, E');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  // Notification data
  const notifications: Notification[] = [
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
    <header className={cn("w-full py-3 px-4 sm:px-8 flex items-center justify-between", className)}>
      {/* Left section with mobile menu and branding */}
      <div className="flex items-center gap-3">
        {isMobile && (
          <MobileMenu 
            isOpen={isMenuOpen} 
            setIsOpen={setIsMenuOpen}
          />
        )}
        
        {/* App logo and greeting */}
        <div className="flex flex-col">
          <h1 className="text-xl font-bold flex items-center">
            {!isMobile ? (
              <span>Hello, {userName}</span>
            ) : (
              <>
                <span className="bg-primary text-primary-foreground rounded-lg p-1 mr-2">
                  <Activity className="h-5 w-5" />
                </span>
                NutriFit
              </>
            )}
          </h1>
          <p className="text-muted-foreground text-xs">
            {formattedDate}
          </p>
        </div>
      </div>
      
      {/* Right section with notifications and profile */}
      <div className="flex items-center gap-3">
        {/* Desktop: Show notification button and profile separately */}
        {!isMobile && (
          <>
            <NotificationButton notifications={notifications} />
            <UserProfileMenu userName={userName} />
          </>
        )}

        {/* Mobile: Combined dropdown menu */}
        {isMobile && (
          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <MoreVertical className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => window.location.href = '/settings'}>
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </DropdownMenuLabel>
              
              {notifications.slice(0, 2).map(notification => (
                <DropdownMenuItem key={notification.id} className="flex flex-col items-start">
                  <div className="flex w-full justify-between">
                    <span className="font-medium">{notification.title}</span>
                    {notification.unread && <span className="w-2 h-2 bg-primary rounded-full" />}
                  </div>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </DropdownMenuItem>
              ))}
              
              <DropdownMenuItem className="text-primary" onClick={() => {
                const event = new Event('view-all-notifications');
                document.dispatchEvent(event);
              }}>
                <Bell className="mr-2 h-4 w-4" />
                <span>View all notifications</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default Header;
