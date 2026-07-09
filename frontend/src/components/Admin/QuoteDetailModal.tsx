import {
  X,
  Users,
  Mail,
  Phone,
  Building2,
  MapPin,
  Layers,
  Briefcase,
  FileDown,
} from "lucide-react";
import { QuoteRequest } from "./types";
import { exportQuoteToPDF } from "./exportQuotePDF";
import environment from "@/enviroment/enviroment";

const baseUrl = environment;

interface QuoteDetailModalProps {
  quote: QuoteRequest;
  onClose: () => void;
  onStatusChange: (quote: QuoteRequest, status: "Pending" | "In Progress" | "Completed") => void;
  onDelete: (id: string) => void;
}

export function QuoteDetailModal({ quote, onClose, onStatusChange, onDelete }: QuoteDetailModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer" />

      <div className="relative w-full max-w-3xl bg-white rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="px-8 py-5 bg-[#081F3D] text-white flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-lg">
              Quote Details - QR-{quote._id.substring(quote._id.length - 5).toUpperCase()}
            </h3>
            <span className="text-[10px] text-white/50 block mt-0.5">
              Requested on {new Date(quote.createdAt).toLocaleString()}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-100 pb-6">
            <div className="space-y-3">
              <h4 className="text-[13px] font-semibold text-gray-400">Customer Contact Information</h4>
              <div className="space-y-2 text-xs text-gray-700">
                <div className="flex items-center gap-3 pb-2">
                  {(() => {
                    const raw =
                      typeof quote.userId === "object" && quote.userId?.avatar
                        ? quote.userId.avatar
                        : null;
                    const avatarUrl = raw?.startsWith("/") ? `${baseUrl}${raw}` : raw;
                    const initial = quote.name?.charAt(0)?.toUpperCase() || "?";
                    return avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={quote.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#081F3D] flex items-center justify-center text-white text-sm font-bold">
                        {initial}
                      </div>
                    );
                  })()}
                  <div>
                    <p className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{quote.name}</span>
                      <span className="text-gray-500">(Role : {quote.title})</span>
                    </p>
                  </div>
                </div>
                <p className="flex items-center gap-2">
                  <Mail size={14} className="text-gray-400" />
                  <a href={`mailto:${quote.email}`} className="text-red-600 hover:underline">
                    {quote.email}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={14} className="text-gray-400" />
                  <span>{quote.phone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Building2 size={14} className="text-gray-400" />
                  <span >Company Name : {quote.company}</span>
                </p>
                <p className="flex items-center gap-2 text-xs text-gray-700">
                  <Briefcase size={14} className="text-gray-400" />
                  <span >Company Type:</span> <span className="font-medium text-gray-900">{quote.companyType}</span>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-[13px] font-semibold text-gray-400">Project Specification</h4>
              <div className="space-y-2 text-xs text-gray-700">
                <p className="flex items-start gap-2">
                  <MapPin size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <span>
                    {quote.address || "—"}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Layers size={14} className="text-gray-400" />
                  <span>
                    Current System / Platform: <b className="text-gray-900">{quote.bmsSystem}</b>
                  </span>
                </p>

                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-400">Prefer Contact:</span>
                  <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-sm">
                    {quote.contactMethod || "Either"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-400">Status:</span>
                  <select
                    value={quote.status}
                    onChange={(e) =>
                      onStatusChange(quote, e.target.value as "Pending" | "In Progress" | "Completed")
                    }
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border outline-none cursor-pointer ${quote.status === "Completed"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : quote.status === "In Progress"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                  >
                    <option value="Pending" className="bg-amber-50 text-amber-700">Pending</option>
                    <option value="In Progress" className="bg-blue-50 text-blue-700">In Progress</option>
                    <option value="Completed" className="bg-emerald-50 text-emerald-700">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-gray-400">Product Categories</h4>
            <div className="flex flex-wrap gap-2">
              {quote.solutionCategories.map((cat, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 border border-gray-200 text-gray-700 text-xs px-3 py-1 rounded-sm"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {quote.sections && quote.sections.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-[13px] font-bold text-gray-400 ">Product Sections</h4>
              <div className="flex flex-wrap gap-2">
                {quote.sections.map((section, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 border border-gray-200 text-gray-700 text-xs px-3 py-1 rounded-sm"
                  >
                    {section}
                  </span>
                ))}
              </div>
            </div>
          )}

          {quote.otherBms && (
            <div className="space-y-2">
              <h4 className="text-[13px] font-bold text-gray-400">Message</h4>
              <p className="text-xs text-gray-700 bg-gray-50 border border-gray-100 rounded-sm p-4 leading-relaxed">
                {quote.otherBms}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <h4 className="text-[13px] font-bold text-gray-400 ">
              Requested Specifications ({quote.products.length} Products)
            </h4>
            <div className="border border-gray-150 rounded-sm overflow-hidden bg-white shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-150 text-[10px] text-gray-400 font-bold uppercase bg-gray-50/50">
                    <th className="px-4 py-2.5 w-12 text-center">Qty</th>
                    <th className="px-4 py-2.5 pl-6">Part Code</th>
                    <th className="px-4 py-2.5">Product Name</th>
                    <th className="px-4 py-2.5">Detail Specification</th>
                  </tr>
                </thead>
                <tbody>
                  {quote.products.map((prod, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-50 last:border-0 text-xs text-gray-700 hover:bg-gray-50/30"
                    >
                      <td className="px-4 py-2.5 text-center font-bold text-gray-900 bg-gray-50/80">
                        {prod.qty}x
                      </td>
                      <td className="px-4 py-2.5 pl-6 font-mono font-bold text-red-600">
                        {prod.productNo}
                      </td>
                      <td className="px-4 py-2.5 font-medium text-gray-800">{prod.description}</td>
                      <td className="px-4 py-2.5 text-gray-500">{prod.application}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="px-8 py-4 bg-gray-50 border-t border-gray-150 flex items-center justify-between gap-4">
          <span className="text-[10px] text-gray-400">Change status using the dropdown above</span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => exportQuoteToPDF(quote)}
              className="border border-[#081F3D] text-[#081F3D] hover:bg-[#081F3D]/5 transition font-bold text-xs px-5 py-2.5 rounded-sm cursor-pointer flex items-center gap-2"
            >
              <FileDown size={14} />
              Export BOQ PDF
            </button>
            <button
              onClick={() => onDelete(quote._id)}
              className="border border-red-200 text-red-600 hover:bg-red-50 transition font-bold text-xs px-5 py-2.5 rounded-sm cursor-pointer"
            >
              Delete Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
