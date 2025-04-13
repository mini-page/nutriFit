
import React, { useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Activity, User, X } from 'lucide-react';
import SidebarNav from '@/components/nav/sidebar-nav';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserProfileMenu } from '@/components/ui/user-profile-menu';

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
        <button className="p-2.5 rounded-full text-primary-foreground hover:text-primary-foreground/80 hover:bg-white/10 transition-colors focus:outline-none">
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-full max-w-[300px] border-r border-border shadow-lg">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground rounded-b-xl">
            <div className="flex items-center">
              <div className="bg-white text-primary rounded-lg p-1.5 mr-3">
                <Activity className="h-5 w-5" />
              </div>
              <h1 className="text-xl font-bold">Trackify</h1>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <ScrollArea className="flex-1 h-[calc(100vh-4rem)] overflow-y-auto py-4">
            <div className="py-2">
              <SidebarNav hideLogo={true} />
            </div>
          </ScrollArea>
          <div className="border-t border-border p-4">
            <p className="text-xs text-muted-foreground mb-2">
              © 2025 Trackify. All rights reserved.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
