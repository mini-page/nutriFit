
import React from 'react';
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
  BookOpen 
} from 'lucide-react';
import ActionableCard from './ActionableCard';

interface DashboardActionableCardsProps {
  visibleCards: Record<string, boolean>;
}

const DashboardActionableCards: React.FC<DashboardActionableCardsProps> = ({ visibleCards }) => {
  const navigate = useNavigate();
  
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
      default:
        break;
    }
  };
  
  // Define all available cards
  const cards = [
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
    }
  ];
  
  // Filter only visible cards
  const visibleActionCards = cards.filter(card => card.visible);
  
  if (visibleActionCards.length === 0) {
    return null;
  }
  
  return (
    <div className="glass-card p-5 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <span>Actionable Insights</span>
        </h3>
        <span className="category-pill bg-secondary dark:bg-secondary/30 text-muted-foreground">
          <Activity className="h-3.5 w-3.5" />
          Insights
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {visibleActionCards.map(card => (
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
    </div>
  );
};

export default DashboardActionableCards;
