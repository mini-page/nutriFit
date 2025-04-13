
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import UserProfileCard from '@/components/profile/UserProfileCard';
import { User } from 'lucide-react';

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
    name: 'Guest',
    email: 'guestEmail@example.com',
    age: '20',
    gender: 'male',
    height: '175',
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
      <h3 className="text-lg font-medium flex items-center gap-2">
        <User className="h-5 w-5 text-primary" />
        Personal Information
      </h3>
      <UserProfileCard
        userData={userData}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        handleSaveProfile={handleSaveProfile}
      />
    </div>
  );
};

export default UserProfileSettings;
