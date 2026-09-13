"use client";

import { motion } from 'framer-motion';

export function PricingSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 lg:py-28 bg-white relative" id="tarifs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-brand-emerald text-xs font-bold mb-4 uppercase tracking-wider"
          >
            Tarification claire et transparente
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight"
          >
            Investissez dans la sérénité de votre entreprise
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-600 text-lg"
          >
            Des forfaits abordables en Francs CFA, payables simplement par Mobile Money ou carte.
          </motion.p>
        </div>

        {/* Pricing Plans Grid (3 Cards with Pro Highlighted) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
        >
          {/* Plan 1: Gratuit */}
          <motion.div variants={itemVariants} className="rounded-3xl p-8 bg-brand-surface border border-slate-200 flex flex-col justify-between hover:shadow-card-lift transition duration-300">
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-slate-500">Démarrage</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">Gratuit</h3>
              <p className="text-slate-500 text-sm mt-2">Idéal pour les freelances qui lancent leur activité.</p>
              <div className="my-6">
                <span className="text-4xl font-extrabold text-slate-900">0</span>
                <span className="text-slate-600 font-bold text-sm"> FCFA / mois</span>
              </div>
              {/* Features list */}
              <ul className="space-y-3.5 text-sm text-slate-600">
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-brand-emerald flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path></svg>
                  Jusqu'à 5 factures & devis / mois
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-brand-emerald flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path></svg>
                  1 compte utilisateur
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-brand-emerald flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path></svg>
                  Calcul automatique de la TVA (18%)
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-brand-emerald flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path></svg>
                  Export PDF instantané
                </li>
                <li className="flex items-center gap-2.5 text-slate-400">
                  <svg className="w-4 h-4 text-slate-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                  Paiement Mobile Money direct
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <a className="block w-full text-center py-3.5 px-4 rounded-xl font-bold text-sm bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition" href="/login">
                Créer mon compte gratuit
              </a>
            </div>
          </motion.div>

          {/* Plan 2: Pro (HIGHLIGHTED) */}
          <motion.div variants={itemVariants} className="rounded-3xl p-8 bg-brand-dark text-white border-2 border-brand-emerald shadow-2xl relative flex flex-col justify-between lg:-translate-y-3">
            {/* Badge Recommandé */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wide bg-brand-lime text-brand-dark shadow-md">
                ★ Le plus populaire
              </span>
            </div>
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-brand-lime">PME & Agences</span>
              <h3 className="text-2xl font-extrabold text-white mt-1">Formule Pro</h3>
              <p className="text-slate-300 text-sm mt-2">Pour accélérer votre trésorerie et automatiser vos rentrées.</p>
              <div className="my-6">
                <span className="text-4xl font-extrabold text-white">5 000</span>
                <span className="text-slate-300 font-bold text-sm"> FCFA / mois</span>
                <div className="text-xs text-brand-emerald mt-1 font-semibold">ou 50 000 FCFA / an (2 mois offerts)</div>
              </div>
              {/* Features list */}
              <ul className="space-y-3.5 text-sm text-slate-200">
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-brand-lime flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path></svg>
                  <strong className="text-white">Factures & devis illimités</strong>
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-brand-lime flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path></svg>
                  Jusqu'à 3 collaborateurs
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-brand-lime flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path></svg>
                  <strong className="text-white">Intégration Wave, Orange Money & MTN</strong>
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-brand-lime flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path></svg>
                  Relances programmées sur WhatsApp & Email
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-brand-lime flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path></svg>
                  Personnalisation complète avec votre logo
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-brand-lime flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path></svg>
                  Support prioritaire WhatsApp 7j/7
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <a className="block w-full text-center py-4 px-4 rounded-xl font-bold text-sm bg-brand-emerald hover:bg-brand-emerald-dark text-white shadow-subtle-glow transition duration-200" href="/login">
                Essayer le Plan Pro (14j gratuits)
              </a>
            </div>
          </motion.div>

          {/* Plan 3: Business */}
          <motion.div variants={itemVariants} className="rounded-3xl p-8 bg-brand-surface border border-slate-200 flex flex-col justify-between hover:shadow-card-lift transition duration-300">
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-slate-500">Grandes Structures</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">Business</h3>
              <p className="text-slate-500 text-sm mt-2">Pour les entreprises établies aux flux importants.</p>
              <div className="my-6">
                <span className="text-4xl font-extrabold text-slate-900">15 000</span>
                <span className="text-slate-600 font-bold text-sm"> FCFA / mois</span>
              </div>
              {/* Features list */}
              <ul className="space-y-3.5 text-sm text-slate-600">
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-brand-emerald flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path></svg>
                  Tout le Plan Pro en illimité
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-brand-emerald flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path></svg>
                  Jusqu'à 10 collaborateurs & rôles avancés
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-brand-emerald flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path></svg>
                  Multi-entreprises & filiales
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-brand-emerald flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path></svg>
                  Rapports financiers pour expert-comptable
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-brand-emerald flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path></svg>
                  Gestion des stocks & inventaire
                </li>
                <li className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-brand-emerald flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path></svg>
                  Gestionnaire de compte VIP dédié
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <a className="block w-full text-center py-3.5 px-4 rounded-xl font-bold text-sm bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition" href="/login">
                Souscrire au Plan Business
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
