import { Calendar } from "lucide-react";
import Link from "next/link";

export default function MainNav() {
  return (
    <div className="hidden md:flex items-center justify-between w-full">
      <div className="flex items-center gap-8">
        <Link href="/">
          <Calendar className="text-neutral-950 dark:text-blue-400 w-8 h-8 p-1 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105" />
        </Link>
        <nav className="flex items-center gap-3 lg:gap-4">
          <Link
            href="/"
            className="text-neutral-900 hover:text-blue-500 dark:text-white dark:hover:text-blue-400 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-neutral-900 hover:text-blue-500 dark:text-white dark:hover:text-blue-400 transition-colors"
          >
            About
          </Link>
        </nav>
      </div>
    </div>
  );
}
