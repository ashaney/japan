export const translations = {
  en: {
    // Navigation
    photos: "Photos",
    videos: "Videos",
    allEntries: "All Entries",
    recentEntries: "Recent Entries",

    // Home page
    journalEntries: "Journal Entries",
    showAll: "Show All",
    showRecent: "Show Recent",
    aboutTitle: "About This Journal",
    currentlyIn: "Currently in the United States",

    // About section
    aboutText1:
      "Hi! Aaron here. I travel between Japan and the United States pretty frequently, so I decided to build something to document my travels.",
    aboutText2:
      "This journal is built with Next.js and MDX, allowing me to easily create entries using Markdown with rich formatting, images, and more. It also has links to photo albums and vlogs.",
    aboutText3:
      "Browse through entries using the timeline on the side (left on desktop, collapsible on mobile), or click on the recent entries to read individual posts.",

    // All posts page
    allPostsTitle: "All Journal Entries",
    allPostsDescription: "Complete list of all journal entries from JST Life",
    searchPlaceholder: "Search entries...",
    filterByTag: "Filter by tag",
    allTags: "All Tags",
    sortBy: "Sort by",
    date: "Date",
    title: "Title",
    noEntriesFound: "No entries found.",

    // Entry page
    readingTime: "min read",
    publishedOn: "Published on",

    // Common
    loading: "Loading...",
    error: "Error",
    notFound: "Not found",
  },
  jp: {
    // Navigation
    photos: "写真",
    videos: "動画",
    allEntries: "全記事",
    recentEntries: "最近の記事",

    // Home page
    journalEntries: "ジャーナル記事",
    showAll: "すべて表示",
    showRecent: "最近の記事を表示",
    aboutTitle: "このジャーナルについて",
    currentlyIn: "現在日本にいます（JST）",

    // About section
    aboutText1:
      "こんにちは！アーロンです。日本とアメリカの間を頻繁に行き来しているので、旅の記録を残すためにこのサイトを作りました。",
    aboutText2:
      "このジャーナルはNext.jsとMDXで構築されており、リッチな書式設定、画像などを含むMarkdownを使用して簡単に記事を作成できます。写真アルバムやブログへのリンクもあります。",
    aboutText3:
      "サイドバーのタイムライン（デスクトップでは左側、モバイルでは折りたたみ可能）を使って記事を閲覧するか、最近の記事をクリックして個別の投稿を読んでください。",

    // All posts page
    allPostsTitle: "全ジャーナル記事",
    allPostsDescription: "JST Lifeのすべてのジャーナル記事の完全リスト",
    searchPlaceholder: "記事を検索...",
    filterByTag: "タグでフィルター",
    allTags: "すべてのタグ",
    sortBy: "並べ替え",
    date: "日付",
    title: "タイトル",
    noEntriesFound: "記事が見つかりません。",

    // Entry page
    readingTime: "分で読める",
    publishedOn: "公開日",

    // Common
    loading: "読み込み中...",
    error: "エラー",
    notFound: "見つかりません",
  },
} as const;

export type Locale = keyof typeof translations;

export function getTranslation(
  locale: Locale,
  key: keyof typeof translations.en,
): string {
  return translations[locale]?.[key] || translations.en[key];
}
