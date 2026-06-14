// CartItem: a single line item in the cart with quantity controls and remove button
import { useDispatch } from "react-redux";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../redux/cartSlice";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      <img
        src={item.thumbnail}
        alt={item.title}
        loading="lazy"
        className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
      />

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold">{item.title}</h3>
        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>

        <div className="mt-3 inline-flex items-center gap-1 rounded-full border border-border bg-background p-1">
          <button
            onClick={() => dispatch(decreaseQuantity(item.id))}
            disabled={item.quantity <= 1}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
          <button
            onClick={() => dispatch(increaseQuantity(item.id))}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-secondary"
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-3">
        <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
        <button
          onClick={() => dispatch(removeFromCart(item.id))}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-rose-500"
        >
          <Trash2 className="h-3.5 w-3.5" /> Remove
        </button>
      </div>
    </div>
  );
}
