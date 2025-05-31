# Flickr Album Embedding Guide

Two ways to add Flickr photo albums to your Japan blog entries.

## Option 1: Simple Flickr Embed (Recommended)

The easiest way - just use Flickr's native embed code directly in your MDX files.

### Step 1: Get Embed Code from Flickr

1. Go to your Flickr album
2. Click the "Share" button
3. Select "Embed" 
4. Choose your preferred size
5. Copy the embed code

### Step 2: Add to Your MDX Entry

Just paste the embed code directly into your `.mdx` file:

```mdx
---
title: "Week One Summary"
date: "2025-05-31"
preview: "Daily life to resume shortly..."
tags:
  - "Summary" 
  - "Daily Life"
  - "Photography"
---

# Week One Summary

Daily life to resume shortly, but here's a photo gallery from this week's adventures:

<a data-flickr-embed="true" href="https://www.flickr.com/photos/aar0space/albums/72177720326532074" title="Japan 2025: Week 1">
  <img src="https://live.staticflickr.com/65535/54557249919_499cf71115_z.jpg" width="800" height="600" alt="Japan 2025: Week 1"/>
</a>
<script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script>

More detailed entries coming soon!
```

### Pros of Flickr Embed:
✅ **Zero setup** - works immediately  
✅ **Auto-updating** - new photos in album appear automatically  
✅ **Flickr features** - comments, favorites, full resolution viewing  
✅ **No file management** - images hosted on Flickr  
✅ **Responsive** - Flickr handles mobile optimization  

### Cons of Flickr Embed:
⚠️ **External dependency** - requires Flickr to stay online  
⚠️ **Less control** - styling limited to Flickr's options  
⚠️ **JavaScript required** - won't work if JS disabled  

---

## Option 2: Custom FlickrAlbum Component

For more control over styling and functionality, use the custom component.

### When to Use Custom Component:
- Want complete control over design
- Need custom interactions/animations  
- Want to match your blog's exact aesthetic
- Prefer hosting images locally

### Implementation:
See `HOW_TO_ADD_ALBUM.md` for detailed custom component instructions.

### Pros of Custom Component:
✅ **Full control** - complete styling freedom
✅ **Consistent design** - matches blog perfectly
✅ **Custom features** - lightbox, thumbnails, animations
✅ **No external dependencies** - works offline

### Cons of Custom Component:
⚠️ **More setup** - requires component development
⚠️ **Manual updates** - need to add new photos manually
⚠️ **File management** - need to download/resize images
⚠️ **Bundle size** - adds to JavaScript bundle

---

## Recommendation

**For most use cases: Use Flickr's native embed code**

It's simpler, automatically stays updated with your Flickr albums, and provides all the functionality most users need. You can always switch to the custom component later if you need more control.

## Example Workflow with Flickr Embed

1. **Take photos** during your Japan adventures
2. **Upload to Flickr** and organize into albums  
3. **Write your blog entry** in Bear or your preferred editor
4. **Get embed code** from Flickr album
5. **Paste into MDX** when you export to your blog
6. **Build and deploy** - photos appear automatically!

This approach lets you focus on writing about your experiences rather than managing photo galleries.