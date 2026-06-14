// ProductDetail: fetches a single product based on route params
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { addToCart } from "../redux/cartSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/products/${id}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Failed to load product (${res.status})`);
        const data = await res.json();
        if (!cancelled) {
          setProduct(data);
          setActiveImg(0);
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

    fetchProduct();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:px-8">
        <div className="aspect-square animate-pulse rounded-3xl bg-secondary/60" />
        <div className="space-y-4">
          <div className="h-8 w-3/4 animate-pulse rounded bg-secondary/60" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-secondary/60" />
          <div className="h-24 w-full animate-pulse rounded bg-secondary/60" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h2 className="text-xl font-semibold">Couldn’t load product</h2>
        <p className="mt-2 text-sm text-muted-foreground">{error}</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background hover:opacity-90"
        >
          Back to home
        </Link>
      </div>
    );
  }

  const images = product.images?.length ? product.images : [product.thumbnail];

  const handleAdd = () => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 animate-fade-in">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-secondary/40 shadow-lg">
            <img
              src={images[activeImg]}
              alt={product.title}
              loading="lazy"
              className="h-full w-full object-cover transition-all duration-500"
            />
          </div>
          {images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {images.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => setActiveImg(i)}
                  className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                    i === activeImg
                      ? "border-primary scale-105"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {product.brand || product.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {product.title}
          </h1>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {product.rating?.toFixed(1)}
            </span>
            <span>· {product.stock} in stock</span>
          </div>

          <p className="mt-6 leading-relaxed text-foreground/80">{product.description}</p>

          <div className="mt-8 flex items-end gap-3">
            <span className="text-4xl font-bold">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="mb-1 rounded-full bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
                {Math.round(product.discountPercentage)}% off
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
          >
            <ShoppingCart className="h-5 w-5" />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
