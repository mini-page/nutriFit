
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X, BellRing, InfoIcon } from 'lucide-react';

interface NotificationStripeProps {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  autoDismiss?: boolean;
  dismissDuration?: number;
  className?: string;
}

const NotificationStripe: React.FC<NotificationStripeProps> = ({
  message,
  type = 'info',
  autoDismiss = true,
  dismissDuration = 5000,
  className
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (autoDismiss && visible) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, dismissDuration);

      return () => clearTimeout(timer);
    }
  }, [autoDismiss, dismissDuration, visible]);

  if (!visible) return null;

  const bgColorClass = {
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
  }[type];

  const iconColorClass = {
    info: 'text-blue-500 dark:text-blue-400',
    success: 'text-green-500 dark:text-green-400',
    warning: 'text-amber-500 dark:text-amber-400',
    error: 'text-red-500 dark:text-red-400',
  }[type];

  const IconComponent = type === 'info' ? InfoIcon : BellRing;

  return (
    <div 
      className={cn(
        'w-full py-2 px-4 flex items-center justify-between border-b transition-all',
        bgColorClass,
        className
      )}
    >
      <div className="flex items-center">
        <IconComponent className={cn('h-4 w-4 mr-2', iconColorClass)} />
        <p className="text-sm">{message}</p>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="text-muted-foreground hover:text-foreground"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default NotificationStripe;
