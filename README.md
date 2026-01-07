
# 🚀 Tara Money Landing Page - Architecture

Cette application est conçue pour être **AI-Friendly** et extrêmement facile à maintenir.

## 📂 Structure du Projet

- `config.ts` : **Single Source of Truth**. Contient toutes les couleurs, textes, espacements et données. **Modifiez ce fichier pour changer le contenu ou le style.**
- `App.tsx` : Composants React "stateless" qui consomment la configuration. Logique d'animation (Framer Motion) et SVGs de marques.
- `index.html` : Configuration Tailwind, polices (Inter) et styles globaux.

## 🤖 Guide de Modification (Agent IA)

Pour modifier le site, ne touchez pas à `App.tsx` sauf si vous devez changer la logique structurelle. 

1. **Changer une couleur** : Allez dans `THEME.colors` dans `config.ts`.
2. **Mettre à jour un texte** : Allez dans l'objet `CONTENT` dans `config.ts`.
3. **Ajouter un service** : Ajoutez un objet dans `CONTENT.payments.methods`. Les icônes SVG sont mappées par `id`.

## 🎨 Design System
- **Polices** : Inter (300 à 900).
- **Couleurs** : Orange (#FF4D00) pour l'action, Gris neutres pour le contenu.
- **Rayons** : Arrondis ultra-larges (3rem) pour un look "App" moderne.
