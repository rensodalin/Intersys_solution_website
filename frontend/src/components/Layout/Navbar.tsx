import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, User, ChevronRight, Phone, MapPin, Facebook, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.avif";

type ProductItem = { name: string; href: string };
type AccessControlData = {
  honeywell: ProductItem[];
  salto: ProductItem[];
};

const PRODUCTS_DATA: Record<string, { href: string; sub?: string[] | AccessControlData }> = {
  "Access Control": {
    href: "/products/access-control",
    sub: {
      honeywell: [
        { name: "Accessories", href: "/products/access-control/honeywell/accessories" },
        { name: "Credential", href: "/products/access-control/honeywell/credentials" },
        { name: "Reader & Keypad", href: "/products/access-control/honeywell/readers" },
        { name: "Software", href: "/products/access-control/honeywell/software" },
        { name: "Server", href: "/products/access-control/honeywell/server" },
        { name: "Control Panel Kit", href: "/products/access-control/honeywell/control-panel-kits" },
        { name: "Lobby Kiosk & Touch Screen", href: "/products/access-control/honeywell/lobby-kiosks" },
        { name: "Door Hardware", href: "/products/access-control/honeywell/door-hardware" },
        { name: "Control Panel", href: "/products/access-control/honeywell/control-panels" },
      ],
      salto: [
        { name: "Electronic Locks", href: "/products/access-control/salto" },
        { name: "Electronic Cylinder", href: "/products/access-control/salto" },
        { name: "Electronic Locker Lock", href: "/products/access-control/salto" },
        { name: "Electronic Pad Lock", href: "/products/access-control/salto" },
        { name: "Wall Reader", href: "/products/access-control/salto" },
        { name: "Face Recognition Terminal", href: "/products/access-control/salto" },
        { name: "Access Controller", href: "/products/access-control/salto" },
        { name: "Door Intercom System", href: "/products/access-control/salto" },
        { name: "Motorized Lock", href: "/products/access-control/salto" },
        { name: "Panel Bars & Emergency Exit", href: "/products/access-control/salto" },
        { name: "Mortise Lock", href: "/products/access-control/salto" },
        { name: "Cylindrical Latch Locks", href: "/products/access-control/salto" },
        { name: "Energy Saving Device", href: "/products/access-control/salto" },
        { name: "Peripherals", href: "/products/access-control/salto" },
        { name: "Credential", href: "/products/access-control/salto" },
      ],
    }
  },
  "Surveillance": { href: "/products" },
  "Integrated System": {
    href: "/products",
    sub: [
      "BMS", "Fire Alarm & Life Safety", "VESDA System", "Public Address",
      "Audio Visual (AV)", "Access & Intrusion", "Video Surveillance",
      "Car Parking System", "Leak Detection"
    ]
  },
  "Building Management": { href: "/products" },
  "Audio Visual": { href: "/products" },
  "Fire System": {
    href: "/products",
    sub: ["Esser by Honeywell", "Notifier by Honeywell", "System Sensor"]
  },
};

const CLIENT_CENTER_DATA = [
  { name: "Document Center", href: "/document-center" },
  { name: "Request a Quote", href: "/request-quote" },
  { name: "Technical Tips", href: "/technical-tips" },
  { name: "Warranty", href: "/warranty" }
];
const CONTACT_DATA = [
  { name: "Technical Support / Customer Service", href: "/contact#support" },
  { name: "Contact Us", href: "/contact" }
];

