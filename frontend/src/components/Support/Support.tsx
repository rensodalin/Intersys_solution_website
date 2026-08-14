import { Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import support from "../../assets/BMS/IMG_20260509_105536.jpg";

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
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#1A3263] tracking-tight">
          {title.split("support")[0]}
          <span className="text-[#CE2626]">support</span>
        </h2>

        <p className="text-gray-500 max-w-2xl text-sm md:text-base leading-relaxed">
          {subtitle}
        </p>

        <div className="h-px bg-gray-200" />
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-200 bg-white shadow-sm">
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

                    <div className="space-y-2">
                      <a
                        href={`mailto:${member.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#2F2FE4] bg-[#1A3263]/5 border border-[#1A3263]/10 px-3 py-2 hover:bg-[#C3110C] hover:text-white hover:border-[#C3110C] transition-all duration-300 cursor-pointer"
                      >
                        <Mail className="w-4 h-4" />
                        {member.email}
                      </a>

                      <a
                        href="https://t.me/chun_sochet"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#1A3263] bg-[#1A3263]/5 border border-[#1A3263]/10 px-3 py-2 hover:bg-[#C3110C] hover:text-white hover:border-[#C3110C] transition-all duration-300 cursor-pointer"
                      >
                        <Phone className="w-4 h-4" />
                        {member.phone}
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
    </div>
  );
}

export function Support() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      {/* Hero */}
      <section className="relative h-[480px] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src={support}
            alt="Technical Support"
            className="w-full h-full object-cover"
          />

          {/* Darker Overlay */}
          <div className="absolute inset-0 bg-black/75" />
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4">
              <span className="text-white">
                Technical Support
              </span>
              <br />
              <span className="text-[#FC3B1F]">
                & Customer Service
              </span>
            </h1>

            <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed font-normal">
              Reliable technical support and responsive customer service to
              ensure smooth and efficient operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-20">
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