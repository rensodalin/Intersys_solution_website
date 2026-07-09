interface PopularProduct {
  name: string;
  count: number;
}

interface PopularProductsCardProps {
  products: PopularProduct[];
  loading: boolean;
  getProductImage: (name: string) => string;
}

export function PopularProductsCard({ products, loading, getProductImage }: PopularProductsCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm">
      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-4">
        Top Requested Products
      </span>
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-2 border-[#C3110C] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : products.length === 0 ? (
        <p className="text-xs text-gray-400 py-10 text-center">No product data available.</p>
      ) : (
        <div className="space-y-3">
          {products.map((p, i) => (
            <div key={i} className="flex items-center gap-3 text-xs">
              <span className="w-5 h-5 rounded-full bg-[#C3110C]/10 text-[#C3110C] text-[10px] font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              {getProductImage(p.name) && (
                <img
                  src={getProductImage(p.name)}
                  alt={p.name}
                  className="w-8 h-8 rounded object-contain bg-gray-50 border border-gray-100 shrink-0"
                />
              )}
              <span className="font-medium text-gray-800 truncate flex-1">{p.name}</span>
              <span className="font-bold text-[#C3110C] shrink-0">{p.count}x</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
