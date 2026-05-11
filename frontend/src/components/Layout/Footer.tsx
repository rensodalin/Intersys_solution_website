import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  Youtube
} from "lucide-react";

import { Container } from "@/components/Common/Container";
import logoImg from "@/assets/logo.avif";

export function Footer({ isCompact }: { isCompact?: boolean }) {
  if (isCompact) {
    return (
      <footer className="border-t border-white/5 bg-[#0C2C55] py-6 text-white">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[11px] text-white/30 tracking-wide">
              Copyright © {new Date().getFullYear()} Intersys Solutions Co., Ltd. | intersys-solutions.com
            </p>
            <div className="flex gap-6 text-[11px] font-medium text-white/40">
              <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </Container>
      </footer>
    );
  }

  return (
    <footer className="relative bg-[#0C2C55] text-white overflow-hidden">
      
      {/* ─── BACKGROUND WATERMARK ─── */}
      <div className="absolute -bottom-10 -right-10 w-[600px] h-[600px] pointer-events-none z-0 opacity-[0.03]">
        <img src={logoImg} alt="" className="w-full h-full object-contain filter brightness-0 invert" />
      </div>

      {/* ─── NEWSLETTER BANNER ─── */}
      <div className="relative h-[160px] w-full overflow-hidden flex items-center border-b border-white/5">
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale opacity-20 blur-[1px]"
          style={{ backgroundImage: "url('/newsletter_background_typing_1778343292957.png')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <Container className="relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white/90">
              Subscribe to our quarterly newsletter
            </h3>
            <div className="relative w-full max-w-md flex items-center bg-white rounded-full overflow-hidden p-1 shadow-2xl">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-grow px-6 py-2.5 text-gray-800 bg-transparent border-none focus:ring-0 text-[14px] outline-none"
              />
              <button className="bg-[#5AC8FA] hover:bg-[#45B0E6] text-white px-8 py-2.5 rounded-full text-[14px] font-bold transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* ─── MAIN FOOTER CONTENT ─── */}
      <div className="py-16">
        <Container>
          <div className="flex flex-col md:flex-row flex-wrap justify-between gap-y-12 gap-x-8">
            
            {/* Column 1: Brand & Contact */}
            <div className="lg:col-span-1">
              <Link to="/" className="inline-block mb-5">
                <img src={logoImg} alt="Intersys Logo" className="h-9 w-auto" />
              </Link>
              <div className="space-y-3 text-[13px] text-white/50 leading-relaxed max-w-[240px]">
                <p>House No. 13, Borey Pipub Thmey Samrong Anthet (2), Street 07, Kok Khlang, Phnom Penh.</p>
                <p className="text-white hover:text-[#5AC8FA] transition-colors cursor-pointer">sochet@intersys-solutions.com</p>
              </div>
            </div>

            {/* Column 2: Intersys */}
            <FooterColumn title="Intersys">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/portfolio">Portfolio</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
              <FooterLink to="/insights">Insights</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </FooterColumn>

            {/* Column 3: Services */}
            <FooterColumn title="Services">
              <FooterLink to="/products/building-management">Building Management</FooterLink>
              <FooterLink to="/products/surveillance">Surveillance (CCTV)</FooterLink>
              <FooterLink to="/products/access-control">Access Control</FooterLink>
              <FooterLink to="/products/fire-safety">Fire Safety</FooterLink>
              <FooterLink to="/products/network">Network Infrastructure</FooterLink>
            </FooterColumn>

            {/* Column 4: Sectors */}
            <FooterColumn title="Sectors">
              <FooterLink to="/sectors">Commercial</FooterLink>
              <FooterLink to="/sectors">Industrial</FooterLink>
              <FooterLink to="/sectors">Government</FooterLink>
            </FooterColumn>

            {/* Column 5: Follow */}
            <FooterColumn title="Follow">
              <div className="flex flex-wrap gap-4">
                <SocialLink href="https://twitter.com"><Twitter className="w-4 h-4" /></SocialLink>
                <SocialLink href="https://facebook.com"><Facebook className="w-4 h-4" /></SocialLink>
                <SocialLink href="https://linkedin.com"><Linkedin className="w-4 h-4" /></SocialLink>
                <SocialLink href="https://instagram.com"><Instagram className="w-4 h-4" /></SocialLink>
                <SocialLink href="https://youtube.com"><Youtube className="w-4 h-4" /></SocialLink>
              </div>
            </FooterColumn>

          </div>
        </Container>
      </div>

      {/* ─── BOTTOM BAR ─── */}
      <div className="border-t border-white/5 py-6 bg-[#0A1B2A]">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-8 text-[11px] font-medium text-white/40">
              <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
            </div>
            
            <p className="text-[11px] text-white/30">
              Copyright © {new Date().getFullYear()} Intersys Solutions Co., Ltd.
            </p>
          </div>
        </Container>
      </div>

    </footer>
  );
}

/* ---------------- Helpers ---------------- */

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <h4 className="text-[14px] font-bold text-white tracking-tight">
        {title}
      </h4>
      <div className="flex flex-col gap-2.5">
        {children}
      </div>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="text-[13px] text-white/50 hover:text-[#5AC8FA] transition-colors">
      {children}
    </Link>
  );
}

function SocialLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-white/40 hover:text-[#5AC8FA] transition-all hover:scale-125"
    >
      {children}
    </a>
  );
}


