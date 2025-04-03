
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Activity, Droplet, TrendingUp, Utensils, Moon, Landmark, Brain, HeartPulse, CircleDollarSign } from 'lucide-react';
import DashboardActionCard from './DashboardActionCard';

interface DashboardQuickActionsProps {
  visibleActions: Record<string, boolean>;
}

const DashboardQuickActions: React.FC<DashboardQuickActionsProps> = ({ visibleActions }) => {
  const navigate = useNavigate();
  
  const handleQuickAction = (action: string) => {
    switch(action) {
      case 'exercise':
        navigate('/exercise');
        toast.success('Redirecting to log exercise');
        break;
      case 'water':
        navigate('/water');
        toast.success('Redirecting to add water');
        break;
      case 'goal':
        navigate('/goals');
        toast.success('Redirecting to set goals');
        break;
      case 'meal':
        navigate('/nutrition');
        toast.success('Redirecting to log meal');
        break;
      case 'sleep':
        navigate('/sleep');
        toast.success('Redirecting to track sleep');
        break;
      case 'budget':
        navigate('/budget');
        toast.success('Redirecting to budget tracker');
        break;
      case 'mood':
        navigate('/mood');
        toast.success('Redirecting to mood tracker');
        break;
      case 'cycle':
        navigate('/cycle-tracker');
        toast.success('Redirecting to cycle tracker');
        break;
      default:
        break;
    }
  };
  
  // Define all available actions
  const actions = [
    { id: 'exercise', title: 'Exercise', icon: Activity, color: 'primary', visible: visibleActions.exercise },
    { id: 'water', title: 'Water', icon: Droplet, color: 'water', visible: visibleActions.water },
    { id: 'goal', title: 'Goals', icon: TrendingUp, color: 'goal', visible: visibleActions.goals },
    { id: 'meal', title: 'Nutrition', icon: Utensils, color: 'calories', visible: visibleActions.nutrition },
    { id: 'sleep', title: 'Sleep', icon: Moon, color: 'purple', visible: visibleActions.sleep },
    { id: 'budget', title: 'Budget', icon: CircleDollarSign, color: 'green', visible: visibleActions.budget },
    { id: 'mood', title: 'Mood', icon: Brain, color: 'pink', visible: visibleActions.mood },
    { id: 'cycle', title: 'Cycle', icon: HeartPulse, color: 'rose', visible: visibleActions.cycle }
  ];
  
  // Filter only visible actions
  const visibleActionCards = actions.filter(action => action.visible);
  
  if (visibleActionCards.length === 0) {
    return null;
  }
  
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <span>Quick Actions</span>
        </h3>
        <span className="category-pill bg-secondary dark:bg-secondary/30 text-muted-foreground">
          <Activity className="h-3.5 w-3.5" />
          Tools
        </span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        {visibleActionCards.map(action => (
          <DashboardActionCard
            key={action.id}
            title={action.title}
            icon={action.icon}
            color={action.color}
            onClick={() => handleQuickAction(action.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardQuickActions;
