import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { AuthModal } from "@/components/Auth/AuthModal";

interface AccessDeniedProps {
  isAuthOpen: boolean;
  onAuthOpen: () => void;
  onAuthClose: () => void;
}

export function AccessDenied({ isAuthOpen, onAuthOpen, onAuthClose }: AccessDeniedProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#081F3D]/5 pt-20 px-6">
      <div className="max-w-md bg-white p-10 rounded-sm shadow-2xl border border-gray-100 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock size={30} />
        </div>
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-3">Admin Portal</h1>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          This section is restricted to administrators. Please sign in with an administrator
          account to view the quote request dashboard.
        </p>
        <div className="space-y-4">
          <button
            onClick={onAuthOpen}
            className="w-full bg-[#C3110C] text-white py-3 rounded-sm font-bold text-sm hover:bg-red-700 transition shadow-lg shadow-red-600/10 cursor-pointer"
          >
            Sign In as Administrator
          </button>
          <Link
            to="/"
            className="block w-full text-center text-xs text-gray-500 hover:text-black font-semibold transition"
          >
            Back to Homepage
          </Link>
        </div>
        <AuthModal isOpen={isAuthOpen} onClose={onAuthClose} />
      </div>
    </div>
  );
}
