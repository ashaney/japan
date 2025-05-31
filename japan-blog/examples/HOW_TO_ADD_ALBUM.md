# How to Add a Photo Album to Your Entry

Quick step-by-step guide for adding FlickrAlbum components to your Japan blog entries.

## Step 1: Prepare Your Photos

1. **Resize your photos** to two sizes:
   - Medium: 500px width (for thumbnails and main display)
   - Large: 1024px width (for lightbox viewing)

2. **Save photos** to `public/images/` with descriptive names:
   ```
   public/images/
   ├── tokyo-sunset-500.jpg
   ├── tokyo-sunset-1024.jpg
   ├── ramen-shop-500.jpg
   └── ramen-shop-1024.jpg
   ```

## Step 2: Import FlickrAlbum Component

Add this line to your entry component file (e.g., `components/JournalEntry.tsx`):

```typescript
import FlickrAlbum from './FlickrAlbum';
```

## Step 3: Add the Album to Your Entry

**Option A: Conditionally add to specific entry**
```typescript
{/* Add after the main content */}
{entry.slug === 'your-entry-slug' && (
  <FlickrAlbum 
    albumId="unique-album-id"
    title="Your Album Title"
    photos={[
      {
        id: "photo1",
        title: "Photo description",
        url_m: "/images/photo-500.jpg",
        url_l: "/images/photo-1024.jpg"
      },
      {
        id: "photo2",
        title: "Another photo description", 
        url_m: "/images/photo2-500.jpg",
        url_l: "/images/photo2-1024.jpg"
      }
    ]}
  />
)}
```

**Option B: Create dedicated photo entry component**
Create a new component file for entries that need albums.

## Step 4: Test Your Implementation

1. **Start dev server**: `bun run dev`
2. **Navigate to your entry**: Check that album displays correctly
3. **Test interactions**: 
   - Click thumbnails to change main image
   - Click main image to open lightbox
   - Use arrow buttons to navigate
4. **Build and test**: `bun run build` to ensure no errors

## Step 5: Photo Array Format

Each photo object needs these fields:

```typescript
{
  id: string;           // Unique identifier
  title: string;        // Description for alt text and captions
  url_m: string;        // Medium size image path (required)
  url_l: string;        // Large size image path (required)
  url_o?: string;       // Original size (optional, for lightbox)
}
```

## Example Implementation

```typescript
// In JournalEntry.tsx, after the content div:
{entry.slug === '2025-05-31-week-one' && (
  <FlickrAlbum 
    albumId="week-one-tokyo"
    title="Week One Tokyo Adventures"
    photos={[
      {
        id: "shibuya-crossing",
        title: "Shibuya crossing at sunset", 
        url_m: "/images/shibuya-sunset-500.jpg",
        url_l: "/images/shibuya-sunset-1024.jpg"
      },
      {
        id: "tsukiji-market",
        title: "Fresh tuna at Tsukiji Market",
        url_m: "/images/tsukiji-tuna-500.jpg", 
        url_l: "/images/tsukiji-tuna-1024.jpg"
      },
      {
        id: "golden-gai",
        title: "Tiny ramen shop in Golden Gai",
        url_m: "/images/golden-gai-ramen-500.jpg",
        url_l: "/images/golden-gai-ramen-1024.jpg"
      }
    ]}
  />
)}
```

## Troubleshooting

**Module not found errors?**
- Clean build cache: `rm -rf .next && bun run build`
- Restart dev server
- Check import paths are correct

**Images not loading?**
- Verify images exist in `public/images/`
- Check file names match exactly (case-sensitive)
- Ensure paths start with `/images/`

**Component not rendering?**
- Check entry slug matches exactly
- Verify photo array has required fields
- Look for console errors in browser dev tools

## Best Practices

1. **Consistent naming**: Use descriptive, consistent file names
2. **Optimize images**: Compress photos to balance quality and loading speed
3. **Alt text**: Write meaningful photo titles for accessibility
4. **Test thoroughly**: Always test both development and production builds
5. **Clean up**: Remove unused FlickrAlbum imports if not using in all entries

---

The FlickrAlbum component provides a beautiful, responsive photo gallery that matches your blog's aesthetic perfectly!