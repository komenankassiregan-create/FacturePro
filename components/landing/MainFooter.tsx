export function MainFooter() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-brand-emerald flex items-center justify-center text-white">
                <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M7 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-6-6H7zm6 1.5L17.5 8H13V3.5zM12 11.5l-3 4.5h2.5v3.5l3-4.5H12v-3.5z"></path>
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Facture<span className="text-brand-emerald">Pro</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              La plateforme de facturation et d'encaissement pensée par et pour les entrepreneurs d'Afrique francophone (UEMOA / CEMAC).
            </p>
            <div className="flex gap-4">
              {/* Social links */}
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-brand-emerald hover:border-brand-emerald hover:bg-slate-700 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.325V1.325C24 .597 23.403 0 22.675 0z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-brand-emerald hover:border-brand-emerald hover:bg-slate-700 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Produit</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-slate-400 hover:text-brand-emerald transition-colors">Fonctionnalités</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-brand-emerald transition-colors">Tarifs</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-brand-emerald transition-colors">Témoignages</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-brand-emerald transition-colors">Mises à jour</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Ressources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-slate-400 hover:text-brand-emerald transition-colors">Blog & Conseils</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-brand-emerald transition-colors">Centre d'aide</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-brand-emerald transition-colors">TVA OHADA (Guide)</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-brand-emerald transition-colors">Modèles de Facture</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Légal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-slate-400 hover:text-brand-emerald transition-colors">Mentions Légales</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-brand-emerald transition-colors">CGV / CGU</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-brand-emerald transition-colors">Politique de Confidentialité</a></li>
              <li><a href="#" className="text-sm text-slate-400 hover:text-brand-emerald transition-colors">Contactez-nous</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © 2025 FacturePro Afrique. Tous droits réservés.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-emerald"></span>
            <span className="text-xs text-slate-500">Tous les systèmes sont opérationnels</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
