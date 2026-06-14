// NotFound: friendly 404 page for unknown routes
import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center animate-fade-in">
      <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-rose-500 text-white shadow-xl">
        <Compass className="h-9 w-9" />
      </div>
      <h1 className="text-6xl font-bold tracking-tight">404</h1>
      <h2 className="mt-3 text-xl font-semibold">Page not found</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        The page you’re looking for doesn’t exist, was moved, or the link is broken.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:opacity-90"
      >
        Take me home
      </Link>
    </div>
  );
}
