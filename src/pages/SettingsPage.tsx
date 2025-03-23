
import React, { useState, useEffect } from 'react';
import { Palette, Bell, Shield } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import SettingsLayout from '@/components/settings/SettingsLayout';
import AppearanceSettings from '@/components/settings/AppearanceSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import DataSettings from '@/components/settings/DataSettings';
import MainLayout from '@/components/layout/MainLayout';

const SettingsPage = () => {
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
    <MainLayout>
      <SettingsLayout userName={userName}>
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
          
          <TabsContent value="appearance">
            <AppearanceSettings 
              theme={theme} 
              handleThemeChange={handleThemeChange} 
            />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>
          
          <TabsContent value="data">
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
