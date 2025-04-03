import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserProfileMenuProps {
  userName?: string;
  onClose?: () => void;
}

export const UserProfileMenu: React.FC<UserProfileMenuProps> = ({ userName: propUserName, onClose }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(propUserName || "Umang");

  useEffect(() => {
    // If prop is provided, use it
    if (propUserName) {
      setUserName(propUserName);
      return;
    }

    // Otherwise, load from localStorage
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
  }, [propUserName]);

  const handleNavigation = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-secondary transition-colors">
        <div className="bg-primary text-primary-foreground rounded-full p-1">
          <User className="h-4 w-4" />
        </div>
        <span className="font-medium hidden sm:inline">{userName}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleNavigation('/settings')}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleNavigation('/goals')}>
          Goals
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigation('/calendar')}>
          Calendar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigation('/journal')}>
          Journal
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
