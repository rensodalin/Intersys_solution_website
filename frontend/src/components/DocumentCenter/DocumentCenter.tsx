import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Download, ArrowUpRight, FileText } from "lucide-react";
import { Container } from "@/components/Common/Container";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import environment from "@/enviroment/enviroment";
import companyImg from "@/assets/company.png";
import { AuthModal } from "@/components/Auth/AuthModal";

const categories = [
    "All",
    "BMS Documentation",
    "Corporate Profile",
    "Project Case Studies",
    "Technical Guides",
];

const documents = [
    {
        id: 1,
        no: "01",
        title: "Honeywell EBI (Enterprise Buildings Integrator) — System Overview",
        description:
            "Architecture overview and integration reference for Honeywell EBI platform, including controllers, configuration flow, and system connectivity.",
        category: "BMS Documentation",
        size: "12.8 MB",
        updated: "Jan 2024",
        url: "/documents/project-references-bms.pdf"
    },
    {
        id: 2,
        no: "02",
        title: "Novotel Phnom Penh — Smart Building Case Study",
        description:
            "Real-world implementation of building automation systems, monitoring structure, and centralized control strategy used on-site.",
        category: "Project Case Studies",
        size: "3.5 MB",
        updated: "Mar 2024",
        url: "#"
    },
    {
        id: 3,
        no: "03",
        title: "Smart Building Solutions — Product Catalog 2024",
        description:
            "Full catalog of engineering systems, devices, and integrated solutions designed for modern building infrastructure.",
        category: "BMS Documentation",
        size: "8.1 MB",
        updated: "Feb 2024",
        url: "#"
    },
    {
        id: 4,
        no: "04",
        title: "Fire & Life Safety Compliance Manual",
        description:
            "Operational procedures, safety standards, and compliance requirements for fire protection and life safety systems.",
        category: "Technical Guides",
        size: "5.2 MB",
        updated: "Dec 2023",
        url: "#"
    },
];

