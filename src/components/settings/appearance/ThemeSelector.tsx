
import React from 'react';
import { FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SunMedium, Moon, Monitor } from 'lucide-react';

interface ThemeSelectorProps {
  theme: 'light' | 'dark' | 'system';
  handleThemeChange: (value: 'light' | 'dark' | 'system') => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ theme, handleThemeChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Theme Mode</h3>
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
            <Monitor className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <div>
              <p className="font-medium">System Preference</p>
              <p className="text-sm text-muted-foreground">Follow your system's theme setting</p>
            </div>
          </FormLabel>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ThemeSelector;
