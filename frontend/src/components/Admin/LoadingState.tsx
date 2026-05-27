import { Loader2 } from "lucide-react";

export function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#081F3D]">
      <div className="flex flex-col items-center gap-4 text-white">
        <Loader2 className="w-10 h-10 animate-spin text-red-500" />
        <span className="text-sm font-medium tracking-wide">Verifying credentials...</span>
      </div>
    </div>
  );
}
