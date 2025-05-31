import React, { useState, useEffect } from 'react';
import Tag from './Tag';
import { getAllUniqueTags } from '../lib/tagUtils';
import { JournalEntry } from '../lib/posts';

interface TagFilterProps {
  entries: JournalEntry[];
  onFilterChange: (filteredEntries: JournalEntry[]) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ entries, onFilterChange }) => {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const allTags = getAllUniqueTags(entries);
  
  // Filter entries whenever active tags change
  useEffect(() => {
    if (activeTags.length === 0) {
      // If no tags are selected, show all entries
      onFilterChange(entries);
    } else {
      // Filter entries that have at least one of the selected tags
      const filtered = entries.filter(entry => 
        entry.tags.some(tag => activeTags.includes(tag))
      );
      onFilterChange(filtered);
    }
  }, [activeTags, entries, onFilterChange]);

  const toggleTag = (tag: string) => {
    setActiveTags(prevTags => {
      if (prevTags.includes(tag)) {
        // Remove tag if already active
        return prevTags.filter(t => t !== tag);
      } else {
        // Add tag if not active
        return [...prevTags, tag];
      }
    });
  };

  const clearFilters = () => {
    setActiveTags([]);
  };

  return (
    <div className="tag-filter">
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
            onClick={toggleTag} 
            isActive={activeTags.includes(tag)}
          />
        ))}
        
        {allTags.length === 0 && (
          <p className="no-tags">No tags available</p>
        )}
      </div>
    </div>
  );
};

export default TagFilter;
