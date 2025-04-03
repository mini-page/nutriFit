import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format, addDays, differenceInDays, isSameDay, isWithinInterval } from 'date-fns';
import { Droplet, Calendar as CalendarIcon, AlertCircle, Info } from 'lucide-react';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
  
  // Check if the user has permission to view this page
  useEffect(() => {
    const checkUserGender = () => {
      // In a real app, this would retrieve gender from user settings
      // For now, we'll just use a mock gender value
      const gender = localStorage.getItem('userGender') || 'female';
      
      if (gender !== 'female' && gender !== 'non-binary') {
        toast.error('This page is only available for users who have set their gender to female or non-binary in settings.');
        // Normally would redirect, but we'll keep the component mounted for demo purposes
      }
    };
    
    checkUserGender();
    
    const handleUserProfileUpdate = (e: any) => {
      const { gender } = e.detail.userData;
      localStorage.setItem('userGender', gender);
    };
    
    document.addEventListener('user-profile-updated', handleUserProfileUpdate);
    
    return () => {
      document.removeEventListener('user-profile-updated', handleUserProfileUpdate);
    };
  }, []);
  
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
  
  // For calendar date highlight
  const isDayInPeriod = (day: Date) => {
    return periods.some(period => 
      isWithinInterval(day, { start: period.startDate, end: period.endDate })
    );
  };
  
  const isDayPredictedPeriod = (day: Date) => {
    if (!nextPeriod) return false;
    return isWithinInterval(day, { start: nextPeriod.startDate, end: nextPeriod.endDate });
  };
  
  const hasSymptomsOnDay = (day: Date) => {
    return symptoms.some(symptom => isSameDay(symptom.date, day));
  };
  
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
    toast.success('Period recorded successfully');
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
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Menstrual Cycle Tracker</h1>
        
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
          <Card>
            <CardHeader>
              <CardTitle>Cycle Calendar</CardTitle>
              <CardDescription>
                Track your menstrual cycle and predict upcoming periods
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                modifiers={{
                  period: (day) => isDayInPeriod(day),
                  nextPeriod: (day) => isDayPredictedPeriod(day),
                  withSymptoms: (day) => hasSymptomsOnDay(day)
                }}
                modifiersStyles={{
                  period: { backgroundColor: 'rgba(239, 68, 68, 0.2)' },
                  nextPeriod: { backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px dashed rgb(239, 68, 68)' },
                  withSymptoms: { border: '2px solid rgba(124, 58, 237, 0.6)' }
                }}
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
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Record New Period</CardTitle>
                <CardDescription>
                  Track your menstrual cycle for better predictions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !periodStart && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {periodStart ? format(periodStart, 'PPP') : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={periodStart}
                        onSelect={setPeriodStart}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Period Length (days)</label>
                  <Select value={String(periodLength)} onValueChange={(val) => setPeriodLength(Number(val))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
                        <SelectItem key={i} value={String(i)}>{i} days</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cycle Length (days)</label>
                  <Select value={String(cycleLength)} onValueChange={(val) => setCycleLength(Number(val))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {[21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36].map((i) => (
                        <SelectItem key={i} value={String(i)}>{i} days</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="w-full" onClick={handleAddPeriod}>
                  <Droplet className="mr-2 h-4 w-4" /> Record Period
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Record Symptoms</CardTitle>
                <CardDescription>
                  Track symptoms throughout your cycle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP') : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Symptom Type</label>
                  <Select value={symptomType} onValueChange={setSymptomType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cramps">Cramps</SelectItem>
                      <SelectItem value="headache">Headache</SelectItem>
                      <SelectItem value="bloating">Bloating</SelectItem>
                      <SelectItem value="fatigue">Fatigue</SelectItem>
                      <SelectItem value="mood_swings">Mood Swings</SelectItem>
                      <SelectItem value="breast_tenderness">Breast Tenderness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Severity (1-5)</label>
                  <Select value={String(symptomSeverity)} onValueChange={(val) => setSymptomSeverity(Number(val))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Very Mild</SelectItem>
                      <SelectItem value="2">2 - Mild</SelectItem>
                      <SelectItem value="3">3 - Moderate</SelectItem>
                      <SelectItem value="4">4 - Severe</SelectItem>
                      <SelectItem value="5">5 - Very Severe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="w-full" onClick={handleAddSymptom}>
                  Record Symptom
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {nextPeriod && (
          <Card>
            <CardHeader>
              <CardTitle>Cycle Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-md">
                  <h3 className="font-medium mb-2">Next Period Prediction</h3>
                  <p>Your next period is predicted to start on <strong>{format(nextPeriod.startDate, 'MMMM d, yyyy')}</strong> and last until <strong>{format(nextPeriod.endDate, 'MMMM d, yyyy')}</strong>.</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    That's in {differenceInDays(nextPeriod.startDate, new Date())} days.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Cycle Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-md">
                      <span className="text-sm text-muted-foreground">Average Cycle Length</span>
                      <p className="text-2xl font-bold">{cycleLength} days</p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <span className="text-sm text-muted-foreground">Average Period Length</span>
                      <p className="text-2xl font-bold">{periodLength} days</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <h3 className="font-medium mb-2 text-blue-800 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Health Tip
                  </h3>
                  <p className="text-sm text-blue-700">
                    Remember to stay hydrated during your period. Drinking plenty of water can help reduce bloating and alleviate cramps.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default CycleTrackerPage;
