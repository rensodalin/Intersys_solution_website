import { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, User, ChevronRight, Phone, Mail, Facebook, Linkedin, ChevronDown, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, toSlug } from "@/lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { initializeAuth, logoutSuccess } from "@/store/authSlice";
import logoImg from "@/assets/logo.avif";
import type { NavDataItem, NavDataSubItem } from "@/components/shared/navigationData";
import { useTaxonomy } from "@/hooks/useTaxonomy";
import type { TaxonomySubCategory } from "@/utils/taxonomyApi";
import environment from "@/enviroment/enviroment";

const baseUrl = environment;
const avatarUrl = (url?: string, updatedAt?: string) => {
  if (!url?.startsWith("/")) return url;
  const buster = updatedAt ? `?t=${updatedAt}` : "";
  return `${baseUrl}${url}${buster}`;
};

const CLIENT_CENTER_DATA = [
  { name: "Document Center", href: "/document-center" },
  { name: "Request a Quote", href: "/request-quote" },
  { name: "Technical Tips", href: "/technical-tips" },
  { name: "Warranty", href: "/warranty" }
];
const CONTACT_DATA = [
  { name: "Technical Support / Customer Service", href: "/support" },
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
  const lightPages = ["/products", "/services/public-address"];
  const isLightPage = lightPages.some(path => location.pathname.startsWith(path));
  const isDarkNavPage = ["/document-center", "/my-account"].some(path => location.pathname.startsWith(path));
  const [scrolled, setScrolled] = useState(false);

  const useDarkText = isDarkNavPage && !scrolled;
  const navItemClass = useDarkText ? "text-[#0A0F1A]/80 hover:text-[#D62828]" : "text-white/70 hover:text-red-500";
  const iconClass = useDarkText ? "text-[#0A0F1A]/60 hover:text-[#0A0F1A]" : "text-white/50 hover:text-white";
  const btnClass = useDarkText ? "text-[#0A0F1A] hover:text-[#0A0F1A]/80" : "text-white hover:text-white/80";
  const loginClass = useDarkText ? "text-[#0A0F1A]/80 hover:text-[#0A0F1A]" : "text-white/70 hover:text-white";
  const borderClass = useDarkText ? "border-[#0A0F1A]/20" : "border-white/20";
  const logoFilter = "";
  const [showProducts, setShowProducts] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSupport, setActiveSupport] = useState<string | null>(null);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileClientOpen, setMobileClientOpen] = useState(false);
  

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          : isLightPage ? "h-24 bg-[#0A0F1A]" : "h-24 bg-transparent",
      )}>
        <Link to="/" className="flex items-center transition-transform hover:scale-105 duration-300" onClick={handleLogoClick}>
          <img
            src={logoImg}
            alt="Intersys Logo"
            className={cn(
              "transition-all duration-500 object-contain",
              scrolled ? "h-12" : "h-16",
              logoFilter
            )}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex flex-1 justify-center h-full">
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
                      className="block px-5 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors [&.active]:text-red-500 [&.active]:bg-white/5"
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
                  CLIENT_CENTER_DATA.some(item => location.pathname === item.href) ? "text-red-500 after:scale-x-100" : navItemClass
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
                      className="block px-5 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 [&.active]:text-red-500 [&.active]:bg-white/5"
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
                      className="block px-5 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 [&.active]:text-red-500 [&.active]:bg-white/5"
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
        <div className="hidden lg:flex items-center gap-6">
          {/* Social Links */}
          <div className={cn("flex items-center gap-4 pr-6 border-r", borderClass)}>

            <a href="https://www.facebook.com/IntersysSolutions" target="_blank" rel="noopener noreferrer" className={cn("transition", iconClass)}>
              <Facebook size={16} />
            </a>
            <a href="https://t.me/chun_sochet" target="_blank" rel="noopener noreferrer" className={cn("transition", iconClass)}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.539.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.195-.054-.285-.346-.094L7.469 14.28l-2.76-.86c-.6-.184-.593-.6.126-.882l10.82-4.172c.504-.191.95.105.81.855z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/intersys-solutions2015" target="_blank" rel="noopener noreferrer" className={cn("transition", iconClass)}>
              <Linkedin size={16} />
            </a>
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
                  <div className="fixed inset-0 z-40" onClick={() => setShowLoginDropdown(false)} />
                  <div className="absolute right-0 top-full mt-2 z-50 w-[260px]">
                    {/* Arrow */}
                    <div className="absolute -top-1.5 right-6 w-3 h-3 bg-white border-l border-t border-gray-200 rotate-45" />
                    {/* Card */}
                    <div className="bg-white rounded-sm shadow-2xl border border-gray-200 overflow-hidden">
                      <div className="px-5 pt-4 pb-3 border-b border-gray-100">
                        <p className="text-xs font-semibold text-gray-500 tracking-wide">SIGN IN</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">Use your Google account to securely access your account and services.</p>
                      </div>
                      <div className="p-4">
                        <button
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

        {/* Mobile Toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className={cn("lg:hidden p-2 rounded-full transition-colors", useDarkText ? "text-[#0A0F1A] hover:bg-[#0A0F1A]/10" : "text-white hover:bg-white/10")}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-[#0A0F1A]/95 backdrop-blur-2xl border-t border-white/10 max-h-[calc(100vh-80px)] overflow-y-auto w-full shadow-2xl"
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
                <p className="text-white/40 font-bold uppercase tracking-wider text-[10px]">Navigation</p>
                <div className="flex flex-col gap-1 text-white">

                  {/* About Us */}
                  <Link
                    to="/about"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between py-3 px-4 rounded-sm hover:bg-white/5 text-sm font-medium transition-all"
                  >
                    <span>About Us</span>
                  </Link>

                  {/* Collapsible Services Accordion */}
                  <div className="border-b border-white/5 last:border-0">
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="w-full flex items-center justify-between py-3 px-4 rounded-sm hover:bg-white/5 text-sm font-medium text-left transition-all"
                    >
                      <span>Services</span>
                      <ChevronDown
                        size={16}
                        className={cn("text-white/50 transition-transform duration-300", mobileServicesOpen && "rotate-180")}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-6 pr-4 bg-black/20 rounded-sm"
                        >
                          {SERVICES_DATA.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="block py-2.5 text-xs text-white/70 hover:text-white transition-colors"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Collapsible Products Accordion */}
                  <div className="border-b border-white/5 last:border-0">
                    <button
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      className="w-full flex items-center justify-between py-3 px-4 rounded-sm hover:bg-white/5 text-sm font-medium text-left transition-all"
                    >
                      <span>Products</span>
                      <ChevronDown
                        size={16}
                        className={cn("text-white/50 transition-transform duration-300", mobileProductsOpen && "rotate-180")}
                      />
                    </button>
                        <AnimatePresence>
                          {mobileProductsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pl-6 pr-4 bg-black/20 rounded-sm"
                            >
                              {productsNavData.map((cat) => (
                                <Link
                                  key={cat.id}
                                  to={cat.link}
                                  onClick={() => setMobileOpen(false)}
                                  className="block py-2.5 text-xs text-white/70 hover:text-white transition-colors"
                                >
                                  {cat.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                  </div>

                  {/* Collapsible Client Center Accordion */}
                  <div className="border-b border-white/5 last:border-0">
                    <button
                      onClick={() => setMobileClientOpen(!mobileClientOpen)}
                      className="w-full flex items-center justify-between py-3 px-4 rounded-sm hover:bg-white/5 text-sm font-medium text-left transition-all"
                    >
                      <span>Client Center</span>
                      <ChevronDown
                        size={16}
                        className={cn("text-white/50 transition-transform duration-300", mobileClientOpen && "rotate-180")}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileClientOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-6 pr-4 bg-black/20 rounded-sm"
                        >
                          {CLIENT_CENTER_DATA.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="block py-2.5 text-xs text-white/70 hover:text-white transition-colors"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Projects */}
                  <Link
                    to="/projects"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between py-3 px-4 rounded-sm hover:bg-white/5 text-sm font-medium transition-all"
                  >
                    <span>Projects</span>
                  </Link>

                  {/* Contact Us */}
                  <Link
                    to="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between py-3 px-4 rounded-sm hover:bg-white/5 text-sm font-medium transition-all"
                  >
                    <span>Contact Us</span>
                  </Link>
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
  );
}
