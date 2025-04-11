
import React, { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Badge } from "@/components/ui/badge";
import { Tag, X } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
});

interface JournalEntry {
  title: string;
  content: string;
  tags?: string[];
  mood?: string;
}

interface JournalEntryFormProps {
  onSubmit: (data: JournalEntry) => void;
  availableTags?: string[]; // Add availableTags as an optional prop
}

export const JournalEntryForm: React.FC<JournalEntryFormProps> = ({
  onSubmit,
  availableTags = [],
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [mood, setMood] = useState<string>('');
  
  const form = useForm<JournalEntry>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  function handleSubmit(values: JournalEntry) {
    // Add selected tags and mood to the entry
    const completeEntry = {
      ...values,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      mood: mood || undefined,
    };
    
    onSubmit(completeEntry);
    setSelectedTags([]);
    setMood('');
    form.reset();
  }
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const moods = ['Happy', 'Sad', 'Anxious', 'Calm', 'Tired', 'Energetic', 'Frustrated', 'Grateful'];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your entry here"
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {availableTags && availableTags.length > 0 && (
          <div className="space-y-2">
            <FormLabel>Tags</FormLabel>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <Badge 
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <FormLabel>Mood (optional)</FormLabel>
          <div className="flex flex-wrap gap-2">
            {moods.map(m => (
              <Badge 
                key={m}
                variant={mood === m ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setMood(mood === m ? '' : m)}
              >
                {m}
                {mood === m && <X className="h-3 w-3 ml-1" />}
              </Badge>
            ))}
          </div>
        </div>
        
        <Button type="submit">Add Entry</Button>
      </form>
    </Form>
  );
};

export default JournalEntryForm;
