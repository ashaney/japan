"use client";

import Link from 'next/link';
import { JournalEntry as JournalEntryType } from '../lib/posts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CalendarDays, Plane } from "lucide-react";

interface JournalEntryListProps {
  entries: JournalEntryType[];
  className?: string;
}

export default function JournalEntryList({ entries, className = "" }: JournalEntryListProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      {entries.map((entry) => (
        <Link key={entry.slug} href={`/${entry.slug}`}>
          <Card
            className="group hover:shadow-lg transition-all duration-300 border-stone-200/60 bg-white/80 backdrop-blur-sm hover:bg-white cursor-pointer"
          >
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-stone-900 group-hover:text-amber-700 transition-colors">
                  {entry.title}
                </CardTitle>
                {entry.tags.includes("Travel") || entry.tags.includes("Flight") ? (
                  <Plane className="w-5 h-5 text-amber-600" />
                ) : (
                  <CalendarDays className="w-5 h-5 text-amber-600" />
                )}
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
            <CardContent className="space-y-4">
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
      ))}
    </div>
  );
}
