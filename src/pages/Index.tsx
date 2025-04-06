
import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import WaterTracker from '@/components/ui/water-tracker';
import CalorieTracker from '@/components/ui/calorie-tracker';
import ExerciseTracker from '@/components/ui/exercise-tracker';
import MoodTracker from '@/components/ui/mood-tracker';
import DailyGoal from '@/components/ui/daily-goal';
import DashboardActionableCards from '@/components/dashboard/DashboardActionableCards';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { X } from 'lucide-react';

const Index = () => {
  const [selectedWeek, setSelectedWeek] = useState<'current' | 'last' | 'lastTwoWeeks'>('current');
  const [weeklyData, setWeeklyData] = useState({
    waterProgress: '87%',
    exerciseProgress: '63%',
    sleepQuality: 'Good'
  });
  
  const [dashboardItems, setDashboardItems] = useState({
    // Trackers
    water: true,
    nutrition: true,
    exercise: true,
    mood: true,
    goals: true,
    
    // Quick actions (now part of actionable insights)
    quickWater: true,
    quickExercise: true,
    quickNutrition: true,
    quickGoals: true,
    quickSleep: false,
    quickBudget: false,
    quickMood: false,
    quickCycle: false,
    
    // Actionable cards
    healthScore: true,
    sleepQuality: true,
    workout: true,
    calories: false, 
    moodTracker: false,
    activeGoals: true,
    journalEntry: false,
    habitsTracker: false,
    
    // Weekly progress (now part of actionable insights)
    weeklyProgress: true
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

  useEffect(() => {
    const sections = document.querySelectorAll('.animate-on-mount');
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.add('animate-enter');
      }, 100 * index);
    });
  }, []);

  // Create a consolidated object for actionable cards and quick actions
  const actionableInsightItems = {
    healthScore: dashboardItems.healthScore,
    sleepQuality: dashboardItems.sleepQuality,
    workout: dashboardItems.workout,
    calories: dashboardItems.calories,
    moodTracker: dashboardItems.moodTracker,
    activeGoals: dashboardItems.activeGoals,
    journalEntry: dashboardItems.journalEntry,
    habitsTracker: dashboardItems.habitsTracker,
    quickWater: dashboardItems.quickWater,
    quickExercise: dashboardItems.quickExercise,
    quickNutrition: dashboardItems.quickNutrition,
    quickGoals: dashboardItems.quickGoals,
    quickSleep: dashboardItems.quickSleep,
    quickBudget: dashboardItems.quickBudget,
    quickMood: dashboardItems.quickMood,
    quickCycle: dashboardItems.quickCycle,
    weeklyProgress: dashboardItems.weeklyProgress
  };

  return (
    <MainLayout>
      <div className="mb-6 animate-on-mount opacity-0">
        <h1 className="text-2xl font-bold mb-1">Trackify Dashboard</h1>
        <p className="text-muted-foreground">Track your life, simplify your journey</p>
      </div>
      
      <DashboardActionableCards 
        visibleCards={actionableInsightItems} 
        weeklyData={weeklyData}
        selectedWeek={selectedWeek}
        onWeekChange={handleWeekChange}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardItems.water && <WaterTracker className="animate-on-mount opacity-0 no-hover" />}
        {dashboardItems.nutrition && <CalorieTracker className="animate-on-mount opacity-0 no-hover" />}
        {dashboardItems.exercise && <ExerciseTracker className="animate-on-mount opacity-0 no-hover" />}
        {dashboardItems.mood && <MoodTracker className="animate-on-mount opacity-0 no-hover" />}
        {dashboardItems.goals && <DailyGoal className="animate-on-mount opacity-0 no-hover" />}
      </div>
    </MainLayout>
  );
};

export default Index;
