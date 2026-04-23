import { createFileRoute } from "@tanstack/react-router";
import { ContactHero } from "@/components/Contact/ContactHero";
import { ContactInfo } from "@/components/Contact/ContactInfo";
import { ContactForm } from "@/components/Contact/ContactForm";
import { ContactMap } from "@/components/Contact/ContactMap";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Intersys Solutions" },
      {
        name: "description",
        content:
          "Get in touch with Intersys Solutions. We are ready to help with your smart building, security, and fire safety systems.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="bg-white">
      <ContactHero />

      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-12">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>

      <ContactMap />
    </div>
  );
}
