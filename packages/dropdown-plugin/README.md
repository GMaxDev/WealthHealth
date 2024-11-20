# DropdownMenu - React Plugin

## Description

`DropdownMenu` est un composant React léger et personnalisable permettant de créer un menu déroulant intuitif. Il est conçu pour être simple à intégrer et facile à personnalise.

---

## Installation

Ajoutez le plugin à votre projet via npm ou Yarn :

```bash
npm install @gmaxdev/dropdown-plugin
```

ou

```bash
yarn add @gmaxdev/dropdown-plugin
```

---

## Utilisation de base

Voici un exemple d'implémentation simple du composant `DropdownMenu` :

```jsx
import DropdownMenu from "@gmaxdev/dropdown-plugin";

const App = () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <div>
      <DropdownMenu
        options={options}
        placeholder="Select an option"
        className="custom-dropdown"
      />
    </div>
  );
};

export default App;
```

---

## Props

| Prop            | Type                   | Description                                                                 | Valeur par défaut |
|------------------|------------------------|-----------------------------------------------------------------------------|-------------------|
| `options`       | `Array<{ value, label }>` | Liste des options disponibles dans le menu déroulant. Chaque option doit inclure un `value` (unique) et un `label`. | `[]`             |
| `placeholder`   | `string`               | Texte affiché avant qu'une option ne soit sélectionnée.                     | `""`              |
| `className`     | `string`               | Classe CSS pour personnaliser le style du conteneur principal.              | `""`              |

---

## Exemple CSS (Facultatif)

Vous pouvez personnaliser l'apparence du composant en utilisant les classes CSS suivantes :

```css
.custom-select {
  position: relative;
  width: 100%;
}

.select-button {
  background-color: #f5f5f5;
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.select-options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
}

.select-option {
  padding: 10px;
  cursor: pointer;
}

.select-option:hover {
  background-color: #e0e0e0;
}
```

---

## Fonctionnalités principales

1. **Sélection intuitive** : Cliquez sur une option pour la sélectionner.
2. **Placeholder configurable** : Affiche un texte par défaut si aucune option n'est sélectionnée.
3. **Personnalisation facile** : Stylisez le composant avec vos propres classes CSS.

---

## Accessibilité

- Les options sont présentées sous forme de liste (`<ul>` et `<li>`) pour une meilleure structure.
- Une gestion visuelle de l'état ouvert/fermé est assurée avec des icônes (`▲` et `▼`).

---
