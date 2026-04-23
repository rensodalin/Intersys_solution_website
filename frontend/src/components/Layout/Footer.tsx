import { Link } from "@tanstack/react-router";
import { Container } from "@/components/Common/Container";
import logoImg from "@/assets/logo.avif";
import { Facebook, Mail, Phone, MapPin, Clock, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1A3263] text-white border-t border-white/5">
      <Container className="py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Logo & About */}
          <div>
            <Link to="/" className="inline-block mb-8">
              <img src={logoImg} alt="Intersys Logo" className="h-16 w-auto object-contain" />
            </Link>
            <p className="text-[15px] text-white/60 leading-relaxed pr-4 mb-8">
              Engineering smart, safe, and sustainable buildings through integrated control systems
              and automation.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/IntersysSolutions"
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-md border border-white/10 text-white/70 hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white transition-all shadow-sm"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/intersys-solutions2015"
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-md border border-white/10 text-white/70 hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white transition-all shadow-sm"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://t.me/chun_sochet"
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-md border border-white/10 text-white/70 hover:bg-[#229ED9] hover:border-[#229ED9] hover:text-white transition-all shadow-sm"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.539.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.195-.054-.285-.346-.094L7.469 14.28l-2.76-.86c-.6-.184-.593-.6.126-.882l10.82-4.172c.504-.191.95.105.81.855z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-[16px] font-bold text-white mb-6 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/portfolio"
                  className="text-[15px] text-white/60 hover:text-[#9B0F06] transition-colors flex items-center gap-3"
                >
                  <span /> Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-[15px] text-white/60 hover:text-[#9B0F06] transition-colors flex items-center gap-3"
                >
                  <span /> About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-[15px] text-white/60 hover:text-[#9B0F06] transition-colors flex items-center gap-3"
                >
                  <span /> Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="font-display text-[16px] font-bold text-white mb-6 tracking-wide">
              Business Hours
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div>
                  <div className="text-[15px] text-white/90 font-semibold mb-1">Mon - Sat</div>
                  <div className="text-[14px] text-white/60">8:00 AM - 5:00 PM</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div>
                  <div className="text-[15px] text-white/90 font-semibold">Sunday</div>
                  <div className="text-[14px] text-[#9B0F06] font-bold">Closed</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-[16px] font-bold text-white mb-6 tracking-wide">
              Get in Touch
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <Phone className="w-[18px] h-[18px] text-[#9B0F06] shrink-0 mt-1" />
                <a
                  href="https://t.me/chun_sochet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] text-white/80 hover:text-white transition-colors"
                >
                  077 602 334
                </a>
              </li>
              <li className="flex items-start gap-4 group/mail">
                <Mail className="w-[18px] h-[18px] text-[#9B0F06] shrink-0 mt-1" />
                <a
                  href="mailto:sochet@intersys-solutions.com"
                  className="text-[15px] text-white/80 hover:text-white transition-colors break-all"
                >
                  sochet@intersys-solutions.com
                </a>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="w-[18px] h-[18px] text-[#9B0F06] shrink-0 mt-1.5" />
                <a
                  href="https://maps.app.goo.gl/kE5C1xd5F58TcYJo8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-white/60 leading-relaxed hover:text-white transition-colors"
                >
                  No. 13, Borey Pipub Thmey Samrong Anthet (2), 2nd Floor, St 07, Krang Thmey
                  Village, Sangkat Kok Khlang, Khan Sen Sok, Phnom Penh, Cambodia
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-[13px] text-white/40 text-center">
            © {new Date().getFullYear()} Intersys Solutions Co., Ltd. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
