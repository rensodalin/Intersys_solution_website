import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
    Building2,
    Flame,
    Monitor,
    Key,
    Video,
    Layers,
    ArrowRight,
    Download,
    FileText,
    ExternalLink,
    Search,
    Eye,
    EyeOff,
    X,
    CheckCircle2,
    BookOpen,
    ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/Common/Container";
import { cn } from "@/lib/utils";
import environment from "@/enviroment/enviroment";
import fireAlarmImg from "@/assets/fire_alarm.png";
import fireSafetyImg from "@/assets/fire_safety.png";

export interface Tip {
    _id: string;
    title: string;
    pdfUrl: string;
    category: string;
    description: string;
    order: number;
    createdAt?: string;
}

export const SYSTEM_CATEGORIES: Record<string, {
    name: string;
    slug: string;
    icon: any;
    color: string;
    bg: string;
    lightBg: string;
    border: string;
    description: string;
}> = {
    "building-management": {
        name: "Building Management",
        slug: "building-management",
        icon: Building2,
        color: "#0E7490",
        bg: "bg-cyan-600",
        lightBg: "bg-cyan-50",
        border: "border-cyan-200",
        description: "Centralized controls, HVAC optimization, energy monitoring, and automated facility operations guides."
    },
    "fire-alarm-systems": {
        name: "Fire Alarm Systems",
        slug: "fire-alarm-systems",
        icon: Flame,
        color: "#D62828",
        bg: "bg-red-600",
        lightBg: "bg-red-50",
        border: "border-red-200",
        description: "Early smoke detection, alarm matrix setups, emergency evacuation, and life safety protocols."
    },
    "audio-visual": {
        name: "Audio Visual (AV)",
        slug: "audio-visual",
        icon: Monitor,
        color: "#6B21A8",
        bg: "bg-purple-600",
        lightBg: "bg-purple-50",
        border: "border-purple-200",
        description: "Conference room integration, video walls, digital signage, dynamic sound systems, and AV over IP."
    },
    "access-control": {
        name: "Access Control",
        slug: "access-control",
        icon: Key,
        color: "#059669",
        bg: "bg-emerald-600",
        lightBg: "bg-emerald-50",
        border: "border-emerald-200",
        description: "Biometrics, smart card readers, mobile credentials, door locks, and perimeter access control matrices."
    },
    "surveillance-system": {
        name: "Surveillance System",
        slug: "surveillance-system",
        icon: Video,
        color: "#B45309",
        bg: "bg-amber-600",
        lightBg: "bg-amber-50",
        border: "border-amber-200",
        description: "IP camera topologies, VMS software configuration, AI video analytics, and storage architecture."
    },
    "integrated-systems": {
        name: "Integrated Systems",
        slug: "integrated-systems",
        icon: Layers,
        color: "#1E40AF",
        bg: "bg-blue-600",
        lightBg: "bg-blue-50",
        border: "border-blue-200",
        description: "Cross-platform API integration, unified security management dashboards, and SCADA automation."
    }
};

const SYSTEM_IMAGES: Record<string, string> = {
    "access-control": "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop",
    "building-management": "https://images.unsplash.com/photo-1581094017399-34c4fb48c65b?q=80&w=800&auto=format&fit=crop",
    "fire-alarm-systems": fireAlarmImg,
    "audio-visual": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
    "surveillance-system": "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800&auto=format&fit=crop",
    "integrated-systems": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
};

