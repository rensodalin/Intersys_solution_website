import environment from "@/enviroment/enviroment";
import { useEffect, useState } from "react";
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowUpRight, Calendar, User, Tag, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

export const Route = createFileRoute('/insights/')({
  component: InsightsPage,
})

function InsightsPage() {
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const baseUrl = environment;
        const res = await fetch(`${baseUrl}/api/insights`);
        const data = await res.json();
        if (data.success) {
          setInsights(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch insights:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-[#0A0A0A] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-[10px] font-bold tracking-[0.2em] uppercase rounded-full mb-6">
              Our Perspective
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1]">
              Insights & <span className="text-blue-500">Innovation</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Explore our latest case studies, technical breakthroughs, and industry trends in security and automation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter/Tabs (Simplified) */}
      <section className="border-b border-gray-100">
        <div className="container mx-auto px-6 py-6">
          <div className="flex gap-8 overflow-x-auto no-scrollbar">
            {["All", "Commercial", "Retail", "Security", "Automation"].map((cat, i) => (
              <button key={cat} className={cn(
                "text-sm font-semibold whitespace-nowrap transition-colors",
                i === 0 ? "text-blue-600" : "text-gray-400 hover:text-black"
              )}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {insights.map((item, index) => (
              <motion.article 
                key={item.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 rounded-sm mb-6">
                  <img 
                    src={item.image && item.image[0]} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider rounded-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-[11px] text-gray-500 font-medium uppercase tracking-widest">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} /> {item.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User size={12} /> {item.author || "Intersys Team"}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold leading-tight group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>

                  <Link 
                    to={`/insights/${item.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-black group-hover:gap-3 transition-all"
                  >
                    Read Full Story <ArrowUpRight size={16} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Utility for classes
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
