/* eslint-disable react/prop-types */
import { useState } from 'react';
import './dropdownmenu.css';

const CustomSelect = ({ options, placeholder = "" }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="custom-select">
      <div className="select-button" onClick={toggleMenu}>
        {selectedOption ? selectedOption.label : placeholder}
        <span className="select-icon">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <ul className="select-options">
          {options.map((option) => (
            <li
              key={option.value}
              className="select-option"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function DropdownMenu({ options }) {
  return (
    <div className="dropdown">
      <CustomSelect options={options} />
    </div>
  );
};
