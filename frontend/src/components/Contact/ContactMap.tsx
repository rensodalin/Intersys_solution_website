export function ContactMap() {
    return (
        <section className="pb-24">
            <div className="max-w-6xl mx-auto px-6">
                <div className="rounded-3xl overflow-hidden h-[500px] shadow-2xl relative group">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7817.078109736049!2d104.8630207!3d11.5848656!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095169a6177b89%3A0xc2e636c16c830aae!2sIntersys%20Solutions%20Co.%2C%20Ltd!5e0!3m2!1skm!2skh!4v1776873531288!5m2!1skm!2skh"
                        className="w-full h-full border-0 transition-transform duration-700 group-hover:scale-105"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                    <div className="absolute bottom-6 left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                        <p className="font-bold text-sm text-gray-900">Intersys Solutions HQ</p>
                        <p className="text-xs text-gray-500">Sen Sok, Phnom Penh, Cambodia</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
