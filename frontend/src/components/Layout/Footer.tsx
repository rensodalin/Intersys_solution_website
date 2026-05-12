import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

import { Container } from "@/components/Common/Container";
import logoImg from "../../assets/logo.avif";
import teamImg from "../../assets/Teamfooter.png";

export function Footer({ isCompact }: { isCompact?: boolean }) {
  if (isCompact) {
    return (
      <footer className="border-t border-white/5 bg-[#020617] py-6 text-white">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[11px] text-white/30 tracking-wide">
              Copyright © {new Date().getFullYear()} Intersys Solutions Co., Ltd.
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
    <footer className="relative w-full overflow-hidden">
      {/* ─── TOP SPLIT SECTION ─── */}
      <div className="flex flex-col lg:flex-row w-full">

        {/* Left: Contact / Team Section (Now on the left) */}
        <div className="w-full lg:w-1/2 bg-[#C40C0C] py-12 px-10 md:px-20 relative overflow-hidden flex flex-col">
          <div className="relative z-10 max-w-lg">
            <div className="space-y-1 mb-8">
              <p className="text-white font-medium text-sm">Contact us</p>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                Get in touch
              </h2>
            </div>

            <div className="space-y-6 text-white/90">
              <a
                href="https://maps.app.goo.gl/kE5C1xd5F58TcYJo8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium leading-relaxed hover:underline block"
              >
                House No. 13, Borey Pipub Thmey Samrong Anthet (2), 2nd Floor, Street 07, Krang Thmey Village, Sangkat Kok Khlang, Khan Sen Sok, Phnom Penh, Cambodia.
              </a>

              <div className="space-y-3">
                <div className="flex gap-2 text-sm">
                  <span className="font-bold">Tel:</span>
                  <div className="flex flex-col sm:flex-row sm:gap-3">
                    <a href="https://t.me/chun_sochet" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      077 602 334
                    </a>
                    <span className="hidden sm:inline text-white/30">/</span>
                    <a href="https://t.me/chun_sochet" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      066 306 205
                    </a>
                  </div>
                </div>

                <div className="flex gap-2 text-sm">
                  <span className="font-bold">Email:</span>
                  <a href="mailto:sochet@intersys-solutions.com" className="hover:underline">
                    sochet@intersys-solutions.com
                  </a>
                </div>



                <div className="pt-2 space-y-1 text-sm">
                  <div className="flex gap-2">
                    <span className="font-bold">Mon - Fri:</span>
                    <span>8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-bold">Sat:</span>
                    <span>8:00 AM - 12:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 space-y-4">
                <h3 className="text-xl font-bold">Follow us on:</h3>
                <div className="flex gap-6">
                  <a href="https://www.facebook.com/IntersysSolutions" target="_blank" rel="noopener noreferrer">
                    <Facebook size={20} className="hover:scale-110 cursor-pointer transition-transform" />
                  </a>
                  <a href="https://www.linkedin.com/company/intersys-solutions2015/?viewAsMember=true" target="_blank" rel="noopener noreferrer">
                    <Linkedin size={20} className="hover:scale-110 cursor-pointer transition-transform" />
                  </a>
                  <a href="https://t.me/+vOYvhFusrd0xYTFl" target="_blank" rel="noopener noreferrer">
                    <Send size={20} className="hover:scale-110 cursor-pointer transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Team Photo - Centered at the bottom */}
          <div className="mt-16 relative z-10 flex justify-center lg:justify-start">
            <div className="relative inline-block group">
              {/* Abstract Watermark Background (like the 'L' in screenshot) */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />

              <img
                src={teamImg}
                alt="Intersys Team"
                className="relative z-10 w-full max-w-md h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Right: Apply / QR Section (Now on the right) */}
        <div className="w-full lg:w-1/2 bg-[#081F3D] py-12 px-10 flex flex-col items-center justify-center text-center">
          <div className="max-w-xs w-full space-y-8">
            <div className="space-y-3">
              <p className="text-white font-medium text-lg leading-relaxed">
                Scan the QR code below or
              </p>
              <Link
                to="/request-quote"
                className="text-xl md:text-2xl font-bold text-white hover:text-[#FF6B00] transition-colors decoration-2 underline-offset-8 underline"
              >
                Click here to request a quote!
              </Link>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] inline-block group">
              <a href="https://t.me/chun_sochet" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://t.me/chun_sochet"
                  alt="Telegram QR Code"
                  className="w-48 h-48 md:w-56 md:h-56 object-contain group-hover:scale-105 transition-transform"
                />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* ─── BOTTOM BAR ─── */}
      <div className="bg-[#0C2C55] py-4 border-t border-white/5">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Left: Logo */}
            <div className="flex-1 flex justify-start">
              <img src={logoImg} alt="Intersys" className="h-10 w-auto opacity-100" />
            </div>

            {/* Center: Copyright */}
            <div className="flex-1 flex justify-center">
              <p className="text-[12px] text-white/60 tracking-wider font-medium">
                © {new Date().getFullYear()} Intersys Solutions Co., Ltd. All Rights Reserved
              </p>
            </div>

            {/* Right: Social Icons */}
            <div className="flex-1 flex justify-end gap-6">
              <SocialIconBottom icon={<Facebook size={14} />} href="https://www.facebook.com/IntersysSolutions" />
              <SocialIconBottom icon={<Linkedin size={14} />} href="https://www.linkedin.com/company/intersys-solutions2015/?viewAsMember=true" />
              <SocialIconBottom icon={<Send size={14} />} href="https://t.me/+vOYvhFusrd0xYTFl" />
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

/* ---------------- Helpers ---------------- */

function ContactInfoSimple({ label, email }: { label: string; email: string }) {
  return (
    <div className="flex gap-2 text-white/90">
      <span className="font-bold">{label}:</span>
      <a href={`mailto:${email}`} className="hover:underline">{email}</a>
    </div>
  );
}

function SocialIconBottom({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="text-white/60 hover:text-white transition-all duration-300 transform hover:scale-110"
    >
      {icon}
    </a>
  );
}






