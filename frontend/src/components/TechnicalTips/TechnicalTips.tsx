import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
    FileText,
    Building2,
    Flame,
    Monitor,
    Key,
    Video,
    Layers,
} from "lucide-react";
import { Container } from "@/components/Common/Container";
import environment from "@/enviroment/enviroment";

const categoryIcons: Record<string, { icon: any; color: string }> = {
    "Building Management": { icon: Building2, color: "#0E7490" },
    "Fire Alarm Systems": { icon: Flame, color: "#D62828" },
    "Audio Visual (AV)": { icon: Monitor, color: "#6B21A8" },
    "Access Control": { icon: Key, color: "#059669" },
    "Surveillance System": { icon: Video, color: "#B45309" },
    "Integrated Systems": { icon: Layers, color: "#1E40AF" },
};

interface Tip {
    _id: string;
    title: string;
    pdfUrl: string;
    category: string;
    description: string;
    order: number;
}

export function TechnicalTips() {
    const user = useSelector((state: RootState) => state.auth.user);
    const baseUrl = environment;
    const [tips, setTips] = useState<Tip[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${baseUrl}/api/technical-tips`)
            .then(res => res.json())
            .then(json => { if (json.success) setTips(json.data); })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [baseUrl]);

    const grouped = tips.reduce<Record<string, Tip[]>>((acc, tip) => {
        if (!acc[tip.category]) acc[tip.category] = [];
        acc[tip.category].push(tip);
        return acc;
    }, {});

    const allCategories = Object.keys(categoryIcons);

    const trackPdfDownload = async (title: string, url: string) => {
        if (!user || url === "#") return;
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
    };

    return (
        <div className="min-h-screen bg-white">

            {/* HERO (simplified) */}
            <div className="relative w-full h-[300px] overflow-hidden">
                <img
                    src="https://plus.unsplash.com/premium_photo-1667238586553-e4ddb2b0cdbb?q=80&w=1062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Technical"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/55" />
            </div>

            <Container className="py-24">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    {/* TITLE */}
                    <h1 className="text-4xl font-bold text-gray-900 mb-6 font-display tracking-tight">
                        Technical Tips
                    </h1>

                    <p className="text-gray-500 text-lg leading-relaxed">
                        Browse technical insights and practical solutions for different systems,
                        from building management to integrated technologies.
                    </p>
                </div>

                {/* CONTENT */}
                <div className="max-w-5xl mx-auto">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin w-8 h-8 border-2 border-[#C3110C] border-t-transparent rounded-full" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">

                            {allCategories.map((cat, idx) => {
                                const catTips = grouped[cat] || [];
                                const meta = categoryIcons[cat];
                                const IconComponent = meta.icon;

                                return (
                                    <div key={idx} className="flex gap-5">

                                        {/* ICON */}
                                        <div className="pt-1">
                                            <IconComponent
                                                size={28}
                                                strokeWidth={1.5}
                                                style={{ color: meta.color }}
                                            />
                                        </div>

                                        {/* TEXT */}
                                        <div className="flex-1">
                                            <h2 className="text-sm font-semibold text-gray-700 mb-3">
                                                {cat}
                                            </h2>

                                            <div className="space-y-3">
                                                {catTips.map((tip) => (
                                                    <a
                                                        key={tip._id}
                                                        href={tip.pdfUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={() => trackPdfDownload(tip.title, tip.pdfUrl)}
                                                        className="group flex items-center gap-2 text-[15px] text-[#4A4A4A] hover:text-[#D62828] transition-colors"
                                                    >
                                                        <img
                                                            src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
                                                            alt="PDF"
                                                            className="w-5 h-5 shrink-0"
                                                        />
                                                        <span className="underline decoration-gray-400 group-hover:decoration-red-600 underline-offset-4">
                                                            {tip.title}
                                                        </span>
                                                    </a>
                                                ))}

                                                {catTips.length === 0 && (
                                                    <p className="text-xs text-gray-400 italic">
                                                        Coming soon
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* FOOTER */}
                <div className="mt-24 border-t border-gray-100 pt-10 text-center">
                    <p className="text-sm text-gray-400 mb-4">
                        Can't find what you're looking for?
                    </p>
                    <Link
                        to="/contact"
                        className="text-sm font-bold text-[#111FA2] hover:text-[#D62828] border-b-2 border-transparent hover:border-[#D62828] pb-1 transition-all inline-block"
                    >
                        Request a specialized technical guide
                    </Link>
                </div>

            </Container>
        </div>
    );
}
