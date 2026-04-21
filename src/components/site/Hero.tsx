import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Play } from "lucide-react";
import { Container } from "./Container";
import heroImg from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-navy-deep text-white">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy-deep/90 to-navy" />

      {/* Floating orbs */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-brand-red/20 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[140px]"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-12 gap-6 items-center">
          <div className="col-span-12 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur px-4 py-1.5 text-xs font-medium uppercase tracking-wider"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse" />
              Smart Engineering Solutions
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tight"
            >
              Smart Building <br />
              Solutions for a <br />
              <span className="text-brand-red">Safer</span> Future.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-7 max-w-xl text-lg text-white/70 leading-relaxed"
            >
              We design, integrate, and maintain advanced control systems — from fire safety and
              HVAC to access control and IoT — for forward-thinking infrastructure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-md bg-brand-red px-7 py-4 text-sm font-semibold shadow-xl shadow-brand-red/30 hover:bg-brand-red-glow transition-all"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 backdrop-blur px-7 py-4 text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                <Play className="h-4 w-4" /> View Our Work
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="col-span-12 lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-navy-deep/60 via-transparent to-brand-red/20 z-10" />
              <img
                src={heroImg}
                alt="Smart engineering control room"
                width={1920}
                height={1080}
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20 flex items-end justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/60">
                    Live Operations
                  </div>
                  <div className="font-display text-2xl font-bold mt-1">24/7 Monitoring</div>
                </div>
                <div className="rounded-md bg-brand-red px-3 py-1.5 text-xs font-semibold">
                  ONLINE
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
