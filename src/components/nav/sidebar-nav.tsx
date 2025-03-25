
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Droplet, Flame, Activity, SmilePlus, Target, Calendar, Settings, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

interface SidebarNavProps {
  hideLogo?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, href, active }) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
        active 
          ? "bg-primary/10 text-primary font-medium" 
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
    >
      {icon}
      <span>{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
    </Link>
  );
};

const SidebarNav: React.FC<SidebarNavProps> = ({ hideLogo = false }) => {
  // Safely check if we can use useLocation
  let pathname = '/';
  try {
    const location = useLocation();
    pathname = location.pathname;
  } catch (error) {
    // If useLocation throws an error, we're outside of Router context
    console.warn('SidebarNav rendered outside Router context, defaulting active state to homepage');
  }

  const today = new Date();
  const formattedDate = format(today, 'E dd MMM yyyy');

  const navItems = [
    { icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard', href: '/' },
    { icon: <Droplet className="h-5 w-5" />, label: 'Water Tracker', href: '/water' },
    { icon: <Flame className="h-5 w-5" />, label: 'Nutrition', href: '/nutrition' },
    { icon: <Activity className="h-5 w-5" />, label: 'Exercise', href: '/exercise' },
    { icon: <SmilePlus className="h-5 w-5" />, label: 'Mood', href: '/mood' },
    { icon: <Moon className="h-5 w-5" />, label: 'Sleep', href: '/sleep' },
    { icon: <Target className="h-5 w-5" />, label: 'Goals', href: '/goals' },
    { icon: <Calendar className="h-5 w-5" />, label: 'Calendar', href: '/calendar' },
  ];

  return (
    <div className="w-60 h-screen sticky top-0 flex flex-col border-r border-border pt-6 bg-background/80 backdrop-blur-md">
      {!hideLogo && (
        <>
          <div className="px-6 mb-2">
            <h1 className="text-2xl font-bold flex items-center">
              <span className="bg-primary text-primary-foreground rounded-lg p-1 mr-2">
                <Activity className="h-5 w-5" />
              </span>
              NutriFit
            </h1>
            <p 
              className="text-muted-foreground text-sm mt-1 cursor-pointer hover:text-foreground transition-colors"
              onClick={() => {
                try {
                  window.location.href = '/calendar';
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              {formattedDate}
            </p>
          </div>
          <div className="mt-4 border-t border-border pt-4 mx-6 mb-4"></div>
        </>
      )}
      
      <div className="px-3 flex-1 overflow-auto">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={pathname === item.href}
            />
          ))}
        </div>
      </div>

      <div className="mt-auto border-t border-border pt-3 px-3 pb-6">
        <NavItem
          icon={<Settings className="h-5 w-5" />}
          label="Settings"
          href="/settings"
          active={pathname === '/settings'}
        />
      </div>
    </div>
  );
};

export default SidebarNav;
