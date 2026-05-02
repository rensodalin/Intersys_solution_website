import { motion } from "framer-motion";

export function ContactHero() {
  return (
    <section className="relative bg-[#0A0F1A] pt-45 pb-28 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,0,0,0.15),transparent),radial-gradient(circle_at_80%_80%,rgba(0,102,255,0.15),transparent)]" />

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl font-semibold mb-6">
            Contact <span className="text-red-500">Us</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or need expert advice? Reach out to our team and let’s build
            something exceptional together.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
