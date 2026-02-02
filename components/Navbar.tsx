import React from 'react';
import { NAV_ITEMS, BRAND_NAME } from '@/lib/constants';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { LogoutButton } from '@/components/ui/LogoutButton';
import { Logo } from './Logo';
import { Menu } from 'lucide-react';

export const Navbar = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-opacity-80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 h-20 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
          <span className="font-bold text-lg">{BRAND_NAME}</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.path}
              href={item.path}
              className="text-sm hover:text-green-400"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm">
                Dashboard
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link href="/login" className="text-sm">
              Client Login
            </Link>
          )}
          <a
            href="/booking"
            className="bg-green-500 text-white px-4 py-2 rounded-md text-sm"
          >
            Start Project
          </a>
        </div>
        <div className="md:hidden">
          <button>
            <Menu />
          </button>
        </div>
      </div>
    </nav>
  );
};