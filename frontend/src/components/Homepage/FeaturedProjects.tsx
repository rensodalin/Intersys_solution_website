import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";

interface Project {
  _id: string;
  title: string;
  desc: string;
  image: string;
  category: string;
  slug?: string;
}

export function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const baseUrl = `http://${window.location.hostname}:1000`;
        const res = await fetch(`${baseUrl}/api/projects`);
        const data = await res.json();
        if (data.success) {
          // Show all projects from the database to match the project page
          setProjects(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch featured projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="bg-white py-20 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#D62828] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="bg-white overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
        {projects.map((p, i) => {
          const Content = (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative aspect-square overflow-hidden cursor-pointer bg-[#162E93] rounded-none"
            >
              {/* Image */}
              <img
                src={p.image}
                alt={p.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 rounded-none"
              />

              {/* Soft overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-[#162E93]/70 transition-all duration-500" />

              {/* Bottom title (default state) */}
              <div className="absolute bottom-0 inset-x-0 p-5 z-20 group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-sm font-semibold text-white leading-snug drop-shadow">
                  {p.title}
                </h3>
              </div>

              {/* Hover content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-30 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">

                {/* category */}
                <span className="inline-block w-fit bg-[#D62828] text-white text-[10px] font-bold px-3 py-1 rounded-sm mb-3">
                  {p.category}
                </span>

                <h3 className="text-lg md:text-xl font-semibold text-white mb-3 leading-snug">
                  {p.title}
                </h3>

                <div className="w-8 h-[2px] bg-[#D62828] mb-3" />

                <p className="text-white/80 text-xs md:text-sm leading-relaxed line-clamp-3">
                  {p.desc}
                </p>
              </div>
            </motion.div>
          );

          return (
            <Link key={p._id || p.title} to="/projects" className="block">
              {Content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}