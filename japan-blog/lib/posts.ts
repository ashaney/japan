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
    const slug = fileName.replace(/\.mdx$/, '')
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

export function getAllEntries(): JournalEntry[] {
  // Handle case where directory doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    console.warn(`Directory ${postsDirectory} does not exist`)
    return []
  }

  try {
    // Get all MDX files
    const fileNames = fs.readdirSync(postsDirectory)
    
    // Process each file with error handling
    const entries = fileNames
      .filter(fileName => fileName.endsWith('.mdx'))
      .map(safelyParseMdx)
      .filter((entry): entry is JournalEntry => entry !== null) // Filter out null entries
    
    // Sort by date (newest first)
    return entries.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1))
  } catch (e) {
    console.error('Error getting all entries:', e)
    return []
  }
}

export function getEntryBySlug(slug: string): JournalEntry | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    // Use the same safe parsing function
    return safelyParseMdx(`${slug}.mdx`)
  } catch (e) {
    console.error(`Error getting entry ${slug}:`, e)
    return null
  }
}
