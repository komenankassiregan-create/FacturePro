"use client";

import { motion } from 'framer-motion';

export function TestimonialsSection() {
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 lg:py-28 bg-brand-surface overflow-hidden" id="temoignages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-brand-emerald text-xs font-bold mb-4 uppercase tracking-wider"
          >
            Retours d'expérience
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight"
          >
            Ce que disent les entrepreneurs qui l'utilisent
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-600 text-lg"
          >
            Des créateurs de valeur basés à Dakar, Abidjan et Douala partagent leur quotidien transformé.
          </motion.p>
        </div>
      </div>

      {/* Testimonials Marquee */}
      <div className="relative flex overflow-x-hidden group pb-4">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40,
          }}
          className="flex whitespace-nowrap"
        >
          {/* Render same list twice for seamless loop */}
          {[1, 2].map((groupIndex) => (
            <div key={groupIndex} className="flex gap-8 px-4 items-stretch">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card-lift flex flex-col justify-between w-[350px] md:w-[450px] whitespace-normal">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">★★★★★</div>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic mb-6">
                    "Avant FacturePro, je passais mes dimanches soirs à batailler avec Excel et relancer mes clients un par un. Aujourd'hui mes factures partent en 2 minutes et mes délais de paiement ont été divisés par deux."
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-11 h-11 rounded-full bg-brand-emerald text-white flex items-center justify-center font-bold text-sm shrink-0">
                    AD
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Amadou Diop</div>
                    <div className="text-xs text-slate-500">Directeur créatif • Dakar</div>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card-lift flex flex-col justify-between w-[350px] md:w-[450px] whitespace-normal">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">★★★★★</div>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic mb-6">
                    "Le calcul automatique de la TVA 18% et les mentions fiscales locales me sauvent la vie. Les clients corporate prennent mon cabinet beaucoup plus au sérieux."
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-11 h-11 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    AK
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Aïssatou Kouassi</div>
                    <div className="text-xs text-slate-500">Conseil • Abidjan</div>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card-lift flex flex-col justify-between w-[350px] md:w-[450px] whitespace-normal">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">★★★★★</div>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic mb-6">
                    "Le lien de paiement mobile et le suivi automatique m'ont permis de récupérer plus de 3M FCFA d'impayés en 3 mois. Rentabilisé en un clin d'œil."
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-11 h-11 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    YN
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Yannick Nsangou</div>
                    <div className="text-xs text-slate-500">E-commerce • Douala</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
