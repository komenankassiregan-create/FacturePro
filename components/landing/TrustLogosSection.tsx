"use client";

import { motion } from 'framer-motion';

export function TrustLogosSection() {
  return (
    <section className="py-12 bg-white border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400">
          Ils nous font confiance à Dakar, Abidjan, Douala, Cotonou et Yaoundé
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
          className="flex whitespace-nowrap opacity-70 grayscale hover:grayscale-0 transition-all duration-300"
        >
          {/* We render the same list twice to create the seamless loop effect */}
          {[1, 2].map((groupIndex) => (
            <div key={groupIndex} className="flex gap-16 px-8 items-center">
              <div className="flex items-center justify-center gap-2 text-slate-700 font-extrabold text-lg">
                <span className="p-1.5 bg-brand-dark text-brand-lime rounded-md text-sm">TA</span>
                <span>TechAfrique</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-700 font-extrabold text-lg">
                <span className="p-1.5 bg-brand-emerald text-white rounded-md text-sm">SP</span>
                <span>Sahel Pay</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-700 font-extrabold text-lg">
                <span className="p-1.5 bg-amber-500 text-white rounded-md text-sm">BC</span>
                <span>Baobab Studio</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-700 font-extrabold text-lg">
                <span className="p-1.5 bg-blue-600 text-white rounded-md text-sm">IL</span>
                <span>Ivoire Logistics</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-700 font-extrabold text-lg">
                <span className="p-1.5 bg-purple-600 text-white rounded-md text-sm">TS</span>
                <span>Teranga Creative</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
