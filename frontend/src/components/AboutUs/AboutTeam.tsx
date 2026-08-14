import { motion } from "framer-motion";
import { Container } from "@/components/Common/Container";
import { useRef, useEffect, useState } from "react";

import team1 from "@/assets/team/picture on QR cord/Frame 15.webp";
import team2 from "@/assets/team/picture on QR cord/Frame 3.webp";
import team3 from "@/assets/team/picture on QR cord/Frame 4.webp";
import team4 from "@/assets/team/picture on QR cord/Frame 5.webp";
import team5 from "@/assets/team/picture on QR cord/Frame 6.webp";
import team6 from "@/assets/team/picture on QR cord/Frame 7.webp";
import team7 from "@/assets/team/picture on QR cord/Frame 8.webp";
import team8 from "@/assets/team/picture on QR cord/Frame 9.webp";
import team9 from "@/assets/team/picture on QR cord/Frame 10.webp";
import team10 from "@/assets/team/picture on QR cord/Frame 11.webp";
import team11 from "@/assets/team/picture on QR cord/Frame 12.webp";
import team12 from "@/assets/team/picture on QR cord/Frame 13.webp";
import team13 from "@/assets/team/picture on QR cord/Frame 14.webp";
import team14 from "@/assets/team/picture on QR cord/Frame 17.webp";
import team15 from "@/assets/team/picture on QR cord/Frame 16.webp";


const teamData = [
  { name: "Sok Samnang", designation: "T&C and Design Technical Manager ", image: team14 },
  { name: "Vy Leangcheu", designation: "Senior ELV Engineer ", image: team6 },
  { name: "You Chyvon", designation: "T&C ELV Engineer ", image: team1 },
  { name: "Soun Seamouy", designation: "ELV Design & Costing Enginner", image: team2 },
  { name: "Suo Huyna", designation: "Accountant", image: team3 },
  { name: "Rous Chenda", designation: "ELV Design & Costing Enginner", image: team4 },
  { name: "Chen Daneth", designation: "BMS & ELV Design engineer", image: team5 },
  { name: "Soeun Sol", designation: "T&C ELV Engineer ", image: team7 },
  { name: "Phan Chitra", designation: "Junior Sale & Digital marketing ", image: team8 },
  { name: "Rin Seyha", designation: "BMS T&C Engineer ", image: team9 },
  { name: "Khov Bunly", designation: "Engineer", image: team10 },
  { name: "Lim Theavan", designation: "BMS & ELV T&C Engineer", image: team11 },
  { name: "Chun Leapheng", designation: "BMS & ELV ENGINEER", image: team12 },
  { name: "Vy Vandy", designation: "T&C ELV Engineer ", image: team13 },

];

export function AboutTeam() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0 });

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || isHovering) return;

    const timer = setInterval(() => {
      const half = el.scrollWidth / 2;
      el.scrollLeft += 0.5;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
    }, 16);

    return () => clearInterval(timer);
  }, [isHovering]);

  return (
    <section className="py-24 bg-[#F9F8F3] overflow-hidden text-sm">
      <Container>
        {/* Header Section */}
        <div className="max-w-3xl mb-20">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6 tracking-tight"
          >
            The Team Behind Intersys
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-base leading-relaxed"
          >
            Our dedicated team of experienced professionals is at the heart of what we do.
            With a deep knowledge of the local market and a passion for helping clients
            achieve their engineering goals, we're here to guide you every step of the way.
          </motion.p>
        </div>

      </Container>

      {/* Infinite Animated Marquee */}
      <div className="relative w-full overflow-hidden py-10 mt-4">
        {/* Gradient overlays for smooth fading edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#F9F8F3] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#F9F8F3] to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollerRef}
          className="flex overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            dragRef.current.active = false;
          }}
          onMouseDown={(e) => {
            dragRef.current.active = true;
            dragRef.current.startX = e.pageX;
            dragRef.current.scrollLeft = e.currentTarget.scrollLeft;
          }}
          onMouseMove={(e) => {
            if (!dragRef.current.active) return;
            const dx = e.pageX - dragRef.current.startX;
            e.currentTarget.scrollLeft = dragRef.current.scrollLeft - dx;
          }}
          onMouseUp={() => (dragRef.current.active = false)}
        >
          <div className="flex space-x-8 w-max px-4">
            {[...teamData, ...teamData].map((member, i) => (
              <div
                key={`${member.name}-${i}`}
                className="flex flex-col group w-[280px] shrink-0"
              >
                {/* Image Container */}
                <div className="relative aspect-[1/1.1] bg-[#E8E7E2] overflow-hidden mb-6 rounded-md shadow-sm">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Info Area */}
                <div className="space-y-0.5 text-center">
                  <h3 className="text-base font-bold text-[#1A1A1A]">
                    {member.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    {member.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}