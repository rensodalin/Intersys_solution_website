export interface Poster {
  _id: string;
  image: string;
  link: string;
  title: string;
  description: string;
  facebookLink: string;
  linkedinLink: string;
  order: number;
}

export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:1000";
