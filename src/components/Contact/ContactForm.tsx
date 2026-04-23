import { useState } from "react";
import { MessageSquare, User, Mail, Smartphone, Briefcase, Send } from "lucide-react";

interface InputFieldProps {
    label: string;
    name: string;
    type?: string;
    icon: any;
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
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

                <form autoComplete="on" onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <InputField
                            label="First Name"
                            name="firstName"
                            autoComplete="given-name"
                            icon={User}
                        />
                        <InputField
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name"
                            icon={User}
                        />
                        <InputField
                            label="Email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            icon={Mail}
                        />
                        <InputField
                            label="Phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            icon={Smartphone}
                        />
                        <InputField
                            label="Company"
                            name="company"
                            autoComplete="organization"
                            icon={Briefcase}
                        />
                        <InputField
                            label="Position"
                            name="position"
                            autoComplete="organization-title"
                            icon={Briefcase}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-gray-400">Message</label>
                        <textarea
                            name="message"
                            autoComplete="off"
                            className="w-full p-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[120px]"
                            placeholder="Your message..."
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitted}
                        className="w-full md:w-auto px-8 py-4 bg-red-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitted ? "Sent ✓" : "Send Message"}
                        {!submitted && <Send size={16} />}
                    </button>
                </form>
            </div>
        </div>
    );
}
