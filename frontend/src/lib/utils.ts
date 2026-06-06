import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toSlug(text: string) {
  return text.toLowerCase().replace(/['']/g, "").replace(/[&]+/g, "-").replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}
