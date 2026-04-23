import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Container } from "@/components/Common/Container";

export function Testimonial() {
  return (
    <section className="bg-white py-24 border-t border-border">
      <Container>
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-[44px] font-bold text-[#162E93] tracking-tight">
            What Our Clients Say.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 md:p-12 border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group"
          >
            <div className="absolute top-6 right-8 text-[#9B0F06]/10 pointer-events-none transform transition-transform group-hover:scale-110">
              <Quote size={64} fill="currentColor" strokeWidth={0} />
            </div>
            <p className="text-[16px] text-[#4a5568] italic leading-relaxed mb-10 relative z-10 max-w-[90%]">
              "Intersys delivered a reliable BMS system with excellent support. Their team's
              technical knowledge and responsiveness were critical to our project's success."
            </p>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-[#162E93] shadow-md rounded-lg flex-shrink-0" />
              <div>
                <div className="font-bold text-[#162E93] text-sm">Project Manager</div>
                <div className="text-[10px] text-[#6b7c93] font-bold uppercase tracking-wider mt-0.5">
                  Major Hospitality Group
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl p-8 md:p-12 border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group"
          >
            <div className="absolute top-6 right-8 text-[#9B0F06]/10 pointer-events-none transform transition-transform group-hover:scale-110">
              <Quote size={64} fill="currentColor" strokeWidth={0} />
            </div>
            <p className="text-[16px] text-[#4a5568] italic leading-relaxed mb-10 relative z-10 max-w-[90%]">
              "Their fire safety integration was seamless. We feel confident in the safety of our
              assets thanks to Intersys' meticulous engineering and implementation."
            </p>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-[#162E93] shadow-md rounded-lg flex-shrink-0" />
              <div>
                <div className="font-bold text-[#162E93] text-sm">Head of Facilities</div>
                <div className="text-[10px] text-[#6b7c93] font-bold uppercase tracking-wider mt-0.5">
                  Banking Institution
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
