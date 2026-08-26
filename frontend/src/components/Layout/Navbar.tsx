import { useEffect, useState, useMemo, useRef } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Menu, X, User, ChevronRight, Phone, Mail, Facebook, Linkedin, ChevronDown, Package, Search, Info, Wrench, FileText, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, toSlug } from "@/lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { initializeAuth, loginSuccess, logoutSuccess } from "@/store/authSlice";
import logoImg from "@/assets/logo.avif";
import type { NavDataItem, NavDataSubItem } from "@/components/shared/navigationData";
import { useTaxonomy } from "@/hooks/useTaxonomy";
import { searchProducts, initSearchIndex } from "@/utils/productSearch";
import type { TaxonomySubCategory } from "@/utils/taxonomyApi";
import environment from "@/enviroment/enviroment";

const baseUrl = environment;
const avatarUrl = (url?: string, updatedAt?: string) => {
  if (!url?.startsWith("/")) return url;
  const buster = updatedAt ? `?t=${updatedAt}` : "";
  return `${baseUrl}${url}${buster}`;
};

const CLIENT_CENTER_DATA = [
  { name: "Blog", href: "/blog" },
  { name: "Case Study", href: "/insights" },
  { name: "Technical Tips", href: "/technical-tips" },
  { name: "News & Events", href: "/events" }
];
const CONTACT_DATA = [
  { name: "Technical Support / Customer Service", href: "/support" },
  { name: "Request a Quote", href: "/request-quote" },
  { name: "Document Center", href: "/document-center" },
  { name: "Warranty", href: "/warranty" },
  { name: "Contact Us", href: "/contact" }
];

const SERVICES_DATA = [
  { name: "Building Management", href: "/services/building-management" },
  { name: "Fire Alarm System", href: "/services/fire-alarm" },
  { name: "Access Control System", href: "/services/access-control" },
  { name: "Surveillance (CCTV)", href: "/services/surveillance" },
  { name: "Audio Visual (AV) System", href: "/services/audio-visual" },
  { name: "Custom Solution", href: "/services/custom-solution" },
];

