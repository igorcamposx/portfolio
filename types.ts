
export type Category = 'video' | 'design' | 'web';

export interface GalleryItem {
  type: 'image' | 'video';
  url: string;
}

export interface Project {
  id: string;
  title: string;
  category: Category;
  thumbnail: string;
  description: string;
  client?: string;
  date?: string;
  videoUrl?: string; // Optional for video projects
  gallery?: GalleryItem[]; // New field for multiple media
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