export function Navbar() {
  const location = useLocation();
  const lightPages = ["/products", "/document-center", "/request-quote", "/technical-tips", "/warranty"];
  const isLightPage = lightPages.some(path => location.pathname.startsWith(path));
  const [scrolled, setScrolled] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [hoveredL1, setHoveredL1] = useState<string | null>(null);
  const [hoveredL2, setHoveredL2] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSupport, setActiveSupport] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string, avatar: string } | null>(null);

  useEffect(() => {
    // Check if user is logged in
    fetch("http://localhost:1000/auth/user", {
      credentials: "include" // Important to send cookies
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.user) {
          setUser(data.user);
        }
      })
      .catch(err => console.error("Not logged in", err));

    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenus = () => {
    setShowProducts(false);
    setHoveredL1(null);
    setHoveredL2(null);
    setActiveSupport(null);
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "translate-y-0" : "translate-y-0",
      )}
    >
      <div className="bg-[#0A0F1A] text-white border-t-2 border-red-600 border-b border-white/5 px-6 md:px-20 hidden lg:block">
        <div className="flex justify-between items-center h-12 text-sm">

          {/* LEFT */}
          <div className="flex items-center gap-6">

            <div className="flex items-center gap-2 text-white/70 hover:text-white transition cursor-pointer">
              <Phone size={14} className="text-red-500" />
              <span className="text-xs">+855  077 602 334</span>
            </div>

            <div className="flex items-center gap-2 text-white/70 hover:text-white transition cursor-pointer">
              <MapPin size={14} className="text-red-500" />
              <span className="text-xs">St. 13, Khan Sen Sok, Phnom Penh, Cambodia</span>
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
          ? "h-16 bg-[#0A0F1A]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)]"
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
        <nav className="hidden lg:flex items-center gap-10 h-full">

          <Link to="/about" className="relative h-full flex items-center text-sm font-medium text-white/70 hover:text-red-500 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-red-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center [&.active]:after:scale-x-100 [&.active]:text-red-500">
            About Us
          </Link>

          {/* PRODUCTS CATEGORY */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setShowProducts(true)}
            onMouseLeave={closeMenus}
          >
            <Link
              to="/products"
              className="relative h-full flex items-center text-sm font-medium text-white/70 hover:text-red-500 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-red-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center [&.active]:after:scale-x-100 [&.active]:text-red-500"
            >
              Products
            </Link>

            {showProducts && (
              <div className="absolute top-20 left-0 flex items-start animate-in fade-in slide-in-from-top-2 duration-200">
                {/* L1 Panel */}
                <div className="w-64 bg-[#1A3263] border border-white/10 shadow-2xl">
                  {Object.entries(PRODUCTS_DATA).map(([label, data]) => (
                    <div
                      key={label}
                      onMouseEnter={() => { setHoveredL1(label); setHoveredL2(null); }}
                      className={cn(
                        "group relative flex items-center justify-between px-5 py-4 border-b border-white/5 last:border-0 transition-colors cursor-pointer",
                        hoveredL1 === label ? "bg-red-600 text-white" : "text-white/70 hover:bg-white/5"
                      )}
                    >
                      <Link to={data.href} className="flex-1 text-sm font-medium" onClick={closeMenus}>
                        {label}
                      </Link>
                      {data.sub && <ChevronRight className="w-4 h-4 ml-2 opacity-50" />}
                    </div>
                  ))}
                </div>

                {/* L2 Panel */}
                {hoveredL1 && PRODUCTS_DATA[hoveredL1]?.sub && (
                  <div className="w-64 bg-[#1A3263] border border-white/10 shadow-2xl ml-px">
                    {activeL2Content(hoveredL1, setHoveredL2, hoveredL2, closeMenus)}
                  </div>
                )}

                {/* L3 Panel */}
                {hoveredL2 && hoveredL1 === "Access Control" && (
                  <div className="w-64 bg-[#1A3263] border border-white/10 shadow-2xl ml-px max-h-[500px] overflow-y-auto">
                    {activeL3Content(hoveredL2, closeMenus)}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* CLIENT CENTER */}
          <div className="relative h-full flex items-center" onMouseEnter={() => setActiveSupport("client")} onMouseLeave={closeMenus}>
            <button className="relative h-full flex items-center text-sm font-medium text-white/70 hover:text-red-500 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-red-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center">
              Client Center
            </button>
            {activeSupport === "client" && (
              <div className="absolute top-20 left-0 w-56 bg-[#1A3263] border border-white/10 shadow-2xl">
                {CLIENT_CENTER_DATA.map(item => (
                  <Link key={item.name} to={item.href} onClick={closeMenus} className="block px-5 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5">
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* CONTACT */}
          <div className="relative h-full flex items-center" onMouseEnter={() => setActiveSupport("contact")} onMouseLeave={closeMenus}>
            <button className="relative h-full flex items-center text-sm font-medium text-white/70 hover:text-red-500 transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-red-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center">
              Contact Us
            </button>
            {activeSupport === "contact" && (
              <div className="absolute top-20 left-0 w-64 bg-[#1A3263] border border-white/10 shadow-2xl">
                {CONTACT_DATA.map(item => (
                  <Link key={item.name} to={item.href} onClick={closeMenus} className="block px-5 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5">
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

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-8">
          {user ? (
            <div className="flex items-center gap-3">
              <img src={user.avatar || "https://ui-avatars.com/api/?name=" + user.name} alt={user.name} className="w-8 h-8 rounded-full border border-white/20 shadow-md" referrerPolicy="no-referrer" />
              <span className="text-sm font-medium text-white/90">{user.name}</span>
              <a href="http://localhost:1000/auth/logout" className="text-xs text-red-500 hover:text-red-400 ml-2 font-medium">Logout</a>
            </div>
          ) : (
            <a href="http://localhost:1000/auth/google" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group">
              <User size={16} className="text-red-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Login</span>
            </a>
          )}
          <Link
            to="/request-quote"
            className="flex h-10 items-center justify-center rounded-sm bg-[#C3110C] px-8 text-sm font-medium text-white hover:bg-white hover:text-[#C3110C] transition-all duration-300 shadow-xl shadow-[#C3110C]/20"
          >
            Request Quote
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors">
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#1A3263] border-t border-white/10 max-h-[calc(100vh-80px)] overflow-y-auto pb-10">
          <div className="p-6 space-y-8">
            <div className="space-y-4">
              <p className="text-red-500 font-medium text-xs">Navigation</p>
              <div className="flex flex-col gap-4 text-white">
                <Link to="/products" onClick={() => setMobileOpen(false)}>Products</Link>
                <Link to="/portfolio" onClick={() => setMobileOpen(false)}>Client Center</Link>
                <Link to="/contact" onClick={() => setMobileOpen(false)}>Contact Us</Link>
                <Link to="/about" onClick={() => setMobileOpen(false)}>About Us</Link>
                <Link to="/projects" onClick={() => setMobileOpen(false)}>Projects</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function activeL2Content(hoveredL1: string, setHoveredL2: (s: string | null) => void, hoveredL2: string | null, closeMenus: () => void) {
  const sub = PRODUCTS_DATA[hoveredL1].sub;
  if (!sub) return null;

  if (hoveredL1 === "Access Control") {
    return (
      <>
        <div onMouseEnter={() => setHoveredL2("honeywell")} className="px-5 py-3 text-white/70 hover:bg-white/5 cursor-pointer flex justify-between">
          Honeywell <ChevronRight className="w-4 h-4" />
        </div>
        <div onMouseEnter={() => setHoveredL2("salto")} className="px-5 py-3 text-white/70 hover:bg-white/5 cursor-pointer flex justify-between">
          Salto <ChevronRight className="w-4 h-4" />
        </div>
      </>
    );
  }

  return (sub as string[]).map(item => (
    <Link key={item} to="/products" onClick={closeMenus} className="block px-5 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5">
      {item}
    </Link>
  ));
}

function activeL3Content(hoveredL2: string, closeMenus: () => void) {
  const data = (PRODUCTS_DATA["Access Control"].sub as AccessControlData);
  const items = hoveredL2 === "honeywell" ? data.honeywell : data.salto;

  return items.map(item => (
    <Link key={item.name} to={item.href} onClick={closeMenus} className="block px-5 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5">
      {item.name}
    </Link>
  ));
}
