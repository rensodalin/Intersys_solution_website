import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react";

interface Poster {
  _id: string;
  image: string;
  link: string;
  title: string;
  description: string;
  facebookLink: string;
  linkedinLink: string;
}

export function PosterCarousel() {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Poster | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const baseUrl = `http://${window.location.hostname}:1000`;
        const res = await fetch(`${baseUrl}/api/posters`);
        const data = await res.json();
        if (data.success) {
          setPosters(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch posters:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosters();
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || posters.length === 0) return;

    let scrollAmount = 0;
    const autoScroll = () => {
      scrollAmount += 1;
      slider.scrollTo({ left: scrollAmount });
      if (scrollAmount >= slider.scrollWidth / 2) {
        scrollAmount = 0;
      }
    };

    const interval = setInterval(autoScroll, 16);
    return () => clearInterval(interval);
  }, [posters]);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === "left" ? -500 : 500,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  if (loading || posters.length === 0) {
    return (
      <div className="bg-[#f7f8fb] py-20 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#162E93] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden bg-[#f7f8fb] border-t border-black/5 group/section">
        <div className="absolute top-5 right-5 md:right-10 z-20 hidden md:flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 border border-black/10 bg-white text-[#162E93] flex items-center justify-center hover:bg-[#162E93] hover:text-white transition-all duration-300 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={2.4} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 border border-black/10 bg-white text-[#162E93] flex items-center justify-center hover:bg-[#162E93] hover:text-white transition-all duration-300 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" strokeWidth={2.4} />
          </button>
        </div>

        <div ref={sliderRef} className="flex overflow-x-scroll whitespace-nowrap hide-scrollbar">
          {[...posters, ...posters].map((post, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(post)}
              className="relative shrink-0 w-[68vw] sm:w-[250px] md:w-[280px] lg:w-[300px] overflow-hidden border-r border-black/5 group text-left cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#eceff3]">
                <img
                  src={post.image}
                  alt={post.title || `Poster ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  onError={(e) => {
                    (e.currentTarget.closest("button") as HTMLElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
                <div className="absolute inset-x-0 bottom-0 p-5 translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-[1px] bg-white/60" />
                    <span className="text-white text-[10px] uppercase tracking-[0.18em] font-medium">
                      View Details
                    </span>
                  </div>
                  {post.title && (
                    <p className="text-white text-sm mt-2 font-medium truncate">{post.title}</p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </section>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-sm shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="md:w-[55%] bg-[#eceff3] flex items-center justify-center p-4 relative min-h-[250px]">
              <img
                src={selected.image}
                alt={selected.title || "Poster"}
                className="w-full h-auto max-h-[70vh] object-contain rounded-sm shadow-sm"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              {/* Gradient overlay on mobile for readability */}
              <div className="md:hidden absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
              {/* Close button on image for mobile */}
              <button
                onClick={() => setSelected(null)}
                className="md:hidden absolute top-3 right-3 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition cursor-pointer z-10"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="md:w-[45%] flex flex-col min-h-0">
              {/* Close button for desktop */}
              <button
                onClick={() => setSelected(null)}
                className="hidden md:flex absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition cursor-pointer z-10"
              >
                <X size={20} />
              </button>

              {/* Scrollable content area */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 pb-2">
                {selected.title && (
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {selected.title}
                  </h3>
                )}

                {selected.description && (
                  <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                    {selected.description}
                  </div>
                )}

                {!selected.title && !selected.description && (
                  <p className="text-sm text-gray-400">No additional details available.</p>
                )}
              </div>

              {/* Sticky buttons at bottom */}
              {selected.link || selected.facebookLink || selected.linkedinLink ? (
                <div className="flex-shrink-0 p-6 md:p-8 pt-0 md:pt-0 space-y-2.5">
                  {selected.link && (
                    <a
                      href={selected.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#1877F2] text-white text-sm font-bold rounded-sm hover:bg-[#166fe5] transition shadow-md"
                    >
                      <ExternalLink size={15} />
                      View on Facebook
                    </a>
                  )}
                  {selected.linkedinLink && (
                    <a
                      href={selected.linkedinLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-[#0A66C2] text-[#0A66C2] text-sm font-bold rounded-sm hover:bg-[#0A66C2]/5 transition"
                    >
                      <ExternalLink size={15} />
                      View on LinkedIn
                    </a>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
