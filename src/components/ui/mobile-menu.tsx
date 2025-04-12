
import React, { useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Activity } from 'lucide-react';
import SidebarNav from '@/components/nav/sidebar-nav';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  setIsOpen
}) => {
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

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="p-2 text-primary-foreground hover:text-primary-foreground/80 focus:outline-none">
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-full max-w-[280px] border-0">
        <div className="flex flex-col h-full">
          {/* Always use expanded sidebar in mobile view */}
          <SidebarNav 
            hideLogo={true} 
            collapsed={false}
            setCollapsed={() => {}} // Empty function since we don't want toggling on mobile
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
