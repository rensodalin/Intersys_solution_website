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
import foot from "../../assets/Certificates & Licenses/Certificates & Licenses/new/foot.jpg";

export function Footer({ isCompact }: { isCompact?: boolean }) {
  if (isCompact) {
    return (
      <footer className="border-t border-red-600/70 bg-[#081F3D] py-5 text-white">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-[12px] text-white/70 tracking-wide">
              Copyright © {new Date().getFullYear()} Intersys Solutions Co., Ltd.
            </p>

            <div className="flex items-center gap-5 text-[12px] font-medium text-white/75">
              <Link
                to="/terms"
                className="hover:text-white transition-colors duration-200"
              >
                Terms & Conditions
              </Link>

              <span className="w-1 h-1 rounded-full bg-white/30" />

              <Link
                to="/privacy"
                className="hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
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
        <div className="w-full lg:w-1/2 bg-[#C40C0C] py-8 px-10 md:px-16 relative overflow-hidden flex flex-col">
          <div className="relative z-10 max-w-lg">
            <div className="space-y-1 mb-6">
              <p className="text-white font-medium text-sm">Contact us</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
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
                      (+855) 077 602 334
                    </a>
                    <span className="hidden sm:inline text-white/30">/</span>
                    <a href="https://t.me/chun_sochet" target="_blank" rel="noopener noreferrer" className="hover:underline">
                      (+855) 023 900 888
                    </a>
                  </div>
                </div>

                <div className="flex gap-2 text-sm">
                  <span className="font-bold">Email:</span>
                  <a href="mailto:rrensodalin@gmail.com" className="hover:underline">
                    rrensodalin@gmail.com
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
          <div className="mt-8 relative z-10 flex justify-center lg:justify-start">
            <div className="relative inline-block group">
              {/* Abstract Watermark Background */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors" />

              <img
                src={teamImg}
                alt="Intersys Team"
                className="relative z-10 w-full max-w-sm h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Right: Apply / QR Section (Now on the right) */}
        <div
          className="w-full lg:w-1/2 relative overflow-hidden flex items-center justify-center px-8 py-10"
          style={{
            backgroundImage: `linear-gradient(rgba(8,31,61,0.88), rgba(8,31,61,0.88)), url(${foot})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-10 max-w-sm w-full text-center">

            {/* Text */}
            <div className="mb-6">
              <p className="text-gray-200 text-sm mb-2 tracking-wide">
                Scan the QR code below or
              </p>

              <Link
                to="/request-quote"
                className="inline-block text-2xl font-semibold text-white border-b border-[#FF6B00] pb-1 hover:text-[#FF6B00] transition-colors duration-300"
              >
                Request a Quote
              </Link>
            </div>

            {/* QR Card */}
            <div className="bg-white/95 p-4 shadow-xl inline-block border border-gray-200">
              <a
                href="https://t.me/chun_sochet"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://t.me/chun_sochet"
                  alt="Telegram QR Code"
                  className="w-40 h-40 md:w-48 md:h-48 object-contain"
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






