import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Poster {
  _id: string;
  image: string;
  link: string;
}

export function PosterCarousel() {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Fetch from Backend
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

  // auto move animation (KEEPING YOUR EXACT UI LOGIC)
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || posters.length === 0) return;

    let scrollAmount = 0;
    const autoScroll = () => {
      scrollAmount += 1;
      slider.scrollTo({
        left: scrollAmount,
      });

      // seamless loop
      if (scrollAmount >= slider.scrollWidth / 2) {
        scrollAmount = 0;
      }
    };

    const interval = setInterval(autoScroll, 16);
    return () => clearInterval(interval);
  }, [posters]);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -500 : 500;
      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading || posters.length === 0) {
    return (
      <div className="bg-[#f7f8fb] py-20 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#162E93] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#f7f8fb] border-t border-black/5 group/section">
      {/* floating arrows */}
      <div className="absolute top-5 right-5 md:right-10 z-20 hidden md:flex items-center gap-2">
        <button
          onClick={() => scroll("left")}
          className="w-10 h-10 border border-black/10 bg-white text-[#162E93] flex items-center justify-center hover:bg-[#162E93] hover:text-white transition-all duration-300"
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={2.4} />
        </button>

        <button
          onClick={() => scroll("right")}
          className="w-10 h-10 border border-black/10 bg-white text-[#162E93] flex items-center justify-center hover:bg-[#162E93] hover:text-white transition-all duration-300"
        >
          <ChevronRight className="w-4 h-4" strokeWidth={2.4} />
        </button>
      </div>

      {/* posters */}
      <div
        ref={sliderRef}
        className="flex overflow-x-scroll whitespace-nowrap hide-scrollbar"
      >
        {/* DUPLICATE ARRAY FOR SEAMLESS LOOP */}
        {[...posters, ...posters].map((post, idx) => (
          <a
            key={idx}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
                relative
                shrink-0
                w-[68vw]
                sm:w-[250px]
                md:w-[280px]
                lg:w-[300px]
                overflow-hidden
                border-r
                border-black/5
                group
              "
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[#eceff3]">
              <img
                src={post.image}
                alt={`Poster ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                onError={(e) => {
                  (e.currentTarget.closest("a") as HTMLElement).style.display = "none";
                }}
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />

              {/* hover content */}
              <div className="absolute inset-x-0 bottom-0 p-5 translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-[1px] bg-white/60" />
                  <span className="text-white text-[10px] uppercase tracking-[0.18em] font-medium">
                    Facebook
                  </span>
                </div>
                <p className="text-white text-sm mt-2 font-medium">
                  View Post
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>

      <style>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
    </section>
  );
}