const CATEGORY_TIP_IMAGES: Record<string, string[]> = {
    "fire-alarm-systems": [
        fireAlarmImg,
        fireSafetyImg,
        "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=800&auto=format&fit=crop",
    ],
    "access-control": [
        "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1581094017399-34c4fb48c65b?q=80&w=800&auto=format&fit=crop",
    ],
    "building-management": [
        "https://images.unsplash.com/photo-1581094017399-34c4fb48c65b?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    ],
    "audio-visual": [
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1581094017399-34c4fb48c65b?q=80&w=800&auto=format&fit=crop",
    ],
    "surveillance-system": [
        "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=800&auto=format&fit=crop",
    ],
    "integrated-systems": [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1581094017399-34c4fb48c65b?q=80&w=800&auto=format&fit=crop",
    ],
};

export function getCategorySlug(categoryName: string): string {
    const found = Object.values(SYSTEM_CATEGORIES).find(
        cat => cat.name.toLowerCase() === categoryName.toLowerCase()
    );
    if (found) return found.slug;
    return categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

interface SystemTipsPageProps {
    currentSlug: string;
    allTips: Tip[];
    loading: boolean;
}

export function SystemTipsPage({ currentSlug, allTips, loading }: SystemTipsPageProps) {
    const user = useSelector((state: RootState) => state.auth.user);
    const baseUrl = environment;

    const [searchQuery, setSearchQuery] = useState("");
    const [previewTip, setPreviewTip] = useState<Tip | null>(null);

    const currentSystem = SYSTEM_CATEGORIES[currentSlug] || {
        name: currentSlug.replace(/-/g, " ").toUpperCase(),
        slug: currentSlug,
        icon: FileText,
        color: "#C3110C",
        bg: "bg-red-600",
        lightBg: "bg-red-50",
        border: "border-red-200",
        description: "Technical specifications, setup guides, and PDF documentation."
    };

    const systemTips = useMemo(() => {
        return allTips.filter(tip => {
            const tipSlug = getCategorySlug(tip.category);
            return tipSlug === currentSlug || tip.category.toLowerCase() === currentSystem.name.toLowerCase();
        });
    }, [allTips, currentSlug, currentSystem.name]);

    const filteredTips = useMemo(() => {
        if (!searchQuery.trim()) return systemTips;
        const q = searchQuery.toLowerCase();
        return systemTips.filter(tip =>
            tip.title.toLowerCase().includes(q) ||
            tip.description.toLowerCase().includes(q)
        );
    }, [systemTips, searchQuery]);

    const trackDownload = async (title: string, url: string) => {
        if (user && url && url !== "#") {
            try {
                await fetch(`${baseUrl}/auth/user/download`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title, url }),
                    credentials: "include"
                });
            } catch (err) {
                console.error("Failed to track download:", err);
            }
        }
    };

    return (
        <div className="min-h-screen bg-white pb-24">
            {/* ── HEADER SECTION (Matching screenshot layout) ── */}
            <div className="bg-[#F4F5F7] border-b border-gray-200/80 pt-32 md:pt-40 pb-12 md:py-16">
                <Container>
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
                        <Link to="/technical-tips" className="hover:text-[#C3110C] transition-colors">
                            Technical Tips
                        </Link>
                        <span>/</span>
                        <span className="text-gray-900 font-semibold">{currentSystem.name}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Left Title */}
                        <div className="lg:col-span-5">
                            <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900 tracking-tight">
                                {currentSystem.name} Tips
                            </h1>
                        </div>

                        {/* Right Description */}
                        <div className="lg:col-span-7">
                            <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-normal">
                                Do you have questions about how to make your next install as smooth as possible? Click on any of the links below to see recent tips from our technical experts, designed to help you navigate some of the challenges of product installation and maintenance.
                            </p>
                        </div>
                    </div>
                </Container>
            </div>

            {/* ── MAIN CARDS SECTION ── */}
            <div className="bg-white py-12 md:py-16">
                <Container>
                    {/* System Categories Navigation Pills Bar */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-gray-100 no-scrollbar">
                        {Object.values(SYSTEM_CATEGORIES).map((sys) => {
                            const isActive = sys.slug === currentSlug;
                            const count = allTips.filter(t => getCategorySlug(t.category) === sys.slug).length;

                            return (
                                <Link
                                    key={sys.slug}
                                    to="/technical-tips/system/$systemSlug"
                                    params={{ systemSlug: sys.slug }}
                                    className={cn(
                                        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200",
                                        isActive
                                            ? "bg-[#0F2444] text-white shadow-md"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    )}
                                >
                                    <span>{sys.name}</span>
                                    {count > 0 && (
                                        <span className={cn(
                                            "text-[10px] px-1.5 py-0.2 rounded-full font-bold",
                                            isActive ? "bg-white/20 text-white" : "bg-gray-200 text-gray-700"
                                        )}>
                                            {count}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* 3 COLUMNS IMAGE CARDS GRID (Exact match to requested UI image) */}
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="w-10 h-10 border-4 border-[#C3110C] border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : filteredTips.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {filteredTips.map((tip, index) => {
                                const categoryPool = CATEGORY_TIP_IMAGES[currentSlug] || [SYSTEM_IMAGES[currentSlug]];
                                const cardImgSrc = categoryPool[index % categoryPool.length] || SYSTEM_IMAGES[currentSlug];

                                return (
                                    <div
                                        key={tip._id}
                                        className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-900 border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between p-6"
                                    >
                                        {/* Background Image - Fits Card Completely */}
                                        <img
                                            src={cardImgSrc}
                                            alt={tip.title}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                                        />

                                        {/* Dark Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/70 z-[1]" />

                                        {/* Card Title (Top Left) */}
                                        <div className="relative z-10">
                                            <h3 className="text-lg md:text-xl font-bold text-white leading-snug drop-shadow-sm group-hover:text-gray-100 transition-colors">
                                                {tip.title}
                                            </h3>
                                            {tip.description && (
                                                <p className="text-xs text-gray-300 mt-2 line-clamp-2 leading-relaxed opacity-90">
                                                    {tip.description}
                                                </p>
                                            )}
                                        </div>

                                        {/* Card Action Button (Bottom Left) */}
                                        <div className="relative z-10 pt-4">
                                            {tip.pdfUrl && tip.pdfUrl !== "#" ? (
                                                <a
                                                    href={tip.pdfUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={() => trackDownload(tip.title, tip.pdfUrl)}
                                                    className="inline-flex items-center gap-2 bg-[#C3110C] text-white px-5 py-2.5 rounded-sm text-xs font-bold shadow-md hover:bg-[#1A3263] transition-colors duration-300 cursor-pointer"
                                                >
                                                    <span>View Tips</span>
                                                    <ArrowRight size={14} />
                                                </a>
                                            ) : (
                                                <button
                                                    onClick={() => setPreviewTip(previewTip?._id === tip._id ? null : tip)}
                                                    className="inline-flex items-center gap-2 bg-[#C3110C] text-white px-5 py-2.5 rounded-sm text-xs font-bold shadow-md hover:bg-[#1A3263] transition-colors duration-300 cursor-pointer"
                                                >
                                                    <span>View Tips</span>
                                                    <ArrowRight size={14} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="max-w-md mx-auto bg-gray-50 rounded-2xl p-10 text-center border border-gray-200">
                            <FileText size={40} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-base font-bold text-gray-900 mb-2">No Tips Found</h3>
                            <p className="text-xs text-gray-500 leading-relaxed mb-6">
                                {searchQuery
                                    ? `No tips matching "${searchQuery}" in ${currentSystem.name}.`
                                    : `Technical documentation for ${currentSystem.name} will be added soon.`}
                            </p>
                            <Link
                                to="/technical-tips"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F2444] text-white text-xs font-bold rounded-lg shadow-sm hover:bg-[#C3110C] transition-colors"
                            >
                                <span>Browse All Categories</span>
                            </Link>
                        </div>
                    )}
                </Container>
            </div>

            {/* ── INLINE PREVIEW MODAL IF CLICKED ── */}
            {previewTip && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
                        <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-slate-900 text-white">
                            <h3 className="text-sm font-bold truncate pr-4">{previewTip.title}</h3>
                            <button
                                onClick={() => setPreviewTip(null)}
                                className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto space-y-4">
                            <p className="text-sm text-gray-700 leading-relaxed">{previewTip.description}</p>
                            {previewTip.pdfUrl && previewTip.pdfUrl !== "#" && (
                                <iframe
                                    src={previewTip.pdfUrl}
                                    title={previewTip.title}
                                    className="w-full h-[550px] rounded-xl border border-gray-200"
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
