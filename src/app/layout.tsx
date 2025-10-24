import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Users CRUD",
  description: "A simple and elegant Next.js Users CRUD app with Prisma + MongoDB",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {/* NAVBAR */}
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
            {/* Logo / Title */}
            <Link
              href="/users"
              className="text-xl font-semibold tracking-tight text-gray-900 hover:text-gray-700 transition-colors"
            >
              Users<span className="text-blue-600">CRUD</span>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
              <Link
                href="/users"
                className="relative transition-colors hover:text-gray-900 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
              >
                Users
              </Link>
              <a
                href="https://www.prisma.io/docs/orm/overview/databases/mongodb"
                target="_blank"
                rel="noreferrer"
                className="relative transition-colors hover:text-gray-900 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
              >
                Prisma + Mongo
              </a>
            </nav>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="container mx-auto px-4 py-10 md:px-6">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">

        </footer>
      </body>
    </html>
  );
}
