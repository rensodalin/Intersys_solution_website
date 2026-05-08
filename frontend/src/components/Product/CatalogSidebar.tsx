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
    X,
    PanelLeftClose,
    PanelLeftOpen,
    Search
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
                link: "/products/access-control/salto",
                sub: [
                    { label: "Electronic Locks", link: "/products/access-control/salto/electronic-locks" },
                    { label: "Electronic Cylinders", link: "/products/access-control/salto/electronic-cylinders" },
                    { label: "Electronic Locker Locks", link: "/products/access-control/salto/electronic-locker-locks" },
                    { label: "Electronic Padlocks", link: "/products/access-control/salto/electronic-padlocks" },
                    { label: "Wall Readers", link: "/products/access-control/salto/wall-readers" },
                    { label: "Face Recognition Terminals", link: "/products/access-control/salto/face-recognition-terminals" },
                    { label: "Access Controllers", link: "/products/access-control/salto/access-controllers" },
                    { label: "Door Intercom Systems", link: "/products/access-control/salto/door-intercom-systems" },
                    { label: "Motorized Locks", link: "/products/access-control/salto/motorized-locks" },
                    { label: "Panic Bars & Emergency Exit Devices", link: "/products/access-control/salto/panic-bars" },
                    { label: "Mortise Locks", link: "/products/access-control/salto/mortise-locks" },
                    { label: "Cylindrical Latch Locks", link: "/products/access-control/salto/cylindrical-latch-locks" },
                    { label: "Energy-Saving Devices", link: "/products/access-control/salto/energy-saving-devices" },
                    { label: "Peripherals", link: "/products/access-control/salto/peripherals" },
                    { label: "Credentials", link: "/products/access-control/salto/credentials" },
                ]
            }
        ]
    },
    { id: "building-management", label: "Building Management", icon: Cpu, link: "/products/building-management" },
    { id: "integrated-systems", label: "Integrated Systems", icon: Settings, link: "/services" },
    { id: "surveillance", label: "Surveillance (CCTV)", icon: Video, link: "/products/surveillance" },
    { id: "audio-visual", label: "Audio Visual", icon: Volume2, link: "/services" },
    { id: "fire-systems", label: "Fire Systems", icon: Flame, link: "/services" },
];


