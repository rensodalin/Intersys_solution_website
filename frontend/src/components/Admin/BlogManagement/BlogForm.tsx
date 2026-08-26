import { useState, useEffect } from "react";
import { X, Plus, Trash2, Save } from "lucide-react";
import { BlogItem } from "./types";

interface BlogFormProps {
  initialData?: BlogItem | null;
  onSave: (data: Partial<BlogItem>) => Promise<void>;
  onClose: () => void;
}

const EMPTY_BLOG_FORM: Partial<BlogItem> = {
  title: "",
  slug: "",
  subtitle: "",
  category: "Technology",
  readTime: "3 min read",
  date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  image: "",
  summary: "",
  featured: false,
  author: {
    name: "Eng. David Montgomery",
    role: "Author",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  quote: "",
  section1Title: "",
  section1Content1: "",
  section1Content2: "",
  sideImage1: "",
  sideImage1Caption: "",
  sideImage2: "",
  sideImage2Caption: "",
  section2Title: "",
  section2Intro: "",
  subsystems: [],
  protocolTable: [],
  section3Title: "",
  section3Intro: "",
  methodologies: [],
  section3Image: "",
  section3ImageCaption: "",
  section4Title: "",
  section4Content1: "",
  section4Content2: "",
  section4Image: "",
  section4ImageCaption: "",
};

const SAMPLE_TEMPLATE: Partial<BlogItem> = {
  title: "What Is an Integrated Building Management System?",
  slug: "what-is-an-integrated-building-management-system",
  subtitle: "Discover how modern Integrated Building Management Systems (IBMS) synchronize HVAC, lighting, security, and power monitoring into a unified intelligent command center to maximize operational efficiency.",
  category: "Technology",
  readTime: "2 min read",
  date: "August 22, 2026",
  image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
  summary: "An Integrated Building Management System (IBMS) connects, automates, and monitors all vital mechanical, electrical, and electromechanical facilities within modern architecture.",
  featured: true,
  author: {
    name: "Eng. David Montgomery",
    role: "Author",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  quote: '"True building intelligence is achieved when operational technology (OT) seamlessly communicates with enterprise information systems."',
  section1Title: "What Is an Integrated Building Management System?",
  section1Content1: "An Integrated Building Management System (IBMS) is a master supervisory platform that connects, automates, and monitors all vital mechanical, electrical, and electromechanical facilities within modern commercial and institutional architecture.",
  section1Content2: "Unlike legacy isolated controllers, an IBMS acts as the central nervous system of a facility, unifying disparate industrial protocols such as BACnet, Modbus, and LonWorks into an actionable single-pane-of-glass interface.",
  sideImage1: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop",
  sideImage1Caption: "High-density operations center running real-time IBMS analytics.",
  sideImage2: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
  sideImage2Caption: "Direct digital controllers communicating via high-speed BACnet IP backbone.",
  section2Title: "Key Systems Connected to BMS",
  section2Intro: "A comprehensive IBMS coordinates multiple specialized subsystems across the entire building envelope:",
  subsystems: [
    { name: "HVAC Automation", desc: "Variable Air Volume (VAV) controllers, chillers, cooling towers, and air handling units (AHUs)." },
    { name: "Intelligent Lighting", desc: "Daylight harvesting sensors, automated occupancy dimming, and emergency egress lighting." },
    { name: "Power & Sub-Metering", desc: "Real-time kilowatt-hour demand tracking, power quality telemetry, and backup generator sync." },
    { name: "Physical Access & CCTV", desc: "Integrated badge readers, biometrics, turnstiles, and fire safety overrides." },
  ],
  protocolTable: [
    { subsystem: "HVAC Chillers & Boilers", protocol: "BACnet / IP", impact: "25% - 35% reduction" },
    { subsystem: "Smart LED Arrays", protocol: "DALI-2 / KNX", impact: "40% - 60% reduction" },
    { subsystem: "Metering & Switchgear", protocol: "Modbus RTU/TCP", impact: "Peak-demand mitigation" },
  ],
  section3Title: "Improve Energy Efficiency",
  section3Intro: "BMS helps buildings use energy more efficiently by monitoring and continuously optimizing dynamic building systems.",
  methodologies: [
    { number: "1.", title: "Monitor energy consumption", desc: "Identify real-time baseline fluctuations and load spikes across individual floor zones." },
    { number: "2.", title: "Optimize HVAC operation", desc: "Dynamic chilled water reset routines based on ambient enthalpy and occupancy density." },
    { number: "3.", title: "Control lighting schedules", desc: "Astro-clock scheduling combined with PIR multi-sensors." },
    { number: "4.", title: "Identify abnormal energy usage", desc: "Automated fault detection and diagnostics (AFDD) alert engineering teams to malfunctioning dampers or stuck valves before energy waste escalates." },
  ],
  section3Image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
  section3ImageCaption: "Energy consumption dashboard tracking tenant sub-meter trends.",
  section4Title: "Why Integrated BMS Matters",
  section4Content1: "An Integrated BMS provides far more than centralized control. It creates a connected, resilient environment where critical building systems can be monitored, analyzed, and optimized together.",
  section4Content2: "As enterprise ESG mandates tighten and smart grid interactions become mandatory, investing in an extensible IBMS architecture ensures your assets remain compliant, cost-effective, and future-proof for decades to come.",
  section4Image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
  section4ImageCaption: "The future of sustainable, human-centric built environments.",
};

export function BlogForm({ initialData, onSave, onClose }: BlogFormProps) {
  const [formData, setFormData] = useState<Partial<BlogItem>>(initialData || EMPTY_BLOG_FORM);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "section1" | "section2" | "section3" | "section4">("general");

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(EMPTY_BLOG_FORM);
    }
  }, [initialData]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev._id ? prev.slug : generateSlug(val),
    }));
  };

  const loadTemplate = () => {
    setFormData(SAMPLE_TEMPLATE);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.image) {
      alert("Please fill in Title, Slug, and Cover Image URL.");
      return;
    }
    setSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch (err: any) {
      alert(err.message || "Failed to save blog post");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-sm max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#081F3D] text-white flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold">{initialData ? "Edit Blog Article" : "Create New Blog Article"}</h3>
            <p className="text-xs text-white/60">Fill in the fields below to publish a new article to the Blog page</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-sm hover:bg-white/10 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-gray-200 bg-gray-50 overflow-x-auto text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("general")}
            className={`px-4 py-2 border-b-2 transition-colors ${activeTab === "general" ? "border-[#D62828] text-[#D62828]" : "border-transparent text-gray-500 hover:text-gray-900"}`}
          >
            1. General & Cover
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("section1")}
            className={`px-4 py-2 border-b-2 transition-colors ${activeTab === "section1" ? "border-[#D62828] text-[#D62828]" : "border-transparent text-gray-500 hover:text-gray-900"}`}
          >
            2. Section 1 (Overview & Quote)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("section2")}
            className={`px-4 py-2 border-b-2 transition-colors ${activeTab === "section2" ? "border-[#D62828] text-[#D62828]" : "border-transparent text-gray-500 hover:text-gray-900"}`}
          >
            3. Section 2 (Systems & Protocols)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("section3")}
            className={`px-4 py-2 border-b-2 transition-colors ${activeTab === "section3" ? "border-[#D62828] text-[#D62828]" : "border-transparent text-gray-500 hover:text-gray-900"}`}
          >
            4. Section 3 (Energy Efficiency)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("section4")}
            className={`px-4 py-2 border-b-2 transition-colors ${activeTab === "section4" ? "border-[#D62828] text-[#D62828]" : "border-transparent text-gray-500 hover:text-gray-900"}`}
          >
            5. Section 4 (Conclusion)
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-gray-700">
          
          {/* TAB 1: General */}
          {activeTab === "general" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title || ""}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Smart Access Control Trends in SEA"
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs focus:ring-1 focus:ring-[#D62828] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug || ""}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. smart-access-control-trends-in-sea"
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs font-mono focus:ring-1 focus:ring-[#D62828] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Subtitle / Lead Paragraph</label>
                <textarea
                  rows={2}
                  value={formData.subtitle || ""}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Enter a short overview describing the main theme of the article..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs focus:ring-1 focus:ring-[#D62828] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Card Summary (Shown on Blog Overview Grid)</label>
                <textarea
                  rows={2}
                  value={formData.summary || ""}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Brief summary sentence shown on the article grid card..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs focus:ring-1 focus:ring-[#D62828] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category || ""}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Technology"
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs focus:ring-1 focus:ring-[#D62828] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Date String</label>
                  <input
                    type="text"
                    value={formData.date || ""}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="August 26, 2026"
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs focus:ring-1 focus:ring-[#D62828] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime || ""}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="3 min read"
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs focus:ring-1 focus:ring-[#D62828] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Cover Image URL *</label>
                <input
                  type="url"
                  required
                  value={formData.image || ""}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs focus:ring-1 focus:ring-[#D62828] outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={!!formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded-sm border-gray-300 text-[#D62828] focus:ring-[#D62828]"
                />
                <label htmlFor="featured" className="font-bold text-gray-800 cursor-pointer">
                  Feature this article at the top of the blog page
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={formData.author?.name || ""}
                    onChange={(e) => setFormData({ ...formData, author: { ...(formData.author || { name: "", role: "", avatar: "" }), name: e.target.value } })}
                    placeholder="Eng. David Montgomery"
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Author Role</label>
                  <input
                    type="text"
                    value={formData.author?.role || ""}
                    onChange={(e) => setFormData({ ...formData, author: { ...(formData.author || { name: "", role: "", avatar: "" }), role: e.target.value } })}
                    placeholder="Author"
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Section 1 */}
          {activeTab === "section1" && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Section 1 Title</label>
                <input
                  type="text"
                  value={formData.section1Title || ""}
                  onChange={(e) => setFormData({ ...formData, section1Title: e.target.value })}
                  placeholder="What Is an Integrated Building Management System?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Paragraph 1</label>
                <textarea
                  rows={3}
                  value={formData.section1Content1 || ""}
                  onChange={(e) => setFormData({ ...formData, section1Content1: e.target.value })}
                  placeholder="Enter main paragraph text..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Paragraph 2</label>
                <textarea
                  rows={3}
                  value={formData.section1Content2 || ""}
                  onChange={(e) => setFormData({ ...formData, section1Content2: e.target.value })}
                  placeholder="Enter secondary supporting paragraph text..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Quote Callout</label>
                <textarea
                  rows={2}
                  value={formData.quote || ""}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder='"Enter quote text here..."'
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs font-serif italic outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 pt-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Side Image 1 URL</label>
                  <input
                    type="url"
                    value={formData.sideImage1 || ""}
                    onChange={(e) => setFormData({ ...formData, sideImage1: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs outline-none"
                  />
                  <input
                    type="text"
                    value={formData.sideImage1Caption || ""}
                    onChange={(e) => setFormData({ ...formData, sideImage1Caption: e.target.value })}
                    placeholder="Caption for Image 1"
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-sm text-[11px] mt-1 italic outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Side Image 2 URL</label>
                  <input
                    type="url"
                    value={formData.sideImage2 || ""}
                    onChange={(e) => setFormData({ ...formData, sideImage2: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs outline-none"
                  />
                  <input
                    type="text"
                    value={formData.sideImage2Caption || ""}
                    onChange={(e) => setFormData({ ...formData, sideImage2Caption: e.target.value })}
                    placeholder="Caption for Image 2"
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-sm text-[11px] mt-1 italic outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Section 2 */}
          {activeTab === "section2" && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Section 2 Title</label>
                <input
                  type="text"
                  value={formData.section2Title || ""}
                  onChange={(e) => setFormData({ ...formData, section2Title: e.target.value })}
                  placeholder="Key Systems Connected to BMS"
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Section 2 Intro</label>
                <textarea
                  rows={2}
                  value={formData.section2Intro || ""}
                  onChange={(e) => setFormData({ ...formData, section2Intro: e.target.value })}
                  placeholder="A comprehensive IBMS coordinates multiple specialized subsystems..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs outline-none"
                />
              </div>

              {/* Protocol Table Rows Editor */}
              <div className="border-t border-gray-100 pt-3">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-bold text-gray-700">Protocol Comparison Table Rows</label>
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData,
                      protocolTable: [...(formData.protocolTable || []), { subsystem: "", protocol: "", impact: "" }]
                    })}
                    className="text-[11px] font-bold text-[#D62828] hover:underline flex items-center gap-1"
                  >
                    <Plus size={12} /> Add Row
                  </button>
                </div>

                <div className="space-y-2">
                  {(formData.protocolTable || []).map((row, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-gray-50 p-2 rounded-sm border border-gray-200">
                      <input
                        type="text"
                        value={row.subsystem}
                        onChange={(e) => {
                          const updated = [...(formData.protocolTable || [])];
                          updated[idx].subsystem = e.target.value;
                          setFormData({ ...formData, protocolTable: updated });
                        }}
                        placeholder="Subsystem"
                        className="flex-1 px-2 py-1 border border-gray-300 rounded-sm text-xs"
                      />
                      <input
                        type="text"
                        value={row.protocol}
                        onChange={(e) => {
                          const updated = [...(formData.protocolTable || [])];
                          updated[idx].protocol = e.target.value;
                          setFormData({ ...formData, protocolTable: updated });
                        }}
                        placeholder="Protocol (e.g. BACnet / IP)"
                        className="flex-1 px-2 py-1 border border-gray-300 rounded-sm text-xs font-mono"
                      />
                      <input
                        type="text"
                        value={row.impact}
                        onChange={(e) => {
                          const updated = [...(formData.protocolTable || [])];
                          updated[idx].impact = e.target.value;
                          setFormData({ ...formData, protocolTable: updated });
                        }}
                        placeholder="Impact (e.g. 25% - 35% reduction)"
                        className="flex-1 px-2 py-1 border border-gray-300 rounded-sm text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (formData.protocolTable || []).filter((_, i) => i !== idx);
                          setFormData({ ...formData, protocolTable: updated });
                        }}
                        className="p-1 text-red-500 hover:bg-red-50 rounded-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Section 3 */}
          {activeTab === "section3" && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Section 3 Title</label>
                <input
                  type="text"
                  value={formData.section3Title || ""}
                  onChange={(e) => setFormData({ ...formData, section3Title: e.target.value })}
                  placeholder="Improve Energy Efficiency"
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs outline-none"
                />
              </div>

              {/* Numbered Methodologies Grid Editor */}
              <div className="border-t border-gray-100 pt-3">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-bold text-gray-700">Numbered Methodologies Grid (1, 2, 3, 4)</label>
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData,
                      methodologies: [...(formData.methodologies || []), { number: `${(formData.methodologies || []).length + 1}.`, title: "", desc: "" }]
                    })}
                    className="text-[11px] font-bold text-[#D62828] hover:underline flex items-center gap-1"
                  >
                    <Plus size={12} /> Add Item
                  </button>
                </div>

                <div className="space-y-2">
                  {(formData.methodologies || []).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-gray-50 p-2.5 rounded-sm border border-gray-200">
                      <input
                        type="text"
                        value={item.number}
                        onChange={(e) => {
                          const updated = [...(formData.methodologies || [])];
                          updated[idx].number = e.target.value;
                          setFormData({ ...formData, methodologies: updated });
                        }}
                        placeholder="1."
                        className="w-12 px-2 py-1 border border-gray-300 rounded-sm text-xs text-center font-bold"
                      />
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...(formData.methodologies || [])];
                          updated[idx].title = e.target.value;
                          setFormData({ ...formData, methodologies: updated });
                        }}
                        placeholder="Title (e.g. Monitor energy consumption)"
                        className="flex-1 px-2 py-1 border border-gray-300 rounded-sm text-xs font-bold"
                      />
                      <input
                        type="text"
                        value={item.desc}
                        onChange={(e) => {
                          const updated = [...(formData.methodologies || [])];
                          updated[idx].desc = e.target.value;
                          setFormData({ ...formData, methodologies: updated });
                        }}
                        placeholder="Description..."
                        className="flex-1 px-2 py-1 border border-gray-300 rounded-sm text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (formData.methodologies || []).filter((_, i) => i !== idx);
                          setFormData({ ...formData, methodologies: updated });
                        }}
                        className="p-1 text-red-500 hover:bg-red-50 rounded-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Section 3 Image URL</label>
                <input
                  type="url"
                  value={formData.section3Image || ""}
                  onChange={(e) => setFormData({ ...formData, section3Image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs outline-none"
                />
                <input
                  type="text"
                  value={formData.section3ImageCaption || ""}
                  onChange={(e) => setFormData({ ...formData, section3ImageCaption: e.target.value })}
                  placeholder="Energy consumption dashboard tracking tenant sub-meter trends."
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-sm text-[11px] mt-1 italic outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 5: Section 4 */}
          {activeTab === "section4" && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Section 4 Title</label>
                <input
                  type="text"
                  value={formData.section4Title || ""}
                  onChange={(e) => setFormData({ ...formData, section4Title: e.target.value })}
                  placeholder="Why Integrated BMS Matters"
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Paragraph 1</label>
                <textarea
                  rows={3}
                  value={formData.section4Content1 || ""}
                  onChange={(e) => setFormData({ ...formData, section4Content1: e.target.value })}
                  placeholder="An Integrated BMS provides far more than centralized control..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Paragraph 2</label>
                <textarea
                  rows={3}
                  value={formData.section4Content2 || ""}
                  onChange={(e) => setFormData({ ...formData, section4Content2: e.target.value })}
                  placeholder="As enterprise ESG mandates tighten..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Section 4 Bottom Image URL</label>
                <input
                  type="url"
                  value={formData.section4Image || ""}
                  onChange={(e) => setFormData({ ...formData, section4Image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm text-xs outline-none"
                />
                <input
                  type="text"
                  value={formData.section4ImageCaption || ""}
                  onChange={(e) => setFormData({ ...formData, section4ImageCaption: e.target.value })}
                  placeholder="The future of sustainable, human-centric built environments."
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-sm text-[11px] mt-1 italic outline-none"
                />
              </div>
            </div>
          )}

          {/* Modal Actions Footer */}
          <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-sm text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-[#D62828] text-white rounded-sm text-xs font-bold hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-md shadow-[#D62828]/20 cursor-pointer"
            >
              <Save size={14} />
              <span>{saving ? "Saving..." : initialData ? "Update Blog Article" : "Create Blog Article"}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
