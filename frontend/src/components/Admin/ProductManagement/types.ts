import type { ApiProduct } from "@/utils/productApi";

export type { ApiProduct };

export interface ProductOption {
  partCode: string;
  specification: string;
  qty: number;
}

export interface ProductDocument {
  name: string;
  url: string;
}

export interface FormState {
  productId: string;
  title: string;
  category: string;
  brand: string;
  brandSubCategory: string;
  brandSubCategoryLink: string;
  description: string;
  longDescription: string;
  mainImage: string;
  thumbnails: string;
  options: ProductOption[];
  documents: ProductDocument[];
}

export const BLANK_FORM: FormState = {
  productId: "", title: "", category: "", brand: "", brandSubCategory: "",
  brandSubCategoryLink: "", description: "", longDescription: "", mainImage: "",
  thumbnails: "", options: [], documents: [],
};
