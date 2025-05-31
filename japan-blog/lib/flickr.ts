// Flickr API utilities for album integration

export interface FlickrPhoto {
  id: string;
  title: string;
  url_m: string;  // Medium size (500px)
  url_l: string;  // Large size (1024px)
  url_o?: string; // Original size
}

export interface FlickrAlbumData {
  id: string;
  title: string;
  description?: string;
  photos: FlickrPhoto[];
}

// Static example data for development
// Replace this with actual Flickr API calls once you have API access
export const getFlickrAlbum = async (albumId: string): Promise<FlickrAlbumData> => {
  // This is a mock implementation
  // In production, you would fetch from Flickr API like:
  // const response = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${API_KEY}&photoset_id=${albumId}&format=json&nojsoncallback=1&extras=url_m,url_l,url_o`);
  
  return {
    id: albumId,
    title: "Sample Album",
    description: "A collection of photos from Japan",
    photos: [
      {
        id: "1",
        title: "Beautiful sunset in Tokyo",
        url_m: "/images/sample-1-medium.jpg",
        url_l: "/images/sample-1-large.jpg",
        url_o: "/images/sample-1-original.jpg"
      },
      {
        id: "2", 
        title: "Street food in Shibuya",
        url_m: "/images/sample-2-medium.jpg",
        url_l: "/images/sample-2-large.jpg"
      },
      {
        id: "3",
        title: "Cherry blossoms in Ueno Park",
        url_m: "/images/sample-3-medium.jpg",
        url_l: "/images/sample-3-large.jpg"
      }
    ]
  };
};

// Helper to validate album data
export const validateAlbumData = (data: unknown): FlickrAlbumData | null => {
  if (!data || typeof data !== 'object' || data === null) {
    return null;
  }
  
  const albumData = data as Record<string, unknown>;
  
  if (typeof albumData.id !== 'string' || !Array.isArray(albumData.photos)) {
    return null;
  }
  
  return {
    id: albumData.id,
    title: typeof albumData.title === 'string' ? albumData.title : 'Untitled Album',
    description: typeof albumData.description === 'string' ? albumData.description : undefined,
    photos: albumData.photos.filter((photo: unknown) => {
      if (!photo || typeof photo !== 'object' || photo === null) {
        return false;
      }
      const photoData = photo as Record<string, unknown>;
      return typeof photoData.id === 'string' && typeof photoData.url_m === 'string';
    }) as FlickrPhoto[]
  };
};