'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAV_ITEMS } from '@/lib/config';

const baseClasses =
  'rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500';

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 text-slate-600">
      {NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={${baseClasses} }
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
