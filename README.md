![Author](<https://img.shields.io/badge/Author-Maxime_Guigra-blue>)

# Projet Wealth Health

Le projet consiste à moderniser l’application interne HRNet de WealthHealth, utilisée pour gérer les dossiers des employés. Initialement développée avec jQuery, elle est devenue lente et sujette aux bugs. Le but est de convertir l’application en React pour améliorer ses performances, sa maintenabilité et remplacer l'un des plugins jQuery par un composant React personnalisé.

---

## Environnement recommandé

Pour garantir une configuration optimale lors du développement, voici les versions et outils recommandés :

- **Version de Node.js** : `v18.17.1` (ou version LTS équivalente).
- **IDE** : [Visual Studio Code](https://code.visualstudio.com/) est recommandé

---

## React DropdownMenu Component

### Description

Le composant `DropdownMenu` est un menu déroulant personnalisable et léger, conçu pour remplacer l'un des anciens plugins jQuery du projet HRNet

### Fonctionnalités :

- Sélectionner une option à partir d'une liste.
- Utilisation d'un placeholder pour indiquer le contenu par défaut.
- Indicateur visuel pour montrer si le menu est ouvert ou fermé.
- Navigation intuitive au clic.

---

### Installation

Le composant est disponible via npm :

```bash
npm install @gmaxdev/dropdown-plugin
```

Ou via Pnpm :

```bash
pnpm install @gmaxdev/dropdown-plugin
```

Mais dans ce projet, le package est directement inclu lors de l'installation des dépendance du projet complet

```bash
pnpm install
```

En fonction de l'utilisation du plugin, si on l'utilise en version local, il faudra le build, en allant dans le folder packages/dropdown-plugin
```bash
pnpm build
```

---

Pour lancer tout les serveurs, vous pouvez lancer la commande globale suivante, depuis la racine du projet:

```bash
pnpm -F '*' dev
```

---

Pour lancer le serveur front, vous pouvez taper la commande suivante depuis la racine:

```bash
pnpm -F 'front' dev
```
Où depuis le folder front:

```bash
pnpm run dev
````

---

Pour lancer le serveur backend, vous pouvez taper la commande suivante depuis la racine:

```bash
pnpm -F 'backend' dev
```
Où depuis le folder backend:

```bash
pnpm run dev
````

---

### Exemple d'utilisation

Voici un exemple de base utilisant `DropdownMenu` :

```jsx
import DropdownMenu from "@gmaxdev/dropdown-plugin";

const App = () => {
  const states = [
    { value: "CA", label: "California" },
    { value: "NY", label: "New York" },
    { value: "TX", label: "Texas" },
  ];

  return (
    <div>
      <h1>Employee Form</h1>
      <DropdownMenu
        options={states}
        placeholder="Select a state"
      />
    </div>
  );
};

export default App;
```

---

### Props

| Nom de la prop  | Type                   | Description                                                                 | Valeur par défaut |
|------------------|------------------------|-----------------------------------------------------------------------------|-------------------|
| `options`       | `Array<{ value, label }>` | Liste des options du menu déroulant. Chaque option doit inclure `value` et `label`. | `[]`             |
| `placeholder`   | `string`               | Texte affiché par défaut avant la sélection d'une option.                   | `""`              |


---

### Accessibilité

Le composant `DropdownMenu` respecte les bonnes pratiques d'accessibilité grâce à :

- Une gestion visuelle de l'état ouvert/fermé avec des icônes (`▲` et `▼`).
- La séparation logique entre le bouton de sélection et les options.
- Une structure de liste (`<ul>` et `<li>`) pour décrire les options.

---

### Performances

Des audits Lighthouse ont montré des améliorations par rapport à l'ancien plugin jQuery, notamment :

- **Réduction des manipulations DOM** grâce à `useState` et une structure légère.
- **Amélioration des temps de chargement** en supprimant les dépendances inutiles.

---
