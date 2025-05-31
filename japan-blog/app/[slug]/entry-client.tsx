"use client";

import React from 'react';
import Timeline from '../../components/Timeline';
import JournalEntry from '../../components/JournalEntry';
import { JournalEntry as JournalEntryType } from '../../lib/posts';

interface EntryClientProps {
  entry: JournalEntryType;
  allEntries: JournalEntryType[];
}

export default function EntryClient({ entry, allEntries }: EntryClientProps) {
  return (
    <>
      <Timeline entries={allEntries} />
      
      <main className="main-content">
        <JournalEntry entry={entry} />
      </main>
    </>
  );
}
