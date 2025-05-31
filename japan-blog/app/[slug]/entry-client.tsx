"use client";

import React from 'react';
import Link from 'next/link';
import JournalEntry from '../../components/JournalEntry';
import { JournalEntry as JournalEntryType } from '../../lib/posts';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, BookOpen, Calendar, Plane, Utensils, Camera, Building, Train, Heart, Coffee, CalendarDays } from 'lucide-react';

interface EntryClientProps {
  entry: JournalEntryType;
  allEntries: JournalEntryType[];
}

export default function EntryClient({ entry, allEntries }: EntryClientProps) {
  // Function to get the appropriate icon for an entry based on its tags
  const getEntryIcon = (tags: string[]) => {
    const iconProps = "w-4 h-4 text-amber-600";
    
    // Check tags for specific content types
    if (tags.some(tag => ["Travel", "Flight", "Airport", "Journey"].includes(tag))) {
      return <Plane className={iconProps} />;
    }
    if (tags.some(tag => ["Food", "Restaurant", "Cooking", "Meal", "Eating"].includes(tag))) {
      return <Utensils className={iconProps} />;
    }
    if (tags.some(tag => ["Photography", "Photo", "Pictures", "Camera", "Sightseeing"].includes(tag))) {
      return <Camera className={iconProps} />;
    }
    if (tags.some(tag => ["Architecture", "Building", "Temple", "Shrine", "Museum"].includes(tag))) {
      return <Building className={iconProps} />;
    }
    if (tags.some(tag => ["Train", "Railway", "Transportation", "Shinkansen", "Subway"].includes(tag))) {
      return <Train className={iconProps} />;
    }
    if (tags.some(tag => ["Culture", "Experience", "Traditional", "Festival", "Local"].includes(tag))) {
      return <Heart className={iconProps} />;
    }
    if (tags.some(tag => ["Coffee", "Cafe", "Tea", "Drinks", "Morning"].includes(tag))) {
      return <Coffee className={iconProps} />;
    }
    
    // Default icon
    return <CalendarDays className={iconProps} />;
  };

  // Function to get random color for timeline dots
  const getDotColor = (slug: string): string => {
    const flexokiColors = [
      'bg-red-400', 'bg-orange-400', 'bg-amber-400', 'bg-stone-400',
      'bg-rose-400', 'bg-orange-500', 'bg-amber-500', 'bg-stone-500'
    ];
    
    const hashCode = slug.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return flexokiColors[Math.abs(hashCode) % flexokiColors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50/30">
      {/* Header */}
      <header className="border-b border-stone-200/60 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5 text-stone-600" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-rose-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🇯🇵</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-stone-900 tracking-tight">JST Life</h1>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Recent Posts Timeline */}
            <Card className="border-stone-200/60 shadow-sm bg-white/60 backdrop-blur-sm" style={{ gap: '0', paddingTop: '12px', paddingBottom: '12px' }}>
              <CardHeader className="pb-1">
                <CardTitle className="text-lg font-semibold text-stone-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                  All Entries
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {allEntries.map((entryItem, index) => (
                  <Link key={entryItem.slug} href={`/${entryItem.slug}`}>
                    <div className={`relative p-2 rounded-lg transition-colors hover:bg-stone-100 ${
                      entryItem.slug === entry.slug ? 'bg-amber-50 border border-amber-200' : ''
                    }`}>
                      {index !== allEntries.length - 1 && (
                        <div className="absolute left-3 top-10 w-px h-8 bg-gradient-to-b from-stone-300 to-transparent" />
                      )}
                      <div className="flex items-start space-x-3">
                        <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${getDotColor(entryItem.slug)}`} />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-stone-900 text-sm leading-tight">{entryItem.title}</h4>
                          <p className="text-xs text-stone-600 mt-1">{new Date(entryItem.date).toLocaleDateString('en-US', {
                            month: 'short', 
                            day: 'numeric'
                          })}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <JournalEntry entry={entry} />
          </main>
        </div>
      </div>
    </div>
  );
}
