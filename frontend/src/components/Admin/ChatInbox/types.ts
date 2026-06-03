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
  source: "contact" | "quote" | "reply";
  sourceId: string | null;
  isFromAdmin: boolean;
  read: boolean;
  createdAt: string;
}
