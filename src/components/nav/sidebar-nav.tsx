
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Droplet, 
  Flame, 
  Activity, 
  SmilePlus, 
  Target, 
  Calendar, 
  Settings, 
  Moon, 
  DollarSign,
  Clock,
  CheckSquare,
  BookOpen,
  Heart,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
}

interface SidebarNavProps {
  hideLogo?: boolean;
  collapsed?: boolean;
  setCollapsed?: (collapsed: boolean) => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, href, active, collapsed }) => {
  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={href}
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 mx-auto my-1",
              active 
                ? "bg-primary/10 text-primary" 
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            {icon}
            {active && <div className="absolute right-0 w-1 h-1.5 rounded-full bg-primary" />}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
        active 
          ? "bg-primary/10 text-primary font-medium" 
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      {icon}
      <span>{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
    </Link>
  );
};

const SidebarNav: React.FC<SidebarNavProps> = ({ 
  hideLogo = false,
  collapsed: propCollapsed, 
  setCollapsed: propSetCollapsed
}) => {
  // Get current route
  let pathname = '/';
  try {
    const location = useLocation();
    pathname = location.pathname;
  } catch (error) {
    console.warn('SidebarNav rendered outside Router context, defaulting active state to homepage');
  }

  // Use internal state if props not provided
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  
  // Determine which collapsed state and setter to use
  const collapsed = propCollapsed !== undefined ? propCollapsed : internalCollapsed;
  const setCollapsed = propSetCollapsed || setInternalCollapsed;
  
  // If using internal state, handle localStorage
  useEffect(() => {
    if (propCollapsed === undefined) {
      const savedState = localStorage.getItem('sidebar-collapsed');
      if (savedState) {
        setInternalCollapsed(savedState === 'true');
      }
    }
  }, [propCollapsed]);
  
  // Save collapsed state to localStorage (only when using internal state)
  const toggleCollapsed = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    
    // Only save to localStorage if we're using internal state
    if (propCollapsed === undefined) {
      localStorage.setItem('sidebar-collapsed', String(newState));
    }
  };

  // Nav items grouped by section
  const healthNavItems = [
    { icon: <Droplet className="h-5 w-5 text-cyan-500" />, label: 'Water Tracker', href: '/water' },
    { icon: <Flame className="h-5 w-5 text-orange-500" />, label: 'Nutrition', href: '/nutrition' },
    { icon: <Activity className="h-5 w-5 text-green-500" />, label: 'Exercise', href: '/exercise' },
    { icon: <Moon className="h-5 w-5 text-indigo-500" />, label: 'Sleep', href: '/sleep' },
  ];

  const wellbeingNavItems = [
    { icon: <SmilePlus className="h-5 w-5 text-yellow-500" />, label: 'Mood', href: '/mood' },
    { icon: <BookOpen className="h-5 w-5 text-emerald-500" />, label: 'Journal', href: '/journal' },
    { icon: <Heart className="h-5 w-5 text-pink-500" />, label: 'Cycle Tracker', href: '/cycle-tracker' },
  ];

  const productivityNavItems = [
    { icon: <Clock className="h-5 w-5 text-red-500" />, label: 'Pomodoro', href: '/pomodoro' },
    { icon: <CheckSquare className="h-5 w-5 text-purple-500" />, label: 'Habits', href: '/habits' },
    { icon: <Target className="h-5 w-5 text-blue-600" />, label: 'Goals', href: '/goals' },
    { icon: <DollarSign className="h-5 w-5 text-green-600" />, label: 'Budget', href: '/budget' },
    { icon: <Calendar className="h-5 w-5 text-violet-500" />, label: 'Calendar', href: '/calendar' },
  ];

  return (
    <div 
      className={cn(
        "h-full flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 hidden md:flex",
        collapsed ? "w-20" : "w-60"
      )}
    >
      {!hideLogo && (
        <div className={cn(
          "px-6 pt-6 pb-4 flex items-center",
          collapsed && "justify-center px-2"
        )}>
          <h1 className={cn(
            "text-2xl font-bold flex items-center",
            collapsed ? "justify-center" : ""
          )}>
            <span className="bg-primary text-primary-foreground rounded-lg p-1 mr-2">
              <Activity className="h-5 w-5" />
            </span>
            {!collapsed && "Trackify"}
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className="ml-auto"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>
      )}
      
      <ScrollArea className="flex-1">
        <div className={cn(
          "px-3 pb-6",
          collapsed && "px-1"
        )}>
          <div className="space-y-4">
            {/* Dashboard */}
            <div>
              <NavItem
                icon={<LayoutDashboard className="h-5 w-5 text-blue-500" />}
                label="Dashboard"
                href="/"
                active={pathname === '/'}
                collapsed={collapsed}
              />
            </div>

            {/* Health Tracking Section */}
            <div>
              {!collapsed && (
                <div className="px-4 py-1">
                  <h3 className="text-xs uppercase font-medium text-sidebar-foreground/70 tracking-wider">Health</h3>
                </div>
              )}
              <div className="space-y-1">
                {healthNavItems.map((item) => (
                  <NavItem
                    key={item.href}
                    icon={item.icon}
                    label={item.label}
                    href={item.href}
                    active={pathname === item.href}
                    collapsed={collapsed}
                  />
                ))}
              </div>
            </div>
            
            {/* Mental & Emotional Tracking */}
            <div>
              {!collapsed && (
                <div className="px-4 py-1">
                  <h3 className="text-xs uppercase font-medium text-sidebar-foreground/70 tracking-wider">Well-being</h3>
                </div>
              )}
              <div className="space-y-1">
                {wellbeingNavItems.map((item) => (
                  <NavItem
                    key={item.href}
                    icon={item.icon}
                    label={item.label}
                    href={item.href}
                    active={pathname === item.href}
                    collapsed={collapsed}
                  />
                ))}
              </div>
            </div>
            
            {/* Productivity & Goals */}
            <div>
              {!collapsed && (
                <div className="px-4 py-1">
                  <h3 className="text-xs uppercase font-medium text-sidebar-foreground/70 tracking-wider">Productivity</h3>
                </div>
              )}
              <div className="space-y-1">
                {productivityNavItems.map((item) => (
                  <NavItem
                    key={item.href}
                    icon={item.icon}
                    label={item.label}
                    href={item.href}
                    active={pathname === item.href}
                    collapsed={collapsed}
                  />
                ))}
              </div>
            </div>
            
            {/* Settings at the bottom */}
            <div>
              {!collapsed && (
                <div className="px-4 py-1">
                  <h3 className="text-xs uppercase font-medium text-sidebar-foreground/70 tracking-wider">Preferences</h3>
                </div>
              )}
              <div className="space-y-1">
                <NavItem
                  icon={<Settings className="h-5 w-5 text-gray-500" />}
                  label="Settings"
                  href="/settings"
                  active={pathname === '/settings'}
                  collapsed={collapsed}
                />
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default SidebarNav;
