"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from "motion/react";
import { JournalEntry } from '../../lib/posts';
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, Calendar, Tag, Search, SortAsc, SortDesc, Image, Video } from 'lucide-react';

interface AllPostsClientProps {
  entries: JournalEntry[];
}

type SortField = 'date' | 'title';
type SortDirection = 'asc' | 'desc';

export default function AllPostsClient({ entries }: AllPostsClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedTag, setSelectedTag] = useState<string>('');

  // Get all unique tags
  const allTags = Array.from(new Set(
    entries.flatMap(entry => entry.tags || [])
  )).sort();

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

  // Filter and sort entries
  const filteredAndSortedEntries = entries
    .filter(entry => {
      const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           entry.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesTag = !selectedTag || entry.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      const aValue = sortField === 'date' ? new Date(a.date).getTime() : a.title.toLowerCase();
      const bValue = sortField === 'date' ? new Date(b.date).getTime() : b.title.toLowerCase();
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50/30">
      {/* Header */}
      <header className="border-b border-stone-200/60 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-stone-800 to-stone-900 rounded-xl flex items-center justify-center">
                <span className="font-bold text-lg">🇯🇵</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-stone-900 tracking-tight">JST Life</h1>
                <p className="text-stone-600 text-sm">Travels and daily life in Japan</p>
              </div>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-stone-600 hover:text-amber-600 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <a 
                href="https://flic.kr/s/aHBqjCgaGe" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-stone-600 hover:text-amber-600 transition-colors"
              >
                <Image className="w-4 h-4" />
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
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-stone-900 mb-2">All Entries</h1>
            <p className="text-stone-600">Complete list of all journal entries ({entries.length} entries)</p>
          </div>

          {/* Filters and Search */}
          <div className="mb-6 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Tag Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-stone-700">Filter by tag:</span>
              <Badge
                variant={selectedTag === '' ? 'default' : 'outline'}
                className={`cursor-pointer transition-colors ${
                  selectedTag === '' 
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'hover:bg-stone-100'
                }`}
                onClick={() => setSelectedTag('')}
              >
                All
              </Badge>
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? 'default' : 'outline'}
                  className={`cursor-pointer transition-colors ${
                    selectedTag === tag 
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'hover:bg-stone-100'
                  }`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Table */}
          <Card className="border-stone-200/60 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-stone-200 bg-stone-50/50">
                    <tr>
                      <th className="text-left p-4 w-12"></th>
                      <th 
                        className="text-left p-4 font-semibold text-stone-900 cursor-pointer hover:bg-stone-100 transition-colors"
                        onClick={() => handleSort('title')}
                      >
                        <div className="flex items-center gap-2">
                          <span>Title</span>
                          {sortField === 'title' && (
                            sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                      <th 
                        className="text-left p-4 font-semibold text-stone-900 cursor-pointer hover:bg-stone-100 transition-colors"
                        onClick={() => handleSort('date')}
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          <span>Date</span>
                          {sortField === 'date' && (
                            sortDirection === 'asc' ? <SortAsc className="w-3 h-3" /> : <SortDesc className="w-3 h-3" />
                          )}
                        </div>
                      </th>
                      <th className="text-left p-4 font-semibold text-stone-900">Preview</th>
                      <th className="text-left p-4 font-semibold text-stone-900">
                        <div className="flex items-center gap-2">
                          <Tag className="w-3 h-3" />
                          <span>Tags</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedEntries.map((entry, index) => (
                      <motion.tr
                        key={entry.slug}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-b border-stone-100 hover:bg-stone-50/50 transition-colors"
                      >
                        <td className="p-4">
                          <div className={`w-3 h-3 rounded-full ${getDotColor(entry.slug)}`} />
                        </td>
                        <td className="p-4">
                          <Link href={`/${entry.slug}`} className="block group">
                            <div className="font-medium text-stone-900 group-hover:text-amber-700 transition-colors">
                              {entry.title}
                            </div>
                          </Link>
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-stone-600">
                            {new Date(entry.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-stone-600 max-w-md line-clamp-2">
                            {entry.preview}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {entry.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs border-stone-300 text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
                                onClick={() => setSelectedTag(tag)}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredAndSortedEntries.length === 0 && (
                <div className="p-8 text-center">
                  <p className="text-stone-600">No entries found matching your criteria.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Summary */}
          <div className="mt-4 text-sm text-stone-600">
            Showing {filteredAndSortedEntries.length} of {entries.length} entries
            {selectedTag && <span> • Filtered by &ldquo;{selectedTag}&rdquo;</span>}
            {searchTerm && <span> • Searching for &ldquo;{searchTerm}&rdquo;</span>}
          </div>
        </motion.div>
      </div>
    </div>
  );
}