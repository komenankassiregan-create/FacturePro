"use client";

import { motion } from 'framer-motion';

export function HowItWorksSection() {
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
    <section className="py-20 lg:py-28 bg-brand-dark text-white relative overflow-hidden" id="comment-ca-marche">
      {/* Subtle background glowing spheres */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-emerald/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-brand-lime/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-brand-lime border border-white/15 text-xs font-bold mb-4 uppercase tracking-wider"
          >
            Simplicité radicale
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
          >
            Comment ça marche ?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300 text-lg"
          >
            De votre inscription à l'encaissement de vos premiers FCFA en 3 étapes simples.
          </motion.p>
        </div>

        {/* Steps Timeline */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative"
        >
          {/* Step 1 */}
          <motion.div variants={itemVariants} className="glass-dark-card rounded-3xl p-8 relative hover:border-brand-emerald/50 transition duration-300">
            <div className="text-6xl font-black text-white/10 mb-4">01</div>
            <div className="w-12 h-12 rounded-xl bg-brand-emerald text-brand-dark flex items-center justify-center font-bold text-xl mb-6 shadow-md shadow-brand-emerald/20">
              ✓
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Inscris-toi en 30 secondes</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Renseigne le nom de ton entreprise, choisis ta devise (FCFA XOF ou XAF), téléverse ton logo et saisis tes mentions d'identification légale (NINEA/RCCM).
            </p>
          </motion.div>
          {/* Step 2 */}
          <motion.div variants={itemVariants} className="glass-dark-card rounded-3xl p-8 relative hover:border-brand-lime/50 transition duration-300">
            <div className="text-6xl font-black text-white/10 mb-4">02</div>
            <div className="w-12 h-12 rounded-xl bg-brand-lime text-brand-dark flex items-center justify-center font-bold text-xl mb-6 shadow-md shadow-brand-lime/20">
              ⚡
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Crée ta première facture</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Sélectionne un client, tape tes prestations ou produits. La TVA à 18% est calculée sans que tu n'aies à sortir une calculette.
            </p>
          </motion.div>
          {/* Step 3 */}
          <motion.div variants={itemVariants} className="glass-dark-card rounded-3xl p-8 relative hover:border-brand-emerald/50 transition duration-300">
            <div className="text-6xl font-black text-white/10 mb-4">03</div>
            <div className="w-12 h-12 rounded-xl bg-white text-brand-dark flex items-center justify-center font-bold text-xl mb-6 shadow-md">
              💰
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Envoie et encaisse tes fonds</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Partage la facture par WhatsApp ou email avec son lien de règlement Wave/Mobile Money. Reçois les alertes dès que ton client a procédé au paiement.
            </p>
          </motion.div>
        </motion.div>

        {/* Quick interactive trial banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a className="inline-flex items-center gap-2 text-brand-lime hover:text-white font-bold text-base transition-colors group" href="/login">
            Essayer gratuitement pendant 14 jours dès maintenant
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
