import { Mail, Phone, MapPin } from "lucide-react";

interface ContactItemProps {
  icon: any;
  title: string;
  value: string;
  link?: string;
}

function ContactItem({ icon: Icon, title, value, link }: ContactItemProps) {
  const content = (
    <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-gray-200 transition-all">
      <div className="w-11 h-11 shrink-0 bg-red-50 rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-red-600" />
      </div>

      <div className="space-y-1">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-base font-semibold text-gray-900 leading-relaxed break-words">
          {value}
        </p>
      </div>
    </div>
  );

  if (link) {
    return (
      <a 
        href={link} 
        className="block"
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return content;
}

export function ContactInfo() {
  return (
    <div className="lg:col-span-4">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl border border-gray-100 space-y-8">

        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contact information</h2>
          <p className="text-gray-500 text-sm mt-1">
            You can reach us through the following channels
          </p>
        </div>

        {/* Contact Items */}
        <div className="space-y-4">
          <ContactItem
            icon={Phone}
            title="Phone / Telegram"
            value="077 602 334"
            link="https://t.me/chun_sochet"
          />

          <ContactItem
            icon={Mail}
            title="Email"
            value="sochet@intersys-solutions.com"
            link="mailto:sochet@intersys-solutions.com"
          />

          <ContactItem
            icon={MapPin}
            title="Office address"
            value="No. 13, Borey Pipub Thmey Samrong Anthet (2), 2nd Floor, St 07, Krang Thmey Village, Sangkat Kok Khlang, Khan Sen Sok, Phnom Penh, Cambodia"
            link="https://maps.app.goo.gl/kE5C1xd5F58TcYJo8"
          />
        </div>

        {/* Telegram */}
        <div className="rounded-xl border border-gray-100 bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-lg">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Telegram</h3>
            <p className="text-sm opacity-90">Chat with us instantly</p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <a
              href="https://t.me/chun_sochet"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white text-blue-600 text-sm font-medium rounded-lg hover:bg-gray-100 transition"
            >
              Open chat
            </a>

            <div className="bg-white p-2 rounded-lg">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://t.me/chun_sochet"
                className="w-20 h-20"
                alt="Telegram QR"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
