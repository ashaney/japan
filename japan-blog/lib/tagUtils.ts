// Tag utility functions for the Japan journal

// Flexoki color theme - same palette used for timeline dots
const tagColors = [
  'tag-red',      // #D14D41 - Red
  'tag-orange',   // #DA702C - Orange
  'tag-yellow',   // #D0A215 - Yellow
  'tag-green',    // #7D9726 - Green
  'tag-cyan',     // #2D9574 - Cyan
  'tag-blue',     // #6C8EC6 - Blue
  'tag-purple',   // #9E7DB4 - Purple
  'tag-magenta'   // #CE5D97 - Magenta
];

// Get consistent color for a tag
export const getTagColor = (tag: string): string => {
  // Create a hash from the tag string
  const hashCode = tag.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  // Get a color from the Flexoki palette based on the hash
  return tagColors[Math.abs(hashCode) % tagColors.length];
};

// Get all unique tags from entries
export const getAllUniqueTags = (entries: any[]): string[] => {
  const tagSet = new Set<string>();
  
  entries.forEach(entry => {
    if (Array.isArray(entry.tags)) {
      entry.tags.forEach((tag: string) => tagSet.add(tag));
    }
  });
  
  return Array.from(tagSet).sort();
};
