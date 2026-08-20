import { motion } from "framer-motion";
import heroImg from "@/assets/Hero.png";

export function ContactHero() {
  return (
    <section className="relative h-[50vh] min-h-[350px] flex items-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Contact Background"
          className="w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-20 relative z-10 text-white w-full flex flex-col items-center md:items-start text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 font-display tracking-tight text-white leading-tight">
            Contact <span className="text-[#DB1A1A]">Us</span>
          </h1>

          <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed opacity-90 max-w-lg mx-auto md:mx-0">
            Have a project in mind or need expert advice? Reach out to our team and let's build something exceptional together.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
