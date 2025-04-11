
import React, { useEffect, useState } from 'react'; import MainLayout from '@/components/layout/MainLayout';
import WaterTracker from '@/components/ui/water-tracker';
import CalorieTracker from '@/components/ui/calorie-tracker';
import ExerciseTracker from '@/components/ui/exercise-tracker';
import MoodTracker from '@/components/ui/mood-tracker';
import DailyGoal from '@/components/ui/daily-goal';
import DashboardActionableCards from '@/components/dashboard/DashboardActionableCards';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { X } from 'lucide-react';

const defaultDashboardItems = {
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
};

const Index = () => {
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

  // Water Tracker State and Functions
  const [waterIntake, setWaterIntake] = useState({ currentValue: 0, goal: 8 });
  const addWater = (amount: number) => {
    setWaterIntake(prev => ({ ...prev, currentValue: prev.currentValue + amount }));
  };
  const removeWater = (amount: number) => {
    setWaterIntake(prev => ({ ...prev, currentValue: Math.max(0, prev.currentValue - amount) }));
  };

  // Calorie Tracker State and Functions
  const [calorieIntake, setCalorieIntake] = useState({ currentValue: 0, goal: 2000 });
  const addCalorie = (amount: number) => {
    setCalorieIntake(prev => ({ ...prev, currentValue: prev.currentValue + amount }));
  };
  const removeCalorie = (amount: number) => {
    setCalorieIntake(prev => ({ ...prev, currentValue: Math.max(0, prev.currentValue - amount) }));
  };

  // Exercise Tracker State and Functions
  const [exerciseMinutes, setExerciseMinutes] = useState({ currentValue: 0, goal: 30 });
  const addExercise = (minutes: number) => {
    setExerciseMinutes(prev => ({ ...prev, currentValue: prev.currentValue + minutes }));
  };
  const removeExercise = (minutes: number) => {
    setExerciseMinutes(prev => ({ ...prev, currentValue: Math.max(0, prev.currentValue - minutes) }));
  };

  // Combined Actionable Insights
  const actionableInsightItems = {
    healthScore: dashboardItems.healthScore,
    sleepQuality: dashboardItems.sleepQuality,
    workout: dashboardItems.workout,
    calories: dashboardItems.calories,
    moodTracker: dashboardItems.moodTracker,
    activeGoals: dashboardItems.activeGoals,
    quickWater: dashboardItems.quickWater,
    quickExercise: dashboardItems.quickExercise,
    quickNutrition: dashboardItems.quickNutrition,
  };

  useEffect(() => {
    const savedDashboardItems = localStorage.getItem('dashboardItems');
    if (savedDashboardItems) {
      try {
        setDashboardItems(prev => ({
          ...prev,
          ...JSON.parse(savedDashboardItems),
        }));
      } catch (error) {
        console.error('Failed to parse dashboard items from localStorage', error);
        // Optionally, reset to default items if parsing fails
        setDashboardItems(defaultDashboardItems);
      }
    } else {
      // If no items are saved, use the default items
      setDashboardItems(defaultDashboardItems);
    }

    // Ensure we have default values for the trackers if they are not in local storage
    if (!localStorage.getItem('waterIntake')) {
      localStorage.setItem('waterIntake', JSON.stringify(waterIntake));
    }
    if (!localStorage.getItem('calorieIntake')) {
      localStorage.setItem('calorieIntake', JSON.stringify(calorieIntake));
    }
    if (!localStorage.getItem('exerciseMinutes')) {
      localStorage.setItem('exerciseMinutes', JSON.stringify(exerciseMinutes));
    }

  }, []);

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

      <DashboardActionableCards visibleCards={actionableInsightItems} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardItems.water && (
          <WaterTracker
            currentIntake={waterIntake.currentValue}
            goal={waterIntake.goal}
            addWater={addWater}
            removeWater={removeWater}
            className="animate-on-mount opacity-0"
          />
        )}
        {dashboardItems.nutrition && (
          <CalorieTracker
            currentIntake={calorieIntake.currentValue}
            goal={calorieIntake.goal}
            addCalorie={addCalorie}
            removeCalorie={removeCalorie}
            className="animate-on-mount opacity-0"
          />
        )}
        {dashboardItems.exercise && (
          <ExerciseTracker
            currentMinutes={exerciseMinutes.currentValue}
            goal={exerciseMinutes.goal}
            addExercise={addExercise}
            removeExercise={removeExercise}
            className="animate-on-mount opacity-0"
          />
        )}
        {dashboardItems.mood && <MoodTracker className="animate-on-mount opacity-0" />}
        {dashboardItems.goals && <DailyGoal className="animate-on-mount opacity-0" />}
      </div>
    </MainLayout>
  );
};

export default Index;
