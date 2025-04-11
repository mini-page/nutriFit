
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { CalendarDays, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: Date;
  mood?: string;
  tags?: string[];
}

interface JournalEntryListProps {
  entries: JournalEntry[];
}

const JournalEntryList: React.FC<JournalEntryListProps> = ({ entries }) => {
  return (
    <div className="space-y-4">
      {entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        entries.map((entry) => (
          <Card key={entry.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="py-3 px-4 bg-muted/20 border-b flex flex-row items-center justify-between">
              <div>
                <h3 className="font-semibold">{entry.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <CalendarDays className="h-3.5 w-3.5 mr-1" />
                  <span>{formatDistanceToNow(new Date(entry.date), { addSuffix: true })}</span>
                </div>
              </div>
              {entry.mood && (
                <div className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">
                  {entry.mood}
                </div>
              )}
            </CardHeader>
            <CardContent className="p-4">
              <p className="whitespace-pre-line">{entry.content}</p>
              
              {entry.tags && entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {entry.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="flex items-center gap-1 text-xs">
                      <Tag className="h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default JournalEntryList;
