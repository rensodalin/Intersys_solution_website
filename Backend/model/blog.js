import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  subtitle: { type: String },
  category: { type: String, default: "Technology" },
  readTime: { type: String, default: "3 min read" },
  date: { type: String, default: () => new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) },
  commentsCount: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  image: { type: String, required: true },
  summary: { type: String },

  // Author details
  author: {
    name: { type: String, default: "Eng. David Montgomery" },
    role: { type: String, default: "Author" },
    avatar: { type: String, default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
  },

  // SECTION 1
  section1Title: { type: String, default: "What Is an Integrated Building Management System?" },
  section1Content1: { type: String },
  section1Content2: { type: String },
  quote: { type: String },
  sideImage1: { type: String },
  sideImage1Caption: { type: String },
  sideImage2: { type: String },
  sideImage2Caption: { type: String },

  // SECTION 2
  section2Title: { type: String, default: "Key Systems Connected to BMS" },
  section2Intro: { type: String },
  subsystems: [
    {
      name: { type: String },
      desc: { type: String },
    },
  ],
  protocolTable: [
    {
      subsystem: { type: String },
      protocol: { type: String },
      impact: { type: String },
    },
  ],

  // SECTION 3
  section3Title: { type: String, default: "Improve Energy Efficiency" },
  section3Intro: { type: String },
  methodologies: [
    {
      number: { type: String },
      title: { type: String },
      desc: { type: String },
    },
  ],
  section3Image: { type: String },
  section3ImageCaption: { type: String },

  // SECTION 4
  section4Title: { type: String, default: "Why Integrated BMS Matters" },
  section4Content1: { type: String },
  section4Content2: { type: String },
  section4Image: { type: String },
  section4ImageCaption: { type: String },

}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
