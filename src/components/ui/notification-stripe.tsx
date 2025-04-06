
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface NotificationStripeProps {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number; // in milliseconds, defaults to 3000ms (3 seconds)
  onClose?: () => void;
}

export const NotificationStripe: React.FC<NotificationStripeProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  
  const getBgColor = () => {
    switch (type) {
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-primary';
    }
  };
  
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300); // Wait for animation to complete
  };
  
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration]);
  
  if (!isVisible) return null;
  
  return (
    <div className={`notification-stripe ${getBgColor()} ${isClosing ? 'slide-up' : ''}`}>
      <div className="flex-1 text-center text-sm md:text-base">{message}</div>
      <button 
        onClick={handleClose}
        className="ml-2 p-1 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Close notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
