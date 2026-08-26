import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import environment from "@/enviroment/enviroment";
import { BlogList } from "./BlogList";
import { BlogForm } from "./BlogForm";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { BlogItem } from "./types";
import { SAMPLE_BLOG_POSTS } from "@/routes/blog.index";

export function BlogManagement() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingBlog, setDeletingBlog] = useState<BlogItem | null>(null);

  const baseUrl = environment;

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/blogs`);
      const json = await res.json();
      if (json.success && json.data) {
        setBlogs(json.data);
      } else {
        setBlogs(SAMPLE_BLOG_POSTS as any);
      }
    } catch (err) {
      console.warn("Failed to fetch blogs from server, using local fallback:", err);
      setBlogs(SAMPLE_BLOG_POSTS as any);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleSave = async (data: Partial<BlogItem>) => {
    const isEdit = !!data._id;
    const url = isEdit ? `${baseUrl}/api/blogs/${data._id}` : `${baseUrl}/api/blogs`;
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const json = await res.json();
    if (!json.success) {
      throw new Error(json.message || "Save operation failed");
    }

    await loadBlogs();
  };

  const handleDeleteConfirm = async () => {
    if (!deletingBlog?._id) {
      setBlogs((prev) => prev.filter((b) => b.slug !== deletingBlog?.slug));
      setDeletingBlog(null);
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/api/blogs/${deletingBlog._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const json = await res.json();
      if (!json.success) {
        throw new Error(json.message || "Delete operation failed");
      }
      await loadBlogs();
    } catch (err: any) {
      alert(err.message || "Failed to delete blog article");
    } finally {
      setDeletingBlog(null);
    }
  };

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Action Header matching InsightManagement style */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">
            Blog <span className="text-[#C3110C]">Management</span>
          </h1>
          <p className="text-gray-500 text-xs mt-2 font-medium">
            Publish, edit, and manage all articles shown on the blog section.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingBlog(null);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-3 bg-[#C3110C] text-white text-sm font-bold rounded-sm hover:bg-[#a80f0b] transition-all shadow-lg shadow-[#C3110C]/30 hover:scale-[1.02] active:scale-95 cursor-pointer self-start md:self-auto"
        >
          <Plus size={16} />
          <span>Add New Article</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-white px-4 py-2.5 rounded-sm border border-gray-200 shadow-sm">
        <Search size={16} className="text-gray-400 mr-2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search blog articles by title, category, or slug..."
          className="w-full text-xs text-gray-800 placeholder:text-gray-400 bg-transparent outline-none"
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm("")} className="text-xs font-bold text-gray-400 hover:text-gray-600">
            Clear
          </button>
        )}
      </div>

      {/* List */}
      <BlogList
        blogs={filteredBlogs}
        loading={loading}
        onEdit={(blog) => {
          setEditingBlog(blog);
          setIsFormOpen(true);
        }}
        onDelete={(blog) => setDeletingBlog(blog)}
      />

      {/* Form Modal */}
      {isFormOpen && (
        <BlogForm
          initialData={editingBlog}
          onSave={handleSave}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {/* Delete Modal */}
      {deletingBlog && (
        <DeleteConfirmModal
          blog={deletingBlog}
          onConfirm={handleDeleteConfirm}
          onClose={() => setDeletingBlog(null)}
        />
      )}

    </div>
  );
}
