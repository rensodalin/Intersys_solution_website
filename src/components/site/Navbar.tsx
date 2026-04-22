import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.avif";

const links = [
  { to: "/about", label: "ABOUT US", hash: undefined },
  { to: "/", hash: "solutions", label: "SERVICES" },
  { to: "/products", label: "PRODUCTS", hash: undefined },
  { to: "/contact", label: "CONTACT", hash: undefined },
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
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 backdrop-blur-md",
        scrolled
          ? "bg-[#1A3263]/95 border-b border-white/10 shadow-lg"
          : "bg-[#1A3263]/80"
      )}
    >
      <div className="w-full px-6 md:px-20 flex h-20 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logoImg}
            alt="Intersys Logo"
            className="h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              hash={l.hash}
              className="text-[12px] font-bold tracking-widest text-white/70 hover:text-white transition-colors relative group py-2"
              activeProps={{ className: "text-white" }}
            >
              {l.label}

              {/* Red underline */}
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#C3110C] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex">
          <Link
            to="/contact"
            className="flex h-10 items-center justify-center rounded-sm bg-[#C3110C] px-6 text-[11px] uppercase font-bold tracking-wider text-white 
                       hover:bg-[#071321] transition-all duration-300 
                       shadow-lg shadow-[#C3110C]/30 hover:shadow-[#071321]/30 
                       hover:-translate-y-0.5"
          >
            Request Quote
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white p-2"
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-[#1A3263] border-t border-white/10 shadow-xl">
          <div className="px-6 py-6 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                hash={l.hash}
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white py-2 text-sm font-bold tracking-widest border-b border-white/10 last:border-0"
              >
                {l.label}
              </Link>
            ))}

            {/* Mobile CTA */}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 flex h-10 items-center justify-center rounded-sm bg-[#C3110C] px-5 text-xs font-bold uppercase tracking-wider text-white 
                         shadow-lg shadow-[#C3110C]/30 
                         hover:bg-[#071321] transition-all duration-300"
            >
              Request Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}