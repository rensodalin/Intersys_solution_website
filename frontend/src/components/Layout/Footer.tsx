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

      <Container className="relative z-10 pt-20 pb-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand & Social */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="inline-block mb-8">
              <img
                src={logoImg}
                alt="Intersys Logo"
                className="h-14 w-auto object-contain"
              />
            </Link>

            <p className="text-[15px] leading-relaxed text-white/50 mb-8 pr-4">
              Smart building, automation, and integrated security solutions for modern businesses. Engineering smart, safe, and sustainable buildings.
            </p>

            <div className="flex items-center gap-3">
              <SocialIcon href="https://www.facebook.com/IntersysSolutions" color="#3B5998">
                <Facebook className="h-4 w-4" />
              </SocialIcon>

              <SocialIcon href="https://www.linkedin.com/company/intersys-solutions2015" color="#0077B5">
                <Linkedin className="h-4 w-4" />
              </SocialIcon>

              <SocialIcon href="https://t.me/chun_sochet" color="#0088CC">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.539.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.195-.054-.285-.346-.094L7.469 14.28l-2.76-.86c-.6-.184-.593-.6.126-.882l10.82-4.172c.504-.191.95.105.81.855z" />
                </svg>
              </SocialIcon>
            </div>
          </motion.div>

          {/* Column 2: Useful Links */}
          <FooterColumn title="Useful Link">
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/services">Services</FooterLink>
            <FooterLink to="/portfolio">News (Portfolio)</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
          </FooterColumn>

          {/* Column 3: Working Hours */}
          <FooterColumn title="Working Hours">
            <div className="space-y-4">
              <p className="text-[14px] leading-relaxed text-white/50">
                We work 6 days a week, every day including major holidays. Contact us for any info.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white font-medium">Monday - Friday:</span>
                  <span className="text-white/60 tracking-wider">8:00 - 17:00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white font-medium">Saturday:</span>
                  <span className="text-white/60 tracking-wider">8:00 - 12:00</span>
                </div>
                <div className="flex justify-between items-center text-sm">

                </div>
              </div>
            </div>
          </FooterColumn>

          {/* Column 4: Newsletter */}
          <FooterColumn title="News Letters">
            <p className="text-[14px] leading-relaxed text-white/50 mb-4">
              Your email address:
            </p>
            <div className="relative mb-6">
              <input
                type="email"
                placeholder="email.info@intersys.com"
                className="w-full bg-white/95 px-4 py-3.5 text-sm text-gray-900 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#FC3B1F]/50 transition-all"
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-[#FC3B1F] text-white rounded-sm hover:bg-red-600 transition-colors">
                <Send className="h-4 w-4" />
              </button>
            </div>

          </FooterColumn>
        </div>
      </Container>

      {/* Red Copyright Bar */}
      <div className="bg-[#FC3B1F] py-5">
        <Container>
          <div className="flex justify-center items-center">
            <p className="text-[13px] font-semibold text-white tracking-wide text-center">
              Copyright © {new Date().getFullYear()}. All Rights Reserved.
            </p>
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h4 className="mb-8 text-[20px] font-bold text-white relative after:absolute after:bottom-[-8px] after:left-0 after:h-[2px] after:w-8 after:bg-[#FC3B1F]">
        {title}
      </h4>

      <div className="space-y-4">{children}</div>
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
      className="flex items-center gap-2 text-[15px] text-white/50 transition-all hover:text-[#FC3B1F] group"
    >
      <span className="text-[#FC3B1F] font-bold text-[10px] transform transition-transform group-hover:translate-x-1">›</span>
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