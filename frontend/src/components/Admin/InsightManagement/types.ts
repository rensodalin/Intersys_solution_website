export interface Insight {
  _id: string;
  title: string;
  slug: string;
  desc: string;
  category: string;
  date: string;
  image: string[];
  author: string;
  client?: string;
  location?: string;
  scope?: string[];
  section1Image?: string;
  section1Title?: string;
  section1Desc?: string;
  section1SubTitle?: string;
  section1SubDesc?: string;
  section1SubImage?: string;
  articleTitle1?: string;
  articleContent1?: string;
  articleBannerImage?: string;
  pdfUrl?: string;
  articleTitle2?: string;
  articleContent2?: string;
  galleryImages?: string[];
  technicalTitle?: string;
}

export interface InsightFormData {
  title: string;
  slug: string;
  desc: string;
  category: string;
  date: string;
  image: string;
  author: string;
  client: string;
  location: string;
  scope: string;
  section1Image: string;
  section1Title: string;
  section1Desc: string;
  section1SubTitle: string;
  section1SubDesc: string;
  section1SubImage: string;
  articleTitle1: string;
  articleContent1: string;
  articleBannerImage: string;
  pdfUrl: string;
  articleTitle2: string;
  articleContent2: string;
  galleryImages: string;
  technicalTitle: string;
}

export const BLANK_FORM: InsightFormData = {
  title: "", slug: "", desc: "", category: "", date: "", image: "", author: "Intersys Team",
  client: "", location: "", scope: "",
  section1Image: "", section1Title: "", section1Desc: "", section1SubTitle: "", section1SubDesc: "", section1SubImage: "",
  articleTitle1: "", articleContent1: "", articleBannerImage: "", pdfUrl: "", articleTitle2: "", articleContent2: "",
  galleryImages: "", technicalTitle: "",
};

export function insightToForm(i: Insight): InsightFormData {
  return {
    title: i.title, slug: i.slug, desc: i.desc, category: i.category, date: i.date,
    image: (i.image || []).join(", "), author: i.author || "Intersys Team",
    client: i.client || "", location: i.location || "", scope: (i.scope || []).join(", "),
    section1Image: i.section1Image || "", section1Title: i.section1Title || "", section1Desc: i.section1Desc || "",
    section1SubTitle: i.section1SubTitle || "", section1SubDesc: i.section1SubDesc || "", section1SubImage: i.section1SubImage || "",
    articleTitle1: i.articleTitle1 || "", articleContent1: i.articleContent1 || "", articleBannerImage: i.articleBannerImage || "",
    pdfUrl: i.pdfUrl || "", articleTitle2: i.articleTitle2 || "", articleContent2: i.articleContent2 || "",
    galleryImages: (i.galleryImages || []).join(", "), technicalTitle: i.technicalTitle || "",
  };
}

export function formToPayload(f: InsightFormData): Record<string, any> {
  return {
    title: f.title, slug: f.slug, desc: f.desc, category: f.category, date: f.date,
    image: f.image.split(",").map(s => s.trim()).filter(Boolean), author: f.author,
    client: f.client || undefined, location: f.location || undefined,
    scope: f.scope.split(",").map(s => s.trim()).filter(Boolean),
    section1Image: f.section1Image || undefined, section1Title: f.section1Title || undefined,
    section1Desc: f.section1Desc || undefined, section1SubTitle: f.section1SubTitle || undefined,
    section1SubDesc: f.section1SubDesc || undefined, section1SubImage: f.section1SubImage || undefined,
    articleTitle1: f.articleTitle1 || undefined, articleContent1: f.articleContent1 || undefined,
    articleBannerImage: f.articleBannerImage || undefined, pdfUrl: f.pdfUrl || undefined,
    articleTitle2: f.articleTitle2 || undefined, articleContent2: f.articleContent2 || undefined,
    galleryImages: f.galleryImages.split(",").map(s => s.trim()).filter(Boolean),
    technicalTitle: f.technicalTitle || undefined,
  };
}

export function toSlug(title: string) {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

import environment from "@/enviroment/enviroment";

export const BASE_URL = environment;
