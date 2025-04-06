
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Activity } from 'lucide-react';
import SidebarNav from '@/components/nav/sidebar-nav';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="p-2 text-muted-foreground hover:text-foreground focus:outline-none">
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between border-b p-4 bg-secondary/30 rounded-b-xl">
            <div className="flex items-center">
              <div className="bg-primary text-primary-foreground rounded-lg p-1 mr-2">
                <Activity className="h-5 w-5" />
              </div>
              <h1 className="text-xl font-bold">Trackify</h1>
            </div>
          </div>
          <ScrollArea className="flex-1 h-[calc(100vh-4rem)]">
            <div className="pt-2">
              <SidebarNav hideLogo={true} />
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};
