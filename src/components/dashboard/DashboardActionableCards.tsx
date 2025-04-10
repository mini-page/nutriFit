
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  Activity, 
  Heart, 
  BrainCircuit, 
  Bed, 
  Dumbbell, 
  Utensils, 
  Target, 
  BookOpen,
  ChevronDown,
  ChevronUp,
  Droplet,
  DollarSign,
  Clock
} from 'lucide-react';
import ActionableCard from './ActionableCard';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import WeeklyProgressStats from './WeeklyProgressStats';
import WeeklyProgressSelector from './WeeklyProgressSelector';

interface DashboardActionableCardsProps {
  visibleCards: Record<string, boolean>;
  weeklyData: {
    waterProgress: string;
    exerciseProgress: string;
    sleepQuality: string;
  };
  selectedWeek: 'current' | 'last' | 'lastTwoWeeks';
  onWeekChange: (value: 'current' | 'last' | 'lastTwoWeeks') => void;
}

const DashboardActionableCards: React.FC<DashboardActionableCardsProps> = ({ 
  visibleCards, 
  weeklyData, 
  selectedWeek,
  onWeekChange 
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  
  const handleCardAction = (action: string) => {
    switch(action) {
      case 'exercise':
        navigate('/exercise');
        toast.success('Redirecting to exercise page');
        break;
      case 'sleep':
        navigate('/sleep');
        toast.success('Redirecting to sleep page');
        break;
      case 'nutrition':
        navigate('/nutrition');
        toast.success('Redirecting to nutrition page');
        break;
      case 'mood':
        navigate('/mood');
        toast.success('Redirecting to mood page');
        break;
      case 'goals':
        navigate('/goals');
        toast.success('Redirecting to goals page');
        break;
      case 'journal':
        navigate('/journal');
        toast.success('Redirecting to journal page');
        break;
      case 'habits':
        navigate('/habits');
        toast.success('Redirecting to habits page');
        break;
      case 'health':
        navigate('/');
        toast.success('Checking health stats');
        break;
      case 'water':
        navigate('/water');
        toast.success('Redirecting to water page');
        break;
      case 'budget':
        navigate('/budget');
        toast.success('Redirecting to budget page');
        break;
      case 'cycle':
        navigate('/cycle-tracker');
        toast.success('Redirecting to cycle tracker');
        break;
      case 'pomodoro':
        navigate('/pomodoro');
        toast.success('Redirecting to pomodoro timer');
        break;
      default:
        break;
    }
  };
  
  // Define all available cards
  const insightCards = [
    { 
      id: 'health', 
      title: 'Health Score', 
      value: '87/100', 
      icon: Activity, 
      color: 'primary', 
      actionLabel: 'Check Stats', 
      visible: visibleCards.healthScore 
    },
    { 
      id: 'sleep', 
      title: 'Sleep Quality', 
      value: 'Good', 
      icon: Bed, 
      color: 'indigo', 
      actionLabel: 'Track Sleep', 
      visible: visibleCards.sleepQuality 
    },
    { 
      id: 'exercise', 
      title: 'Workout', 
      value: '2 Today', 
      icon: Dumbbell, 
      color: 'green', 
      actionLabel: 'Add Exercise', 
      visible: visibleCards.workout 
    },
    { 
      id: 'nutrition', 
      title: 'Calories', 
      value: '1,560', 
      icon: Utensils, 
      color: 'orange', 
      actionLabel: 'Log Meal', 
      visible: visibleCards.calories 
    },
    { 
      id: 'mood', 
      title: 'Mood', 
      value: 'Happy', 
      icon: BrainCircuit, 
      color: 'yellow', 
      actionLabel: 'Track Mood', 
      visible: visibleCards.moodTracker 
    },
    { 
      id: 'goals', 
      title: 'Goals', 
      value: '3 Active', 
      icon: Target, 
      color: 'blue', 
      actionLabel: 'View Goals', 
      visible: visibleCards.activeGoals 
    },
    { 
      id: 'journal', 
      title: 'Journal', 
      value: 'New Entry', 
      icon: BookOpen, 
      color: 'emerald', 
      actionLabel: 'Write Entry', 
      visible: visibleCards.journalEntry 
    },
    { 
      id: 'habits', 
      title: 'Habits', 
      value: '5 Tracked', 
      icon: Heart, 
      color: 'rose', 
      actionLabel: 'Check Habits', 
      visible: visibleCards.habitsTracker 
    },
  ];
  
  // Quick action cards
  const quickActionCards = [
    { 
      id: 'water', 
      title: 'Water', 
      value: '5/8 Glasses', 
      icon: Droplet, 
      color: 'cyan', 
      actionLabel: 'Add Water', 
      visible: visibleCards.quickWater 
    },
    { 
      id: 'nutrition', 
      title: 'Nutrition', 
      value: '1,200/2,000 kcal', 
      icon: Utensils, 
      color: 'orange', 
      actionLabel: 'Log Meal', 
      visible: visibleCards.quickNutrition 
    },
    { 
      id: 'exercise', 
      title: 'Exercise', 
      value: '30 min Today', 
      icon: Dumbbell, 
      color: 'green', 
      actionLabel: 'Log Exercise', 
      visible: visibleCards.quickExercise 
    },
    { 
      id: 'mood', 
      title: 'Mood', 
      value: 'How are you?', 
      icon: BrainCircuit, 
      color: 'yellow', 
      actionLabel: 'Log Mood', 
      visible: visibleCards.quickMood 
    },
    { 
      id: 'sleep', 
      title: 'Sleep', 
      value: '7h 30m', 
      icon: Bed, 
      color: 'indigo', 
      actionLabel: 'Log Sleep', 
      visible: visibleCards.quickSleep 
    },
    { 
      id: 'budget', 
      title: 'Budget', 
      value: '$1,200 Left', 
      icon: DollarSign, 
      color: 'green', 
      actionLabel: 'Check Budget', 
      visible: visibleCards.quickBudget 
    },
    { 
      id: 'pomodoro', 
      title: 'Pomodoro', 
      value: 'Start Focus', 
      icon: Clock, 
      color: 'red', 
      actionLabel: 'Start Timer', 
      visible: true
    },
    { 
      id: 'cycle', 
      title: 'Cycle', 
      value: 'Day 14', 
      icon: Heart, 
      color: 'rose', 
      actionLabel: 'Track Cycle', 
      visible: visibleCards.quickCycle 
    },
    { 
      id: 'goals', 
      title: 'Goals', 
      value: '2/3 Completed', 
      icon: Target, 
      color: 'blue', 
      actionLabel: 'View Goals', 
      visible: visibleCards.quickGoals 
    }
  ];
  
  // Filter only visible cards
  const visibleInsightCards = insightCards.filter(card => card.visible);
  const visibleQuickActionCards = quickActionCards.filter(card => card.visible);
  
  if (visibleInsightCards.length === 0 && 
      visibleQuickActionCards.length === 0 && 
      !visibleCards.weeklyProgress) {
    return null;
  }
  
  return (
    <div className="glass-card p-5 mb-6 bg-[#0a1622]">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <div className="flex items-center justify-between mb-6">
          <CollapsibleTrigger asChild className="w-full flex items-center justify-between">
            <button className="flex items-center justify-between w-full text-left">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-400" />
                <span className="text-lg font-medium text-white">Actionable Insights</span>
              </div>
              {isOpen ? 
                <ChevronUp className="h-4 w-4 text-gray-400" /> : 
                <ChevronDown className="h-4 w-4 text-gray-400" />
              }
            </button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent>
          {visibleCards.weeklyProgress && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-md font-medium flex items-center gap-2 text-white">
                  <Activity className="h-4 w-4 text-blue-400" />
                  <span>Weekly Progress</span>
                </h3>
                <WeeklyProgressSelector 
                  selectedWeek={selectedWeek}
                  onWeekChange={onWeekChange}
                />
              </div>
              
              <WeeklyProgressStats 
                waterProgress={weeklyData.waterProgress}
                exerciseProgress={weeklyData.exerciseProgress}
                sleepQuality={weeklyData.sleepQuality}
              />
            </div>
          )}
          
          {visibleQuickActionCards.length > 0 && (
            <>
              <h3 className="text-md font-medium flex items-center gap-2 mb-3 text-white">
                <Activity className="h-4 w-4 text-blue-400" />
                <span>Quick Actions</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
                {visibleQuickActionCards.map(card => (
                  <ActionableCard
                    key={card.id}
                    title={card.title}
                    value={card.value}
                    icon={card.icon}
                    color={card.color}
                    actionLabel={card.actionLabel}
                    onClick={() => handleCardAction(card.id)}
                    size="small"
                  />
                ))}
              </div>
            </>
          )}
          
          {visibleInsightCards.length > 0 && (
            <>
              <h3 className="text-md font-medium flex items-center gap-2 mb-3 text-white">
                <Target className="h-4 w-4 text-blue-400" />
                <span>Insights</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {visibleInsightCards.map(card => (
                  <ActionableCard
                    key={card.id}
                    title={card.title}
                    value={card.value}
                    icon={card.icon}
                    color={card.color}
                    actionLabel={card.actionLabel}
                    onClick={() => handleCardAction(card.id)}
                  />
                ))}
              </div>
            </>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default DashboardActionableCards;
