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
    ArrowLeft,
    Download,
    FileText,
    ExternalLink,
    Search,
    Eye,
    EyeOff,
    CheckCircle2,
    BookOpen,
    Sparkles,
    ShieldCheck,
    ChevronRight,
    Filter
} from "lucide-react";
import { Container } from "@/components/Common/Container";
import environment from "@/enviroment/enviroment";

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

// Helper to convert category name to slug
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
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);
    const baseUrl = environment;

    const [searchQuery, setSearchQuery] = useState("");
    const [previewTipId, setPreviewTipId] = useState<string | null>(null);
    const [trackingMap, setTrackingMap] = useState<Record<string, boolean>>({});

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

    const SystemIcon = currentSystem.icon;

    // Filter tips for current system
    const systemTips = useMemo(() => {
        return allTips.filter(tip => {
            const tipSlug = getCategorySlug(tip.category);
            return tipSlug === currentSlug || tip.category.toLowerCase() === currentSystem.name.toLowerCase();
        });
    }, [allTips, currentSlug, currentSystem.name]);

    // Search filter within current system
    const filteredTips = useMemo(() => {
        if (!searchQuery.trim()) return systemTips;
        const q = searchQuery.toLowerCase();
        return systemTips.filter(tip =>
            tip.title.toLowerCase().includes(q) ||
            tip.description.toLowerCase().includes(q)
        );
    }, [systemTips, searchQuery]);

    const trackDownload = async (tipId: string, title: string, url: string) => {
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
        setTrackingMap(prev => ({ ...prev, [tipId]: true }));
        setTimeout(() => {
            setTrackingMap(prev => ({ ...prev, [tipId]: false }));
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-slate-50/70 pb-24">
            
            {/* TOP STICKY SYSTEM NAVIGATION BAR */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm backdrop-blur-md bg-white/95">
                <Container>
                    <div className="py-3 flex items-center justify-between gap-4">
                        <Link
                            to="/technical-tips"
                            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-gray-600 hover:text-[#C3110C] transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            All Systems
                        </Link>

                        <div className="flex items-center gap-1 overflow-x-auto py-1 no-scrollbar">
                            {Object.values(SYSTEM_CATEGORIES).map((sys) => {
                                const Icon = sys.icon;
                                const isActive = sys.slug === currentSlug;
                                const count = allTips.filter(t => getCategorySlug(t.category) === sys.slug).length;

                                return (
                                    <Link
                                        key={sys.slug}
                                        to="/technical-tips/system/$systemSlug"
                                        params={{ systemSlug: sys.slug }}
                                        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                                            isActive
                                                ? "bg-slate-900 text-white shadow-md scale-105"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                                        }`}
                                    >
                                        <Icon size={14} style={{ color: isActive ? "#FFFFFF" : sys.color }} />
                                        <span>{sys.name}</span>
                                        {count > 0 && (
                                            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                                                isActive ? "bg-white/20 text-white" : "bg-gray-200 text-gray-700"
                                            }`}>
                                                {count}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </Container>
            </div>

            {/* SYSTEM HERO BANNER WITH BACKGROUND IMAGE */}
            <div className="relative w-full bg-slate-950 text-white py-14 md:py-20 overflow-hidden flex items-center">
                <img
                    src="https://plus.unsplash.com/premium_photo-1667238586553-e4ddb2b0cdbb?q=80&w=1062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt={currentSystem.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/80" />
                <div
                    className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-25 pointer-events-none"
                    style={{ backgroundColor: currentSystem.color }}
                />
                
                <Container className="relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                            <SystemIcon size={24} style={{ color: currentSystem.color }} />
                            <span className="text-xs font-extrabold tracking-widest text-slate-200">
                                System Technical Documentation
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
                            {currentSystem.name}
                        </h1>

                        <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl mb-8">
                            {currentSystem.description}
                        </p>

                        {/* STATS & SEARCH BAR */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 border-t border-white/10 pt-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md text-xs font-bold text-white border border-white/15">
                                <BookOpen className="w-4 h-4 text-emerald-400" />
                                <span>{systemTips.length} PDF Guide{systemTips.length === 1 ? "" : "s"} Available</span>
                            </div>

                            {/* Search Box */}
                            <div className="relative flex-1 max-w-md">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder={`Search in ${currentSystem.name}...`}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C3110C] focus:bg-slate-900/90 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            {/* DOCUMENTS CONTENT LIST */}
            <Container className="py-12 md:py-16">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin w-10 h-10 border-3 border-[#C3110C] border-t-transparent rounded-full mb-4" />
                        <p className="text-sm font-semibold text-gray-500">Loading PDF Documents...</p>
                    </div>
                ) : filteredTips.length > 0 ? (
                    <div className="space-y-8 max-w-5xl mx-auto">
                        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                            <h2 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-[#C3110C]" />
                                Technical PDF Guides & Procedures ({filteredTips.length})
                            </h2>
                            <span className="text-xs text-gray-500 font-medium">
                                Showing official manuals for {currentSystem.name}
                            </span>
                        </div>

                        {filteredTips.map((tip, index) => {
                            const isPreviewOpen = previewTipId === tip._id;
                            const isDownloaded = trackingMap[tip._id];

                            return (
                                <div
                                    key={tip._id}
                                    className="bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden"
                                >
                                    {/* CARD HEADER & DESCRIPTION */}
                                    <div className="p-6 md:p-8 space-y-4">
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3.5 text-[#C3110C] shrink-0">
                                                    <FileText size={28} strokeWidth={1.5} />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1.5">
                                                        <span className="text-[11px] font-extrabold tracking-wider bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md border border-slate-200">
                                                            Doc #{index + 1}
                                                        </span>
                                                        <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                                                            Verified Technical Tip
                                                        </span>
                                                    </div>

                                                    <h3 className="text-xl font-bold text-gray-900 leading-snug">
                                                        {tip.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Top Action Badge */}
                                            <div className="flex items-center gap-2 shrink-0">
                                                {tip.pdfUrl && tip.pdfUrl !== "#" && (
                                                    <a
                                                        href={tip.pdfUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={() => trackDownload(tip._id, tip.title, tip.pdfUrl)}
                                                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C3110C] hover:bg-[#a80f0b] text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-red-600/20 active:scale-95"
                                                    >
                                                        <Download className="w-3.5 h-3.5" />
                                                        Download PDF
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* DESCRIPTION */}
                                        <div className="text-gray-600 text-sm md:text-base leading-relaxed bg-slate-50/80 p-5 rounded-xl border border-slate-100">
                                            {tip.description ? (
                                                <p className="whitespace-pre-line">{tip.description}</p>
                                            ) : (
                                                <p className="italic text-gray-400">
                                                    Comprehensive operational manual and technical specification PDF for {tip.title}. Includes site installation guidelines, connection schematics, and maintenance checklists.
                                                </p>
                                            )}
                                        </div>

                                        {/* SUCCESS TOAST FOR THIS CARD */}
                                        {isDownloaded && (
                                            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl flex items-center gap-2">
                                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                                Download initialized! Saved to user download log.
                                            </div>
                                        )}

                                        {/* CARD FOOTER CONTROLS */}
                                        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
                                            <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                                                    Format: PDF Document
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {tip.pdfUrl && tip.pdfUrl !== "#" && (
                                                    <>
                                                        <button
                                                            onClick={() => setPreviewTipId(isPreviewOpen ? null : tip._id)}
                                                            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                                                                isPreviewOpen
                                                                    ? "bg-slate-900 text-white border-slate-900"
                                                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                                            }`}
                                                        >
                                                            {isPreviewOpen ? (
                                                                <>
                                                                    <EyeOff className="w-3.5 h-3.5" /> Close Preview
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Eye className="w-3.5 h-3.5 text-[#C3110C]" /> Preview PDF Inline
                                                                </>
                                                            )}
                                                        </button>

                                                        <a
                                                            href={tip.pdfUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-gray-50 text-gray-700 font-semibold text-xs rounded-lg border border-gray-300 transition-all"
                                                        >
                                                            <ExternalLink className="w-3.5 h-3.5" /> Open Tab
                                                        </a>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* EXPANDED INLINE PDF PREVIEW */}
                                    {isPreviewOpen && tip.pdfUrl && tip.pdfUrl !== "#" && (
                                        <div className="border-t border-gray-200 bg-slate-900 p-4">
                                            <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-3 px-2">
                                                <span>Viewing: {tip.title}.pdf</span>
                                                <a
                                                    href={tip.pdfUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:underline text-slate-300 hover:text-white flex items-center gap-1"
                                                >
                                                    Open Fullscreen <ExternalLink className="w-3 h-3" />
                                                </a>
                                            </div>
                                            <iframe
                                                src={tip.pdfUrl}
                                                title={tip.title}
                                                className="w-full h-[600px] rounded-xl border border-slate-800 bg-white"
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* EMPTY SYSTEM STATE */
                    <div className="max-w-xl mx-auto bg-white rounded-3xl p-10 text-center border border-gray-200 shadow-sm space-y-5">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                            <SystemIcon size={32} style={{ color: currentSystem.color }} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                            No PDF Guides Found in {currentSystem.name}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            {searchQuery
                                ? `No technical tip matching "${searchQuery}" was found.`
                                : "Technical documentation for this system is currently being compiled by our engineering team."}
                        </p>

                        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                            {searchQuery ? (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl"
                                >
                                    Clear Search Query
                                </button>
                            ) : (
                                <Link
                                    to="/contact"
                                    className="px-5 py-2.5 bg-[#C3110C] hover:bg-[#a80f0b] text-white text-xs font-bold rounded-xl shadow-md transition-all"
                                >
                                    Request Technical Manual for {currentSystem.name}
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </Container>

            {/* FOOTER CTA */}
            <Container className="pt-10 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-500 mb-3">
                    Need technical integration for a different system?
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link
                        to="/technical-tips"
                        className="text-xs font-bold text-gray-700 hover:text-[#C3110C] underline"
                    >
                        Browse All 6 Systems Overview
                    </Link>
                    <span className="text-gray-300">•</span>
                    <Link
                        to="/contact"
                        className="text-xs font-bold text-[#111FA2] hover:text-[#D62828] underline"
                    >
                        Contact Technical Engineering Desk
                    </Link>
                </div>
            </Container>
        </div>
    );
}
