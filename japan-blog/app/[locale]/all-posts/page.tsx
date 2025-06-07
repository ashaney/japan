import React from 'react';
import { getAllEntries } from '../../../lib/posts';
import AllPostsClient from './all-posts-client';

export default async function AllPostsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const entries = getAllEntries(locale);
  
  return <AllPostsClient entries={entries} locale={locale} />;
}

export const metadata = {
  title: "All Entries - JST Life",
  description: "Complete list of all journal entries from JST Life",
};