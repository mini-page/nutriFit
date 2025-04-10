
import React, { useState, useEffect } from 'react';
import { Activity, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { MobileMenu } from '@/components/ui/mobile-menu';
import { UserProfileMenu } from '@/components/ui/user-profile-menu';
import { NotificationButton, Notification } from '@/components/ui/notification-button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  className?: string;
  userName?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const today = new Date();
  const formattedDate = format(today, 'MMM dd, E');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState("Umang");
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    // Load user name from localStorage
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      try {
        const parsedData = JSON.parse(savedUserData);
        if (parsedData.name) {
          setUserName(parsedData.name.split(' ')[0]); // Use first name only
        }
      } catch (error) {
        console.error('Failed to parse user data from localStorage', error);
      }
    }

    // Listen for profile updates
    const handleProfileUpdate = (event: any) => {
      const { userData } = event.detail;
      if (userData && userData.name) {
        setUserName(userData.name.split(' ')[0]); // Use first name only
      }
    };

    document.addEventListener('user-profile-updated', handleProfileUpdate);
    
    return () => {
      document.removeEventListener('user-profile-updated', handleProfileUpdate);
    };
  }, []);

  const handleDateClick = () => {
    navigate('/calendar');
  };

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
    <header className={cn(
      "w-full py-3 px-4 sm:px-8 flex items-center justify-between bg-primary text-primary-foreground sticky top-0 z-10 shadow-md rounded-b-xl", 
      className
    )}>
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
                <span className="bg-white text-primary rounded-lg p-1 mr-2">
                  <Activity className="h-5 w-5" />
                </span>
                Trackify
              </>
            )}
          </h1>
          <p 
            className="text-primary-foreground/80 text-xs cursor-pointer hover:text-primary-foreground transition-colors"
            onClick={handleDateClick}
          >
            {formattedDate}
          </p>
        </div>
      </div>
      
      {/* Right section with notifications and profile */}
      <div className="flex items-center gap-3">
        {/* Show notification button and profile for both mobile and desktop */}
        {!isMobile && <NotificationButton notifications={notifications} />}
        <UserProfileMenu userName={userName} notifications={isMobile ? notifications : undefined} />
      </div>
    </header>
  );
};

export default Header;
