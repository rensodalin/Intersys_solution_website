import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Calendar, Clock, Share2, Copy, Check, Quote } from "lucide-react";
import { SAMPLE_BLOG_POSTS } from "./blog.index";
import environment from "@/enviroment/enviroment";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogDetailPage,
});

function BlogDetailPage() {
  const { slug } = Route.useParams();
  const [copied, setCopied] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(
    SAMPLE_BLOG_POSTS.find((p) => p.slug === slug) || SAMPLE_BLOG_POSTS[0]
  );

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const baseUrl = environment;
        const res = await fetch(`${baseUrl}/api/blogs/${slug}`);
        const json = await res.json();
        if (json.success && json.data) {
          setCurrentPost(json.data);
        }
      } catch (err) {
        console.warn("Failed to fetch blog detail from API:", err);
      }
    };
    fetchBlogDetail();
  }, [slug]);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1A202C] pt-24 md:pt-32 pb-20 font-sans selection:bg-[#D62828] selection:text-white">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex flex-wrap items-center gap-2 text-xs font-medium text-gray-500 mb-3">
          <Link to="/" className="hover:text-[#D62828] transition-colors">
            Home
          </Link>
          <ChevronRight size={12} className="text-gray-400" />
          <Link to="/blog" className="hover:text-[#D62828] transition-colors">
            Blog
          </Link>
          <ChevronRight size={12} className="text-gray-400" />
          <span className="text-[#D62828] font-bold">{currentPost.category}</span>
        </nav>

        {/* Category & Metadata */}
        <div className="flex flex-wrap items-center gap-2.5 mb-3 text-xs font-semibold text-gray-500">
          <span className="bg-[#1A202C] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-sm">
            {currentPost.category}
          </span>
          <span className="flex items-center gap-1">
            <span>•</span>
            <Calendar size={12} className="text-gray-400" />
            {currentPost.date}
          </span>
        </div>

        {/* Article Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A202C] tracking-tight leading-snug mb-3">
          {currentPost.title}
        </h1>

        {/* Subtitle / Lead text */}
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal mb-6">
          {currentPost.subtitle}
        </p>

        {/* Full Width Top Cover Hero Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md shadow-sm mb-10 bg-gray-100">
          <img
            src={currentPost.image}
            alt={currentPost.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* MAIN ARTICLE BODY CONTENT */}
        <article className="space-y-10 text-gray-700 leading-relaxed font-normal">
          
          {/* SECTION 1 */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A202C] tracking-tight">
              What Is an Integrated Building Management System?
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-gray-700">
              An Integrated Building Management System (IBMS) is a master supervisory platform that connects, automates, and monitors all vital mechanical, electrical, and electromechanical facilities within modern commercial and institutional architecture.
            </p>

            <p className="text-xs sm:text-sm leading-relaxed text-gray-600">
              Unlike legacy isolated controllers, an IBMS acts as the central nervous system of a facility, unifying disparate industrial protocols such as BACnet, Modbus, and LonWorks into an actionable single-pane-of-glass interface.
            </p>

            {/* Blockquote */}
            <div className="relative my-6 p-5 sm:p-6 rounded-sm bg-gray-50 border-l-4 border-[#D62828]">
              <Quote className="text-[#D62828] mb-2 opacity-80" size={24} />
              <p className="text-base sm:text-lg font-bold text-[#1A202C] italic leading-snug">
                "True building intelligence is achieved when operational technology (OT) seamlessly communicates with enterprise information systems."
              </p>
            </div>

            {/* Side by Side Images Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-8">
              <figure className="space-y-1.5">
                <div className="aspect-[4/3] rounded-md overflow-hidden bg-gray-100 shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop"
                    alt="High-density operations center running real-time IBMS analytics."
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="text-[11px] font-medium text-gray-500 italic">
                  High-density operations center running real-time IBMS analytics.
                </figcaption>
              </figure>

              <figure className="space-y-1.5">
                <div className="aspect-[4/3] rounded-md overflow-hidden bg-gray-100 shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop"
                    alt="Direct digital controllers communicating via high-speed BACnet IP backbone."
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="text-[11px] font-medium text-gray-500 italic">
                  Direct digital controllers communicating via high-speed BACnet IP backbone.
                </figcaption>
              </figure>
            </div>
          </div>

          {/* SECTION 2 */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A202C] tracking-tight">
              Key Systems Connected to BMS
            </h2>

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              A comprehensive IBMS coordinates multiple specialized subsystems across the entire building envelope:
            </p>

            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700 pl-1">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D62828] mt-2 shrink-0" />
                <span>
                  <strong className="font-bold text-[#1A202C]">HVAC Automation:</strong> Variable Air Volume (VAV) controllers, chillers, cooling towers, and air handling units (AHUs).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D62828] mt-2 shrink-0" />
                <span>
                  <strong className="font-bold text-[#1A202C]">Intelligent Lighting:</strong> Daylight harvesting sensors, automated occupancy dimming, and emergency egress lighting.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D62828] mt-2 shrink-0" />
                <span>
                  <strong className="font-bold text-[#1A202C]">Power & Sub-Metering:</strong> Real-time kilowatt-hour demand tracking, power quality telemetry, and backup generator sync.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D62828] mt-2 shrink-0" />
                <span>
                  <strong className="font-bold text-[#1A202C]">Physical Access & CCTV:</strong> Integrated badge readers, biometrics, turnstiles, and fire safety overrides.
                </span>
              </li>
            </ul>

            {/* Protocol Comparison Table */}
            <div className="my-5 overflow-x-auto rounded-sm border border-gray-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#1A202C] text-white font-bold">
                  <tr>
                    <th className="px-4 py-2.5">Subsystem</th>
                    <th className="px-4 py-2.5">Standard Protocol</th>
                    <th className="px-4 py-2.5">Efficiency Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white text-gray-700">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2.5 font-bold text-[#1A202C]">HVAC Chillers & Boilers</td>
                    <td className="px-4 py-2.5 font-mono text-[11px] text-gray-600">BACnet / IP</td>
                    <td className="px-4 py-2.5 font-semibold text-emerald-700">25% - 35% reduction</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2.5 font-bold text-[#1A202C]">Smart LED Arrays</td>
                    <td className="px-4 py-2.5 font-mono text-[11px] text-gray-600">DALI-2 / KNX</td>
                    <td className="px-4 py-2.5 font-semibold text-emerald-700">40% - 60% reduction</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2.5 font-bold text-[#1A202C]">Metering & Switchgear</td>
                    <td className="px-4 py-2.5 font-mono text-[11px] text-gray-600">Modbus RTU/TCP</td>
                    <td className="px-4 py-2.5 font-semibold text-emerald-700">Peak-demand mitigation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION 3: Numbered 2x2 Grid */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A202C] tracking-tight">
              Improve Energy Efficiency
            </h2>

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              BMS helps buildings use energy more efficiently by monitoring and continuously optimizing dynamic building systems.
            </p>

            <p className="text-xs font-bold text-gray-500 tracking-wider">
              Key operational methodologies include:
            </p>

            {/* Numbered 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-5">
              
              {/* Item 1 */}
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#D62828]">
                  1. Monitor energy consumption
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-normal">
                  Identify real-time baseline fluctuations and load spikes across individual floor zones.
                </p>
              </div>

              {/* Item 2 */}
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#D62828]">
                  2. Optimize HVAC operation
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-normal">
                  Dynamic chilled water reset routines based on ambient enthalpy and occupancy density.
                </p>
              </div>

              {/* Item 3 */}
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#D62828]">
                  3. Control lighting schedules
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-normal">
                  Astro-clock scheduling combined with PIR multi-sensors.
                </p>
              </div>

              {/* Item 4 */}
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#D62828]">
                  4. Identify abnormal energy usage
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-normal">
                  Automated fault detection and diagnostics (AFDD) alert engineering teams to malfunctioning dampers or stuck valves before energy waste escalates.
                </p>
              </div>

            </div>

            {/* Figure 3 Image */}
            <figure className="space-y-1.5 my-6">
              <div className="aspect-[16/9] rounded-md overflow-hidden bg-gray-100 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
                  alt="Energy consumption dashboard tracking tenant sub-meter trends."
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="text-[11px] font-medium text-gray-500 italic">
                Energy consumption dashboard tracking tenant sub-meter trends.
              </figcaption>
            </figure>
          </div>

          {/* SECTION 4 */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A202C] tracking-tight">
              Why Integrated BMS Matters
            </h2>

            <p className="text-xs sm:text-sm leading-relaxed text-gray-700">
              An Integrated BMS provides far more than centralized control. It creates a connected, resilient environment where critical building systems can be monitored, analyzed, and optimized together.
            </p>

            <p className="text-xs sm:text-sm leading-relaxed text-gray-600">
              As enterprise ESG mandates tighten and smart grid interactions become mandatory, investing in an extensible IBMS architecture ensures your assets remain compliant, cost-effective, and future-proof for decades to come.
            </p>

            {/* Bottom Image */}
            <figure className="space-y-1.5 my-6">
              <div className="aspect-[16/9] rounded-md overflow-hidden bg-gray-100 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
                  alt="The future of sustainable, human-centric built environments."
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="text-[11px] font-medium text-gray-500 italic">
                The future of sustainable, human-centric built environments.
              </figcaption>
            </figure>
          </div>

        </article>

        {/* CTA Card */}
        <div className="mt-12 p-6 rounded-sm bg-[#1A202C] text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-base font-bold">Have a Technical or IBMS Inquiry?</h3>
            <p className="text-gray-300 text-xs">
              Our engineering team is ready to assist with your smart building project requirements.
            </p>
          </div>
          <Link
            to="/request-quote"
            className="px-5 py-2.5 rounded-sm bg-[#D62828] text-white text-xs font-bold hover:bg-white hover:text-[#D62828] transition-all whitespace-nowrap"
          >
            Request a Quote
          </Link>
        </div>

      </div>
    </div>
  );
}
