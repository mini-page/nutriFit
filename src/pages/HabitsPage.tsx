
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2, Award, TrendingUp, Calendar as CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';
import HabitTracker from '@/components/HabitTracker';

const HabitsPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
        
        <HabitTracker/>
        
      </div>
    </MainLayout>
  );
};

export default HabitsPage;
