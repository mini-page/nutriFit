
import React from 'react';
import { FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { TextQuote, Palette, Sparkles } from 'lucide-react';

const UIPreferences = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          Color Accent
        </h3>
        <ToggleGroup type="single" className="flex flex-wrap gap-2">
          <ToggleGroupItem value="blue" aria-label="Blue accent" className="w-10 h-10 rounded-full bg-blue-500" />
          <ToggleGroupItem value="green" aria-label="Green accent" className="w-10 h-10 rounded-full bg-green-500" />
          <ToggleGroupItem value="purple" aria-label="Purple accent" className="w-10 h-10 rounded-full bg-purple-500" />
          <ToggleGroupItem value="pink" aria-label="Pink accent" className="w-10 h-10 rounded-full bg-pink-500" />
          <ToggleGroupItem value="orange" aria-label="Orange accent" className="w-10 h-10 rounded-full bg-orange-500" />
          <ToggleGroupItem value="cyan" aria-label="Cyan accent" className="w-10 h-10 rounded-full bg-cyan-500" />
        </ToggleGroup>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <TextQuote className="h-5 w-5 text-primary" />
          Font Size
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" className="text-sm">Small</Button>
          <Button variant="outline" className="text-base bg-secondary">Medium</Button>
          <Button variant="outline" className="text-lg">Large</Button>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Animation & Effects
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Reduce Motion</FormLabel>
              <p className="text-sm text-muted-foreground">Minimize animations throughout the app</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg border border-border">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Glass Effects</FormLabel>
              <p className="text-sm text-muted-foreground">Enable glass morphism effects</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIPreferences;
