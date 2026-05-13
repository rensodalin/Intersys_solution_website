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
      <ContactInfo />
      <ContactMap />
      <ContactForm />
    </div>
  );
}
