
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface Habit {
  id: number;
  name: string;
  completed: boolean;
}

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabitName, setNewHabitName] = useState<string>('');

  const addHabit = () => {
    if (newHabitName.trim() !== '') {
      const newHabit: Habit = {
        id: Date.now(),
        name: newHabitName,
        completed: false,
      };
      setHabits([...habits, newHabit]);
      setNewHabitName('');
    }
  };

  const toggleHabitCompletion = (id: number) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Habit Tracker</CardTitle>
        <CardDescription>Add and track your daily habits.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Add a new habit"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
          />
          <Button onClick={addHabit}>Add</Button>
        </div>
        <ul className="space-y-2">
          {habits.map((habit) => (
            <li key={habit.id} className="flex items-center space-x-2">
              <Checkbox
                id={`habit-${habit.id}`}
                checked={habit.completed}
                onCheckedChange={() => toggleHabitCompletion(habit.id)}
              />
              <label
                htmlFor={`habit-${habit.id}`}
                className={habit.completed ? 'line-through text-gray-500' : ''}
              >
                {habit.name}
              </label>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default HabitTracker;
