import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-titan-900 border-t border-titan-800 text-slate-400">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} OpsVantage Digital. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/Services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/Process" className="hover:text-white transition-colors">Process</Link>
            <Link href="/Contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};