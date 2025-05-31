"use client";

import React, { useMemo, useEffect } from 'react';
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
  // Extract Flickr embeds and process content
  const { contentHtml, flickrEmbeds } = useMemo(() => {
    try {
      // Find Flickr embed codes
      const flickrRegex = /<a data-flickr-embed="true"[^>]*>[\s\S]*?<\/a><script[^>]*src="\/\/embedr\.flickr\.com\/assets\/client-code\.js"[^>]*><\/script>/g;
      const embeds = entry.content.match(flickrRegex) || [];
      
      // Remove Flickr embeds from content for markdown processing (completely remove them)
      const contentWithoutEmbeds = entry.content.replace(flickrRegex, '');
      
      // Process markdown
      const result = unified()
        .use(remarkParse)
        .use(remarkHtml)
        .processSync(contentWithoutEmbeds);
      
      return {
        contentHtml: result.toString(),
        flickrEmbeds: embeds
      };
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return {
        contentHtml: entry.content,
        flickrEmbeds: []
      };
    }
  }, [entry.content]);

  // Load Flickr script when embeds are present
  useEffect(() => {
    if (flickrEmbeds.length > 0) {
      // Check if script already exists
      const existingScript = document.querySelector('script[src*="embedr.flickr.com"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = '//embedr.flickr.com/assets/client-code.js';
        script.async = true;
        script.charset = 'utf-8';
        document.head.appendChild(script);
      }
    }
  }, [flickrEmbeds]);

  // Render content with Flickr embeds
  const renderContent = () => {
    const result: React.ReactNode[] = [];

    // Add the main content first
    result.push(
      <div key="main-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
    );

    // Add Flickr embeds at the end, centered
    flickrEmbeds.forEach((embed, index) => {
      const embedMatch = embed.match(/<a data-flickr-embed="true"[^>]*>[\s\S]*?<\/a>/);
      if (embedMatch) {
        result.push(
          <div 
            key={`flickr-${index}`} 
            className="my-8 flex justify-center"
            dangerouslySetInnerHTML={{ __html: embedMatch[0] }} 
          />
        );
      }
    });

    return result;
  };

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
          <div className="prose prose-lg max-w-none">
            {renderContent()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JournalEntry;
