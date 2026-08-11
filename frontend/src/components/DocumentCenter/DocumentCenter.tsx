import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Eye, Download, FileText, X } from "lucide-react";
import { Container } from "@/components/Common/Container";
import companyImg from "@/assets/company.png";
import environment from "@/enviroment/enviroment";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export interface DocumentItem {
    id: string | number;
    no: string;
    title: string;
    description: string;
    category: string;
    size: string;
    updated: string;
    url: string;
}

const STATIC_DOCUMENTS: DocumentItem[] = [

];

export function DocumentCenter() {
    const user = useSelector((state: RootState) => state.auth.user);
    const baseUrl = environment;

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [query, setQuery] = useState("");
    const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
    const [apiDocs, setApiDocs] = useState<DocumentItem[]>([]);

    useEffect(() => {
        fetch(`${baseUrl}/api/technical-tips`)
            .then((res) => res.json())
            .then((json) => {
                if (json.success && Array.isArray(json.data)) {
                    const mapped: DocumentItem[] = json.data.map((item: any, index: number) => ({
                        id: `api-${item._id}`,
                        no: String(STATIC_DOCUMENTS.length + index + 1).padStart(2, "0"),
                        title: item.title,
                        description: item.description || "Technical reference guide and operational manual.",
                        category: item.category || "Technical Guides",
                        size: "4.5 MB",
                        updated: item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "2024",
                        url: item.pdfUrl || "/documents/project-references-bms.pdf",
                    }));
                    setApiDocs(mapped);
                }
            })
            .catch(() => { });
    }, [baseUrl]);

    const allDocuments = useMemo(() => {
        return [...STATIC_DOCUMENTS, ...apiDocs];
    }, [apiDocs]);

    const categories = useMemo(() => {
        const cats = Array.from(new Set(allDocuments.map((d) => d.category)));
        return ["All", ...cats];
    }, [allDocuments]);

    const filtered = useMemo(() => {
        return allDocuments.filter((d) => {
            const matchCat =
                selectedCategory === "All" || d.category === selectedCategory;

            const matchQ =
                d.title.toLowerCase().includes(query.toLowerCase()) ||
                d.description.toLowerCase().includes(query.toLowerCase());

            return matchCat && matchQ;
        });
    }, [allDocuments, selectedCategory, query]);

    const trackDownload = async (title: string, url: string) => {
        if (user && url && url !== "#") {
            try {
                await fetch(`${baseUrl}/auth/user/download`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ title, url }),
                    credentials: "include",
                });
            } catch (err) {
                console.error("Failed to track download:", err);
            }
        }
    };

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
                                <p className="text-2xl md:text-3xl font-bold text-[#0A0F1A]">
                                    {String(allDocuments.length).padStart(2, "0")}
                                </p>
                                <p className="text-[11px] text-gray-400">
                                    Total Files
                                </p>
                            </div>
                            <div className="w-px bg-gray-300" />
                            <div>
                                <p className="text-2xl md:text-3xl font-bold text-[#0A0F1A]">
                                    {String(categories.length - 1).padStart(2, "0")}
                                </p>
                                <p className="text-[11px] text-gray-400">
                                    Categories
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PINNED / FEATURED SECTION */}
                <div className="border-b border-gray-300 grid grid-cols-12">
                    <div className="col-span-12 lg:col-span-2 border-b lg:border-b-0 lg:border-r border-gray-300 py-6 lg:py-8 px-6 lg:pr-6 flex flex-col justify-between items-center lg:items-start">
                        <span className="text-[11px] text-[#D62828] font-bold">
                            Featured
                        </span>
                    </div>

                    <div className="col-span-12 lg:col-span-7 py-6 lg:py-8 px-6 lg:px-8 border-b lg:border-b-0 lg:border-r border-gray-300 text-center lg:text-left flex flex-col justify-between">
                        <div>
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

                        {/* View PDF (Grey) & Download PDF (Red) Buttons */}
                        <div className="flex flex-wrap gap-3 mt-6 justify-center lg:justify-start">
                            <button
                                onClick={() => setPreviewDoc(STATIC_DOCUMENTS[4] || STATIC_DOCUMENTS[0])}
                                className="inline-flex items-center gap-1.5 bg-gray-600 text-white px-4 py-2 rounded text-xs font-bold shadow hover:bg-[#1A3263] transition-colors cursor-pointer"
                            >
                                <Eye size={14} />
                                <span>View PDF</span>
                            </button>
                            <a
                                href="/documents/project-references-bms.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackDownload("Intersys Corporate Overview", "/documents/project-references-bms.pdf")}
                                className="inline-flex items-center gap-1.5 bg-[#D62828] text-white px-4 py-2 rounded text-xs font-bold shadow hover:bg-[#1A3263] transition-colors cursor-pointer"
                            >
                                <Download size={14} />
                                <span>Download PDF</span>
                            </a>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-3 py-6 lg:py-8 px-6 lg:pl-8 flex flex-col justify-between items-center lg:items-end">
                        <img
                            src={companyImg}
                            alt="Corporate Profile"
                            className="w-full h-48 sm:h-56 md:h-64 lg:h-full object-contain lg:object-cover"
                        />
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

                {/* DOCUMENT LIST WITH GREY VIEW BUTTONS */}
                <div className="divide-y divide-gray-200 mb-24">
                    <AnimatePresence>
                        {filtered.map((doc) => (
                            <motion.div
                                key={doc.id}
                                layout
                                className="grid grid-cols-12 gap-4 py-6 hover:bg-white transition items-center group"
                            >
                                <div className="col-span-1 text-[11px] font-medium text-gray-400 text-center">
                                    {doc.no}
                                </div>

                                <div className="col-span-11 md:col-span-5 lg:col-span-4">
                                    <h3 className="text-sm font-bold text-[#0A0F1A] mb-1 group-hover:text-[#D62828] transition-colors">
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

                                {/* Grey View & Red Download Action Buttons */}
                                <div className="col-span-12 md:col-span-6 lg:col-span-2 flex items-center justify-end gap-2 pt-2 md:pt-0">
                                    <button
                                        onClick={() => setPreviewDoc(doc)}
                                        className="inline-flex items-center gap-1 bg-gray-500 text-white px-3 py-1.5 rounded text-xs font-bold shadow-sm hover:bg-[#1A3263] transition-colors cursor-pointer"
                                    >
                                        <Eye size={12} />
                                        <span>View</span>
                                    </button>
                                    <a
                                        href={doc.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => trackDownload(doc.title, doc.url)}
                                        className="inline-flex items-center gap-1 bg-[#D62828] text-white px-3 py-1.5 rounded text-xs font-bold shadow-sm hover:bg-[#1A3263] transition-colors cursor-pointer"
                                    >
                                        <Download size={12} />
                                        <span>Download</span>
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </Container>

            {/* DOCUMENT INLINE PREVIEW MODAL */}
            {previewDoc && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-[#0A0F1A] text-white">
                            <div className="flex items-center gap-3 pr-4 min-w-0">
                                <FileText size={20} className="text-[#D62828] shrink-0" />
                                <div className="min-w-0">
                                    <h3 className="text-sm font-bold truncate">{previewDoc.title}</h3>
                                    <span className="text-[11px] text-gray-300 font-medium">{previewDoc.category}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <a
                                    href={previewDoc.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackDownload(previewDoc.title, previewDoc.url)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D62828] text-white rounded text-xs font-bold hover:bg-white hover:text-[#0A0F1A] transition-colors"
                                >
                                    <Download size={13} />
                                    <span>Download</span>
                                </a>
                                <button
                                    onClick={() => setPreviewDoc(null)}
                                    className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content - PDF Viewer */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50">
                            <p className="text-xs text-gray-600 leading-relaxed bg-white p-4 rounded-lg border border-gray-200">
                                {previewDoc.description}
                            </p>

                            {previewDoc.url && previewDoc.url !== "#" ? (
                                <iframe
                                    src={previewDoc.url}
                                    title={previewDoc.title}
                                    className="w-full h-[550px] rounded-xl border border-gray-300 bg-white shadow-inner"
                                />
                            ) : (
                                <div className="py-20 text-center text-gray-400 bg-white rounded-xl border border-gray-200">
                                    <FileText size={40} className="mx-auto mb-2 text-gray-300" />
                                    <p className="text-xs font-semibold">Document viewer ready</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}