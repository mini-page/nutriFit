
import React, { useState } from 'react';
import { Settings, User, Upload, Download, Palette, Bell, Shield, Moon, SunMedium } from 'lucide-react';
import Header from '@/components/ui/header';
import SidebarNav from '@/components/nav/sidebar-nav';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from 'sonner';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
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
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const SettingsPage = () => {
  const isMobile = useIsMobile();
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  
  const form = useForm({
    defaultValues: {
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Fitness enthusiast trying to stay healthy and track progress.',
    },
  });

  const handleExportData = () => {
    // Mock function to export user data
    const mockUserData = {
      personalInfo: {
        name: 'John Doe',
        email: 'john@example.com',
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
            // Here you would process and store the data
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

  const onSubmit = (data: any) => {
    console.log(data);
    toast.success('Profile updated!');
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
          
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8 w-full max-w-2xl">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Account</span>
              </TabsTrigger>
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
            
            <TabsContent value="account" className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="text-lg font-medium mb-4">Profile Information</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="Tell us about yourself" 
                              className="resize-none" 
                            />
                          </FormControl>
                          <FormDescription>
                            Brief description for your profile.
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit">Save Changes</Button>
                  </form>
                </Form>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="text-lg font-medium mb-4">Account Management</h3>
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full md:w-auto justify-start border-amber-500 text-amber-500 hover:bg-amber-500/10"
                  >
                    Change Password
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full md:w-auto justify-start border-red-500 text-red-500 hover:bg-red-500/10"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="appearance" className="space-y-6">
              <div className="glass-card p-6">
                <h3 className="text-lg font-medium mb-4">Theme</h3>
                <div className="space-y-4">
                  <div>
                    <div className="mb-3">Choose theme mode:</div>
                    <RadioGroup
                      value={theme}
                      onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="light" id="light" />
                        <FormLabel htmlFor="light" className="flex items-center gap-2">
                          <SunMedium className="h-4 w-4" />
                          Light
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="dark" />
                        <FormLabel htmlFor="dark" className="flex items-center gap-2">
                          <Moon className="h-4 w-4" />
                          Dark
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="system" id="system" />
                        <FormLabel htmlFor="system">System</FormLabel>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="mb-3">Color Accent:</div>
                    <ToggleGroup type="single" className="flex flex-wrap gap-1">
                      <ToggleGroupItem value="blue" aria-label="Blue accent" className="w-8 h-8 rounded-full bg-blue-500" />
                      <ToggleGroupItem value="green" aria-label="Green accent" className="w-8 h-8 rounded-full bg-green-500" />
                      <ToggleGroupItem value="purple" aria-label="Purple accent" className="w-8 h-8 rounded-full bg-purple-500" />
                      <ToggleGroupItem value="pink" aria-label="Pink accent" className="w-8 h-8 rounded-full bg-pink-500" />
                      <ToggleGroupItem value="orange" aria-label="Orange accent" className="w-8 h-8 rounded-full bg-orange-500" />
                      <ToggleGroupItem value="cyan" aria-label="Cyan accent" className="w-8 h-8 rounded-full bg-cyan-500" />
                    </ToggleGroup>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6">
                <h3 className="text-lg font-medium mb-4">Customize Dashboard</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Show Water Tracker</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Show Nutrition Tracker</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Show Exercise Tracker</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Show Mood Tracker</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Show Goals Tracker</span>
                    <Switch defaultChecked />
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
