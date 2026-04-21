import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import img1 from "@/assets/image.png";
import img2 from "@/assets/image copy.png";
import img3 from "@/assets/image copy 2.png";
import img4 from "@/assets/image copy 3.png";
import img5 from "@/assets/image copy 4.png";

const posters = [
    {
        src: img1,
        link: "https://www.facebook.com/IntersysSolutions/posts/pfbid06p9f9RFiXFo7Ry1WdqU3oparMRSyoiSSseijFGucuELYA3En1gQLQkFz8gdPbMp7l?rdid=288qEcMIhA3tD3JR#"
    },
    {
        src: img2,
        link: "https://www.facebook.com/IntersysSolutions/posts/pfbid0eCFEQKJka5DRktVaqU9mfFC32oq8NEXJiy5iSxAhWV9ywSEJp4ZFGatrH9azjRSKl?rdid=PVUlGtZxjGKzhgYG#"
    },
    {
        src: img3,
        link: "https://www.facebook.com/IntersysSolutions/posts/pfbid02zpeBZKXdRjkfUrmqMQd1NW6dfyy4UpvcEhZMaUWfk5Vxe6jCMbLtQetqsgE28FGql?rdid=VbFSh3qAHof0Hl6U#"
    },
    {
        src: img4,
        link: "https://www.facebook.com/IntersysSolutions/posts/pfbid0KCKGUAPfUpQUs7FWH2bYX9jnWfJ6njKtzgJLDzuwsfN4rVvvT5uTJWi2q8r3fA9Yl?rdid=op2J1cGAvEwtFIhZ#"
    },
    {
        src: img5,
        link: "https://www.facebook.com/share/p/1AzkC5TcDi/"
    }
];

export function PosterCarousel() {
    const sliderRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (sliderRef.current) {
            const scrollAmount = direction === "left" ? -500 : 500;
            sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <section className="bg-[#f8f9fc] py-16 md:py-24 border-t border-border overflow-hidden relative group/section">

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 z-10 opacity-0 group-hover/section:opacity-100 transition-opacity duration-300">
                <button
                    onClick={() => scroll("left")}
                    className="bg-white/90 backdrop-blur-sm shadow-xl border border-black/10 text-[#071321] w-14 h-14 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all"
                >
                    <ChevronLeft strokeWidth={2.5} className="w-6 h-6 -ml-1" />
                </button>
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 z-10 opacity-0 group-hover/section:opacity-100 transition-opacity duration-300">
                <button
                    onClick={() => scroll("right")}
                    className="bg-white/90 backdrop-blur-sm shadow-xl border border-black/10 text-[#071321] w-14 h-14 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all"
                >
                    <ChevronRight strokeWidth={2.5} className="w-6 h-6 -mr-1" />
                </button>
            </div>

            <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-[44px] font-bold text-[#071321] tracking-tight">
                    Social Highlights.
                </h2>
            </div>

            <div
                ref={sliderRef}
                className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 px-4 md:px-24"
            >
                {posters.map((post, idx) => (
                    <a
                        key={idx}
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="snap-center shrink-0 w-[75vw] sm:w-[300px] md:w-[350px] lg:w-[380px] relative group block overflow-hidden rounded-xl border border-black/5 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white"
                    >
                        <div className="w-full h-auto aspect-[4/5] sm:aspect-[3/4] flex items-center justify-center overflow-hidden bg-[#f4f6f9] relative">
                            <img
                                src={post.src}
                                alt={`Intersys Solutions Featured Poster ${idx + 1}`}
                                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Facebook Hover Overlay layer */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="bg-[#1877F2] text-white px-8 py-3 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl flex items-center gap-3">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    Go To Post
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
                {/* Invisible spacer div to ensure padding right is respected in scroll */}
                <div className="snap-center shrink-0 w-1 md:w-16" />
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
