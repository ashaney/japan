import HomeClient from './home-client';
import { getAllEntries } from '../../lib/posts';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  // Get all entries on the server for the specific locale
  const entries = getAllEntries(locale);
  
  // Pass entries and locale to the client component
  return <HomeClient entries={entries} locale={locale} />;
}
