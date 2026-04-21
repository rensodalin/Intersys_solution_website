import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
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
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "bg-navy-deep/85 backdrop-blur-lg border-b border-white/10" : "bg-transparent",
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-brand-red font-display font-bold">
            IS
          </div>
          <span className="font-display text-lg font-bold tracking-tight">INTERSYS</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors relative group"
              activeProps={{ className: "text-white" }}
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-brand-red transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-brand-red px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-red-glow transition-colors shadow-lg shadow-brand-red/20"
          >
            Get a Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white p-2"
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {open && (
        <div className="lg:hidden bg-navy-deep border-t border-white/10">
          <Container className="py-6 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white py-2"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-brand-red px-5 py-3 text-sm font-semibold text-white"
            >
              Get a Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
