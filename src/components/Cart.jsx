// Cart: list of cart items with totals and a checkout link
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import {
  selectCartItems,
  selectCartTotal,
} from "../redux/cartSlice";
import CartItem from "./CartItem";

export default function Cart() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center animate-fade-in">
        <div className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
          <ShoppingBag className="h-9 w-9 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Add a few favorites to get started.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:opacity-90"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 animate-fade-in">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Your Cart</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <aside className="sticky top-24 h-fit rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="my-3 h-px bg-border" />
            <div className="flex justify-between text-base font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition-transform hover:scale-[1.02]"
          >
            Checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}
