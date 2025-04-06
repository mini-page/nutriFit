
import React, { useEffect, useState } from 'react';
import Header from '@/components/ui/header';
import SidebarNav from '@/components/nav/sidebar-nav';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [userName, setUserName] = useState("Life Tracker!");

  useEffect(() => {
    // Load user data from localStorage on component mount
    const loadUserName = () => {
      const savedUserData = localStorage.getItem('userData');
      if (savedUserData) {
        try {
          const parsedData = JSON.parse(savedUserData);
          if (parsedData.name) {
            setUserName(parsedData.name.split(' ')[0]); // Use first name
          }
        } catch (error) {
          console.error('Failed to parse user data from localStorage', error);
        }
      }
    };

    loadUserName();

    // Listen for profile updates
    const handleProfileUpdate = (event: any) => {
      const { userData } = event.detail;
      if (userData && userData.name) {
        setUserName(userData.name.split(' ')[0]); // Use first name
      }
    };

    document.addEventListener('user-profile-updated', handleProfileUpdate);
    
    return () => {
      document.removeEventListener('user-profile-updated', handleProfileUpdate);
    };
  }, []);

  return (
    <div className="min-h-screen flex">
      {!isMobile && <SidebarNav hideLogo={false} />}
      
      <div className="flex-1 flex flex-col">
        <div className="flex items-center">
          <Header userName={userName} />
        </div>
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