export function DocumentCenter() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [query, setQuery] = useState("");
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [pendingUrl, setPendingUrl] = useState<string | null>(null);

    const user = useSelector((state: RootState) => state.auth.user);
    const baseUrl = environment;

    const requireAuth = useCallback((url: string) => {
        if (user) {
            window.open(url, "_blank", "noopener,noreferrer");
            return;
        }
        setPendingUrl(url);
        setShowAuthModal(true);
    }, [user]);

    const handleAuthClose = useCallback(() => {
        setShowAuthModal(false);
        setPendingUrl(null);
    }, []);

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

    const filtered = documents.filter((d) => {
        const matchCat =
            selectedCategory === "All" || d.category === selectedCategory;

        const matchQ =
            d.title.toLowerCase().includes(query.toLowerCase()) ||
            d.description.toLowerCase().includes(query.toLowerCase());

        return matchCat && matchQ;
    });

    return (
        <div className="min-h-screen bg-[#F5F3EF] font-sans">



            <Container>

                {/* TITLE */}
                <div className="border-b-2 border-[#0A0F1A] py-10 md:py-16 pt-28 md:pt-40 grid grid-cols-12 gap-4">

                    <div className="col-span-12 lg:col-span-8 text-center lg:text-left">
                        <h1 className="text-3xl sm:text-4xl md:text-[45px] text-[#111FA2] font-extrabold tracking-tight">
                            Document{" "}
                            <span className="hidden sm:inline"><br /></span>
                            <span className="text-[#D62828]">Center</span>
                        </h1>
                    </div>

                    <div className="col-span-12 lg:col-span-4 flex flex-col justify-end gap-6 pb-2 text-center lg:text-left">

                        <p className="text-sm text-gray-500 leading-relaxed max-w-md mx-auto lg:mx-0">
                            A centralized library of technical references, engineering documentation, and project insights.
                        </p>

                        <div className="flex gap-8 justify-center lg:justify-start">
                            <div>
                                <p className="text-2xl md:text-3xl font-bold text-[#0A0F1A]">05</p>
                                <p className="text-[11px] text-gray-400">
                                    Total Files
                                </p>
                            </div>
                            <div className="w-px bg-gray-300" />
                            <div>
                                <p className="text-2xl md:text-3xl font-bold text-[#0A0F1A]">04</p>
                                <p className="text-[11px] text-gray-400">
                                    Categories
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* PINNED */}
                <div className="border-b border-gray-300 grid grid-cols-12">

                    <div className="col-span-12 lg:col-span-2 border-b lg:border-b-0 lg:border-r border-gray-300 py-6 lg:py-8 px-6 lg:pr-6 flex flex-col justify-between items-center lg:items-start">
                        <span className="text-[11px] text-[#D62828] font-bold">
                            Featured
                        </span>
                    </div>

                    <div className="col-span-12 lg:col-span-7 py-6 lg:py-8 px-6 lg:px-8 border-b lg:border-b-0 lg:border-r border-gray-300 text-center lg:text-left">

                        <p className="text-[11px] text-gray-400 mb-4">
                            Corporate Profile
                        </p>

                        <h2 className="text-xl md:text-2xl font-bold text-[#0A0F1A] leading-tight tracking-tight mb-3">
                            Intersys Systems — Corporate Overview
                        </h2>

                        <p className="text-sm text-gray-500 leading-relaxed max-w-lg">
                            Overview of engineering capabilities, system integration expertise, and global delivery standards.
                        </p>

                    </div>

                    <div className="col-span-12 lg:col-span-3 py-6 lg:py-8 px-6 lg:pl-8 flex flex-col justify-between">

                        <img
                            src={companyImg}
                            alt="Corporate Profile"
                            className="w-full h-48 sm:h-56 md:h-64 lg:h-full object-contain lg:object-cover"
                        />

                        <button
                            onClick={() => {
                                const url = "/documents/project-references-bms.pdf";
                                requireAuth(url);
                                if (user) trackPdfDownload("Intersys Systems - Corporate Overview", url);
                            }}
                            className="mt-4 flex items-center justify-between bg-[#D62828] text-white text-[11px] font-bold px-5 py-3 hover:bg-[#111FA2] transition outline-none w-full max-w-xs mx-auto lg:mx-0"
                        >
                            Download
                            <Download size={13} />
                        </button>

                    </div>

                </div>

                {/* FILTER */}
                <div className="border-b border-gray-300 py-5 flex flex-col md:flex-row justify-between gap-4">

                    <div className="flex overflow-x-auto mx-auto md:mx-0">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`text-[11px] font-medium px-5 py-2 border-r whitespace-nowrap transition ${selectedCategory === cat
                                    ? "bg-[#0A0F1A] text-white"
                                    : "text-gray-400 hover:text-black"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search..."
                            className="pl-9 pr-4 py-2 border border-gray-300 text-xs w-full md:w-56 focus:outline-none"
                        />
                    </div>

                </div>

                {/* LIST */}
                <div className="divide-y divide-gray-200 mb-24">

                    <AnimatePresence>
                        {filtered.map((doc) => (
                            <motion.div
                                key={doc.id}
                                layout
                                className="grid grid-cols-12 gap-4 py-6 hover:bg-white transition items-center"
                            >

                                <div className="col-span-1 text-[11px] font-medium text-gray-400 text-center">
                                    {doc.no}
                                </div>

                                <div className="col-span-9 lg:col-span-5">
                                    <h3 className="text-sm font-bold text-[#0A0F1A] mb-1">
                                        {doc.title}
                                    </h3>

                                    <p className="text-xs text-gray-500 leading-relaxed">
                                        {doc.description}
                                    </p>
                                </div>

                                <div className="col-span-2 hidden lg:block text-[11px] text-gray-400">
                                    {doc.category}
                                </div>

                                <div className="col-span-2 hidden lg:block text-[11px] text-gray-400">
                                    {doc.updated}
                                </div>

                                <div className="col-span-1 hidden lg:block text-[11px] text-gray-400">
                                    {doc.size}
                                </div>

                                <div className="col-span-2 lg:col-span-1 flex justify-end items-start">
                                    <button
                                        onClick={() => {
                                            if (doc.url === "#") return;
                                            requireAuth(doc.url);
                                            if (user) trackPdfDownload(doc.title, doc.url);
                                        }}
                                        className="w-8 h-8 border flex items-center justify-center hover:border-[#D62828] hover:text-[#D62828] transition-colors cursor-pointer"
                                    >
                                        <Download size={13} />
                                    </button>
                                </div>

                            </motion.div>
                        ))}
                    </AnimatePresence>

                </div>

            </Container>

            <AuthModal isOpen={showAuthModal} onClose={handleAuthClose} />
        </div>
    );
}