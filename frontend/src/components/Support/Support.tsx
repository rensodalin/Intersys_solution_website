import { Globe } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

interface SupportMember {
  name: string;
  email: string;
  position: string;
}

const techSupport: SupportMember[] = [
  {
    name: "Jawhar Ayadi",
    email: "jayadi@aetherial.com",
    position: "Applications Engineer",
  },
  {
    name: "Mohamed Asif",
    email: "masif@aetherial.com",
    position: "Manager, Technical Design & Pre-Sales",
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
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-gray-900">
          {title}
        </h2>

        <p className="text-gray-500 max-w-2xl text-sm leading-relaxed">
          {subtitle}
        </p>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-100 rounded-xl shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-8 py-4 text-sm font-medium text-gray-600">
                Contact
              </th>
              <th className="px-8 py-4 text-sm font-medium text-gray-600">
                Role
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {members.map((member, i) => (
              <tr
                key={i}
                className="hover:bg-gray-50 transition-colors"
              >
                {/* Contact */}
                <td className="px-8 py-6">
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-gray-900">
                      {member.name}
                    </p>

                    <a
                      href={`mailto:${member.email}`}
                      className="text-sm text-blue-500 hover:text-red-600 transition"
                    >
                      {member.email}
                    </a>
                  </div>
                </td>

                {/* Role */}
                <td className="px-8 py-6">
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
      <section className="relative h-[650px] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="Support"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 text-center text-white px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight">
              Technical Support & <br /> Customer Service
            </h1>

            <p className="text-gray-200 text-lg max-w-2xl mx-auto">
              We provide reliable technical support and responsive customer
              service to ensure smooth and efficient operations.
            </p>

            <Link
              to="/contact"
              className="inline-block mt-6 px-10 py-4 bg-[#9B0F06]/80 rounded-md hover:bg-[#9B0F06] transition text-sm font-medium shadow-lg"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-6 space-y-28">
          <SupportSection
            title="Technical Support"
            subtitle="Direct access to our global network of engineers and technical specialists."
            members={techSupport}
          />

          <SupportSection
            title="Customer Support"
            subtitle="Our team is ready to assist with inquiries, coordination, and service requests."
            members={customerSupport}
          />
        </div>
      </section>
    </div>
  );
}