"use client";

import { motion } from 'framer-motion';

export function FeaturesSection() {
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
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-20 lg:py-28 bg-white" id="fonctionnalites">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-brand-emerald text-xs font-bold mb-4 uppercase tracking-wider"
          >
            La solution FacturePro
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark tracking-tight"
          >
            Tout ce dont vous avez besoin pour être payé plus vite
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-600 text-lg"
          >
            Une plateforme moderne et ultra-intuitive, conçue spécifiquement pour le contexte économique africain.
          </motion.p>
        </div>

        {/* Feature Grid (4 Interactive Cards) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Feature 1 */}
          <motion.div variants={itemVariants} className="bg-brand-surface rounded-3xl p-8 lg:p-10 border border-slate-200 hover:shadow-card-lift transition duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-emerald/10 text-brand-emerald flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Factures professionnelles en 2 clics</h3>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                Insérez votre logo, vos identifiants fiscaux (NINEA, RCCM, IFU), vos coordonnées bancaires et vos conditions. Vos devis et factures PDF sont générés instantanément, conformes et irréprochables.
              </p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-500 flex items-center justify-between">
              <span className="flex items-center gap-2 font-semibold text-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-emerald"></span> Modèles normalisés OHADA & DGI
              </span>
              <span className="text-brand-emerald font-bold">Export PDF vectoriel</span>
            </div>
          </motion.div>
          {/* Feature 2 */}
          <motion.div variants={itemVariants} className="bg-brand-surface rounded-3xl p-8 lg:p-10 border border-slate-200 hover:shadow-card-lift transition duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-lime/30 text-slate-900 flex items-center justify-center mb-6 font-extrabold text-xl">
                18%
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">TVA 18% calculée automatiquement</h3>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                Fini le casse-tête fiscal. Le système calcule en temps réel vos montants HT, la taxe sur la valeur ajoutée à 18% (ou taux personnalisé selon votre pays), ainsi que les éventuelles retenues à la source.
              </p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-500 flex items-center justify-between">
              <span className="flex items-center gap-2 font-semibold text-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-lime-hover"></span> Prêt pour votre expert-comptable
              </span>
              <span className="text-slate-600 font-bold">Zéro erreur d'arrondi FCFA</span>
            </div>
          </motion.div>
          {/* Feature 3 */}
          <motion.div variants={itemVariants} className="bg-brand-surface rounded-3xl p-8 lg:p-10 border border-slate-200 hover:shadow-card-lift transition duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Paiements Wave & Mobile Money intégrés</h3>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                Chaque facture contient un lien et un QR Code de paiement sécurisé. Vos clients règlent en quelques secondes via Wave, Orange Money ou MTN MoMo, et votre facture passe automatiquement en statut "Payée".
              </p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs flex items-center justify-between">
              <span className="flex items-center gap-2 font-semibold text-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span> Notification instantanée
              </span>
              <span className="text-sky-600 font-bold">Encaissement 3x plus rapide</span>
            </div>
          </motion.div>
          {/* Feature 4 */}
          <motion.div variants={itemVariants} className="bg-brand-surface rounded-3xl p-8 lg:p-10 border border-slate-200 hover:shadow-card-lift transition duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-brand-emerald-dark flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">CRM & Relances WhatsApp automatiques</h3>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                Retrouvez l'historique complet de chaque client, les devis acceptés, et programmez des relances polies et personnalisées directement envoyées sur WhatsApp et par email avant l'échéance.
              </p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs flex items-center justify-between">
              <span className="flex items-center gap-2 font-semibold text-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Modèles WhatsApp prêts à l'emploi
              </span>
              <span className="text-slate-900 font-bold">1 clic pour relancer</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
