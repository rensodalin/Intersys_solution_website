import { useEffect, useState } from "react";
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
    Clock,
    Sparkles,
    BookOpen,
    ShieldCheck,
    ChevronRight
} from "lucide-react";
import { Container } from "@/components/Common/Container";
import environment from "@/enviroment/enviroment";

const categoryIcons: Record<string, { icon: any; color: string; bg: string; badge: string }> = {
    "Building Management": { icon: Building2, color: "#0E7490", bg: "bg-cyan-50 text-cyan-700 border-cyan-200", badge: "#0E7490" },
    "Fire Alarm Systems": { icon: Flame, color: "#D62828", bg: "bg-red-50 text-red-700 border-red-200", badge: "#D62828" },
    "Audio Visual (AV)": { icon: Monitor, color: "#6B21A8", bg: "bg-purple-50 text-purple-700 border-purple-200", badge: "#6B21A8" },
    "Access Control": { icon: Key, color: "#059669", bg: "bg-emerald-50 text-emerald-700 border-emerald-200", badge: "#059669" },
    "Surveillance System": { icon: Video, color: "#B45309", bg: "bg-amber-50 text-amber-700 border-amber-200", badge: "#B45309" },
    "Integrated Systems": { icon: Layers, color: "#1E40AF", bg: "bg-blue-50 text-blue-700 border-blue-200", badge: "#1E40AF" },
};

export interface Tip {
    _id: string;
    title: string;
    pdfUrl: string;
    category: string;
    description: string;
    order: number;
    createdAt?: string;
}

interface TechnicalTipDetailProps {
    tip: Tip;
    relatedTips?: Tip[];
}

