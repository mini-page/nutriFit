
import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import WaterTracker from '@/components/ui/water-tracker';
import CalorieTracker from '@/components/ui/calorie-tracker';
import ExerciseTracker from '@/components/ui/exercise-tracker';
import MoodTracker from '@/components/ui/mood-tracker';
import DailyGoal from '@/components/ui/daily-goal';
import { TrendingUp } from 'lucide-react';
import DashboardQuickActions from '@/components/dashboard/DashboardQuickActions';
import DashboardActionableCards from '@/components/dashboard/DashboardActionableCards';
import WeeklyProgressSelector from '@/components/dashboard/WeeklyProgressSelector';
import WeeklyProgressStats from '@/components/dashboard/WeeklyProgressStats';

const Index = () => {
  const [selectedWeek, setSelectedWeek] = useState<'current' | 'last' | 'lastTwoWeeks'>('current');
  const [weeklyData, setWeeklyData] = useState({
    waterProgress: '87%',
    exerciseProgress: '63%',
    sleepQuality: 'Good'
  });
  
  const [dashboardItems, setDashboardItems] = useState({
    water: true,
    nutrition: true,
    exercise: true,
    mood: true,
    goals: true,
    quickWater: true,
    quickExercise: true,
    quickNutrition: true,
    quickGoals: true,
    quickSleep: false,
    quickBudget: false,
    quickMood: false,
    quickCycle: false,
    healthScore: true,
    sleepQuality: true,
    workout: true,
    calories: false, 
    moodTracker: false,
    activeGoals: true,
    journalEntry: false,
    habitsTracker: false
  });

  useEffect(() => {
    const savedDashboardItems = localStorage.getItem('dashboardItems');
    if (savedDashboardItems) {
      try {
        setDashboardItems(prev => ({
          ...prev,
          ...JSON.parse(savedDashboardItems)
        }));
      } catch (error) {
        console.error('Failed to parse dashboard items from localStorage', error);
      }
    }
  }, []);

  const handleWeekChange = (value: 'current' | 'last' | 'lastTwoWeeks') => {
    setSelectedWeek(value);
    // This would typically fetch the actual data for the selected week
    // For now we'll use mock data from our selector component
    const weekOptions = [
      { value: 'current', data: { waterProgress: '87%', exerciseProgress: '63%', sleepQuality: 'Good' } },
      { value: 'last', data: { waterProgress: '72%', exerciseProgress: '55%', sleepQuality: 'Fair' } },
      { value: 'lastTwoWeeks', data: { waterProgress: '79%', exerciseProgress: '58%', sleepQuality: 'Good' } }
    ];
    
    const selectedOption = weekOptions.find(opt => opt.value === value);
    if (selectedOption) {
      setWeeklyData(selectedOption.data);
    }
  };

  const quickActionItems = {
    water: dashboardItems.quickWater,
    exercise: dashboardItems.quickExercise,
    goals: dashboardItems.quickGoals,
    nutrition: dashboardItems.quickNutrition,
    sleep: dashboardItems.quickSleep,
    budget: dashboardItems.quickBudget,
    mood: dashboardItems.quickMood,
    cycle: dashboardItems.quickCycle
  };

  const actionableCardItems = {
    healthScore: dashboardItems.healthScore,
    sleepQuality: dashboardItems.sleepQuality,
    workout: dashboardItems.workout,
    calories: dashboardItems.calories,
    moodTracker: dashboardItems.moodTracker,
    activeGoals: dashboardItems.activeGoals,
    journalEntry: dashboardItems.journalEntry,
    habitsTracker: dashboardItems.habitsTracker
  };

  useEffect(() => {
    const sections = document.querySelectorAll('.animate-on-mount');
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.add('animate-enter');
      }, 100 * index);
    });
  }, []);

  return (
    <MainLayout>
      <div className="mb-6 animate-on-mount opacity-0">
        <h1 className="text-2xl font-bold mb-1">Trackify Dashboard</h1>
        <p className="text-muted-foreground">Track your life, simplify your journey</p>
      </div>
      
      <div className="glass-card p-4 mb-8 animate-on-mount opacity-0">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Weekly Progress</span>
          </h3>
          <WeeklyProgressSelector 
            selectedWeek={selectedWeek}
            onWeekChange={handleWeekChange}
          />
        </div>
        
        <WeeklyProgressStats 
          waterProgress={weeklyData.waterProgress}
          exerciseProgress={weeklyData.exerciseProgress}
          sleepQuality={weeklyData.sleepQuality}
        />
      </div>
      
      <DashboardActionableCards visibleCards={actionableCardItems} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardItems.water && <WaterTracker className="animate-on-mount opacity-0 no-hover" />}
        {dashboardItems.nutrition && <CalorieTracker className="animate-on-mount opacity-0 no-hover" />}
        {dashboardItems.exercise && <ExerciseTracker className="animate-on-mount opacity-0 no-hover" />}
        {dashboardItems.mood && <MoodTracker className="animate-on-mount opacity-0 no-hover" />}
        {dashboardItems.goals && <DailyGoal className="animate-on-mount opacity-0 no-hover" />}
        
        <DashboardQuickActions visibleActions={quickActionItems} />
      </div>
    </MainLayout>
  );
};

export default Index;
