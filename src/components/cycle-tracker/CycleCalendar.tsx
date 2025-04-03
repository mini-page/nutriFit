
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { format, addDays, differenceInDays, isSameDay, isWithinInterval } from 'date-fns';

interface CycleCalendarProps {
  periods: { startDate: Date; endDate: Date }[];
  nextPeriod: { startDate: Date; endDate: Date } | null;
  symptoms: { date: Date; type: string; severity: number }[];
  date: Date;
  setDate: (date: Date) => void;
}

const CycleCalendar = ({ periods, nextPeriod, symptoms, date, setDate }: CycleCalendarProps) => {
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
  
  return (
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
  );
};

export default CycleCalendar;
