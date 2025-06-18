"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = segment
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return (
      <span key={href} className="text-gray-600 dark:text-gray-300">
        {index > 0 && <span className="mx-2">/</span>}
        <Link href={href} className="hover:underline">
          {label}
        </Link>
      </span>
    );
  });

  return (
    <nav className="mb-4 text-sm font-medium">
      <Link
        href="/"
        className="text-blue-600 hover:underline dark:text-blue-400"
      >
        Home
      </Link>
      {crumbs.length > 0 && <span className="mx-2">/</span>}
      {crumbs}
    </nav>
  );
}
