"use server";

import { getAllEntries } from '../lib/posts';

// This function runs on the server and pre-fetches the data
export async function getJournalData() {
  const entries = getAllEntries();
  return {
    entries
  };
}
