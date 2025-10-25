export function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-gray-200  bg-indigo-700 text-white">
      <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-4 text-sm sm:flex-row sm:px-6">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} <span className="font-semibold">Users CRUD</span>. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm">
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noreferrer"
            className="hover:underline hover:opacity-90 transition"
          >
            Next.js
          </a>
          <a
            href="https://prisma.io"
            target="_blank"
            rel="noreferrer"
            className="hover:underline hover:opacity-90 transition"
          >
            Prisma
          </a>
        </div>
      </div>
    </footer>
  );
}
