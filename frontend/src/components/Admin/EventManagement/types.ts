export interface EventItem {
  _id: string;
  title: string;
  tagline?: string;
  description?: string;
  category?: string;
  date?: string;
  time?: string;
  location?: string;
  image?: string;
  registrationUrl?: string;
  highlights?: string[];
  galleryImages?: string[];
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export const BASE_URL = import.meta.env.VITE_BACKEND_URL || "";
