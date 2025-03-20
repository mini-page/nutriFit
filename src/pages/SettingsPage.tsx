
import React, { useState, useEffect } from 'react';
import { Settings, Palette, Bell, Shield, Moon, SunMedium, Download, Upload } from 'lucide-react';
import Header from '@/components/ui/header';
import SidebarNav from '@/components/nav/sidebar-nav';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import { FormLabel } from '@/components/ui/form';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

const SettingsPage = () => {
  const isMobile = useIsMobile();
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [userName, setUserName] = useState('John Doe');
  
  // Handle theme switching
  useEffect(() => {
    // Check if theme preference is stored
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' || 'light';
    setTheme(savedTheme);
    
    // Apply theme to document
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else if (savedTheme === 'system') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);
  
  // Update theme when it changes
  const handleThemeChange = (value: 'light' | 'dark' | 'system') => {
    setTheme(value);
    localStorage.setItem('theme', value);
    
    if (value === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (value === 'light') {
      document.documentElement.classList.remove('dark');
    } else if (value === 'system') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
    toast.success(`Theme changed to ${value} mode`);
  };

  const handleExportData = () => {
    // Mock function to export user data
    const mockUserData = {
      personalInfo: {
        name: userName,
      },
      trackers: {
        water: [{ date: '2023-06-01', amount: 2000 }],
        calories: [{ date: '2023-06-01', intake: 2100, burned: 450 }],
        exercise: [{ date: '2023-06-01', type: 'Running', duration: 30 }],
        mood: [{ date: '2023-06-01', mood: 'Happy', notes: 'Great workout today' }],
      },
      goals: [
        { title: 'Drink 2L water daily', progress: 75 },
        { title: 'Exercise 30 minutes 4x per week', progress: 50 },
      ],
    };
    
    const dataStr = JSON.stringify(mockUserData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'nutrifit-user-data.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success('Data exported successfully!');
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      
      if (file) {
        const reader = new FileReader();
        
        reader.onload = (event) => {
          try {
            const jsonData = JSON.parse(event.target?.result as string);
            console.log('Imported data:', jsonData);
            
            // Update username if available in the imported data
            if (jsonData.personalInfo?.name) {
              setUserName(jsonData.personalInfo.name);
            }
            
            toast.success('Data imported successfully!');
          } catch (error) {
            console.error('Error parsing JSON file:', error);
            toast.error('Error importing data. Please check the file format.');
          }
        };
        
        reader.readAsText(file);
      }
    };
    
    input.click();
  };

  return (
    <div className="min-h-screen flex">
      {!isMobile && <SidebarNav />}
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Settings className="h-6 w-6 text-primary" />
              Settings
            </h2>
            <p className="text-muted-foreground">Customize your NutriFit experience</p>
          </div>
          
          <div className="mb-6 p-4 rounded-lg bg-secondary flex items-center">
            <div className="flex-1">
              <p className="font-medium text-foreground">Welcome, {userName}</p>
              <p className="text-sm text-muted-foreground">Premium Plan</p>
            </div>
          </div>
          
          <Tabs defaultValue="appearance" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8 w-full max-w-2xl">
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span>Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="data" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Data</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="appearance" className="space-y-6">
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
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Daily Reminders</p>
                      <p className="text-sm text-muted-foreground">Receive daily reminders to log your activities</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weekly Reports</p>
                      <p className="text-sm text-muted-foreground">Receive weekly summary of your progress</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Goal Alerts</p>
                      <p className="text-sm text-muted-foreground">Get notified when you're close to achieving a goal</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Hydration Reminders</p>
                      <p className="text-sm text-muted-foreground">Periodic reminders to drink water</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing Emails</p>
                      <p className="text-sm text-muted-foreground">Receive emails about new features and promotions</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Health Tips</p>
                      <p className="text-sm text-muted-foreground">Weekly health and fitness tips</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="data" className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="text-lg font-medium mb-4">Import & Export Data</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Export your NutriFit data to keep a backup or import it to another device.
                </p>
                <div className="flex flex-col md:flex-row gap-3">
                  <Button 
                    onClick={handleExportData}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Export All Data
                  </Button>
                  <Button 
                    onClick={handleImportData}
                    variant="outline" 
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Import Data
                  </Button>
                </div>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="text-lg font-medium mb-4">Data Privacy</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How is my data stored?</AccordionTrigger>
                    <AccordionContent>
                      Your NutriFit data is stored locally in your browser. It is not sent to any servers unless you explicitly opt-in to cloud sync (future feature).
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Can I delete all my data?</AccordionTrigger>
                    <AccordionContent>
                      Yes, you can clear all your stored data at any time. This action cannot be undone, so we recommend exporting a backup first.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Is my data encrypted?</AccordionTrigger>
                    <AccordionContent>
                      Your local data is stored according to your browser's security policies. For additional security, we recommend keeping your device updated and securing it with a password.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="mt-6">
                  <Button 
                    variant="destructive" 
                    className="w-full sm:w-auto"
                    onClick={() => {
                      if (confirm('Are you sure you want to clear all your data? This cannot be undone.')) {
                        // Here you would clear localStorage or other stored data
                        localStorage.clear();
                        toast.success('All data has been cleared');
                      }
                    }}
                  >
                    Clear All Data
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
