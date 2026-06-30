export type TabType = "dashboard" | "quotes" | "downloads" | "account-details";

export interface QuoteItem {
  _id: string;
  solutionCategories: string[];
  products: Array<{ qty: string; productNo: string; description: string; application: string }>;
  name: string;
  company: string;
  title: string;
  phone: string;
  email: string;
  address: string;
  createdAt: string;
}

export interface DetailsForm {
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  country: string;
  role: string;
  newsletter: boolean;
  receiveUpdates: boolean;
  currentPassword: string;
  password: string;
  confirmPassword: string;
}
