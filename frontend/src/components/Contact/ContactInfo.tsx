import {
  Facebook,
  Linkedin,
  Send, // use this for Telegram
} from "lucide-react";
import { motion } from "framer-motion";

interface ContactCardProps {
  icon: string;
  title: string;
  description: string;
  lines: string[];
  delay?: number;
}

function ContactCard({
  icon,
  title,
  description,
  lines,
  delay = 0,
}: ContactCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white p-8 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all duration-500 rounded-lg group border border-transparent hover:border-[#DA3D20]/10"
    >
      {/* Icon */}
      <div className="mb-5">
        <img
          src={icon}
          alt={title}
          className="w-9 h-9 object-contain"
        />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-[#1A3263] mb-2 tracking-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-500 text-[14px] leading-6 mb-5 max-w-[220px]">
        {description}
      </p>

      {/* Red Line */}
      <div className="w-12 h-[1px] bg-[#DA3D20]/40 mb-5" />

      {/* Contact Text */}
      <div className="space-y-1.5">
        {lines.map((line, i) => (
          <p
            key={i}
            className="text-[#DA3D20] font-semibold text-[14px] tracking-wide"
          >
            {line}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

export function ContactInfo() {
  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Send, href: "#" }, // Telegram replacement
    { icon: Linkedin, href: "#" },
  ];

  return (
    <section className="bg-[#F9F7F5] py-16">
      <div className="max-w-5xl mx-auto px-6">

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <ContactCard
            icon="https://cdn-icons-png.flaticon.com/512/25/25694.png"
            title="Visit Us"
            description="Come visit our office in Phnom Penh."
            lines={["Phnom Penh, Cambodia"]}
            delay={0.1}
          />

          <ContactCard
            icon="https://cdn-icons-png.flaticon.com/512/46/46854.png"
            title="Call Us"
            description="Speak directly with our support team."
            lines={["(+855) 077 602 334", "(+855) 023 900 888"]}
            delay={0.2}
          />

          <ContactCard
            icon="https://cdn-icons-png.flaticon.com/256/17609/17609798.png"
            title="Email Us"
            description="Send us your questions anytime."
            lines={["sochet@intersys-solutions.com"]}
            delay={0.3}
          />
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-5">
          {socialLinks.map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="w-10 h-10 rounded-full bg-[#234C6A] flex items-center justify-center text-white hover:bg-[#D98B5F] transition-colors shadow-md"
            >
              <social.icon className="w-4 h-4" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}