"use client";

import { useState } from 'react';
import Link from 'next/link';
import { JournalEntry } from '../../lib/posts';
import { motion } from "motion/react";
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { getTranslation, Locale } from '../../lib/translations';

// Import shadcn components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";

// Import Lucide icons
import { CalendarDays, MapPin, Plane, BookOpen, ChevronDown, ChevronUp, Utensils, Camera, Building, Train, Heart, Coffee, Video, Image } from "lucide-react";

interface HomeClientProps {
  entries: JournalEntry[];
  locale: string;
}

export default function HomeClient({ entries, locale }: HomeClientProps) {
  const t = (key: keyof typeof import('../../lib/translations').translations.en) => 
    getTranslation(locale as Locale, key);
  // State for showing all entries
  const [showAllEntries, setShowAllEntries] = useState(false);
  // State for mobile sidebar visibility
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
  // Toggle between showing all entries or just recent ones
  const toggleShowAll = () => {
    setShowAllEntries(!showAllEntries);
  };
  
  // Toggle mobile sidebar
  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };
  
  // Function to get the appropriate icon for an entry based on its tags
  const getEntryIcon = (tags: string[]) => {
    const iconProps = "w-5 h-5 text-amber-600";
    
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
  
  // Entries to display in the grid
  const displayEntries = showAllEntries ? entries : entries.slice(0, 2);
  
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
              <a 
                href="https://flic.kr/s/aHBqjCgaGe" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-stone-600 hover:text-amber-600 transition-colors"
              >
                <Image className="w-4 h-4" aria-label="Photos" />
                <span className="text-sm font-medium">{t('photos')}</span>
              </a>
              <a 
                href="https://www.youtube.com/playlist?list=PLeZOGv1nZ2p5RMu4jTovwSbIIBvOY5JaT" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-stone-600 hover:text-amber-600 transition-colors"
              >
                <Video className="w-4 h-4" />
                <span className="text-sm font-medium">{t('videos')}</span>
              </a>
              <LanguageSwitcher />
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
          <aside className={`lg:col-span-1 space-y-3 ${showMobileSidebar ? 'block' : 'hidden lg:block'}`}>
            {/* All Posts Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <Link href={`/${locale === 'jp' ? 'jp' : 'en'}/all-posts`}>
                <Card className="border-stone-200/60 shadow-sm bg-white/60 backdrop-blur-sm hover:shadow-md transition-all duration-300 cursor-pointer group">
                  <CardContent className="px-3 py-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-amber-600" />
                        <span className="text-base font-semibold text-stone-900 group-hover:text-amber-700 transition-colors">
                          {t('allEntries')}
                        </span>
                      </div>
                      <div className="text-xs text-stone-500 bg-stone-100 px-2 py-1 rounded-full">
                        {entries.length}
                      </div>
                    </div>
                    <p className="text-xs text-stone-600 mt-1">
                      View all entries in a table format
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>


            {/* Recent Posts Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-stone-200/60 shadow-sm bg-white/60 backdrop-blur-sm" style={{ gap: '0', paddingTop: '12px', paddingBottom: '12px' }}>
              <CardHeader className="pb-1">
                <CardTitle className="text-base font-semibold text-stone-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  {t('recentEntries')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto px-3 py-2 space-y-2">
                {entries.slice(0, 5).map((entry, index) => {
                  // Function to get random color for dots
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
                    <Link key={entry.slug} href={`/${locale === 'jp' ? 'jp' : 'en'}/${entry.slug}`}>
                      <motion.div 
                        className="relative px-2 py-1.5 rounded-lg transition-colors hover:bg-stone-100"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        {index !== entries.slice(0, 5).length - 1 && (
                          <div className="absolute left-3 top-8 w-px h-6 bg-gradient-to-b from-stone-300 to-transparent" />
                        )}
                        <div className="flex items-start space-x-3">
                          <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${getDotColor(entry.slug)}`} />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-stone-900 text-sm leading-tight">{entry.title}</h4>
                            <p className="text-xs text-stone-600 mt-1">{new Date(entry.date).toLocaleDateString('en-US', {
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric'
                            })}</p>
                            <p className="text-xs text-stone-500 mt-1 line-clamp-2">{entry.preview}</p>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
                </div>
              </CardContent>
            </Card>
            </motion.div>
          </aside>
          {/* Main Content */}
          <main className="lg:col-span-3 space-y-4">
            {/* Journal Entries */}
            <motion.section 
              className="space-y-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h2 className="text-3xl font-bold text-stone-900">{t('journalEntries')}</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-stone-300 to-transparent" />
                </div>
                {entries.length > 2 && (
                  <button 
                    className="flex items-center gap-1 text-sm text-stone-600 hover:text-stone-900 transition-colors"
                    onClick={toggleShowAll}
                  >
                    {showAllEntries ? (
                      <>
                        <span>{t('showRecent')}</span>
                        <ChevronUp size={16} />
                      </>
                    ) : (
                      <>
                        <span>{t('showAll')}</span>
                        <ChevronDown size={16} />
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {displayEntries.map((entry, index) => (
                  <motion.div
                    key={entry.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link href={`/${locale === 'jp' ? 'jp' : 'en'}/${entry.slug}`}>
                      <Card
                        className="group hover:shadow-lg transition-all duration-300 border-stone-200/60 bg-white/80 backdrop-blur-sm hover:bg-white cursor-pointer"
                      >
                      <CardHeader className="space-y-1 pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-semibold text-stone-900 group-hover:text-amber-700 transition-colors">
                            {entry.title}
                          </CardTitle>
                          {getEntryIcon(entry.tags)}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-stone-600">
                          <CalendarDays className="w-4 h-4" />
                          <span>{new Date(entry.date).toLocaleDateString('en-US', {
                            month: 'long', 
                            day: 'numeric', 
                            year: 'numeric'
                          })}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3 pt-0">
                        <CardDescription className="text-stone-700 leading-relaxed">{entry.preview}</CardDescription>
                        <div className="flex flex-wrap gap-2">
                          {entry.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="border-stone-300 text-stone-600 hover:bg-stone-100 transition-colors"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                  </motion.div>
                ))}
              </div>

              {displayEntries.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-stone-200/60 shadow-sm bg-white/60 backdrop-blur-sm">
                    <CardContent className="p-8 text-center">
                      <p className="text-stone-600">No entries found.</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.section>

            <Separator className="bg-stone-200" />

            {/* About Section */}
            <motion.section 
              className="space-y-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-bold text-stone-900">{t('aboutTitle')}</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-stone-300 to-transparent" />
              </div>

              <Card className="border-stone-200/60 shadow-sm bg-gradient-to-br from-white to-amber-50/30">
                <CardContent className="p-8">
                  <div className="space-y-4 text-stone-700 leading-relaxed">
                    <p>
                      {t('aboutText1')}
                    </p>
                    <p>
                      {t('aboutText2')}
                    </p>
                    <p>
                      {t('aboutText3')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-stone-200/60 bg-white/60 backdrop-blur-sm mt-6">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span className="text-stone-600 text-sm">{t('currentlyIn')}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
