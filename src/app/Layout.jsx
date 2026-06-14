import { Outlet } from "react-router-dom";
import { Suspense } from "react";

import Header from "../components/Header";
import PageFallback from "../components/PageFallback";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
          {/* Application header/navigation */}
      <Header />

 {/* Main content area */}
      <main>
         {/* Display loader while lazy-loaded pages are loading */}
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>

  {/* Application footer */}
      <footer className="border-t border-border/40 py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ShoppyGlobe
      </footer>
    </div>
  );
}