export function CatalogSidebar({ activeCategory: propActiveCategory }: CatalogSidebarProps) {
    const location = useLocation();
    const navigate = useNavigate();

    // Track scroll to match Navbar's dynamic height
    const [scrolled, setScrolled] = useState(false);

    React.useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const NAVBAR_HEIGHT = scrolled ? 112 : 144;

    // Auto-detect active category from URL
    const activeCategory = propActiveCategory || (
        location.pathname.includes("/access-control") ? "access-control" :
            location.pathname.includes("/building-management") ? "building-management" :
                location.pathname.includes("/integrated-systems") ? "integrated-systems" :
                    location.pathname.includes("/surveillance") ? "surveillance" :
                        location.pathname.includes("/audio-visual") ? "audio-visual" :
                            location.pathname.includes("/fire-systems") ? "fire-systems" : undefined
    );

    const [expandedSections, setExpandedSections] = useState<string[]>(activeCategory ? [activeCategory] : []);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isDesktopOpen, setIsDesktopOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Auto-expand sections based on URL
    React.useEffect(() => {
        const sections: string[] = [];
        if (location.pathname.includes("/access-control")) {
            sections.push("access-control");
            if (location.pathname.includes("/honeywell")) sections.push("Honeywell Systems");
            if (location.pathname.includes("/salto")) sections.push("SALTO Solutions");
        }
        if (location.pathname.includes("/building-management")) sections.push("building-management");
        if (location.pathname.includes("/integrated-systems")) sections.push("integrated-systems");
        if (location.pathname.includes("/surveillance")) sections.push("surveillance");
        if (location.pathname.includes("/audio-visual")) sections.push("audio-visual");
        if (location.pathname.includes("/fire-systems")) sections.push("fire-systems");

        if (sections.length > 0) {
            setExpandedSections(prev => {
                const newSections = [...prev];
                sections.forEach(s => {
                    if (!newSections.includes(s)) newSections.push(s);
                });
                return newSections;
            });
        }
    }, [location.pathname]);

    const toggleSection = (id: string) => {
        setExpandedSections(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const activeNav = NAVIGATION_DATA.find(n => n.id === activeCategory);
    const headerTitle = activeNav ? `Products / ${activeNav.label}` : "Products";

    const filterNavData = (data: any[], query: string): any[] => {
        if (!query) return data;
        const lowerQuery = query.toLowerCase();

        return data.reduce((acc, item) => {
            const label = typeof item === 'string' ? item : item.label;
            const matches = label.toLowerCase().includes(lowerQuery);
            const sub = typeof item === 'string' ? undefined : item.sub;
            const filteredSub = sub ? filterNavData(sub, query) : undefined;

            if (matches || (filteredSub && filteredSub.length > 0)) {
                if (typeof item === 'string') {
                    acc.push(item);
                } else {
                    acc.push({
                        ...item,
                        sub: filteredSub
                    });
                }
            }
            return acc;
        }, []);
    };

    const displayNavData = filterNavData(NAVIGATION_DATA, searchQuery);

    const sidebarContentJsx = (
        <div className="flex flex-col h-full">

            {/* ── HEADER ── */}
            <div className="px-5 py-4 border-b border-gray-200 bg-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">

                    <span className="text-sm font-bold text-[#1A3263] tracking-tight">
                        {headerTitle}
                    </span>
                </div>
                <button
                    onClick={() => {
                        setIsDesktopOpen(false);
                        setIsMobileOpen(false);
                    }}
                    className="w-8 h-8 bg-[#1A3263] text-white rounded-lg flex items-center justify-center shadow-md shadow-blue-900/20 hover:bg-[#FC3B1F] transition-colors cursor-pointer"
                    title="Close Sidebar"
                >
                    <PanelLeftClose size={15} />
                </button>
            </div>

            {/* ── SEARCH ── */}
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 shrink-0">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#1A3263] transition-colors" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search categories..."
                        className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-[13px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1A3263]/20 focus:border-[#1A3263] transition-all"
                    />
                </div>
            </div>

            {/* ── SCROLLABLE LIST ── */}
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar scroll-smooth min-h-0">
                {displayNavData.map((item) => {
                    const isActive = activeCategory === item.id || (item.id === "access-control" && !activeCategory);
                    const isExpanded = searchQuery ? true : expandedSections.includes(item.id);
                    return (
                        <div key={item.id} className="space-y-0.5">
                            <div className="relative">
                                <div
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 group relative overflow-hidden",
                                        isActive
                                            ? "text-[#FC3B1F] bg-[#FC3B1F]/5 hover:text-white hover:shadow-md"
                                            : "text-gray-600 hover:text-white hover:shadow-md"
                                    )}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#1A3263] to-[#2A4B8D] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

                                    {(() => {
                                        const Icon = item.icon;
                                        return <Icon
                                            size={18}
                                            className={cn(
                                                "shrink-0 transition-colors duration-300",
                                                isActive ? "text-[#FC3B1F] group-hover:text-white" : "text-gray-400 group-hover:text-white"
                                            )}
                                        />;
                                    })()}

                                    <span className={cn(
                                        "flex-1 text-left tracking-tight relative z-10",
                                        item.link && "hover:underline"
                                    )}>
                                        {item.link ? (
                                            <Link to={item.link} className="block w-full">{item.label}</Link>
                                        ) : item.label}
                                    </span>

                                    {item.sub && (
                                        <div
                                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSection(item.id); }}
                                            className="p-1 cursor-pointer relative z-10 flex items-center justify-center rounded-md hover:bg-black/10 transition-colors"
                                        >
                                            <ChevronDown
                                                size={14}
                                                className={cn(
                                                    "transition-transform duration-300",
                                                    isExpanded ? "rotate-180" : ""
                                                )}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {item.sub && isExpanded && (
                                <div className="overflow-hidden">
                                    <div className="pl-6 space-y-1 pt-2 pb-3">
                                        {item.sub.map((subItem: any, idx: number) => {
                                            const SubIcon = subItem.icon || ShieldCheck;
                                            return (
                                                <div key={idx} className="space-y-1">
                                                    <div className="flex items-center justify-between group py-2 px-3 rounded-lg hover:bg-white/60 transition-all duration-200">
                                                        <div className="flex items-center gap-2.5 flex-1">
                                                            <SubIcon size={14} className="text-gray-400 group-hover:text-[#1A3263] transition-colors" />
                                                            {subItem.link ? (
                                                                <Link
                                                                    to={subItem.link}
                                                                    activeProps={{ className: "!text-[#FC3B1F]" }}
                                                                    className="text-[13px] font-semibold text-gray-500 group-hover:text-[#1A3263] transition-colors flex-1 hover:underline"
                                                                >
                                                                    {subItem.label}
                                                                </Link>
                                                            ) : (
                                                                <span className="text-[13px] font-semibold text-gray-500 group-hover:text-[#1A3263] transition-colors">
                                                                    {subItem.label}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {Array.isArray(subItem.sub) && (
                                                            <div
                                                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSection(subItem.label); }}
                                                                className="p-1 cursor-pointer rounded-md hover:bg-gray-200 transition-colors"
                                                            >
                                                                <ChevronDown size={13} className={cn("text-gray-400 transition-transform", (searchQuery ? true : expandedSections.includes(subItem.label)) ? "rotate-180" : "")} />
                                                            </div>
                                                        )}
                                                    </div>

                                                    {Array.isArray(subItem.sub) && (searchQuery ? true : expandedSections.includes(subItem.label)) && (
                                                        <div className="overflow-hidden">
                                                            <div className="pl-6 space-y-1 border-l border-gray-200/80 ml-4 pt-1 pb-1">
                                                                {subItem.sub.map((l3: any, l3idx: number) => {
                                                                    const isL3String = typeof l3 === "string";
                                                                    const l3Label = isL3String ? l3 : l3.label;
                                                                    const l3Link = isL3String ? undefined : l3.link;

                                                                    return (
                                                                        <div key={l3idx} className="space-y-1">
                                                                            <div className="flex items-center justify-between group py-1.5 px-3 rounded-md hover:bg-white/40 transition-all duration-200">
                                                                                {l3Link ? (
                                                                                    <Link
                                                                                        to={l3Link}
                                                                                        activeProps={{ className: "!text-[#FC3B1F]" }}
                                                                                        className="text-xs text-gray-500 font-semibold group-hover:text-[#1A3263] transition-colors flex-1 block"
                                                                                    >
                                                                                        {l3Label}
                                                                                    </Link>
                                                                                ) : (
                                                                                    <span className="text-xs text-gray-400 font-medium group-hover:text-[#1A3263] transition-colors cursor-pointer">
                                                                                        {l3Label}
                                                                                    </span>
                                                                                )}
                                                                                {!isL3String && Array.isArray(l3.sub) && (
                                                                                    <div
                                                                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSection(l3Label); }}
                                                                                        className="p-1 cursor-pointer rounded-md hover:bg-gray-200 transition-colors"
                                                                                    >
                                                                                        <ChevronDown size={11} className={cn("text-gray-300 transition-transform", (searchQuery ? true : expandedSections.includes(l3Label)) ? "rotate-180" : "")} />
                                                                                    </div>
                                                                                )}
                                                                            </div>

                                                                            {!isL3String && Array.isArray(l3.sub) && (searchQuery ? true : expandedSections.includes(l3Label)) && (
                                                                                <div className="overflow-hidden">
                                                                                    <div className="pl-4 space-y-1 border-l-2 border-[#FC3B1F]/20 ml-4 pt-1 mb-2">
                                                                                        {l3.sub.map((l4: any, l4idx: number) => {
                                                                                            const isL4String = typeof l4 === "string";
                                                                                            const l4Label = isL4String ? l4 : l4.label;
                                                                                            const l4Link = isL4String ? undefined : l4.link;

                                                                                            return (
                                                                                                <div key={l4idx}>
                                                                                                    {l4Link ? (
                                                                                                        <Link
                                                                                                            to={l4Link}
                                                                                                            activeProps={{ className: "!text-[#FC3B1F]" }}
                                                                                                            className="block text-[11px] py-1.5 px-3 text-gray-400 hover:text-[#1A3263] hover:bg-white/50 rounded-md transition-all duration-200 font-medium"
                                                                                                        >
                                                                                                            {l4Label}
                                                                                                        </Link>
                                                                                                    ) : (
                                                                                                        <div className="text-[11px] py-1.5 px-3 text-gray-400 hover:text-[#1A3263] cursor-pointer hover:bg-white/50 rounded-md transition-all duration-200 font-medium">
                                                                                                            {l4Label}
                                                                                                        </div>
                                                                                                    )}
                                                                                                </div>
                                                                                            );
                                                                                        })}
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* ── FOOTER (always visible, never scrolls away) ── */}
            <div className="shrink-0 border-t border-gray-200 bg-white">
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
                            {sidebarContentJsx}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* ── DESKTOP SIDEBAR ── */}
            <motion.aside
                initial={false}
                animate={{
                    width: isDesktopOpen ? 288 : 0,
                    opacity: isDesktopOpen ? 1 : 0,
                    borderRightWidth: isDesktopOpen ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="hidden lg:flex flex-col bg-[#F1F3F5] border-gray-200 overflow-hidden shrink-0"
                style={{
                    height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
                    position: "sticky",
                    top: NAVBAR_HEIGHT,
                }}
            >
                <div className="w-72 h-full shrink-0">
                    {sidebarContentJsx}
                </div>
            </motion.aside>

            {/* ── DESKTOP OPEN BUTTON ── */}
            <AnimatePresence>
                {!isDesktopOpen && (
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setIsDesktopOpen(true)}
                        className="hidden lg:flex fixed left-0 z-[60] w-12 h-12 bg-white border border-gray-200 border-l-0 rounded-r-xl shadow-md items-center justify-center hover:bg-gray-50 transition-colors group cursor-pointer"
                        style={{ top: NAVBAR_HEIGHT + 24 }}
                        title="Open Sidebar"
                    >
                        <PanelLeftOpen size={18} className="text-gray-500 group-hover:text-[#FC3B1F] transition-colors" />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}
