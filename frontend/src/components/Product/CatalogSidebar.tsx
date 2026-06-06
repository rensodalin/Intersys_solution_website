import React, { useState, useMemo } from "react";
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
    Search,
    FileText,
    ArrowRight,
    Package
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useInquiry } from "@/context/InquiryContext";
import { useTaxonomy } from "@/hooks/useTaxonomy";
import type { TaxonomySubCategory } from "@/utils/taxonomyApi";
import { cn, toSlug } from "@/lib/utils";
import logoImg from "@/assets/logo.avif";

interface NavDataItem {
    id: string;
    label: string;
    icon: LucideIcon;
    link: string;
    sub?: NavDataSubItem[];
}

interface NavDataSubItem {
    label: string;
    icon?: LucideIcon;
    link?: string;
    sub?: NavDataSubItem[];
}

interface CatalogSidebarProps {
    activeCategory?: string;
    isDesktopOpen?: boolean;
    setIsDesktopOpen?: (open: boolean) => void;
}

const NAVIGATION_DATA: NavDataItem[] = [
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


import { searchProducts, initSearchIndex, SearchResult } from "@/utils/productSearch";

function TreeViewNode({
    node, depth, isSearching, expandedSections, isPathActive, toggleSection
}: {
    node: NavDataSubItem;
    depth: number;
    isSearching: boolean;
    expandedSections: string[];
    isPathActive: (link: string) => boolean;
    toggleSection: (label: string) => void;
}) {
    const hasChildren = Array.isArray(node.sub) && node.sub.length > 0;
    const isExpanded = isSearching || expandedSections.includes(node.label);
    const Icon = (node as any).icon || (depth === 1 ? ShieldCheck : undefined);

    const fontSize = depth === 1 ? "text-[13px]" : depth === 2 ? "text-xs" : "text-[11px]";
    const fontWeight = depth <= 2 ? "font-semibold" : "font-medium";
    const linkColor = (link: string) => isPathActive(link) ? "text-[#FC3B1F]" : "text-gray-500 group-hover:text-[#1A3263]";
    const padding = depth === 1 ? "py-2 px-3" : "py-1.5 px-3";
    const border = depth >= 2 ? `border-l ${depth === 2 ? "border-gray-200/80" : "border-[#FC3B1F]/20"} ml-${depth >= 3 ? 3 : 4}` : "";
    const chevronSize = depth === 1 ? 13 : 11;

    return (
        <div className="space-y-1">
            <div className={`flex items-center justify-between group ${padding} rounded-lg hover:bg-white/60 transition-all duration-200`}>
                <div className="flex items-center gap-2.5 flex-1">
                    {Icon && <Icon size={14} className="text-gray-400 group-hover:text-[#1A3263] transition-colors shrink-0" />}
                    {node.link && !hasChildren ? (
                        <Link
                            to={node.link}
                            className={`${fontSize} ${fontWeight} transition-colors flex-1 hover:underline ${linkColor(node.link)}`}
                        >
                            {node.label}
                        </Link>
                    ) : (
                        <span
                            onClick={hasChildren ? (e) => { e.preventDefault(); e.stopPropagation(); toggleSection(node.label); } : undefined}
                            className={`${fontSize} ${fontWeight} transition-colors flex-1 ${hasChildren ? "cursor-pointer hover:text-[#1A3263]" : "text-gray-500"} ${node.link && !hasChildren && isPathActive(node.link) ? "text-[#FC3B1F]" : "text-gray-500"}`}
                        >
                            {node.label}
                        </span>
                    )}
                </div>
                {hasChildren && (
                    <div
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSection(node.label); }}
                        className="p-1 cursor-pointer rounded-md hover:bg-gray-200 transition-colors"
                    >
                        <ChevronDown size={chevronSize} className={cn("text-gray-400 transition-transform", isExpanded ? "rotate-180" : "")} />
                    </div>
                )}
            </div>

            {hasChildren && isExpanded && (
                <div className="overflow-hidden">
                    <div className={`pl-${depth <= 1 ? 6 : 4} space-y-1 ${depth >= 2 ? border : ""} ${depth >= 2 ? "pt-1 pb-1" : "pt-2 pb-3"}`}>
                        {node.sub!.map((child, idx) => (
                            <TreeViewNode
                                key={`${child.label}-${idx}`}
                                node={child}
                                depth={depth + 1}
                                isSearching={isSearching}
                                expandedSections={expandedSections}
                                isPathActive={isPathActive}
                                toggleSection={toggleSection}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export function CatalogSidebar({ 
    activeCategory: propActiveCategory,
    isDesktopOpen = true,
    setIsDesktopOpen = () => {}
}: CatalogSidebarProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const { taxonomy } = useTaxonomy();

    const CATEGORY_ICONS: Record<string, LucideIcon> = {
        "access control": ShieldCheck,
        "surveillance": Video,
        "building management": Cpu,
        "integrated systems": Settings,
        "audio visual": Volume2,
        "fire systems": Flame,
    };

    function subCatToNav(sc: TaxonomySubCategory, categorySlug: string, brandSlug: string, parentSlugs: string[] = []): NavDataSubItem {
        const slug = toSlug(sc.name);
        const allSlugs = [...parentSlugs, slug];
        const link = `/products/${categorySlug}/${brandSlug}/${allSlugs.join("/")}`;
        return {
            label: sc.name,
            link,
            sub: sc.children && sc.children.length > 0
                ? sc.children.map(c => subCatToNav(c, categorySlug, brandSlug, allSlugs))
                : undefined,
        };
    }

    // Build navigation entirely from live taxonomy; fall back to hardcoded data when API is unavailable
    const navData = useMemo(() => {
        if (taxonomy.length === 0) return NAVIGATION_DATA;

        return taxonomy.map(t => {
            const slug = toSlug(t.category);
            const iconKey = Object.keys(CATEGORY_ICONS).find(k => t.category.toLowerCase().includes(k));
            const icon = iconKey ? CATEGORY_ICONS[iconKey] : Package;

            const brands = (t.brands || []).map(b => {
                const brandSlug = toSlug(b.name);
                const subItems = (b.subCategories || []).map(sc =>
                    subCatToNav(sc, slug, brandSlug)
                );
                return {
                    label: b.name,
                    link: `/products/${slug}/${brandSlug}`,
                    sub: subItems.length > 0 ? subItems : undefined,
                } as NavDataSubItem;
            });

            return {
                id: slug,
                label: t.category,
                icon,
                link: `/products/${slug}`,
                sub: brands.length > 0 ? brands : undefined,
            };
        });
    }, [taxonomy]);

    // Track scroll to match Navbar's dynamic height
    const [scrolled, setScrolled] = useState(false);

    React.useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const NAVBAR_HEIGHT = scrolled ? 64 : 96;

    const searchParams = new URLSearchParams(location.search);
    const activeFrom = searchParams.get("from");

    // Auto-detect active category from URL or 'from' param (dynamic)
    const activeCategory = useMemo(() => {
        if (propActiveCategory) return propActiveCategory;
        const path = activeFrom || location.pathname;
        const parts = path.split("/").filter(Boolean);
        if (parts[0] === "products" && parts[1]) {
            return parts[1];
        }
        return undefined;
    }, [location.pathname, activeFrom, propActiveCategory]);

    const [expandedSections, setExpandedSections] = useState<string[]>(activeCategory ? [activeCategory] : []);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const { items } = useInquiry();

    // Initialize search index from API on mount
    React.useEffect(() => {
        initSearchIndex();
    }, []);

    // Handle Search
    React.useEffect(() => {
        if (searchQuery.length >= 2) {
            const results = searchProducts(searchQuery);
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    // Auto-expand sections based on URL or search 'from' parameter (dynamic)
    React.useEffect(() => {
        const path = activeFrom || location.pathname;
        const parts = path.split("/").filter(Boolean);
        const sections: string[] = [];

        if (parts[0] === "products" && parts[1]) {
            sections.push(parts[1]);
            if (parts[2]) {
                const cat = taxonomy.find(t => toSlug(t.category) === parts[1]);
                if (cat) {
                    const brand = cat.brands.find(b => toSlug(b.name) === parts[2]);
                    if (brand) sections.push(brand.name);
                }
                // Fallback for hardcoded brand names when taxonomy is empty
                if (taxonomy.length === 0) {
                    if (parts[2] === "honeywell") sections.push("Honeywell Systems");
                    if (parts[2] === "salto") sections.push("SALTO Solutions");
                }
            }
        }

        if (sections.length > 0) {
            setExpandedSections(prev => {
                const newSections = [...prev];
                sections.forEach(s => {
                    if (!newSections.includes(s)) newSections.push(s);
                });
                return newSections;
            });
        }
    }, [location.pathname, taxonomy]);


    const isPathActive = (link?: string) => {
        if (!link || link === "/") return false;
        // 1. Direct match or subpath match
        if (location.pathname.startsWith(link)) return true;
        // 2. Match via search param (for product detail pages)
        if (activeFrom && activeFrom.startsWith(link)) return true;
        return false;
    };

    const toggleSection = (id: string) => {
        setExpandedSections(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const activeNav = navData.find(n => n.id === activeCategory);
    const headerTitle = activeNav ? `Products / ${activeNav.label}` : "Products";

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
                        placeholder="Search products..."
                        className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-[13px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1A3263]/20 focus:border-[#1A3263] transition-all"
                    />
                </div>
            </div>

            {/* ── SEARCH RESULTS ── */}
            <AnimatePresence>
                {searchQuery.length >= 2 && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white border-b border-gray-100 overflow-hidden"
                    >
                        <div className="px-5 py-3">
                            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Search Results ({searchResults.length})</h4>
                            <div className="space-y-2">
                                {searchResults.length > 0 ? (
                                    searchResults.map((result) => (
                                        <Link
                                            key={result.id}
                                            to={result.link}
                                            onClick={() => {
                                                setSearchQuery("");
                                                setIsMobileOpen(false);
                                            }}
                                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-100"
                                        >
                                            <div className="w-10 h-10 rounded bg-[#FBFBFC] border border-gray-100 flex items-center justify-center p-1 overflow-hidden">
                                                <img src={result.image} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-[12px] font-bold text-[#1A3263] truncate group-hover:text-[#FC3B1F] transition-colors">{result.title}</div>
                                                <div className="text-[10px] text-gray-400 font-medium">{result.brand}</div>
                                            </div>
                                            <ChevronRight size={12} className="text-gray-300 group-hover:text-[#FC3B1F] transition-colors" />
                                        </Link>
                                    ))
                                ) : (
                                    <div className="py-4 text-center">
                                        <p className="text-xs text-gray-400 italic">No products found for "{searchQuery}"</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── SCROLLABLE LIST ── */}
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar scroll-smooth min-h-0">
                {navData.map((item) => {
                    const isActive = isPathActive(item.link) || activeCategory === item.id;
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

                                    <span
                                        className={cn(
                                            "flex-1 text-left tracking-tight relative z-10",
                                            item.sub ? "cursor-pointer" : (item.link && "hover:underline")
                                        )}
                                        onClick={item.sub ? (e) => { e.preventDefault(); e.stopPropagation(); toggleSection(item.id); } : undefined}
                                    >
                                        {item.link && !item.sub ? (
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
                                        {item.sub.map((subItem, idx) => (
                                            <TreeViewNode
                                                key={`${subItem.label}-${idx}`}
                                                node={subItem}
                                                depth={1}
                                                isSearching={!!searchQuery}
                                                expandedSections={expandedSections}
                                                isPathActive={isPathActive}
                                                toggleSection={toggleSection}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* ── FOOTER (Dynamic Return to Quote) ── */}
            <div className="shrink-0 border-t border-gray-200 bg-white p-4">
                <AnimatePresence>
                    {items.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                        >
                            <Link
                                to="/request-quote"
                                className="flex items-center justify-center w-full p-4 rounded-sm bg-[#1A3263] hover:bg-[#FC3B1F] text-white transition-all shadow-lg shadow-blue-900/20 group"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold">
                                        Return to Quote
                                    </span>

                                    <ArrowRight
                                        size={16}
                                        className="group-hover:translate-x-1 transition-transform"
                                    />
                                </div>
                            </Link>
                        </motion.div>
                    ) : (
                        <div className="text-center py-2">
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                                Intersys Product Catalog
                            </p>
                        </div>
                    )}
                </AnimatePresence>
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
                className="hidden lg:flex flex-col bg-[#F1F3F5] border-gray-200 overflow-hidden shrink-0 z-40"
                style={{
                    height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
                    position: "fixed",
                    top: NAVBAR_HEIGHT,
                    width: isDesktopOpen ? 288 : 0,
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
