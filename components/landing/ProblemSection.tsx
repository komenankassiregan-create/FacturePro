"use client";

import { motion } from 'framer-motion';

export function ProblemSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-20 lg:py-28 bg-brand-subtle/50" id="problemes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold mb-4 uppercase tracking-wider"
          >
            Le constat
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight leading-tight"
          >
            Pourquoi la facturation traditionnelle freine votre croissance
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-600"
          >
            En Afrique francophone, 72% des PME perdent jusqu'à 6 heures par semaine à cause d'erreurs de tableurs et de relances client oubliées.
          </motion.p>
        </div>

        {/* Problem Cards 3-column Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Card 1 */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card-lift relative overflow-hidden group hover:border-rose-200 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 mb-3">01. Image de marque dégradée</span>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Factures non professionnelles sur Word</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Mises en page brisées lors de l'export, logos déformés et oubli des mentions légales NINEA/RCCM. Les grands comptes retardent le règlement de vos factures pour non-conformité.
            </p>
          </motion.div>
          {/* Card 2 */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card-lift relative overflow-hidden group hover:border-amber-200 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 mb-3">02. Risque de redressement</span>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Calculs manuels de TVA & devises hasardeux</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Erreurs de calcul sur la TVA à 18%, gestion pénible des arrondis en FCFA et confusion entre acomptes et solde TTC. Une seule formule Excel erronée peut coûter très cher lors d'un contrôle fiscal.
            </p>
          </motion.div>
          {/* Card 3 */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card-lift relative overflow-hidden group hover:border-brand-emerald/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-brand-emerald flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 mb-3">03. Trésorerie en danger</span>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Suivi impossible et retards de paiement</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Vous ne savez plus qui a payé quoi, les relances manuelles sont gênantes et chronophages, et les retards de trésorerie bloquent les salaires et vos investissements vitaux.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
