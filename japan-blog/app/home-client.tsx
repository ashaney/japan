"use client";

import { useState } from 'react';
import Link from 'next/link';
import Timeline from '../components/Timeline';
import { JournalEntry } from '../lib/posts';

// Import shadcn components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";

// Import Lucide icons
import { Calendar, Filter, FilterX, ChevronDown, ChevronUp } from "lucide-react";

interface HomeClientProps {
  entries: JournalEntry[];
}

export default function HomeClient({ entries }: HomeClientProps) {
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
      
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-flexoki-950">🇯🇵 JST Life 🇯🇵</h1>
            <p className="text-xl text-flexoki-700">Documenting travels and daily life in Japan</p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar with filters - now on left side for desktop */}
            <div className="lg:w-1/4 order-2 lg:order-1">
              <div className="sticky top-8">
                <Card className="bg-flexoki-50 border-flexoki-200 shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Filter size={18} />
                        <span>Filter by Tag</span>
                      </CardTitle>
                      {activeTags.length > 0 && (
                        <button 
                          onClick={clearFilters}
                          className="text-sm flex items-center gap-1 text-flexoki-600 hover:text-flexoki-900 transition-colors"
                        >
                          <FilterX size={16} />
                          <span>Clear</span>
                        </button>
                      )}
                    </div>
                  </CardHeader>
                  <Separator className="bg-flexoki-200" />
                  <CardContent className="pt-4">
                    <div className="flex flex-wrap gap-2">
                      {allTags.map(tag => (
                        <Badge 
                          key={tag}
                          variant={activeTags.includes(tag) ? "default" : "outline"} 
                          className={`cursor-pointer ${activeTags.includes(tag) ? 'bg-flexoki-600 hover:bg-flexoki-700' : 'text-flexoki-700 hover:text-flexoki-900 border-flexoki-200'}`}
                          onClick={() => handleTagClick(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                      {allTags.length === 0 && (
                        <p className="text-sm text-flexoki-500 italic">No tags available</p>
                      )}
                    </div>
                    
                    {activeTags.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-flexoki-200 text-sm text-flexoki-600">
                        <p>Showing <span className="font-medium text-flexoki-900">{filteredEntries.length}</span> of <span className="font-medium text-flexoki-900">{entries.length}</span> entries</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="mt-6 bg-flexoki-50 border-flexoki-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">About This Journal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-flexoki-700 mb-3">Welcome to my Japan journal! This is where I document my experiences, discoveries, and daily life while living on Japanese Standard Time (JST).</p>
                    <p className="text-sm text-flexoki-700">Built with Next.js and MDX, allowing for rich formatting, images, and more.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Main content column */}
            <div className="lg:w-3/4 order-1 lg:order-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-flexoki-900 flex items-center gap-2">
                  Journal Entries
                  {filteredEntries.length !== entries.length && (
                    <span className="text-sm font-normal bg-flexoki-100 px-2 py-1 rounded-full text-flexoki-700">({filteredEntries.length}/{entries.length})</span>
                  )}
                </h2>
                {filteredEntries.length > 3 && (
                  <button 
                    className="flex items-center gap-1 text-sm text-flexoki-600 hover:text-flexoki-900 transition-colors"
                    onClick={toggleShowAll}
                  >
                    {showAllEntries ? (
                      <>
                        <span>Show Recent</span>
                        <ChevronUp size={16} />
                      </>
                    ) : (
                      <>
                        <span>Show All</span>
                        <ChevronDown size={16} />
                      </>
                    )}
                  </button>
                )}
              </div>
              
              <div className="grid gap-6 mb-12">
                {displayEntries.length > 0 ? (
                  displayEntries.map(entry => (
                    <Link key={entry.slug} href={`/${entry.slug}`} className="block transition hover:translate-y-[-2px]">
                      <Card className="border-flexoki-200 hover:shadow-md transition-all">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-xl text-flexoki-900">{entry.title}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <Calendar size={14} className="text-flexoki-500" />
                            <span>{new Date(entry.date).toLocaleDateString('en-US', {
                              month: 'long', 
                              day: 'numeric', 
                              year: 'numeric'
                            })}</span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-flexoki-700">{entry.preview}</p>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <div className="flex flex-wrap gap-2">
                            {entry.tags.slice(0, 3).map(tag => (
                              <Badge key={tag} variant="secondary" className="bg-flexoki-100 text-flexoki-700 hover:bg-flexoki-200">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))
                ) : (
                  <Card className="border-flexoki-200 bg-flexoki-50">
                    <CardContent className="pt-6 text-center">
                      <p className="text-flexoki-600">No matching entries found. Try adjusting your filters.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
