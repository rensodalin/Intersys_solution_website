import Blog from "../model/blog.js";

// Get all blogs
export const getAll = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, data: blogs });
  } catch (error) {
    console.error("Fetch Blogs Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch blogs", error: error.message });
  }
};

// Get single blog by slug
export const getBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog article not found" });
    }
    res.json({ success: true, data: blog });
  } catch (error) {
    console.error("Fetch Blog Detail Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch blog detail", error: error.message });
  }
};

// Create new blog
export const create = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.status(201).json({ success: true, data: newBlog });
  } catch (error) {
    console.error("Create Blog Error:", error);
    res.status(500).json({ success: false, message: "Failed to create blog article", error: error.message });
  }
};

// Update blog
export const update = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true });
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog article not found" });
    }
    res.json({ success: true, data: blog });
  } catch (error) {
    console.error("Update Blog Error:", error);
    res.status(500).json({ success: false, message: "Failed to update blog article", error: error.message });
  }
};

// Delete blog
export const remove = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog article not found" });
    }
    res.json({ success: true, message: "Blog article deleted successfully" });
  } catch (error) {
    console.error("Delete Blog Error:", error);
    res.status(500).json({ success: false, message: "Failed to delete blog article", error: error.message });
  }
};
