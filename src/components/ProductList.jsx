// ProductList: fetches products via custom hook and renders the grid, filtered by Redux search
import { useSelector } from "react-redux";
import { useProducts } from "../hooks/useProducts";
import { selectSearchQuery } from "../redux/searchSlice";
import ProductItem from "./ProductItem";

export default function ProductList() {
  const { products, loading, error } = useProducts();
  const query = useSelector(selectSearchQuery);

  // Filter using redux state (case-insensitive across title, brand, category)
  const filtered = products.filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      p.title?.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] animate-pulse rounded-2xl bg-secondary/60"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h2 className="text-xl font-semibold">Couldn’t load products</h2>
        <p className="mt-2 text-sm text-muted-foreground">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background hover:opacity-90"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-rose-500 p-8 text-white shadow-xl sm:p-12">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <p className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            Curated · Premium · Fast
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl animate-fade-in">
            Discover products you’ll actually love.
          </h1>
          <p className="mt-3 text-white/80 sm:text-lg">
            Shop a handpicked global collection — delivered with care.
          </p>
        </div>
      </div>

      {/* Heading */}
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          {query ? `Results for "${query}"` : "Trending now"}
        </h2>
        <span className="text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "item" : "items"}
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-muted-foreground">No products match your search.</p>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
