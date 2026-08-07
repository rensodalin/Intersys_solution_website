import { ChevronDown } from "lucide-react";

interface ProductShowMoreProps {
    total: number;
    visible: number;
    onShowMore: () => void;
}

export function ProductShowMore({ total, visible, onShowMore }: ProductShowMoreProps) {
    if (visible >= total) return null;
    const remaining = total - visible;
    return (
        <div className="mt-12 flex justify-center">
            <button
                type="button"
                onClick={onShowMore}
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium text-white bg-[#1A3263] hover:bg-[#24407a] rounded-full transition-colors duration-300"
            >
                See More ({remaining})
                <ChevronDown size={16} />
            </button>
        </div>
    );
}
