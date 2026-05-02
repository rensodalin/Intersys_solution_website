export interface Project {
    title: string;
    desc: string;
    image: string;
    category: string;
    client?: string;
    location?: string;
    scope?: string[];
}

export const categories = [
    "All",
    "Hospitality",
    "Commercial",
    "Residential",
    "Institutional",
    "Office",
    "Industrial",
    "Banking",
    "Healthcare",
    "Logistics"
];
