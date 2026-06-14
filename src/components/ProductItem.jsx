// ProductItem: a single product card with lazy-loaded image and add-to-cart action
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ShoppingCart, Star } from "lucide-react";
import { addToCart } from "../redux/cartSlice";

export default function ProductItem({ product }) {
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary/40">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.discountPercentage > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-md">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {product.brand || product.category}
        </p>
        <h3 className="line-clamp-1 font-semibold text-foreground">{product.title}</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span>{product.rating?.toFixed(1)}</span>
          <span className="ml-1">· {product.stock} in stock</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-bold">${product.price}</span>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-2 text-xs font-semibold text-background transition-all hover:scale-105 hover:bg-primary active:scale-95"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
      </div>
    </Link>
  );
}
