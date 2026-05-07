import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
    ChevronDown,
    ShieldCheck,
    Cpu,
    Settings,
    Video,
    Volume2,
    Flame,
    Facebook,
    Phone,
    ChevronRight,
    LayoutGrid,
    Menu,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.avif";

interface CatalogSidebarProps {
    activeCategory?: string;
}

const NAVIGATION_DATA = [
    {
        id: "access-control",
        label: "Access Control",
        icon: ShieldCheck,
        link: "/products/access-control",
        sub: [
            {
                label: "Honeywell Systems",
                link: "/products/access-control/honeywell",
                sub: [
                    { label: "Control Panels", link: "/products/access-control/honeywell/control-panels" },
                    { label: "Control Panel Kits", link: "/products/access-control/honeywell/control-panel-kits" },
                    { label: "Readers", link: "/products/access-control/honeywell/readers" },
                    { label: "Credentials", link: "/products/access-control/honeywell/credentials" },
                    { label: "Accessories", link: "/products/access-control/honeywell/accessories" },
                    { label: "Door Hardware", link: "/products/access-control/honeywell/door-hardware" },
                    { label: "Software", link: "/products/access-control/honeywell/software" },
                    { label: "Lobby Kiosks", link: "/products/access-control/honeywell/lobby-kiosks" },
                    { label: "System Agreements & Upgrades", link: "/products/access-control/honeywell/upgrades" },
                ]
            },
            {
                label: "SALTO Solutions",
                icon: LayoutGrid,
                link: "/products/access-control/salto"
            }
        ]
    },
    { id: "building-management", label: "Building Management", icon: Cpu, link: "/services" },
    { id: "integrated-systems", label: "Integrated Systems", icon: Settings, link: "/services" },
    { id: "surveillance", label: "Surveillance (CCTV)", icon: Video, link: "/services" },
    { id: "audio-visual", label: "Audio Visual", icon: Volume2, link: "/services" },
    { id: "fire-systems", label: "Fire Systems", icon: Flame, link: "/services" },
];

// Navbar height — adjust to match your actual navbar
const NAVBAR_HEIGHT = 72;

