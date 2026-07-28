import { Download } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface DownloadsTabProps {
  downloadedPdfs?: Array<{ title: string; url: string; downloadedAt: string }>;
}

export function DownloadsTab({ downloadedPdfs }: DownloadsTabProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Downloaded Documents</h2>
      <div className="h-0.5 w-10 bg-red-600" />

      {!downloadedPdfs || downloadedPdfs.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-lg">
          <Download className="mx-auto text-gray-300 mb-3" size={40} />
          <p className="text-gray-500 text-sm font-semibold">No downloaded documents yet</p>
          <p className="text-gray-400 text-xs mt-1">Explore our product lines or Document Center to fetch technical guides.</p>
          <Link to="/document-center" className="mt-4 inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-sm transition">
            Visit Document Center
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {downloadedPdfs.map((pdf, idx) => (
            <div
              key={idx}
              onClick={() => window.open(pdf.url, "_blank", "noopener,noreferrer")}
              className="p-4 border border-gray-150 rounded-sm hover:border-[#1A3263] transition flex items-center justify-between bg-white group gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 text-red-600 rounded-sm flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px]">PDF</span>
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-gray-800 truncate group-hover:text-[#1A3263] transition" title={pdf.title}>
                    {pdf.title}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-semibold mt-0.5">
                    Visited {new Date(pdf.downloadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
