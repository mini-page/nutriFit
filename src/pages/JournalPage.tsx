
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { format, parseISO } from 'date-fns';
import { BookOpen, Pencil, Image, Trash2, CalendarIcon, Search, Sun, Cloud, CloudRain, CloudLightning } from 'lucide-react';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface JournalEntry {
  id: number;
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
  "What made you smile today?",
  "What's something you learned recently?",
  "What are you grateful for today?",
  "What's something you're looking forward to?",
  "What was challenging about today and how did you handle it?",
  "If you could change one thing about your day, what would it be?",
  "Describe a moment that made you feel proud.",
  "What's something that inspired you recently?",
  "What would make tomorrow great?",
  "How did you take care of yourself today?",
];

const JournalPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: 1,
      title: 'First day at the gym',
      content: 'Today I started my fitness journey. It was challenging but I feel great about taking this first step.',
      date: '2023-04-01',
      mood: 'excited',
      weather: 'sunny'
    },
    {
      id: 2,
      title: 'Tried a new healthy recipe',
      content: 'Made a delicious salad with quinoa and avocado. It was surprisingly filling and tasty!',
      date: '2023-04-02',
      mood: 'happy',
      weather: 'cloudy'
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentEntry, setCurrentEntry] = useState<JournalEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleNewEntry = () => {
    const newEntry: JournalEntry = {
      id: Date.now(),
      title: '',
      content: '',
      date: format(date, 'yyyy-MM-dd'),
      mood: '',
      weather: ''
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
    
    if (currentEntry.id === 0 || !entries.find(e => e.id === currentEntry.id)) {
      setEntries([...entries, currentEntry]);
      toast.success('Journal entry created');
    } else {
      setEntries(entries.map(e => e.id === currentEntry.id ? currentEntry : e));
      toast.success('Journal entry updated');
    }
    
    setCurrentEntry(null);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setCurrentEntry(null);
    setIsEditing(false);
  };

  const handleDeleteEntry = (id: number) => {
    setEntries(entries.filter(e => e.id !== id));
    toast.success('Journal entry deleted');
    setCurrentEntry(null);
    setIsEditing(false);
  };

  const handleUsePrompt = (prompt: string) => {
    if (!currentEntry) return;
    setCurrentEntry({
      ...currentEntry,
      title: prompt.substring(0, 40) + (prompt.length > 40 ? '...' : ''),
      content: prompt + '\n\n' + (currentEntry.content || '')
    });
  };

  const getMoodLabel = (moodValue: string) => {
    return moodOptions.find(m => m.value === moodValue)?.label || '';
  };

  const getMoodColor = (moodValue: string) => {
    return moodOptions.find(m => m.value === moodValue)?.color || '';
  };

  const getWeatherIcon = (weatherValue: string) => {
    const option = weatherOptions.find(w => w.value === weatherValue);
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
          <Card>
            <CardHeader>
              <CardTitle>{currentEntry?.id ? 'Edit Entry' : 'New Journal Entry'}</CardTitle>
              <CardDescription>
                <div className="flex gap-2 items-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "justify-start text-left font-normal w-[140px]"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {currentEntry?.date ? format(parseISO(currentEntry.date), 'PPP') : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={currentEntry?.date ? parseISO(currentEntry.date) : undefined}
                        onSelect={(newDate) => {
                          if (newDate && currentEntry) {
                            setCurrentEntry({
                              ...currentEntry,
                              date: format(newDate, 'yyyy-MM-dd')
                            });
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <Input
                  placeholder="Entry title"
                  value={currentEntry?.title || ''}
                  onChange={(e) => currentEntry && setCurrentEntry({ ...currentEntry, title: e.target.value })}
                  className="text-lg font-semibold mb-2"
                />
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-sm text-muted-foreground flex items-center mr-2">Mood:</span>
                {moodOptions.map(mood => (
                  <Button
                    key={mood.value}
                    type="button"
                    variant={currentEntry?.mood === mood.value ? "default" : "outline"}
                    className="rounded-full"
                    onClick={() => currentEntry && setCurrentEntry({ ...currentEntry, mood: mood.value })}
                  >
                    {mood.label}
                  </Button>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-sm text-muted-foreground flex items-center mr-2">Weather:</span>
                {weatherOptions.map(weather => {
                  const Icon = weather.icon;
                  return (
                    <Button
                      key={weather.value}
                      type="button"
                      variant={currentEntry?.weather === weather.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => currentEntry && setCurrentEntry({ ...currentEntry, weather: weather.value })}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {weather.label}
                    </Button>
                  );
                })}
              </div>
              
              <div>
                <Textarea
                  placeholder="Start writing your thoughts..."
                  value={currentEntry?.content || ''}
                  onChange={(e) => currentEntry && setCurrentEntry({ ...currentEntry, content: e.target.value })}
                  className="min-h-[200px]"
                />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Need inspiration? Try one of these prompts:</h3>
                <div className="flex flex-wrap gap-2">
                  {journalPrompts.slice(0, 5).map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleUsePrompt(prompt)}
                      className="text-xs"
                    >
                      {prompt.length > 20 ? prompt.substring(0, 20) + '...' : prompt}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <div>
                {currentEntry?.id !== 0 && entries.find(e => e.id === currentEntry?.id) && (
                  <Button 
                    variant="ghost" 
                    onClick={() => currentEntry && handleDeleteEntry(currentEntry.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4 text-destructive" />
                    Delete
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
                <Button onClick={handleSaveEntry}>
                  Save Entry
                </Button>
              </div>
            </CardFooter>
          </Card>
        ) : (
          <>
            {filteredEntries.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent className="flex flex-col items-center">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h2 className="text-xl font-semibold mb-2">No journal entries yet</h2>
                  <p className="text-muted-foreground mb-4">Start writing to track your thoughts and progress</p>
                  <Button onClick={handleNewEntry}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Write First Entry
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredEntries.map(entry => (
                  <Card key={entry.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleEditEntry(entry)}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{entry.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          {entry.weather && getWeatherIcon(entry.weather)}
                          {entry.mood && (
                            <span className={cn('text-xs py-0.5 px-2 rounded-full', getMoodColor(entry.mood))}>
                              {getMoodLabel(entry.mood)}
                            </span>
                          )}
                        </div>
                      </div>
                      <CardDescription>
                        {format(parseISO(entry.date), 'MMMM d, yyyy')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-3 text-sm text-muted-foreground">
                        {entry.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default JournalPage;
