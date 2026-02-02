import React from 'react';
import { BRAND_NAME, TAGLINE, NAV_ITEMS } from '@/lib/constants';
import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Logo } from './Logo';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <Logo />
            <p className="mt-4 text-gray-400">{TAGLINE}</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="font-bold mb-4">Site</h3>
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.path} className="mb-2">
                  <Link href={item.path} className="hover:text-green-400">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-400"><Github /></a>
              <a href="#" className="hover:text-green-400"><Linkedin /></a>
              <a href="#" className="hover:text-green-400"><Twitter /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-4 text-center text-gray-500">
          &copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};