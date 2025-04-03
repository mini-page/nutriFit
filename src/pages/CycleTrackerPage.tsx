
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format, addDays, differenceInDays, isSameDay } from 'date-fns';
import { Droplet, Calendar as CalendarIcon, AlertCircle, Heart, Medal, Info } from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useIsMobile } from '@/hooks/use-mobile';
import CycleCalendar from '@/components/cycle-tracker/CycleCalendar';
import PeriodForm from '@/components/cycle-tracker/PeriodForm';
import SymptomForm from '@/components/cycle-tracker/SymptomForm';
import CycleInsights from '@/components/cycle-tracker/CycleInsights';
import CycleNotAvailableView from '@/components/cycle-tracker/CycleNotAvailableView';

interface Period {
  startDate: Date;
  endDate: Date;
}

interface Symptom {
  date: Date;
  type: string;
  severity: number;
}

const CycleTrackerPage = () => {
  const isMobile = useIsMobile();
  const [showPermissionAlert, setShowPermissionAlert] = useState(true);
  const [periods, setPeriods] = useState<Period[]>([
    {
      startDate: new Date(2023, 3, 1),
      endDate: new Date(2023, 3, 6)
    },
    {
      startDate: new Date(2023, 3, 29),
      endDate: new Date(2023, 4, 4)
    }
  ]);
  const [symptoms, setSymptoms] = useState<Symptom[]>([
    { date: new Date(2023, 3, 1), type: 'cramps', severity: 3 },
    { date: new Date(2023, 3, 2), type: 'headache', severity: 2 },
    { date: new Date(2023, 3, 30), type: 'cramps', severity: 2 }
  ]);
  const [date, setDate] = useState<Date>(new Date());
  const [periodStart, setPeriodStart] = useState<Date | undefined>(undefined);
  const [periodLength, setPeriodLength] = useState(5);
  const [cycleLength, setCycleLength] = useState(28);
  const [symptomType, setSymptomType] = useState('cramps');
  const [symptomSeverity, setSymptomSeverity] = useState(1);
  const [showTracker, setShowTracker] = useState(false);
  const [streak, setStreak] = useState(0);
  
  // Check if the user has permission to view this page
  useEffect(() => {
    const checkUserGender = () => {
      // Get gender from localStorage
      const gender = localStorage.getItem('userGender') || '';
      
      if (gender === 'female' || gender === 'non-binary') {
        setShowTracker(true);
      } else {
        setShowTracker(false);
      }
    };
    
    // Check initially
    checkUserGender();
    
    // Calculate streak
    const lastLog = localStorage.getItem('lastCycleLog');
    if (lastLog) {
      const daysSinceLastLog = differenceInDays(new Date(), new Date(lastLog));
      if (daysSinceLastLog <= 1) {
        const currentStreak = Number(localStorage.getItem('cycleStreak') || '0');
        setStreak(currentStreak);
      }
    }
    
    // Listen for updates
    const handleUserProfileUpdate = (e: any) => {
      const { gender } = e.detail.userData;
      localStorage.setItem('userGender', gender);
      
      if (gender === 'female' || gender === 'non-binary') {
        setShowTracker(true);
      } else {
        setShowTracker(false);
        toast.info('This page is only available for users who set their gender to female or non-binary in settings.');
      }
    };
    
    document.addEventListener('user-profile-updated', handleUserProfileUpdate);
    
    return () => {
      document.removeEventListener('user-profile-updated', handleUserProfileUpdate);
    };
  }, [showTracker]);
  
  // Calculate next period based on the most recent period
  const calculateNextPeriod = () => {
    if (periods.length === 0) return null;
    
    // Sort periods by start date
    const sortedPeriods = [...periods].sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
    const lastPeriod = sortedPeriods[0];
    
    const nextStartDate = addDays(lastPeriod.startDate, cycleLength);
    const nextEndDate = addDays(nextStartDate, periodLength - 1);
    
    return { startDate: nextStartDate, endDate: nextEndDate };
  };
  
  const nextPeriod = calculateNextPeriod();
  
  const handleAddPeriod = () => {
    if (!periodStart) {
      toast.error('Please select a start date');
      return;
    }
    
    const newPeriod = {
      startDate: periodStart,
      endDate: addDays(periodStart, periodLength - 1)
    };
    
    setPeriods([...periods, newPeriod]);
    setPeriodStart(undefined);
    
    // Update streak for gamification
    const currentStreak = Number(localStorage.getItem('cycleStreak') || '0');
    const newStreak = currentStreak + 1;
    localStorage.setItem('cycleStreak', String(newStreak));
    localStorage.setItem('lastCycleLog', new Date().toISOString());
    setStreak(newStreak);
    
    if (newStreak % 5 === 0) {
      toast.success(`🏆 Achievement unlocked: ${newStreak} days streak!`, {
        icon: <Medal className="h-5 w-5 text-yellow-500" />
      });
    } else {
      toast.success('Period recorded successfully');
    }
  };
  
  const handleAddSymptom = () => {
    if (!date) {
      toast.error('Please select a date');
      return;
    }
    
    const newSymptom = {
      date,
      type: symptomType,
      severity: symptomSeverity
    };
    
    setSymptoms([...symptoms, newSymptom]);
    toast.success('Symptom recorded successfully');
  };
  
  if (!showTracker) {
    return (
      <MainLayout>
        <CycleNotAvailableView />
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Heart className="h-6 w-6 text-pink-500" />
              Menstrual Cycle Tracker
            </h1>
            {streak > 0 && (
              <p className="text-sm text-muted-foreground flex items-center mt-1">
                <Medal className="h-4 w-4 text-yellow-500 mr-1" /> 
                Current streak: {streak} {streak === 1 ? 'day' : 'days'}
              </p>
            )}
          </div>
        </div>
        
        {showPermissionAlert && (
          <Alert className="bg-blue-50 border-blue-200 text-blue-800">
            <Info className="h-4 w-4 text-blue-800" />
            <AlertTitle>Information</AlertTitle>
            <AlertDescription className="flex justify-between items-center">
              <span>This tracker is only shown to users who have set their gender preference to female or non-binary in settings.</span>
              <Button variant="outline" size="sm" onClick={() => setShowPermissionAlert(false)}>
                Dismiss
              </Button>
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-pink-500" />
                Cycle Calendar
              </CardTitle>
              <CardDescription>
                Track your menstrual cycle and predict upcoming periods
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-0">
              <CycleCalendar 
                periods={periods}
                nextPeriod={nextPeriod}
                symptoms={symptoms}
                date={date}
                setDate={setDate}
              />
            </CardContent>
            <CardFooter className="border-t pt-6 flex flex-col items-start gap-1">
              <div className="flex gap-2 items-center text-sm">
                <div className="w-4 h-4 bg-red-500/20 rounded"></div>
                <span>Period days</span>
              </div>
              <div className="flex gap-2 items-center text-sm">
                <div className="w-4 h-4 border border-dashed border-red-500 rounded"></div>
                <span>Predicted period</span>
              </div>
              <div className="flex gap-2 items-center text-sm">
                <div className="w-4 h-4 border-2 border-purple-500/60 rounded"></div>
                <span>Days with recorded symptoms</span>
              </div>
            </CardFooter>
          </Card>
          
          <div className={`space-y-6 ${isMobile ? "order-last" : ""}`}>
            <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplet className="h-5 w-5 text-red-500" />
                  Record New Period
                </CardTitle>
                <CardDescription>
                  Track your menstrual cycle for better predictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PeriodForm 
                  periodStart={periodStart}
                  setPeriodStart={setPeriodStart}
                  periodLength={periodLength}
                  setPeriodLength={setPeriodLength}
                  cycleLength={cycleLength}
                  setCycleLength={setCycleLength}
                  handleAddPeriod={handleAddPeriod}
                />
              </CardContent>
            </Card>
            
            {!isMobile && (
              <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-purple-500" />
                    Record Symptoms
                  </CardTitle>
                  <CardDescription>
                    Track symptoms throughout your cycle
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SymptomForm 
                    symptomType={symptomType}
                    setSymptomType={setSymptomType}
                    symptomSeverity={symptomSeverity}
                    setSymptomSeverity={setSymptomSeverity}
                    handleAddSymptom={handleAddSymptom}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        {isMobile && (
          <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-purple-500" />
                Record Symptoms
              </CardTitle>
              <CardDescription>
                Track symptoms throughout your cycle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SymptomForm 
                symptomType={symptomType}
                setSymptomType={setSymptomType}
                symptomSeverity={symptomSeverity}
                setSymptomSeverity={setSymptomSeverity}
                handleAddSymptom={handleAddSymptom}
              />
            </CardContent>
          </Card>
        )}
        
        {nextPeriod && (
          <CycleInsights 
            nextPeriod={nextPeriod}
            cycleLength={cycleLength}
            periodLength={periodLength}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default CycleTrackerPage;
