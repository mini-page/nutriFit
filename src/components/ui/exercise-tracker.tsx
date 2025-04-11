
import React, { useState } from 'react';
import { Activity, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExerciseTrackerProps {\n  className?: string;\n  exerciseData: { exercises: { id: string; name: string; duration: number }[] };\n  addExercise: (exercise: { name: string; duration: number }) => void;\n  removeExercise: (id: string) => void;\n}\n\nconst ExerciseTracker: React.FC<ExerciseTrackerProps> = ({ className, exerciseData, addExercise, removeExercise }) => {\n  const { exercises } = exerciseData;\n  const [showAdd, setShowAdd] = useState(false);\n  const [newExercise, setNewExercise] = useState(\'\');\n  const [newDuration, setNewDuration] = useState(\'\');\n\n  const totalMinutes = exercises.reduce((acc, exercise) => acc + exercise.duration, 0);\n\n  const handleAddExercise = () => {\n    if (newExercise.trim() !== \'\' && newDuration.trim() !== \'\') {\n      const duration = parseInt(newDuration);\n      if (!isNaN(duration) && duration > 0) {\n        addExercise({ name: newExercise, duration });\n        setNewExercise(\'\');\n        setNewDuration(\'\');\n        setShowAdd(false);\n      }\n    }\n  };\n\n  return (\n    <div className={cn(\"glass-card p-5\", className)}>\n      <div className=\"flex items-center justify-between mb-3\">\n        <h3 className=\"text-lg font-medium flex items-center gap-2\">\n          <Activity className=\"h-5 w-5 text-exercise\" />\n          <span>Exercise Log</span>\n        </h3>\n        <span className=\"category-pill bg-exercise-light text-exercise-dark\">\n          <Activity className=\"h-3.5 w-3.5\" />\n          Fitness\n        </span>\n      </div>\n\n      <div className=\"mt-3\">\n        <div className=\"flex justify-between items-center mb-4\">\n          <div>\n            <span className=\"text-3xl font-bold text-exercise-dark\">{totalMinutes}</span>\n            <span className=\"text-muted-foreground text-sm ml-1\">minutes today</span>\n          </div>\n          <button\n            onClick={() => setShowAdd(!showAdd)}\n            className=\"p-2 rounded-full bg-exercise-light text-exercise-dark hover:bg-exercise hover:text-white transition-colors\"\n          >\n            <Plus className=\"h-5 w-5\" />\n          </button>\n        </div>\n\n        <div className=\"space-y-2 max-h-[200px] overflow-auto pr-1\">\n          {exercises.map(exercise => (\n            <div\n              key={exercise.id}\n              className=\"flex items-center justify-between p-2 bg-exercise-light/50 rounded-lg\"\n            >\n              <div>\n                <p className=\"font-medium text-exercise-dark\">{exercise.name}</p>\n                <p className=\"text-sm text-muted-foreground\">{exercise.duration} minutes</p>\n              </div>\n              <button\n                onClick={() => removeExercise(exercise.id)}\n                className=\"p-1 rounded-full hover:bg-exercise-light transition-colors\"\n              >\n                <X className=\"h-4 w-4 text-muted-foreground\" />\n              </button>\n            </div>\n          ))}\n        </div>\n\n        {showAdd && (\n          <div className=\"mt-4 animate-fade-in\">\n            <div className=\"grid grid-cols-2 gap-2 mb-2\">\n              <input\n                type=\"text\"\n                value={newExercise}\n                onChange={(e) => setNewExercise(e.target.value)}\n                placeholder=\"Exercise name\"\n                className=\"flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50\"\n              />\n              <input\n                type=\"number\"\n                value={newDuration}\n                onChange={(e) => setNewDuration(e.target.value)}\n                placeholder=\"Minutes\"\n                className=\"flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50\"\n              />\n            </div>\n            <button\n              onClick={handleAddExercise}\n              className=\"w-full rounded-md py-2 px-3 bg-exercise text-white hover:bg-exercise-dark transition-colors\"\n            >\n              Add Exercise\n            </button>\n          </div>\n        )}\n      </div>\n    </div>\n  );\n};\n\nexport default ExerciseTracker;
  className?: string;
}

interface Exercise {
  id: string;
  name: string;
  duration: number;
}

const ExerciseTracker: React.FC<ExerciseTrackerProps> = ({ className }) => {
  const [exercises, setExercises] = useState<Exercise[]>([
    { id: '1', name: 'Running', duration: 30 },
    { id: '2', name: 'Push-ups', duration: 15 }
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newExercise, setNewExercise] = useState('');
  const [newDuration, setNewDuration] = useState('');
  
  const totalMinutes = exercises.reduce((acc, exercise) => acc + exercise.duration, 0);

  const addExercise = () => {
    if (newExercise.trim() !== '' && newDuration.trim() !== '') {
      const duration = parseInt(newDuration);
      if (!isNaN(duration) && duration > 0) {
        setExercises(prev => [
          ...prev, 
          { 
            id: Date.now().toString(), 
            name: newExercise, 
            duration 
          }
        ]);
        setNewExercise('');
        setNewDuration('');
        setShowAdd(false);
      }
    }
  };

  const removeExercise = (id: string) => {
    setExercises(prev => prev.filter(exercise => exercise.id !== id));
  };

  return (
    <div className={cn("glass-card p-5", className)}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Activity className="h-5 w-5 text-exercise" />
          <span>Exercise Log</span>
        </h3>
        <span className="category-pill bg-exercise-light text-exercise-dark">
          <Activity className="h-3.5 w-3.5" />
          Fitness
        </span>
      </div>
      
      <div className="mt-3">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-3xl font-bold text-exercise-dark">{totalMinutes}</span>
            <span className="text-muted-foreground text-sm ml-1">minutes today</span>
          </div>
          <button 
            onClick={() => setShowAdd(!showAdd)}
            className="p-2 rounded-full bg-exercise-light text-exercise-dark hover:bg-exercise hover:text-white transition-colors"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-2 max-h-[200px] overflow-auto pr-1">
          {exercises.map(exercise => (
            <div 
              key={exercise.id} 
              className="flex items-center justify-between p-2 bg-exercise-light/50 rounded-lg"
            >
              <div>
                <p className="font-medium text-exercise-dark">{exercise.name}</p>
                <p className="text-sm text-muted-foreground">{exercise.duration} minutes</p>
              </div>
              <button 
                onClick={() => removeExercise(exercise.id)}
                className="p-1 rounded-full hover:bg-exercise-light transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
        
        {showAdd && (
          <div className="mt-4 animate-fade-in">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                value={newExercise}
                onChange={(e) => setNewExercise(e.target.value)}
                placeholder="Exercise name"
                className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <input
                type="number"
                value={newDuration}
                onChange={(e) => setNewDuration(e.target.value)}
                placeholder="Minutes"
                className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <button 
              onClick={addExercise}
              className="w-full rounded-md py-2 px-3 bg-exercise text-white hover:bg-exercise-dark transition-colors"
            >
              Add Exercise
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseTracker;
