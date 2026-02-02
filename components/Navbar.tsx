import { cookies } from 'next/headers';
import React from 'react';
import { NAV_ITEMS, BRAND_NAME, Link, NavLink } from '@/constants';
import { createClient } from '@/lib/supabase/server';
import { LogoutButton } from '@/components/ui/LogoutButton';

export async function Navbar() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-titan-950/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-6 h-full flex justify-between items-center">
        <Link href="/" className="text-xl font-bold font-serif text-white">
          {BRAND_NAME}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }: { isActive: boolean }) =>
                `text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link
              href="/login"
              className="px-5 py-2 text-sm font-medium bg-white text-titan-950 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Client Login
            </Link>
          )}
        </div>

        {/* Mobile Menu would be a client component and receive `user` as a prop */}
        <div className="md:hidden">{/* <MobileMenu user={user} /> */}</div>
      </div>
    </nav>
  );
}