export function CatalogSidebar({ activeCategory: propActiveCategory }: CatalogSidebarProps) {
    const location = useLocation();
    const navigate = useNavigate();

    // Auto-detect active category from URL
    const activeCategory = propActiveCategory || (
        location.pathname.includes("/access-control") ? "access-control" :
            location.pathname.includes("/building-management") ? "building-management" :
                location.pathname.includes("/integrated-systems") ? "integrated-systems" :
                    location.pathname.includes("/surveillance") ? "surveillance" :
                        location.pathname.includes("/audio-visual") ? "audio-visual" :
                            location.pathname.includes("/fire-systems") ? "fire-systems" : undefined
    );

    const [expandedSections, setExpandedSections] = useState<string[]>(["access-control"]);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const toggleSection = (id: string) => {
        setExpandedSections(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const handleLevel1Click = (item: any) => {
        toggleSection(item.id);
        if (item.link) {
            navigate({ to: item.link });
        }
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full">

            {/* ── HEADER ── */}
            <div className="px-5 py-4  pt-25 border-b border-gray-200 bg-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <img src={logoImg} alt="Logo" className="h-7 w-auto" />
                    <span className="text-sm font-bold text-[#1A3263] tracking-tight">
                        Catalog Navigator
                    </span>
                </div>
                <div className="w-8 h-8 bg-[#1A3263] text-white rounded-lg flex items-center justify-center shadow-md shadow-blue-900/20">
                    <LayoutGrid size={15} />
                </div>
            </div>

            {/* ── NAVIGATION (scrollable middle) ── */}
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar scroll-smooth min-h-0">
                {NAVIGATION_DATA.map((item) => (
                    <div key={item.id} className="space-y-0.5">
                        <div className="relative">
                            <button
                                onClick={() => handleLevel1Click(item)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 group relative overflow-hidden",
                                    activeCategory === item.id || (item.id === "access-control" && !activeCategory)
                                        ? "text-white shadow-md shadow-red-500/20 -translate-y-0.5"
                                        : "text-gray-600 hover:bg-white hover:shadow-sm hover:-translate-y-0.5"
                                )}
                            >
                                {/* Active Background Gradient */}
                                {(activeCategory === item.id || (item.id === "access-control" && !activeCategory)) && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#FC3B1F] to-[#d62b14] -z-10" />
                                )}

                                {(() => {
                                    const Icon = item.icon;
                                    return <Icon
                                        size={18}
                                        className={cn(
                                            "shrink-0 transition-colors duration-300",
                                            activeCategory === item.id || (item.id === "access-control" && !activeCategory)
                                                ? "text-white"
                                                : "text-gray-400 group-hover:text-[#FC3B1F]"
                                        )}
                                    />;
                                })()}

                                <span className={cn(
                                    "flex-1 text-left tracking-tight relative z-10",
                                    item.link && "hover:underline"
                                )}>
                                    {item.label}
                                </span>

                                {item.sub && (
                                    <ChevronDown
                                        size={14}
                                        className={cn(
                                            "transition-transform duration-300 relative z-10",
                                            expandedSections.includes(item.id) ? "rotate-180" : ""
                                        )}
                                    />
                                )}
                            </button>
                        </div>

                        {/* Submenu Level 1 */}
                        <AnimatePresence>
                            {item.sub && expandedSections.includes(item.id) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pl-6 space-y-1 pt-2 pb-3">
                                        {item.sub.map((subItem: any, idx) => {
                                            const SubIcon = subItem.icon || ShieldCheck;
                                            return (
                                                <div key={idx} className="space-y-1">
                                                    <div className="flex items-center justify-between group cursor-pointer py-2 px-3 rounded-lg hover:bg-white/60 transition-all duration-200">
                                                        <div className="flex items-center gap-2.5 flex-1">
                                                            <SubIcon size={14} className="text-gray-400 group-hover:text-[#FC3B1F] transition-colors" />
                                                            {subItem.link ? (
                                                                <Link to={subItem.link} className="text-[13px] font-semibold text-gray-500 group-hover:text-gray-900 transition-colors flex-1 hover:underline">
                                                                    {subItem.label}
                                                                </Link>
                                                            ) : (
                                                                <span className="text-[13px] font-semibold text-gray-500 group-hover:text-gray-900 transition-colors">
                                                                    {subItem.label}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {Array.isArray(subItem.sub) && (
                                                            <ChevronDown size={13} className="text-gray-300 group-hover:text-gray-600 transition-colors" />
                                                        )}
                                                    </div>

                                                    {/* Submenu Level 2 */}
                                                    {Array.isArray(subItem.sub) && (
                                                        <div className="pl-6 space-y-1 border-l border-gray-200/80 ml-4 pt-1 pb-1">
                                                            {subItem.sub.map((l3: any, l3idx: number) => {
                                                                const isL3String = typeof l3 === "string";
                                                                const l3Label = isL3String ? l3 : l3.label;
                                                                const l3Link = isL3String ? undefined : l3.link;

                                                                return (
                                                                    <div key={l3idx} className="space-y-1">
                                                                        <div className="flex items-center justify-between group py-1.5 px-3 rounded-md hover:bg-white/40 transition-all duration-200">
                                                                            {l3Link ? (
                                                                                <Link to={l3Link} className="text-xs text-gray-500 font-semibold group-hover:text-[#FC3B1F] transition-colors flex-1 block">
                                                                                    {l3Label}
                                                                                </Link>
                                                                            ) : (
                                                                                <span className="text-xs text-gray-400 font-medium group-hover:text-gray-800 transition-colors cursor-pointer">
                                                                                    {l3Label}
                                                                                </span>
                                                                            )}
                                                                            {!isL3String && Array.isArray(l3.sub) && (
                                                                                <ChevronDown size={11} className="text-gray-300 group-hover:text-gray-500 cursor-pointer" />
                                                                            )}
                                                                        </div>

                                                                        {/* Submenu Level 3 */}
                                                                        {!isL3String && Array.isArray(l3.sub) && (
                                                                            <div className="pl-4 space-y-1 border-l-2 border-[#FC3B1F]/20 ml-4 pt-1 mb-2">
                                                                                {l3.sub.map((l4: any, l4idx: number) => {
                                                                                    const isL4String = typeof l4 === "string";
                                                                                    const l4Label = isL4String ? l4 : l4.label;
                                                                                    const l4Link = isL4String ? undefined : l4.link;

                                                                                    return (
                                                                                        <div key={l4idx}>
                                                                                            {l4Link ? (
                                                                                                <Link to={l4Link} className="block text-[11px] py-1.5 px-3 text-gray-400 hover:text-[#FC3B1F] hover:bg-white/50 rounded-md transition-all duration-200 font-medium">
                                                                                                    {l4Label}
                                                                                                </Link>
                                                                                            ) : (
                                                                                                <div className="text-[11px] py-1.5 px-3 text-gray-400 hover:text-[#FC3B1F] cursor-pointer hover:bg-white/50 rounded-md transition-all duration-200 font-medium">
                                                                                                    {l4Label}
                                                                                                </div>
                                                                                            )}
                                                                                        </div>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            {/* ── FOOTER (always visible, never scrolls away) ── */}
            <div className="shrink-0 border-t border-gray-200 bg-white">

                {/* Quick links */}
                <div className="px-4 py-3 flex gap-2">
                    <a
                        href="#"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F1F3F5] hover:bg-[#1A3263] text-gray-500 hover:text-white transition-all duration-300 group border border-gray-200 hover:border-[#1A3263]"
                    >
                        <Facebook size={15} className="shrink-0" />
                        <span className="text-xs font-semibold">Facebook</span>
                    </a>

                    <a
                        href="#"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#F1F3F5] hover:bg-[#FC3B1F] text-gray-500 hover:text-white transition-all duration-300 group border border-gray-200 hover:border-[#FC3B1F]"
                    >
                        <Phone size={15} className="shrink-0" />
                        <span className="text-xs font-semibold">Contact</span>
                    </a>
                </div>


            </div>
        </div>
    );

    return (
        <>
            {/* ── MOBILE TOGGLE ── */}
            <div className="lg:hidden fixed bottom-6 right-6 z-[60]">
                <button
                    onClick={() => setIsMobileOpen(true)}
                    className="w-14 h-14 bg-gradient-to-tr from-[#FC3B1F] to-[#d62b14] text-white rounded-full shadow-lg shadow-red-500/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/20"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* ── MOBILE DRAWER ── */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="fixed inset-0 bg-[#1A3263]/40 backdrop-blur-sm z-[70] lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 28, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-[85%] max-w-[320px] bg-[#F1F3F5] z-[80] flex flex-col lg:hidden overflow-hidden shadow-2xl"
                        >
                            <button
                                onClick={() => setIsMobileOpen(false)}
                                className="absolute top-4 right-4 w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100 z-10 hover:bg-gray-50 transition-colors"
                            >
                                <X size={16} className="text-gray-600" />
                            </button>
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* ── DESKTOP SIDEBAR ── */}
            <motion.aside
                initial={{ x: -320, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-72 hidden lg:flex flex-col bg-[#F1F3F5] border-r border-gray-200 overflow-hidden shrink-0"
                style={{
                    height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
                    position: "sticky",
                    top: NAVBAR_HEIGHT,
                }}
            >
                <SidebarContent />
            </motion.aside>
        </>
    );
}
