import React, { useEffect } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Activity, User } from 'lucide-react';
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
  return <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="p-2 text-primary-foreground hover:text-primary-foreground/80 focus:outline-none">
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between border-b p-4 bg-primary text-primary-foreground rounded-b-xl">
            <div className="flex items-center">
              <div className="bg-white text-primary rounded-lg p-1 mr-2">
                <Activity className="h-5 w-5" />
              </div>
              <h1 className="text-xl font-bold">Trackify</h1>
            </div>
          </div>
          <ScrollArea className="flex-1 h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="pt-2 rounded-none mx-6 my-0 px-0 py-0 bg-stone-950">
              <SidebarNav hideLogo={true} />
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>;
};