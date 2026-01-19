import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2.5 group">
              {/* Premium Vector Logo (Code-based) */}
              <div className="relative w-8 h-8 flex items-center justify-center bg-blue-600 rounded-lg shadow-lg shadow-blue-900/50 group-hover:bg-blue-500 transition-all duration-200">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {/* A small 'notification dot' to simulate 'Live Status' */}
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-sky-400 rounded-full border-2 border-slate-900"></div>
              </div>
              
              {/* Brand Name */}
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg tracking-tight leading-none group-hover:text-blue-100 transition-colors">
                  ContractFlow
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">
                  Enterprise
                </span>
              </div>
            </Link>
          </div>
          
          {/* Right side: Clean, no avatars, just pure platform feel */}
        </div>
      </div>
    </nav>
  );
}