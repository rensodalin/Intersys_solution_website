import { Search, X, Layers } from "lucide-react";
import { CATEGORIES, BRANDS, SUBCATEGORIES } from "./constants";

interface FilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  filterCategory: string;
  onCategoryChange: (val: string) => void;
  filterBrand: string;
  onBrandChange: (val: string) => void;
  filterSubCategory: string;
  onSubCategoryChange: (val: string) => void;
  loading: boolean;
  totalCount: number;
}

export function FilterBar({
  search, onSearchChange,
  filterCategory, onCategoryChange,
  filterBrand, onBrandChange,
  filterSubCategory, onSubCategoryChange,
  loading, totalCount,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-150 shadow-sm p-4 flex flex-wrap gap-3 items-center">
      <div className="relative flex-1 min-w-[200px]">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={e => { onSearchChange(e.target.value); }}
          placeholder="Search by title, ID, or brand..."
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50 focus:ring-1 focus:ring-[#C3110C]/20 transition"
        />
        {search && (
          <button onClick={() => onSearchChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <X size={14} />
          </button>
        )}
      </div>

      <select
        value={filterCategory}
        onChange={e => {
          onCategoryChange(e.target.value);
          onBrandChange("");
          onSubCategoryChange("");
        }}
        className="px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50 transition"
      >
        <option value="">All Categories</option>
        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
      </select>

      <select
        value={filterBrand}
        disabled={!filterCategory || (BRANDS[filterCategory] || []).length === 0}
        onChange={e => {
          onBrandChange(e.target.value);
          onSubCategoryChange("");
        }}
        className="px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <option value="">All Brands</option>
        {filterCategory && (BRANDS[filterCategory] || []).map(b => <option key={b} value={b}>{b}</option>)}
      </select>

      <select
        value={filterSubCategory}
        disabled={!filterCategory || !filterBrand || (SUBCATEGORIES[filterCategory]?.[filterBrand] || []).length === 0}
        onChange={e => onSubCategoryChange(e.target.value)}
        className="px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C3110C]/50 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <option value="">All Subcategories</option>
        {filterCategory && filterBrand && (SUBCATEGORIES[filterCategory]?.[filterBrand] || []).map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      <span className="text-xs text-gray-400 font-medium ml-auto">
        {loading ? "Loading..." : `${totalCount} product${totalCount !== 1 ? "s" : ""}`}
      </span>
    </div>
  );
}
