
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
  return (
    <button 
      className={cn(
        "p-4 bg-secondary/50 dark:bg-secondary/20 rounded-xl hover:bg-secondary/70 dark:hover:bg-secondary/30 transition-all flex flex-col items-center justify-center w-full", 
        className
      )}
      onClick={onClick}
    >
      <div className={`h-12 w-12 rounded-full bg-${color}/10 flex items-center justify-center mb-2`}>
        <Icon className={`h-6 w-6 text-${color}`} />
      </div>
      <span className="text-sm font-medium">{title}</span>
    </button>
  );
};

export default DashboardActionCard;