export function TechnicalTipDetail({ tip, relatedTips = [] }: TechnicalTipDetailProps) {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);
    const baseUrl = environment;
    const [downloading, setDownloading] = useState(false);
    const [downloadSuccess, setDownloadSuccess] = useState(false);

    const categoryMeta = categoryIcons[tip.category] || {
        icon: FileText,
        color: "#C3110C",
        bg: "bg-gray-50 text-gray-700 border-gray-200",
        badge: "#C3110C"
    };

    const IconComponent = categoryMeta.icon;

    const trackPdfDownload = async () => {
        setDownloading(true);
        if (user && tip.pdfUrl && tip.pdfUrl !== "#") {
            try {
                await fetch(`${baseUrl}/auth/user/download`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title: tip.title, url: tip.pdfUrl }),
                    credentials: "include"
                });
            } catch (err) {
                console.error("Failed to track download:", err);
            }
        }
        setDownloading(false);
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
    };

    // Filter related tips to exclude current tip
    const categoryRelated = relatedTips.filter(t => t._id !== tip._id && t.category === tip.category);

    return (
        <div className="min-h-screen bg-slate-50/50 pb-20">
            {/* TOP BAR / BREADCRUMB HEADER */}
            <div className="bg-white border-b border-gray-200/80 sticky top-0 z-20 backdrop-blur-md bg-white/90">
                <Container className="py-4">
                    <div className="flex items-center justify-between gap-4">
                        <button
                            onClick={() => navigate({ to: "/technical-tips" })}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#C3110C] transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Back to Technical Tips
                        </button>

                        <div className="hidden md:flex items-center gap-2 text-xs font-medium text-gray-500">
                            <Link to="/" className="hover:text-gray-900">Home</Link>
                            <ChevronRight className="w-3 h-3 text-gray-400" />
                            <Link to="/technical-tips" className="hover:text-gray-900">Technical Tips</Link>
                            <ChevronRight className="w-3 h-3 text-gray-400" />
                            <span className="text-gray-900 font-semibold truncate max-w-[200px]">{tip.title}</span>
                        </div>
                    </div>
                </Container>
            </div>

            {/* HERO SECTION */}
            <div className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden py-16 md:py-20 shadow-inner">
                {/* Background ambient light */}
                <div
                    className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
                    style={{ backgroundColor: categoryMeta.color }}
                />
                <div className="absolute top-1/2 left-10 w-72 h-72 rounded-full blur-3xl opacity-10 bg-red-600 pointer-events-none" />

                <Container className="relative z-10">
                    <div className="max-w-4xl">
                        {/* Category Badge */}
                        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 backdrop-blur-md border border-white/20 text-white mb-6">
                            <IconComponent size={16} style={{ color: categoryMeta.color }} />
                            <span>{tip.category}</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
                            {tip.title}
                        </h1>

                        {/* Meta summary strip */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300 border-t border-white/10 pt-6">
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-slate-400" />
                                <span>Technical Documentation</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                <span>Verified Technical Guide</span>
                            </div>
                            {tip.createdAt && (
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-slate-400" />
                                    <span>Updated {new Date(tip.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </div>

            {/* MAIN CONTENT GRID */}
            <Container className="py-12 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* LEFT 2 COLUMNS: Description & PDF Card */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* DESCRIPTION BLOCK */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                                <Sparkles className="w-5 h-5 text-[#C3110C]" />
                                <h2 className="text-xl font-bold text-gray-900">Overview & Key Insights</h2>
                            </div>

                            <div className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-line">
                                {tip.description ? (
                                    tip.description
                                ) : (
                                    <p className="text-gray-500 italic">
                                        This technical tip provides essential engineering guidance, best practices, and operational procedures for {tip.category} implementation. Refer to the attached PDF documentation below for complete technical specifications and step-by-step instructions.
                                    </p>
                                )}
                            </div>

                            {/* HIGHLIGHT BOX */}
                            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-6 space-y-3">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                    What You Will Learn from This Tip
                                </h3>
                                <ul className="space-y-2 text-sm text-slate-600">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#C3110C] font-bold">•</span>
                                        Standard operating procedures and setup parameters for system optimization.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#C3110C] font-bold">•</span>
                                        Troubleshooting techniques to resolve common operational issues.
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#C3110C] font-bold">•</span>
                                        Safety standards and compatibility requirements for technical deployments.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* ACTION & PDF DOWNLOAD CARD */}
                        <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 border-2 border-red-100 shadow-md space-y-6 relative overflow-hidden">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-4 bg-red-50 text-[#C3110C] rounded-2xl shrink-0 border border-red-100">
                                        <FileText size={36} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2.5 py-1 rounded-md border border-red-100">
                                            PDF Resource
                                        </span>
                                        <h3 className="text-lg font-bold text-gray-900 mt-2">
                                            {tip.title}.pdf
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Official Intersys Technical Reference Document
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                                    {tip.pdfUrl && tip.pdfUrl !== "#" ? (
                                        <>
                                            <a
                                                href={tip.pdfUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={trackPdfDownload}
                                                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#C3110C] hover:bg-[#a80f0b] text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-red-600/20 hover:scale-[1.02] active:scale-95"
                                            >
                                                <Download className="w-4 h-4" />
                                                {downloading ? "Downloading..." : "Download PDF"}
                                            </a>
                                            <a
                                                href={tip.pdfUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold text-sm rounded-xl border border-gray-300 transition-all shadow-sm hover:scale-[1.02]"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                View in Browser
                                            </a>
                                        </>
                                    ) : (
                                        <button
                                            disabled
                                            className="px-5 py-3 bg-gray-200 text-gray-500 font-semibold text-sm rounded-xl cursor-not-allowed"
                                        >
                                            PDF Currently Unavailable
                                        </button>
                                    )}
                                </div>
                            </div>

                            {downloadSuccess && (
                                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-lg flex items-center gap-2 animate-fade-in">
                                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                    Download started! If user account is active, download activity has been recorded.
                                </div>
                            )}

                            {/* PDF INLINE PREVIEW / IFRAME IF VALID URL */}
                            {tip.pdfUrl && tip.pdfUrl !== "#" && (
                                <div className="mt-6 border border-gray-200 rounded-xl overflow-hidden bg-slate-900 shadow-inner">
                                    <div className="bg-slate-800 px-4 py-2 text-xs font-mono text-slate-300 flex items-center justify-between border-b border-slate-700">
                                        <span>PDF Document Viewer</span>
                                        <a
                                            href={tip.pdfUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline flex items-center gap-1 text-slate-400 hover:text-white"
                                        >
                                            Full Screen <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                    <iframe
                                        src={tip.pdfUrl}
                                        title={tip.title}
                                        className="w-full h-[550px] border-0"
                                    />
                                </div>
                            )}
                        </div>

                    </div>

                    {/* RIGHT COLUMN: Sidebar (Related Tips & Contact) */}
                    <div className="space-y-8">

                        {/* RELATED TIPS IN THIS CATEGORY */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
                            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                                <IconComponent size={20} style={{ color: categoryMeta.color }} />
                                <h3 className="font-bold text-gray-900 text-base">
                                    More in {tip.category}
                                </h3>
                            </div>

                            {categoryRelated.length > 0 ? (
                                <div className="space-y-3">
                                    {categoryRelated.map((relTip) => (
                                        <Link
                                            key={relTip._id}
                                            to="/technical-tips/$tipId"
                                            params={{ tipId: relTip._id }}
                                            className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
                                        >
                                            <FileText className="w-4 h-4 text-gray-400 group-hover:text-[#C3110C] shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-800 group-hover:text-[#C3110C] transition-colors leading-snug">
                                                    {relTip.title}
                                                </h4>
                                                {relTip.description && (
                                                    <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                                                        {relTip.description}
                                                    </p>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-gray-400 italic py-2">
                                    No other technical tips currently listed in this category.
                                </p>
                            )}
                        </div>

                        {/* NEED CUSTOM GUIDE CARD */}
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white space-y-4 shadow-md">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C3110C] bg-red-950/80 px-2.5 py-1 rounded-md border border-red-800/50">
                                Engineering Support
                            </span>
                            <h4 className="text-lg font-bold">Need a Custom Technical Guide?</h4>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                Require custom integration parameters or specialized installation manuals for your project site? Contact our technical engineering team directly.
                            </p>
                            <Link
                                to="/contact"
                                className="block w-full text-center py-3 bg-[#C3110C] hover:bg-[#a80f0b] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md"
                            >
                                Contact Technical Team
                            </Link>
                        </div>

                    </div>

                </div>
            </Container>
        </div>
    );
}
