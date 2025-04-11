
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Textarea,
} from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { format, parseISO } from 'date-fns';
import {
  BookOpen,
  Pencil,
  Trash2,
  CalendarIcon,
  Search,
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { JournalEntryForm } from '@/components/journal/JournalEntryForm';
import JournalEntryList from '@/components/journal/JournalEntryList';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  mood: string;
  weather: string;
  images?: string[];
}

const moodOptions = [
  { value: 'happy', label: 'Happy 😊', color: 'bg-green-100 text-green-800' },
  { value: 'sad', label: 'Sad 😔', color: 'bg-blue-100 text-blue-800' },
  { value: 'excited', label: 'Excited 🤩', color: 'bg-amber-100 text-amber-800' },
  { value: 'stressed', label: 'Stressed 😓', color: 'bg-red-100 text-red-800' },
  { value: 'calm', label: 'Calm 😌', color: 'bg-purple-100 text-purple-800' },
];

const weatherOptions = [
  { value: 'sunny', label: 'Sunny', icon: Sun },
  { value: 'cloudy', label: 'Cloudy', icon: Cloud },
  { value: 'rainy', label: 'Rainy', icon: CloudRain },
  { value: 'stormy', label: 'Stormy', icon: CloudLightning },
];

const journalPrompts = [
  'What made you smile today?',
  "What's something you learned recently?",
  'What are you grateful for today?',
  "What's something you're looking forward to?",
  'What was challenging about today and how did you handle it?',
  'If you could change one thing about your day, what would it be?',
  'Describe a moment that made you feel proud.',
  "What's something that inspired you recently?",
  'What would make tomorrow great?',
  'How did you take care of yourself today?',
];

const JournalPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      title: 'First day at the gym',
      content:
        'Today I started my fitness journey. It was challenging but I feel great about taking this first step.',
      date: '2023-04-01',
      mood: 'excited',
      weather: 'sunny',
    },
    {
      id: '2',
      title: 'Tried a new healthy recipe',
      content:
        'Made a delicious salad with quinoa and avocado. It was surprisingly filling and tasty!',
      date: '2023-04-02',
      mood: 'happy',
      weather: 'cloudy',
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentEntry, setCurrentEntry] = useState<JournalEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const filteredEntries = entries
    .filter((entry) => {
      const matchesSearch =
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  const handleNewEntry = () => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      title: '',
      content: '',
      date: format(date, 'yyyy-MM-dd'),
      mood: '',
      weather: '',
    };
    setCurrentEntry(newEntry);
    setIsEditing(true);
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setCurrentEntry({ ...entry });
    setIsEditing(true);
  };

  const handleSaveEntry = () => {
    if (!currentEntry) return;

    if (!currentEntry.title.trim()) {
      toast.error('Please enter a title for your journal entry');
      return;
    }

    if (entries.find(e => e.id === currentEntry.id)) {
      setEntries(
        entries.map((e) => (e.id === currentEntry.id ? currentEntry : e))
      );
      toast.success('Journal entry updated');
    } else {
      setEntries([...entries, currentEntry]);
      toast.success('Journal entry created');
    }

    setCurrentEntry(null);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setCurrentEntry(null);
    setIsEditing(false);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
    toast.success('Journal entry deleted');
    setCurrentEntry(null);
    setIsEditing(false);
  };

  const handleUsePrompt = (prompt: string) => {
    if (!currentEntry) return;
    setCurrentEntry({
      ...currentEntry,
      title: prompt.substring(0, 40) + (prompt.length > 40 ? '...' : ''),
      content: prompt + '\n\n' + (currentEntry.content || ''),
    });
  };

  const getMoodLabel = (moodValue: string) => {
    return moodOptions.find((m) => m.value === moodValue)?.label || '';
  };

  const getMoodColor = (moodValue: string) => {
    return moodOptions.find((m) => m.value === moodValue)?.color || '';
  };

  const getWeatherIcon = (weatherValue: string) => {
    const option = weatherOptions.find((w) => w.value === weatherValue);
    if (option) {
      const Icon = option.icon;
      return <Icon className="h-4 w-4" />;
    }
    return null;
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Journal</h1>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button onClick={handleNewEntry}>
              <Pencil className="mr-2 h-4 w-4" /> New Entry
            </Button>
          </div>
        </div>

        {isEditing ? (
          <JournalEntryForm
            onSubmit={(data) => {
              if (!currentEntry) return;
              
              const updatedEntry = {
                ...currentEntry,
                title: data.title,
                content: data.content,
              };
              
              if (entries.find(e => e.id === updatedEntry.id)) {
                setEntries(entries.map(e => e.id === updatedEntry.id ? updatedEntry : e));
                toast.success('Entry updated successfully');
              } else {
                setEntries([...entries, updatedEntry]);
                toast.success('Entry created successfully');
              }
              
              setCurrentEntry(null);
              setIsEditing(false);
            }}
          />
        ) : (
          <JournalEntryList
            entries={entries.map(entry => ({
              ...entry,
              date: new Date(entry.date)
            }))}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default JournalPage;
