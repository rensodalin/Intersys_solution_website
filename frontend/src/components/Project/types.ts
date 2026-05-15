export interface Project {
    _id?: string;
    title: string;
    desc: string;
    image: string;
    category: string;
    client?: string;
    location?: string;
    scope?: string[];
    slug?: string;
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
