// Checkout: dummy form + order summary. On submit -> alert, clear cart, redirect home.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  selectCartItems,
  selectCartTotal,
} from "../redux/cartSlice";

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });
  const [placed, setPlaced] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    setPlaced(true);
    // Show confirmation, then empty cart and redirect home
    setTimeout(() => {
      dispatch(clearCart());
      navigate("/");
    }, 1800);
  };

  if (placed) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center animate-scale-in">
        <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-2xl text-white shadow-lg">
          ✓
        </div>
        <h2 className="text-2xl font-bold">Order placed</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks {form.name || "friend"}! Redirecting you home…
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 animate-fade-in">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-3xl border border-border/60 bg-card p-6 shadow-sm"
        >
          <Field label="Full name" name="name" value={form.name} onChange={handleChange} required />
          <Field
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Field
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Field label="City" name="city" value={form.city} onChange={handleChange} required />
            <Field label="ZIP" name="zip" value={form.zip} onChange={handleChange} required />
          </div>

          <button
            type="submit"
            disabled={items.length === 0}
            className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Place Order
          </button>
        </form>

        <aside className="h-fit rounded-3xl border border-border/60 bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Summary</h2>
          {items.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">Your cart is empty.</p>
          ) : (
            <ul className="mt-4 space-y-3 text-sm">
              {items.map((i) => (
                <li key={i.id} className="flex justify-between gap-3">
                  <span className="truncate">
                    {i.title}{" "}
                    <span className="text-muted-foreground">× {i.quantity}</span>
                  </span>
                  <span className="font-medium">${(i.price * i.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="my-4 h-px bg-border" />
          <div className="flex justify-between text-base font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      <input
        {...props}
        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-all focus:border-primary/40 focus:ring-4 focus:ring-primary/10"
      />
    </label>
  );
}
