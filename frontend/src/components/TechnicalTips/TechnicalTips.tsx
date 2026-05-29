import React from "react";
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
    Network,
    ShieldCheck
} from "lucide-react";
import { Container } from "@/components/Common/Container";

const tipCategories = [
    {
        title: "Building Management",
        icon: Building2,
        color: "#0E7490",
        tips: [
            { title: "Optimizing HVAC for unusual solar loading", url: "#" },
            { title: "Modifying VFD parameters for high-static fans", url: "#" }
        ]
    },
    {
        title: "Fire Alarm Systems",
        icon: Flame,
        color: "#D62828",
        tips: [
            { title: "Wiring smoke detectors in high-airflow areas", url: "#" },
            { title: "Heat detector placement in industrial kitchens", url: "#" }
        ]
    },
    {
        title: "Audio Visual (AV)",
        icon: Monitor,
        color: "#6B21A8",
        tips: [
            { title: "Eliminating grounding loops in large halls", url: "#" },
            { title: "Integrating legacy sources into HDMI matrix", url: "#" }
        ]
    },
    {
        title: "Access Control",
        icon: Key,
        color: "#059669",
        tips: [
            { title: "Fail-safe vs Fail-secure lock configurations", url: "#" },
            { title: "Emergency exit interlock requirements", url: "#" }
        ]
    },
    {
        title: "Surveillance System",
        icon: Video,
        color: "#B45309",
        tips: [
            { title: "Optimizing NVR for 4K long-term retention", url: "#" },
            { title: "Night-vision blind spot mitigation guide", url: "#" }
        ]
    },
    {
        title: "Integrated Systems",
        icon: Layers,
        color: "#1E40AF",
        tips: [
            { title: "Syncing BMS with Surveillance motion triggers", url: "#" },
            { title: "Unified emergency lockdown protocols", url: "#" }
        ]
    },

];

export function TechnicalTips() {
    const user = useSelector((state: RootState) => state.auth.user);
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:1000";

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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-16">

                        {tipCategories.map((cat, idx) => (
                            <div key={idx} className="flex gap-5">

                                {/* ICON */}
                                <div className="pt-1">
                                    <cat.icon
                                        size={28}
                                        strokeWidth={1.5}
                                        style={{ color: cat.color }}
                                    />
                                </div>

                                {/* TEXT */}
                                <div className="flex-1">
                                    <h2 className="text-sm font-semibold text-gray-700 mb-3">
                                        {cat.title}
                                    </h2>

                                    <div className="space-y-3">
                                        {cat.tips.map((tip, tidx) => (
                                            <a
                                                key={tidx}
                                                href={tip.url}
                                                onClick={() => trackPdfDownload(tip.title, tip.url)}
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

                                        {cat.tips.length === 0 && (
                                            <p className="text-xs text-gray-400 italic">
                                                Coming soon
                                            </p>
                                        )}
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
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