# FacturePro - Documentation Agent AI (GEMINI)

## Ce que l'application fait
FacturePro est un SaaS de facturation premium conçu spécifiquement pour les entrepreneurs et PME africaines. L'application permet de gérer une base de clients, d'éditer des factures (avec lignes dynamiques et calcul automatique de la TVA et des totaux en FCFA), et de suivre le statut des paiements. Elle met l'accent sur un design très qualitatif, moderne et professionnel pour instaurer la confiance.

## Toutes les fonctionnalités implémentées (Phase 1 & 2 - UI Mock)
1. **Tableau de Bord (Dashboard)** :
   - Cartes de statistiques clés (KPIs).
   - Graphique de flux de trésorerie (Cashflow).
   - Graphique de répartition des statuts de factures.
   - Liste des dernières factures récentes.
2. **Gestion des Clients** :
   - Liste des clients avec filtres et recherche.
   - Ajout et modification de clients via des Modales.
   - Système de Corbeille : suppression douce avec onglet Corbeille, restauration et règles de 7 jours.
3. **Gestion des Factures** :
   - Liste des factures avec recherche et filtres rapides par statuts (Brouillon, Envoyée, Payée, En retard).
   - Formulaire de création / édition avancé avec lignes dynamiques (ajout/suppression), calcul automatique du HT, de la TVA (18%) et du TTC.
   - Page Détail de Facture : vue style "PDF".
4. **Outils Professionnels** :
   - **Génération PDF** : via `html2pdf.js` pour télécharger la facture.
   - **Impression** : styles CSS dédiés (`@media print`) pour masquer l'interface et imprimer proprement.
   - **Intégration WhatsApp** : Bouton d'envoi rapide générant un lien `wa.me` pré-rempli avec les infos du client et le montant.
5. **Paramètres (Settings)** :
   - Interface de configuration pour le profil entreprise (NINEA/RCCM), les préférences de facturation (TVA, Mentions légales), et les moyens de paiement (RIB, Wave, Orange Money).

## La structure des fichiers
```
facturepro/
├── app/
│   ├── (dashboard)/            # Route group pour les pages protégées
│   │   ├── dashboard/page.tsx  # Page d'accueil du dashboard
│   │   ├── clients/page.tsx    # Gestion des clients (Actifs/Corbeille)
│   │   ├── invoices/           # Module Facturation
│   │   │   ├── page.tsx        # Liste
│   │   │   ├── new/page.tsx    # Formulaire de création
│   │   │   └── [id]/           # Détail (page.tsx) et Édition (edit/page.tsx)
│   │   ├── settings/page.tsx   # Paramètres du compte
│   │   └── layout.tsx          # Layout avec Sidebar et Header (cache à l'impression)
│   ├── globals.css             # Design System (Tailwind v4)
│   └── layout.tsx              # Root Layout (Fonts)
├── components/
│   ├── dashboard/              # Composants spécifiques du dashboard (Charts, Stats)
│   ├── layout/                 # Sidebar.tsx, Header.tsx
│   └── ui/                     # Composants réutilisables (Card, Button, Badge, Input, Modal, UndoToast, Select)
├── lib/
│   ├── mock-data.ts            # Données fictives (Factures, Clients) pour la phase UI
│   └── utils.ts                # Fonctions utilitaires (cn, formatCurrency, getWhatsAppLink)
└── .agents/
    └── rules/                  # Règles spécifiques pour les agents IA (ex: design-system.md)
```

## Les technologies utilisées
- **Framework** : Next.js 14 (App Router).
- **Langage** : TypeScript.
- **Styling** : Tailwind CSS v4.
- **Icônes** : Lucide React.
- **Graphiques** : Recharts.
- **Export PDF** : html2pdf.js.
- *(À venir - Phase 3) : Supabase (Auth, Postgres, RLS) et Vercel (Déploiement).*

## Les décisions de design (Charte Fynix)
L'application respecte **strictement** un Design System sombre inspiré de Fynix :
- **Glassmorphism** : Utilisation intensive de fonds semi-transparents avec flou (`backdrop-blur`) via la classe utilitaire `.glass-card`.
- **Couleurs** : 
  - Fond `bg-base` (`#0A0F0D`), Cartes `bg-card` (`#111917`).
  - Accent vert `bg-accent` (`#22C55E`).
- **Typographie** : 
  - `font-sans` (Inter) pour la lisibilité générale.
  - `font-display` (Outfit) pour les chiffres, KPI, et grands titres.
- **Détails UI** : Bordures subtiles (`border-border`), coins arrondis (`rounded-xl` pour les grandes cartes, `rounded-lg` pour les inputs).
- **Règle absolue** : Les agents IA **NE DOIVENT JAMAIS** inventer de nouvelles couleurs hexadécimales brutes, mais doivent toujours utiliser les variables Tailwind sémantiques (ex: `text-muted`, `bg-success`). *(Voir `.agents/rules/design-system.md`)*.

## Instructions pour un futur modèle IA
Lorsque tu reprends ce projet :
1. **Lis ce fichier `GEMINI.md`** pour comprendre le contexte global.
2. **Lis le fichier `.agents/rules/design-system.md`** pour maîtriser la charte graphique et ne jamais dévier du thème sombre Fynix.
3. **État Actuel** : Le projet est à la fin de la **Phase 2 (UI + Mock Data)**. Les composants sont interactifs mais utilisent le state React et `mock-data.ts`.
4. **Prochaine Étape (Phase 3)** : Le but sera d'intégrer **Supabase**. Il faudra :
   - Créer le schéma PostgreSQL.
   - Remplacer les données de `lib/mock-data.ts` par des vrais appels API via `@supabase/supabase-js` (Server Actions ou Route Handlers).
   - Gérer l'authentification (middleware pour protéger le dossier `(dashboard)`).
5. Garde le code modulaire. Ne casse pas les fonctionnalités d'impression (`print:hidden`) ou les composants UI (`UndoToast`).
