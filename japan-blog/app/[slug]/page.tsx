import React from 'react';
import { notFound } from 'next/navigation';
import EntryClient from './entry-client';
import { getAllEntries, getEntryBySlug } from '../../lib/posts';

interface PageParams {
  slug: string;
}

export default function EntryPage({ params }: { params: PageParams }) {
  const { slug } = params;
  const entry = getEntryBySlug(slug);
  const allEntries = getAllEntries();
  
  if (!entry) {
    notFound();
  }
  
  return <EntryClient entry={entry} allEntries={allEntries} />;
}

export async function generateStaticParams() {
  const entries = getAllEntries();
  
  return entries.map((entry) => ({
    slug: entry.slug,
  }));
}
