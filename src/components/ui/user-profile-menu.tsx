
import React from 'react';
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
  userName: string;
  onClose?: () => void;
}

export const UserProfileMenu: React.FC<UserProfileMenuProps> = ({ userName, onClose }) => {
  const navigate = useNavigate();

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