export function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const lightPages = ["/products"];
  const isLightPage = lightPages.some(path => location.pathname.startsWith(path));
  const isDarkNavPage = [
    "/document-center",
    "/my-account",
    "/events",
    "/technical-tips/system",
    "/blog",
  ].some(path => location.pathname.startsWith(path)) || location.pathname === "/insights";
  const [scrolled, setScrolled] = useState(false);
  const [heroIsBanner, setHeroIsBanner] = useState(true);

  useEffect(() => {
    const handleHeroBannerChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setHeroIsBanner(!!customEvent.detail?.isBanner);
    };
    window.addEventListener("heroBannerChange", handleHeroBannerChange);
    return () => window.removeEventListener("heroBannerChange", handleHeroBannerChange);
  }, []);

  const useDarkText = (isDarkNavPage || location.pathname === "/") && !scrolled;
  const navItemClass = useDarkText ? "text-[#0A0F1A] font-semibold hover:text-[#D62828]" : "text-white/70 hover:text-red-500";
  const iconClass = useDarkText ? "text-gray-600 hover:text-[#DB1A1A]" : "text-white/50 hover:text-white";
  const btnClass = useDarkText ? "text-[#0A0F1A] font-semibold hover:text-red-600" : "text-white hover:text-white/80";
  const loginClass = useDarkText ? "text-[#0A0F1A] font-semibold hover:text-red-600" : "text-white/70 hover:text-white";
  const borderClass = useDarkText ? "border-[#0A0F1A]/30" : "border-white/20";
  const logoFilter = "";
  const [showProducts, setShowProducts] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSupport, setActiveSupport] = useState<string | null>(null);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileClientOpen, setMobileClientOpen] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);
  const [showCompactDropdown, setShowCompactDropdown] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginGoogleOnly, setLoginGoogleOnly] = useState("");
  const [showProductSearch, setShowProductSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);

  const { taxonomy } = useTaxonomy();

  function subCatToNav(sc: TaxonomySubCategory, categorySlug: string, parentSlugs: string[] = []): NavDataSubItem {
    const slug = toSlug(sc.name);
    const allSlugs = [...parentSlugs, slug];
    const link = `/products/${categorySlug}/${allSlugs.join("/")}`;
    return {
      label: sc.name,
      link,
      sub: sc.children && sc.children.length > 0
        ? sc.children.map(c => subCatToNav(c, categorySlug, allSlugs))
        : undefined,
    };
  }

  const productsNavData = useMemo((): NavDataItem[] => {
    return taxonomy.map(t => {
      const slug = toSlug(t.category);
      const subItems = (t.subCategories || []).map(sc => subCatToNav(sc, slug));
      return {
        id: slug,
        label: t.category,
        icon: Package,
        link: `/products/${slug}`,
        sub: subItems.length > 0 ? subItems : undefined,
      } as NavDataItem;
    });
  }, [taxonomy]);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await fetch(`${baseUrl}/auth/logout`, {
        method: "POST",
        credentials: "include"
      });
    } catch (err) {
      console.error("Logout failed:", err);
    }
    window.location.href = "/";
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    setLoginGoogleOnly("");
    try {
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        dispatch(loginSuccess(data.user));
        setShowLoginDropdown(false);
        setLoginEmail("");
        setLoginPassword("");
        if (data.user.isAdmin) {
          navigate({ to: "/admin" });
        }
      } else if (data.googleOnly) {
        setLoginGoogleOnly(data.message || "This email uses Google sign-in.");
        setLoginError("");
      } else {
        setLoginError(data.message || "Invalid email or password");
      }
    } catch {
      setLoginError("Failed to connect to server");
    } finally {
      setLoginLoading(false);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const prevUser = useRef(user);
  useEffect(() => {
    if (!prevUser.current && user?.isAdmin) {
      navigate({ to: "/admin" });
    }
    prevUser.current = user;
  }, [user]);

  useEffect(() => {
    initSearchIndex();
  }, []);

  useEffect(() => {
    if (searchQuery.length >= 1) {
      setSearching(true);
      searchProducts(searchQuery).then(results => {
        setSearchResults(results);
        setSearching(false);
      });
    } else {
      setSearchResults([]);
      setSearching(false);
    }
  }, [searchQuery]);

  const closeMenus = () => {
    setShowProducts(false);
    setShowServices(false);
    setActiveSupport(null);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    closeMenus();
    if (location.pathname === "/") {
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled ? "translate-y-0" : "translate-y-0",
        )}
      >

        <div className={cn(
          "w-full px-6 md:px-20 flex items-center justify-between transition-all duration-500",
          scrolled
            ? "h-16 bg-[#081F3D]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)]"
            : isLightPage ? "h-16 bg-[#081F3D]" : "h-24 bg-transparent",
        )}>
          <Link to="/" className="flex items-center transition-transform hover:scale-105 duration-300" onClick={handleLogoClick}>
            <img
              src={logoImg}
              alt="Intersys Logo"
              className={cn(
                "transition-all duration-500 object-contain",
                scrolled || isLightPage ? "h-12" : "h-16",
                logoFilter
              )}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden min-[1000px]:flex flex-1 justify-center h-full">
            <nav className="flex items-center gap-8 h-full">

              <Link to="/about" className={cn("relative h-full flex items-center text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-red-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center [&.active]:after:scale-x-100 [&.active]:text-red-500", navItemClass)}>
                About Us
              </Link>

              {/* SERVICES CATEGORY */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setShowServices(true)}
                onMouseLeave={closeMenus}
              >
                <div
                  className={cn(
                    "relative h-full flex items-center text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-red-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center cursor-pointer",
                    location.pathname.startsWith("/services") ? "text-red-500 after:scale-x-100" : navItemClass
                  )}
                >
                  Services
                </div>

                {showServices && (
                  <div className="absolute top-full left-0 pt-2 w-64 bg-[#1A3263] border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                    {SERVICES_DATA.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={closeMenus}
                        className="block px-5 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors [&.active]:text-[#BFC6C4] [&.active]:font-bold [&.active]:bg-white/10"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* PRODUCTS CATEGORY */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => setShowProducts(true)}
                onMouseLeave={closeMenus}
              >
                <Link
                  to="/products"
                  className={cn(
                    "relative h-full flex items-center text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-red-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center",
                    location.pathname.startsWith("/products") ? "text-red-500 after:scale-x-100" : navItemClass
                  )}
                >
                  Products
                </Link>

                {showProducts && productsNavData.length > 0 && (
                  <div className="absolute top-full left-0 pt-2 w-64 bg-[#1A3263] border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                    {productsNavData.map((cat) => {
                      const hasSub = cat.sub && cat.sub.length > 0;
                      return (
                        <div key={cat.id} className="relative group/menu">
                          <Link
                            to={cat.link}
                            onClick={closeMenus}
                            className="flex items-center justify-between px-5 py-3.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                          >
                            <span>{cat.label}</span>
                            {hasSub && <ChevronRight size={14} className="text-white/40" />}
                          </Link>
                          {hasSub && (
                            <div className="absolute left-full top-0 pl-2 hidden group-hover/menu:block min-w-56">
                              <div className="bg-[#1A3263] border border-white/10 shadow-2xl animate-in fade-in duration-150">
                                {cat.sub!.map((sub) => {
                                  const hasSubSub = sub.sub && sub.sub.length > 0;
                                  return (
                                    <div key={sub.label} className="relative group/sub">
                                      <Link
                                        to={sub.link}
                                        onClick={closeMenus}
                                        className="flex items-center justify-between px-5 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                                      >
                                        <span>{sub.label}</span>
                                        {hasSubSub && <ChevronRight size={14} className="text-white/40" />}
                                      </Link>
                                      {hasSubSub && (
                                        <div className="absolute left-full top-0 pl-2 hidden group-hover/sub:block min-w-48">
                                          <div className="bg-[#1A3263] border border-white/10 shadow-2xl animate-in fade-in duration-150">
                                            {sub.sub!.map((gc) => (
                                              <Link
                                                key={gc.label}
                                                to={gc.link}
                                                onClick={closeMenus}
                                                className="block px-5 py-2.5 text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                                              >
                                                {gc.label}
                                              </Link>
                                            ))}
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
                )}
              </div>

              {/* CLIENT CENTER */}
              <div className="relative h-full flex items-center" onMouseEnter={() => setActiveSupport("client")} onMouseLeave={closeMenus}>
                <button
                  className={cn(
                    "relative h-full flex items-center text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-red-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center",
                    CLIENT_CENTER_DATA.some(item => location.pathname === item.href || ((item.href === "/events" || item.href === "/insights" || item.href === "/blog") && location.pathname.startsWith(item.href))) ? "text-red-500 after:scale-x-100" : navItemClass
                  )}
                >
                  Client Center
                </button>
                {activeSupport === "client" && (
                  <div className="absolute top-full left-0 pt-2 w-56 bg-[#1A3263] border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                    {CLIENT_CENTER_DATA.map(item => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={closeMenus}
                        className="block px-5 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 [&.active]:text-[#BFC6C4] [&.active]:font-bold [&.active]:bg-white/10"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* CONTACT */}
              <div className="relative h-full flex items-center" onMouseEnter={() => setActiveSupport("contact")} onMouseLeave={closeMenus}>
                <button
                  className={cn(
                    "relative h-full flex items-center text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-red-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center",
                    CONTACT_DATA.some(item => location.pathname === item.href) ? "text-red-500 after:scale-x-100" : navItemClass
                  )}
                >
                  Contact Us
                </button>
                {activeSupport === "contact" && (
                  <div className="absolute top-full left-0 pt-2 w-64 bg-[#1A3263] border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                    {CONTACT_DATA.map(item => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={closeMenus}
                        className="block px-5 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 [&.active]:text-[#BFC6C4] [&.active]:font-bold [&.active]:bg-white/10"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/projects" className={cn("relative h-full flex items-center text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-red-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center [&.active]:after:scale-x-100 [&.active]:text-red-500", navItemClass)}>
                Projects
              </Link>
            </nav>
          </div>

          {/* Actions */}
          <div className="hidden min-[1301px]:flex items-center gap-6">
            {/* Social Links */}
            <div className={cn("flex items-center gap-4 pr-6 border-r", borderClass)}>

              <a
                href="https://www.facebook.com/IntersysSolutions"
                target="_blank"
                rel="noopener noreferrer"
                className={cn("transition hover:scale-110", iconClass)}
                title="Facebook"
              >
                <Facebook size={16} />
              </a>

              <a
                href="https://t.me/chun_sochet"
                target="_blank"
                rel="noopener noreferrer"
                className={cn("transition hover:scale-110", iconClass)}
                title="Telegram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.539.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.195-.054-.285-.346-.094L7.469 14.28l-2.76-.86c-.6-.184-.593-.6.126-.882l10.82-4.172c.504-.191.95.105.81.855z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/company/intersys-solutions2015"
                target="_blank"
                rel="noopener noreferrer"
                className={cn("transition hover:scale-110", iconClass)}
                title="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>

            <div className="relative hidden md:block">
              {showProductSearch ? (
                <div className="flex items-center">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && searchResults[0]) { setSearchResults([]); navigate({ to: searchResults[0].link }); } }}
                    onBlur={() => setTimeout(() => { if (!searchQuery) setShowProductSearch(false); }, 200)}
                    placeholder="Search products..."
                    className="w-48 bg-white/10 border border-white/20 rounded-full pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500/50 transition-all"
                    autoFocus
                  />
                  {searchQuery.length >= 1 && (searchResults.length > 0 || searching) && (
                    <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden z-50 max-h-[60vh] overflow-y-auto">
                      {searching ? (
                        <div className="p-4 text-center">
                          <p className="text-xs text-gray-400 italic">Searching...</p>
                        </div>
                      ) : searchResults.length > 0 ? (
                        searchResults.map((result: any) => (
                          <Link
                            key={result.id}
                            to={result.link}
                            onClick={() => { setShowProductSearch(false); setSearchResults([]); }}
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors group"
                          >
                            <div className="w-8 h-8 rounded bg-[#FBFBFC] border border-gray-100 flex items-center justify-center p-1 overflow-hidden shrink-0">
                              <img src={result.image} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[13px] font-semibold text-[#1A3263] truncate group-hover:text-[#FC3B1F] transition-colors">
                                {result.title}
                              </div>
                              {result.matchedPartCodes?.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-0.5">
                                  {result.matchedPartCodes.map((code: string, i: number) => (
                                    <span key={i} className="text-[9px] bg-orange-100 text-orange-700 font-mono px-1.5 rounded">{code}</span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="p-4 text-center">
                          <p className="text-xs text-gray-400 italic">No products found for "{searchQuery}"</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowProductSearch(true)}
                  className={cn("transition p-1.5 rounded-md hover:bg-white/10", iconClass)}
                  title="Search products"
                >
                  <Search size={18} />
                </button>
              )}
            </div>

            {user ? (
              <div className="flex items-center gap-3">
                <Link to={user.isAdmin ? "/admin" : "/my-account"} className="flex items-center gap-2 group">
                  {user.avatar ? (
                    <img
                      src={avatarUrl(user.avatar, user?.updatedAt)}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border border-white/20 shadow-md group-hover:border-red-500 transition-colors object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full border border-white/20 shadow-md group-hover:border-red-500 transition-colors bg-red-600 flex items-center justify-center text-white text-xs font-bold leading-none">
                      {(user.firstName?.[0] || user.name?.[0] || "?").toUpperCase()}
                    </div>
                  )}
                  <span className={cn("text-xs font-semibold hidden md:inline group-hover:text-red-500 transition-colors", loginClass)}>
                    {user.firstName || user.name?.split(" ")[0] || ""}
                  </span>
                </Link>
                <button onClick={handleLogout} className={cn("text-xs font-medium bg-transparent border-0 cursor-pointer", btnClass)}>Logout</button>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
                >
                  <span className={cn("text-sm font-medium", loginClass)}>Login</span>
                </button>

                {showLoginDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => { setShowLoginDropdown(false); setLoginError(""); setLoginGoogleOnly(""); }} />
                    <div className="absolute right-0 top-full mt-2 z-50 w-[280px]">
                      <div className="absolute -top-1.5 right-6 w-3 h-3 bg-white border-l border-t border-gray-200 rotate-45" />
                      <div className="bg-white rounded-sm shadow-2xl border border-gray-200 overflow-hidden">
                        <div className="px-5 pt-4 pb-3 border-b border-gray-100">
                          <p className="text-xs font-semibold text-gray-500 tracking-wide">SIGN IN</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">Sign in with your email or continue with Google.</p>
                        </div>
                        <form onSubmit={handleEmailLogin} className="p-4 space-y-3">
                          <div>
                            <input
                              type="email"
                              value={loginEmail}
                              onChange={(e) => setLoginEmail(e.target.value)}
                              placeholder="Email address"
                              required
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-sm focus:border-black focus:ring-1 focus:ring-black/10 outline-none transition-all"
                            />
                          </div>
                          <div>
                            <input
                              type="password"
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              placeholder="Password"
                              required
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-sm focus:border-black focus:ring-1 focus:ring-black/10 outline-none transition-all"
                            />
                          </div>
                          {loginGoogleOnly ? (
                            <div className="space-y-3">
                              <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-sm px-3 py-2">{loginGoogleOnly}</p>
                              <button
                                type="button"
                                onClick={() => {
                                  const baseUrl = environment;
                                  const currentUrl = window.location.href;
                                  window.location.href = `${baseUrl}/auth/google?redirect=${encodeURIComponent(currentUrl)}`;
                                }}
                                className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-sm px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all group"
                              >
                                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.29.81-.55z" fill="#FBBC05" />
                                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <span>Continue with Google</span>
                              </button>
                            </div>
                          ) : (
                            <>
                              {loginError && (
                                <p className="text-[11px] text-red-600">{loginError}</p>
                              )}
                              <button
                                type="submit"
                                disabled={loginLoading || !loginEmail || !loginPassword}
                                className="w-full bg-black text-white text-sm font-medium py-2.5 rounded-sm hover:bg-gray-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                              >
                                {loginLoading ? (
                                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                  </svg>
                                ) : "Sign In"}
                              </button>
                              <div className="relative my-2">
                                <div className="absolute inset-0 flex items-center">
                                  <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-[10px]">
                                  <span className="bg-white px-2 text-gray-400">OR</span>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const baseUrl = environment;
                                  const currentUrl = window.location.href;
                                  window.location.href = `${baseUrl}/auth/google?redirect=${encodeURIComponent(currentUrl)}`;
                                }}
                                className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-sm px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all group"
                              >
                                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.29.81-.55z" fill="#FBBC05" />
                                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <span>Continue with Google</span>
                              </button>
                            </>
                          )}
                        </form>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
            <Link
              to="/request-quote"
              className="flex h-10 items-center justify-center rounded-sm bg-[#C3110C] px-8 text-sm font-medium text-white hover:bg-white hover:text-[#C3110C] transition-all duration-300 shadow-xl shadow-[#C3110C]/20"
            >
              Request Quote
            </Link>
          </div>

          {/* Compact Extras - 1000px to 1023px */}
          <div className="hidden min-[1000px]:max-[1300px]:flex items-center gap-1">
            <div className="relative">
              <button
                onClick={() => setShowProductSearch(true)}
                className={cn("flex items-center justify-center min-w-[44px] min-h-[44px] rounded-md transition-colors", useDarkText ? "text-[#0A0F1A] hover:bg-[#0A0F1A]/10" : "text-white hover:bg-white/10")}
                title="Search products"
              >
                <Search size={18} />
              </button>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowCompactDropdown(!showCompactDropdown)}
                className={cn("flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full transition-colors", useDarkText ? "text-[#0A0F1A] hover:bg-[#0A0F1A]/10" : "text-white hover:bg-white/10")}
                aria-label="More actions"
              >
                {showCompactDropdown ? <X size={20} /> : <Menu size={20} />}
              </button>
              {showCompactDropdown && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setShowCompactDropdown(false)} />
                  <div className="absolute right-0 top-full mt-2 z-40 w-52 bg-[#1A3263] border border-white/10 shadow-2xl">
                    <div className="p-4 border-b border-white/10">
                      <p className="text-white/50 text-[10px] uppercase tracking-wider font-bold mb-3">Follow Us</p>
                      <div className="flex items-center justify-center gap-5">
                        <a href="https://www.facebook.com/IntersysSolutions" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" title="Facebook"><Facebook size={18} /></a>
                        <a href="https://t.me/chun_sochet" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" title="Telegram">
                          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.539.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.195-.054-.285-.346-.094L7.469 14.28l-2.76-.86c-.6-.184-.593-.6.126-.882l10.82-4.172c.504-.191.95.105.81.855z" /></svg>
                        </a>
                        <a href="https://www.linkedin.com/company/intersys-solutions2015" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" title="LinkedIn"><Linkedin size={18} /></a>
                      </div>
                    </div>
                    <Link to="/request-quote" onClick={() => setShowCompactDropdown(false)} className="flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium text-white bg-[#C3110C] hover:bg-red-700 transition-colors">Request Quote</Link>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="max-[999px]:flex hidden items-center gap-1">
            <div className="relative">
              {showProductSearch ? (
                <div className="flex items-center">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && searchResults[0]) { setSearchResults([]); navigate({ to: searchResults[0].link }); } }}
                    onBlur={() => setTimeout(() => { if (!searchQuery) setShowProductSearch(false); }, 200)}
                    placeholder="Search products..."
                    className="w-40 bg-white/10 border border-white/20 rounded-full pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500/50 transition-all"
                    autoFocus
                  />
                  {searchQuery.length >= 1 && (searchResults.length > 0 || searching) && (
                    <div className="absolute top-full right-0 mt-2 w-72 bg-[#0A0F1A] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 max-h-[50vh] overflow-y-auto">
                      {searching ? (
                        <div className="p-4 text-center">
                          <p className="text-xs text-white/40 italic">Searching...</p>
                        </div>
                      ) : searchResults.length > 0 ? (
                        searchResults.map((result: any) => (
                          <Link
                            key={result.id}
                            to={result.link}
                            onClick={() => { setShowProductSearch(false); setSearchResults([]); setMobileOpen(false); }}
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors group"
                          >
                            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center p-1 overflow-hidden shrink-0">
                              <img src={result.image} alt="" className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[13px] font-semibold text-white truncate group-hover:text-red-400 transition-colors">
                                {result.title}
                              </div>
                              {result.matchedPartCodes?.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-0.5">
                                  {result.matchedPartCodes.map((code: string, i: number) => (
                                    <span key={i} className="text-[9px] bg-orange-500/20 text-orange-300 font-mono px-1.5 rounded">{code}</span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="p-4 text-center">
                          <p className="text-xs text-white/40 italic">No products found</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowProductSearch(true)}
                  className={cn("p-2 rounded-md transition-colors", useDarkText ? "text-[#0A0F1A] hover:bg-[#0A0F1A]/10" : "text-white hover:bg-white/10")}
                  title="Search products"
                >
                  <Search size={18} />
                </button>
              )}
            </div>
            <button onClick={() => setMobileOpen(!mobileOpen)} className={cn("p-2 rounded-full transition-colors", useDarkText ? "text-[#0A0F1A] hover:bg-[#0A0F1A]/10" : "text-white hover:bg-white/10")}>
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="max-[999px]:block hidden bg-[#0A0F1A]/95 backdrop-blur-2xl border-t border-white/10 max-h-[calc(100vh-80px)] overflow-y-auto w-full shadow-2xl"
            >
              <div className="p-6 space-y-6">
                {/* User Account Section */}
                <div className="space-y-3">
                  <p className="text-white/40 font-bold uppercase tracking-wider text-[10px]">Account</p>
                  {user ? (
                    <div className="flex items-center gap-3 bg-white/5 p-4 rounded-sm border border-white/5">
                      <Link
                        to={user.isAdmin ? "/admin" : "/my-account"}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 flex-1"
                      >
                        {user.avatar ? (
                          <img
                            src={avatarUrl(user.avatar, user?.updatedAt)}
                            alt={user.name}
                            className="w-10 h-10 rounded-full border border-white/20 object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full border border-white/20 bg-red-600 flex items-center justify-center text-white text-sm font-bold leading-none">
                            {(user.firstName?.[0] || user.name?.[0] || "?").toUpperCase()}
                          </div>
                        )}
                        <div className="text-left">
                          <span className="text-sm font-bold text-white hover:text-red-500 transition-colors block">
                            {user.firstName || user.name?.split(" ")[0] || ""}
                          </span>
                          <span className="text-[10px] text-white/50 block">
                            {user.isAdmin ? "Admin Dashboard" : "View Profile"}
                          </span>
                        </div>
                      </Link>
                      <button
                        onClick={(e) => {
                          handleLogout(e);
                          setMobileOpen(false);
                        }}
                        className="text-xs text-red-500 hover:text-red-400 font-bold bg-transparent border-0 cursor-pointer p-2 rounded-sm hover:bg-white/5 transition"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        const baseUrl = environment;
                        const currentUrl = window.location.href;
                        window.location.href = `${baseUrl}/auth/google?redirect=${encodeURIComponent(currentUrl)}`;
                      }}
                      className="w-full flex items-center justify-between bg-white/5 hover:bg-white/10 p-4 rounded-sm border border-white/5 group transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <User size={18} className="text-red-500" />
                        <span className="text-sm font-semibold text-white">Login / Register</span>
                      </div>
                      <ChevronRight size={16} className="text-white/40 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>



                {/* Navigation Links */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-white/40 font-bold uppercase tracking-wider text-[10px]">Navigation</p>
                  </div>

                  <div className="flex flex-col gap-2.5 text-white">

                    {/* About Us */}
                    <Link
                      to="/about"
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-3 px-4 rounded-xl text-sm font-medium transition-all group border",
                        location.pathname === "/about"
                          ? "bg-white/15 border-white/20 text-white font-semibold shadow-sm"
                          : "bg-white/[0.03] border-white/5 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/10"
                      )}
                    >
                      <span>About Us</span>
                      <ChevronRight size={14} className={cn("transition-transform group-hover:translate-x-0.5", location.pathname === "/about" ? "text-white/80" : "text-white/30")} />
                    </Link>

                    {/* Collapsible Services Accordion */}
                    <div className={cn("rounded-xl border transition-all overflow-hidden", mobileServicesOpen ? "bg-white/[0.08] border-white/20" : "bg-white/[0.03] border-white/5")}>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="w-full flex items-center justify-between py-3 px-4 text-sm font-medium text-left transition-all"
                      >
                        <span className={cn(location.pathname.startsWith("/services") && "font-semibold text-white")}>Services</span>
                        <ChevronDown
                          size={16}
                          className={cn("text-white/40 transition-transform duration-300", mobileServicesOpen && "rotate-180 text-white/90")}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 pl-4 pr-3 py-2 border-l-2 border-white/20 space-y-1 my-1">
                              {SERVICES_DATA.map((item) => {
                                const isActive = location.pathname === item.href;
                                return (
                                  <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={cn(
                                      "flex items-center justify-between py-2.5 px-3 rounded-lg text-xs font-medium transition-all group/sub",
                                      isActive
                                        ? "text-white font-semibold bg-white/15 border border-white/20 shadow-sm"
                                        : "text-white/70 hover:text-white hover:bg-white/10"
                                    )}
                                  >
                                    <span>{item.name}</span>
                                    <ChevronRight size={12} className={cn("transition-transform group-hover/sub:translate-x-0.5", isActive ? "text-white/80" : "text-white/20")} />
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Collapsible Products Accordion */}
                    <div className={cn("rounded-xl border transition-all overflow-hidden", mobileProductsOpen ? "bg-white/[0.08] border-white/20" : "bg-white/[0.03] border-white/5")}>
                      <div className="w-full flex items-center justify-between py-3 px-4 text-sm font-medium text-left transition-all">
                        <Link
                          to="/products"
                          onClick={() => setMobileOpen(false)}
                          className={cn("flex-1 text-white hover:text-red-400 transition-colors", location.pathname.startsWith("/products") && "font-semibold text-white")}
                        >
                          Products
                        </Link>
                        <button
                          onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                          className="p-1 -mr-1 text-white/50 hover:text-white transition-colors"
                          aria-label="Toggle Products Menu"
                        >
                          <ChevronDown
                            size={16}
                            className={cn("transition-transform duration-300", mobileProductsOpen && "rotate-180 text-white/90")}
                          />
                        </button>
                      </div>
                      <AnimatePresence>
                        {mobileProductsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 pl-4 pr-3 py-2 border-l-2 border-white/20 space-y-1 my-1">
                              {productsNavData.map((cat) => {
                                const isActive = location.pathname.startsWith(cat.link);
                                return (
                                  <Link
                                    key={cat.id}
                                    to={cat.link}
                                    onClick={() => setMobileOpen(false)}
                                    className={cn(
                                      "flex items-center justify-between py-2.5 px-3 rounded-lg text-xs font-medium transition-all group/sub",
                                      isActive
                                        ? "text-white font-semibold bg-white/15 border border-white/20 shadow-sm"
                                        : "text-white/70 hover:text-white hover:bg-white/10"
                                    )}
                                  >
                                    <span>{cat.label}</span>
                                    <ChevronRight size={12} className={cn("transition-transform group-hover/sub:translate-x-0.5", isActive ? "text-white/80" : "text-white/20")} />
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Collapsible Client Center Accordion */}
                    <div className={cn("rounded-xl border transition-all overflow-hidden", mobileClientOpen ? "bg-white/[0.08] border-white/20" : "bg-white/[0.03] border-white/5")}>
                      <button
                        onClick={() => setMobileClientOpen(!mobileClientOpen)}
                        className="w-full flex items-center justify-between py-3 px-4 text-sm font-medium text-left transition-all"
                      >
                        <span className={cn(CLIENT_CENTER_DATA.some(item => location.pathname === item.href || ((item.href === "/events" || item.href === "/insights" || item.href === "/blog") && location.pathname.startsWith(item.href))) && "font-semibold text-white")}>Client Center</span>
                        <ChevronDown
                          size={16}
                          className={cn("text-white/40 transition-transform duration-300", mobileClientOpen && "rotate-180 text-white/90")}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileClientOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 pl-4 pr-3 py-2 border-l-2 border-white/20 space-y-1 my-1">
                              {CLIENT_CENTER_DATA.map((item) => {
                                const isActive = location.pathname === item.href;
                                return (
                                  <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={cn(
                                      "flex items-center justify-between py-2.5 px-3 rounded-lg text-xs font-medium transition-all group/sub",
                                      isActive
                                        ? "text-white font-semibold bg-white/15 border border-white/20 shadow-sm"
                                        : "text-white/70 hover:text-white hover:bg-white/10"
                                    )}
                                  >
                                    <span>{item.name}</span>
                                    <ChevronRight size={12} className={cn("transition-transform group-hover/sub:translate-x-0.5", isActive ? "text-white/80" : "text-white/20")} />
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Projects */}
                    <Link
                      to="/projects"
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-3 px-4 rounded-xl text-sm font-medium transition-all group border",
                        location.pathname === "/projects"
                          ? "bg-white/15 border-white/20 text-white font-semibold shadow-sm"
                          : "bg-white/[0.03] border-white/5 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/10"
                      )}
                    >
                      <span>Projects</span>
                      <ChevronRight size={14} className={cn("transition-transform group-hover:translate-x-0.5", location.pathname === "/projects" ? "text-white/80" : "text-white/30")} />
                    </Link>

                    {/* Collapsible Contact Us Accordion */}
                    <div className={cn("rounded-xl border transition-all overflow-hidden", mobileContactOpen ? "bg-white/[0.08] border-white/20" : "bg-white/[0.03] border-white/5")}>
                      <button
                        onClick={() => setMobileContactOpen(!mobileContactOpen)}
                        className="w-full flex items-center justify-between py-3 px-4 text-sm font-medium text-left transition-all"
                      >
                        <span className={cn(CONTACT_DATA.some(item => location.pathname === item.href) && "font-semibold text-white")}>Contact Us</span>
                        <ChevronDown
                          size={16}
                          className={cn("text-white/40 transition-transform duration-300", mobileContactOpen && "rotate-180 text-white/90")}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileContactOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 pl-4 pr-3 py-2 border-l-2 border-white/20 space-y-1 my-1">
                              {CONTACT_DATA.map((item) => {
                                const isActive = location.pathname === item.href;
                                return (
                                  <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={cn(
                                      "flex items-center justify-between py-2.5 px-3 rounded-lg text-xs font-medium transition-all group/sub",
                                      isActive
                                        ? "text-white font-semibold bg-white/15 border border-white/20 shadow-sm"
                                        : "text-white/70 hover:text-white hover:bg-white/10"
                                    )}
                                  >
                                    <span>{item.name}</span>
                                    <ChevronRight size={12} className={cn("transition-transform group-hover/sub:translate-x-0.5", isActive ? "text-white/80" : "text-white/20")} />
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>
                </div>

                {/* Request Quote Button */}
                <div className="pt-4 border-t border-white/10">
                  <Link
                    to="/request-quote"
                    onClick={() => setMobileOpen(false)}
                    className="flex h-12 items-center justify-center rounded-sm bg-[#C3110C] text-sm font-bold text-white hover:bg-red-700 transition-all duration-300 shadow-lg shadow-red-600/20 w-full"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}


