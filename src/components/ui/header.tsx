
import React from 'react';
import { User, Menu, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const today = new Date();
  const formattedDate = format(today, 'E dd MMM yyyy');

  return (
    <header className={cn("py-6 px-8 flex items-center justify-between", className)}>
      <div className="flex items-center">
        <button className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors mr-6 sm:hidden">
          <Menu className="h-5 w-5" />
        </button>
        <div>
          {/* App name only shows on mobile when sidebar is hidden */}
          <h1 className="text-2xl font-bold sm:hidden">NutriFit</h1>
          <p className="text-muted-foreground text-sm">{formattedDate}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full" />
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-secondary transition-colors">
          <div className="bg-primary text-primary-foreground rounded-full p-1">
            <User className="h-4 w-4" />
          </div>
          <span className="font-medium hidden sm:inline-block">My Profile</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
