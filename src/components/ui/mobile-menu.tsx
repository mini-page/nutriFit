
import React, { useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Activity, ArrowLeft } from 'lucide-react';
import SidebarNav from '@/components/nav/sidebar-nav';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const isDashboard = pathname === '/';

  // Fix body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleBackToDashboard = () => {
    navigate('/');
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="p-2 text-muted-foreground hover:text-foreground focus:outline-none">
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72 border-none">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between border-b p-4 bg-primary text-primary-foreground">
            <div className="flex items-center">
              <div className="bg-white text-primary rounded-lg p-1 mr-2">
                <Activity className="h-5 w-5" />
              </div>
              <h1 className="text-xl font-bold">Trackify</h1>
            </div>
            {!isDashboard && (
              <button 
                onClick={handleBackToDashboard}
                className="flex items-center text-sm font-medium bg-white/20 hover:bg-white/30 rounded-md px-2 py-1"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Dashboard
              </button>
            )}
          </div>
          <div className="flex-1 overflow-hidden">
            <SidebarNav hideLogo={true} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
