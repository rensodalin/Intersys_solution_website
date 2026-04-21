import { Link } from "@tanstack/react-router";
import { Container } from "./Container";
import { Linkedin, Twitter, Github, Mail } from "lucide-react";

const cols = [
  {
    title: "Company",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/portfolio", label: "Portfolio" },
      { to: "/contact", label: "Careers" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { to: "/services", label: "Building Management" },
      { to: "/services", label: "Fire & Safety" },
      { to: "/services", label: "Security Systems" },
      { to: "/services", label: "HVAC Automation" },
    ],
  },
  {
    title: "Resources",
    links: [
      { to: "/products", label: "Products" },
      { to: "/portfolio", label: "Case Studies" },
      { to: "/contact", label: "Support" },
      { to: "/contact", label: "Documentation" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white border-t border-white/10">
      <Container className="py-20">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-brand-red font-display font-bold">
                IS
              </div>
              <span className="font-display text-lg font-bold tracking-tight">INTERSYS</span>
            </Link>
            <p className="mt-5 text-sm text-white/60 max-w-sm leading-relaxed">
              Engineering smart, safe, and sustainable buildings through integrated control systems
              and automation.
            </p>
            <div className="mt-6 flex gap-3">
              {[Linkedin, Twitter, Github, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-md border border-white/10 text-white/70 hover:bg-brand-red hover:border-brand-red hover:text-white transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title} className="col-span-6 md:col-span-2 lg:col-span-2">
              <h4 className="font-display text-sm font-bold uppercase tracking-[0.15em] text-white">
                {c.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {c.links.map((l, i) => (
                  <li key={i}>
                    <Link
                      to={l.to}
                      className="text-sm text-white/60 hover:text-brand-red transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-12 md:col-span-12 lg:col-span-2">
            <h4 className="font-display text-sm font-bold uppercase tracking-[0.15em]">Contact</h4>
            <p className="mt-5 text-sm text-white/60 leading-relaxed">
              25 Industrial Boulevard
              <br />
              Suite 400, Tech Park
              <br />
              hello@intersys.io
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Intersys Solutions. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/50">
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <a href="#" className="hover:text-white">
              Cookies
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
