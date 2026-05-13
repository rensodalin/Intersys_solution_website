import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}

function FormInput({ label, name, type = "text", required = true }: FormInputProps) {
  return (
    <div className="space-y-2">
      <input
        name={name}
        type={type}
        required={required}
        placeholder={`${label}${required ? "*" : ""}`}
        className="w-full px-4 py-3 bg-white text-gray-900 border border-transparent focus:border-gray-300 focus:outline-none transition-all placeholder:text-gray-400 text-sm"
      />
    </div>
  );
}

interface FormSelectProps {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}

function FormSelect({ label, name, options, required = true }: FormSelectProps) {
  return (
    <div className="space-y-2">
      <select
        name={name}
        required={required}
        defaultValue=""
        className="w-full px-4 py-3 bg-white text-gray-900 border border-transparent focus:border-gray-300 focus:outline-none transition-all text-sm appearance-none cursor-pointer invalid:text-gray-400"
      >
        <option value="" disabled>{label}{required ? "*" : ""}</option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="text-gray-900">{opt}</option>
        ))}
      </select>
    </div>
  );
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("http://localhost:1000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to send message");
      }

      setSubmitted(true);
      formRef.current?.reset();
      toast.success("Message sent successfully!");
    } catch (err: any) {
      console.error("Contact Form Error:", err);
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendAnother = () => {
    setSubmitted(false);
    formRef.current?.reset();
  };

  return (
    <section className="bg-[#1A1A1A] py-24 text-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How can we help you?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm">
            Fill out the form and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="space-y-12">
          <h3 className="text-2xl font-bold border-l-4 border-blue-400 pl-4">Send us a message</h3>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormInput label="Your name" name="name" />
              <FormSelect
                label="Preferred contact method"
                name="contactMethod"
                options={["By email", "By phone", "Other"]}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormInput label="Phone number" name="phone" type="tel" required={false} />
              <FormInput label="Email address" name="email" type="email" required={false} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormSelect
                label="City / Province"
                name="city"
                options={["Phnom Penh", "Siem Reap", "Sihanoukville", "Battambang", "Other"]}
              />
              <FormSelect
                label="Country"
                name="country"
                options={["Cambodia", "Korea", "Vietnam", "Laos", "Singapore", "Other"]}
              />
            </div>

            <div className="space-y-2">
              <textarea
                name="message"
                required
                placeholder="How can we help you?*"
                className="w-full px-4 py-3 bg-white text-gray-900 border border-transparent focus:border-gray-300 focus:outline-none transition-all placeholder:text-gray-400 text-sm min-h-[150px] resize-none"
              />
            </div>

            {/* ✅ Inline success feedback — no full-page takeover */}
            <div className="flex justify-end items-center gap-4">
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Message sent!</span>
                  <button
                    type="button"
                    onClick={handleSendAnother}
                    className="text-blue-400 hover:underline ml-1"
                  >
                    Send another?
                  </button>
                </motion.div>
              )}
              <button
                type="submit"
                disabled={loading || submitted}
                className="bg-[#BF1A1A] text-white px-8 py-3 font-bold text-xs hover:bg-[#D98B5F] transition-colors disabled:opacity-50"
              >
                {loading ? "Sending..." : submitted ? "Sent ✓" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}