import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import img1 from "@/assets/image.png";
import img2 from "@/assets/image copy.png";
import img3 from "@/assets/image copy 2.png";
import img4 from "@/assets/image copy 3.png";
import img5 from "@/assets/image copy 4.png";

const posters = [
  {
    src: img1,
    link: "https://www.facebook.com/IntersysSolutions/posts/pfbid06p9f9RFiXFo7Ry1WdqU3oparMRSyoiSSseijFGucuELYA3En1gQLQkFz8gdPbMp7l?rdid=288qEcMIhA3tD3JR#",
  },
  {
    src: img2,
    link: "https://www.facebook.com/IntersysSolutions/posts/pfbid0eCFEQKJka5DRktVaqU9mfFC32oq8NEXJiy5iSxAhWV9ywSEJp4ZFGatrH9azjRSKl?rdid=PVUlGtZxjGKzhgYG#",
  },
  {
    src: img3,
    link: "https://www.facebook.com/IntersysSolutions/posts/pfbid02zpeBZKXdRjkfUrmqMQd1NW6dfyy4UpvcEhZMaUWfk5Vxe6jCMbLtQetqsgE28FGql?rdid=VbFSh3qAHof0Hl6U#",
  },
  {
    src: img4,
    link: "https://www.facebook.com/IntersysSolutions/posts/pfbid0KCKGUAPfUpQUs7FWH2bYX9jnWfJ6njKtzgJLDzuwsfN4rVvvT5uTJWi2q8r3fA9Yl?rdid=op2J1cGAvEwtFIhZ#",
  },
  {
    src: img5,
    link: "https://www.facebook.com/share/p/1AzkC5TcDi/",
  },
];

export function PosterCarousel() {
  const sliderRef = useRef<HTMLDivElement>(null);

  // auto move animation
  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

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
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = direction === "left" ? -500 : 500;

      sliderRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

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
                src={post.src}
                alt={`Poster ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
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

      {/* hide scrollbar */}
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