import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  ChevronRight,
  Clock
} from "lucide-react";

import { Container } from "@/components/Common/Container";
import logoImg from "@/assets/logo.avif";

export function Footer({ isCompact }: { isCompact?: boolean }) {
  if (isCompact) {
    return (
      <footer className="border-t border-white/5 bg-[#1A3263] py-4 text-white">
        <Container>
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <p className="text-xs text-white/50 text-center">
              © {new Date().getFullYear()} Intersys Solutions Co., Ltd.
            </p>

            <div className="flex items-center gap-3">
              <SocialIcon href="https://www.facebook.com/IntersysSolutions">
                <Facebook className="h-4 w-4" />
              </SocialIcon>

              <SocialIcon href="https://www.linkedin.com/company/intersys-solutions2015">
                <Linkedin className="h-4 w-4" />
              </SocialIcon>
            </div>
          </div>
        </Container>
      </footer>
    );
  }

  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#0C2C55] text-white">
      {/* Abstract Background Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url('/footer_wavy_pattern_1778205788832.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <Container className="relative z-10 pt-12 pb-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h4 className="mb-4 text-[16px] font-bold text-white relative uppercase tracking-wider">
              Intersys Solutions
            </h4>
            <p className="text-[13px] leading-relaxed text-white/40 mb-6 pr-2">
              Your trusted partner in smart building, automation, and integrated security solutions. Engineering smart, safe, and sustainable buildings.
            </p>
          </motion.div>

          {/* Column 2: Our Services */}
          <FooterColumn title="Our Services">
            <FooterLink to="/products/building-management">Building Management</FooterLink>
            <FooterLink to="/products/surveillance">Surveillance (CCTV)</FooterLink>
            <FooterLink to="/products/access-control">Access Control</FooterLink>
            <FooterLink to="/portfolio">Project Portfolio</FooterLink>
            <FooterLink to="/contact">Contact Support</FooterLink>
          </FooterColumn>

          {/* Column 3: Working Hours */}
          <FooterColumn title="Working Hours">
            <div className="space-y-3 pt-1">
              <div className="flex items-center gap-3 group">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#FC3B1F] transition-colors duration-300">
                  <Clock className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest leading-none">Mon - Fri</span>
                  <span className="text-[13px] text-white/70 font-medium tracking-wide">8:00 AM - 5:00 PM</span>
                </div>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#FC3B1F] transition-colors duration-300">
                  <Clock className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest leading-none">Saturday</span>
                  <span className="text-[13px] text-white/70 font-medium tracking-wide">8:00 AM - 12:00 PM</span>
                </div>
              </div>
            </div>
          </FooterColumn>

          {/* Column 4: Get In Touch */}
          <FooterColumn title="Get In Touch">
            <div className="space-y-4">
              <a 
                href="https://maps.app.goo.gl/kE5C1xd5F58TcYJo8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex gap-3 group items-start"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#FC3B1F] transition-colors duration-300">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                <p className="text-[13px] leading-relaxed text-white/50 group-hover:text-white transition-colors">
                  House No. 13, Borey Pipub Thmey Samrong Anthet (2), 2nd Floor, Street 07, Sangkat Kok Khlang, Phnom Penh.
                </p>
              </a>

              <a 
                href="https://t.me/chun_sochet" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex gap-3 group items-center"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#FC3B1F] transition-colors duration-300">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] text-white/50 group-hover:text-white transition-colors font-medium">
                    @chun_sochet
                  </span>
                </div>
              </a>

              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=sochet@intersys-solutions.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex gap-3 group items-center"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#FC3B1F] transition-colors duration-300">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <span className="text-[13px] text-white/50 group-hover:text-white transition-colors underline underline-offset-4 font-medium">
                  Gmail Inbox
                </span>
              </a>
            </div>
          </FooterColumn>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6 bg-[#081F3D]">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src={logoImg}
                alt="Intersys Logo"
                className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity"
              />
            </Link>

            {/* Copyright */}
            <p className="text-[11px] text-white/30 tracking-wide order-3 md:order-2">
              Copyright © {new Date().getFullYear()} All Rights Reserved | intersys-solutions.com
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 order-2 md:order-3">
              <SocialIcon href="https://www.facebook.com/IntersysSolutions" color="#3B5998">
                <Facebook className="h-3.5 w-3.5" />
              </SocialIcon>
              <SocialIcon href="https://www.linkedin.com/company/intersys-solutions2015" color="#0077B5">
                <Linkedin className="h-3.5 w-3.5" />
              </SocialIcon>
              <SocialIcon href="https://t.me/chun_sochet" color="#0088CC">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.539.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.195-.054-.285-.346-.094L7.469 14.28l-2.76-.86c-.6-.184-.593-.6.126-.882l10.82-4.172c.504-.191.95.105.81.855z" />
                </svg>
              </SocialIcon>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

/* ---------------- Helpers ---------------- */

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <h4 className="mb-5 text-[14px] font-bold text-white relative uppercase tracking-wider after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-6 after:bg-[#FC3B1F]">
        {title}
      </h4>

      <div className="space-y-2.5">{children}</div>
    </motion.div>
  );
}

function FooterLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="block text-[13px] text-white/40 transition-all hover:text-[#FC3B1F] group"
    >
      {children}
    </Link>
  );
}

function ContactItem({
  icon,
  href,
  children,
}: {
  icon: React.ReactNode;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 text-sm text-white/60 transition-colors hover:text-white"
    >
      <span className="text-[#D62828] shrink-0">{icon}</span>

      <span className="leading-relaxed">{children}</span>
    </a>
  );
}

function SocialIcon({
  href,
  children,
  color = "#FC3B1F",
}: {
  href: string;
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70 transition-all hover:text-white hover:scale-110"
      style={{
        // We can optionally use the color on hover
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
      }}
    >
      {children}
    </a>
  );
}