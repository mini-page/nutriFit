
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Activity } from 'lucide-react';
import SidebarNav from '@/components/nav/sidebar-nav';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  mobileDate: string;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, setIsOpen, mobileDate }) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="p-2 text-muted-foreground hover:text-foreground focus:outline-none">
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center">
            <div className="bg-primary text-primary-foreground rounded-lg p-1 mr-2">
              <Activity className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold">NutriFit</h1>
          </div>
          {/* No need for additional close button due to SheetContent already having one */}
        </div>
        <div className="overflow-y-auto h-full">
          <SidebarNav />
        </div>
      </SheetContent>
    </Sheet>
  );
};
