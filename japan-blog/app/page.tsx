import HomeClient from './home-client';
import { getAllEntries } from '../lib/posts';

export default function Home() {
  // Get all entries on the server
  const entries = getAllEntries();
  
  // Pass entries to the client component
  return <HomeClient entries={entries} />;
}
