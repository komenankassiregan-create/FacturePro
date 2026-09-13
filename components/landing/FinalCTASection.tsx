"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export function FinalCTASection() {
  return (
    <section className="py-20 lg:py-24 bg-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[2.5rem] bg-brand-dark p-10 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-brand-dark/20"
        >
          {/* Subtle bg glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-emerald/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6 relative z-10">
            Prêt à professionnaliser <br className="hidden sm:inline" />votre entreprise ?
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10 relative z-10">
            Rejoignez plus de 2 500 entrepreneurs en Afrique qui ont dit adieu au stress de la facturation et aux retards de paiement.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-2xl text-base font-extrabold text-brand-dark bg-brand-lime hover:bg-white shadow-subtle-glow hover:-translate-y-1 transition-all duration-300" href="/login">
              Créer mon compte gratuitement
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-6 relative z-10">
            Sans engagement • Aucune carte bancaire requise • Setup en 2 min
          </p>
        </motion.div>
      </div>
    </section>
  );
}
