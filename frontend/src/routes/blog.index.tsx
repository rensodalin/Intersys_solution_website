import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import environment from "@/enviroment/enviroment";
import { useEffect } from "react";

export const Route = createFileRoute("/blog/")({
  component: BlogPage,
});

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  summary: string;
  image: string;
  featured?: boolean;
  commentsCount?: number;
}

export const SAMPLE_BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    slug: "what-is-an-integrated-building-management-system",
    title: "What Is an Integrated Building Management System?",
    subtitle: "Discover how modern Integrated Building Management Systems (IBMS) synchronize HVAC, lighting, security, and power monitoring into a unified intelligent command center.",
    category: "Technology",
    readTime: "2 min read",
    date: "August 22, 2026",
    commentsCount: 4,
    author: {
      name: "Eng. David Montgomery",
      role: "Author",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    summary: "An Integrated Building Management System (IBMS) connects, automates, and monitors all vital mechanical, electrical, and electromechanical facilities within modern architecture.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "blog-2",
    slug: "water-leak-detection-critical-data-centers",
    title: "Protecting High-Density Data Centers with Addressable Leak Sensing",
    subtitle: "A deep dive into addressable sensing cables for server rooms and semiconductor fabs.",
    category: "Leak Detection",
    readTime: "4 min read",
    date: "August 18, 2026",
    commentsCount: 2,
    author: {
      name: "Chun Sochet",
      role: "Managing Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    summary: "Water damage is one of the top causes of unplanned downtime in data centers. Learn how addressable sensing cables pinpoint liquid leaks to within 1 meter.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "blog-3",
    slug: "wireless-access-control-integration-salto",
    title: "Keyless Modernization: Salto Wireless Access in High-Rises",
    subtitle: "Overcoming legacy wiring constraints with smart locksets and virtual networks.",
    category: "Access Control",
    readTime: "5 min read",
    date: "August 12, 2026",
    commentsCount: 6,
    author: {
      name: "Systems Architect",
      role: "Access & Security Specialist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    },
    summary: "Retrofitting access control in commercial buildings no longer requires tearing open walls. Discover how Salto Wireless enables keyless access deployment.",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "blog-4",
    slug: "advanced-vesda-aspirating-smoke-detection",
    title: "Early Warning Fire Safety: Why VESDA Aspirating Detection Matters",
    subtitle: "Detecting smoldering fires hours before traditional optical smoke detectors trigger.",
    category: "Fire Protection",
    readTime: "5 min read",
    date: "July 29, 2026",
    commentsCount: 1,
    author: {
      name: "Safety Engineering Dept",
      role: "Fire Safety Advisory",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    },
    summary: "In mission-critical spaces like cleanrooms and server vaults, standard smoke detectors react too late. VESDA continuous air sampling detects fires early.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "blog-5",
    slug: "cctv-surveillance-ai-analytics-cambodia",
    title: "AI Video Analytics: Elevating CCTV Beyond Passive Recording",
    subtitle: "Automated perimeter detection, facial recognition, and crowd density insights.",
    category: "Surveillance",
    readTime: "4 min read",
    date: "July 15, 2026",
    commentsCount: 3,
    author: {
      name: "Security Division",
      role: "Surveillance Team",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    },
    summary: "Modern security cameras do far more than store footage. AI video analytics actively monitor boundaries and trigger automated alerts in real time.",
    image: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "blog-6",
    slug: "audio-visual-smart-meeting-room-guide",
    title: "Designing Hybrid Corporate Workspaces with Smart AV Solutions",
    subtitle: "Seamless video conferencing, wireless screen sharing, and acoustic design.",
    category: "Audio Visual",
    readTime: "4 min read",
    date: "July 02, 2026",
    commentsCount: 5,
    author: {
      name: "AV Project Team",
      role: "Media Solutions Lead",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    },
    summary: "Create friction-free boardroom environments with automated lighting, motorized screens, and integrated video conferencing equipment.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop",
  },
];

const CATEGORIES = [
  "All",
  "Technology",
  "Leak Detection",
  "Access Control",
  "Fire Protection",
  "Surveillance",
  "Audio Visual",
];

function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(SAMPLE_BLOG_POSTS);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const baseUrl = environment;
        const res = await fetch(`${baseUrl}/api/blogs`);
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setPosts(json.data);
        }
      } catch (err) {
        console.warn("Failed to fetch live blogs from API:", err);
      }
    };
    fetchBlogs();
  }, []);

  const featuredPost = useMemo(() => {
    return posts.find((p) => p.featured) || posts[0];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" ||
        post.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.summary && post.summary.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F5F6F8] text-[#111827] pt-28 md:pt-36 pb-24 font-sans selection:bg-[#D62828] selection:text-white">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">

        {/* Top Hero Layout matching reference design */}
        {featuredPost && (
          <div className="mb-20">
            <div className="relative bg-[#22272E] rounded-none overflow-hidden min-h-[460px] lg:min-h-[500px] flex flex-col lg:flex-row items-stretch shadow-2xl">

              {/* Left Side: Floating Overlapping White Content Card */}
              <div className="w-full lg:w-[46%] p-8 sm:p-12 lg:py-16 lg:pl-16 lg:pr-8 bg-white flex flex-col justify-center relative z-20 shadow-2xl lg:-mr-12 my-auto lg:my-10 lg:ml-10 border-b border-gray-100 lg:border-none">

                {/* Meta string line */}
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 mb-4 flex-wrap">
                  <span>{featuredPost.date}</span>
                  <span>•</span>
                  <span className="text-[#D62828] font-bold">Featured</span>
                  <span>•</span>
                  <span>{featuredPost.commentsCount || 4} Comments</span>
                </div>

                <div className="w-8 h-[2px] bg-[#D62828] mb-5" />

                {/* Main Hero Article Title */}
                <h1 className="text-2xl sm:text-3xl md:text-3xl font-extrabold text-[#1A202C] leading-snug tracking-tight mb-4">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: featuredPost.slug }}
                    className="hover:text-[#D62828] transition-colors"
                  >
                    {featuredPost.title}
                  </Link>
                </h1>

                {/* Subtitle / Excerpt */}
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-normal mb-6">
                  {featuredPost.summary}
                </p>

                {/* Read More Link */}
                <div>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: featuredPost.slug }}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#D62828] hover:text-[#B91C1C] transition-all group"
                  >
                    <span>Read More</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

              </div>

              {/* Right Side: High Impact Full Image */}
              <div className="w-full lg:w-[60%] relative min-h-[300px] lg:min-h-full overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>

            </div>
          </div>
        )}

        {/* Section Header: Browse and read the latest articles */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200/80 pb-6">
          <div>

            <h2 className="text-3xl font-black text-[#1A202C] tracking-tight">
              Latest Stories
            </h2>
          </div>

          {/* Search bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex items-center min-w-[220px]">
              <Search size={14} className="absolute left-3 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stories..."
                className="w-full bg-white text-xs text-gray-800 placeholder:text-gray-400 pl-9 pr-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-[#D62828] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer border rounded-sm",
                  isActive
                    ? "bg-[#D62828] text-white border-[#D62828] shadow-sm"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 3-COLUMN GRID MATCHING THE REFERENCE DESIGN LAYOUT */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-14 gap-x-8">
            {filteredPosts.slice(0, visibleCount).map((post) => (
              <article key={post.id} className="group flex flex-col">

                {/* Image Box */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                  <Link to="/blog/$slug" params={{ slug: post.slug }}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                </div>

                {/* Overlapping White Box at Bottom-Left */}
                <div className="-mt-8 ml-0 sm:ml-4 mr-4 bg-white p-5 shadow-lg border border-gray-100 relative z-10 flex flex-col justify-between flex-1">
                  <div>
                    {/* Meta line */}
                    <div className="text-xs font-semibold text-gray-400 mb-1.5 flex items-center gap-1.5 flex-wrap">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span className="text-gray-500">{post.category}</span>
                    </div>

                    <div className="w-6 h-[2px] bg-[#D62828] mb-3" />

                    {/* Title */}
                    <h3 className="text-base font-extrabold text-[#1A202C] leading-snug tracking-tight mb-2 group-hover:text-[#D62828] transition-colors">
                      <Link to="/blog/$slug" params={{ slug: post.slug }}>
                        {post.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-gray-500 leading-relaxed font-normal line-clamp-3 mb-4">
                      {post.summary}
                    </p>
                  </div>

                  {/* Read More Link */}
                  <div>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="inline-flex items-center gap-1 text-xs font-extrabold text-[#D62828] hover:text-[#B91C1C] transition-all group/link"
                    >
                      <span>Read More</span>
                      <ArrowRight size={12} className="transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>

              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center border border-gray-200 max-w-md mx-auto my-12 shadow-sm">
            <h4 className="text-sm font-bold text-gray-800 mb-1">No stories found</h4>
            <p className="text-xs text-gray-500 mb-4">
              Try resetting your search query or selecting another category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-4 py-2 bg-[#D62828] text-white text-xs font-bold rounded-sm hover:bg-red-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Centered Pill Button: More Posts */}
        {filteredPosts.length > visibleCount && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              className="inline-block px-10 py-3 bg-[#D62828] hover:bg-[#B91C1C] text-white text-xs font-bold rounded-sm shadow-md shadow-[#D62828]/25 transition-all duration-300 cursor-pointer active:scale-95"
            >
              More Posts
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
