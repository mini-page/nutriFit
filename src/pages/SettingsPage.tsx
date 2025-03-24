
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SettingsLayout from '@/components/settings/SettingsLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppearanceSettings from '@/components/settings/AppearanceSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import DataSettings from '@/components/settings/DataSettings';
import { toast } from 'sonner';

const SettingsPage = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  const handleThemeChange = (value: 'light' | 'dark' | 'system') => {
    setTheme(value);
    toast.success(`Theme changed to ${value} mode`);
    // In a real app, this would also update the theme in localStorage or context
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
        <Tabs defaultValue="appearance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="data">Data & Privacy</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance" className="space-y-4">
            <AppearanceSettings 
              theme={theme}
              handleThemeChange={handleThemeChange}
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
