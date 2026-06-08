export interface Conversation {
  _id: string;
  email: string;
  name: string;
  phone?: string;
  hasPhone?: boolean;
  prefers?: string;
  lastMessage: string;
  lastDate: string;
  lastSource: string;
  count: number;
  unreadCount: number;
  hasContact?: boolean;
  hasQuote?: boolean;
  city?: string;
  country?: string;
}

export interface ProductRow {
  qty: string;
  productNo: string;
  description: string;
  application: string;
  price: number;
}

export interface ContactItem {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  contactMethod?: string;
  city?: string;
  country?: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface QuoteItem {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  title: string;
  contactpreference?: string;
  address?: string;
  city?: string;
  country?: string;
  bmsSystem?: string;
  otherBms?: string;
  products?: ProductRow[];
  solutionCategories?: string[];
  sections?: string[];
  status: string;
  createdAt: string;
}

export interface ChatMessage {
  _id: string;
  email: string;
  name: string;
  subject: string;
  content: string;
  phone?: string;
  contactMethod?: string;
  city?: string;
  country?: string;
  company?: string;
  address?: string;
  bmsSystem?: string;
  otherBms?: string;
  products?: ProductRow[];
  solutionCategories?: string[];
  source: "contact" | "quote" | "reply" | "client-reply" | "chat";
  sourceId: string | null;
  isFromAdmin: boolean;
  read: boolean;
  createdAt: string;
}
