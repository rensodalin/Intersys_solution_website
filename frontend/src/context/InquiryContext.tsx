import React, { createContext, useContext, useState, ReactNode } from "react";

export interface InquiryItem {
  id: string;
  category: string;
  title: string;
  image: string;
  partCode: string;
  specification: string;
  price: number;
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
  const [items, setItems] = useState<InquiryItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("intersys_inquiry_cart");
        if (saved) return JSON.parse(saved);
      } catch (err) {
        console.error("Failed to load inquiry cart from localStorage", err);
      }
    }
    return [];
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("intersys_inquiry_cart", JSON.stringify(items));
    }
  }, [items]);

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
