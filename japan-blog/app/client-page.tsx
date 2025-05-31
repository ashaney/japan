"use client";

import { useState } from 'react';
import Timeline from '../components/Timeline';
import Tag from '../components/Tag';
import Link from 'next/link';
import { JournalEntry } from '../lib/posts';

interface ClientPageProps {
  entries: JournalEntry[];
}

export default function ClientPage({ entries }: ClientPageProps) {
  // State for filtered entries
  const [filteredEntries, setFilteredEntries] = useState(entries);
  const [showAllEntries, setShowAllEntries] = useState(false);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  
  // Get all unique tags from entries
  const allTags = Array.from(new Set(
    entries.flatMap(entry => entry.tags || [])
  )).sort();
  
  // Handle tag filter changes
  const handleTagClick = (tag: string) => {
    setActiveTags(prevTags => {
      if (prevTags.includes(tag)) {
        // Remove tag if already active
        const newTags = prevTags.filter(t => t !== tag);
        filterEntries(newTags);
        return newTags;
      } else {
        // Add tag if not active
        const newTags = [...prevTags, tag];
        filterEntries(newTags);
        return newTags;
      }
    });
  };
  
  // Filter entries based on active tags
  const filterEntries = (tags: string[]) => {
    if (tags.length === 0) {
      // If no tags are selected, show all entries
      setFilteredEntries(entries);
    } else {
      // Filter entries that have at least one of the selected tags
      const filtered = entries.filter(entry => 
        entry.tags.some(tag => tags.includes(tag))
      );
      setFilteredEntries(filtered);
    }
  };
  
  // Toggle between showing all entries or just recent ones
  const toggleShowAll = () => {
    setShowAllEntries(!showAllEntries);
  };
  
  // Clear all active filters
  const clearFilters = () => {
    setActiveTags([]);
    setFilteredEntries(entries);
  };
  
  // Entries to display in the grid
  const displayEntries = showAllEntries ? filteredEntries : filteredEntries.slice(0, 3);
  
  return (
    <>
      <Timeline entries={entries} />
      
      <main className="main-content">
        <div className="journal-content home-page">
          <div className="journal-header">
            <h1 className="journal-title"><center>🇯🇵 JST Life 🇯🇵</center></h1>
            <p className="home-subtitle">Documenting travels and daily life in Japan</p>
          </div>
          
          <div className="journal-body">
            <div className="welcome-message">
              <p>Welcome to my Japan journal! This is where I document my experiences, discoveries, and daily life while living on Japanese Standard Time (JST).</p>
            </div>
            
            <div className="filter-section">
              <div className="tag-filter-header">
                <h3>Filter by Tag</h3>
                {activeTags.length > 0 && (
                  <button className="clear-filters" onClick={clearFilters}>
                    Clear filters
                  </button>
                )}
              </div>
              
              <div className="tag-list">
                {allTags.map(tag => (
                  <Tag 
                    key={tag} 
                    name={tag} 
                    onClick={handleTagClick} 
                    isActive={activeTags.includes(tag)}
                  />
                ))}
                
                {allTags.length === 0 && (
                  <p className="no-tags">No tags available</p>
                )}
              </div>
            </div>
            
            <div className="entries-header">
              <h2>Journal Entries {filteredEntries.length !== entries.length && 
                `(${filteredEntries.length}/${entries.length})`}</h2>
              {filteredEntries.length > 3 && (
                <button 
                  className="toggle-entries-btn" 
                  onClick={toggleShowAll}
                >
                  {showAllEntries ? 'Show Recent' : 'Show All'}
                </button>
              )}
            </div>
            
            <div className="recent-entries">
              {displayEntries.length > 0 ? (
                displayEntries.map(entry => (
                  <div key={entry.slug} className="recent-entry-card">
                    <Link href={`/${entry.slug}`} className="recent-entry-link">
                      <h3>{entry.title}</h3>
                      <div className="recent-entry-date">{new Date(entry.date).toLocaleDateString('en-US', {
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric'
                      })}</div>
                      <p className="recent-entry-preview">{entry.preview}</p>
                      <div className="recent-entry-tags">
                        {entry.tags.slice(0, 3).map(tag => (
                          <Tag key={tag} name={tag} />
                        ))}
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="no-entries-message">
                  <p>No matching entries found. Try adjusting your filters.</p>
                </div>
              )}
            </div>
            
            <div className="about-section">
              <h2>About This Journal</h2>
              <p>This journal is built with Next.js and MDX, allowing me to easily create entries using Markdown with rich formatting, images, and more.</p>
              <p>Browse through entries using the timeline on the left, or click on the recent entries above to read individual posts.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
