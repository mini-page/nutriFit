
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
import { toast } from 'sonner';

interface AppearanceSettingsProps {
  theme: 'light' | 'dark' | 'system';
  handleThemeChange: (value: 'light' | 'dark' | 'system') => void;
}

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  theme,
  handleThemeChange
}) => {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
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
      
      <div className="glass-card p-6">
        <h3 className="text-lg font-medium mb-4">Customize Dashboard</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="water" defaultChecked />
            <label
              htmlFor="water"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Show Water Tracker
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="nutrition" defaultChecked />
            <label
              htmlFor="nutrition"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Show Nutrition Tracker
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="exercise" defaultChecked />
            <label
              htmlFor="exercise"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Show Exercise Tracker
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="mood" defaultChecked />
            <label
              htmlFor="mood"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Show Mood Tracker
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="goals" defaultChecked />
            <label
              htmlFor="goals"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Show Goals Tracker
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
