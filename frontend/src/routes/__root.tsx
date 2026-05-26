import { Outlet, Link, createRootRoute, HeadContent, Scripts, useLocation } from "@tanstack/react-router";
import { Navbar } from "@/components/Layout/Navbar";
import { Footer } from "@/components/Layout/Footer";
import { ScrollControls } from "@/components/Common/ScrollControls";

import { ChatWidget } from "@/components/Chat/ChatWidget";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-deep text-white px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl font-bold text-brand-red">404</h1>
        <h2 className="mt-4 font-display text-2xl font-bold">Page not found</h2>
        <p className="mt-3 text-sm text-white/60">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-brand-red px-6 py-3 text-sm font-semibold text-white hover:bg-brand-red-glow transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Intersys Solutions — Smart Building & Engineering Systems" },
      {
        name: "description",
        content:
          "We engineer, integrate and maintain smart building, fire safety, security and IoT systems for forward-thinking infrastructure.",
      },
      { name: "author", content: "Intersys Solutions" },
      {
        property: "og:title",
        content: "Intersys Solutions — Smart Building & Engineering Systems",
      },
      {
        property: "og:description",
        content: "Smart building, fire safety, security and IoT engineering for a safer future.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Scripts />
    </>
  );
}

function RootComponent() {
  const location = useLocation();
  const isProductsPage = location.pathname.startsWith("/products");

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <ScrollControls />
      <ChatWidget />
      {!isProductsPage && <Footer />}
      <Toaster position="top-center" richColors />
    </>
  );
}
