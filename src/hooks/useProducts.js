// Custom hook: fetch the product list from the dummyjson API
import { useEffect, useState } from "react";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch("https://dummyjson.com/products?limit=100", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Failed to load products (${res.status})`);
        const data = await res.json();
        if (!cancelled) {
          setProducts(data.products || []);
          setError(null);
        }
      } catch (err) {
        if (!cancelled && err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProducts();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return { products, loading, error };
}
