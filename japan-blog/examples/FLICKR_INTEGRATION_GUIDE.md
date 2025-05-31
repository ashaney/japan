# Flickr Album Integration Guide

This guide shows you how to embed Flickr photo albums in your Japan blog entries with a beautiful carousel interface.

## Quick Start

1. **In your MDX file**, import the FlickrAlbum component:
```mdx
import FlickrAlbum from '../components/FlickrAlbum';
```

2. **Add the component** where you want the album to appear:
```mdx
<FlickrAlbum 
  albumId="your-flickr-album-id"
  title="Your Album Title"
  photos={photoArray}
/>
```

## Getting Your Flickr Data

### Method 1: Manual Photo Array (Recommended for now)
Create a photo array with your image URLs:

```mdx
<FlickrAlbum 
  albumId="72157721234567890"
  title="Week One in Tokyo"
  photos={[
    {
      id: "unique-id-1",
      title: "Photo description",
      url_m: "/images/photo-medium.jpg",    // 500px width
      url_l: "/images/photo-large.jpg",     // 1024px width  
      url_o: "/images/photo-original.jpg"   // Original size (optional)
    },
    // ... more photos
  ]}
/>
```

### Method 2: Flickr API Integration (Future Enhancement)
To use the actual Flickr API, you'll need:

1. **Flickr API Key**: Get one at https://www.flickr.com/services/api/misc.api_keys.html
2. **Album ID**: From your Flickr album URL
3. **Update the flickr.ts utility** to make real API calls

Example API integration:
```typescript
// In lib/flickr.ts
export const getFlickrAlbum = async (albumId: string): Promise<FlickrAlbumData> => {
  const apiKey = process.env.FLICKR_API_KEY;
  const response = await fetch(
    `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${apiKey}&photoset_id=${albumId}&format=json&nojsoncallback=1&extras=url_m,url_l,url_o`
  );
  const data = await response.json();
  return data.photoset;
};
```

## Image Preparation

### For Local Images (Current Method)
1. **Resize your photos** to these sizes:
   - Medium: 500px width (`url_m`)
   - Large: 1024px width (`url_l`) 
   - Original: Keep full resolution (`url_o`, optional)

2. **Place images** in the `public/images/` directory

3. **Use relative paths** starting with `/images/`

### Image Optimization Tips
- Use JPEG for photos (smaller file size)
- Compress images to balance quality and loading speed
- Consider using Next.js Image component for automatic optimization

## Album Features

The FlickrAlbum component includes:

✨ **Carousel Navigation**: Click arrows or thumbnails to browse photos
🔍 **Lightbox View**: Click main image for full-screen viewing  
📱 **Responsive Design**: Works perfectly on mobile and desktop
🎨 **Consistent Styling**: Matches your blog's stone/amber theme
🖼️ **Thumbnail Strip**: Quick navigation between photos
📊 **Photo Counter**: Shows current position (e.g., "3 / 12")
🔗 **External Link**: Links to your Flickr album page

## Usage Examples

### Simple Album
```mdx
<FlickrAlbum 
  albumId="72157721234567890"
  title="Tokyo Street Photography"
  photos={myPhotos}
/>
```

### Album with Custom Styling
```mdx
<FlickrAlbum 
  albumId="72157721234567890"
  title="Cherry Blossom Season"
  photos={sakuraPhotos}
  className="my-8 lg:my-12"
/>
```

## Workflow for Adding Albums

1. **Take/collect photos** from your adventures
2. **Upload to Flickr** and organize into albums
3. **Download/resize images** for your blog
4. **Create photo array** with proper URLs and descriptions
5. **Add FlickrAlbum component** to your MDX entry
6. **Preview locally** with `npm run dev`
7. **Build and deploy** your updated blog

## Styling Customization

The component uses your existing design system:
- Stone/amber color scheme from your Flexoki theme
- Card layout matching other blog components  
- Motion animations for smooth interactions
- Responsive breakpoints for all screen sizes

To customize further, edit the FlickrAlbum component in `components/FlickrAlbum.tsx`.

## Troubleshooting

**Images not loading?**
- Check file paths are correct (should start with `/images/`)
- Verify images exist in `public/images/` directory
- Ensure image filenames match exactly (case-sensitive)

**Component not rendering?** 
- Verify import path is correct in your MDX file
- Check that photos array has required fields (`id`, `title`, `url_m`)
- Look for console errors in browser dev tools

**Styling issues?**
- Ensure you're using the latest version of your global CSS
- Check that Tailwind classes are being applied correctly

---

This integration gives you a professional, aesthetic way to showcase your Japan photography within your blog entries. The carousel interface encourages readers to explore your visual stories while maintaining the clean design of your journal.