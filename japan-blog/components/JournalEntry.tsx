"use client";

import React, { useMemo } from 'react';
import { JournalEntry as JournalEntryType } from '../lib/posts';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { CalendarDays, Clock } from 'lucide-react';

interface JournalEntryProps {
  entry: JournalEntryType;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ entry }) => {
  // Convert Markdown to HTML using unified, remark-parse, and remark-html
  const contentHtml = useMemo(() => {
    try {
      const result = unified()
        .use(remarkParse)
        .use(remarkHtml)
        .processSync(entry.content);
      return result.toString();
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return entry.content; // Fallback to raw content if processing fails
    }
  }, [entry.content]);

  return (
    <div className="space-y-6">
      {/* Article Header */}
      <Card className="border-stone-200/60 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-4">
          <h1 className="text-3xl font-bold text-stone-900 leading-tight">{entry.title}</h1>
          
          <div className="flex items-center space-x-6 text-sm text-stone-600">
            <div className="flex items-center space-x-2">
              <CalendarDays className="w-4 h-4" />
              <span>{new Date(entry.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{entry.readingTime}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-stone-300 text-stone-700 bg-stone-50 hover:bg-stone-100 transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
      </Card>
      
      {/* Article Content */}
      <Card className="border-stone-200/60 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8">
          <div 
            className="prose prose-lg max-w-none" 
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default JournalEntry;
