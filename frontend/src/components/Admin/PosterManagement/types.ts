export interface Poster {
  _id: string;
  image: string;
  link: string;
  order: number;
}

export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:1000";
