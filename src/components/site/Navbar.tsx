import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.avif";

const links = [
  { to: "/", label: "HOME" },
  { to: "/about", label: "ABOUT US" }, // using /about based on common sense mapping
  { to: "/services", label: "SERVICES" },
  { to: "/products", label: "PRODUCTS" },
  { to: "/portfolio", label: "PROJECTS" },
  { to: "/contact", label: "CONTACT" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-[#162332]", // Very dark solid blue to match screenshot precisely
      )}
    >
      <div className="w-full px-20 flex h-20 items-center justify-between">
        {/* Left side (Logo) */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logoImg} alt="Intersys Logo" className="h-14 w-auto object-contain" />

        </Link>

        {/* Center (Links) */}
        <nav className="hidden lg:flex items-center justify-center gap-10 absolute left-1/2 -translate-x-1/2">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[11px] font-medium tracking-widest text-[#8194ad] hover:text-white transition-colors relative group py-2"
              activeProps={{ className: "text-white" }}
            >
              {l.label}
              {/* The active hover line */}
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand-red transition-all duration-300 group-[.active]:w-full group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right (Button) */}
        <div className="hidden lg:flex">
          <Link
            to="/contact"
            className="flex h-9 items-center justify-center rounded-sm bg-gradient-to-r from-[#ff3b3b] to-[#ff6b3b] px-6 text-[10px] uppercase font-bold tracking-wider text-white hover:from-[#e32424] hover:to-[#fa5c2e] transition-colors shadow-lg shadow-[#ff3b3b]/30"
          >
            Get In Touch
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white p-2"
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-navy-deep border-t border-white/10">
          <div className="px-6 py-6 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white py-2 text-sm tracking-widest"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex h-10 items-center justify-center rounded-sm bg-gradient-to-r from-[#ff3b3b] to-[#ff6b3b] px-5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#ff3b3b]/20"
            >
              Request Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
