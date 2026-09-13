"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 bg-slate-900 overflow-hidden text-white border-b border-slate-800">
      {/* Radiant ambient glows */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-brand-emerald/25 to-brand-lime/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-brand-emerald/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -right-32 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Announcement Pill */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 shadow-sm backdrop-blur-md">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-emerald animate-pulse"></span>
            <span className="text-xs font-semibold text-emerald-200 tracking-wide">
              ✨ Pensé pour les entrepreneurs & PME d'Afrique de l'Ouest et Centrale
            </span>
          </div>
        </motion.div>

        {/* Main Catchphrase & Intro */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.10] mb-6"
          >
            Facturez comme un <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime to-brand-emerald">PRO</span><br />
            <span className="relative inline-block mt-2">
              en 2 clics.
              <svg className="absolute -bottom-4 left-0 w-full h-4 text-brand-emerald opacity-70" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,10 Q50,20 100,10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed mb-8"
          >
            La solution tout-en-un pour générer des devis et factures conformes, calculer automatiquement la TVA à 18% et encaisser vos règlements par <strong className="text-white font-semibold">Wave</strong>, <strong className="text-white font-semibold">Orange Money</strong> ou virement bancaire.
          </motion.p>

          {/* CTA Buttons Group */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Link className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-2xl text-base font-extrabold text-white bg-brand-emerald hover:bg-brand-emerald-dark shadow-deep-glow hover:-translate-y-1 transition-all duration-300" href="/login">
              Commencer gratuitement
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
              </svg>
            </Link>
            <a className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-2xl text-base font-semibold text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-200 backdrop-blur-md" href="#mockup-preview">
              <svg className="w-5 h-5 mr-2 text-brand-lime" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"></path>
              </svg>
              Voir la démo interactive
            </a>
          </motion.div>

          {/* Trust Badges Under CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm font-medium text-slate-300"
          >
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-brand-lime" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path></svg>
              Sans carte bancaire
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-brand-lime" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path></svg>
              Essai gratuit 14 jours
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-brand-lime" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path></svg>
              Configuration en 2 min
            </span>
          </motion.div>
        </div>

        {/* Hero Mockup Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14 max-w-5xl mx-auto" 
          id="mockup-preview"
        >
          {/* Floating container shadow wrapper with vibrant glow */}
          <div className="relative p-2 sm:p-4 rounded-3xl bg-white/10 border border-white/20 shadow-2xl backdrop-blur-md">
            {/* Mockup window canvas */}
            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden text-slate-900">
              {/* Window Top Bar */}
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-400"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                  <span className="ml-4 text-xs font-mono text-slate-400 hidden sm:inline">app.facturepro.africa/dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800">● Système Fiscal: OHADA / UEMOA</span>
                  <div className="w-7 h-7 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold text-xs">AD</div>
                </div>
              </div>
              {/* Dashboard Inner Content */}
              <div className="p-4 sm:p-8 bg-slate-50/50 grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Mini Sidebar / Analytics summary */}
                <div className="lg:col-span-4 space-y-4">
                  {/* Summary Card 1 */}
                  <div className="p-5 rounded-2xl bg-brand-dark text-white shadow-card-lift">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-medium text-slate-300">Trésorerie encaissée (Mois en cours)</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-emerald text-brand-dark">+38.5%</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">12 450 000 <span className="text-sm font-semibold text-brand-lime">FCFA</span></div>
                    <p className="text-xs text-slate-400">42 factures acquittées ce mois-ci</p>
                  </div>
                  {/* Summary Card 2: Quick Metrics */}
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Performance de recouvrement</span>
                    <div className="mt-3 flex items-center justify-between">
                      <div>
                        <div className="text-xl font-bold text-slate-900">48 Heures</div>
                        <div className="text-xs text-slate-500">Délai moyen de règlement</div>
                      </div>
                      <div className="p-3 bg-emerald-50 rounded-xl">
                        <svg className="w-6 h-6 text-brand-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
                      <div className="bg-brand-emerald h-full rounded-full" style={{ width: '88%' }}></div>
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">88% payées via Mobile Money sous 48h</span>
                  </div>
                  {/* Payment Methods Badges */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200/80">
                    <span className="text-xs font-semibold text-slate-500">Canaux d'encaissement actifs</span>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 text-xs font-semibold border border-sky-100">
                        🌊 Wave Pay
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 text-xs font-semibold border border-orange-100">
                        🟠 Orange Money
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-yellow-50 text-yellow-800 text-xs font-semibold border border-yellow-200">
                        🟡 MTN MoMo
                      </span>
                    </div>
                  </div>
                </div>
                {/* Right Mockup: The Live Interactive Invoice Preview */}
                <div className="lg:col-span-8">
                  <div className="rounded-2xl bg-white p-5 sm:p-7 border border-slate-200 shadow-sm relative">
                    {/* Watermark / Status Stamp */}
                    <div className="absolute top-6 right-6">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        PAYÉ EN LIGNE (WAVE)
                      </span>
                    </div>
                    {/* Invoice Meta Header */}
                    <div className="border-b border-slate-100 pb-5 mb-5">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-emerald">Facture Officielle</span>
                        <span className="text-xs text-slate-400">• Réf: #FP-2025-084</span>
                      </div>
                      <div className="text-xl font-extrabold text-slate-900">Baobab Creative Studio SARL</div>
                      <p className="text-xs text-slate-500">RCCM : SN-DKR-2022-B-1284 | NINEA : 008492021 | Dakar, Sénégal</p>
                    </div>
                    {/* Client and Details row */}
                    <div className="grid grid-cols-2 gap-4 text-xs mb-5">
                      <div>
                        <span className="text-slate-400 uppercase font-semibold">Facturé à :</span>
                        <p className="font-bold text-slate-800 text-sm mt-0.5">Sonatel SA / Orange Business</p>
                        <p className="text-slate-500">Cité Keur Gorgui, BP 69, Dakar</p>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 uppercase font-semibold">Date d'émission :</span>
                        <p className="font-bold text-slate-800 text-sm mt-0.5">24 Février 2025</p>
                        <p className="text-slate-500">Échéance : Paiement immédiat</p>
                      </div>
                    </div>
                    {/* Table of invoice items */}
                    <div className="overflow-x-auto mb-5">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 text-slate-400 font-semibold">
                            <th className="py-2">Désignation</th>
                            <th className="py-2 text-center">Qté</th>
                            <th className="py-2 text-right">Prix Unitaire</th>
                            <th className="py-2 text-right">Total HT</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          <tr>
                            <td className="py-2.5 font-medium">Refonte plateforme Web & UI Mobile</td>
                            <td className="py-2.5 text-center">1</td>
                            <td className="py-2.5 text-right">1 200 000 FCFA</td>
                            <td className="py-2.5 text-right font-semibold">1 200 000 FCFA</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-medium">Campagne Digitale Acquisition Q1</td>
                            <td className="py-2.5 text-center">1</td>
                            <td className="py-2.5 text-right">300 000 FCFA</td>
                            <td className="py-2.5 text-right font-semibold">300 000 FCFA</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* Financial Totals with 18% VAT highlight */}
                    <div className="bg-slate-50 p-4 rounded-xl space-y-1.5 text-xs">
                      <div className="flex justify-between text-slate-600">
                        <span className="">Total Hors Taxes (HT) :</span>
                        <span className="font-semibold">1 500 000 FCFA</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-700 font-medium bg-emerald-50/70 px-2 py-1 rounded">
                        <span className="flex items-center gap-1 text-emerald-800 font-bold">
                          TVA Automatique (18%) :
                          <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded">Conforme UEMOA</span>
                        </span>
                        <span className="font-bold text-emerald-900">270 000 FCFA</span>
                      </div>
                      <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                        <span className="">Montant Net à Payer (TTC) :</span>
                        <span className="text-brand-emerald font-bold">1 770 000 FCFA</span>
                      </div>
                    </div>
                    {/* Bottom interactive CTA within mockup */}
                    <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <span className="text-slate-400">Paiement certifié Wave Checkout • Réf: TX-99238410</span>
                      <button 
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition active:scale-95"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                        Télécharger PDF certifié
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
