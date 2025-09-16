export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? 'Vostly AI Writer';
export const APP_DESCRIPTION =
  'Private writing workspace with structured AI-assisted analysis and coaching.';

export const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/editor/new', label: 'New Post' },
  { href: '/settings', label: 'AI Providers' },
];
