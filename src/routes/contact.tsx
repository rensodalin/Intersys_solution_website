import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Container } from "@/components/site/Container";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Intersys Solutions" },
      {
        name: "description",
        content:
          "Talk to an engineer. Get a quote for your next smart building or industrial automation project.",
      },
      { property: "og:title", content: "Contact — Intersys Solutions" },
      { property: "og:description", content: "Talk to an engineer about your next project." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="pt-40 pb-20 bg-navy-deep text-white relative overflow-hidden dark">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <Container className="relative">
          <div className="max-w-4xl">
            <div className="text-xs uppercase tracking-[0.2em] text-brand-red font-semibold">
              Get in Touch
            </div>
            <h1 className="mt-5 font-display text-5xl md:text-7xl font-bold leading-[1.02]">
              Let's engineer <span className="text-brand-red">something</span> remarkable.
            </h1>
          </div>
        </Container>
      </section>

      <section className="bg-white py-24">
        <Container>
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-12 lg:col-span-5 space-y-6">
              {[
                { icon: Mail, title: "Email", value: "hello@intersys.io" },
                { icon: Phone, title: "Phone", value: "+1 (555) 412-9087" },
                { icon: MapPin, title: "Headquarters", value: "25 Industrial Blvd, Suite 400" },
              ].map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-5 p-6 rounded-xl border border-border hover:border-brand-red transition-colors"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-navy text-white">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">
                      {c.title}
                    </div>
                    <div className="mt-1 font-display font-bold text-navy text-lg">{c.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="col-span-12 lg:col-span-7"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="bg-offwhite rounded-2xl p-8 md:p-10 border border-border"
              >
                <h2 className="font-display text-2xl font-bold text-navy">Start a project</h2>
                <div className="mt-6 grid grid-cols-2 gap-5">
                  <Field label="Name" name="name" />
                  <Field label="Company" name="company" />
                  <Field label="Email" name="email" type="email" full />
                  <Field label="Phone" name="phone" full />
                </div>
                <div className="mt-5">
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Project Details
                  </label>
                  <textarea
                    rows={5}
                    className="mt-2 w-full rounded-md border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-colors"
                    placeholder="Tell us about scope, timeline, location..."
                  />
                </div>
                <button
                  type="submit"
                  className="mt-6 group inline-flex items-center gap-2 rounded-md bg-brand-red px-7 py-4 text-sm font-semibold text-white hover:bg-brand-red-glow transition-colors shadow-lg shadow-brand-red/20"
                >
                  {submitted ? "Thanks — we'll be in touch" : "Send Inquiry"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  full,
}: {
  label: string;
  name: string;
  type?: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "col-span-2" : "col-span-2 sm:col-span-1"}>
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        className="mt-2 w-full rounded-md border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-colors"
      />
    </div>
  );
}
