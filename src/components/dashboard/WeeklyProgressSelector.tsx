
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface WeekOption {
  label: string;
  value: 'current' | 'last' | 'lastTwoWeeks';
  dateRange: string;
  data: {
    waterProgress: string;
    exerciseProgress: string;
    sleepQuality: string;
  };
}

interface WeeklyProgressSelectorProps {
  selectedWeek: 'current' | 'last' | 'lastTwoWeeks';
  onWeekChange: (value: 'current' | 'last' | 'lastTwoWeeks') => void;
}

const WeeklyProgressSelector: React.FC<WeeklyProgressSelectorProps> = ({
  selectedWeek,
  onWeekChange
}) => {
  const today = new Date();
  const thisWeekStart = startOfWeek(today, { weekStartsOn: 1 });
  const thisWeekEnd = endOfWeek(today, { weekStartsOn: 1 });
  const lastWeekStart = startOfWeek(new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000), { weekStartsOn: 1 });
  const lastWeekEnd = endOfWeek(new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000), { weekStartsOn: 1 });

  const formatDateRange = (start: Date, end: Date) => {
    return `${format(start, 'MMM d')} - ${format(end, 'MMM d')}`;
  };

  const weekOptions: WeekOption[] = [
    { 
      label: 'This Week', 
      value: 'current',
      dateRange: formatDateRange(thisWeekStart, thisWeekEnd),
      data: { waterProgress: '87%', exerciseProgress: '63%', sleepQuality: 'Good' }
    },
    { 
      label: 'Last Week', 
      value: 'last',
      dateRange: formatDateRange(lastWeekStart, lastWeekEnd),
      data: { waterProgress: '72%', exerciseProgress: '55%', sleepQuality: 'Fair' }
    },
    { 
      label: 'Last 2 Weeks', 
      value: 'lastTwoWeeks',
      dateRange: `${format(lastWeekStart, 'MMM d')} - ${format(thisWeekEnd, 'MMM d')}`,
      data: { waterProgress: '79%', exerciseProgress: '58%', sleepQuality: 'Good' }
    }
  ];

  const currentWeekOption = weekOptions.find(opt => opt.value === selectedWeek) || weekOptions[0];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="text-sm text-muted-foreground hover:text-foreground flex items-center">
          {currentWeekOption.label} <ChevronDown className="h-4 w-4 ml-1" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="end">
        <div className="p-2">
          {weekOptions.map((option) => (
            <button
              key={option.value}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                selectedWeek === option.value
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-secondary'
              }`}
              onClick={() => onWeekChange(option.value)}
            >
              <div>{option.label}</div>
              <div className="text-xs text-muted-foreground">{option.dateRange}</div>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default WeeklyProgressSelector;
