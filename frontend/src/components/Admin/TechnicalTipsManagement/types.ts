import environment from "@/enviroment/enviroment";

export interface TechnicalTip {
  _id: string;
  title: string;
  pdfUrl: string;
  category: string;
  description: string;
  order: number;
}

export interface TechnicalTipFormData {
  title: string;
  pdfUrl: string;
  category: string;
  description: string;
  order: string;
}

export const CATEGORIES = [
  "Building Management",
  "Fire Alarm Systems",
  "Audio Visual (AV)",
  "Access Control",
  "Surveillance System",
  "Integrated Systems",
];

export const BLANK_FORM: TechnicalTipFormData = {
  title: "",
  pdfUrl: "",
  category: "",
  description: "",
  order: "0",
};

export function tipToForm(t: TechnicalTip): TechnicalTipFormData {
  return {
    title: t.title,
    pdfUrl: t.pdfUrl,
    category: t.category,
    description: t.description || "",
    order: String(t.order ?? 0),
  };
}

export function formToPayload(f: TechnicalTipFormData): Record<string, any> {
  return {
    title: f.title,
    pdfUrl: f.pdfUrl,
    category: f.category,
    description: f.description || undefined,
    order: parseInt(f.order) || 0,
  };
}

export const BASE_URL = environment;
