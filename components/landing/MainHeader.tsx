"use client";

import Link from 'next/link';

export function MainHeader() {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link className="flex items-center gap-3 group" href="/">
            <div className="w-10 h-10 rounded-xl bg-brand-emerald flex items-center justify-center text-white shadow-md shadow-brand-emerald/30 group-hover:scale-105 transition-transform duration-300">
              <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                <path d="M7 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-6-6H7zm6 1.5L17.5 8H13V3.5zM12 11.5l-3 4.5h2.5v3.5l3-4.5H12v-3.5z"></path>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white">
                Facture<span className="text-brand-emerald">Pro</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider -mt-1">Afrique de l'Ouest & Centrale</span>
            </div>
          </Link>
          {/* Desktop Navigation Links */}
          <nav aria-label="Navigation principale" className="hidden md:flex items-center space-x-8">
            <a className="text-sm font-medium text-slate-300 hover:text-brand-emerald transition-colors" href="#fonctionnalites">Fonctionnalités</a>
            <a className="text-sm font-medium text-slate-300 hover:text-brand-emerald transition-colors" href="#comment-ca-marche">Comment ça marche</a>
            <a className="text-sm font-medium text-slate-300 hover:text-brand-emerald transition-colors" href="#tarifs">Tarifs</a>
            <a className="text-sm font-medium text-slate-300 hover:text-brand-emerald transition-colors" href="#temoignages">Témoignages</a>
          </nav>
          {/* Right CTA Actions */}
          <div className="flex items-center gap-4">
            <Link className="hidden sm:inline-flex text-sm font-semibold text-slate-200 hover:text-brand-emerald transition-colors px-3 py-2" href="/login">
              Se connecter
            </Link>
            <a className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-bold text-slate-900 bg-brand-lime hover:bg-brand-lime-hover shadow-sm hover:shadow-subtle-glow hover:-translate-y-0.5 transition-all duration-200" href="/login">
              Commencer gratuitement
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
