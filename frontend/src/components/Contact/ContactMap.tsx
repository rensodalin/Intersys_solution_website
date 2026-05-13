import { MapPin } from "lucide-react";

export function ContactMap() {
  return (
    <section className="w-full">
      <div className="h-[500px] w-full shadow-inner relative group">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7817.078109736049!2d104.8630207!3d11.5848656!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095169a6177b89%3A0xc2e636c16c830aae!2sIntersys%20Solutions%20Co.%2C%20Ltd!5e0!3m2!1skm!2skh!4v1776873531288!5m2!1skm!2skh"
          className="w-full h-full border-0  transition-all duration-700"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
      </div>
    </section>
  );
}
