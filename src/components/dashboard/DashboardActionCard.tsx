
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface DashboardActionCardProps {
  title: string;
  icon: LucideIcon;
  color: string;
  onClick?: () => void;
  className?: string;
}

const DashboardActionCard: React.FC<DashboardActionCardProps> = ({
  title,
  icon: Icon,
  color,
  onClick,
  className
}) => {
  // Map of color strings to Tailwind classes for better type safety
  const colorClasses: Record<string, { bg: string, text: string }> = {
    primary: { bg: 'bg-primary/10', text: 'text-primary' },
    water: { bg: 'bg-blue-500/10', text: 'text-blue-500' },
    goal: { bg: 'bg-green-500/10', text: 'text-green-500' },
    calories: { bg: 'bg-orange-500/10', text: 'text-orange-500' },
    purple: { bg: 'bg-purple-500/10', text: 'text-purple-500' },
    green: { bg: 'bg-green-500/10', text: 'text-green-500' },
    pink: { bg: 'bg-pink-500/10', text: 'text-pink-500' },
    rose: { bg: 'bg-rose-500/10', text: 'text-rose-500' }
  };

  // Get color classes or use default
  const colorClass = colorClasses[color] || { bg: 'bg-primary/10', text: 'text-primary' };

  return (
    <button 
      className={cn(
        "p-4 bg-secondary/50 dark:bg-secondary/20 rounded-xl hover:bg-secondary/70 dark:hover:bg-secondary/30 transition-all flex flex-col items-center justify-center w-full", 
        className
      )}
      onClick={onClick}
    >
      <div className={cn('h-12 w-12 rounded-full flex items-center justify-center mb-2', colorClass.bg)}>
        <Icon className={cn('h-6 w-6', colorClass.text)} />
      </div>
      <span className="text-sm font-medium">{title}</span>
    </button>
  );
};

export default DashboardActionCard;
