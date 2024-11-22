/* eslint-disable react/prop-types */
import { useState } from 'react';
import './dropdownmenu.css';

/**
 * Composant CustomSelect
 * @param {Array} options - Tableau d'options à afficher dans le menu déroulant. Chaque option est un objet avec des propriétés `value` et `label`.
 * @param {string} placeholder - Texte à afficher par défaut lorsqu'aucune option n'est sélectionnée. (Facultatif)
 */
const CustomSelect = ({ options, placeholder = "" }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Gère la sélection d'une option.
   * Ferme le menu et met à jour l'état avec l'option choisie.
   * @param {Object} option - L'option sélectionnée.
   */
  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Ferme le menu après la sélection
  };

  /**
   * Basculer l'état d'ouverture/fermeture du menu déroulant.
   */
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="custom-select">
      {/* Bouton qui affiche le placeholder ou l'option sélectionnée */}
      <div className="select-button" onClick={toggleMenu}>
        {selectedOption ? selectedOption.label : placeholder}
        {/* Icône pour indiquer si le menu est ouvert ou fermé */}
        <span className="select-icon">{isOpen ? "▲" : "▼"}</span>
      </div>

      {/* Affichage des options uniquement si le menu est ouvert */}
      {isOpen && (
        <ul className="select-options">
          {options.map((option) => (
            <li
              key={option.value} // Utilise la valeur comme clé unique pour chaque option
              className="select-option"
              onClick={() => handleSelect(option)} // Sélectionne l'option au clic
            >
              {option.label} {/* Texte de l'option */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function DropdownMenu({ options, style = '' }) {
  /**
   * Composant principal pour afficher un menu déroulant.
   * @param {Array} options - Tableau d'options à transmettre au composant CustomSelect.
   */
  return (
    <div className={style}>
      <CustomSelect options={options} />
    </div>
  );
};
