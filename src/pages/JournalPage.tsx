
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import JournalEntryForm from '@/components/journal/JournalEntryForm';
import JournalEntryList from '@/components/journal/JournalEntryList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, CheckCircle2, FileText, PenLine, Search, Tag } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
  const [showPrompt, setShowPrompt] = useState(false);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [allTags, setAllTags] = useState<string[]>(['personal', 'work', 'ideas', 'health', 'fitness', 'food', 'travel']);
  const isMobile = useIsMobile();

  // Load journal entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      try {
        // Parse dates from JSON
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
        
        // Calculate daily streak
        calculateDailyStreak(parsedEntries);
      } catch (error) {
        console.error('Failed to parse saved journal entries:', error);
      }
    }
    
    // Show writing prompt every 3 days or if no entries yet
    const lastPromptDate = localStorage.getItem('lastJournalPromptDate');
    if (!lastPromptDate || (new Date().getTime() - new Date(lastPromptDate).getTime()) > 3 * 24 * 60 * 60 * 1000 || entries.length === 0) {
      setShowPrompt(true);
      localStorage.setItem('lastJournalPromptDate', new Date().toISOString());
    }
  }, []);
  
  // Calculate daily streak based on consecutive days with entries
  const calculateDailyStreak = (journalEntries: JournalEntry[]) => {
    if (journalEntries.length === 0) {
      setDailyStreak(0);
      return;
    }
    
    // Sort entries by date (newest first)
    const sortedEntries = [...journalEntries].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // Get most recent entry date
    const mostRecentDate = new Date(sortedEntries[0].date);
    const today = new Date();
    
    // Check if most recent entry is from today or yesterday
    const dayDiff = Math.floor((today.getTime() - mostRecentDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (dayDiff > 1) {
      // Streak is broken if more than 1 day has passed
      setDailyStreak(0);
      return;
    }
    
    // Count consecutive days with entries
    let streak = 1;
    let currentDate = mostRecentDate;
    
    // Create a map of dates with entries for faster lookup
    const datesWithEntries = sortedEntries.reduce((acc: Record<string, boolean>, entry: JournalEntry) => {
      const dateStr = new Date(entry.date).toDateString();
      acc[dateStr] = true;
      return acc;
    }, {});
    
    // Check previous days
    for (let i = 1; i < 100; i++) { // Limit to 100 days to prevent infinite loop
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
    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    
    // Save entries to localStorage
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    
    // Update tags
    if (newEntry.tags && newEntry.tags.length > 0) {
      const updatedTags = [...allTags];
      newEntry.tags.forEach(tag => {
        if (!updatedTags.includes(tag)) {
          updatedTags.push(tag);
        }
      });
      setAllTags(updatedTags);
    }
    
    // Update streak
    calculateDailyStreak(updatedEntries);
    
    toast.success('Journal entry saved successfully!');
  };
  
  const getFilteredEntries = () => {
    return entries.filter(entry => {
      // Filter by search query
      const matchesSearch = 
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        entry.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by selected tags
      const matchesTags = 
        selectedTags.length === 0 || 
        (entry.tags && entry.tags.some(tag => selectedTags.includes(tag)));
      
      return matchesSearch && matchesTags;
    });
  };
  
  const filteredEntries = getFilteredEntries();
  
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
        
        <Tabs defaultValue="write" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="write" className="flex items-center gap-2">
              <PenLine className="h-4 w-4" /> Write
            </TabsTrigger>
            <TabsTrigger value="entries" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> Entries ({entries.length})
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
                <JournalEntryForm onSubmit={handleAddEntry} availableTags={allTags} />
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
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search entries..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {allTags.slice(0, isMobile ? 3 : 5).map(tag => (
                      <Button
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        size="sm"
                        className="gap-1"
                        onClick={() => {
                          if (selectedTags.includes(tag)) {
                            setSelectedTags(selectedTags.filter(t => t !== tag));
                          } else {
                            setSelectedTags([...selectedTags, tag]);
                          }
                        }}
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </Button>
                    ))}
                    
                    {allTags.length > (isMobile ? 3 : 5) && (
                      <Button variant="ghost" size="sm">
                        +{allTags.length - (isMobile ? 3 : 5)} more
                      </Button>
                    )}
                  </div>
                </div>
                
                {filteredEntries.length > 0 ? (
                  <JournalEntryList entries={filteredEntries} />
                ) : (
                  <div className="text-center p-8">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">No entries found</h3>
                    <p className="text-muted-foreground mt-2">
                      {entries.length > 0 
                        ? "Try changing your search or filters" 
                        : "Start writing your first journal entry"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default JournalPage;
