// Define supported locales
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'jp' },
  ];
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Just return children - no HTML structure needed in nested layout
  return <>{children}</>;
}