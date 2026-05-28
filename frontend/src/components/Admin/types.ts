export interface ProductRow {
  qty: string;
  productNo: string;
  description: string;
  application: string;
  price?: number;
}

export interface QuoteUser {
  _id: string;
  name?: string;
  avatar?: string;
  email?: string;
}

export interface QuoteRequest {
  _id: string;
  solutionCategories: string[];
  sections?: string[];
  products: ProductRow[];
  name: string;
  company: string;
  title: string;
  phone: string;
  email: string;
  address: string;
  city?: string;
  country?: string;
  contactMethod?: string;
  companyType: string;
  bmsSystem: string;
  otherBms?: string;
  status: "Pending" | "In Progress" | "Completed";
  createdAt: string;
  userId?: QuoteUser | string | null;
}
