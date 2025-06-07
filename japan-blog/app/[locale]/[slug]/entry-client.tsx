"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from "motion/react";
import JournalEntry from '../../../components/JournalEntry';
import { JournalEntry as JournalEntryType } from '../../../lib/posts';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import LanguageSwitcher from '../../../components/LanguageSwitcher';
import { ArrowLeft, BookOpen, Image, Video, ChevronDown, ChevronUp } from 'lucide-react';

interface EntryClientProps {
  entry: JournalEntryType;
  allEntries: JournalEntryType[];
  locale: string;
  availableLocales: string[];
}

export default function EntryClient({ entry, allEntries, locale, availableLocales }: EntryClientProps) {
  // State for mobile sidebar visibility
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
  // Toggle mobile sidebar
  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
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
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/${locale === 'jp' ? 'jp' : 'en'}`} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-stone-800 to-stone-900 rounded-xl flex items-center justify-center">
                <span className="font-bold text-lg">🇯🇵</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-stone-900 tracking-tight">JST Life</h1>
                <p className="text-stone-600 text-sm">Travels and daily life in Japan</p>
              </div>
            </Link>
            <nav className="flex items-center space-x-4">
              <Link href={`/${locale === 'jp' ? 'jp' : ''}`} className="text-stone-600 hover:text-amber-600 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <a 
                href="https://flic.kr/s/aHBqjCgaGe" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-stone-600 hover:text-amber-600 transition-colors"
              >
                <Image className="w-4 h-4" aria-label="Photos" />
                <span className="text-sm font-medium">Photos</span>
              </a>
              <a 
                href="https://www.youtube.com/playlist?list=PLeZOGv1nZ2p5RMu4jTovwSbIIBvOY5JaT" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-stone-600 hover:text-amber-600 transition-colors"
              >
                <Video className="w-4 h-4" />
                <span className="text-sm font-medium">Videos</span>
              </a>
              <LanguageSwitcher availableLocales={availableLocales} />
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Mobile Sidebar Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={toggleMobileSidebar}
            className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-stone-200/60 rounded-lg hover:bg-white transition-colors"
          >
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-stone-900">All Entries</span>
            {showMobileSidebar ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Sidebar */}
          <motion.aside 
            className={`lg:col-span-1 space-y-3 ${showMobileSidebar ? 'block' : 'hidden lg:block'}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
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
                  <Link key={`${locale}-${entryItem.slug}`} href={`/${locale === 'jp' ? 'jp' : 'en'}/${entryItem.slug}`}>
                    <motion.div 
                      className={`relative p-2 rounded-lg transition-colors hover:bg-stone-100 ${
                        entryItem.slug === entry.slug ? 'bg-amber-50 border border-amber-200' : ''
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
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
                    </motion.div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </motion.aside>

          {/* Main Content */}
          <motion.main 
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <JournalEntry entry={entry} />
          </motion.main>
        </div>
      </div>
    </div>
  );
}
