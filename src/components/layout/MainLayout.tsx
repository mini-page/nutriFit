
import React from 'react';
import Header from '@/components/ui/header';
import SidebarNav from '@/components/nav/sidebar-nav';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex">
      {!isMobile && <SidebarNav />}
      
      <div className="flex-1 flex flex-col">
        <div className="flex items-center border-b">
          <Header userName="Umang" />
        </div>
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
