import React from 'react';
import { notFound } from 'next/navigation';
import EntryClient from './entry-client';
import { getAllEntries, getEntryBySlug, getAvailableLocales } from '../../../lib/posts';

interface PageParams {
  locale: string;
  slug: string;
}

export default async function EntryPage({ params }: { params: Promise<PageParams> }) {
  const { locale, slug } = await params;
  const entry = getEntryBySlug(slug, locale);
  const allEntries = getAllEntries(locale);
  const availableLocales = getAvailableLocales(slug);
  
  if (!entry) {
    notFound();
  }
  
  return <EntryClient entry={entry} allEntries={allEntries} locale={locale} availableLocales={availableLocales} />;
}

export async function generateStaticParams() {
  const locales = ['en', 'jp'];
  const params = [];
  
  for (const locale of locales) {
    const entries = getAllEntries(locale);
    for (const entry of entries) {
      params.push({
        locale,
        slug: entry.slug,
      });
    }
  }
  
  return params;
}
