import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'content/entries')

export interface JournalEntry {
  slug: string
  title: string
  date: string
  preview: string
  tags: string[]
  content: string
  readingTime: string
}

// Helper function to safely parse MDX files
function safelyParseMdx(fileName: string): JournalEntry | null {
  try {
    // Extract base slug from filename (remove locale and .mdx)
    const slug = fileName.replace(/\.(en|jp)\.mdx$/, '').replace(/\.mdx$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    
    // Check if file exists and is readable
    if (!fs.existsSync(fullPath)) {
      console.warn(`File ${fullPath} does not exist`)
      return null
    }
    
    // Read file content
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    
    // Parse frontmatter with error handling
    let data: Record<string, unknown> = {}
    let content = ''
    
    try {
      const result = matter(fileContents)
      data = result.data
      content = result.content
    } catch (e) {
      console.error(`Error parsing frontmatter in ${fileName}:`, e)
      // Set default values for required fields
      data = {
        title: `Error in ${fileName}`,
        date: new Date().toISOString().split('T')[0],
        preview: 'There was an error parsing this entry.',
        tags: ['Error']
      }
      content = 'This entry has formatting issues. Please check the YAML frontmatter.'
    }
    
    // Return formatted entry
    return {
      slug,
      title: (data.title as string) || `Untitled (${slug})`,
      date: (data.date as string) || new Date().toISOString().split('T')[0],
      preview: (data.preview as string) || '',
      tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
      content,
      readingTime: readingTime(content).text,
    }
  } catch (e) {
    console.error(`Unexpected error processing ${fileName}:`, e)
    return null
  }
}

export function getAllEntries(locale: string = 'en'): JournalEntry[] {
  // Handle case where directory doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    console.warn(`Directory ${postsDirectory} does not exist`)
    return []
  }

  try {
    // Get all MDX files
    const fileNames = fs.readdirSync(postsDirectory)
    
    // Get all base entry names (without locale suffixes)
    const baseNames = new Set()
    const localeFiles = new Set()
    
    // First pass: identify all files
    fileNames.forEach(fileName => {
      if (fileName.endsWith('.mdx')) {
        const baseName = fileName.replace(/\.(en|jp)\.mdx$/, '').replace(/\.mdx$/, '')
        baseNames.add(baseName)
        
        if (fileName.includes(`.${locale}.mdx`)) {
          localeFiles.add(baseName)
        }
      }
    })
    
    // Second pass: filter files based on preference
    const filteredFiles = fileNames.filter(fileName => {
      if (!fileName.endsWith('.mdx')) return false
      
      const baseName = fileName.replace(/\.(en|jp)\.mdx$/, '').replace(/\.mdx$/, '')
      
      // If we have a locale-specific version, only include that
      if (localeFiles.has(baseName)) {
        return fileName === `${baseName}.${locale}.mdx`
      }
      
      // Otherwise, include the base .mdx file
      return fileName === `${baseName}.mdx`
    })
    
    // Process each file with error handling
    const entries = filteredFiles
      .map(fileName => safelyParseMdx(fileName))
      .filter((entry): entry is JournalEntry => entry !== null) // Filter out null entries
    
    // Sort by date (newest first)
    return entries.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
  } catch (e) {
    console.error('Error getting all entries:', e)
    return []
  }
}

export function getEntryBySlug(slug: string, locale: string = 'en'): JournalEntry | null {
  try {
    // Try locale-specific file first
    const localeFileName = `${slug}.${locale}.mdx`
    const localePath = path.join(postsDirectory, localeFileName)
    
    if (fs.existsSync(localePath)) {
      return safelyParseMdx(localeFileName)
    }
    
    // Fallback to base .mdx file
    const baseFileName = `${slug}.mdx`
    const basePath = path.join(postsDirectory, baseFileName)
    
    if (fs.existsSync(basePath)) {
      return safelyParseMdx(baseFileName)
    }
    
    return null
  } catch (e) {
    console.error(`Error getting entry ${slug}:`, e)
    return null
  }
}

export function getAvailableLocales(slug: string): string[] {
  try {
    const availableLocales: string[] = []
    
    // Check for base .mdx file
    const basePath = path.join(postsDirectory, `${slug}.mdx`)
    if (fs.existsSync(basePath)) {
      availableLocales.push('en') // Base files default to English
    }
    
    // Check for locale-specific files
    const locales = ['en', 'jp']
    locales.forEach(locale => {
      const localePath = path.join(postsDirectory, `${slug}.${locale}.mdx`)
      if (fs.existsSync(localePath) && !availableLocales.includes(locale)) {
        availableLocales.push(locale)
      }
    })
    
    return availableLocales
  } catch (e) {
    console.error(`Error getting available locales for ${slug}:`, e)
    return ['en'] // Default fallback
  }
}
