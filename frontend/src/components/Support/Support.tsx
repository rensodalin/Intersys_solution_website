import { Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

interface SupportMember {
  name: string;
  email: string;
  phone: string;
  position: string;
}

const techSupport: SupportMember[] = [
  {
    name: "Sochet Chun",
    email: "sochet@intersys-solutions.com",
    phone: "077 602 334",
    position: "Technical Support Engineer",
  },
];

const customerSupport: SupportMember[] = [...techSupport];

function SupportSection({
  title,
  subtitle,
  members,
}: {
  title: string;
  subtitle: string;
  members: SupportMember[];
}) {
  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="space-y-2 md:space-y-3">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#1A3263] tracking-tight">
          {title.split("support")[0]}
          <span className="text-[#CE2626]">support</span>
        </h2>

        <p className="text-gray-500 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed">
          {subtitle}
        </p>

        <div className="h-px bg-gray-200" />
      </div>

      {/* Desktop Table (hidden on small phone screens) */}
      <div className="hidden sm:block overflow-hidden border border-gray-200 bg-white shadow-sm rounded-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-sm font-medium text-gray-500">
                Contact
              </th>

              <th className="px-6 py-4 text-sm font-medium text-gray-500">
                Position
              </th>
            </tr>
          </thead>

          <tbody>
            {members.map((member, i) => (
              <tr
                key={i}
                className="border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors"
              >
                {/* Contact */}
                <td className="px-6 py-5">
                  <div className="space-y-3">
                    <p className="text-base font-semibold text-gray-900">
                      {member.name}
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={`mailto:${member.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#1A3263] bg-[#1A3263]/5 border border-[#1A3263]/10 px-3 py-2 hover:bg-[#C3110C] hover:text-white hover:border-[#C3110C] transition-all duration-300 cursor-pointer rounded-sm"
                      >
                        <Mail className="w-4 h-4 shrink-0" />
                        <span className="truncate">{member.email}</span>
                      </a>

                      <a
                        href="https://t.me/chun_sochet"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#1A3263] bg-[#1A3263]/5 border border-[#1A3263]/10 px-3 py-2 hover:bg-[#C3110C] hover:text-white hover:border-[#C3110C] transition-all duration-300 cursor-pointer rounded-sm"
                      >
                        <Phone className="w-4 h-4 shrink-0" />
                        <span>{member.phone}</span>
                      </a>
                    </div>
                  </div>
                </td>

                {/* Position */}
                <td className="px-6 py-5">
                  <p className="text-sm text-gray-700 font-medium">
                    {member.position}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List (visible on phone screens < 640px) */}
      <div className="block sm:hidden space-y-4">
        {members.map((member, i) => (
          <div
            key={i}
            className="border border-gray-200 bg-white p-5 rounded-md shadow-sm space-y-4"
          >
            <div>
              <p className="text-base font-bold text-gray-900">{member.name}</p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">{member.position}</p>
            </div>
            <div className="flex flex-col gap-2.5 pt-2 border-t border-gray-100">
              <a
                href={`mailto:${member.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-start gap-2.5 text-xs font-medium text-[#1A3263] bg-[#1A3263]/5 border border-[#1A3263]/10 px-3.5 py-2.5 hover:bg-[#C3110C] hover:text-white hover:border-[#C3110C] transition-all duration-300 cursor-pointer rounded-sm overflow-hidden"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span className="truncate">{member.email}</span>
              </a>
              <a
                href="https://t.me/chun_sochet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-start gap-2.5 text-xs font-medium text-[#1A3263] bg-[#1A3263]/5 border border-[#1A3263]/10 px-3.5 py-2.5 hover:bg-[#C3110C] hover:text-white hover:border-[#C3110C] transition-all duration-300 cursor-pointer rounded-sm"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>{member.phone}</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Support() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[300px] sm:h-[400px] md:h-[480px] flex items-center justify-center overflow-hidden pt-20 pb-12">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1719559519240-d6093e4dcac2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Technical Support"
            className="w-full h-full object-cover"
          />

          {/* Darker Overlay */}
          <div className="absolute inset-0 bg-black/75" />
        </div>

        <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-3 sm:mb-4">
              <span className="text-white">
                Technical Support
              </span>
              <br className="hidden sm:inline" />{" "}
              <span className="text-[#FC3B1F]">
                & Customer Service
              </span>
            </h1>

            <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed font-normal px-2">
              Reliable technical support and responsive customer service to
              ensure smooth and efficient operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16 md:space-y-20">
          <SupportSection
            title="Technical support"
            subtitle="Direct access to our global network of engineers and technical specialists."
            members={techSupport}
          />

          <SupportSection
            title="Customer support"
            subtitle="Our team is ready to assist with inquiries, coordination, and service requests."
            members={customerSupport}
          />
        </div>
      </section>
    </div>
  );
}