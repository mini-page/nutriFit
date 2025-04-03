
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileForm from '@/components/profile/ProfileForm';
import PhysicalDetailsForm from '@/components/profile/PhysicalDetailsForm';
import PreferencesForm from '@/components/profile/PreferencesForm';

interface UserData {
  name: string;
  email: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  activityLevel: string;
}

const UserProfileSettings = () => {
  const [userData, setUserData] = useState<UserData>({
    name: 'Umang Gupta',
    email: 'umang@example.com',
    age: '20',
    gender: 'male',
    height: '171',
    weight: '68',
    activityLevel: 'moderate'
  });
  
  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      try {
        const parsedData = JSON.parse(savedUserData);
        setUserData(parsedData);
      } catch (error) {
        console.error('Failed to parse user data from localStorage', error);
      }
    }
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: keyof UserData, value: string) => {
    setUserData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveProfile = () => {
    // Store user data in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('userGender', userData.gender);
    
    // Publish an event that other components can listen to
    const event = new CustomEvent('user-profile-updated', { 
      detail: { userData } 
    });
    document.dispatchEvent(event);
    
    toast.success('Profile settings saved successfully');
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal details and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ProfileForm 
            userData={userData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
          />
          
          <Tabs defaultValue="physical">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="physical">Physical Details</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            <TabsContent value="physical" className="space-y-4">
              <PhysicalDetailsForm 
                userData={userData}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
              />
            </TabsContent>
            <TabsContent value="preferences" className="space-y-4">
              <PreferencesForm userData={userData} />
            </TabsContent>
          </Tabs>
          
          <Button onClick={handleSaveProfile} className="mt-4">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfileSettings;
