import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { format, addDays, differenceInDays, isSameDay } from 'date-fns';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import CycleInsights from '@/components/cycle-tracker/CycleInsights';
import CycleNotAvailableView from '@/components/cycle-tracker/CycleNotAvailableView';
import CycleTrackerHeader from '@/components/cycle-tracker/CycleTrackerHeader';
import CycleTrackerMainView from '@/components/cycle-tracker/CycleTrackerMainView';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AlertCircle, Medal } from 'lucide-react';
import SymptomForm from '@/components/cycle-tracker/SymptomForm';
import { SymptomDetails } from '@/components/cycle-tracker/SymptomDetailsTypes';

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
  
  useEffect(() => {
    const checkUserGender = () => {
      const gender = localStorage.getItem('userGender') || '';
      
      if (gender === 'female' || gender === 'non-binary') {
        setShowTracker(true);
      } else {
        setShowTracker(false);
      }
    };
    
    checkUserGender();
    
    const lastLog = localStorage.getItem('lastCycleLog');
    if (lastLog) {
      const daysSinceLastLog = differenceInDays(new Date(), new Date(lastLog));
      if (daysSinceLastLog <= 1) {
        const currentStreak = Number(localStorage.getItem('cycleStreak') || '0');
        setStreak(currentStreak);
      }
    }
    
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
  }, []);
  
  const calculateNextPeriod = () => {
    if (periods.length === 0) return null;
    
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
        <CycleTrackerHeader 
          streak={streak}
          showPermissionAlert={showPermissionAlert}
          setShowPermissionAlert={setShowPermissionAlert}
        />
        
        <CycleTrackerMainView
          periods={periods}
          nextPeriod={nextPeriod}
          symptoms={symptoms}
          date={date}
          setDate={setDate}
          periodStart={periodStart}
          setPeriodStart={setPeriodStart}
          periodLength={periodLength}
          setPeriodLength={setPeriodLength}
          cycleLength={cycleLength}
          setCycleLength={setCycleLength}
          symptomType={symptomType}
          setSymptomType={setSymptomType}
          symptomSeverity={symptomSeverity}
          setSymptomSeverity={setSymptomSeverity}
          handleAddPeriod={handleAddPeriod}
          handleAddSymptom={handleAddSymptom}
        />
        
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
                symptomDetails={{ type: symptomType, severity: symptomSeverity }}
                setSymptomDetails={(details) => {
                  setSymptomType(details.type);
                  setSymptomSeverity(details.severity);
                }}
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
