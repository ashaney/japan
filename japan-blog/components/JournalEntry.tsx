"use client";

import React, { useMemo } from 'react';
import { JournalEntry as JournalEntryType } from '../lib/posts';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import Tag from './Tag';

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
    <div className="journal-content">
      <div className="journal-header">
        <h1 className="journal-title">{entry.title}</h1>
        <div className="journal-meta">
          <div className="journal-date">
            {new Date(entry.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <div className="journal-reading-time">{entry.readingTime}</div>
        </div>
        <div className="journal-tags">
          {entry.tags.map((tag) => (
            <Tag key={tag} name={tag} />
          ))}
        </div>
      </div>
      
      <div 
        className="journal-body" 
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
};

export default JournalEntry;
