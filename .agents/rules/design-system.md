---
description: Charte graphique et Design System du projet FacturePro (Inspiration Fynix Dark Mode). À appliquer sur tous les nouveaux composants.
---

# FacturePro - Design System & Charte Graphique

Ce projet utilise un thème sombre (Dark Mode) avec des accents verts, inspiré du design Fynix. Il est impératif de respecter ces règles pour maintenir une cohérence visuelle parfaite.

## 1. Palette de Couleurs (Tailwind v4 variables)
Utilisez STRICTEMENT ces classes utilitaires Tailwind définies dans `app/globals.css` :

- **Fonds (Backgrounds)** :
  - `bg-base` (`#0A0F0D`) : Fond principal de l'application (body).
  - `bg-card` (`#111917`) : Fond des cartes et conteneurs de contenu principal.
  - `bg-sidebar` (`#0D1410`) : Fond de la sidebar, headers de tableaux, zones secondaires.
- **Textes** :
  - `text-primary` (`#F0FDF4`) : Texte principal (titres, paragraphes de base, valeurs).
  - `text-muted` (`#6B7280`) : Texte secondaire (labels, notes, dates).
- **Accents (Vert Fynix)** :
  - `bg-accent` / `text-accent` (`#22C55E`) : Appels à l'action principaux, éléments actifs, icônes clés.
  - `bg-accent-muted` (`#16A34A`) : Effets au survol (hover) des accents.
- **Statuts & Bordures** :
  - `bg-success` / `text-success` : Payé, validation.
  - `bg-warning` / `text-warning` : Envoyé, en attente.
  - `bg-danger` / `text-danger` : En retard, erreurs, suppressions.
  - `border-border` (`#1F2D24`) : Couleur unique pour TOUTES les bordures séparatrices de l'UI.

## 2. Typographie
- **Texte standard** : `font-sans` (Police Inter). Utilisée pour tout le texte lisible.
- **Chiffres et Titres clés** : `font-display` (Police Outfit). À utiliser exclusivement pour les gros montants, statistiques KPI et les grands titres (`h1`, `h2`).

## 3. Glassmorphism & Formes
- **Composants conteneurs** : Utilisez la classe utilitaire personnalisée `glass-card` (ou le composant `<Card>`) qui applique un effet de verre dépoli (`backdrop-blur`) sur fond semi-transparent.
- **Arrondis (Border Radius)** :
  - `rounded-xl` (12px) : Pour les grandes cartes et blocs majeurs.
  - `rounded-lg` (8px) : Pour les champs de saisie, headers, petits blocs.
  - `rounded-md` (6px) : Pour les boutons standard, petits éléments cliquables.
  - `rounded-full` : Pour les badges, avatars.
- **Bordures** : Presque tous les éléments délimités (Cartes, Inputs, Sidebar) doivent avoir `border border-border`.

## 4. Composants Atomes (À réutiliser obligatoirement)
Ne recréez pas de styles de base, utilisez les composants existants du dossier `components/ui/` :
- `<Button variant="primary | secondary | ghost | danger" size="...">`
- `<Badge variant="default | draft | sent | paid | overdue">`
- `<Card>` : Conteneur de base avec le bon espacement et le glassmorphism.
- `cn()` (dans `@/lib/utils`) pour la fusion dynamique de classes Tailwind.

## 5. Conventions d'Affichage
- **Monnaie (Devise)** : Toujours FCFA, séparateur de milliers espace (ex: `1 250 000 FCFA`).
- **Dates** : Format JJ/MM/AAAA.

> 🚫 **INTERDICTION** : Ne pas utiliser de couleurs brutes (hex, rgb) directement dans les classes (`bg-[#123]`). Utilisez toujours les tokens sémantiques.
