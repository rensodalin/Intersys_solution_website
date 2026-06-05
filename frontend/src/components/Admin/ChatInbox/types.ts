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
}

export interface ProductRow {
  qty: string;
  productNo: string;
  description: string;
  application: string;
  price: number;
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
