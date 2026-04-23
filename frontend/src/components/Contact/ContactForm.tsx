import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  User,
  Mail,
  Smartphone,
  Briefcase,
  Send,
  type LucideIcon,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  icon: LucideIcon;
  autoComplete?: string;
}

function InputField({ label, name, type = "text", icon: Icon, autoComplete }: InputFieldProps) {
  return (
    <div>
      <label className="text-xs text-gray-400 mb-1 block">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          name={name}
          type={type}
          autoComplete={autoComplete}
          required
          className="w-full pl-10 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder={label}
        />
      </div>
    </div>
  );
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setSubmitted(false);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to send message");
      }

      setSubmitted(true);
      e.currentTarget.reset();
      toast.success("Message sent successfully!");

    } catch (err: any) {
      console.error("Contact Form Error:", err);
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="lg:col-span-8">
      <div className="bg-gray-50 p-10 rounded-3xl shadow-lg relative h-full">
        <MessageSquare className="absolute top-6 right-6 opacity-10 w-20 h-20" />

        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-2">Request a Quote</h3>
          <p className="text-gray-500 text-sm">
            Tell us about your project and we’ll get back to you shortly.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-500">
            <div className="grid md:grid-cols-2 gap-6">
              <InputField label="First Name" name="firstName" icon={User} />
              <InputField label="Last Name" name="lastName" icon={User} />
              <InputField label="Email" name="email" type="email" icon={Mail} />
              <InputField label="Phone" name="phone" type="tel" icon={Smartphone} />
              <InputField label="Company" name="company" icon={Briefcase} />
              <InputField label="Position" name="position" icon={Briefcase} />
            </div>

            <div>
              <label className="text-xs text-gray-400">Message</label>
              <textarea
                name="message"
                className="w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[120px]"
                placeholder="Your message..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-8 py-4 bg-red-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
              {!loading && <Send size={16} />}
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-full min-h-[400px] text-center gap-6"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h4 className="text-3xl font-bold text-[#162E93] mb-2">Success!</h4>
              <p className="text-gray-500 max-w-sm mx-auto">
                Your message has been sent successfully. Our team will contact you shortly.
              </p>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 px-10 py-4 bg-[#162E93] text-white rounded-xl font-bold hover:bg-red-600 transition-all shadow-lg"
            >
              Send Another Request
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
