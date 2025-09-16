import type { Metadata } from 'next';
import Link from 'next/link';
import { Geist, Geist_Mono } from 'next/font/google';

import { APP_DESCRIPTION, APP_NAME } from '@/lib/config';
import { MainNav } from '@/components/layout/MainNav';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

const currentYear = new Date().getFullYear();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={${geistSans.variable}  min-h-screen bg-slate-50 text-slate-900 antialiased}
      >
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
              <div>
                <Link className="text-xl font-semibold tracking-tight text-slate-900" href="/dashboard">
                  {APP_NAME}
                </Link>
                <p className="mt-1 text-sm text-slate-500">{APP_DESCRIPTION}</p>
              </div>
              <MainNav />
            </div>
          </header>

          <main className="flex-1">
            <div className="mx-auto w-full max-w-6xl px-6 py-8">{children}</div>
          </main>

          <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 text-sm text-slate-500">
              <span>
                © {currentYear} {APP_NAME}
              </span>
              <span>Local-first · Private by default</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
