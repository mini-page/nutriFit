
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import CycleTrackerHeader from '@/components/cycle-tracker/CycleTrackerHeader';
import CycleTrackerMainView from '@/components/cycle-tracker/CycleTrackerMainView';
import CycleNotAvailableView from '@/components/cycle-tracker/CycleNotAvailableView';
import { addDays, subMonths, isWithinInterval, format, parseISO } from 'date-fns';
import { toast } from 'sonner';
import { SymptomDetails } from '@/components/cycle-tracker/SymptomDetailsTypes';

// Define interfaces for the cycle tracker data
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
  // Get gender from localStorage
  const [gender, setGender] = useState<string>('female');
  const [date, setDate] = useState<Date>(new Date());
  const [showPermissionAlert, setShowPermissionAlert] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);
  
  // Period tracking state
  const [periods, setPeriods] = useState<Period[]>([]);
  const [periodStart, setPeriodStart] = useState<Date | undefined>(new Date());
  const [periodLength, setPeriodLength] = useState(5);
  const [cycleLength, setCycleLength] = useState(28);
  
  // Symptom tracking state
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [symptomType, setSymptomType] = useState('cramps');
  const [symptomSeverity, setSymptomSeverity] = useState(3);
  const [symptomDetails, setSymptomDetails] = useState<SymptomDetails>({
    type: 'cramps',
    severity: 3
  });
  
  // Calculate next period
  const [nextPeriod, setNextPeriod] = useState<Period | null>(null);
  
  // Load user gender from localStorage
  useEffect(() => {
    const savedGender = localStorage.getItem('userGender');
    if (savedGender) {
      setGender(savedGender);
    }
    
    // Load saved period and symptom data
    const savedPeriods = localStorage.getItem('periods');
    if (savedPeriods) {
      try {
        // Parse dates from JSON
        const parsedPeriods = JSON.parse(savedPeriods, (key, value) => {
          if (key === 'startDate' || key === 'endDate') {
            return parseISO(value);
          }
          return value;
        });
        setPeriods(parsedPeriods);
      } catch (error) {
        console.error('Failed to parse saved periods:', error);
      }
    }
    
    const savedSymptoms = localStorage.getItem('symptoms');
    if (savedSymptoms) {
      try {
        // Parse dates from JSON
        const parsedSymptoms = JSON.parse(savedSymptoms, (key, value) => {
          if (key === 'date') {
            return parseISO(value);
          }
          return value;
        });
        setSymptoms(parsedSymptoms);
      } catch (error) {
        console.error('Failed to parse saved symptoms:', error);
      }
    }
    
    const savedCycleLength = localStorage.getItem('cycleLength');
    if (savedCycleLength) {
      setCycleLength(Number(savedCycleLength));
    }
    
  }, []);
  
  // Calculate next period when periods or cycle length changes
  useEffect(() => {
    calculateNextPeriod();
    // Save periods to localStorage
    if (periods.length > 0) {
      localStorage.setItem('periods', JSON.stringify(periods, (key, value) => {
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      }));
    }
    
    // Save cycle length to localStorage
    localStorage.setItem('cycleLength', String(cycleLength));
  }, [periods, cycleLength]);
  
  // Save symptoms to localStorage when they change
  useEffect(() => {
    if (symptoms.length > 0) {
      localStorage.setItem('symptoms', JSON.stringify(symptoms, (key, value) => {
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      }));
    }
  }, [symptoms]);
  
  const calculateNextPeriod = () => {
    if (periods.length === 0) {
      setNextPeriod(null);
      return;
    }
    
    // Sort periods by start date (newest first)
    const sortedPeriods = [...periods].sort((a, b) => 
      b.startDate.getTime() - a.startDate.getTime()
    );
    
    const lastPeriod = sortedPeriods[0];
    const nextStartDate = addDays(lastPeriod.startDate, cycleLength);
    const nextEndDate = addDays(nextStartDate, periodLength - 1);
    
    setNextPeriod({
      startDate: nextStartDate,
      endDate: nextEndDate
    });
  };
  
  const handleAddPeriod = () => {
    if (!periodStart) {
      toast.error('Please select a period start date');
      return;
    }
    
    // Calculate the end date based on period length
    const endDate = addDays(periodStart, periodLength - 1);
    
    // Create new period
    const newPeriod = {
      startDate: periodStart,
      endDate: endDate
    };
    
    // Check for overlapping periods
    const hasOverlap = periods.some(period => 
      (periodStart >= period.startDate && periodStart <= period.endDate) ||
      (endDate >= period.startDate && endDate <= period.endDate)
    );
    
    if (hasOverlap) {
      toast.error('This period overlaps with an existing one');
      return;
    }
    
    // Add the new period and recalculate
    const updatedPeriods = [...periods, newPeriod];
    setPeriods(updatedPeriods);
    calculateNextPeriod();
    
    toast.success('Period recorded successfully');
  };
  
  const handleAddSymptom = () => {
    // Create new symptom with current date
    const newSymptom: Symptom = {
      date: date,
      type: symptomDetails.type,
      severity: symptomDetails.severity
    };
    
    // Check for duplicate (same date and type)
    const duplicateSymptom = symptoms.find(
      s => format(s.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') && 
          s.type === symptomType
    );
    
    if (duplicateSymptom) {
      // Update existing symptom instead of adding a new one
      const updatedSymptoms = symptoms.map(s => 
        format(s.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd') && s.type === symptomType
          ? newSymptom
          : s
      );
      setSymptoms(updatedSymptoms);
      toast.success('Symptom updated successfully');
    } else {
      // Add new symptom
      setSymptoms([...symptoms, newSymptom]);
      toast.success('Symptom recorded successfully');
    }
  };
  
  // Check if user is female to display the cycle tracker
  if (gender.toLowerCase() !== 'female') {
    return (
      <MainLayout>
        <CycleNotAvailableView />
      </MainLayout>
    );
  }
  
  // Find the last period for the header
  const lastPeriod = periods.length > 0 ? periods[periods.length - 1] : null;
  
  return (
    <MainLayout>
      <CycleTrackerHeader
        lastPeriod={lastPeriod}
        nextPeriod={nextPeriod}
        cycleLength={cycleLength}
        streak={streak}
        showPermissionAlert={showPermissionAlert}
        setShowPermissionAlert={setShowPermissionAlert}
      />
      
      <div className="mt-6">
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
          symptomDetails={symptomDetails}
          setSymptomDetails={setSymptomDetails}
          handleAddPeriod={handleAddPeriod}
          handleAddSymptom={handleAddSymptom}
        />
      </div>
    </MainLayout>
  );
};

export default CycleTrackerPage;
