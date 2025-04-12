
import React, { useEffect, useState } from 'react';
import Header from '@/components/ui/header';
import SidebarNav from '@/components/nav/sidebar-nav';
import { useIsMobile } from '@/hooks/use-mobile';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  const [userName, setUserName] = useState("Life Tracker!");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    // Load sidebar state from localStorage for desktop only
    if (!isMobile) {
      const savedState = localStorage.getItem('sidebar-collapsed');
      if (savedState) {
        setCollapsed(savedState === 'true');
      }
    }

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
  }, [isMobile]);

  return (
    <TooltipProvider>
      <div className="min-h-screen flex w-full overflow-hidden">
        {/* Desktop sidebar is always visible but can be collapsed */}
        {!isMobile && 
          <SidebarNav 
            hideLogo={false} 
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
        }
        
        {/* Mobile sidebar is shown conditionally with overlay */}
        {isMobile && mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}>
            <div className="h-full w-[85%] max-w-[300px]" onClick={e => e.stopPropagation()}>
              <SidebarNav 
                hideLogo={false} 
                collapsed={false} 
                setCollapsed={() => {}} // Empty function - collapse shouldn't be toggleable on mobile
              />
            </div>
          </div>
        )}
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            userName={userName}
            onMenuClick={isMobile ? () => setMobileMenuOpen(!mobileMenuOpen) : undefined}
          />
          <main className="flex-1 px-2 sm:px-4 lg:px-6 py-4 w-full overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MainLayout;
