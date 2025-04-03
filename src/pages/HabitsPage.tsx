
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Award, TrendingUp, Calendar as CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';
import { format, startOfWeek, addDays } from 'date-fns';

interface Habit {
  id: number;
  name: string;
  target: number;
  currentStreak: number;
  bestStreak: number;
  completed: Record<string, boolean>;
}

const HabitsPage = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 1,
      name: 'Drink 8 glasses of water',
      target: 7,
      currentStreak: 3,
      bestStreak: 5,
      completed: {
        '2023-04-01': true,
        '2023-04-02': true,
        '2023-04-03': true,
      }
    },
    {
      id: 2,
      name: 'Exercise for 30 minutes',
      target: 5,
      currentStreak: 2,
      bestStreak: 7,
      completed: {
        '2023-04-01': true,
        '2023-04-02': true,
      }
    },
    {
      id: 3,
      name: 'Meditate',
      target: 7,
      currentStreak: 0,
      bestStreak: 10,
      completed: {}
    },
  ]);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitTarget, setNewHabitTarget] = useState(7);
  
  // Generate array of dates for the current week
  const today = new Date();
  const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 }); // Monday
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startOfCurrentWeek, i);
    return {
      date,
      dayName: format(date, 'EEE'),
      dateString: format(date, 'yyyy-MM-dd')
    };
  });

  const handleAddHabit = () => {
    if (!newHabitName.trim()) {
      toast.error('Please enter a habit name');
      return;
    }
    
    const newHabit: Habit = {
      id: Date.now(),
      name: newHabitName,
      target: newHabitTarget,
      currentStreak: 0,
      bestStreak: 0,
      completed: {}
    };
    
    setHabits([...habits, newHabit]);
    setNewHabitName('');
    toast.success('Habit added successfully');
  };

  const handleToggleHabit = (habitId: number, dateString: string) => {
    setHabits(prevHabits => {
      return prevHabits.map(habit => {
        if (habit.id === habitId) {
          const wasCompleted = habit.completed[dateString] || false;
          const newCompleted = { ...habit.completed, [dateString]: !wasCompleted };
          
          // Calculate new streak
          let currentStreak = 0;
          let date = new Date();
          let dateStr = format(date, 'yyyy-MM-dd');
          
          while (newCompleted[dateStr]) {
            currentStreak++;
            date.setDate(date.getDate() - 1);
            dateStr = format(date, 'yyyy-MM-dd');
          }
          
          return {
            ...habit,
            completed: newCompleted,
            currentStreak,
            bestStreak: Math.max(currentStreak, habit.bestStreak)
          };
        }
        return habit;
      });
    });
  };

  const handleDeleteHabit = (habitId: number) => {
    setHabits(habits.filter(habit => habit.id !== habitId));
    toast.success('Habit deleted');
  };

  const getCompletionRate = (habit: Habit) => {
    const completedDays = Object.values(habit.completed).filter(Boolean).length;
    return Math.floor((completedDays / habit.target) * 100);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Add New Habit</CardTitle>
            <CardDescription>Track a new daily habit</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Habit name (e.g., Read for 20 minutes)"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                className="flex-1"
              />
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-sm text-muted-foreground">Target days per week:</span>
                <Input
                  type="number"
                  min="1"
                  max="7"
                  value={newHabitTarget}
                  onChange={(e) => setNewHabitTarget(parseInt(e.target.value))}
                  className="w-16"
                />
              </div>
              <Button onClick={handleAddHabit}>
                <Plus className="mr-2 h-4 w-4" />
                Add Habit
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Habits</h2>
            <div className="text-sm text-muted-foreground">
              Week of {format(startOfCurrentWeek, 'MMM d')} - {format(addDays(startOfCurrentWeek, 6), 'MMM d, yyyy')}
            </div>
          </div>
          
          {habits.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-8">
                <div className="rounded-full bg-primary/10 p-4 mb-4">
                  <CalendarIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">No habits yet</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Start by adding your first habit above to build a consistent routine.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {habits.map(habit => (
                <Card key={habit.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle>{habit.name}</CardTitle>
                    <CardDescription>
                      Target: {habit.target} days/week ({getCompletionRate(habit)}% complete)
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-primary h-full"
                        style={{ width: `${Math.min(100, getCompletionRate(habit))}%` }}
                      ></div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-7 gap-1 text-center">
                      {weekDates.map(({ date, dayName, dateString }) => (
                        <div key={dateString} className="flex flex-col items-center">
                          <span className="text-xs text-muted-foreground mb-1">{dayName}</span>
                          <div className="flex items-center justify-center w-full">
                            <Checkbox 
                              checked={habit.completed[dateString] || false}
                              onCheckedChange={() => handleToggleHabit(habit.id, dateString)}
                              className="h-6 w-6 rounded-full data-[state=checked]:bg-primary"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t flex justify-between pt-4">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-amber-500" />
                        <span className="text-sm">{habit.bestStreak} best</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{habit.currentStreak} current</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteHabit(habit.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default HabitsPage;
