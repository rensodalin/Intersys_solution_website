import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
    Building2,
    Flame,
    Monitor,
    Key,
    Video,
    Layers,
    FileText,
    ArrowRight,
    BookOpen,
    ShieldCheck,
    Sparkles
} from "lucide-react";
import { Container } from "@/components/Common/Container";
import environment from "@/enviroment/enviroment";
import { SYSTEM_CATEGORIES, getCategorySlug, Tip } from "./SystemTipsPage";

export function TechnicalTips() {
    const baseUrl = environment;
    const [tips, setTips] = useState<Tip[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${baseUrl}/api/technical-tips`)
            .then(res => res.json())
            .then(json => { if (json.success) setTips(json.data); })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [baseUrl]);

    // Group tips by system slug
    const groupedTips = tips.reduce<Record<string, Tip[]>>((acc, tip) => {
        const slug = getCategorySlug(tip.category);
        if (!acc[slug]) acc[slug] = [];
        acc[slug].push(tip);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-slate-50/60 pb-20">

            {/* HERO SECTION WITH BACKGROUND IMAGE */}
            <div className="relative w-full min-h-[340px] md:min-h-[400px] overflow-hidden flex items-center justify-center pt-28 md:pt-36 pb-12">
                <img
                    src="https://plus.unsplash.com/premium_photo-1667238586553-e4ddb2b0cdbb?q=80&w=1062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Technical Tips Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" />

                <Container className="relative z-10 text-center max-w-4xl">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-4 mt-10">
                        Technical Tips & System Manuals
                    </h1>

                    <p className="text-slate-200 text-base md:text-md  max-w-2xl mx-auto ">
                        Explore verified technical guides, PDF manuals, and operational specifications categorized across our 6 core engineering systems.
                    </p>
                </Container>
            </div>

            {/* MAIN CONTENT: 6 SYSTEM CARDS GRID */}
            <Container className="py-16 md:py-24">
                <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-12">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900">
                            Select a System Category
                        </h2>
                        <p className="text-sm text-gray-500 mt-1 font-medium">
                            Choose one of the 6 systems below to view all corresponding PDF documentation and technical guides.
                        </p>
                    </div>

                    <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1  text-slate-700 font-bold text-sm ">
                        <ShieldCheck size={14} className="text-emerald-600" />
                        6 Engineering Systems
                    </span>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin w-10 h-10 border-3 border-[#C3110C] border-t-transparent rounded-full" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Object.values(SYSTEM_CATEGORIES).map((sys) => {
                            const IconComponent = sys.icon;
                            const catTips = groupedTips[sys.slug] || [];
                            const docCount = catTips.length;

                            return (
                                <Link
                                    key={sys.slug}
                                    to="/technical-tips/system/$systemSlug"
                                    params={{ systemSlug: sys.slug }}
                                    className="group bg-white rounded-lg p-8 border border-gray-200/90 shadow-sm hover:shadow- hover:border-slate-300 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                                >
                                    {/* Ambient card top border gradient on hover */}
                                    <div
                                        className="absolute top-0 left-0 right-0 h-1.5 transition-all opacity-80 group-hover:opacity-100"
                                        style={{ backgroundColor: sys.color }}
                                    />

                                    <div>
                                        {/* CARD TOP HEADER */}
                                        <div className="flex items-center justify-between gap-4 mb-6">
                                            <div
                                                className="w-14 h-14 rounded-sm flex items-center justify-center transition-transform group-hover:scale-110"
                                                style={{ color: sys.color }}
                                            >
                                                <IconComponent size={28} strokeWidth={1.75} />
                                            </div>

                                            <span className={`text-xs font-bold px-3 py-1  ${docCount > 0
                                                ? " text-emerald-700 "
                                                : "text-slate-500 "
                                                }`}>
                                                {docCount} {docCount === 1 ? "PDF Guide" : "PDF Guides"}
                                            </span>
                                        </div>

                                        {/* SYSTEM TITLE */}
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#C3110C] transition-colors mb-3">
                                            {sys.name}
                                        </h3>

                                        {/* DESCRIPTION */}
                                        <p className="text-xs text-gray-500 leading-relaxed mb-6">
                                            {sys.description}
                                        </p>

                                        {/* RECENT TIPS PREVIEW PILLS */}
                                        {docCount > 0 && (
                                            <div className="space-y-2 mb-6 border-t border-gray-100 pt-4">
                                                <span className="text-[11px] text-gray-400 block mb-2">
                                                    Available Documents:
                                                </span>
                                                {catTips.slice(0, 3).map(tip => (
                                                    <div
                                                        key={tip._id}
                                                        className="flex items-center gap-2 text-xs text-gray-700 font-medium truncate"
                                                    >
                                                        <FileText className="w-3.5 h-3.5 text-[#C3110C] shrink-0" />
                                                        <span className="truncate">{tip.title}</span>
                                                    </div>
                                                ))}
                                                {docCount > 3 && (
                                                    <span className="text-[11px] text-[#C3110C] font-semibold block pt-1">
                                                        + {docCount - 3} more technical documents
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* CARD BUTTON ACTION */}
                                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-slate-800 group-hover:text-[#C3110C]">
                                        <span>Explore System Tips</span>
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* FOOTER CALLOUT */}
                <div className="mt-20 border-t border-gray-200 pt-12 text-center">
                    <p className="text-sm text-gray-500 mb-4">
                        Can't find the technical manual or drawing you're looking for?
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#111FA2] hover:text-[#D62828] border-b-2 border-[#111FA2] hover:border-[#D62828] pb-1 transition-all"
                    >
                        <span>Request a specialized engineering guide</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

            </Container>
        </div>
    );
}
