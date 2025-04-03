
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SettingsLayout from '@/components/settings/SettingsLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppearanceSettings from '@/components/settings/AppearanceSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import DataSettings from '@/components/settings/DataSettings';
import UserProfileSettings from '@/components/settings/UserProfileSettings';
import { toast } from 'sonner';

const SettingsPage = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [dashboardItems, setDashboardItems] = useState({
    water: true,
    nutrition: true,
    exercise: true,
    mood: true,
    goals: true,
    quickWater: true,
    quickExercise: true,
    quickNutrition: true,
    quickGoals: true,
    quickSleep: false,
    quickBudget: false, 
    quickMood: false,
    quickCycle: false
  });

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'system';
    setTheme(savedTheme as 'light' | 'dark' | 'system');
    
    const savedDashboardItems = localStorage.getItem('dashboardItems');
    if (savedDashboardItems) {
      try {
        setDashboardItems(JSON.parse(savedDashboardItems));
      } catch (error) {
        console.error('Failed to parse dashboard items from localStorage', error);
      }
    }
  }, []);

  const handleThemeChange = (value: 'light' | 'dark' | 'system') => {
    setTheme(value);
    localStorage.setItem('theme', value);
    document.documentElement.setAttribute('data-theme', value);
    toast.success(`Theme changed to ${value} mode`);
  };

  const handleDashboardItemsChange = (items: Record<string, boolean>) => {
    setDashboardItems(items);
    localStorage.setItem('dashboardItems', JSON.stringify(items));
    toast.success('Dashboard settings updated');
  };

  const handleExportData = () => {
    // Create a dummy data object to represent user data
    const userData = {
      profile: {
        name: "Umang Gupta",
        email: "umang@example.com",
        goals: ["Build muscle", "Improve fitness"]
      },
      nutrition: {
        meals: [
          { date: "2023-06-01", name: "Breakfast", calories: 450 },
          { date: "2023-06-01", name: "Lunch", calories: 700 }
        ]
      },
      workouts: [
        { date: "2023-06-01", type: "Cardio", duration: 30 },
        { date: "2023-06-02", type: "Strength", duration: 45 }
      ]
    };

    // Convert to JSON and create a download link
    const dataStr = JSON.stringify(userData, null, 2);
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = "nutrifit-data.json";
    
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
    
    toast.success("Data exported successfully");
  };

  const handleImportData = () => {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      
      if (!file) {
        toast.error("No file selected");
        return;
      }
      
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          JSON.parse(content); // Validate JSON format
          
          // In a real app, this would process the imported data
          // and update the application state
          
          toast.success("Data imported successfully");
        } catch (error) {
          toast.error("Invalid data format");
        }
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  };

  return (
    <MainLayout>
      <SettingsLayout userName="Umang">
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="flex overflow-x-auto md:grid md:grid-cols-4 space-x-1 md:space-x-0">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="data">Data & Privacy</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <UserProfileSettings />
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4">
            <AppearanceSettings 
              theme={theme}
              handleThemeChange={handleThemeChange}
              dashboardItems={dashboardItems}
              onDashboardItemsChange={handleDashboardItemsChange}
            />
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <NotificationSettings />
          </TabsContent>
          
          <TabsContent value="data" className="space-y-4">
            <DataSettings 
              handleExportData={handleExportData}
              handleImportData={handleImportData}
            />
          </TabsContent>
        </Tabs>
      </SettingsLayout>
    </MainLayout>
  );
};

export default SettingsPage;
