import { Mail, Phone, MapPin } from "lucide-react";

interface ContactItemProps {
    icon: any;
    title: string;
    value: string;
    link?: string;
}

function ContactItem({ icon: Icon, title, value, link }: ContactItemProps) {
    return (
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Icon className="w-4 h-4 text-gray-500" />
            </div>
            <div>
                <p className="text-xs text-gray-400">{title}</p>
                {link ? (
                    <a href={link} className="font-semibold text-gray-900 hover:text-red-600 transition-colors">
                        {value}
                    </a>
                ) : (
                    <p className="font-semibold text-gray-900">{value}</p>
                )}
            </div>
        </div>
    );
}

export function ContactInfo() {
    return (
        <div className="lg:col-span-4 space-y-10">
            <h2 className="text-2xl font-bold">Contact Info</h2>

            <div className="space-y-6">
                <ContactItem
                    icon={Phone}
                    title="Phone"
                    value="077 602 334"
                    link="tel:+85577602334"
                />
                <ContactItem
                    icon={Mail}
                    title="Email"
                    value="info@intersys-solutions.com"
                    link="mailto:info@intersys-solutions.com"
                />
                <ContactItem
                    icon={MapPin}
                    title="Location"
                    value="Sen Sok, Phnom Penh"
                />
            </div>

            {/* TELEGRAM */}
            <a
                href="https://t.me/chun_sochet"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-blue-500/40 transition-all hover:-translate-y-1"
            >
                <h3 className="font-bold mb-2">Telegram</h3>
                <p className="text-sm opacity-80 mb-4">Chat instantly with our team</p>
                <div className="bg-white p-2 rounded-lg inline-block">
                    <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://t.me/chun_sochet"
                        className="w-28 h-28"
                        alt="Telegram QR"
                    />
                </div>
            </a>
        </div>
    );
}
