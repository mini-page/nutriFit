
import React from 'react';
import { FormLabel } from '@/components/ui/form';
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { SunMedium, Moon } from 'lucide-react';
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DashboardItems {
  water: boolean;
  nutrition: boolean;
  exercise: boolean;
  mood: boolean;
  goals: boolean;
  quickWater: boolean;
  quickExercise: boolean;
  quickNutrition: boolean;
  quickGoals: boolean;
  quickSleep: boolean;
  quickBudget: boolean;
  quickMood: boolean;
  quickCycle: boolean;
  // New actionable card settings
  healthScore: boolean;
  sleepQuality: boolean;
  workout: boolean;
  calories: boolean;
  moodTracker: boolean;
  activeGoals: boolean;
  journalEntry: boolean;
  habitsTracker: boolean;
}

interface AppearanceSettingsProps {
  theme: 'light' | 'dark' | 'system';
  handleThemeChange: (value: 'light' | 'dark' | 'system') => void;
  dashboardItems: DashboardItems;
  onDashboardItemsChange: (items: Partial<DashboardItems>) => void;
}

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  theme,
  handleThemeChange,
  dashboardItems,
  onDashboardItemsChange
}) => {
  
  const handleDashboardItemChange = (key: keyof DashboardItems, checked: boolean) => {
    onDashboardItemsChange({
      [key]: checked
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="glass-card p-4 md:p-6">
        <h3 className="text-lg font-medium mb-4">Theme</h3>
        <div className="space-y-6">
          <div>
            <div className="mb-3 font-medium">Theme Mode</div>
            <RadioGroup
              value={theme}
              onValueChange={(value) => handleThemeChange(value as 'light' | 'dark' | 'system')}
              className="flex flex-col space-y-3"
            >
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                <RadioGroupItem value="light" id="light" />
                <FormLabel htmlFor="light" className="flex items-center gap-2 cursor-pointer">
                  <SunMedium className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="font-medium">Light Mode</p>
                    <p className="text-sm text-muted-foreground">Use light theme for the application</p>
                  </div>
                </FormLabel>
              </div>
              
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                <RadioGroupItem value="dark" id="dark" />
                <FormLabel htmlFor="dark" className="flex items-center gap-2 cursor-pointer">
                  <Moon className="h-5 w-5 text-indigo-400" />
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">Use dark theme for the application</p>
                  </div>
                </FormLabel>
              </div>
              
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                <RadioGroupItem value="system" id="system" />
                <FormLabel htmlFor="system" className="flex items-center gap-2 cursor-pointer">
                  <div>
                    <p className="font-medium">System Preference</p>
                    <p className="text-sm text-muted-foreground">Follow your system's theme setting</p>
                  </div>
                </FormLabel>
              </div>
            </RadioGroup>
          </div>
          
          <Separator />
          
          <div>
            <div className="mb-3 font-medium">Color Accent</div>
            <ToggleGroup type="single" className="flex flex-wrap gap-2">
              <ToggleGroupItem value="blue" aria-label="Blue accent" className="w-10 h-10 rounded-full bg-blue-500" />
              <ToggleGroupItem value="green" aria-label="Green accent" className="w-10 h-10 rounded-full bg-green-500" />
              <ToggleGroupItem value="purple" aria-label="Purple accent" className="w-10 h-10 rounded-full bg-purple-500" />
              <ToggleGroupItem value="pink" aria-label="Pink accent" className="w-10 h-10 rounded-full bg-pink-500" />
              <ToggleGroupItem value="orange" aria-label="Orange accent" className="w-10 h-10 rounded-full bg-orange-500" />
              <ToggleGroupItem value="cyan" aria-label="Cyan accent" className="w-10 h-10 rounded-full bg-cyan-500" />
            </ToggleGroup>
          </div>
          
          <Separator />
          
          <div>
            <div className="mb-3 font-medium">Font Size</div>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" className="text-sm">Small</Button>
              <Button variant="outline" className="text-base bg-secondary">Medium</Button>
              <Button variant="outline" className="text-lg">Large</Button>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <div className="mb-3 font-medium">Animation & Effects</div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Reduce Motion</FormLabel>
                  <p className="text-sm text-muted-foreground">Minimize animations throughout the app</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Glass Effects</FormLabel>
                  <p className="text-sm text-muted-foreground">Enable glass morphism effects</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="glass-card p-4 md:p-6">
        <h3 className="text-lg font-medium mb-4">Customize Dashboard</h3>
        <p className="text-sm text-muted-foreground mb-4">Choose which components to display on your dashboard</p>
        
        <Tabs defaultValue="trackers" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="trackers">Trackers</TabsTrigger>
            <TabsTrigger value="actions">Quick Actions</TabsTrigger>
            <TabsTrigger value="cards">Actionable Cards</TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-[300px] pr-4">
            <TabsContent value="trackers" className="mt-0">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="water" 
                    checked={dashboardItems.water} 
                    onCheckedChange={(checked) => handleDashboardItemChange('water', !!checked)} 
                  />
                  <label
                    htmlFor="water"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Show Water Tracker
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="nutrition" 
                    checked={dashboardItems.nutrition} 
                    onCheckedChange={(checked) => handleDashboardItemChange('nutrition', !!checked)} 
                  />
                  <label
                    htmlFor="nutrition"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Show Nutrition Tracker
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="exercise" 
                    checked={dashboardItems.exercise} 
                    onCheckedChange={(checked) => handleDashboardItemChange('exercise', !!checked)} 
                  />
                  <label
                    htmlFor="exercise"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Show Exercise Tracker
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="mood" 
                    checked={dashboardItems.mood} 
                    onCheckedChange={(checked) => handleDashboardItemChange('mood', !!checked)} 
                  />
                  <label
                    htmlFor="mood"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Show Mood Tracker
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="goals" 
                    checked={dashboardItems.goals} 
                    onCheckedChange={(checked) => handleDashboardItemChange('goals', !!checked)} 
                  />
                  <label
                    htmlFor="goals"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Show Goals Tracker
                  </label>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="actions" className="mt-0">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="quick-water" 
                    checked={dashboardItems.quickWater} 
                    onCheckedChange={(checked) => handleDashboardItemChange('quickWater', !!checked)} 
                  />
                  <label
                    htmlFor="quick-water"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Water Quick Action
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="quick-exercise" 
                    checked={dashboardItems.quickExercise} 
                    onCheckedChange={(checked) => handleDashboardItemChange('quickExercise', !!checked)} 
                  />
                  <label
                    htmlFor="quick-exercise"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Exercise Quick Action
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="quick-nutrition" 
                    checked={dashboardItems.quickNutrition} 
                    onCheckedChange={(checked) => handleDashboardItemChange('quickNutrition', !!checked)} 
                  />
                  <label
                    htmlFor="quick-nutrition"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Nutrition Quick Action
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="quick-goals" 
                    checked={dashboardItems.quickGoals} 
                    onCheckedChange={(checked) => handleDashboardItemChange('quickGoals', !!checked)} 
                  />
                  <label
                    htmlFor="quick-goals"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Goals Quick Action
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="quick-sleep" 
                    checked={dashboardItems.quickSleep} 
                    onCheckedChange={(checked) => handleDashboardItemChange('quickSleep', !!checked)} 
                  />
                  <label
                    htmlFor="quick-sleep"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Sleep Quick Action
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="quick-budget" 
                    checked={dashboardItems.quickBudget} 
                    onCheckedChange={(checked) => handleDashboardItemChange('quickBudget', !!checked)} 
                  />
                  <label
                    htmlFor="quick-budget"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Budget Quick Action
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="quick-mood" 
                    checked={dashboardItems.quickMood} 
                    onCheckedChange={(checked) => handleDashboardItemChange('quickMood', !!checked)} 
                  />
                  <label
                    htmlFor="quick-mood"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Mood Quick Action
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="quick-cycle" 
                    checked={dashboardItems.quickCycle} 
                    onCheckedChange={(checked) => handleDashboardItemChange('quickCycle', !!checked)} 
                  />
                  <label
                    htmlFor="quick-cycle"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Cycle Tracker Quick Action
                  </label>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="cards" className="mt-0">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="health-score" 
                    checked={dashboardItems.healthScore} 
                    onCheckedChange={(checked) => handleDashboardItemChange('healthScore', !!checked)} 
                  />
                  <label
                    htmlFor="health-score"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Health Score Card
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="sleep-quality" 
                    checked={dashboardItems.sleepQuality} 
                    onCheckedChange={(checked) => handleDashboardItemChange('sleepQuality', !!checked)} 
                  />
                  <label
                    htmlFor="sleep-quality"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Sleep Quality Card
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="workout" 
                    checked={dashboardItems.workout} 
                    onCheckedChange={(checked) => handleDashboardItemChange('workout', !!checked)} 
                  />
                  <label
                    htmlFor="workout"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Workout Card
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="calories" 
                    checked={dashboardItems.calories} 
                    onCheckedChange={(checked) => handleDashboardItemChange('calories', !!checked)} 
                  />
                  <label
                    htmlFor="calories"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Calories Card
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="mood-tracker" 
                    checked={dashboardItems.moodTracker} 
                    onCheckedChange={(checked) => handleDashboardItemChange('moodTracker', !!checked)} 
                  />
                  <label
                    htmlFor="mood-tracker"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Mood Tracker Card
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="active-goals" 
                    checked={dashboardItems.activeGoals} 
                    onCheckedChange={(checked) => handleDashboardItemChange('activeGoals', !!checked)} 
                  />
                  <label
                    htmlFor="active-goals"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Active Goals Card
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="journal-entry" 
                    checked={dashboardItems.journalEntry} 
                    onCheckedChange={(checked) => handleDashboardItemChange('journalEntry', !!checked)} 
                  />
                  <label
                    htmlFor="journal-entry"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Journal Entry Card
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="habits-tracker" 
                    checked={dashboardItems.habitsTracker} 
                    onCheckedChange={(checked) => handleDashboardItemChange('habitsTracker', !!checked)} 
                  />
                  <label
                    htmlFor="habits-tracker"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Habits Tracker Card
                  </label>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    </div>
  );
};

export default AppearanceSettings;
