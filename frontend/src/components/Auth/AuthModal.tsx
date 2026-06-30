import { useEffect } from "react";
import environment from "@/enviroment/enviroment";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen }: AuthModalProps) {
  useEffect(() => {
    if (isOpen) {
      const baseUrl = environment;
      const currentUrl = window.location.href;
      window.location.href = `${baseUrl}/auth/google?redirect=${encodeURIComponent(currentUrl)}`;
    }
  }, [isOpen]);

  return null;
}
