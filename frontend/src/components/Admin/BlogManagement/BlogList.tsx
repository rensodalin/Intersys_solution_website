import { Edit2, Trash2, Star, Eye } from "lucide-react";
import { BlogItem } from "./types";

interface BlogListProps {
  blogs: BlogItem[];
  loading: boolean;
  onEdit: (blog: BlogItem) => void;
  onDelete: (blog: BlogItem) => void;
}

export function BlogList({ blogs, loading, onEdit, onDelete }: BlogListProps) {
  if (loading) {
    return (
      <div className="p-12 text-center text-gray-400">
        <p className="text-sm font-medium animate-pulse">Loading blog articles...</p>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="p-12 text-center text-gray-400 border border-dashed border-gray-200 rounded-sm my-4">
        <p className="text-sm font-bold text-gray-600 mb-1">No Blog Articles Found</p>
        <p className="text-xs text-gray-400">Click "Add New Article" above to publish your first blog story.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-sm border border-gray-150 shadow-sm bg-white">
      <table className="w-full text-left text-xs">
        <thead className="bg-[#081F3D] text-white font-bold tracking-wider">
          <tr>
            <th className="px-5 py-3.5">Cover Image</th>
            <th className="px-5 py-3.5">Title & Slug</th>
            <th className="px-5 py-3.5">Category</th>
            <th className="px-5 py-3.5">Date & Author</th>
            <th className="px-5 py-3.5">Status</th>
            <th className="px-5 py-3.5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-gray-700">
          {blogs.map((blog) => (
            <tr key={blog._id || blog.slug} className="hover:bg-gray-50/80 transition-colors">
              <td className="px-5 py-3">
                <div className="w-16 h-12 rounded-sm overflow-hidden bg-gray-100 border border-gray-200">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </td>
              <td className="px-5 py-3 max-w-xs">
                <p className="font-bold text-[#081F3D] line-clamp-1 text-xs">{blog.title}</p>
                <p className="text-[10px] text-gray-400 font-mono truncate">/blog/{blog.slug}</p>
              </td>
              <td className="px-5 py-3">
                <span className="px-2.5 py-1 rounded-sm text-[10px] font-extrabold bg-red-50 text-[#D62828] border border-red-100">
                  {blog.category}
                </span>
              </td>
              <td className="px-5 py-3">
                <p className="font-semibold text-gray-800 text-[11px]">{blog.date || "August 22, 2026"}</p>
                <p className="text-[10px] text-gray-400">{blog.author?.name || "Eng. David Montgomery"}</p>
              </td>
              <td className="px-5 py-3">
                {blog.featured ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                    <Star size={10} className="fill-amber-500 text-amber-500" /> Featured
                  </span>
                ) : (
                  <span className="text-[10px] text-gray-400 font-medium">Standard</span>
                )}
              </td>
              <td className="px-5 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <a
                    href={`/blog/${blog.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-[11px] font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                    title="View live"
                  >
                    <Eye size={12} />
                    <span>View</span>
                  </a>

                  <button
                    onClick={() => onEdit(blog)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
                    title="Edit article"
                  >
                    <Edit2 size={12} />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => onDelete(blog)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-[11px] font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors cursor-pointer"
                    title="Delete article"
                  >
                    <Trash2 size={12} />
                    <span>Delete</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
