
import React, { useState } from 'react';
import { Activity, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExerciseLog {
  id: number;
  type: string;
  duration: number;
}

interface ExerciseTrackerProps {
  className?: string;
}

const ExerciseTracker: React.FC<ExerciseTrackerProps> = ({ className }) => {
  const [totalMinutes, setTotalMinutes] = useState(45);
  const [exercises, setExercises] = useState<ExerciseLog[]>([
    { id: 1, type: 'Running', duration: 30 },
    { id: 2, type: 'Push-ups', duration: 15 }
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newExercise, setNewExercise] = useState({ type: '', duration: '' });

  const addExercise = () => {
    if (newExercise.type.trim() !== '' && newExercise.duration.trim() !== '') {
      const duration = parseInt(newExercise.duration);
      
      if (!isNaN(duration) && duration > 0) {
        const newId = exercises.length > 0 ? Math.max(...exercises.map(e => e.id)) + 1 : 1;
        
        setExercises(prev => [
          ...prev,
          { 
            id: newId, 
            type: newExercise.type, 
            duration: duration 
          }
        ]);
        
        setTotalMinutes(prev => prev + duration);
        
        // Reset form
        setNewExercise({ type: '', duration: '' });
        setShowAdd(false);
      }
    }
  };

  const removeExercise = (id: number) => {
    const exerciseToRemove = exercises.find(e => e.id === id);
    if (exerciseToRemove) {
      setTotalMinutes(prev => prev - exerciseToRemove.duration);
      setExercises(exercises.filter(e => e.id !== id));
    }
  };

  return (
    <div className={cn("glass-card p-5 bg-[#0a1622] text-white", className)}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-green-400" />
          <h3 className="text-xl font-medium">Exercise Log</h3>
        </div>
        <span className="px-3 py-1 rounded-full text-sm bg-[#1e3a2a] flex items-center gap-1">
          <Activity className="h-3.5 w-3.5 text-green-400" />
          <span className="font-medium">Fitness</span>
        </span>
      </div>
      
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-6xl font-bold text-green-500">{totalMinutes}</div>
            <div className="text-gray-400">minutes today</div>
          </div>
          <button 
            onClick={() => setShowAdd(!showAdd)}
            className="w-12 h-12 rounded-full bg-[#1e3a2a] text-green-400 flex items-center justify-center hover:bg-green-700 transition-colors"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
          {exercises.map(exercise => (
            <div 
              key={exercise.id}
              className="p-3 rounded-xl bg-[#1e3a2a]/50 flex justify-between items-center"
            >
              <div>
                <div className="font-medium text-green-400">{exercise.type}</div>
                <div className="text-sm text-gray-400">{exercise.duration} minutes</div>
              </div>
              <button 
                onClick={() => removeExercise(exercise.id)}
                className="p-1.5 rounded-full hover:bg-[#2a4a3a] text-gray-400"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        
        {showAdd && (
          <div className="mt-4 animate-fade-in space-y-2">
            <input
              type="text"
              value={newExercise.type}
              onChange={(e) => setNewExercise({...newExercise, type: e.target.value})}
              placeholder="Exercise type"
              className="flex h-10 w-full rounded-md border border-[#1e3a2a] bg-[#1a1a1a] px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-500"
            />
            <div className="flex gap-2">
              <input
                type="number"
                value={newExercise.duration}
                onChange={(e) => setNewExercise({...newExercise, duration: e.target.value})}
                placeholder="Minutes"
                className="flex h-10 w-full rounded-md border border-[#1e3a2a] bg-[#1a1a1a] px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-500"
              />
              <button 
                onClick={addExercise}
                className="rounded-md px-4 py-2 bg-green-500 text-white hover:bg-green-600 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseTracker;
