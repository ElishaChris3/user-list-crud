import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer"; // 👈 import footer

export const metadata: Metadata = {
  title: "Users CRUD",
  description: "A simple and elegant Next.js Users CRUD app with Prisma + MongoDB",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900 antialiased">
        {/* HEADER */}
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
            <Link
              href="/users"
              className="text-xl font-semibold tracking-tight text-gray-900 hover:text-indigo-600 transition-colors"
            >
              Users<span className="text-blue-600">CRUD</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
              <Link href="/users" className="hover:text-indigo-600 transition-colors">
                Users
              </Link>
              <a
                href="https://www.prisma.io/docs/orm/overview/databases/mongodb"
                target="_blank"
                rel="noreferrer"
                className="hover:text-indigo-600 transition-colors"
              >
                Prisma + Mongo
              </a>
            </nav>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="container mx-auto flex-1 px-4 py-10 md:px-6">
          {children}
        </main>

        {/* FOOTER */}
        <Footer />
      </body>
    </html>
  );
}
