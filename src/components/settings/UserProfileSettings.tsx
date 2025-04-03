
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                min="1"
                value={userData.age}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={userData.gender}
                onValueChange={(value) => handleSelectChange('gender', value)}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="non-binary">Non-binary</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Tabs defaultValue="physical">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="physical">Physical Details</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            <TabsContent value="physical" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    name="height"
                    type="number"
                    value={userData.height}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    value={userData.weight}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="activityLevel">Activity Level</Label>
                  <Select
                    value={userData.activityLevel}
                    onValueChange={(value) => handleSelectChange('activityLevel', value)}
                  >
                    <SelectTrigger id="activityLevel">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="light">Lightly Active</SelectItem>
                      <SelectItem value="moderate">Moderately Active</SelectItem>
                      <SelectItem value="active">Very Active</SelectItem>
                      <SelectItem value="extreme">Extremely Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="preferences" className="space-y-4 pt-4">
              <div>
                <p className="text-muted-foreground mb-4">
                  Customize which trackers are shown in your dashboard based on your needs.
                </p>
                
                {(userData.gender === 'female' || userData.gender === 'non-binary') && (
                  <div className="flex items-center space-x-4 rounded-lg border p-4">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Menstrual Cycle Tracking
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Enable menstrual cycle tracking features
                      </p>
                    </div>
                    <div>
                      <Select
                        defaultValue="enabled"
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enabled">Enabled</SelectItem>
                          <SelectItem value="disabled">Disabled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>
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
