import React from 'react';
import { getAllEntries } from '../../lib/posts';
import AllPostsClient from './all-posts-client';

export default function AllPostsPage() {
  const entries = getAllEntries();
  
  return <AllPostsClient entries={entries} />;
}

export const metadata = {
  title: "All Entries - JST Life",
  description: "Complete list of all journal entries from JST Life",
};