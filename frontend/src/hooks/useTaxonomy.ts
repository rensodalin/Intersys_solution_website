import { useState, useEffect } from "react";
import { fetchTaxonomy } from "@/utils/taxonomyApi";
import type { TaxonomyCategory } from "@/utils/taxonomyApi";

let cached: TaxonomyCategory[] | null = null;
let cachePromise: Promise<TaxonomyCategory[]> | null = null;
const refreshListeners = new Set<() => void>();

export function refreshTaxonomyCache() {
  cached = null;
  cachePromise = null;
  refreshListeners.forEach(fn => fn());
}

export function useTaxonomy() {
  const [taxonomy, setTaxonomy] = useState<TaxonomyCategory[]>(cached || []);
  const [loading, setLoading] = useState(!cached);
  const [key, setKey] = useState(0);

  useEffect(() => {
    refreshListeners.add(triggerRefresh);
    return () => { refreshListeners.delete(triggerRefresh); };

    function triggerRefresh() {
      setKey(k => k + 1);
    }
  }, []);

  useEffect(() => {
    if (cached) {
      setTaxonomy(cached);
      setLoading(false);
      return;
    }
    if (!cachePromise) {
      cachePromise = fetchTaxonomy().catch((err) => {
        console.error("useTaxonomy: Failed to fetch taxonomy:", err);
        return [];
      });
    }
    cachePromise.then(data => {
      cached = data;
      setTaxonomy(data);
      setLoading(false);
    });
  }, [key]);

  return { taxonomy, loading };
}
