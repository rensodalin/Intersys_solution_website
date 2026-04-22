import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, Briefcase, User, Smartphone } from "lucide-react";
import { Container } from "@/components/Common/Container";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Intersys Solutions" },
      {
        name: "description",
        content: "Get in touch with Intersys Solutions. We are ready to help with your smart building, security, and fire safety systems.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-white pt-24">
      {/* Header */}
      <section className="bg-[#0A0F1A] py-20 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight mb-6">
              Get <br />
              <span className="text-red-600">Future</span> Together.
            </h1>
            <p className="text-gray-400 max-w-xl text-sm leading-relaxed">
              Have a complex architectural challenge or a digital integration project? Our team in Phnom Penh is ready to engineer your vision.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Left Side: Contact Details */}
            <div className="lg:col-span-4 space-y-12">
              <div>
                <h2 className="text-2xl font-bold font-display text-[#0A0F1A] mb-8">Let's Chat</h2>

                <div className="space-y-8">
                  <ContactItem
                    icon={Phone}
                    title="Phone"
                    value="077 602 334"
                    subValue="123-456-7890"
                    link="tel:+85577602334"
                  />
                  <ContactItem
                    icon={Mail}
                    title="Email"
                    value="info@intersys-solutions.com"
                    subValue="info@mysite.com"
                    link="mailto:info@intersys-solutions.com"
                  />
                  <ContactItem
                    icon={MapPin}
                    title="Main Headquarters"
                    value="Borey Pipub Thmey Samrong Anthet (2)"
                    subValue="Sen Sok, Phnom Penh"
                  />
                </div>
              </div>

              {/* Telegram QR */}
              <div className="p-8 bg-[#F8F9FA] rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.539.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.195-.054-.285-.346-.094L7.469 14.28l-2.76-.86c-.6-.184-.593-.6.126-.882l10.82-4.172c.504-.191.95.105.81.855z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A0F1A] text-sm">Telegram Chat</h4>
                    <p className="text-[10px] text-gray-400">Scan to message us instantly</p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-inner flex justify-center">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://t.me/chun_sochet"
                    alt="Telegram QR Code"
                    className="w-32 h-32"
                  />
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="lg:col-span-8">
              <div className="bg-[#F8F9FA] p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <MessageSquare size={120} />
                </div>

                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="relative z-10">
                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
                    <InputField label="First Name" name="firstName" icon={User} />
                    <InputField label="Last Name" name="lastName" icon={User} />
                    <InputField label="Email" name="email" type="email" icon={Mail} />
                    <InputField label="Phone" name="phone" type="tel" icon={Smartphone} />
                    <InputField label="Company" name="company" icon={Briefcase} />
                    <InputField label="Position" name="position" icon={Briefcase} />
                  </div>

                  <div className="mb-8">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Message</label>
                    <textarea
                      rows={4}
                      className="w-full bg-white border border-gray-200 rounded-xl px-6 py-4 text-sm focus:outline-none focus:border-red-600 transition-colors"
                      placeholder="Tell us about your structural goals..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitted}
                    className="w-full md:w-auto px-10 py-4 bg-red-600 text-white rounded-xl font-bold tracking-widest text-[11px] uppercase hover:bg-[#0A0F1A] transition-all duration-300 shadow-xl shadow-red-600/20 flex items-center justify-center gap-3 group"
                  >
                    {submitted ? "Message Sent Successfully" : "Send Inquiry"}
                    {!submitted && <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-white">
        <Container>
          <div className="rounded-3xl overflow-hidden h-[500px] relative shadow-2xl grayscale group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7817.078109736049!2d104.8630207!3d11.5848656!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095169a6177b89%3A0xc2e636c16c830aae!2sIntersys%20Solutions%20Co.%2C%20Ltd!5e0!3m2!1skm!2skh!4v1776873531288!5m2!1skm!2skh"
              className="w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-700"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Overlay Label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="bg-[#0A0F1A] text-white px-8 py-5 rounded-xl shadow-2xl border border-white/10 text-center scale-90 md:scale-100">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-sm mb-1">Intersys Solutions HQ</h4>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Sen Sok, Phnom Penh</p>
              </div>
            </div>

            {/* Regional Box */}
            <div className="absolute bottom-8 left-8 hidden md:block">
              <div className="bg-[#0A0F1A]/95 backdrop-blur-md p-8 rounded-2xl border border-white/5 max-w-[280px]">
                <h4 className="text-white font-bold text-sm mb-3">Headquarters</h4>
                <p className="text-gray-400 text-[11px] leading-relaxed">
                  Centrally located in Sen Sok to ensure rapid deployment across the Kingdom.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

function ContactItem({ icon: Icon, title, value, subValue, link }: any) {
  return (
    <div className="flex gap-6 group">
      <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#0A0F1A] mb-1">{title}</h4>
        {link ? (
          <a href={link} className="block font-bold text-[#0A0F1A] hover:text-red-600 transition-colors">{value}</a>
        ) : (
          <p className="font-bold text-[#0A0F1A]">{value}</p>
        )}
        <p className="text-[11px] text-gray-400 mt-0.5">{subValue}</p>
      </div>
    </div>
  );
}

function InputField({ label, name, type = "text", icon: Icon }: any) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">{label}</label>
      <div className="relative">
        <Icon className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
        <input
          type={type}
          name={name}
          className="w-full bg-white border border-gray-200 rounded-xl pl-14 pr-6 py-4 text-sm focus:outline-none focus:border-red-600 transition-colors"
          placeholder="Required"
        />
      </div>
    </div>
  );
}



