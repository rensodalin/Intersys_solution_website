import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, User, ChevronRight, Phone, Mail, Facebook, Linkedin, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { initializeAuth, logoutSuccess } from "@/store/authSlice";
import logoImg from "@/assets/logo.avif";

const PRODUCTS_DATA: Record<string, { href: string }> = {
  "Access Control": { href: "/products/access-control" },
  "Surveillance": { href: "/products/surveillance" },
  "Integrated System": { href: "/products" },
  "Building Management": { href: "/products/building-management" },
  "Audio Visual": { href: "/products" },
  "Fire System": { href: "/products" },
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

import { AuthModal } from "@/components/Auth/AuthModal";

export function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const lightPages = ["/products", "/document-center", "/request-quote", "/technical-tips", "/warranty", "/services/public-address"];
  const isLightPage = lightPages.some(path => location.pathname.startsWith(path));
  const [scrolled, setScrolled] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSupport, setActiveSupport] = useState<string | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileClientOpen, setMobileClientOpen] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);
  
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:1000";

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/auth/logout`, {
        method: "POST",
        credentials: "include"
      });
      const data = await response.json();
      if (data.success) {
        dispatch(logoutSuccess());
      }
    } catch (err) {
      console.error("Logout failed:", err);
      // Safe local reset regardless of network errors to prevent stale UI state
      dispatch(logoutSuccess());
    }
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

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "translate-y-0" : "translate-y-0",
      )}
    >
      <div className="bg-[#081F3D] text-white border-t-2 border-red-600 border-b border-white/5 px-6 md:px-20 hidden lg:block">
        <div className="flex justify-between items-center h-12 text-sm">

          {/* LEFT */}
          <div className="flex items-center gap-6">
            <a
              href="https://t.me/chun_sochet"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/70 hover:text-white transition cursor-pointer"
            >
              <Phone size={14} className="text-red-500" />
              <span className="text-xs">+855 077 602 334</span>
            </a>

            <div className="flex items-center gap-2 text-white/70 hover:text-white transition cursor-pointer">
              <Mail size={14} className="text-red-500" />
              <a
                href="mailto:sochet@intersys-solutions.com"
                className="text-xs hover:underline"
              >
                sochet@intersys-solutions.com
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            <span className="text-white/40 text-xs mr-2">Follow</span>
            <a href="https://www.facebook.com/IntersysSolutions" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition">
              <Facebook size={16} />
            </a>
            <a href="https://t.me/chun_sochet" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.539.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.195-.054-.285-.346-.094L7.469 14.28l-2.76-.86c-.6-.184-.593-.6.126-.882l10.82-4.172c.504-.191.95.105.81.855z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/intersys-solutions2015" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition">
              <Linkedin size={16} />
            </a>
          </div>

        </div>
      </div>
      <div className={cn(
        "w-full px-6 md:px-20 flex items-center justify-between transition-all duration-500",
        scrolled
          ? "h-16 bg-[#081F3D]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)]"
          : isLightPage ? "h-24 bg-[#0A0F1A]" : "h-24 bg-transparent",
      )}>
        <Link to="/" className="flex items-center transition-transform hover:scale-105 duration-300" onClick={closeMenus}>
          <img
            src={logoImg}
            alt="Intersys Logo"
            className={cn(
              "transition-all duration-500 object-contain",
              scrolled ? "h-10" : "h-14"
            )}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex flex-1 justify-center h-full">
          <nav className="flex items-center gap-8 h-full">

            <Link to="/about" className="relative h-full flex items-center text-sm font-medium text-white/70 hover:text-red-500 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-red-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center [&.active]:after:scale-x-100 [&.active]:text-red-500">
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
                  location.pathname.startsWith("/services") ? "text-red-500 after:scale-x-100" : "text-white/70 hover:text-red-500"
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
              <div
                className={cn(
                  "relative h-full flex items-center text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-red-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center cursor-pointer",
                  location.pathname.startsWith("/products") ? "text-red-500 after:scale-x-100" : "text-white/70 hover:text-red-500"
                )}
              >
                Products
              </div>

              {showProducts && (
                <div className="absolute top-full left-0 pt-2 w-64 bg-[#1A3263] border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                  {Object.entries(PRODUCTS_DATA).map(([label, data]) => (
                    <Link
                      key={label}
                      to={data.href}
                      onClick={closeMenus}
                      className="block px-5 py-3.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* CLIENT CENTER */}
            <div className="relative h-full flex items-center" onMouseEnter={() => setActiveSupport("client")} onMouseLeave={closeMenus}>
              <button
                className={cn(
                  "relative h-full flex items-center text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-red-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center",
                  CLIENT_CENTER_DATA.some(item => location.pathname === item.href) ? "text-red-500 after:scale-x-100" : "text-white/70 hover:text-red-500"
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
                  CONTACT_DATA.some(item => location.pathname === item.href) ? "text-red-500 after:scale-x-100" : "text-white/70 hover:text-red-500"
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

            <Link to="/projects" className="relative h-full flex items-center text-sm font-medium text-white/70 hover:text-red-500 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-red-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center [&.active]:after:scale-x-100 [&.active]:text-red-500">
              Projects
            </Link>
          </nav>
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-8">
          {user ? (
            <div className="flex items-center gap-3">
              <img src={user.avatar || "https://ui-avatars.com/api/?name=" + user.name} alt={user.name} className="w-8 h-8 rounded-full border border-white/20 shadow-md" referrerPolicy="no-referrer" />
              <span className="text-sm font-medium text-white/90">{user.name}</span>
              <button onClick={handleLogout} className="text-xs text-red-500 hover:text-red-400 ml-2 font-medium bg-transparent border-0 cursor-pointer">Logout</button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
            >
              <User size={16} className="text-red-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Login</span>
            </button>
          )}
          <Link
            to="/request-quote"
            className="flex h-10 items-center justify-center rounded-sm bg-[#C3110C] px-8 text-sm font-medium text-white hover:bg-white hover:text-[#C3110C] transition-all duration-300 shadow-xl shadow-[#C3110C]/20"
          >
            Request Quote
          </Link>
        </div>

        {/* Auth Modal */}
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

        {/* Mobile Toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors">
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
                    <img
                      src={user.avatar || "https://ui-avatars.com/api/?name=" + user.name}
                      alt={user.name}
                      className="w-10 h-10 rounded-full border border-white/20"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white leading-none mb-1">{user.name}</p>
                      <button
                        onClick={(e) => {
                          handleLogout(e);
                          setMobileOpen(false);
                        }}
                        className="text-xs text-red-500 hover:underline bg-transparent border-0 cursor-pointer text-left p-0 font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsAuthOpen(true);
                      setMobileOpen(false);
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
                          {Object.entries(PRODUCTS_DATA).map(([label, data]) => (
                            <Link
                              key={label}
                              to={data.href}
                              onClick={() => setMobileOpen(false)}
                              className="block py-2.5 text-xs text-white/70 hover:text-white transition-colors"
                            >
                              {label}
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
