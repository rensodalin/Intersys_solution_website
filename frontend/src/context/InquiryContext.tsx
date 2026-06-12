import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export interface InquiryItem {
  id: string;
  category: string;
  subcategory?: string;
  title: string;
  image: string;
  partCode: string;
  specification: string;
  qty: number;
  brand?: string;
}

interface InquiryContextType {
  items: InquiryItem[];
  addItem: (item: InquiryItem) => void;
  removeItem: (partCode: string) => void;
  updateQty: (partCode: string, qty: number) => void;
  clearInquiry: () => void;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export function InquiryProvider({ children }: { children: ReactNode }) {
  const user = useSelector((state: RootState) => state.auth.user);
  const storageKey = user ? `intersys_inquiry_cart_${user.id}` : "intersys_inquiry_cart_guest";

  const [items, setItems] = useState<InquiryItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) return JSON.parse(saved);
      } catch (err) {
        console.error("Failed to load inquiry cart from localStorage", err);
      }
    }
    return [];
  });

  // Reload cart when user changes (login/logout)
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(storageKey);
        setItems(saved ? JSON.parse(saved) : []);
      } catch (err) {
        console.error("Failed to load inquiry cart from localStorage", err);
        setItems([]);
      }
    }
  }, [storageKey]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, JSON.stringify(items));
    }
  }, [items, storageKey]);

  const addItem = (item: InquiryItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.partCode === item.partCode);
      if (existing) {
        // Replace the item since ProductDetailView sends the absolute total quantity
        return prev.map(i => i.partCode === item.partCode ? item : i);
      }
      return [...prev, item];
    });
  };

  const removeItem = (partCode: string) => {
    setItems(prev => prev.filter(i => i.partCode !== partCode));
  };

  const updateQty = (partCode: string, qty: number) => {
    setItems(prev => prev.map(i => i.partCode === partCode ? { ...i, qty } : i));
  };

  const clearInquiry = () => setItems([]);

  return (
    <InquiryContext.Provider value={{ items, addItem, removeItem, updateQty, clearInquiry }}>
      {children}
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (context === undefined) {
    throw new Error("useInquiry must be used within an InquiryProvider");
  }
  return context;
}
