
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import JournalEntryForm from '@/components/journal/JournalEntryForm';
import JournalEntryList from '@/components/journal/JournalEntryList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarIcon, CheckCircle2, FileText, PenLine, Search, Tag, Calendar, Filter, X, PlusCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: Date;
  mood?: string;
  tags?: string[];
}

const JournalPage = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [allTags, setAllTags] = useState<string[]>(['personal', 'work', 'ideas', 'health', 'fitness', 'food', 'travel']);
  const [allMoods, setAllMoods] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('write');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [calendarEntries, setCalendarEntries] = useState<Record<string, number>>({});
  const isMobile = useIsMobile();

  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      try {
        const parsedEntries = JSON.parse(savedEntries, (key, value) => {
          if (key === 'date') {
            return new Date(value);
          }
          return value;
        });
        setEntries(parsedEntries);
        
        // Extract all tags from entries
        const tagsFromEntries = parsedEntries.reduce((acc: string[], entry: JournalEntry) => {
          if (entry.tags) {
            entry.tags.forEach((tag: string) => {
              if (!acc.includes(tag)) {
                acc.push(tag);
              }
            });
          }
          return acc;
        }, []);
        
        if (tagsFromEntries.length > 0) {
          setAllTags([...new Set([...allTags, ...tagsFromEntries])]);
        }
        
        // Extract all moods from entries
        const moodsFromEntries = parsedEntries.reduce((acc: string[], entry: JournalEntry) => {
          if (entry.mood && !acc.includes(entry.mood)) {
            acc.push(entry.mood);
          }
          return acc;
        }, []);
        
        if (moodsFromEntries.length > 0) {
          setAllMoods([...new Set(moodsFromEntries)]);
        }
        
        // Create calendar data
        const calendarData: Record<string, number> = {};
        parsedEntries.forEach((entry: JournalEntry) => {
          const dateStr = format(new Date(entry.date), 'yyyy-MM-dd');
          if (calendarData[dateStr]) {
            calendarData[dateStr]++;
          } else {
            calendarData[dateStr] = 1;
          }
        });
        setCalendarEntries(calendarData);
        
        calculateDailyStreak(parsedEntries);
      } catch (error) {
        console.error('Failed to parse saved journal entries:', error);
      }
    }
    
    const lastPromptDate = localStorage.getItem('lastJournalPromptDate');
    if (!lastPromptDate || (new Date().getTime() - new Date(lastPromptDate).getTime()) > 3 * 24 * 60 * 60 * 1000 || entries.length === 0) {
      setShowPrompt(true);
      localStorage.setItem('lastJournalPromptDate', new Date().toISOString());
    }
  }, []);

  const calculateDailyStreak = (journalEntries: JournalEntry[]) => {
    if (journalEntries.length === 0) {
      setDailyStreak(0);
      return;
    }
    
    const sortedEntries = [...journalEntries].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    const mostRecentDate = new Date(sortedEntries[0].date);
    const today = new Date();
    
    const dayDiff = Math.floor((today.getTime() - mostRecentDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (dayDiff > 1) {
      setDailyStreak(0);
      return;
    }
    
    let streak = 1;
    let currentDate = mostRecentDate;
    
    const datesWithEntries = sortedEntries.reduce((acc: Record<string, boolean>, entry: JournalEntry) => {
      const dateStr = new Date(entry.date).toDateString();
      acc[dateStr] = true;
      return acc;
    }, {});
    
    for (let i = 1; i < 100; i++) {
      const prevDate = new Date(currentDate);
      prevDate.setDate(prevDate.getDate() - 1);
      
      if (datesWithEntries[prevDate.toDateString()]) {
        streak++;
        currentDate = prevDate;
      } else {
        break;
      }
    }
    
    setDailyStreak(streak);
  };

  const handleAddEntry = (newEntry: JournalEntry) => {
    const entryWithMetadata = {
      id: Date.now().toString(),
      date: new Date(),
      ...newEntry
    };
    
    const updatedEntries = [entryWithMetadata, ...entries];
    setEntries(updatedEntries);
    
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    
    // Update tags list if new tags were added
    if (newEntry.tags && newEntry.tags.length > 0) {
      const updatedTags = [...allTags];
      newEntry.tags.forEach(tag => {
        if (!updatedTags.includes(tag)) {
          updatedTags.push(tag);
        }
      });
      setAllTags(updatedTags);
    }
    
    // Update moods list if a new mood was added
    if (newEntry.mood && !allMoods.includes(newEntry.mood)) {
      setAllMoods([...allMoods, newEntry.mood]);
    }
    
    // Update calendar data
    const dateStr = format(new Date(), 'yyyy-MM-dd');
    setCalendarEntries(prev => ({
      ...prev,
      [dateStr]: (prev[dateStr] || 0) + 1
    }));
    
    calculateDailyStreak(updatedEntries);
    
    toast.success('Journal entry saved successfully!');
    
    // Switch to entries tab after saving
    setActiveTab('entries');
  };

  const getFilteredEntries = () => {
    let filtered = entries;
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(entry => 
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        entry.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(entry => 
        entry.tags && entry.tags.some(tag => selectedTags.includes(tag))
      );
    }
    
    // Filter by selected moods
    if (selectedMoods.length > 0) {
      filtered = filtered.filter(entry => 
        entry.mood && selectedMoods.includes(entry.mood)
      );
    }
    
    // Filter by selected date
    if (selectedDate) {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      filtered = filtered.filter(entry => {
        const entryDateStr = format(new Date(entry.date), 'yyyy-MM-dd');
        return entryDateStr === dateStr;
      });
    }
    
    return filtered;
  };

  const filteredEntries = getFilteredEntries();
  
  const toggleMoodFilter = (mood: string) => {
    setSelectedMoods(prev => 
      prev.includes(mood) ? prev.filter(m => m !== mood) : [...prev, mood]
    );
  };
  
  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedMoods([]);
    setSearchQuery('');
    setSelectedDate(undefined);
  };
  
  const handleViewCalendar = () => {
    setActiveTab('calendar');
  };

  const writingPrompts = [
    "What are three things you're grateful for today?",
    "Describe a challenge you're facing and how you plan to overcome it.",
    "What was the best moment of your day and why?",
    "Write about a person who influenced you recently.",
    "What's something new you learned today?",
    "How did you take care of your physical health today?",
    "Describe your current emotional state and what led to it.",
    "What's one small thing you can do tomorrow to make it better than today?",
    "Write about a goal you're working towards and your progress.",
    "Reflect on a mistake you made recently and what you learned from it."
  ];

  const currentPrompt = writingPrompts[Math.floor(Math.random() * writingPrompts.length)];
  
  const moodEmojis: Record<string, string> = {
    'Happy': '😃',
    'Good': '🙂',
    'Calm': '😌',
    'Neutral': '😐',
    'Tired': '😴',
    'Anxious': '😟',
    'Sad': '😢',
    'Angry': '😡',
    'Grateful': '🙏',
    'Excited': '🤩'
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Journal</h1>
            <p className="text-muted-foreground">Record your thoughts, reflections, and memorable moments</p>
          </div>
          
          {dailyStreak > 0 && (
            <div className="flex items-center px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">{dailyStreak} day{dailyStreak !== 1 ? 's' : ''} streak!</span>
            </div>
          )}
        </div>
        
        {showPrompt && (
          <Alert className="bg-indigo-50 border-indigo-200 text-indigo-800 dark:bg-indigo-900/20 dark:border-indigo-800 dark:text-indigo-300">
            <PenLine className="h-4 w-4" />
            <AlertTitle>Writing Prompt</AlertTitle>
            <AlertDescription className="flex justify-between items-center">
              <span>{currentPrompt}</span>
              <Button variant="outline" size="sm" onClick={() => setShowPrompt(false)}>
                Dismiss
              </Button>
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="write" className="flex items-center gap-2">
              <PenLine className="h-4 w-4" /> Write
            </TabsTrigger>
            <TabsTrigger value="entries" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Entries ({entries.length})
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" /> Calendar
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="write" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>New Entry</CardTitle>
                <CardDescription>
                  Write down your thoughts, feelings, and experiences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <JournalEntryForm 
                  onSubmit={handleAddEntry} 
                  availableTags={allTags} 
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="entries" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Journal Entries</CardTitle>
                <CardDescription>
                  Browse and search through your past reflections
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search entries..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2 items-center">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                          <Filter className="h-3.5 w-3.5" />
                          <span>Filter</span>
                          {(selectedTags.length > 0 || selectedMoods.length > 0 || selectedDate) && (
                            <Badge variant="secondary" className="ml-1 px-1 rounded-full">
                              {selectedTags.length + selectedMoods.length + (selectedDate ? 1 : 0)}
                            </Badge>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Filter by Tags</h4>
                            <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                              {allTags.map(tag => (
                                <Badge
                                  key={tag}
                                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                                  className="cursor-pointer"
                                  onClick={() => {
                                    if (selectedTags.includes(tag)) {
                                      setSelectedTags(selectedTags.filter(t => t !== tag));
                                    } else {
                                      setSelectedTags([...selectedTags, tag]);
                                    }
                                  }}
                                >
                                  <Tag className="h-3 w-3 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Filter by Mood</h4>
                            <div className="flex flex-wrap gap-2">
                              {allMoods.map(mood => (
                                <Badge
                                  key={mood}
                                  variant={selectedMoods.includes(mood) ? "default" : "outline"}
                                  className="cursor-pointer"
                                  onClick={() => toggleMoodFilter(mood)}
                                >
                                  <span className="mr-1">{moodEmojis[mood] || ""}</span>
                                  {mood}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2">Filter by Date</h4>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !selectedDate && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {selectedDate ? format(selectedDate, 'PPP') : "Pick a date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={selectedDate}
                                  onSelect={setSelectedDate}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="w-full"
                            onClick={clearFilters}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Clear all filters
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                    
                    {selectedTags.length > 0 && (
                      <div className="flex flex-wrap gap-1 items-center">
                        <span className="text-xs text-muted-foreground">Tags:</span>
                        {selectedTags.map(tag => (
                          <Badge key={tag} variant="secondary" className="gap-1 text-xs">
                            {tag}
                            <X 
                              className="h-3 w-3 cursor-pointer" 
                              onClick={() => setSelectedTags(selectedTags.filter(t => t !== tag))}
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {selectedMoods.length > 0 && (
                      <div className="flex flex-wrap gap-1 items-center">
                        <span className="text-xs text-muted-foreground">Moods:</span>
                        {selectedMoods.map(mood => (
                          <Badge key={mood} variant="secondary" className="gap-1 text-xs">
                            {moodEmojis[mood] || ""} {mood}
                            <X 
                              className="h-3 w-3 cursor-pointer" 
                              onClick={() => setSelectedMoods(selectedMoods.filter(m => m !== mood))}
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {selectedDate && (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">Date:</span>
                        <Badge variant="secondary" className="gap-1 text-xs">
                          {format(selectedDate, 'MMM dd, yyyy')}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => setSelectedDate(undefined)}
                          />
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
                
                {filteredEntries.length > 0 ? (
                  <JournalEntryList 
                    entries={filteredEntries} 
                    onViewCalendar={handleViewCalendar}
                  />
                ) : (
                  <div className="text-center p-8">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">No entries found</h3>
                    <p className="text-muted-foreground mt-2">
                      {entries.length > 0 
                        ? "Try changing your search or filters" 
                        : "Start writing your first journal entry"}
                    </p>
                    
                    {entries.length === 0 && (
                      <Button 
                        className="mt-4"
                        onClick={() => setActiveTab('write')}
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Create your first entry
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Journal Calendar</CardTitle>
                <CardDescription>
                  View your journal entries by date
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mx-auto max-w-sm">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setActiveTab('entries');
                    }}
                    className="rounded-md border"
                    modifiers={{
                      hasEntry: (date) => {
                        const dateStr = format(date, 'yyyy-MM-dd');
                        return !!calendarEntries[dateStr];
                      }
                    }}
                    modifiersStyles={{
                      hasEntry: { 
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        fontWeight: 'bold'
                      }
                    }}
                    components={{
                      DayContent: ({ date }) => {
                        const dateStr = format(date, 'yyyy-MM-dd');
                        const entryCount = calendarEntries[dateStr] || 0;
                        return (
                          <div className="relative h-full w-full p-2">
                            <span>{date.getDate()}</span>
                            {entryCount > 0 && (
                              <span className="absolute bottom-1 right-1 flex h-2 w-2 rounded-full bg-primary"></span>
                            )}
                          </div>
                        );
                      }
                    }}
                  />
                  
                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    <p>Click on a date to view entries from that day</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>Days with journal entries</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default JournalPage;
