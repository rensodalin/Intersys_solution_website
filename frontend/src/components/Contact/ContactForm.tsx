import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  User,
  Mail,
  Smartphone,
  Send,
  type LucideIcon,
  CheckCircle2,
  MapPin,
  Globe,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  icon: LucideIcon;
  autoComplete?: string;
  required?: boolean;
}

function InputField({ label, name, type = "text", icon: Icon, autoComplete, required = true }: InputFieldProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-600 font-medium">{label}</label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          placeholder={label}
          className="w-full pl-11 p-3.5 rounded-xl border border-gray-200 
          bg-white shadow-sm
          focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 focus:shadow-md
          hover:border-gray-300 transition-all"
        />
      </div>
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  name: string;
  icon: LucideIcon;
  options: string[];
}

function SelectField({ label, name, icon: Icon, options }: SelectFieldProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-600 font-medium">{label}</label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <select
          name={name}
          required
          defaultValue=""
          className="w-full pl-11 pr-10 p-3.5 rounded-xl border border-gray-200 
          bg-white cursor-pointer shadow-sm
          hover:border-gray-300
          focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500
          transition-all appearance-none"
        >
          <option value="" disabled>Select {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
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
      <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-xl border border-gray-100 relative overflow-hidden">

        <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-50 rounded-full opacity-50" />

        <div className="relative mb-8">
          <h3 className="text-3xl font-bold mb-2 text-gray-900">
            How can we help you?
          </h3>
          <p className="text-gray-500">
            Fill out the form and we’ll get back to you within 24 hours.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Personal Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-500">Personal Information</h4>
              <InputField label="Your name" name="name" icon={User} />
            </div>

            {/* Contact */}
            <div className="grid md:grid-cols-2 gap-6">
              <SelectField
                label="Preferred contact method"
                name="contactMethod"
                icon={Smartphone}
                options={["By email", "By phone", "Other"]}
              />

              <InputField label="Phone number" name="phone" type="tel" icon={Smartphone} required={false} />
              <InputField label="Email address" name="email" type="email" icon={Mail} required={false} />
            </div>

            {/* Location */}
            <div className="grid md:grid-cols-2 gap-6">
              <SelectField
                label="City / Province"
                name="city"
                icon={MapPin}
                options={["Phnom Penh", "Siem Reap", "Sihanoukville", "Battambang", "Other"]}
              />

              <SelectField
                label="Country"
                name="country"
                icon={Globe}
                options={["Cambodia", "Thailand", "Vietnam", "Laos", "Singapore", "Other"]}
              />
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label className="text-sm text-gray-600 font-medium">Message</label>
              <textarea
                name="message"
                required
                placeholder="How can we help you?"
                className="w-full p-4 rounded-xl border border-gray-200 bg-white shadow-sm
                focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:shadow-md
                hover:border-gray-300 transition-all min-h-[140px] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-10 py-4 bg-red-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 
              hover:bg-gray-900 hover:shadow-xl hover:shadow-red-500/20 transition-all disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </span>
              ) : (
                <>
                  Send message
                  <Send size={18} />
                </>
              )}
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-12 text-center gap-4"
          >
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900">Thank you!</h4>
            <p className="text-gray-500 max-w-sm">
              Your message has been received. We’ll contact you soon.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 px-8 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-red-600 transition-all"
            >
              Send another message
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
