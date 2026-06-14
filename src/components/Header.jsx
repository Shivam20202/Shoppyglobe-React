// Header: app navigation + animated cart icon with item count badge
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, Search, Sparkles } from "lucide-react";
import { selectCartCount } from "../redux/cartSlice";
import { selectSearchQuery, setSearchQuery } from "../redux/searchSlice";

export default function Header() {
  const count = useSelector(selectCartCount);
  const query = useSelector(selectSearchQuery);
  const dispatch = useDispatch();

  const navClass = ({ isActive }) =>
    `relative text-sm font-medium transition-colors hover:text-primary ${
      isActive ? "text-primary" : "text-foreground/70"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link to="/" className="group flex items-center gap-2">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-rose-500 text-white shadow-lg shadow-fuchsia-500/30 transition-transform group-hover:scale-110">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">
            ShoppyGlobe
          </span>
        </Link>

        {/* Search */}
        <div className="ml-2 hidden flex-1 md:block">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              placeholder="Search products..."
              className="w-full rounded-full border border-border bg-secondary/60 py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary/40 focus:bg-background focus:ring-4 focus:ring-primary/10"
            />
          </div>
        </div>

        {/* Nav */}
        <nav className="ml-auto flex items-center gap-5">
          <NavLink to="/" className={navClass} end>
            Home
          </NavLink>
          <NavLink to="/checkout" className={navClass}>
            Checkout
          </NavLink>
          <Link
            to="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary/70 transition-all hover:scale-110 hover:bg-secondary"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-500 px-1 text-[11px] font-bold text-white shadow-md animate-scale-in">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>

      {/* Mobile search */}
      <div className="px-4 pb-3 md:hidden">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            placeholder="Search products..."
            className="w-full rounded-full border border-border bg-secondary/60 py-2 pl-10 pr-4 text-sm outline-none focus:border-primary/40 focus:bg-background"
          />
        </div>
      </div>
    </header>
  );
}
