"use client";

import React from 'react';
import Link from 'next/link';
import { JournalEntry } from '../lib/posts';

interface TimelineProps {
  entries: JournalEntry[];
}

// Function to determine dot color based on entry slug (to ensure consistency)
const getDotColor = (slug: string): string => {
  // Flexoki theme colors - light mode
  const flexokiColors = [
    'dot-red',      // #D14D41 - Red
    'dot-orange',   // #DA702C - Orange
    'dot-yellow',   // #D0A215 - Yellow
    'dot-green',    // #7D9726 - Green
    'dot-cyan',     // #2D9574 - Cyan
    'dot-blue',     // #6C8EC6 - Blue
    'dot-purple',   // #9E7DB4 - Purple
    'dot-magenta'   // #CE5D97 - Magenta
  ];
  
  // Create a hash from the slug to ensure the same entry always gets the same color
  const hashCode = slug.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  // Get a color from the Flexoki palette based on the hash
  return flexokiColors[Math.abs(hashCode) % flexokiColors.length];
};

const Timeline: React.FC<TimelineProps> = ({ entries }) => {
  return (
    <div className="sidebar">
      <Link href="/" className="site-title">
        <h1>JST Life</h1>
        <div className="subtitle">Travels and daily life in Japan</div>
      </Link>
      
      <div className="timeline">
        {entries.length === 0 ? (
          <div className="timeline-empty">
            <p>No journal entries yet.</p>
            <p>Add MDX files to the content/entries directory to get started.</p>
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry.slug} className="timeline-item">
              <div className={`timeline-dot ${getDotColor(entry.slug)}`}></div>
              <div className="timeline-content">
                <Link href={`/${entry.slug}`} className="timeline-date">
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </Link>
                <Link href={`/${entry.slug}`} className="timeline-title">
                  {entry.title}
                </Link>
                <div className="timeline-preview">{entry.preview}</div>
                <div className="timeline-tags">
                  {entry.tags.map((tag) => (
                    <span key={tag} className="timeline-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Timeline;
